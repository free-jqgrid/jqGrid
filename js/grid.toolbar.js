/**
 * jqGrid extension - Toolbar
 * ToNict
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 **/

/*global jQuery, define */
(function(factory) {
  "use strict";
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    // Node/CommonJS
    factory(require("jquery"));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function($) {
  var jgrid = $.jgrid,
    mergeCssClasses = jgrid.mergeCssClasses,
    base = $.fn.jqGrid; // locales = jgrid.locales, getRes = jgrid.getRes

  // begin module grid.toolbar
  jgrid.extend({
    toolbarButtonAdd: function(oMuligrid) {
      return this.each(function() {
        var $t = this,
          $self = $($t),
          p = $t.p,
          getGridRes = base.getGridRes;
        if (!$t.grid || !p.toolbar[0]) {
          return;
        }

        var o = $.extend({
              name: "",
              action: "",
              caption: "newButton",
              title: "",
              color: "",
              commonIconClass: "glyphicon",
              icon: "",
              url: "",
              position: "last",
              onClickButton: null,
              modal: true,
              selectable: true,
              elmperfix: "",
              elmsuffix: "",
              line: false,
              idField: false
            },
            p.toolbarOptions || {},
            oMuligrid || {}),
          viewModalAlert = function() {
            $t.modalAlert();
          };

        if (p.editOptions !== undefined) {
          o.editOptions = $.extend(p.editOptions, o.editOptions || {});
        }
        if (p.delOptions !== undefined) {
          o.delOptions = $.extend(p.delOptions, o.delOptions || {});
        }
        if (p.searchOptions !== undefined) {
          o.searchoptions = $.extend(p.searchOptions, o.searchoptions || {});
        }

        var $container = $("#t_" + p.id).find('.swiper-wrapper'),
          $slide = $("<div class='swiper-slide'></div>"),
          btn = $("<button type='button'></button>");

        if (p.toolbar[1] !== "both") {
          $(btn).addClass("ui-btn").append("<span class='" + mergeCssClasses(o.commonIconClass, o.icon) + "'></span> ").append(o.caption).attr("title", o.title || o.caption);

          if (o.color) {
            $(btn).addClass("ui-btn-" + o.color);
          }

          if (o.selectable) {
            $(btn).addClass("selectable");
          }

          if (o.position === "first" && $container.children("div.swiper-slide").length > 0) {
            $container.children("div.swiper-slide").first().before($slide.append(btn));
          } else {
            $container.append($slide.append(btn));
          }

          if (o.elmperfix) {
            $slide.prepend(o.elmperfix);
          }

          if (o.elmsuffix) {
            $slide.append(o.elmsuffix);
          }

          if (o.line) {
            $slide.append("<span class='line'>|</span></div>");
          }

        }

        $(btn, $container).click(function(e) {
          if ($.isFunction(o.onClickButton)) {
            o.onClickButton.call($t, o, e);
          } else {
            switch (o.action) {
              case "add":
                if (o.modal) {
                  base.editGridRow.call($self, 'new', o.editOptions || {});
                } else {
                  if (p.tabId && !p.parentId) {
                    alert(getGridRes.call($self, "errors.cannotAddSelect"));
                  } else {
                    var tabid = "tab_" + o.name + p.tabId;
                    o.url += "/null/" + (p.parentId ? p.parentId : 'null') + "/" + p.globalId + (p.tabId !== "" ? "/" + p.tabId : '');
                    app.addTab(p.tabId, tabid, o.url, o.caption);
                  }
                }
                break;
              case "edit":
              case "newtab":
                if (o.modal && o.action !== "newtab") {
                  if (p.selrow) {
                    base.editGridRow.call($self, p.selrow, o.editOptions || {});
                  } else {
                    viewModalAlert();
                  }
                } else {
                  $.each((p.multiselect ? p.selarrrow : [p.selrow]), function(i, rowid) {
                    var tpv = p.tabsView,
                      tmpArray = [],
                      tmpText = [],
                      strCaption = o.caption;
                    if (tpv !== undefined) {
                      $.each(tpv.labelField, function(key, value) {
                        tmpArray.push($($t.rows[p.rowIndexes[rowid]].cells[p.iColByName[value]]).text());
                        tmpText.push("{" + key + "}");
                      });

                      tmpArray.unshift(tpv.labelText !== "" ? tpv.labelText : tmpText.join(' '));
                      strCaption += " [" + jgrid.template.apply(null, tmpArray) + "]";
                    }

                    if (o.idField) {
                      rowid = base.getRowData.call($self, rowid)[o.idField] || rowid;
                    }

                    var tabid = "tab_" + o.name + p.tabId + rowid,
                      url = o.url + "/" + rowid + "/" + (p.parentId ? p.parentId : 'null') + "/" + p.globalId + (p.tabId !== "" ? "/" + p.tabId : '');

                    app.addTab(p.tabId, tabid, url, strCaption);
                  });
                }
                break;
              case "delete":
                base.delGridRow.call($self, (p.multiselect ? p.selarrrow.join(',') : p.selrow), o.delOptions || {});
                break;
              case "view":
                if (p.selrow) {
                  base.viewGridRow.call($self, p.selrow);
                } else {
                  viewModalAlert();
                }
                break;
              case "search":
                base.searchGrid.call($self, o.searchoptions || {});
                break;
            }
          }

          return false;
        });
      });
    }
  });
  // end module grid.toolbar
}));
