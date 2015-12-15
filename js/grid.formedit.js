/**
 * jqGrid extension for form editing Grid Data
 * Copyright (c) 2008-2014, Tony Tomov, tony@trirand.com, http://trirand.com/blog/
 * Copyright (c) 2014-2015, Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 **/

/*jshint eqeqeq:false, eqnull:true, devel:true */
/*jslint browser: true, eqeq: true, plusplus: true, unparam: true, vars: true, nomen: true, continue: true, white: true, todo: true */
/*global jQuery, define, xmlJsonClass */
(function(factory) {
  "use strict";
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["jquery", "./grid.base", "./jquery.fmatter", "./grid.common", "./jsonxml"], factory);
  } else if (typeof exports === "object") {
    // Node/CommonJS
    factory(require("jquery"));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function($) {
  "use strict";
  var jgrid = $.jgrid,
    jqID = jgrid.jqID,
    base = $.fn.jqGrid,
    mergeCssClasses = jgrid.mergeCssClasses,
    hasOneFromClasses = jgrid.hasOneFromClasses,
    getGuiStyles = function(path, jqClasses) {
      return mergeCssClasses(jgrid.getRes(jgrid.guiStyles[this.p.guiStyle], path), jqClasses || "");
    },
    getGuiStateStyles = function(path) {
      return getGuiStyles.call(this, "states." + path);
    };

  // begin module grid.formedit
  var jgridFeedback = jgrid.feedback,
    fullBoolFeedback = jgrid.fullBoolFeedback,
    hideModal = jgrid.hideModal,
    viewModal = jgrid.viewModal,
    createModal = jgrid.createModal,
    infoDialog = jgrid.info_dialog,
    builderFmButon = jgrid.builderFmButon,
    isEmptyString = function(htmlStr) {
      return htmlStr === "&nbsp;" || htmlStr === "&#160;" || (htmlStr.length === 1 && htmlStr.charCodeAt(0) === 160);
    };
  jgrid.extend({
    searchGrid: function(oMuligrid) {
      // if one uses jQuery wrapper with multiple grids, then oMuligrid specify the object with common options
      return this.each(function() {
        var $t = this,
          $self = $($t),
          p = $t.p;
        if (!$t.grid || p == null) {
          return;
        }
        // make new copy of the options and use it for ONE specific grid.
        // p.searching can contains grid specific options
        // we will don't modify the input options oMuligrid
        var o = $.extend(true, {
            recreateFilter: false,
            drag: true,
            sField: "searchField",
            sValue: "searchString",
            sOper: "searchOper",
            sFilter: "filters",
            loadDefaults: true, // this options activates loading of default filters from grid's postData for Multipe Search only.
            beforeShowSearch: null,
            afterShowSearch: null,
            onInitializeSearch: null,
            afterRedraw: null,
            afterChange: null,
            closeAfterSearch: false,
            closeAfterReset: false,
            //closeOnEscape: false,
            searchOnEnter: false,
            multipleSearch: false,
            multipleGroup: false,
            //cloneSearchRowOnAdd: true,
            // we can't use srort names like resetIcon because of conflict with existing "x" of filterToolbar
            removemodal: false,
            dataheight: "auto",
            showQuery: false,
            errorcheck: true,
            sopt: null,
            stringResult: undefined,
            onClose: null,
            onSearch: null,
            onReset: null,
            //toTop : false,
            //overlay : 30,
            columns: [],
            tmplNames: null,
            tmplFilters: null,
            tmplLabel: " Template: ",
            showOnLoad: false,
            layer: null,
            operands: {
              "eq": "=",
              "ne": "<>",
              "lt": "<",
              "le": "<=",
              "gt": ">",
              "ge": ">=",
              "bw": "LIKE",
              "bn": "NOT LIKE",
              "in": "IN",
              "ni": "NOT IN",
              "ew": "LIKE",
              "en": "NOT LIKE",
              "cn": "LIKE",
              "nc": "NOT LIKE",
              "nu": "IS NULL",
              "nn": "IS NOT NULL"
            }
          },
          base.getGridRes.call($self, "search"),
          jgrid.search || {},
          p.searching || {},
          oMuligrid || {});

        var fid = "fbox_" + p.id,
          commonIconClass = o.commonIconClass,
          ids = {
            themodal: "searchmod" + fid,
            modalhead: "searchhd" + fid,
            modalcontent: "searchcnt" + fid,
            resizeAlso: fid
          },
          themodalSelector = "#" + jqID(ids.themodal),
          gboxSelector = p.gBox,
          gviewSelector = p.gView,
          defaultFilters = p.postData[o.sFilter],
          searchFeedback = function() {
            var args = $.makeArray(arguments);
            args.unshift("Search");
            args.unshift("Filter");
            args.unshift(o);
            return jgridFeedback.apply($t, args);
          };
        if (typeof defaultFilters === "string") {
          defaultFilters = $.trim(defaultFilters) !== "" ? jgrid.parse(defaultFilters) : undefined;
        }
        if (o.recreateFilter === true) {
          $(themodalSelector).remove();
        } else if ($self.data("searchProp")) {
          $.extend(o, $self.data("searchProp"));
        }

        function showFilter($filter) {
          if (searchFeedback("beforeShow", $filter)) {
            $(themodalSelector).data("onClose", o.onClose);
            viewModal(themodalSelector, {
              gbox: gboxSelector,
              jqm: o.jqModal,
              overlay: o.overlay,
              modal: o.modal,
              overlayClass: o.overlayClass,
              toTop: o.toTop
            });
            searchFeedback("afterShow", $filter);
          }
        }
        if ($(themodalSelector)[0] !== undefined) {
          showFilter($("#fbox_" + p.idSel));
        } else {
          var bQ = "",
            tmpl = "",
            colnm, found = false,
            bt, cmi = -1,
            columns = $.extend([], p.colModel),
            bS = builderFmButon.call($t, fid + "_search", o.Find, mergeCssClasses(commonIconClass, o.findDialogIcon), "left", "primaryButton"),
            bC = builderFmButon.call($t, fid + "_reset", o.Reset, mergeCssClasses(commonIconClass, o.resetDialogIcon), "left");
          if (o.showQuery) {
            bQ = builderFmButon.call($t, fid + "_query", "Query", mergeCssClasses(commonIconClass, o.queryDialogIcon), "left", "warningButton") + "&#160;";
          }
          if (!o.columns.length) {
            $.each(columns, function(i, n) {
              if (!n.label) {
                n.label = p.colNames[i];
              }
              // find first searchable column and set it if no default filter
              if (!found) {
                var searchable = (n.search === undefined) ? true : n.search,
                  hidden = (n.hidden === true),
                  ignoreHiding = (n.searchoptions && n.searchoptions.searchhidden === true);
                if ((ignoreHiding && searchable) || (searchable && !hidden)) {
                  found = true;
                  colnm = n.index || n.name;
                  cmi = i;
                }
              }
            });
          } else {
            columns = o.columns;
            cmi = 0;
            colnm = columns[0].index || columns[0].name;
          }
          // old behaviour
          if ((!defaultFilters && colnm) || o.multipleSearch === false) {
            var cmop = "eq";
            if (cmi >= 0 && columns[cmi].searchoptions && columns[cmi].searchoptions.sopt) {
              cmop = columns[cmi].searchoptions.sopt[0];
            } else if (o.sopt && o.sopt.length) {
              cmop = o.sopt[0];
            }
            defaultFilters = {
              groupOp: "AND",
              rules: [{
                field: colnm,
                op: cmop,
                data: ""
              }]
            };
          }
          found = false;
          if (o.tmplNames && o.tmplNames.length) {
            found = true;
            tmpl = o.tmplLabel;
            tmpl += "<select class='ui-template " + getGuiStyles.call($t, "filter.dataField") + "'>";
            tmpl += "<option value='default'>Default</option>";
            $.each(o.tmplNames, function(i, n) {
              tmpl += "<option value='" + i + "'>" + n + "</option>";
            });
            tmpl += "</select>";
          }

          bt = "<div class='modal-footer' id='" + fid + "_2'><div class='EditButton EditButton-" + p.direction + " form-inline'  style='float:" + (p.direction === "rtl" ? "right" : "left") + ";'>" + bC + tmpl + "</div><div class='EditButton EditButton-" + p.direction + "'>" + bQ + bS + "</div></div>";
          var fil = $("<div id='" + fid + "' class='modal-body searchFilter'></div>" + bt).insertBefore(gviewSelector);
          if (p.direction === "rtl") {
            $(fil[0]).attr("dir", "rtl");
          }

          fid = jqID(fid);
          o.gbox = "#gbox_" + fid;
          o.height = "auto";
          fid = "#" + fid;
          $(fid).jqFilter({
            columns: columns,
            filter: o.loadDefaults ? defaultFilters : null,
            showQuery: o.showQuery,
            errorcheck: o.errorcheck,
            sopt: o.sopt,
            groupButton: o.multipleGroup,
            ruleButtons: o.multipleSearch,
            afterRedraw: o.afterRedraw,
            ops: o.odata,
            cops: p.customSortOperations,
            operands: o.operands,
            ajaxSelectOptions: p.ajaxSelectOptions,
            groupOps: o.groupOps,
            onChange: function() {
              var queryString = this.toUserFriendlyString(o.multipleSearch);
              if (this.p.showQuery) {
                if (queryString) {
                  $(".queryresult", fil).show();
                } else {
                  $(".queryresult", fil).hide();
                }

                $(".query", this).html(queryString);
              }
              $('.inputQuery', this).val(queryString);
              fullBoolFeedback.call($t, o.afterChange, "jqGridFilterAfterChange", $(fid), o);
            },
            direction: p.direction,
            id: p.id
          });

          if (found && o.tmplFilters && o.tmplFilters.length) {
            $(".ui-template", fil).bind("change", function() {
              var curtempl = $(this).val();
              if (curtempl === "default") {
                $(fid).jqFilter("addFilter", defaultFilters);
              } else {
                $(fid).jqFilter("addFilter", o.tmplFilters[parseInt(curtempl, 10)]);
              }
              return false;
            });
          }
          if (o.multipleGroup === true) {
            o.multipleSearch = true;
          }
          searchFeedback("onInitialize", $(fid));
          if (o.layer) {
            createModal.call($t, ids, fil, o, gviewSelector, "#" + jqID(o.layer), {
              position: "relative"
            });
          } else {
            createModal.call($t, ids, fil, o, gviewSelector);
          }
          if (o.searchOnEnter || o.closeOnEscape) {
            $(themodalSelector).keydown(function(e) {
              var $target = $(e.target);
              if (o.searchOnEnter && e.which === 13 && // 13 === $.ui.keyCode.ENTER
                !$target.hasClass("add-group") && !$target.hasClass("add-rule") &&
                !$target.hasClass("delete-group") && !$target.hasClass("delete-rule") &&
                (!$target.hasClass("fm-button") || !$target.is("[id$=_query]"))) {
                $(fid + "_search").click();
                return false;
              }
            });
          }
          if (bQ) {
            $(fid + "_query").bind("click", function() {
              $(".queryresult", fil).toggle();
              return false;
            });
          }
          if (o.stringResult === undefined) {
            // to provide backward compatibility, inferring stringResult value from multipleSearch
            o.stringResult = o.multipleSearch;
          }
          $(fid + "_search").bind("click", function() {
            var sdata = {},
              res, filters, fl = $(fid),
              $inputs = fl.find(".input-elm");
            if ($inputs.filter(":focus")) {
              $inputs = $inputs.filter(":focus");
            }
            $inputs.change();
            filters = fl.jqFilter("filterData");
            if (o.errorcheck) {
              fl[0].hideError();
              if (!o.showQuery) {
                fl.jqFilter("toSQLString");
              }
              if (fl[0].p.error) {
                fl[0].showError();
                return false;
              }
            }

            if (o.stringResult || p.datatype === "local") {
              try {
                // xmlJsonClass or JSON.stringify
                res = xmlJsonClass.toJson(filters, "", "", false);
              } catch (e) {
                try {
                  res = JSON.stringify(filters);
                } catch (ignore) {}
              }
              if (typeof res === "string") {
                sdata[o.sFilter] = res;
                $.each([o.sField, o.sValue, o.sOper], function() {
                  sdata[this] = "";
                });
              }
            } else {
              if (o.multipleSearch) {
                sdata[o.sFilter] = filters;
                $.each([o.sField, o.sValue, o.sOper], function() {
                  sdata[this] = "";
                });
              } else {
                sdata[o.sField] = filters.rules[0].field;
                sdata[o.sValue] = filters.rules[0].data;
                sdata[o.sOper] = filters.rules[0].op;
                sdata[o.sFilter] = "";
              }
            }
            sdata.query = $(".inputQuery", fid).val();
            p.search = true;
            $.extend(p.postData, sdata);
            if (fullBoolFeedback.call($t, o.onSearch, "jqGridFilterSearch", p.filters)) {
              $self.trigger("reloadGrid", [$.extend({
                page: 1
              }, o.reloadGridSearchOptions || {})]);
            }
            if (o.closeAfterSearch) {
              hideModal(themodalSelector, {
                gb: gboxSelector,
                jqm: o.jqModal,
                onClose: o.onClose,
                removemodal: o.removemodal
              });
            }
            return false;
          });
          $(fid + "_reset").bind("click", function() {
            var sdata = {},
              fl1 = $(fid);
            p.search = false;
            p.resetsearch = true;
            if (o.multipleSearch === false) {
              sdata[o.sField] = sdata[o.sValue] = sdata[o.sOper] = "";
            } else {
              sdata[o.sFilter] = "";
            }
            fl1[0].resetFilter();
            if (found) {
              $(".ui-template", fil).val("default");
            }
            $.extend(p.postData, sdata);
            if (fullBoolFeedback.call($t, o.onReset, "jqGridFilterReset")) {
              $self.trigger("reloadGrid", [$.extend({
                page: 1
              }, o.reloadGridResetOptions || {})]);
            }
            if (o.closeAfterReset) {
              hideModal(themodalSelector, {
                gb: gboxSelector,
                jqm: o.jqModal,
                onClose: o.onClose,
                removemodal: o.removemodal
              });
            }
            return false;
          });
          showFilter($(fid));
        }
      });
    },
    editGridRow: function(rowid, oMuligrid) { // if one uses jQuery wrapper with multiple grids, then oMultiple specify the object with common options
      return this.each(function() {
        var $t = this,
          $self = $($t),
          p = $t.p;
        if (!$t.grid || p == null || !rowid) {
          return;
        }
        // make new copy of the options oMuligrid and use it for ONE specific grid.
        // p.formEditing can contains grid specific options
        // we will don't modify the input options oMuligrid
        var gridId = p.id,
          getGridRes = base.getGridRes,
          setSelection = base.setSelection,
          o = $.extend(true, {
              url: null,
              mtype: "POST",
              clearAfterAdd: true,
              closeAfterEdit: false,
              reloadAfterSubmit: true,
              onInitializeForm: null,
              beforeInitData: null,
              beforeShowForm: null,
              afterShowForm: null,
              beforeSubmit: null,
              afterSubmit: null,
              onclickSubmit: null,
              afterComplete: null,
              onclickPgButtons: null,
              afterclickPgButtons: null,
              editData: {},
              addedrow: "first",
              topinfo: "",
              bottominfo: "",
              savekey: [false, 13],
              navkeys: [false, 38, 40],
              checkOnSubmit: false,
              checkOnUpdate: false,
              _savedData: {},
              processing: false,
              onClose: null,
              ajaxEditOptions: {},
              serializeEditData: null,
              viewPagerButtons: true,
              overlayClass: "ui-widget-overlay",
              removemodal: false,
              skipPostTypes: ["image", "file"],
              form: "edit"
            },
            getGridRes.call($self, "edit"),
            jgrid.edit,
            p.formEditing || {},
            oMuligrid || {});
        var frmgr = "FrmGrid_" + gridId,
          frmgrId = frmgr,
          frmtborg = "TblGrid_" + gridId,
          frmtb = "#" + jqID(frmtborg),
          frmtb2 = frmtb + "_2",
          ids = {
            themodal: "editmod" + gridId,
            modalhead: "edithd" + gridId,
            modalcontent: "editcnt" + gridId,
            resizeAlso: frmgr
          },
          themodalSelector = "#" + jqID(ids.themodal),
          gboxSelector = p.gBox,
          propOrAttr = p.propOrAttr,
          colModel = p.colModel,
          iColByName = p.iColByName,
          maxCols = 1,
          maxRows = 0,
          postdata, diff, editOrAdd, commonIconClass = o.commonIconClass,
          errcap = getGridRes.call($self, "errors.errcap"),
          editFeedback = function() {
            var args = $.makeArray(arguments);
            args.unshift("");
            args.unshift("AddEdit");
            args.unshift(o);
            return jgridFeedback.apply($t, args);
          },
          disabledClass = getGuiStateStyles.call($t, "disabled"),
          highlightClass = getGuiStateStyles.call($t, "select"),
          errorClass = getGuiStateStyles.call($t, "error"),
          errorIcon = "<span class='" + jgrid.getIconRes(p.iconSet, "form.error") + "'></span>";
        frmgr = "#" + jqID(frmgr);
        if (rowid === "new") {
          rowid = "_empty";
          editOrAdd = "add";
          o.caption = o.addCaption;
        } else {
          o.caption = o.editCaption;
          editOrAdd = "edit";
        }

        function getFormData() {
          $(".formElement").each(function() {
            var $celm = $(".customelement", this),
              nm = this.name,
              cm, iCol, editoptions, formatoptions, newformat, type;
            if ($celm.length) {
              nm = $celm.attr("name");
              iCol = iColByName[nm];
              if (iCol !== undefined) {
                cm = colModel[iCol];
                editoptions = cm.editoptions || {};
                if ($.isFunction(editoptions.custom_value)) {
                  try {
                    postdata[nm] = editoptions.custom_value.call($t, $("#" + jqID(nm), frmtb), "get");
                    if (postdata[nm] === undefined) {
                      throw "e1";
                    }
                  } catch (e) {
                    if (e === "e1") {
                      infoDialog.call($t, errcap, "function 'custom_value' " + o.msg.novalue, o.bClose);
                    } else {
                      infoDialog.call($t, errcap, e.message, o.bClose);
                    }
                  }
                  return true;
                }
              }
            } else {
              type = $(this)[0].type;
              switch (type) {
                case "checkbox":
                  postdata[nm] = $(this).is(":checked") ? $(this).val() : $(this).data("offval");
                  break;
                case "radio":
                  var $checked = $(this).find('input:checked');
                  postdata[$checked.attr('name')] = $checked.val();
                  break;
                case "select-one":
                  postdata[nm] = $("option:selected", this).val();
                  break;
                case "select-multiple":
                  nm = nm.replace("[]", "");
                  postdata[nm] = $(this).val();
                  postdata[nm] = postdata[nm] ? postdata[nm].join(",") : "";
                  var selectedText = [];
                  $("option:selected", this).each(
                    function(i, selected) {
                      selectedText[i] = $(selected).text();
                    }
                  );
                  break;
                case "date":
                  postdata[nm] = $(this).val();
                  if (String(postdata[nm]).split("-").length === 3) {
                    iCol = iColByName[nm];
                    if (iCol !== undefined) {
                      cm = colModel[iCol];
                      formatoptions = cm.formatoptions || {};
                      newformat = formatoptions.newformat || getGridRes.call($self, "formatter.date.newformat");
                      postdata[nm] = jgrid.parseDate.call($self[0], "Y-m-d", postdata[nm], newformat);
                    }
                  }
                  break;
                case "file":
                  var val = $(this)[0].files[0];
                  if (val !== undefined) {
                    postdata[nm] = $(this)[0].files[0];
                  }
                  break;
                default:
                  if (type !== undefined && $.inArray(type, o.skipPostTypes) < 0) {
                    postdata[nm] = $(this).val();
                  }
                  break;
              }
            }
          });
          return true;
        }

        function createData(rowid, tb, maxcols) {
          var cnt = 0,
            retpos = [],
            ind = false,
            viewDataClasses = getGuiStyles.call($t, "dialog.viewData"),
            viewLabelClasses = getGuiStyles.call($t, "dialog.viewLabel", "form-view-label"),
            tdtmpl = "<div class='" + viewLabelClasses + "'>&#160;</div><div class='" + viewDataClasses + "'>&#160;</div>",
            tmpl = "",
            i; //*2
          for (i = 1; i <= maxcols; i++) {
            tmpl += tdtmpl;
          }
          if (rowid !== "_empty") {
            ind = base.getInd.call($self, rowid);
          }
          $(colModel).each(function(i) {
            var cm = this,
              nm = cm.name,
              $td, hc, trdata, tmp, dc, elc, editable = cm.editable,
              disabled = false,
              readonly = false,
              mode = rowid === "_empty" ? "addForm" : "editForm";
            if ($.isFunction(editable)) {
              editable = editable.call($t, {
                rowid: rowid,
                iCol: i,
                iRow: ind, // can be false for Add operation
                cmName: nm,
                cm: cm,
                mode: mode
              });
            }
            // hidden fields are included in the form
            if (cm.editrules && cm.editrules.edithidden === true) {
              hc = false;
            } else {
              hc = cm.hidden === true || editable === "hidden" ? true : false;
            }
            dc = hc ? "style='display:none'" : "";
            switch (String(editable).toLowerCase()) {
              case "hidden":
                editable = true;
                break;
              case "disabled":
                editable = true;
                disabled = true;
                break;
              case "readonly":
                editable = true;
                readonly = true;
                break;
            }
            if (nm !== "cb" && nm !== "subgrid" && editable === true && nm !== "rn") {
              if (ind === false) {
                tmp = "";
              } else {
                $td = $($t.rows[ind].cells[i]); // $("td[role=gridcell]:eq(" + i + ")", $t.rows[ind])
                try {
                  tmp = $.unformat.call($t, $td, {
                    rowId: rowid,
                    colModel: cm
                  }, i);
                } catch (_) {
                  tmp = (cm.edittype && cm.edittype === "textarea") ? $td.text() : $td.html();
                }
                if (isEmptyString(tmp)) {
                  tmp = "";
                }
              }
              var opt = $.extend({}, cm.editoptions || {}, {
                  id: nm,
                  name: nm,
                  rowId: rowid,
                  mode: mode
                }),
                frmopt = $.extend({}, {
                  elmprefix: "",
                  elmsuffix: "",
                  rowabove: false,
                  rowcontent: ""
                }, cm.formoptions || {}),
                rp = parseInt(frmopt.rowpos, 10) || cnt + 1,
                cp = parseInt((parseInt(frmopt.colpos, 10) || 1) * 2, 10);
              if (rowid === "_empty" && opt.defaultValue) {
                tmp = $.isFunction(opt.defaultValue) ? opt.defaultValue.call($t) : opt.defaultValue;
              }
              if (!cm.edittype) {
                cm.edittype = "text";
              }
              if (p.autoEncodeOnEdit) {
                tmp = jgrid.oldDecodePostedData(tmp);
              }
              elc = jgrid.createEl.call($t, cm.edittype, opt, tmp, false, $.extend({}, jgrid.ajaxOptions, p.ajaxSelectOptions || {}));
              //if(tmp === "" && cm.edittype == "checkbox") {tmp = $(elc).data("offval");}
              //if(tmp === "" && cm.edittype == "select") {tmp = $("option:eq(0)",elc).text();}
              if (o.checkOnSubmit || o.checkOnUpdate) {
                o._savedData[nm] = tmp;
              }
              $(elc).addClass("formElement");
              if ($.inArray(cm.edittype, ["text", "textarea", "password", "select", "datepicker", "datetimepicker"]) > -1) {
                $(elc).addClass(getGuiStyles.call($t, "dialog.dataField"));
              }
              trdata = $(tb).find("tr[data-rowpos=" + rp + "]");
              if (frmopt.rowabove) {
                var newdata = $("<div class='contentinfo' colspan='" + (maxcols * 2) + "'>" + frmopt.rowcontent + "</div>");
                $(tb).append(newdata);
                newdata[0].rp = rp;
              }
              if (trdata.length === 0) {
                trdata = $("<div " + dc + " data-rowpos='" + rp + "' class='row'></div>").attr("id", "tr_" + nm);
                $(trdata).append(tmpl);
                $(tb).append(trdata);
                trdata[0].rp = rp;
              }
              var $label = $("div:eq(" + (cp - 2) + ")", trdata[0]),
                $data = $("div:eq(" + (cp - 1) + ")", trdata[0]),
                tooltip = frmopt.tooltip !== undefined ? '<span class="fa fa-question-circle" data-toggle="tooltip" title="' + frmopt.tooltip + '"></span>' : '';

              $label.html(cm.edittype !== "checkbox" ? (frmopt.label === undefined ? p.colNames[i] : frmopt.label || "&#160;") + (cm.editrules !== undefined && cm.editrules.required === true ? '<span class="' + jgrid.getIconRes(p.iconSet, "form.required") + '"></span>' + tooltip + ' :' : tooltip + ' :') : '');
              $data[isEmptyString($data.html()) ? "html" : "append"](frmopt.elmprefix).append(elc).append(frmopt.elmsuffix);
              if (disabled) {
                $label.addClass(disabledClass);
                $data.addClass(disabledClass);
                $(elc).prop("readonly", true);
                $(elc).prop("disabled", true);
              } else if (readonly) {
                $(elc).prop("readonly", true);
              }
              if (cm.edittype === "custom" && $.isFunction(opt.custom_value)) {
                opt.custom_value.call($t, $("#" + jqID(nm), frmgr), "set", tmp);
              } else {
                switch (cm.edittype) {
                  case "checkbox":
                    $("div:eq(" + (cp - 1) + ")", trdata[0]).prepend("<label class=\"checkbox\"><i></i>" + (frmopt.label || cm.label) + "</label>" + tooltip);
                    setTimeout(function() {
                      $("#" + jqID(nm), frmgr).prependTo($("div:eq(" + (cp - 1) + ") .checkbox", trdata[0]));
                    }, 0);
                    break;
                  case "select2":
                    setTimeout(function() {
                      $(elc).select2();
                    }, 200);
                    break;
                  case "autocomplete":
                    $(elc).select2({
                      language: p.locale,
                      maximumSelectionLength: opt.maximumSelectionLength,
                      minimumInputLength: opt.minimumInputLength !== undefined ? opt.minimumInputLength : 2,
                      maximumInputLength: opt.maximumInputLength !== undefined ? opt.maximumInputLength : 2,
                      showSearchInput: opt.showSearchInput !== undefined ? opt.showSearchInput : true,
                      showLoading: opt.showLoading !== undefined ? opt.showLoading : true,
                      ajax: {
                        url: opt.dataUrl.toLowerCase(),
                        type: 'POST',
                        dataType: 'json',
                        processResults: function(data) { /* page */
                          return {
                            results: data.items
                          };
                        },
                        cache: true
                      }
                    });
                    if (tmp) {
                      setTimeout(function() {
                        $.post(opt.dataUrl.toLowerCase(), {
                          value: tmp
                        }, function(response) {
                          var tmpValue = [];
                          $.each(response, function(value, text) {
                            tmpValue.push(value);
                            $(elc).append($("<option/>", {
                              value: value,
                              text: text
                            }));
                          });
                          $(elc).val(tmpValue).trigger("change");
                        }, 'json');
                      }, 0);
                    }
                    break;
                  case "file":
                    var elem = document.createElement("input");
                    elem.type = "hidden";
                    elem.id = nm;
                    elem.name = nm;
                    elem.value = tmp;
                    $(elem).addClass("formElement");
                    $("div:eq(" + (cp - 1) + ")", trdata[0]).append(elem);
                    var html = '<label class="input-file" for="File' + nm + '"><div class="input-group input-group-sm"><input type="text" class="form-control input-sm" readonly>';
                    html += '<span class="input-group-btn"><div class="btn btn-default">Browse</div></span></div></label>';
                    $("div:eq(" + (cp - 1) + ")", trdata[0]).prepend(html);
                    setTimeout(function() {
                      $("#File" + jqID(nm), frmgr).prependTo($("div:eq(" + (cp - 1) + ") .input-group-btn > .btn", trdata[0]));
                      $("#File" + jqID(nm), frmgr).attr('onchange', 'this.closest(\'.input-group\').getElementsByTagName(\'input\')[0].value = this.value;');
                    }, 0);
                    break;
                  case "datepicker":
                  case "datetimepicker":
                    $("div:eq(" + (cp - 1) + ")", trdata[0]).append("<div id='" + nm + "-group' class='input-group input-group-sm date'><span class='input-group-addon' title='select'><i class='glyphicon glyphicon-calendar'></i></span></div>");
                    setTimeout(function() {
                      $("#" + jqID(nm), frmgr).val(tmp);
                      $("#" + jqID(nm), frmgr).prependTo($("#" + jqID(nm) + "-group", frmgr));
                      $("#" + jqID(nm) + "-group", frmgr).datetimepicker({
                        locale: p.locale,
                        format: opt.format || (cm.edittype === "datepicker" ? 'DD/MM/YYYY' : 'DD/MM/YYYY HH:mm:ss')
                      });
                    }, 0);
                    break;
                }
              }

              jgrid.bindEv.call($t, elc, opt);
              retpos[cnt] = i;
              cnt++;
            }
          });
          if (cnt > 0) {
            var idrow = $("<input class='formElement' id='id_g' type='hidden' name='" + gridId + "_id' value='" + rowid + "'/>");
            idrow[0].rp = cnt + 999;
            $(tb).append(idrow);
            if (o.checkOnSubmit || o.checkOnUpdate) {
              o._savedData[gridId + "_id"] = rowid;
            }
          }

          $('[data-toggle="tooltip"]', $(tb)).tooltip({
            placement: 'bottom',
            container: '.modal-body',
            trigger: 'click'
          });

          return retpos;
        }

        function fillData(rowid, fmid) {
          var nm, cnt = 0,
            tmp, fld, opt, vl, vlc;
          if (o.checkOnSubmit || o.checkOnUpdate) {
            o._savedData = {};
            o._savedData[gridId + "_id"] = rowid;
          }
          var cm = p.colModel;
          if (rowid === "_empty") {
            $(cm).each(function() {
              nm = this.name;
              opt = $.extend({}, this.editoptions || {});
              fld = $("#" + jqID(nm), fmid);
              if (fld && fld.length && fld[0] !== null) {
                vl = "";
                if (this.edittype === "custom" && $.isFunction(opt.custom_value)) {
                  opt.custom_value.call($t, fld, "set", vl);
                } else if (this.edittype === "autocomplete") {
                  $(fld).val(null).trigger("change").find('option').remove();
                  if (opt.defaultValue) {
                    $.post(opt.dataUrl.toLowerCase(), {
                      value: opt.defaultValue
                    }, function(response) {
                      var tmpValue = [];
                      $.each(response, function(value, text) {
                        tmpValue.push(value);
                        $(fld).append($("<option/>", {
                          value: value,
                          text: text
                        }));
                      });
                      $(fld).val(tmpValue).trigger("change");
                    }, 'json');
                  }
                } else if (opt.defaultValue) {
                  vl = $.isFunction(opt.defaultValue) ? opt.defaultValue.call($t) : opt.defaultValue;
                  if (fld[0].type === "checkbox") {
                    vlc = vl.toLowerCase();
                    if (vlc.search(/(false|f|0|no|n|off|undefined)/i) < 0 && vlc !== "") {
                      fld[0].checked = true;
                      fld[0].defaultChecked = true;
                      fld[0].value = vl;
                    } else {
                      fld[0].checked = false;
                      fld[0].defaultChecked = false;
                    }
                  } else {
                    fld.val(vl);
                  }
                } else {
                  if (fld[0].type === "checkbox") {
                    fld[0].checked = false;
                    fld[0].defaultChecked = false;
                    vl = $(fld).data("offval");
                  } else if (fld[0].type && fld[0].type.substr(0, 6) === "select") {
                    fld[0].selectedIndex = 0;
                  } else {
                    fld.val(vl);
                  }
                }
                if (o.checkOnSubmit === true || o.checkOnUpdate) {
                  o._savedData[nm] = vl;
                }
              } else if (this.edittype === "radio") {
                if (opt.defaultValue) {
                  $("input[name=" + nm + "][value=" + opt.defaultValue + "]", fmid)[propOrAttr]({
                    "checked": true
                  });
                } else {
                  $("input[name=" + nm + "]", fmid)[propOrAttr]({
                    "checked": false
                  });
                }
              }

            });
            $("#id_g", fmid).val(rowid);
            return;
          }
          var tre = base.getInd.call($self, rowid, true);
          if (!tre) {
            return;
          }
          //$("td[role=gridcell]", tre)
          $(tre.cells).filter("td[role=gridcell]").each(function(i) {
            nm = cm[i].name;
            // hidden fields are included in the form
            if (nm !== "cb" && nm !== "subgrid" && nm !== "rn" && cm[i].editable === true) {
              try {
                tmp = $.unformat.call($t, $(this), {
                  rowId: rowid,
                  colModel: cm[i]
                }, i);
              } catch (_) {
                tmp = cm[i].edittype === "textarea" ? $(this).text() : $(this).html();
              }
              if (p.autoEncodeOnEdit) {
                tmp = jgrid.oldDecodePostedData(tmp);
              }
              if (o.checkOnSubmit === true || o.checkOnUpdate) {
                o._savedData[nm] = tmp;
              }
              nm = "#" + jqID(nm);
              switch (cm[i].edittype) {
                case "password":
                case "text":
                case "button":
                case "image":
                case "textarea":
                case "datepicker":
                case "datetimepicker":
                  if (isEmptyString(tmp)) {
                    tmp = "";
                  }
                  $(nm, fmid).val(tmp);
                  break;
                case "select":
                  var opv = tmp.split(",");
                  opv = $.map(opv, function(n) {
                    return $.trim(n);
                  });
                  $(nm + " option", fmid).each(function() {
                    var selOpt = this,
                      $selOpt = $(selOpt),
                      optVal = $.trim($selOpt.val()),
                      optText = $.trim($selOpt.text());
                    if (!cm[i].editoptions.multiple && ($.trim(tmp) === optText || opv[0] === optText || opv[0] === optVal)) {
                      selOpt.selected = true;
                    } else if (cm[i].editoptions.multiple) {
                      if ($.inArray(optText, opv) > -1 || $.inArray(optVal, opv) > -1) {
                        selOpt.selected = true;
                      } else {
                        selOpt.selected = false;
                      }
                    } else {
                      selOpt.selected = false;
                    }
                  });
                  break;
                case "checkbox":
                  tmp = String(tmp);
                  if (cm[i].editoptions && cm[i].editoptions.value) {
                    var cb = cm[i].editoptions.value.split(":");
                    if (cb[0] === tmp) {
                      $(nm, fmid)[propOrAttr]({
                        "checked": true,
                        "defaultChecked": true
                      });
                    } else {
                      $(nm, fmid)[propOrAttr]({
                        "checked": false,
                        "defaultChecked": false
                      });
                    }
                  } else {
                    tmp = tmp.toLowerCase();
                    if (tmp.search(/(false|f|0|no|n|off|undefined)/i) < 0 && tmp !== "") {
                      $(nm, fmid)[propOrAttr]("checked", true);
                      $(nm, fmid)[propOrAttr]("defaultChecked", true); //ie
                    } else {
                      $(nm, fmid)[propOrAttr]("checked", false);
                      $(nm, fmid)[propOrAttr]("defaultChecked", false); //ie
                    }
                  }
                  break;
                case "radio":
                  tmp = String(tmp);
                  if (tmp !== "") {
                    $("input[name=" + cm[i].name + "][value=" + tmp + "]", fmid)[propOrAttr]({
                      "checked": true
                    });
                  } else {
                    $("input[name=" + cm[i].name + "]", fmid)[propOrAttr]({
                      "checked": false
                    });
                  }
                  break;
                case "custom":
                  try {
                    if (cm[i].editoptions && $.isFunction(cm[i].editoptions.custom_value)) {
                      cm[i].editoptions.custom_value.call($t, $(nm, fmid), "set", tmp);
                    } else {
                      throw "e1";
                    }
                  } catch (e) {
                    if (e === "e1") {
                      infoDialog.call($t, errcap, "function 'custom_value' " + o.msg.nodefined, o.bClose);
                    } else {
                      infoDialog.call($t, errcap, e.message, o.bClose);
                    }
                  }
                  break;
                case "file":
                  $("#File" + cm[i].name, fmid).val(null).change();
                  $(nm, fmid).val(tmp);
                  break;
                case "autocomplete":
                  var $fcbk = $(nm, fmid);
                  $fcbk.val(null).trigger("change").find('option').remove();
                  $.post(cm[i].editoptions.dataUrl.toLowerCase(), {
                    value: tmp
                  }, function(response) {
                    var tmpValue = [];
                    $.each(response, function(value, text) {
                      tmpValue.push(value);
                      $fcbk.append($("<option/>", {
                        value: value,
                        text: text
                      }));
                    });
                    $fcbk.val(tmpValue).trigger("change");
                  }, 'json');
                  break;
              }
              cnt++;
            }
          });
          if (cnt > 0) {
            $("#id_g", frmtb).val(rowid);
          }
        }

        function setNullsOrUnformat() {
          var url = o.url || p.editurl;
          $.each(colModel, function(i, cm) {
            var cmName = cm.name,
              value = postdata[cmName];
            if (cm.formatter === "date" && (cm.formatoptions == null || cm.formatoptions.sendFormatted !== true)) {
              // TODO: call all other predefined formatters!!! Not only formatter: "date" have the problem.
              // Floating point separator for example
              postdata[cmName] = $.unformat.date.call($t, value, cm);
            }
            if (url !== "clientArray" && cm.editoptions && cm.editoptions.NullIfEmpty === true) {
              if (postdata.hasOwnProperty(cmName) && value === "") {
                postdata[cmName] = "null";
              }
            }
          });
        }

        function postIt() {
          var ret = [true, "", ""],
            onClickSubmitResult = {},
            opers = p.prmNames,
            idname, oper, key, selr, i, url, itm;
          var retvals = $self.triggerHandler("jqGridAddEditBeforeCheckValues", [$(frmgr), editOrAdd]);
          if (retvals && typeof retvals === "object") {
            postdata = retvals;
          }

          if ($.isFunction(o.beforeCheckValues)) {
            retvals = o.beforeCheckValues.call($t, postdata, $(frmgr), editOrAdd);
            if (retvals && typeof retvals === "object") {
              postdata = retvals;
            }
          }
          for (key in postdata) {
            if (postdata.hasOwnProperty(key)) {

              var valref = p.iColByName[key];
              if (valref !== undefined || valref > 0) {
                if (colModel[valref].edittype === "file") {
                  postdata.key = !postdata["File" + key] ? postdata.key : postdata["File" + key].name;
                }
              }

              ret = jgrid.checkValues.call($t, postdata[key], valref);
              if (ret[0] === false) {
                break;
              }
            }
          }
          setNullsOrUnformat();
          if (ret[0]) {
            onClickSubmitResult = $self.triggerHandler("jqGridAddEditClickSubmit", [o, postdata, editOrAdd]);
            if (onClickSubmitResult === undefined && $.isFunction(o.onclickSubmit)) {
              onClickSubmitResult = o.onclickSubmit.call($t, o, postdata, editOrAdd) || {};
            }
            ret = $self.triggerHandler("jqGridAddEditBeforeSubmit", [postdata, $(frmgr), editOrAdd]);
            if (ret === undefined) {
              ret = [true, "", ""];
            }
            if (ret[0] && $.isFunction(o.beforeSubmit)) {
              ret = o.beforeSubmit.call($t, postdata, $(frmgr), editOrAdd);
            }
          }

          if (ret[0] && !o.processing) {
            o.processing = true;
            url = o.url || p.editurl;
            oper = opers.oper;
            idname = url === "clientArray" && p.keyName !== false ? p.keyName : opers.id;
            // we add to pos data array the action - the name is oper
            postdata[oper] = ($.trim(postdata[gridId + "_id"]) === "_empty") ? opers.addoper : opers.editoper;
            if (postdata[oper] !== opers.addoper) {
              postdata[idname] = postdata[gridId + "_id"];
            } else {
              // check to see if we have allredy this field in the form and if yes lieve it
              if (postdata[idname] === undefined) {
                postdata[idname] = postdata[gridId + "_id"];
              }
            }
            delete postdata[gridId + "_id"];
            postdata = $.extend(postdata, o.editData, onClickSubmitResult);
            if (p.treeGrid === true) {
              if (postdata[oper] === opers.addoper) {
                selr = p.selrow;
                var parentIdField = p.treeGridModel === "adjacency" ? p.treeReader.parent_id_field : "parent_id";
                postdata[parentIdField] = selr;
              }
              for (i in p.treeReader) {
                if (p.treeReader.hasOwnProperty(i)) {
                  itm = p.treeReader[i];
                  if (postdata.hasOwnProperty(itm)) {
                    if (postdata[oper] === opers.addoper && i === "parent_id_field") {
                      continue;
                    }
                    delete postdata[itm];
                  }
                }
              }
            }

            postdata[idname] = jgrid.stripPref(p.idPrefix, postdata[idname]);
            if (p.autoEncodeOnEdit) {
              $.each(postdata, function(n, v) {
                if (!$.isFunction(v)) {
                  postdata[n] = jgrid.oldEncodePostedData(v);
                }
              });
            }

            var formData = new FormData();
            $.each(jgrid.serializeFeedback.call($t,
              $.isFunction(o.serializeEditData) ? o.serializeEditData : p.serializeEditData,
              "jqGridAddEditSerializeEditData",
              postdata), function(index, value) {
              formData.append(index, value);
            });

            var ajaxOptions = $.extend({
              url: $.isFunction(url) ? url.call($t, postdata[idname], editOrAdd, postdata, o) : url,
              type: $.isFunction(o.mtype) ? o.mtype.call($t, editOrAdd, o, postdata[idname], postdata) : o.mtype,
              //data: $.isFunction(o.serializeEditData) ? o.serializeEditData.call($t,postdata) :  postdata,
              //data: jgrid.serializeFeedback.call($t,
              //$.isFunction(o.serializeEditData) ? o.serializeEditData : p.serializeEditData,
              //"jqGridAddEditSerializeEditData",
              //postdata),
              data: formData,
              contentType: false,
              processData: false,
              complete: function(jqXHR, textStatus) {
                postdata[idname] = p.idPrefix + $("#id_g", frmtb).val();
                if ((jqXHR.status >= 300 && jqXHR.status !== 304) || (jqXHR.status === 0 && jqXHR.readyState === 4)) {
                  ret[0] = false;
                  ret[1] = $self.triggerHandler("jqGridAddEditErrorTextFormat", [jqXHR, editOrAdd]);
                  if ($.isFunction(o.errorTextFormat)) {
                    ret[1] = o.errorTextFormat.call($t, jqXHR, editOrAdd);
                  } else {
                    ret[1] = textStatus + " Status: '" + jqXHR.statusText + "'. Error code: " + jqXHR.status;
                  }
                } else if (jqXHR.responseJSON !== undefined && jqXHR.responseJSON.status === "error") {
                  ret[0] = false;
                  ret[1] = jqXHR.responseJSON.statusText;
                } else {
                  // data is posted successful
                  // execute aftersubmit with the returned data from server
                  ret = $self.triggerHandler("jqGridAddEditAfterSubmit", [jqXHR, postdata, editOrAdd]);
                  if (ret === undefined) {
                    ret = [true, "", ""];
                  }
                  if (ret[0] && $.isFunction(o.afterSubmit)) {
                    ret = o.afterSubmit.call($t, jqXHR, postdata, editOrAdd);
                  }

                  if (jqXHR.responseJSON !== undefined && jqXHR.responseJSON.filelist) {
                    $.each(jqXHR.responseJSON.filelist, function(n, v) {
                      postdata[n] = v;
                      $("#File" + n, frmgr).val(null).change();
                      $("#" + n, frmgr).val(v);
                    });
                  }
                }
                if (ret[0] === false) {
                  $("#FormError", frmtb).html(errorIcon + ret[1]);
                  $("#FormError", frmtb).show();
                } else {
                  if (p.autoEncodeOnEdit) {
                    $.each(postdata, function(n, v) {
                      postdata[n] = jgrid.oldDecodePostedData(v);
                    });
                  }
                  //o.reloadAfterSubmit = o.reloadAfterSubmit && $t.o.datatype != "local";
                  // the action is add
                  var reloadGridOptions = [$.extend({}, o.reloadGridOptions || {})];
                  if (postdata[oper] === opers.addoper) {
                    //id processing
                    // user not set the id ret[2]
                    if (jqXHR.responseJSON !== undefined && jqXHR.responseJSON.id !== undefined) {
                      ret[2] = jqXHR.responseJSON.id;
                    } else if (!ret[2]) {
                      ret[2] = jgrid.randId();
                    }
                    if (postdata[idname] == null || postdata[idname] === "_empty" || postdata[oper] === opers.addoper) {
                      postdata[idname] = ret[2];
                    } else {
                      ret[2] = postdata[idname];
                    }
                    if (o.reloadAfterSubmit && p.datatype !== "local") {
                      $self.trigger("reloadGrid", reloadGridOptions);
                    } else {
                      if (p.treeGrid === true) {
                        base.addChildNode.call($self, ret[2], selr, postdata);
                      } else {
                        base.addRowData.call($self, ret[2], postdata, o.addedrow);
                      }
                    }
                    if (o.closeAfterAdd) {
                      if (p.treeGrid !== true) {
                        setSelection.call($self, ret[2]);
                      }
                      hideModal(themodalSelector, {
                        gb: gboxSelector,
                        jqm: o.jqModal,
                        onClose: o.onClose,
                        removemodal: o.removemodal,
                        formprop: !o.recreateForm,
                        form: o.form
                      });
                    } else if (o.clearAfterAdd) {
                      fillData("_empty", frmgr);
                    }
                  } else {
                    // the action is update
                    if (o.reloadAfterSubmit && p.datatype !== "local") {
                      $self.trigger("reloadGrid", reloadGridOptions);
                      if (!o.closeAfterEdit) {
                        setTimeout(function() {
                          setSelection.call($self, postdata[idname]);
                        }, 1000);
                      }
                    } else {
                      if (p.treeGrid === true) {
                        base.setTreeRow.call($self, postdata[idname], postdata);
                      } else {
                        base.setRowData.call($self, postdata[idname], postdata);
                      }
                    }
                    if (o.closeAfterEdit) {
                      hideModal(themodalSelector, {
                        gb: gboxSelector,
                        jqm: o.jqModal,
                        onClose: o.onClose,
                        removemodal: o.removemodal,
                        formprop: !o.recreateForm,
                        form: o.form
                      });
                    }
                  }
                  if ($.isFunction(o.afterComplete)) {
                    var copydata = jqXHR;
                    setTimeout(function() {
                      $self.triggerHandler("jqGridAddEditAfterComplete", [copydata, postdata, $(frmgr), editOrAdd]);
                      o.afterComplete.call($t, copydata, postdata, $(frmgr), editOrAdd);
                      copydata = null;
                    }, 50);
                  }
                  if (o.checkOnSubmit || o.checkOnUpdate) {
                    $(frmgr).data("disabled", false);
                    if (o._savedData[gridId + "_id"] !== "_empty") {
                      var key1;
                      for (key1 in o._savedData) {
                        if (o._savedData.hasOwnProperty(key1) && postdata[key1]) {
                          o._savedData[key1] = postdata[key1];
                        }
                      }
                    }
                  }
                }
                o.processing = false;
                try {
                  $(":input:visible", frmgr)[0].focus();
                } catch (ignore) {}

                $("#sData", frmtb2).button('reset');
              }
            }, jgrid.ajaxOptions, o.ajaxEditOptions);
            if (!ajaxOptions.url && !o.useDataProxy) {
              if ($.isFunction(p.dataProxy)) {
                o.useDataProxy = true;
              } else {
                ret[0] = false;
                ret[1] += " " + jgrid.errors.nourl;
              }
            }
            if (ret[0]) {
              if (o.useDataProxy) {
                var dpret = p.dataProxy.call($t, ajaxOptions, "set_" + gridId);
                if (dpret === undefined) {
                  dpret = [true, ""];
                }
                if (dpret[0] === false) {
                  ret[0] = false;
                  ret[1] = dpret[1] || "Error deleting the selected row!";
                } else {
                  if (ajaxOptions.data.oper === opers.addoper && o.closeAfterAdd) {
                    hideModal(themodalSelector, {
                      gb: gboxSelector,
                      jqm: o.jqModal,
                      onClose: o.onClose,
                      removemodal: o.removemodal,
                      formprop: !o.recreateForm,
                      form: o.form
                    });
                  }
                  if (ajaxOptions.data.oper === opers.editoper && o.closeAfterEdit) {
                    hideModal(themodalSelector, {
                      gb: gboxSelector,
                      jqm: o.jqModal,
                      onClose: o.onClose,
                      removemodal: o.removemodal,
                      formprop: !o.recreateForm,
                      form: o.form
                    });
                  }
                }
              } else {
                if (ajaxOptions.url === "clientArray") {
                  o.reloadAfterSubmit = false;
                  postdata = ajaxOptions.data;
                  ajaxOptions.complete({
                    status: 200,
                    statusText: ""
                  }, "");
                } else {
                  $.ajax(ajaxOptions);
                }
              }
            }
          }
          if (ret[0] === false) {
            $("#FormError", frmtb).html(errorIcon + ret[1]);
            $("#FormError", frmtb).show();
            $("#sData", frmtb2).button('reset');
            // return;
          }
        }

        function compareData(nObj, oObj) {
          var ret = false,
            key;
          for (key in nObj) {
            if (nObj.hasOwnProperty(key) && String(nObj[key]) !== String(oObj[key])) {
              ret = true;
              break;
            }
          }
          return ret;
        }

        function checkUpdates() {
          var stat = true;
          $("#FormError", frmtb).hide();
          if (o.checkOnUpdate) {
            postdata = {};
            getFormData();
            diff = compareData(postdata, o._savedData);
            if (diff) {
              $(frmgr).data("disabled", true);
              $(".confirm", themodalSelector).show();
              stat = false;
            }
          }
          return stat;
        }

        function restoreInline() {
          var editingInfo = jgrid.detectRowEditing.call($t, rowid);
          if (editingInfo != null) {
            if (editingInfo.mode === "inlineEditing") {
              base.restoreRow.call($self, rowid);
            } else {
              var savedRowInfo = editingInfo.savedRow,
                tr = $t.rows[savedRowInfo.id];
              base.restoreCell.call($self, savedRowInfo.id, savedRowInfo.ic);
              // remove highlighting of the cell
              $(tr.cells[savedRowInfo.ic]).removeClass("edit-cell " + highlightClass);
              $(tr).addClass(highlightClass).attr({
                "aria-selected": "true",
                "tabindex": "0"
              });
            }
          }
        }

        function updateNav(cr, posarr) {
          var totr = posarr[1].length - 1;
          if (cr === 0) {
            $("#pData", frmtb2).addClass(disabledClass);
          } else if (posarr[1][cr - 1] !== undefined && hasOneFromClasses($("#" + jqID(posarr[1][cr - 1])), disabledClass)) {
            $("#pData", frmtb2).addClass(disabledClass);
          } else {
            $("#pData", frmtb2).removeClass(disabledClass);
          }

          if (cr === totr) {
            $("#nData", frmtb2).addClass(disabledClass);
          } else if (posarr[1][cr + 1] !== undefined && hasOneFromClasses($("#" + jqID(posarr[1][cr + 1])), disabledClass)) {
            $("#nData", frmtb2).addClass(disabledClass);
          } else {
            $("#nData", frmtb2).removeClass(disabledClass);
          }
        }

        function getCurrPos() {
          var rowsInGrid = base.getDataIDs.call($self),
            selrow = $("#id_g", frmtb).val(),
            pos = $.inArray(selrow, rowsInGrid);
          return [pos, rowsInGrid];
        }

        if ($(themodalSelector)[0] !== undefined) {
          fillData(rowid, frmgr);
        } else {
          var frm = $("<form name='FormPost' id='" + frmgrId + "' onSubmit='return false;' enctype='multipart/form-data'></form>").data("disabled", false),
            tbl = $("<div id='" + frmtborg + "'></div>");
          $(colModel).each(function() {
            var fmto = this.formoptions;
            maxCols = Math.max(maxCols, fmto ? fmto.colpos || 0 : 0);
            maxRows = Math.max(maxRows, fmto ? fmto.rowpos || 0 : 0);
          });
          $(frm).append(tbl);
          var flr = $("<div id='FormError' style='display:none' class='" + errorClass + "'>&#160;</div>");
          flr[0].rp = 0;
          $(tbl).append(flr);
          //topinfo
          flr = $("<div style='display:none' class='tinfo topinfo'>" + (o.topinfo || "&#160;") + "</div>");
          flr[0].rp = 0;
          $(tbl).append(flr);
          if (!editFeedback("beforeInitData", frm, editOrAdd)) {
            return;
          }
          restoreInline();
          // set the id.
          // use carefull only to change here colproperties.
          // create data
          var rtlb = p.direction === "rtl" ? true : false,
            bp = rtlb ? "nData" : "pData",
            bn = rtlb ? "pData" : "nData";
          createData(rowid, tbl, maxCols);
          // buttons at footer
          var bP = builderFmButon.call($t, bp, "", mergeCssClasses(commonIconClass, o.prevIcon), "", "successButton"),
            bN = builderFmButon.call($t, bn, "", mergeCssClasses(commonIconClass, o.nextIcon), "", "successButton"),
            bS = builderFmButon.call($t, "sData", o.bSubmit, o.saveicon[2], o.saveicon[1], "primaryButton"),
            bC = builderFmButon.call($t, "cData", o.bCancel),
            bt = "<div class='modal-footer' id='" + frmtborg + "_2'><div class='navButton navButton-" + p.direction + "'>" + (rtlb ? bN + bP : bP + bN) + "</div><div class='editButton editButton-" + p.direction + "'>" + bC + "&#160;" + bS + "</div>";
          bt += "<div style='display:none' class='binfo bottominfo'>" + (o.bottominfo || "&#160;") + "</div></div>";
          if (maxRows > 0) {
            var sd = [];
            $.each($(tbl)[0].rows, function(i, r) {
              sd[i] = r;
            });
            sd.sort(function(a, b) {
              if (a.rp > b.rp) {
                return 1;
              }
              if (a.rp < b.rp) {
                return -1;
              }
              return 0;
            });
            $.each(sd, function(index, row) {
              $("tbody", tbl).append(row);
            });
          }
          o.gbox = gboxSelector;
          var tms = $("<div class='modal-body'></div>" + bt);
          $($(tms).get(0)).append(frm);

          createModal.call($t, ids, tms, o, p.gView);
          // TODO: remove the call of jgrid.bindEv and probably call of opt.custom_value from createData
          // and place the calls here AFTER the form are placed on the HTML page
          if (o.topinfo) {
            $(".tinfo", frmtb).show();
          }
          if (o.bottominfo) {
            $(".binfo", frmtb2).show();
          }
          tms = null;
          bt = null;
          $(themodalSelector).keydown(function(e) {
            var wTagName = (e.target.tagName || "").toUpperCase(),
              $focused, idFocused;
            if ($(frmgr).data("disabled") === true) {
              return false;
            } //??
            if (e.which === 13) {
              if (wTagName !== "TEXTAREA") {
                $focused = $(frmtb2).find(":focus");
                idFocused = $focused.attr("id");
                if ($focused.length > 0 && $.inArray(idFocused, ["pData", "nData", "cData"]) >= 0) {
                  $focused.trigger("click");
                  return false;
                }
                if (o.savekey[0] === true && o.savekey[1] === 13) {
                  $("#sData", frmtb2).trigger("click");
                  return false;
                }
              }
            }
            if (o.savekey[0] === true && e.which === o.savekey[1]) { // save
              if (wTagName !== "TEXTAREA") {
                $("#sData", frmtb2).trigger("click");
                return false;
              }
            }
            if (o.navkeys[0] === true) {
              if ($("#id_g", frmtb).val() === "_empty") {
                return true;
              }
              if (e.which === o.navkeys[1]) { //up
                $("#pData", frmtb2).trigger("click");
                return false;
              }
              if (e.which === o.navkeys[2]) { //down
                $("#nData", frmtb2).trigger("click");
                return false;
              }
            }
          });
          $("#sData", frmtb2).attr("data-loading-text", "<b>Loading...</b>");
          bS = builderFmButon.call($t, "sNew", o.bYes);
          bN = builderFmButon.call($t, "nNew", o.bNo);
          bC = builderFmButon.call($t, "cNew", o.bExit);
          var zI = o.zIndex || 999;
          zI++;
          $("<div class='" + o.overlayClass + " jqgrid-overlay confirm' style='z-index:" + zI + ";display:none;'>&#160;</div><div class='confirm ui-jqconfirm' style='z-index:" + (zI + 1) + "'>" + o.saveData + "<br/><br/>" + bS + '&nbsp;' + bN + '&nbsp;' + bC + "</div>").insertAfter(frmgr);
        }

        /* Move */
        $("span.close", themodalSelector).unbind("click");
        if (o.checkOnUpdate) {
          $("span.close", themodalSelector).removeClass("jqmClose");
          $("span.close", themodalSelector)
            .click(function() {
              if (!checkUpdates()) {
                return false;
              }
              hideModal(themodalSelector, {
                gb: gboxSelector,
                jqm: o.jqModal,
                onClose: o.onClose,
                removemodal: o.removemodal,
                form: o.form
              });
              return false;
            });
        }

        $("#sNew", themodalSelector).unbind('click');
        $("#nNew", themodalSelector).unbind('click');
        $("#cNew", themodalSelector).unbind('click');

        if (o.checkOnSubmit || o.checkOnUpdate) {
          $("#sNew", themodalSelector).click(function() {
            // if the form will be hidden at the first usage and it will be shown at the next usage
            // then the execution context click handler and all other functions like postIt()
            // will contains the variables (like rowid, postdata and so on) from THE FIRST call
            // of editGridRow. One should be very careful in the code of postIt()
            postIt();
            $(frmgr).data("disabled", false);
            $(".confirm", themodalSelector).hide();
            return false;
          });
          $("#nNew", themodalSelector).click(function() {
            $(".confirm", themodalSelector).hide();
            $(frmgr).data("disabled", false);
            setTimeout(function() {
              $("#sData", frmtb2).button('reset');
              $(":input:visible", frmgr)[0].focus();
            }, 0);
            return false;
          });
          $("#cNew", themodalSelector).click(function() {
            // if the form will be hidden at the first usage and it will be shown at the next usage
            // then the execution context click handler and all other functions like postIt()
            // will contains the variables (like o) from THE FIRST call
            $(".confirm", themodalSelector).hide();
            $(frmgr).data("disabled", false);
            $("#sData", frmtb2).button('reset');
            hideModal(themodalSelector, {
              gb: gboxSelector,
              jqm: o.jqModal,
              onClose: o.onClose,
              removemodal: o.removemodal,
              formprop: !o.recreateForm,
              form: o.form
            });
            return false;
          });
        }

        // here initform - only once
        editFeedback("onInitializeForm", $(frmgr), editOrAdd);
        if (rowid === "_empty" || !o.viewPagerButtons) {
          $("#pData,#nData", frmtb2).hide();
        } else {
          $("#pData,#nData", frmtb2).show();
        }
        editFeedback("beforeShowForm", $(frmgr), editOrAdd);
        $(themodalSelector).data("onClose", o.onClose);
        viewModal(themodalSelector, {
          gbox: gboxSelector,
          jqm: o.jqModal,
          overlay: o.overlay,
          modal: o.modal,
          caption: o.caption
        });

        $("#sData", frmtb2).unbind('click').click(function() {
          postdata = {};
          $(this).button('loading');
          $("#FormError", frmtb).hide();
          // all depend on ret array
          //ret[0] - succes
          //ret[1] - msg if not succes
          //ret[2] - the id  that will be set if reload after submit false
          getFormData();
          if (postdata[gridId + "_id"] === "_empty") {
            postIt();
          } else if (o.checkOnSubmit === true) {
            diff = compareData(postdata, o._savedData);
            if (diff) {
              $(frmgr).data("disabled", true);
              $(".confirm", themodalSelector).show();
            } else {
              postIt();
            }
          } else {
            postIt();
          }
          return false;
        });
        $("#cData", frmtb2).unbind('click').click(function() {
          if (!checkUpdates()) {
            return false;
          }
          hideModal(themodalSelector, {
            gb: gboxSelector,
            jqm: o.jqModal,
            onClose: o.onClose,
            removemodal: o.removemodal,
            formprop: !o.recreateForm,
            form: o.form
          });
          return false;
        });
        $("#nData", frmtb2).unbind('click').click(function() {
          if (!checkUpdates()) {
            return false;
          }
          $("#FormError", frmtb).hide();
          var npos = getCurrPos();
          npos[0] = parseInt(npos[0], 10);
          if (npos[0] !== -1 && npos[1][npos[0] + 1]) {
            if (!editFeedback("onclickPgButtons", "next", $(frmgr), npos[1][npos[0]])) {
              return false;
            }
            fillData(npos[1][npos[0] + 1], frmgr);
            setSelection.call($self, npos[1][npos[0] + 1]);
            editFeedback("afterclickPgButtons", "next", $(frmgr), npos[1][npos[0] + 1]);
            updateNav(npos[0] + 1, npos);
          }
          return false;
        });
        $("#pData", frmtb2).unbind('click').click(function() {
          if (!checkUpdates()) {
            return false;
          }
          $("#FormError", frmtb).hide();
          var ppos = getCurrPos();
          if (ppos[0] !== -1 && ppos[1][ppos[0] - 1]) {
            if (!editFeedback("onclickPgButtons", "prev", $(frmgr), ppos[1][ppos[0]])) {
              return false;
            }
            if (hasOneFromClasses($("#" + jqID(ppos[1][ppos[0] - 1])), disabledClass)) {
              return false;
            }
            fillData(ppos[1][ppos[0] - 1], frmgr);
            setSelection.call($self, ppos[1][ppos[0] - 1]);
            editFeedback("afterclickPgButtons", "prev", $(frmgr), ppos[1][ppos[0] - 1]);
            updateNav(ppos[0] - 1, ppos);
          }
          return false;
        });

        editFeedback("afterShowForm", $(frmgr), editOrAdd);
        var posInit = getCurrPos();
        updateNav(posInit[0], posInit);
      });
    },
    viewGridRow: function(rowid, oMuligrid) {
      return this.each(function() {
        var $t = this,
          $self = $($t),
          p = $t.p;
        if (!$t.grid || p == null || !rowid) {
          return;
        }
        // make new copy of the options oMuligrid and use it for ONE specific grid.
        // p.formViewing can contains grid specific options
        // we will don't modify the input options oMuligrid
        var gridId = p.id,
          o = $.extend(true, {
              navkeys: [false, 38, 40],
              onClose: null,
              beforeShowForm: null,
              beforeInitData: null,
              viewPagerButtons: true,
              removemodal: false,
              form: "view"
            },
            base.getGridRes.call($self, "view"),
            jgrid.view || {},
            p.formViewing || {},
            oMuligrid || {});
        var frmgr = "#ViewGrid_" + jqID(gridId),
          frmtb = "#ViewTbl_" + jqID(gridId),
          frmtb2 = frmtb + "_2",
          frmgrId = "ViewGrid_" + gridId,
          frmtbId = "ViewTbl_" + gridId,
          commonIconClass = o.commonIconClass,
          ids = {
            themodal: "viewmod" + gridId,
            modalhead: "viewhd" + gridId,
            modalcontent: "viewcnt" + gridId,
            resizeAlso: frmgrId
          },
          themodalSelector = "#" + jqID(ids.themodal),
          gboxSelector = p.gBox,
          colModel = p.colModel,
          maxCols = 1,
          maxRows = 0,
          viewFeedback = function() {
            var args = $.makeArray(arguments);
            args.unshift("");
            args.unshift("View");
            args.unshift(o);
            return jgridFeedback.apply($t, args);
          },
          disabledClass = getGuiStateStyles.call($t, "disabled");

        function createData(rowid, tb, maxcols) {
          var nm, hc, trdata, cnt = 0,
            tmp, dc, retpos = [],
            ind = base.getInd.call($self, rowid),
            i,
            viewDataClasses = getGuiStyles.call($t, "dialog.viewData"),
            viewLabelClasses = getGuiStyles.call($t, "dialog.viewLabel", "form-view-label"),
            tdtmpl = "<div class='" + viewLabelClasses + "'>&#160;</div><div class='" + viewDataClasses + "'>&#160;</div>",
            tmpl = "",
            tdtmpl2 = "<div class='" + viewLabelClasses + "'></div><div class='" + viewDataClasses + "'></div>",
            fmtnum = ["integer", "number", "currency"],
            max1 = 0,
            max2 = 0,
            maxw, setme, viewfld;
          for (i = 1; i <= maxcols; i++) {
            tmpl += i === 1 ? tdtmpl : tdtmpl2;
          }
          // find max number align rigth with property formatter
          $(colModel).each(function() {
            var cm = this;
            if (cm.editrules && cm.editrules.edithidden === true) {
              hc = false;
            } else {
              hc = cm.hidden === true ? true : false;
            }
            if (!hc && cm.align === "right") {
              if (cm.formatter && $.inArray(cm.formatter, fmtnum) !== -1) {
                max1 = Math.max(max1, parseInt(cm.width, 10));
              } else {
                max2 = Math.max(max2, parseInt(cm.width, 10));
              }
            }
          });
          maxw = max1 !== 0 ? max1 : max2 !== 0 ? max2 : 0;
          $(colModel).each(function(i) {
            var cm = this;
            nm = cm.name;
            setme = false;
            // hidden fields are included in the form
            if (cm.editrules && cm.editrules.edithidden === true) {
              hc = false;
            } else {
              hc = cm.hidden === true ? true : false;
            }
            dc = hc ? "style='display:none'" : "";
            viewfld = (typeof cm.viewable !== "boolean") ? true : cm.viewable;
            if (nm !== "cb" && nm !== "subgrid" && nm !== "rn" && viewfld) {
              tmp = ind === false ? "" : jgrid.getDataFieldOfCell.call($t, $t.rows[ind], i).html();
              setme = cm.align === "right" && maxw !== 0 ? true : false;
              var frmopt = $.extend({}, {
                  rowabove: false,
                  rowcontent: ""
                }, cm.formoptions || {}),
                rp = parseInt(frmopt.rowpos, 10) || cnt + 1,
                cp = parseInt((parseInt(frmopt.colpos, 10) || 1) * 2, 10);
              if (frmopt.rowabove) {
                var newdata = $("<div class='contentinfo' colspan='" + (maxcols * 2) + "'>" + frmopt.rowcontent + "</div>");
                $(tb).append(newdata);
                newdata[0].rp = rp;
              }
              trdata = $(tb).find("div[data-rowpos=" + rp + "]");
              if (trdata.length === 0) {
                trdata = $("<div " + dc + " data-rowpos='" + rp + "' class='row'></div>").attr("id", "trv_" + nm);
                $(trdata).append(tmpl);
                $(tb).append(trdata);
                trdata[0].rp = rp;
              }
              var labelText = (frmopt.label === undefined ? p.colNames[i] : frmopt.label),
                $data = $("div:eq(" + (cp - 1) + ")", trdata[0]);
              $("div:eq(" + (cp - 2) + ")", trdata[0]).html("" + (labelText || "&nbsp;") + " :");
              $data[isEmptyString($data.html()) ? "html" : "append"]("<span>" + (tmp || "&nbsp;") + "</span>").attr("id", "v_" + nm);
              retpos[cnt] = i;
              cnt++;
            }
          });
          if (cnt > 0) {
            var idrow = $("<input id='id_g' type='hidden' name='id' value='" + rowid + "'/>");
            idrow[0].rp = cnt + 99;
            $(tb).append(idrow);
          }
          return retpos;
        }

        function fillData(rowid) {
          var nm, hc, cnt = 0,
            trv = base.getInd.call($self, rowid, true),
            cm;
          if (!trv) {
            return;
          }
          $("td", trv).each(function(i) {
            cm = colModel[i];
            nm = cm.name;
            // hidden fields are included in the form
            if (cm.editrules && cm.editrules.edithidden === true) {
              hc = false;
            } else {
              hc = cm.hidden === true ? true : false;
            }
            if (nm !== "cb" && nm !== "subgrid" && nm !== "rn") {
              nm = jqID("v_" + nm);
              $("#" + nm + " span", frmtb).html(jgrid.getDataFieldOfCell.call($t, trv, i).html());
              if (hc) {
                $("#" + nm, frmtb).parents("tr:first").hide();
              }
              cnt++;
            }
          });
          if (cnt > 0) {
            $("#id_g", frmtb).val(rowid);
          }
        }

        function updateNav(cr, posarr) {
          var totr = posarr[1].length - 1;
          if (cr === 0) {
            $("#pData", frmtb2).addClass(disabledClass);
          } else if (posarr[1][cr - 1] !== undefined && hasOneFromClasses($("#" + jqID(posarr[1][cr - 1])), disabledClass)) {
            $("#pData", frmtb2).addClass(disabledClass);
          } else {
            $("#pData", frmtb2).removeClass(disabledClass);
          }
          if (cr === totr) {
            $("#nData", frmtb2).addClass(disabledClass);
          } else if (posarr[1][cr + 1] !== undefined && hasOneFromClasses($("#" + jqID(posarr[1][cr + 1])), disabledClass)) {
            $("#nData", frmtb2).addClass(disabledClass);
          } else {
            $("#nData", frmtb2).removeClass(disabledClass);
          }
        }

        function getCurrPos() {
          var rowsInGrid = base.getDataIDs.call($self),
            selrow = $("#id_g", frmtb).val(),
            pos = $.inArray(selrow, rowsInGrid);
          return [pos, rowsInGrid];
        }

        if ($(themodalSelector)[0] !== undefined) {
          fillData(rowid);
        } else {
          var frm = $("<form name='FormPost' id='" + frmgrId + "'></form>"),
            tbl = $("<div id='" + frmtbId + "' class='form-view'></div>");
          $(colModel).each(function() {
            var fmto = this.formoptions;
            maxCols = Math.max(maxCols, fmto ? fmto.colpos || 0 : 0);
            maxRows = Math.max(maxRows, fmto ? fmto.rowpos || 0 : 0);
          });
          // set the id.
          frm.append(tbl);
          if (!viewFeedback("beforeInitData", frm)) {
            return;
          }
          createData(rowid, tbl, maxCols);
          var rtlb = p.direction === "rtl" ? true : false,
            bp = rtlb ? "nData" : "pData",
            bn = rtlb ? "pData" : "nData",
            // buttons at footer
            bP = builderFmButon.call($t, bp, "", mergeCssClasses(commonIconClass, o.prevIcon), "", "successButton"),
            bN = builderFmButon.call($t, bn, "", mergeCssClasses(commonIconClass, o.nextIcon), "", "successButton"),
            bC = builderFmButon.call($t, "cData", o.bClose);
          if (maxRows > 0) {
            var sd = [];
            $.each($(tbl)[0].rows, function(i, r) {
              sd[i] = r;
            });
            sd.sort(function(a, b) {
              if (a.rp > b.rp) {
                return 1;
              }
              if (a.rp < b.rp) {
                return -1;
              }
              return 0;
            });
            $.each(sd, function(index, row) {
              $("tbody", tbl).append(row);
            });
          }
          o.gbox = gboxSelector;
          var ft = "<div class='modal-footer' id='" + frmtbId + "_2'><div class='navButton navButton-" + p.direction + "'>" + (rtlb ? bN + bP : bP + bN) + "</div><div class='editButton editButton-" + p.direction + "'>" + bC + "</div></div>";
          var bt = $("<div class='modal-body'></div>" + ft);
          $($(bt).get(0)).append(frm);

          createModal.call($t, ids, bt, o, p.gView);
          if (!o.viewPagerButtons) {
            $("#pData, #nData", frmtb2).hide();
          }
          bt = null;
          $(themodalSelector).keydown(function(e) {
            var $focused, idFocused;
            if ($(frmgr).data("disabled") === true) {
              return false;
            } //??
            if (e.which === 13) {
              $focused = $(frmtb2).find(":focus");
              idFocused = $focused.attr("id");
              if ($focused.length > 0 && $.inArray(idFocused, ["pData", "nData", "cData"]) >= 0) {
                $focused.trigger("click");
                return false;
              }
            }

            if (o.navkeys[0] === true) {
              if (e.which === o.navkeys[1]) { //up
                $("#pData", frmtb2).trigger("click");
                return false;
              }
              if (e.which === o.navkeys[2]) { //down
                $("#nData", frmtb2).trigger("click");
                return false;
              }
            }
          });

          $("#cData", frmtb2).click(function() {
            hideModal(themodalSelector, {
              gb: gboxSelector,
              jqm: o.jqModal,
              onClose: o.onClose,
              removemodal: o.removemodal,
              formprop: !o.recreateForm,
              form: o.form
            });
            return false;
          });

          $("#nData", frmtb2).click(function() {
            $("#FormError", frmtb).hide();
            var npos = getCurrPos();
            npos[0] = parseInt(npos[0], 10);
            if (npos[0] !== -1 && npos[1][npos[0] + 1]) {
              if (!viewFeedback("onclickPgButtons", "next", $(frmgr), npos[1][npos[0]])) {
                return false;
              }
              fillData(npos[1][npos[0] + 1]);
              base.setSelection.call($self, npos[1][npos[0] + 1]);
              viewFeedback("afterclickPgButtons", "next", $(frmgr), npos[1][npos[0] + 1]);
              updateNav(npos[0] + 1, npos);
            }
            return false;
          });
          $("#pData", frmtb2).click(function() {
            $("#FormError", frmtb).hide();
            var ppos = getCurrPos();
            if (ppos[0] !== -1 && ppos[1][ppos[0] - 1]) {
              if (!viewFeedback("onclickPgButtons", "prev", $(frmgr), ppos[1][ppos[0]])) {
                return false;
              }
              fillData(ppos[1][ppos[0] - 1]);
              base.setSelection.call($self, ppos[1][ppos[0] - 1]);
              viewFeedback("afterclickPgButtons", "prev", $(frmgr), ppos[1][ppos[0] - 1]);
              updateNav(ppos[0] - 1, ppos);
            }
            return false;
          });
        }

        viewFeedback("beforeShowForm", $(frmgr));
        viewModal(themodalSelector, {
          gbox: gboxSelector,
          jqm: o.jqModal,
          toTop: o.toTop,
          modal: o.modal
        });

        var posInit = getCurrPos();
        updateNav(posInit[0], posInit);
      });
    },
    delGridRow: function(rowids, oMuligrid) {
      return this.each(function() {
        var $t = this,
          p = $t.p,
          $self = $($t);
        if (!$t.grid || p == null || !rowids) {
          return;
        }
        // make new copy of the options oMuligrid and use it for ONE specific grid.
        // p.formDeleting can contains grid specific options
        // we will don't modify the input options oMuligrid
        var gridId = p.id,
          o = $.extend(true, {
              removemodal: false,
              height: "auto",
              dataheight: "auto",
              url: "",
              mtype: "POST",
              reloadAfterSubmit: true,
              beforeShowForm: null,
              beforeInitData: null,
              afterShowForm: null,
              beforeSubmit: null,
              onclickSubmit: null,
              afterSubmit: null,
              delData: {},
              onClose: null,
              ajaxDelOptions: {},
              processing: false,
              serializeDelData: null,
              useDataProxy: false
            },
            base.getGridRes.call($self, "del"),
            jgrid.del || {},
            p.formDeleting || {},
            oMuligrid || {});
        var dtblId = "DelTbl_" + gridId,
          dtbl = "#DelTbl_" + jqID(gridId),
          postd, idname, opers, oper,
          ids = {
            themodal: "delmod" + gridId,
            modalhead: "delhd" + gridId,
            modalcontent: "delcnt" + gridId,
            resizeAlso: dtblId
          },
          themodalSelector = "#" + jqID(ids.themodal),
          gboxSelector = p.gBox,
          deleteFeedback = function() {
            var args = $.makeArray(arguments);
            args.unshift("");
            args.unshift("Delete");
            args.unshift(o);
            return jgridFeedback.apply($t, args);
          },
          errorClass = getGuiStateStyles.call($t, "error");
        if (!$.isArray(rowids)) {
          rowids = [String(rowids)];
        }
        if ($(themodalSelector)[0] !== undefined) {
          if (!deleteFeedback("beforeInitData", $(dtbl))) {
            return;
          }
          $("#DelData", dtbl).text(rowids.join()).data("rowids", rowids);
          $("#DelError", dtbl).hide();
          deleteFeedback("beforeShowForm", $(dtbl));
          viewModal(themodalSelector, {
            gbox: gboxSelector,
            jqm: o.jqModal,
            jqM: false,
            toTop: o.toTop,
            modal: o.modal
          });
          deleteFeedback("afterShowForm", $(dtbl));
        } else {
          var tbl = "<div id='" + dtblId + "' class='modal-body'>";
          // error data
          tbl += "<div id='DelError' style='display:none;' class='" + errorClass + "' role='alert'>";
          //                    tbl += "<span class='glyphicon glyphicon-cexclamation-sign'></span> &nbsp;";
          //                    tbl += "<span id='msgError'></span>";
          tbl += "</div>";
          tbl += "<div id='DelData' style='display:none'>" + rowids.join() + "</div>";
          tbl += "<div class='delmsg' style='white-space:pre;'>" + o.msg + "</div>";
          // buttons at footer
          tbl += "</div></div>";
          var bS = builderFmButon.call($t, "dData", o.bSubmit, o.delicon[2], o.delicon[1], 'dangerButton'),
            bC = builderFmButon.call($t, "eData", o.bCancel, o.cancelicon[2], o.cancelicon[1]);
          tbl += "<div class='modal-footer' id='" + dtblId + "_2'>" + bC + "&#160;" + bS + "</div>";
          o.gbox = gboxSelector;
          createModal.call($t, ids, tbl, o, p.gView);
          $("#DelData", dtbl).data("rowids", rowids);

          if (!deleteFeedback("beforeInitData", $(tbl))) {
            return;
          }

          $("#dData", dtbl + "_2").click(function() {
            var ret = [true, ""],
              pk, $delData = $("#DelData", dtbl),
              postdata = $delData.text(), //the pair is name=val1,val2,...
              formRowIds = $delData.data("rowids"),
              cs = {};
            if ($.isFunction(o.onclickSubmit)) {
              cs = o.onclickSubmit.call($t, o, postdata) || {};
            }
            if ($.isFunction(o.beforeSubmit)) {
              ret = o.beforeSubmit.call($t, postdata);
            }
            if (ret[0] && !o.processing) {
              o.processing = true;
              opers = p.prmNames;
              postd = $.extend({}, o.delData, cs);
              oper = opers.oper;
              postd[oper] = opers.deloper;
              idname = opers.id;
              postdata = formRowIds.slice();
              if (!postdata.length) {
                return false;
              }
              for (pk in postdata) {
                if (postdata.hasOwnProperty(pk)) {
                  postdata[pk] = jgrid.stripPref(p.idPrefix, postdata[pk]);
                }
              }
              postd[idname] = postdata.join();
              var url = o.url || p.editurl,
                ajaxOptions = $.extend({
                  url: $.isFunction(url) ? url.call($t, postd[idname], postd, o) : url,
                  type: o.mtype,
                  data: $.isFunction(o.serializeDelData) ? o.serializeDelData.call($t, postd) : postd,
                  complete: function(jqXHR, textStatus) {
                    var i;
                    if ((jqXHR.status >= 300 && jqXHR.status !== 304) || (jqXHR.status === 0 && jqXHR.readyState === 4)) {
                      ret[0] = false;
                      if ($.isFunction(o.errorTextFormat)) {
                        ret[1] = o.errorTextFormat.call($t, jqXHR);
                      } else {
                        ret[1] = textStatus + " Status: '" + jqXHR.statusText + "'. Error code: " + jqXHR.status;
                      }
                    } else if (jqXHR.responseJSON !== undefined && jqXHR.responseJSON.status === 'error') {
                      ret[0] = false;
                      ret[1] = jqXHR.responseJSON.statusText;
                    } else {
                      // data is posted successful
                      // execute aftersubmit with the returned data from server
                      if ($.isFunction(o.afterSubmit)) {
                        ret = o.afterSubmit.call($t, jqXHR, postd);
                      }
                    }
                    if (ret[0] === false) {
                      $("#DelError", dtbl).html(ret[1]);
                      $("#DelError", dtbl).show();
                    } else {
                      if (o.reloadAfterSubmit && p.datatype !== "local") {
                        $self.trigger("reloadGrid", [$.extend({}, o.reloadGridOptions || {})]);
                      } else {
                        if (p.treeGrid === true) {
                          try {
                            base.delTreeNode.call($self, formRowIds[0]);
                          } catch (ignore) {}
                        } else {
                          formRowIds = formRowIds.slice(); // make copy for save deleting
                          for (i = 0; i < formRowIds.length; i++) {
                            base.delRowData.call($self, formRowIds[i]);
                          }
                        }
                      }
                      setTimeout(function() {
                        deleteFeedback("afterComplete", jqXHR, postdata, $(dtbl));
                      }, 50);
                    }
                    o.processing = false;
                    if (ret[0]) {
                      hideModal(themodalSelector, {
                        gb: gboxSelector,
                        jqm: o.jqModal,
                        onClose: o.onClose,
                        removemodal: o.removemodal
                      });
                    }
                  }
                }, jgrid.ajaxOptions, o.ajaxDelOptions);
              if (!ajaxOptions.url && !o.useDataProxy) {
                if ($.isFunction(p.dataProxy)) {
                  o.useDataProxy = true;
                } else {
                  ret[0] = false;
                  ret[1] += " " + jgrid.errors.nourl;
                }
              }
              if (ret[0]) {
                if (o.useDataProxy) {
                  var dpret = p.dataProxy.call($t, ajaxOptions, "del_" + gridId);
                  if (dpret === undefined) {
                    dpret = [true, ""];
                  }
                  if (dpret[0] === false) {
                    ret[0] = false;
                    ret[1] = dpret[1] || "Error deleting the selected row!";
                  } else {
                    hideModal(themodalSelector, {
                      gb: gboxSelector,
                      jqm: o.jqModal,
                      onClose: o.onClose,
                      removemodal: o.removemodal
                    });
                  }
                } else {
                  if (ajaxOptions.url === "clientArray") {
                    postd = ajaxOptions.data;
                    ajaxOptions.complete({
                      status: 200,
                      statusText: ""
                    }, "");
                  } else {
                    $.ajax(ajaxOptions);
                  }
                }
              }
            }

            if (ret[0] === false) {
              $("#DelError", dtbl).html(ret[1]);
              $("#DelError", dtbl).show();
            }
            return false;
          });
          $("#eData", dtbl + "_2").click(function() {
            hideModal(themodalSelector, {
              gb: gboxSelector,
              jqm: o.jqModal,
              onClose: o.onClose,
              removemodal: o.removemodal
            });
            return false;
          });
          deleteFeedback("beforeShowForm", $(dtbl));
          viewModal(themodalSelector, {
            gbox: gboxSelector,
            jqm: o.jqModal,
            overlay: o.overlay,
            toTop: o.toTop,
            modal: o.modal
          });
          deleteFeedback("afterShowForm", $(dtbl));
        }
      });
    },
    navGrid: function(elem, oMuligrid, pEdit, pAdd, pDel, pSearch, pView) {
      if (typeof elem === "object") {
        // the option pager are skipped
        pView = pSearch;
        pSearch = pDel;
        pDel = pAdd;
        pAdd = pEdit;
        pEdit = oMuligrid;
        oMuligrid = elem;
        elem = undefined;
      }
      pAdd = pAdd || {};
      pEdit = pEdit || {};
      pView = pView || {};
      pDel = pDel || {};
      pSearch = pSearch || {};
      return this.each(function() {
        var $t = this,
          p = $t.p,
          $self = $($t);
        if (!$t.grid || p == null || ($t.nav && $(elem).find(".navtable").length > 0)) {
          return; // error or the navigator bar already exists
        }
        // make new copy of the options oMuligrid and use it for ONE specific grid.
        // p.navOptions can contains grid specific options
        // we will don't modify the input options oMuligrid
        var gridId = p.id,
          o = $.extend({
              edit: false,
              add: false,
              del: false,
              search: false,
              refresh: p.treeGrid || !p.loadonce ? true : false,
              refreshstate: "firstpage",
              view: false,
              //closeOnEscape: true,
              beforeRefresh: null,
              afterRefresh: null,
              cloneToTop: false,
              hideEmptyPagerParts: true,
              //jqModal: true,
              alertwidth: 200,
              alertheight: "auto",
              alerttop: null,
              //alertToTop: false,
              removemodal: false,
              alertleft: null,
              alertzIndex: null,
              iconsOverText: false
            },
            base.getGridRes.call($self, "nav"),
            jgrid.nav || {},
            p.navOptions || {},
            oMuligrid || {}
          );
        // set default position depend of RTL/LTR direction of the grid
        o.position = o.position || (p.direction === "rtl" ? "right" : "left");
        var twd, tdw, gridIdEscaped = p.idSel,
          gboxSelector = p.gBox,
          commonIconClass = o.commonIconClass,
          alertIDs = {
            themodal: "alertmod_" + gridId,
            modalhead: "alerthd_" + gridId,
            modalcontent: "alertcnt_" + gridId
          },
          createModalAlert = function() {
            return function() {
              if ($("#" + jqID(alertIDs.themodal))[0] === undefined) {
                createModal.call($t, alertIDs,
                  "<div class='modal-body'>" + o.alerttext + "</div><span tabindex='0'><span tabindex='-1' id='" + gridId + "_jqg_alrt'></span></span>", {
                    gbox: gboxSelector,
                    jqModal: o.jqModal,
                    caption: o.alertcap,
                    width: o.alertwidth,
                    height: o.alertheight,
                    //closeOnEscape: o.closeOnEscape,
                    zIndex: o.alertzIndex,
                    removemodal: o.removemodal
                  },
                  p.gView,
                  false,
                  false,
                  'modal-sm');
              }
              viewModal("#" + jqID(alertIDs.themodal), {
                gbox: gboxSelector,
                toTop: o.alertToTop,
                jqm: o.jqModal
              });
              var $close = $("#" + jqID(alertIDs.modalhead)).find(".ui-jqdialog-titlebar-close");
              $close.attr({
                tabindex: "0",
                href: "#",
                role: "button"
              });
              setTimeout(function() {
                $close.focus();
              }, 50);
            };
          },
          viewModalAlert = createModalAlert(),
          navtbl,
          clickOnEnter = function(e) {
            var $focused;
            if (e.which === 13) {
              $focused = $(this).find(":focus");
              if ($focused.length > 0) {
                $focused.trigger("click");
                return false;
              }
            }
          },
          disabledClass = getGuiStateStyles.call($t, "disabled");
        if (!$t.grid) {
          return; // error
        }
        // set modalAlert which can be used inside of
        $t.modalAlert = viewModalAlert;
        if (elem === undefined) {
          if (p.pager) {
            elem = p.pager;
            if (p.toppager) {
              o.cloneToTop = true; // add buttons to both pagers
            }
          } else if (p.toppager) {
            elem = p.toppager;
          }
        }

        var clone = 1,
          i, tbd, pgid, elemids, iPart, pagerTable, $pagerPart, pagerParts = ["left", "center", "right"],
          sep = "<div class='ui-pg-button " + disabledClass + "'><span class='ui-separator'></span></div>",
          onHoverIn = function() {},
          onHoverOut = function() {},
          onAdd = function() {
            if (!hasOneFromClasses(this, disabledClass)) {
              if ($.isFunction(o.addfunc)) {
                o.addfunc.call($t);
              } else {
                base.editGridRow.call($self, "new", pAdd);
              }
            }
            return false;
          },
          editOrViewOfSelectedRow = function(func, methodName, param) {
            if (!hasOneFromClasses(this, disabledClass)) {
              var sr = p.selrow;
              if (sr) {
                if ($.isFunction(func)) {
                  func.call($t, sr);
                } else {
                  base[methodName].call($self, sr, param);
                }
              } else {
                viewModalAlert();
              }
            }
            return false;
          },
          onEdit = function() {
            return editOrViewOfSelectedRow.call(this, o.editfunc, "editGridRow", pEdit);
          },
          onView = function() {
            return editOrViewOfSelectedRow.call(this, o.viewfunc, "viewGridRow", pView);
          },
          onDel = function() {
            var dr;
            if (!hasOneFromClasses(this, disabledClass)) {
              if (p.multiselect) {
                dr = p.selarrrow;
                if (dr.length === 0) {
                  dr = null;
                }
              } else {
                dr = p.selrow;
              }
              if (dr) {
                if ($.isFunction(o.delfunc)) {
                  o.delfunc.call($t, dr);
                } else {
                  base.delGridRow.call($self, dr, pDel);
                }
              } else {
                viewModalAlert();
              }
            }
            return false;
          },
          onSearch = function() {
            if (!hasOneFromClasses(this, disabledClass)) {
              if ($.isFunction(o.searchfunc)) {
                o.searchfunc.call($t, pSearch);
              } else {
                base.searchGrid.call($self, pSearch);
              }
            }
            return false;
          },
          onRefresh = function() {
            if (!hasOneFromClasses(this, disabledClass)) {
              if ($.isFunction(o.beforeRefresh)) {
                o.beforeRefresh.call($t);
              }
              p.search = false;
              p.resetsearch = true;
              try {
                if (o.refreshstate !== "currentfilter") {
                  p.postData.filters = "";
                  try {
                    $("#fbox_" + gridIdEscaped).jqFilter("resetFilter");
                  } catch (ignore) {}
                  if ($.isFunction($t.clearToolbar)) {
                    $t.clearToolbar(false);
                  }
                }
              } catch (ignore) {}
              switch (o.refreshstate) {
                case "firstpage":
                  $self.trigger("reloadGrid", [$.extend({}, o.reloadGridOptions || {}, {
                    page: 1
                  })]);
                  break;
                case "current":
                case "currentfilter":
                  $self.trigger("reloadGrid", [$.extend({}, o.reloadGridOptions || {}, {
                    current: true
                  })]);
                  break;
              }
              if ($.isFunction(o.afterRefresh)) {
                o.afterRefresh.call($t);
              }
            }
            return false;
          },
          stdButtonActivation = function(name, id, onClick, navtbl, elemids) {
            var $button = $("<div class='ui-pg-button ui-corner-all' tabindex='0' role='button'></div>"),
              iconClass = o[name + "icon"],
              iconText = $.trim(o[name + "text"]);
            $button.append("<div class='ui-pg-div'><span class='" +
              (o.iconsOverText ?
                mergeCssClasses("ui-pg-button-icon-over-text", commonIconClass, iconClass) :
                mergeCssClasses(commonIconClass, iconClass)) +
              "'></span>" +
              (iconText ? "<span class='ui-pg-button-text" + (o.iconsOverText ? " ui-pg-button-icon-over-text" : "") + "'>" + iconText + "</span>" : "") +
              "</div>");
            $(navtbl).append($button);
            $button.attr({
                "title": o[name + "title"] || "",
                id: id || name + "_" + elemids
              })
              .click(onClick)
              .hover(onHoverIn, onHoverOut);
            return $button;
          };
        if (o.cloneToTop && p.toppager) {
          clone = 2;
        }
        for (i = 0; i < clone; i++) {
          // we can set aria-activedescendant="idOfFirstButton" later
          navtbl = $("<div" + " class='ui-pg-table navtable' role='toolbar' style='float:" +
            (p.direction === "rtl" ? "right" : "left") +
            ";table-layout:auto;'></div>");
          if (i === 0) {
            pgid = elem;
            elemids = gridId;
            if (pgid === p.toppager) {
              elemids += "_top";
              clone = 1;
            }
          } else {
            pgid = p.toppager;
            elemids = gridId + "_top";
          }
          if (o.add) {
            stdButtonActivation("add", pAdd.id, onAdd, navtbl, elemids);
          }
          if (o.edit) {
            stdButtonActivation("edit", pEdit.id, onEdit, navtbl, elemids);
          }
          if (o.view) {
            stdButtonActivation("view", pView.id, onView, navtbl, elemids);
          }
          if (o.del) {
            stdButtonActivation("del", pDel.id, onDel, navtbl, elemids);
          }
          if (o.add || o.edit || o.del || o.view) {
            $(navtbl).append(sep);
          }
          if (o.search) {
            tbd = stdButtonActivation("search", pSearch.id, onSearch, navtbl, elemids);
            if (pSearch.showOnLoad && pSearch.showOnLoad === true) {
              $(tbd, navtbl).click();
            }
          }
          if (o.refresh) {
            stdButtonActivation("refresh", "", onRefresh, navtbl, elemids);
          }
          // TODO use setWidthOfPagerTdWithPager or remove at all and use div structure with wrapping
          tdw = $(".ui-jqgrid>.ui-jqgrid-view").css("font-size") || "11px";
          $("body").append("<div id='testpg2' class='" + getGuiStyles.call($t, "gBox", "ui-jqgrid") + "' style='font-size:" + tdw + ";visibility:hidden;' ></div>");
          twd = $(navtbl).clone().appendTo("#testpg2").width();
          $("#testpg2").remove();
          $(pgid + "_" + o.position, pgid).append(navtbl);
          if (o.hideEmptyPagerParts) {
            for (iPart = 0; iPart < pagerParts.length; iPart++) {
              if (pagerParts[iPart] !== o.position) {
                $pagerPart = $(pgid + "_" + pagerParts[iPart], pgid);
                if ($pagerPart.length === 0 || $pagerPart[0].childNodes.length === 0) {
                  $pagerPart.hide();
                } else if ($pagerPart[0].childNodes.length === 1) {
                  pagerTable = $pagerPart[0].firstChild;
                  if ($(pagerTable).is("table.ui-pg-table") && (pagerTable.rows === 0 || pagerTable.rows[0].cells.length === 0)) {
                    $pagerPart.hide();
                  }
                }
              }
            }
          }
          if (p._nvtd) {
            if (twd > p._nvtd[0]) {
              $(pgid + "_" + o.position, pgid).width(twd);
              p._nvtd[0] = twd;
            }
            p._nvtd[1] = twd;
          }
          $t.nav = true;
          navtbl.bind("keydown.jqGrid", clickOnEnter);
        }
        $self.triggerHandler("jqGridResetFrozenHeights");
      });
    },
    navButtonAdd: function(elem, oMuligrid) {
      if (typeof elem === "object") {
        oMuligrid = elem;
        elem = undefined;
      }
      return this.each(function() {
        var $t = this,
          p = $t.p;
        if (!$t.grid) {
          return;
        }
        var o = $.extend({
              caption: "newButton",
              title: "",
              onClickButton: null,
              position: "last",
              cursor: "pointer",
              iconsOverText: false
            },
            base.getGridRes.call($($t), "nav"),
            jgrid.nav || {},
            p.navOptions || {},
            oMuligrid || {}
          ),
          disabledClass = getGuiStateStyles.call($t, "disabled");
        if (elem === undefined) {
          if (p.pager) {
            base.navButtonAdd.call($($t), p.pager, o);
            if (p.toppager) {
              elem = p.toppager;
            } else {
              return;
            }
          } else if (p.toppager) {
            elem = p.toppager;
          }
        }
        if (typeof elem === "string" && elem.indexOf("#") !== 0) {
          elem = "#" + jqID(elem);
        }
        var findnav = $(".navtable", elem),
          commonIconClass = o.commonIconClass;
        if (findnav.length > 0) {
          if (o.id && findnav.find("#" + jqID(o.id)).length > 0) {
            return;
          }
          var tbd = $("<div tabindex='0' role='button'></div>");
          if (o.buttonicon.toString().toUpperCase() === "NONE") {
            $(tbd).addClass("ui-pg-button ui-corner-all").append("<div class='ui-pg-div'>" +
              (o.caption ? "<span class='ui-pg-button-text" + (o.iconsOverText ? " ui-pg-button-icon-over-text" : "") + "'>" + o.caption + "</span>" : "") +
              "</div>");
          } else {
            $(tbd).addClass("ui-pg-button ui-corner-all").append("<div class='ui-pg-div'>" +
              "<span class='" +
              (o.iconsOverText ?
                mergeCssClasses("ui-pg-button-icon-over-text", commonIconClass, o.buttonicon) :
                mergeCssClasses(commonIconClass, o.buttonicon)) +
              "'></span>" +
              (o.caption ? "<span class='ui-pg-button-text" + (o.iconsOverText ? " ui-pg-button-icon-over-text" : "") + "'>" + o.caption + "</span>" : "") +
              "</div>");
          }
          if (o.id) {
            $(tbd).attr("id", o.id);
          }
          if (o.position === "first" && findnav.children("div.ui-pg-button").length > 0) {
            findnav.children("div.ui-pg-button").first().before(tbd);
          } else {
            findnav.append(tbd);
          }
          $(tbd, findnav)
            .attr("title", o.title || "")
            .click(function(e) {
              if (!hasOneFromClasses(this, disabledClass)) {
                if ($.isFunction(o.onClickButton)) {
                  o.onClickButton.call($t, o, e);
                }
              }
              return false;
            });
          $($t).triggerHandler("jqGridResetFrozenHeights");
        }
      });
    },
    navSeparatorAdd: function(elem, p) {
      p = $.extend({
        sepclass: "ui-separator",
        sepcontent: "",
        position: "last"
      }, p || {});
      return this.each(function() {
        if (!this.grid) {
          return;
        }
        if (typeof elem === "string" && elem.indexOf("#") !== 0) {
          elem = "#" + jqID(elem);
        }
        var findnav = $(".navtable", elem)[0];
        if (findnav.length > 0) {
          var sep = "<div class='ui-pg-button " + getGuiStateStyles.call(this, "disabled") + "'><span class='" + p.sepclass + "'></span>" + p.sepcontent + "</div>";
          if (p.position === "first") {
            if ($(">div.ui-pg-button", findnav).length === 0) {
              findnav.append(sep);
            } else {
              $(">div.ui-pg-button", findnav).first().before(sep);
            }
          } else {
            findnav.append(sep);
          }
        }
      });
    },
    GridToForm: function(rowid, formid) {
      return this.each(function() {
        var $t = this,
          i, $field, iField, $fieldi;
        if (!$t.grid) {
          return;
        }
        var rowdata = base.getRowData.call($($t), rowid),
          propOrAttr = $t.p.propOrAttr;
        if (rowdata) {
          for (i in rowdata) {
            if (rowdata.hasOwnProperty(i)) {
              $field = $("[name=" + jqID(i) + "]", formid);
              if ($field.is("input:radio") || $field.is("input:checkbox")) {
                for (iField = 0; iField < $field.length; iField++) {
                  $fieldi = $($field[iField]);
                  $fieldi[propOrAttr]("checked", $fieldi.val() === String(rowdata[i]));
                }
              } else {
                // this is very slow on big table and form.
                $field.val(isEmptyString(rowdata[i]) ? "" : rowdata[i]);
              }
            }
          }
        }
      });
    },
    FormToGrid: function(rowid, formid, mode, position) {
      return this.each(function() {
        var $t = this;
        if (!$t.grid) {
          return;
        }
        if (!mode) {
          mode = "set";
        }
        if (!position) {
          position = "first";
        }
        var fields = $(formid).serializeArray();
        var griddata = {};
        $.each(fields, function(i, field) {
          griddata[field.name] = field.value;
        });
        if (mode === "add") {
          base.addRowData.call($($t), rowid, griddata, position);
        } else if (mode === "set") {
          base.setRowData.call($($t), rowid, griddata);
        }
      });
    }
  });
  // end module grid.formedit
}));
