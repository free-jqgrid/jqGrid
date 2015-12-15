/**
 * jqFilter  jQuery jqGrid filter addon.
 * Copyright (c) 2011, Tony Tomov, tony@trirand.com
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * The work is inspired from this Stefan Pirvu
 * http://www.codeproject.com/KB/scripting/json-filtering.aspx
 *
 * The filter uses JSON entities to hold filter rules and groups. Here is an example of a filter:

{ "groupOp": "AND",
	  "groups" : [
		{ "groupOp": "OR",
			"rules": [
				{ "field": "name", "op": "eq", "data": "England" },
				{ "field": "id", "op": "le", "data": "5"}
			 ]
		}
	  ],
	  "rules": [
		{ "field": "name", "op": "eq", "data": "Romania" },
		{ "field": "id", "op": "le", "data": "1"}
	  ]
}
*/
/*jshint eqeqeq:false, eqnull:true, devel:true */
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, vars: true, white: true */
/*global jQuery, define */

(function(factory) {
  "use strict";
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["jquery", "./grid.base", "./grid.common"], factory);
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
    getGridRes = jgrid.getMethod("getGridRes");
  // begin module grid.filter
  $.fn.jqFilter = function(arg) {
    if (typeof arg === "string") {
      var fn = $.fn.jqFilter[arg];
      if (!fn) {
        throw ("jqFilter - No such method: " + arg);
      }
      var args = $.makeArray(arguments).slice(1);
      return fn.apply(this, args);
    }

    var p = $.extend(true, {
      filter: null,
      columns: [],
      onChange: null,
      afterRedraw: null,
      checkValues: null,
      error: false,
      errmsg: "",
      errorcheck: true,
      showQuery: true,
      sopt: null,
      ops: [],
      operands: null,
      numopts: ["eq", "ne", "lt", "le", "gt", "ge", "nu", "nn", "in", "ni"],
      stropts: ["eq", "ne", "bw", "bn", "ew", "en", "cn", "nc", "nu", "nn", "in", "ni"],
      strarr: ["text", "string", "blob"],
      groupOps: [{
        op: "AND",
        text: "AND"
      }, {
        op: "OR",
        text: "OR"
      }],
      groupButton: true,
      ruleButtons: true,
      direction: "ltr"
    }, jgrid.filter, arg || {});
    return this.each(function() {
      if (this.filter) {
        return;
      }
      this.p = p;
      // setup filter in case if they is not defined
      if (p.filter === null || p.filter === undefined) {
        p.filter = {
          groupOp: p.groupOps[0].op,
          rules: [],
          groups: []
        };
      }
      var iColumn, len = p.columns.length,
        cl, isIE = /msie/i.test(navigator.userAgent) && !window.opera,
        getGrid = function() {
          return $("#" + jgrid.jqID(p.id))[0] || null;
        },
        getGuiStyles = function(path) {
          //return jgrid.mergeCssClasses(jgrid.getRes(jgrid.guiStyles[getGrid().p.guiStyle], path), jqClasses || "");
          return jgrid.getRes(jgrid.guiStyles[getGrid().p.guiStyle], path);
        },
        errorClass = getGuiStyles("states.error"),
        dataField = getGuiStyles("filter.dataField");

      // translating the options
      p.initFilter = $.extend(true, {}, p.filter);
      // set default values for the columns if they are not set
      if (!len) {
        return;
      }
      for (iColumn = 0; iColumn < len; iColumn++) {
        cl = p.columns[iColumn];
        if (cl.stype) {
          // grid compatibility
          cl.inputtype = cl.stype === "select2" ? "select" : cl.stype;
        } else if (!cl.inputtype) {
          cl.inputtype = "text";
        }
        if (cl.sorttype) {
          // grid compatibility
          cl.searchtype = cl.sorttype;
        } else if (!cl.searchtype) {
          cl.searchtype = "string";
        }
        if (cl.hidden === undefined) {
          // jqGrid compatibility
          cl.hidden = false;
        }
        if (!cl.label) {
          cl.label = cl.name;
        }
        if (cl.index) {
          cl.name = cl.index;
        }
        if (!cl.hasOwnProperty("searchoptions")) {
          cl.searchoptions = {};
        }
        if (!cl.hasOwnProperty("searchrules")) {
          cl.searchrules = {};
        }

      }
      if (p.showQuery) {
        $(this).append("<div class='queryresult' dir='" + p.direction + "'><div class='query'></div></div>");
      }
      $(this).append("<input type='hidden' class='inputQuery'></input>");
      $(this).append("<div class='error' style='display:none;'><div class='" + errorClass + "' ></div></div>");
      /*
       *Perform checking.
       *
       */
      var checkData = function(val, colModelItem) {
        var ret = [true, ""],
          $t = getGrid();
        if ($.isFunction(colModelItem.searchrules)) {
          ret = colModelItem.searchrules.call($t, val, colModelItem);
        } else if (jgrid && jgrid.checkValues) {
          try {
            ret = jgrid.checkValues.call($t, val, -1, colModelItem.searchrules, colModelItem.label);
          } catch (ignore) {}
        }
        if (ret && ret.length && ret[0] === false) {
          p.error = !ret[0];
          p.errmsg = ret[1];
        }
      };
      /* moving to common
      randId = function() {
         return Math.floor(Math.random()*10000).toString();
      };
      */

      this.onchange = function() {
        // clear any error
        p.error = false;
        p.errmsg = "";
        return $.isFunction(p.onChange) ? p.onChange.call(this, p) : false;
      };
      /*
       * Redraw the filter every time when new field is added/deleted
       * and field is  changed
       */
      this.reDraw = function() {
        $("table.group:first", this).remove();
        var t = this.createTableForGroup(p.filter, null);
        $(this).append(t);
        if ($.isFunction(p.afterRedraw)) {
          p.afterRedraw.call(this, p);
        }
      };
      /**
       * Creates a grouping data for the filter
       * @param group - object
       * @param parentgroup - object
       */
      this.createTableForGroup = function(group, parentgroup) {
        var that = this,
          i;
        // this table will hold all the group (tables) and rules (rows)
        var table = $("<table class='group ui-search-table'><tbody></tbody></table>"),
          align = "left",
          th = $("<th></th>");
        // create error message row
        if (p.direction === "rtl") {
          align = "right";
          table.attr("dir", "rtl");
        }

        if (p.ruleButtons === true) {
          var tr = $("<tr></tr>");
          table.append(tr);
          // this header will hold the group operator type and group action buttons for
          // creating subgroup "+ {}", creating rule "+" or deleting the group "-"
          th = $("<th colspan='5' align='" + align + "' class='form-inline'></th>");
          tr.append(th);
          // dropdown for: choosing group operator type
          var groupOpSelect = $("<select class='opsel " + dataField + "'></select>");
          th.append(groupOpSelect);
          // populate dropdown with all posible group operators: or, and
          var str = "",
            selected;
          for (i = 0; i < p.groupOps.length; i++) {
            selected = group.groupOp === that.p.groupOps[i].op ? " selected='selected'" : "";
            str += "<option value='" + that.p.groupOps[i].op + "'" + selected + ">" + that.p.groupOps[i].text + "</option>";
          }

          groupOpSelect.append(str)
            .bind("change", function() {
              group.groupOp = $(groupOpSelect).val();
              that.onchange(); // signals that the filter has changed
            });
        }
        // button for adding a new subgroup
        var inputAddSubgroup = "";
        if (p.groupButton) {
          inputAddSubgroup = $("<button title='Add subgroup' class='add-group btn btn-xs btn-info'><span class='glyphicon glyphicon-object-align-left'></span></button>");
          inputAddSubgroup.bind("click", function() {
            if (group.groups === undefined) {
              group.groups = [];
            }

            group.groups.push({
              groupOp: p.groupOps[0].op,
              rules: [],
              groups: []
            }); // adding a new group

            that.reDraw(); // the html has changed, force reDraw

            that.onchange(); // signals that the filter has changed
            return false;
          });
          th.append('&nbsp;').append(inputAddSubgroup);
        }

        if (p.ruleButtons === true) {
          // button for adding a new rule
          var inputAddRule = $("<button type='button' title='Add rule' class='add-rule ui-add btn btn-xs btn-primary'><span class='glyphicon glyphicon-plus'></span></button>"),
            cm;
          inputAddRule.bind("click", function() {
            var searchable, hidden, ignoreHiding;
            //if(!group) { group = {};}
            if (group.rules === undefined) {
              group.rules = [];
            }
            for (i = 0; i < that.p.columns.length; i++) {
              // but show only serchable and serchhidden = true fields
              searchable = (that.p.columns[i].search === undefined) ? true : that.p.columns[i].search;
              hidden = (that.p.columns[i].hidden === true);
              ignoreHiding = (that.p.columns[i].searchoptions.searchhidden === true);
              if ((ignoreHiding && searchable) || (searchable && !hidden)) {
                cm = that.p.columns[i];
                break;
              }
            }

            var opr;
            if (cm.searchoptions.sopt) {
              opr = cm.searchoptions.sopt;
            } else if (that.p.sopt) {
              opr = that.p.sopt;
            } else if ($.inArray(cm.searchtype, that.p.strarr) !== -1) {
              opr = that.p.stropts;
            } else {
              opr = that.p.numopts;
            }

            group.rules.push({
              field: cm.name,
              op: opr[0],
              data: ""
            }); // adding a new rule

            that.reDraw(); // the html has changed, force reDraw
            // for the moment no change have been made to the rule, so
            // this will not trigger onchange event
            return false;
          });
          th.append('&nbsp;').append(inputAddRule);
        }

        // button for delete the group
        if (parentgroup !== null) { // ignore the first group
          var inputDeleteGroup = $("<button type='button' title='Delete group' class='delete-group btn btn-xs btn-danger'><span class='glyphicon glyphicon-minus'></span></button>");
          th.append('&nbsp;').append(inputDeleteGroup);
          inputDeleteGroup.bind("click", function() {
            // remove group from parent
            for (i = 0; i < parentgroup.groups.length; i++) {
              if (parentgroup.groups[i] === group) {
                parentgroup.groups.splice(i, 1);
                break;
              }
            }

            that.reDraw(); // the html has changed, force reDraw

            that.onchange(); // signals that the filter has changed
            return false;
          });
        }

        // append subgroup rows
        if (group.groups !== undefined) {
          var trHolderForSubgroup, tdFirstHolderForSubgroup, tdMainHolderForSubgroup;
          for (i = 0; i < group.groups.length; i++) {
            trHolderForSubgroup = $("<tr></tr>");
            table.append(trHolderForSubgroup);
            tdFirstHolderForSubgroup = $("<td class='first'></td>");
            trHolderForSubgroup.append(tdFirstHolderForSubgroup);
            tdMainHolderForSubgroup = $("<td colspan='4'></td>");
            tdMainHolderForSubgroup.append(this.createTableForGroup(group.groups[i], group));
            trHolderForSubgroup.append(tdMainHolderForSubgroup);
          }
        }
        if (group.groupOp === undefined) {
          group.groupOp = that.p.groupOps[0].op;
        }

        // append rules rows
        if (group.rules !== undefined) {
          for (i = 0; i < group.rules.length; i++) {
            table.append(
              this.createTableRowForRule(group.rules[i], group)
            );
          }
        }

        return table;
      };
      /*
       * Create the rule data for the filter
       */
      this.createTableRowForRule = function(rule, group) {
        // save current entity in a variable so that it could
        // be referenced in anonimous method calls

        var that = this,
          $t = getGrid(),
          tr = $("<tr></tr>"),
          i, op, cm, str = "",
          selected;
        tr.append("<td class='first'></td>");
        // create field container
        var ruleFieldTd = $("<td class='columns'></td>");
        tr.append(ruleFieldTd);
        // dropdown for: choosing field
        var ruleFieldSelect = $("<select class='" + dataField + "'></select>"),
          ina, aoprs = [];
        ruleFieldTd.append(ruleFieldSelect);
        ruleFieldSelect.bind("change", function() {
          rule.field = $(ruleFieldSelect).val();
          var trpar = $(this).parents("tr:first"),
            columns, k; // define LOCAL variables
          for (k = 0; k < that.p.columns.length; k++) {
            if (that.p.columns[k].name === rule.field) {
              columns = that.p.columns[k];
              break;
            }
          }
          if (!columns) {
            return;
          }
          var searchoptions = $.extend({
            emptyOptionText: getGridRes.call($($t), "search.emptyOptionText")
          }, columns.searchoptions || {}, {
            id: jgrid.randId(),
            name: columns.name,
            mode: "search"
          });
          if (isIE && columns.inputtype === "text") {
            if (!searchoptions.size) {
              searchoptions.size = 10;
            }
          }
          var elm = jgrid.createEl.call($t, columns.inputtype, searchoptions,
            "", true, that.p.ajaxSelectOptions || {}, true);
          $(elm).addClass("input-elm " + dataField);
          //that.createElement(rule, "");

          if (searchoptions.sopt) {
            op = searchoptions.sopt;
          } else if (that.p.sopt) {
            op = that.p.sopt;
          } else if ($.inArray(columns.searchtype, that.p.strarr) !== -1) {
            op = that.p.stropts;
          } else {
            op = that.p.numopts;
          }
          // operators
          var s = "",
            so = 0,
            odataItem, itemOper, itemText;
          aoprs = [];
          $.each(that.p.ops, function() {
            aoprs.push(this.oper);
          });
          // append aoprs array with custom operations defined in customSortOperations parameter jqGrid
          if (that.p.cops) {
            $.each(that.p.cops, function(propertyName) {
              aoprs.push(propertyName);
            });
          }
          for (k = 0; k < op.length; k++) {
            itemOper = op[k];
            ina = $.inArray(op[k], aoprs);
            if (ina !== -1) {
              odataItem = that.p.ops[ina];
              itemText = odataItem !== undefined ? odataItem.text : that.p.cops[itemOper].text;
              if (so === 0) {
                // the first select item will be automatically selected in single-select
                rule.op = itemOper;
              }
              s += "<option value='" + itemOper + "'>" + itemText + "</option>";
              so++;
            }
          }
          $(".selectopts", trpar).empty().append(s);
          $(".selectopts", trpar)[0].selectedIndex = 0;
          if (jgrid.msie && jgrid.msiever() < 9) {
            var sw = parseInt($("select.selectopts", trpar)[0].offsetWidth, 10) + 1;
            $(".selectopts", trpar).width(sw);
            $(".selectopts", trpar).css("width", "auto");
          }
          // data
          $(".data", trpar).empty().append(elm);
          jgrid.bindEv.call($t, elm, searchoptions);
          $(".input-elm", trpar).bind("change", function(e) {
            var elem = e.target;
            rule.data = elem.nodeName.toUpperCase() === "SPAN" && searchoptions && $.isFunction(searchoptions.custom_value) ?
              searchoptions.custom_value.call($t, $(elem).children(".customelement:first"), "get") : elem.value;
            that.onchange(); // signals that the filter has changed
          });
          setTimeout(function() { //IE, Opera, Chrome
            rule.data = $(elm).val();
            that.onchange(); // signals that the filter has changed
          }, 0);
        });
        // populate drop down with user provided column definitions
        var j = 0,
          searchable, hidden, ignoreHiding;
        for (i = 0; i < that.p.columns.length; i++) {
          // but show only serchable and serchhidden = true fields
          searchable = (that.p.columns[i].search === undefined) ? true : that.p.columns[i].search;
          hidden = (that.p.columns[i].hidden === true);
          ignoreHiding = (that.p.columns[i].searchoptions.searchhidden === true);
          if ((ignoreHiding && searchable) || (searchable && !hidden)) {
            selected = "";
            if (rule.field === that.p.columns[i].name) {
              selected = " selected='selected'";
              j = i;
            }
            str += "<option value='" + that.p.columns[i].name + "'" + selected + ">" + that.p.columns[i].label + "</option>";
          }
        }
        ruleFieldSelect.append(str);
        // create operator container
        var ruleOperatorTd = $("<td class='operators'></td>");
        tr.append(ruleOperatorTd);
        cm = p.columns[j];
        // create it here so it can be referentiated in the onchange event
        //var RD = that.createElement(rule, rule.data);
        if (isIE && cm.inputtype === "text") {
          if (!cm.searchoptions.size) {
            cm.searchoptions.size = 10;
          }
        }
        var ruleDataInput = jgrid.createEl.call($t, cm.inputtype,
          $.extend({
            emptyOptionText: getGridRes.call($($t), "search.emptyOptionText")
          }, cm.searchoptions || {}, {
            id: jgrid.randId(),
            name: cm.name
          }),
          rule.data, true, that.p.ajaxSelectOptions || {}, true);
        if (rule.op === "nu" || rule.op === "nn") {
          $(ruleDataInput).attr("readonly", "true");
          $(ruleDataInput).attr("disabled", "true");
        } //retain the state of disabled text fields in case of null ops
        // dropdown for: choosing operator
        var ruleOperatorSelect = $("<select class='selectopts " + dataField + "'></select>");
        ruleOperatorTd.append(ruleOperatorSelect);
        ruleOperatorSelect.bind("change", function() {
          rule.op = $(ruleOperatorSelect).val();
          var trpar = $(this).parents("tr:first"),
            rd = $(".input-elm", trpar)[0];
          if (rule.op === "nu" || rule.op === "nn") { // disable for operator "is null" and "is not null"
            rule.data = "";
            if (rd.tagName.toUpperCase() !== "SELECT") {
              rd.value = "";
            }
            rd.setAttribute("readonly", "true");
            rd.setAttribute("disabled", "true");
          } else {
            if (rd.tagName.toUpperCase() === "SELECT") {
              rule.data = rd.value;
            }
            rd.removeAttribute("readonly");
            rd.removeAttribute("disabled");
          }

          that.onchange(); // signals that the filter has changed
        });
        // populate drop down with all available operators
        if (cm.searchoptions.sopt) {
          op = cm.searchoptions.sopt;
        } else if (that.p.sopt) {
          op = that.p.sopt;
        } else if ($.inArray(cm.searchtype, that.p.strarr) !== -1) {
          op = that.p.stropts;
        } else {
          op = that.p.numopts;
        }
        str = "";
        var odataItem, itemOper;
        $.each(that.p.ops, function() {
          aoprs.push(this.oper);
        });
        // append aoprs array with custom operations defined in customSortOperations parameter jqGrid
        if (that.p.cops) {
          $.each(that.p.cops, function(propertyName) {
            aoprs.push(propertyName);
          });
        }
        for (i = 0; i < op.length; i++) {
          itemOper = op[i];
          ina = $.inArray(op[i], aoprs);
          if (ina !== -1) {
            odataItem = that.p.ops[ina];
            selected = rule.op === itemOper ? " selected='selected'" : "";
            str += "<option value='" + itemOper + "'" + selected + ">" +
              (odataItem !== undefined ? odataItem.text : that.p.cops[itemOper].text) +
              "</option>";
          }
        }
        ruleOperatorSelect.append(str);
        // create data container
        var ruleDataTd = $("<td class='data'></td>");
        tr.append(ruleDataTd);
        // textbox for: data
        // is created previously
        //ruleDataInput.setAttribute("type", "text");
        ruleDataTd.append(ruleDataInput);
        jgrid.bindEv.call($t, ruleDataInput, cm.searchoptions);
        $(ruleDataInput).addClass("input-elm " + dataField)
          .bind("change", function() {
            rule.data = cm.inputtype === "custom" ? cm.searchoptions.custom_value.call($t, $(this).children(".customelement:first"), "get") : $(this).val();
            that.onchange(); // signals that the filter has changed
          });
        // create action container
        var ruleDeleteTd = $("<td></td>");
        tr.append(ruleDeleteTd);
        // create button for: delete rule
        if (p.ruleButtons === true) {
          var ruleDeleteInput = $("<button type='button' title='Delete rule' class='delete-rule ui-del btn btn-xs btn-danger'><span class='glyphicon glyphicon-minus'></span></button>");
          ruleDeleteTd.append('&nbsp;').append(ruleDeleteInput);
          //$(ruleDeleteInput).html("").height(20).width(30).button({icons: {  primary: "ui-icon-minus", text:false}});
          ruleDeleteInput.bind("click", function() {
            // remove rule from group
            for (i = 0; i < group.rules.length; i++) {
              if (group.rules[i] === rule) {
                group.rules.splice(i, 1);
                break;
              }
            }

            that.reDraw(); // the html has changed, force reDraw

            that.onchange(); // signals that the filter has changed
            return false;
          });
        }
        return tr;
      };
      this.getStringForGroup = function(group) {
        var s = "(",
          index;
        if (group.groups !== undefined) {
          for (index = 0; index < group.groups.length; index++) {
            if (s.length > 1) {
              s += " " + group.groupOp + " ";
            }
            try {
              s += this.getStringForGroup(group.groups[index]);
            } catch (eg) {
              alert(eg);
            }
          }
        }

        if (group.rules !== undefined) {
          try {
            for (index = 0; index < group.rules.length; index++) {
              if (group.rules[index].data) {
                if (s.length > 1) {
                  s += " " + group.groupOp + " ";
                }
                s += this.getStringForRule(group.rules[index]);
              }
            }
          } catch (e) {
            alert(e);
          }
        }

        s += ")";
        if (s === "()") {
          return ""; // ignore groups that don't have rules
        }
        return s;
      };
      this.getStringForRule = function(rule) {
        var operand = "",
          opC = "",
          i, cm, ret, val = rule.data,
          oper, numtypes = ["int", "integer", "float", "number", "currency"]; // jqGrid
        for (i = 0; i < p.ops.length; i++) {
          if (p.ops[i].oper === rule.op) {
            operand = p.operands.hasOwnProperty(rule.op) ? p.operands[rule.op] : "";
            opC = p.ops[i].oper;
            break;
          }
        }
        if (opC === "" && p.cops != null) {
          for (oper in p.cops) {
            if (p.cops.hasOwnProperty(oper)) {
              opC = oper;
              operand = p.cops[oper].operand;
              if ($.isFunction(p.cops[oper].buildQueryValue)) {
                return p.cops[oper].buildQueryValue.call(p, {
                  cmName: rule.field,
                  searchValue: val,
                  operand: operand
                });
              }
            }
          }
        }
        for (i = 0; i < p.columns.length; i++) {
          if (p.columns[i].name === rule.field) {
            cm = p.columns[i];
            break;
          }
        }
        if (cm == null) {
          return "";
        }
        if (opC === "bw" || opC === "bn") {
          val = val + "%";
        }
        if (opC === "ew" || opC === "en") {
          val = "%" + val;
        }
        if (opC === "cn" || opC === "nc") {
          val = "%" + val + "%";
        }
        if (opC === "in" || opC === "ni") {
          val = " (" + val + ")";
        }
        if (p.errorcheck) {
          checkData(rule.data, cm);
        }
        if ($.inArray(cm.searchtype, numtypes) !== -1 || opC === "nn" || opC === "nu") {
          ret = rule.field + " " + operand + " " + val;
        } else {
          ret = rule.field + " " + operand + ' "' + val + '"';
        }
        return ret;
      };
      this.resetFilter = function() {
        p.filter = $.extend(true, {}, p.initFilter);
        this.reDraw();
        this.onchange();
      };
      this.hideError = function() {
        $("div.alert", this).html("");
        $("div.error", this).hide();
      };
      this.showError = function() {
        $("div.alert", this).html("<span class='glyphicon glyphicon-exclamation-sign'></span>" + p.errmsg);
        $("div.error", this).show();
      };
      this.toUserFriendlyString = function() {
        return this.getStringForGroup(p.filter);
      };
      this.toString = function() {
        // this will obtain a string that can be used to match an item.
        var that = this;

        function getStringRule(rule) {
          if (that.p.errorcheck) {
            var i, cm;
            for (i = 0; i < that.p.columns.length; i++) {
              if (that.p.columns[i].name === rule.field) {
                cm = that.p.columns[i];
                break;
              }
            }
            if (cm) {
              checkData(rule.data, cm);
            }
          }
          return rule.op + "(item." + rule.field + ",'" + rule.data + "')";
        }

        function getStringForGroup(group) {
          var s = "(",
            index;
          if (group.groups !== undefined) {
            for (index = 0; index < group.groups.length; index++) {
              if (s.length > 1) {
                if (group.groupOp === "OR") {
                  s += " || ";
                } else {
                  s += " && ";
                }
              }
              s += getStringForGroup(group.groups[index]);
            }
          }

          if (group.rules !== undefined) {
            for (index = 0; index < group.rules.length; index++) {
              if (s.length > 1) {
                if (group.groupOp === "OR") {
                  s += " || ";
                } else {
                  s += " && ";
                }
              }
              s += getStringRule(group.rules[index]);
            }
          }

          s += ")";
          if (s === "()") {
            return ""; // ignore groups that don't have rules
          }
          return s;
        }

        return getStringForGroup(p.filter);
      };
      // Here we init the filter
      this.reDraw();
      if (p.showQuery) {
        this.onchange();
      }
      // mark is as created so that it will not be created twice on this element
      this.filter = true;
    });
  };
  $.extend($.fn.jqFilter, {
    /*
     * Return SQL like string. Can be used directly
     */
    toSQLString: function() {
      var s = "";
      this.each(function() {
        s = this.toUserFriendlyString();
      });
      return s;
    },
    /*
     * Return filter data as object.
     */
    filterData: function() {
      var s;
      this.each(function() {
        s = this.p.filter;
      });
      return s;
    },
    getParameter: function(param) {
      if (param !== undefined) {
        if (this.p.hasOwnProperty(param)) {
          return this.p[param];
        }
      }
      return this.p;
    },
    resetFilter: function() {
      return this.each(function() {
        this.resetFilter();
      });
    },
    addFilter: function(pfilter) {
      if (typeof pfilter === "string") {
        pfilter = jgrid.parse(pfilter);
      }
      this.each(function() {
        this.p.filter = pfilter;
        this.reDraw();
        this.onchange();
      });
    }
  });
  // end module grid.filter
}));
