/*jshint eqeqeq:false, eqnull:true */
/*global jQuery */
/*jslint plusplus: true, unparam: true, eqeq: true, nomen: true, continue: true */
// Grouping module
(function ($) {
	"use strict";
	var jgrid = $.jgrid, base = $.fn.jqGrid;
	jgrid.extend({
		groupingSetup: function () {
			return this.each(function () {
				var $t = this, i, j, cml, p = $t.p, colModel = p.colModel, grp = p.groupingView, cm, summary,
					emptyFormatter = function () {
						return "";
					};
				if (grp !== null && ((typeof grp === "object") || $.isFunction(grp))) {
					if (!grp.groupField.length) {
						p.grouping = false;
					} else {
						if (grp.visibiltyOnNextGrouping === undefined) {
							grp.visibiltyOnNextGrouping = [];
						}

						grp.lastvalues = [];
						if (!grp._locgr) {
							grp.groups = [];
						}
						grp.counters = [];
						for (i = 0; i < grp.groupField.length; i++) {
							if (!grp.groupOrder[i]) {
								grp.groupOrder[i] = "asc";
							}
							if (!grp.groupText[i]) {
								grp.groupText[i] = "{0}";
							}
							if (typeof grp.groupColumnShow[i] !== "boolean") {
								grp.groupColumnShow[i] = true;
							}
							if (typeof grp.groupSummary[i] !== "boolean") {
								grp.groupSummary[i] = false;
							}
							if (!grp.groupSummaryPos[i]) {
								grp.groupSummaryPos[i] = "footer";
							}
							cm = colModel[p.iColByName[grp.groupField[i]]];
							if (grp.groupColumnShow[i] === true) {
								grp.visibiltyOnNextGrouping[i] = true;
								if (cm != null && cm.hidden === true) {
									base.showCol.call($($t), grp.groupField[i]);
								}
							} else {
								grp.visibiltyOnNextGrouping[i] = $("#" + jgrid.jqID(p.id + "_" + grp.groupField[i])).is(":visible");
								if (cm != null && cm.hidden !== true) {
									base.hideCol.call($($t), grp.groupField[i]);
								}
							}
						}
						grp.summary = [];
						if (grp.hideFirstGroupCol) {
							grp.formatDisplayField[0] = function (v) {
								return v;
							};
						}
						for (j = 0, cml = colModel.length; j < cml; j++) {
							cm = colModel[j];
							if (grp.hideFirstGroupCol) {
								if (!cm.hidden && grp.groupField[0] === cm.name) {
									cm.formatter = emptyFormatter;
								}
							}
							if (cm.summaryType) {
								summary = { nm: cm.name, st: cm.summaryType, v: "", sr: cm.summaryRound, srt: cm.summaryRoundType || "round" };
								if (cm.summaryDivider) {
									summary.sd = cm.summaryDivider;
									summary.vd = "";
								}
								grp.summary.push(summary);
							}
						}
					}
				} else {
					p.grouping = false;
				}
			});
		},
		groupingPrepare: function (record, irow) {
			this.each(function () {
				var $t = this, grp = $t.p.groupingView, groups = grp.groups, counters = grp.counters,
					lastvalues = grp.lastvalues, isInTheSameGroup = grp.isInTheSameGroup, grlen = grp.groupField.length,
					i, newGroup, newCounter, fieldName, v, displayName, displayValue, changed = 0,
					groupingCalculationsHandler = base.groupingCalculations.handler,
					buildSummaryValue = function () {
						if ($.isFunction(this.st)) {
							this.v = this.st.call($t, this.v, this.nm, record);
						} else {
							this.v = groupingCalculationsHandler.call($($t), this.st, this.v, this.nm, this.sr, this.srt, record);
							if (this.st.toLowerCase() === "avg" && this.sd) {
								this.vd = groupingCalculationsHandler.call($($t), this.st, this.vd, this.sd, this.sr, this.srt, record);
							}
						}
					};

				for (i = 0; i < grlen; i++) {
					fieldName = grp.groupField[i];
					displayName = grp.displayField[i];
					v = record[fieldName];
					displayValue = displayName == null ? null : record[displayName];

					if (displayValue == null) {
						displayValue = v;
					}
					if (v !== undefined) {
						newGroup = { idx: i, dataIndex: fieldName, value: v, displayValue: displayValue, startRow: irow, cnt: 1, summary: [] };
						if (irow === 0) {
							// First record always starts a new group
							groups.push(newGroup);
							lastvalues[i] = v;
							counters[i] = { cnt: 1, pos: groups.length - 1, summary: $.extend(true, [], grp.summary) };
							$.each(counters[i].summary, buildSummaryValue);
							groups[counters[i].pos].summary = counters[i].summary;
						} else {
							newCounter = { cnt: 1, pos: groups.length, summary: $.extend(true, [], grp.summary) };
							if (typeof v !== "object" && ($.isArray(isInTheSameGroup) && $.isFunction(isInTheSameGroup[i]) ? !isInTheSameGroup[i].call($t, lastvalues[i], v, i, grp) : lastvalues[i] !== v)) {
								// This record is not in same group as previous one
								groups.push(newGroup);
								lastvalues[i] = v;
								changed = 1;
								counters[i] = newCounter;
								$.each(counters[i].summary, buildSummaryValue);
								groups[counters[i].pos].summary = counters[i].summary;
							} else {
								if (changed === 1) {
									// This group has changed because an earlier group changed.
									groups.push(newGroup);
									lastvalues[i] = v;
									counters[i] = newCounter;
									$.each(counters[i].summary, buildSummaryValue);
									groups[counters[i].pos].summary = counters[i].summary;
								} else {
									counters[i].cnt += 1;
									groups[counters[i].pos].cnt = counters[i].cnt;
									$.each(counters[i].summary, buildSummaryValue);
									groups[counters[i].pos].summary = counters[i].summary;
								}
							}
						}
					}
				}
				//gdata.push( rData );
			});
			return this;
		},
		groupingToggle: function (hid) {
			this.each(function () {
				var $t = this;
				var $grid = $("#gview_" + $t.id);
				var p = $t.p;
				var groupingConfig = p.groupingView;
				var minusIcon = groupingConfig.minusicon.split(' ')[1];
				var plusIcon = groupingConfig.plusicon.split(' ')[1];
				var groupTreeLevel = groupingConfig.groupField.length; //level of tree
				var groupHeaderSplit = hid.split("_"); //["gridghead", "0", "0"]
				var groupName = groupHeaderSplit[0];
				var groupLevel = parseInt(groupHeaderSplit[1]);
				var groupNextLevel = (groupLevel + 1);
				var groupPrevLevel = (groupLevel - 1);

				//Build header class
				var groupMainClass = "." + groupName + "_" + groupLevel;

				//Build next header level class, if above tree level, assign as blank
				var groupNextMainClass = groupNextLevel < groupTreeLevel ? "." + groupName + "_" + groupNextLevel : "";

				//Build next header level class, if already at base level (0), assign as blank
				var groupPrevMainClass = groupPrevLevel >= 0 ? "." + groupName + "_" + groupPrevLevel : "";

				//Find each will take care of frozen table overlay
				$grid.find(".ui-jqgrid-btable tbody").each(function(index) {
					var $hid = $(this).find("#" + hid);
					var $hIcon = $hid.find(".ui-icon");
					if ($hIcon.hasClass(plusIcon)) { //expand all rows under header
						$hid.nextUntil(groupMainClass, groupNextMainClass).css('display','table-row');
						$hIcon.removeClass(plusIcon).addClass(minusIcon);
					} else { //collapse all rows under header
						//Make sure we don't grab the header in the current tree level
						var $rows = $hid.nextUntil(groupMainClass).not(groupPrevMainClass);
						$rows.css('display','none');
						//Toggle all icons in tree levels under the current header
						$rows.find(".ui-icon").removeClass(minusIcon).addClass(plusIcon);
						$hIcon.toggleClass(minusIcon).addClass(plusIcon);
					}
				});
			});
			return false;
		},
		toggleAll: function (expand) {
			this.each(function () {
				var $t = this;
				var $grid = $("#gview_" + $t.id);
				var p = $t.p;
				var groupingConfig = p.groupingView;
				var minusIcon = groupingConfig.minusicon.split(' ')[1];
				var plusIcon = groupingConfig.plusicon.split(' ')[1];

				//All rows at every level
				var $rows = $grid.find(".ui-row-ltr")

				if (expand) {
					$rows.css('display', 'table-row');
					$rows.find(".ui-icon").removeClass(plusIcon).addClass(minusIcon);
				} else {
					//All rows that are not first level
					var $treeRows = $rows.not("[class$=ghead_0]");
					$treeRows.css('display','none');
					$rows.find(".ui-icon").removeClass(minusIcon).addClass(plusIcon);
				}
			});
			return false;
		},
		groupingRender: function (grdata, colspans, page, rn) {
			var str = "", $t = this[0], p = $t.p, toEnd = 0, grp = p.groupingView, sumreverse = $.makeArray(grp.groupSummary), gv, cp = [],
				icon = "", hid, clid, pmrtl = (grp.groupCollapse ? grp.plusicon : grp.minusicon) + " tree-wrap-" + p.direction,
				len = grp.groupField.length,
				getGridRowStyles = function (classes) {
					return base.getGuiStyles.call($t, "gridRow", classes);
				},
				jqgroupClass = getGridRowStyles("jqgroup ui-row-" + p.direction),
				jqfootClass = getGridRowStyles("jqfoot ui-row-" + p.direction);

			function findGroupIdx(ind, offset, grp) {
				var ret = false, i, id;
				if (offset === 0) {
					ret = grp[ind];
				} else {
					id = grp[ind].idx;
					if (id === 0) {
						ret = grp[ind];
					} else {
						for (i = ind; i >= 0; i--) {
							if (grp[i].idx === id - offset) {
								ret = grp[i];
								break;
							}
						}
					}
				}
				return ret;
			}

			function buildSummaryTd(i, ik, grp, foffset) {
				var fdata = findGroupIdx(i, ik, grp), cm = p.colModel,
					grlen = fdata.cnt, strTd = "", k, tmpdata, tplfld,
					processSummary = function () {
						var vv, summary = this;
						if (summary.nm === cm[k].name) {
							tplfld = cm[k].summaryTpl || "{0}";
							if (typeof summary.st === "string" && summary.st.toLowerCase() === "avg") {
								if (summary.sd && summary.vd) {
									summary.v = (summary.v / summary.vd);
								} else if (summary.v && grlen > 0) {
									summary.v = (summary.v / grlen);
								}
							}
							try {
								summary.groupCount = fdata.cnt;
								summary.groupIndex = fdata.dataIndex;
								summary.groupValue = fdata.value;
								vv = $t.formatter("", summary.v, k, summary);
							} catch (ef) {
								vv = summary.v;
							}
							tmpdata = "<td role='gridcell' " + $t.formatCol(k, 1, "") + ">" + jgrid.format(tplfld, vv) + "</td>";
							return false;
						}
					};

				for (k = foffset; k < colspans; k++) {
					tmpdata = "<td role='gridcell' " + $t.formatCol(k, 1, "") + ">&#160;</td>";
					$.each(fdata.summary, processSummary);
					strTd += tmpdata;
				}
				return strTd;
			}

			$.each(p.colModel, function (i, n) {
				var ii;
				for (ii = 0; ii < len; ii++) {
					if (grp.groupField[ii] === n.name) {
						cp[ii] = i;
						break;
					}
				}
			});

			sumreverse.reverse();
			$.each(grp.groups, function (i, n) {
				if (grp._locgr) {
					if (!(n.startRow + n.cnt > (page - 1) * rn && n.startRow < page * rn)) {
						return true;
					}
				}
				toEnd++;
				clid = p.id + "ghead_" + n.idx;
				hid = clid + "_" + i;
				icon = "<span style='cursor:pointer;' class='" + grp.commonIconClass + " " + pmrtl + "' onclick=\"jQuery('#" + jgrid.jqID(p.id).replace("\\", "\\\\") + "').jqGrid('groupingToggle','" + hid + "');return false;\"></span>";
				try {
					if ($.isArray(grp.formatDisplayField) && $.isFunction(grp.formatDisplayField[n.idx])) {
						n.displayValue = grp.formatDisplayField[n.idx].call($t, n.displayValue, n.value, p.colModel[cp[n.idx]], n.idx, grp);
						gv = n.displayValue;
					} else {
						gv = $t.formatter(hid, n.displayValue, cp[n.idx], n.value);
					}
				} catch (egv) {
					gv = n.displayValue;
				}
				str += "<tr id='" + hid + "' " + (grp.groupCollapse && n.idx > 0 ? "style='display:none;' " : "") + "role='row' class='" +
						jqgroupClass + " " + clid + "'><td role='gridcell' style='padding-left:" + (n.idx * 12) + "px;" + "'";
				var grpTextStr = $.isFunction(grp.groupText[n.idx]) ?
						grp.groupText[n.idx].call($t, gv, n.cnt, n.summary) :
						jgrid.template(grp.groupText[n.idx], gv, n.cnt, n.summary),
					colspan = 1, jj, hhdr, kk, ik, offset = 0, sgr, gg, end, // k,
					leaf = len - 1 === n.idx;
				if (typeof grpTextStr !== "string" && typeof grpTextStr !== "number") {
					grpTextStr = gv;
				}
				if (grp.groupSummaryPos[n.idx] === "header") {
					colspan = 1;
					if (p.colModel[0].name === "cb" || p.colModel[1].name === "cb") {
						colspan++;
					}
					if (p.colModel[0].name === "subgrid" || p.colModel[1].name === "subgrid") {
						colspan++;
					}
					str += (colspan > 1 ? " colspan='" + colspan + "'" : "") + ">" + icon + grpTextStr + "</td>";
					/*for (k = grp.groupColumnShow[n.idx] === false ? 1 : 2; k < colspan; k++) {
						str += "<td style='display:none;'></td>";
					}*/
					str += buildSummaryTd(i, 0, grp.groups, grp.groupColumnShow[n.idx] === false ?
							colspan - 1:
							colspan);
				} else {
					str += " colspan='" + (grp.groupColumnShow[n.idx] === false ? colspans - 1 : colspans) + "'" +
						">" + icon + grpTextStr + "</td>";
				}
				str += "</tr>";
				if (leaf) {
					gg = grp.groups[i + 1];
					sgr = n.startRow;
					end = gg !== undefined ? gg.startRow : grp.groups[i].startRow + grp.groups[i].cnt;
					if (grp._locgr) {
						offset = (page - 1) * rn;
						if (offset > n.startRow) {
							sgr = offset;
						}
					}
					for (kk = sgr; kk < end; kk++) {
						if (!grdata[kk - offset]) {
							break;
						}
						str += grdata[kk - offset].join("");
					}
					if (grp.groupSummaryPos[n.idx] !== "header") {
						if (gg !== undefined) {
							for (jj = 0; jj < grp.groupField.length; jj++) {
								if (gg.dataIndex === grp.groupField[jj]) {
									break;
								}
							}
							toEnd = grp.groupField.length - jj;
						}
						for (ik = 0; ik < toEnd; ik++) {
							if (!sumreverse[ik]) {
								continue;
							}
							hhdr = "";
							if (grp.groupCollapse && !grp.showSummaryOnHide) {
								hhdr = " style='display:none;'";
							}
							str += "<tr" + hhdr + " data-jqfootlevel='" + (n.idx - ik) + "' role='row' class='" + jqfootClass + "'>";
							str += buildSummaryTd(i, ik, grp.groups, 0);
							str += "</tr>";
						}
						toEnd = jj;
					}
				}
			});
			//$($t.tBodies[0]).append(str);
			return str;
		},
		groupingGroupBy: function (name, options) {
			return this.each(function () {
				var $t = this, p = $t.p, grp = p.groupingView, i, cm;
				if (typeof name === "string") {
					name = [name];
				}
				p.grouping = true;
				grp._locgr = false;
				//Set default, in case visibilityOnNextGrouping is undefined
				if (grp.visibiltyOnNextGrouping === undefined) {
					grp.visibiltyOnNextGrouping = [];
				}
				// show previous hidden groups if they are hidden and weren't removed yet
				for (i = 0; i < grp.groupField.length; i++) {
					cm = p.colModel[p.iColByName[grp.groupField[i]]];
					if (!grp.groupColumnShow[i] && grp.visibiltyOnNextGrouping[i] && cm != null && cm.hidden === true) {
						base.showCol.call($($t), grp.groupField[i]);
					}
				}
				// set visibility status of current group columns on next grouping
				for (i = 0; i < name.length; i++) {
					grp.visibiltyOnNextGrouping[i] = $(p.idSel + "_" + jgrid.jqID(name[i])).is(":visible");
				}
				p.groupingView = $.extend(p.groupingView, options || {});
				grp.groupField = name;
				$($t).trigger("reloadGrid");
			});
		},
		groupingRemove: function (current) {
			return this.each(function () {
				var $t = this, p = $t.p, tbody = $t.tBodies[0], grp = p.groupingView, i;
				if (current === undefined) {
					current = true;
				}
				p.grouping = false;
				if (current === true) {
					// show previous hidden groups if they are hidden and weren't removed yet
					for (i = 0; i < grp.groupField.length; i++) {
						if (!grp.groupColumnShow[i] && grp.visibiltyOnNextGrouping[i]) {
							base.showCol.call($($t), grp.groupField);
						}
					}
					$("tr.jqgroup, tr.jqfoot", tbody).remove();
					$("tr.jqgrow:hidden", tbody).show();
				} else {
					$($t).trigger("reloadGrid");
				}
			});
		},
		groupingCalculations: {
			handler: function (fn, v, field, round, roundType, rc) {
				var funcs = {
						sum: function () {
							return parseFloat(v || 0) + parseFloat((rc[field] || 0));
						},

						min: function () {
							if (v === "") {
								return parseFloat(rc[field] || 0);
							}
							return Math.min(parseFloat(v), parseFloat(rc[field] || 0));
						},

						max: function () {
							if (v === "") {
								return parseFloat(rc[field] || 0);
							}
							return Math.max(parseFloat(v), parseFloat(rc[field] || 0));
						},

						count: function () {
							if (v === "") {
								v = 0;
							}
							if (rc.hasOwnProperty(field)) {
								return v + 1;
							}
							return 0;
						},

						avg: function () {
							// the same as sum, but at end we divide it
							// so use sum instead of duplicating the code (?)
							return funcs.sum();
						}
					},
					res,
					mul;

				if (!funcs[fn]) {
					throw ("jqGrid Grouping No such method: " + fn);
				}
				res = funcs[fn]();

				if (round != null) {
					if (roundType === "fixed") {
						res = res.toFixed(round);
					} else {
						mul = Math.pow(10, round);
						res = Math.round(res * mul) / mul;
					}
				}

				return res;
			}
		}
	});
}(jQuery));
