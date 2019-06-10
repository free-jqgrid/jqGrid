/**
 * @license jQuery UI Multiselect
 *
 * Authors:
 *  Michael Aufreiter (quasipartikel.at)
 *  Yanick Rochon (yanick.rochon[at]gmail[dot]com)
 * 
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * http://www.quasipartikel.at/multiselect/
 *
 * UPDATED by Oleg Kiriljuk (oleg.kiriljuk@ok-soft-gmbh.com) to support jQuery 1.6 and hight
 * (the usage of jQuery.attr and jQuery.removeAttr is replaced to the usage of jQuery.prop
 *  in case of working with selected options of select)
 * 
 * Depends:
 *	ui.core.js
 *	ui.sortable.js
 *
 * Optional:
 * localization (http://plugins.jquery.com/project/localisation)
 * scrollTo (http://plugins.jquery.com/project/ScrollTo)
 * 
 * Todo:
 *  Make batch actions faster
 *  Implement dynamic insertion through remote calls
 */

/*global jQuery, define, module, require */
(function (factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		// AMD. Register as an anonymous module.
		define([
			"jquery",
			"jquery-ui/sortable"
		], factory);
	} else if (typeof module === "object" && module.exports) {
		// Node/CommonJS
		module.exports = function (root, $) {
			if ($ === undefined) {
				// require("jquery") returns a factory that requires window to
				// build a jQuery instance, we normalize how we use modules
				// that require this pattern but the window provided is a noop
				// if it's defined (how jquery works)
				$ = typeof window !== "undefined" ?
						require("jquery") :
						require("jquery")(root || window);
			}
			require("jquery-ui/sortable");
			factory($);
			return $;
		};
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

$.widget("ui.multiselect", {
  options: {
		guiStyle: 'jQueryUI',
		iconSet: 'jQueryUI',
		locale: 'en-US',
		sortable: true,
		searchable: true,
		doubleClickable: true,
		animated: 'fast',
		show: 'slideDown',
		hide: 'slideUp',
		dividerLocation: 0.6,
		availableFirst: false,
		nodeComparator: function(node1,node2) {
			var text1 = node1.text(),
			    text2 = node2.text();
			return text1 == text2 ? 0 : (text1 < text2 ? -1 : 1);
		}
	},
	_getLabel: function(path) {
		var res = $.jgrid.getRes($.jgrid.locales[this.options.locale], path);
		if (res === undefined) {
			res = $.jgrid.getRes($.jgrid.locales["en-US"], path);
		}
		return res;
	},
	_getGuiStyles: function(path) {
		var res = $.jgrid.getRes($.jgrid.guiStyles[this.options.guiStyle], path);
		if (res === undefined) {
			res = $.jgrid.getRes($.jgrid.guiStyles["jQueryUI"], path);
		}
		return res;
	},
	_getIcon: function(path) {
		var res = $.jgrid.getIcon(this.options.iconSet, path);
		if (res === "") {
			res = $.jgrid.getRes($.jgrid.icons["jQueryUI"], path);
		}
		return res;
	},
	_create: function() {
		this.element.hide();
		this.id = this.element.attr("id");
		this.container = $('<div class="' + this._getGuiStyles("multiselect.container") + '"></div>').insertAfter(this.element);
		this.count = 0; // number of currently selected options
		this.selectedContainer = $('<div class="selected"><div class="' + this._getGuiStyles("multiselect.panel") + '"></div></div>').appendTo(this.container);
		this.availableContainer = $('<div class="available"><div class="' + this._getGuiStyles("multiselect.panel") + '"></div></div>')[this.options.availableFirst?'prependTo': 'appendTo'](this.container);
		this.selectedActions = $('<div class="actions ' + this._getGuiStyles("multiselect.heading") + '"><span class="count">0 '+this._getLabel("multiselect.itemsCount")+'</span><div><a href="#" class="remove-all">'+this._getLabel("multiselect.removeAll")+'</a></div></div>').appendTo(this.selectedContainer.children());
		this.availableActions = $('<div class="actions ' + this._getGuiStyles("multiselect.heading") + '"><input type="text" class="search ' + this._getGuiStyles("multiselect.search") + '"/><div><a href="#" class="add-all">'+this._getLabel("multiselect.addAll")+'</a></div></div>').appendTo(this.availableContainer.children());
		this.selectedList = $('<ul class="selected ' + this._getGuiStyles("multiselect.list") + '"></ul>').bind('selectstart', function(){return false;}).appendTo(this.selectedContainer.children());
		this.availableList = $('<ul class="available ' + this._getGuiStyles("multiselect.list") + '"></ul>').bind('selectstart', function(){return false;}).appendTo(this.availableContainer.children());

		var that = this;

		// set dimensions
		this.container.css({ "min-width": "470px", margin: "auto" });
		if (this.options.guiStyle === "jQueryUI") {
			this.selectedContainer.css({ width: this.options.dividerLocation * 100 + "%" });
			this.availableContainer.css({ width: (100 - this.options.dividerLocation * 100) + "%" });
		}
		else if (this.options.guiStyle === "bootstrap" || this.options.guiStyle === "bootstrap4") {
			var size = Math.round(this.options.dividerLocation * 12);
			this.selectedContainer.addClass("col-sm-" + size);
			this.availableContainer.addClass("col-sm-" + (12 - size));
		}

		// fix list height to match <option> depending on their individual header's heights
		this.selectedList.height(Math.max(this.element.height()-this.selectedActions.height(),1));
		this.availableList.height(Math.max(this.element.height()-this.availableActions.height(),1));

		if ( !this.options.animated ) {
			this.options.show = 'show';
			this.options.hide = 'hide';
		}

		// init lists
		this._populateLists(this.element.find('option'));

		// make selection sortable
		if (this.options.sortable) {
			this.selectedList.sortable({
				placeholder: 'ui-state-highlight',
				axis: 'y',
				update: function(event, ui) {
					// apply the new sort order to the original selectbox
					that.selectedList.find('li').each(function() {
						if ($(this).data('optionLink')) {
							$(this).data('optionLink').remove().appendTo(that.element);
						}
					});
				},
				receive: function(event, ui) {
					ui.item.data('optionLink').prop('selected', true);
					// increment count
					that.count += 1;
					that._updateCount();
					// workaround, because there's no way to reference 
					// the new element, see http://dev.jqueryui.com/ticket/4303
					that.selectedList.children('.ui-draggable').each(function() {
						$(this).removeClass('ui-draggable');
						$(this).data('optionLink', ui.item.data('optionLink'));
						$(this).data('idx', ui.item.data('idx'));
						that._applyItemState($(this), true);
					});
			
					// workaround according to http://dev.jqueryui.com/ticket/4088
					setTimeout(function() { ui.item.remove(); }, 1);
				}
			});
		}

		// set up livesearch
		if (this.options.searchable) {
			this._registerSearchEvents(this.availableContainer.find('input.search'));
		} else {
			$('.search').hide();
		}

		// batch actions
		this.container.find(".remove-all").click(function() {
			that._populateLists(that.element.find('option').prop('selected', false));
			return false;
		});

		this.container.find(".add-all").click(function() {
			var options = that.element.find('option').not(":selected");
			if (that.availableList.children('li:hidden').length > 1) {
				that.availableList.children('li').each(function(i) {
					if ($(this).is(":visible")) {
						$(options[i-1]).prop('selected', true);
					}
				});
			} else {
				options.prop('selected', true);
			}
			that._populateLists(that.element.find('option'));
			return false;
		});
	},
	destroy: function() {
		this.element.show();
		this.container.remove();

		$.Widget.prototype.destroy.apply(this, arguments);
	},
	_populateLists: function(options) {
		this.selectedList.children('.ui-element').remove();
		this.availableList.children('.ui-element').remove();
		this.count = 0;

		var that = this;
		var items = $(options.map(function(i) {
			var isSelected = $(this).is(":selected"), item = that._getOptionNode(this).appendTo(isSelected ? that.selectedList : that.availableList).show();

			if (isSelected) {
				that.count += 1;
			}
			that._applyItemState(item, isSelected);
			item.data('idx', i);
			return item[0];
		}));

		// update count
		this._updateCount();
		that._filter.apply(this.availableContainer.find('input.search'), [that.availableList]);
	},
	_updateCount: function() {
		this.element.trigger('change');
		this.selectedContainer.find('span.count').text(this.count+" "+this._getLabel("multiselect.itemsCount"));
	},
	_getOptionNode: function(option) {
		option = $(option);
		var node = $('<li class="ui-element '+this._getGuiStyles("multiselect.listItem")+'" title="'+(option.attr("title") || option.text())+'"><span/>'+option.text()+'<a href="#" class="action"><span class="ui-corner-all"/></a></li>').hide();
		node.data('optionLink', option);
		return node;
	},
	// clones an item with associated data
	// didn't find a smarter away around this
	_cloneWithData: function(clonee) {
		var clone = clonee.clone(false,false);
		clone.data('optionLink', clonee.data('optionLink'));
		clone.data('idx', clonee.data('idx'));
		return clone;
	},
	_setSelected: function(item, selected) {
		item.data('optionLink').prop('selected', selected);

		if (selected) {
			var selectedItem = this._cloneWithData(item);
			item[this.options.hide](this.options.animated, function() { $(this).remove(); });
			selectedItem.appendTo(this.selectedList).hide()[this.options.show](this.options.animated);

			this._applyItemState(selectedItem, true);
			return selectedItem;
		} else {
			// look for successor based on initial option index
			var items = this.availableList.find('li'), comparator = this.options.nodeComparator;
			var succ = null, i = item.data('idx'), direction = comparator(item, $(items[i]));

			// TODO: test needed for dynamic list populating
			if ( direction ) {
				while (i>=0 && i<items.length) {
					direction > 0 ? i++ : i--;
					if ( direction != comparator(item, $(items[i])) ) {
						// going up, go back one item down, otherwise leave as is
						succ = items[direction > 0 ? i : i+1];
						break;
					}
				}
			} else {
				succ = items[i];
			}

			var availableItem = this._cloneWithData(item);
			succ ? availableItem.insertBefore($(succ)) : availableItem.appendTo(this.availableList);
			item[this.options.hide](this.options.animated, function() { $(this).remove(); });
			availableItem.hide()[this.options.show](this.options.animated);

			this._applyItemState(availableItem, false);
			return availableItem;
		}
	},
	_applyItemState: function(item, selected) {
		if (selected) {
			if (this.options.sortable) {
				item.children('span').addClass(this._getIcon('multiselect.arrow')).removeClass('ui-helper-hidden');
			} else {
				item.children('span').removeClass(this._getIcon('multiselect.arrow')).addClass('ui-helper-hidden');
			}
			item.find('a.action span').removeClass(this._getIcon('multiselect.plus')).addClass(this._getIcon('multiselect.minus'));
			this._registerRemoveEvents(item.find('a.action'));

		} else {
			item.children('span').removeClass(this._getIcon('multiselect.arrow')).addClass('ui-helper-hidden');
			item.find('a.action span').removeClass(this._getIcon('multiselect.minus')).addClass(this._getIcon('multiselect.plus'));
			this._registerAddEvents(item.find('a.action'));
		}

		this._registerDoubleClickEvents(item);
		this._registerHoverEvents(item);
	},
	// taken from John Resig's liveUpdate script
	_filter: function(list) {
		var input = $(this);
		var rows = list.children('li'),
			cache = rows.map(function(){

				return $(this).text().toLowerCase();
			});
		
		var term = $.trim(input.val().toLowerCase()), scores = [];

		if (!term) {
			rows.show();
		} else {
			rows.hide();

			cache.each(function(i) {
				if (this.indexOf(term)>-1) {
					scores.push(i);
				}
			});

			$.each(scores, function() {
				$(rows[this]).show();
			});
		}
	},
	_registerDoubleClickEvents: function(elements) {
		if (!this.options.doubleClickable) {
			return;
		}
		elements.dblclick(function(ev) {
			if ($(ev.target).closest('.action').length === 0) {
				// This may be triggered with rapid clicks on actions as well. In that
				// case don't trigger an additional click.
				elements.find('a.action').click();
			}
		});
	},
	_registerHoverEvents: function(elements) {
		elements.removeClass('ui-state-hover');
		elements.mouseover(function() {
			$(this).addClass('ui-state-hover');
		});
		elements.mouseout(function() {
			$(this).removeClass('ui-state-hover');
		});
	},
	_registerAddEvents: function(elements) {
		var that = this;
		elements.click(function() {
			var item = that._setSelected($(this).parent(), true);
			that.count += 1;
			that._updateCount();
			return false;
		});

		// make draggable
		if (this.options.sortable) {
			elements.each(function() {
				$(this).parent().draggable({
					connectToSortable: that.selectedList,
					helper: function() {
						var selectedItem = that._cloneWithData($(this)).width($(this).width() - 50);
						selectedItem.width($(this).width());
						return selectedItem;
					},
					appendTo: that.container,
					containment: that.container,
					revert: 'invalid'
				});
			});		  
		}
	},
	_registerRemoveEvents: function(elements) {
		var that = this;
		elements.click(function() {
			that._setSelected($(this).parent(), false);
			that.count -= 1;
			that._updateCount();
			return false;
		});
	},
	_registerSearchEvents: function(input) {
		var that = this;

		input.focus(function() {
			$(this).addClass('ui-state-active');
		})
		.blur(function() {
			$(this).removeClass('ui-state-active');
		})
		.keypress(function(e) {
			if (e.keyCode == 13) {
				return false;
			}
		})
		.keyup(function() {
			that._filter.apply(this, [that.availableList]);
		});
	}
});

var locInfo = {
	"de": {
		addAll: "Alles hinzufügen",
		removeAll: "Alles entfernen",
		itemsCount: "ausgewählte Artikel"
	},
	"en": {
		addAll: "Add all",
		removeAll: "Remove all",
		itemsCount: "items selected"
	},
	"fr": {
		addAll: "Ajouter tout",
		removeAll: "Enlever tout",
		itemsCount: "éléments sélectionnés"
	},
	"it": {
		addAll: "Aggiungere tutto",
		removeAll: "Rimuovere tutto",
		itemsCount: "elementi selezionati"
	}
};

$.jgrid = $.jgrid || {};
$.extend(true, $.jgrid, {
	locales: {
		"de": { multiselect: locInfo.de },
		"de-DE": { multiselect: locInfo.de },
		"en": { multiselect: locInfo.en },
		"en-US": { multiselect: locInfo.en },
		"fr": { multiselect: locInfo.fr },
		"fr-FR": { multiselect: locInfo.fr },
		"it": { multiselect: locInfo.it },
		"it-IT": { multiselect: locInfo.it }
	},
	guiStyles: {
		jQueryUI: {
			multiselect: {
				container: "ui-multiselect ui-helper-clearfix ui-widget",
				panel: "",
				heading: "ui-widget-header ui-helper-clearfix",
				list: "",
				listItem: "ui-state-default",
				search: "ui-widget-content ui-corner-all"
			}
		},
		bootstrap: {
			multiselect: {
				container: "ui-multiselect-bootstrap",
				panel: "panel panel-default",
				heading: "panel-heading",
				list: "list-group",
				listItem: "list-group-item",
				search: "form-control input-sm"
			}
		},
		bootstrap4: {
			multiselect: {
				container: "ui-multiselect-bootstrap",
				panel: "panel panel-default",
				heading: "panel-heading",
				list: "list-group",
				listItem: "list-group-item",
				search: "form-control input-sm"
			}
		}
	},
	icons: {
		jQueryUI: {
			multiselect: {
				minus: "ui-icon-minus",
				plus: "ui-icon-plus",
				arrow: "ui-icon-arrowthick-2-n-s"
			}
		},
		fontAwesome: {
			multiselect: {
				minus: "fa-minus",
				plus: "fa-plus",
				arrow: "fa-arrows-v"
			}
		},
		fontAwesome5: {
			multiselect: {
				minus: "fa-minus",
				plus: "fa-plus",
				arrow: "fa-arrows-alt-v"
			}
		},
		glyph: {
			multiselect: {
				minus: "glyphicon-minus",
				plus: "glyphicon-plus",
				arrow: "glyphicon-resize-vertical"
			}
		}
	}
});

}));
