/**
 * Copyright (c) 2017, Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 */

/// <reference path="../free-jqgrid.d.ts" />
/// <reference types="qunit" />

$(() => {
    "use strict";
    const mydata = [
        { id: 10, firstName: "Angela", lastName: "Merkel" },
        { id: 20, firstName: "Vladimir", lastName: "Putin" },
        { id: 30, firstName: "David", lastName: "Cameron" },
        { id: 40, firstName: "Barack", lastName: "Obama" },
        { id: 50, firstName: "François", lastName: "Hollande" }
    ];
    const $grid = $("#grid").jqGrid({
        colModel: [
            { name: "firstName" },
            { name: "lastName" }
        ],
        data: mydata
    });
    const grid: FreeJqGrid.GridInfo = $grid[0].grid;
    let t1 = $("#grid").jqGrid("getGridParam", "data");
    let t11 = $("#grid").jqGrid("getGridParam", "data");
    let ids: string[] = $("#grid").jqGrid("getDataIDs");
    //var t2 = $("#grid").jqGrid("getGridParam", 1);
    //var t3 = $("#grid").jqGrid("getGridParam", "data", t1);
    //if (ids != null && ids.length > 0) {
    //	alert(ids[0].substr(0));
    //}
	//$.jgrid.del.
    //var d = $("#grid").jqGrid("getGridParam", "data", 2); // error: Supplied parameters do not match any signature of call target
    //var currentData = $("#grid").getGridParam(4); // error: Argument of type '4' is not assignable to parameter of type 'string'.
    //var ids1 = $("#grid").jqGrid("getDataIDs", 4); // error: Argument of type '"getDataIDs"' is not assignable to parameter of type '"getGridParam"'.
    //var ids2 = $("#grid").jqGrid("getDataIds"); // error: Argument of type '"getDataIds"' is not assignable to parameter of type 'FreeJqGridOptions'
    /*)
	alert("We use " + $.jgrid.productName + " " + $.jgrid.version);
    alert($.jgrid.locales[$.jgrid.defaults.locale].defaults.emptyrecords);
    alert($.jgrid.locales[$.jgrid.defaults.locale].search.odata[0].text);
	*/
    //$.jgrid.clearArray(mydata);
    const gridDom = <FreeJqGrid.BodyTable>$("#grid")[0];
    const headers = gridDom.grid.headers;
    //headers: { el: HTMLTableHeaderCellElement; width: number; }[]
    const colHeaderHeight: number = $(headers[1].el).height();
	
	QUnit.test("grid exists", function(assert) {
		assert.equal($grid.length, 1, "Passed!");
	});
	QUnit.test("gbox exists", function(assert) {
		assert.equal($grid.closest(".ui-jqgrid").length, 1, "Passed!");
	});
	QUnit.test("grid expando exists", function(assert) {
		assert.notEqual( gridDom.grid, undefined, "Passed!");
	});
	QUnit.test("p expando exists", function(assert) {
		assert.notEqual(gridDom.p, undefined, "Passed!");
	});
	QUnit.test("rows of grid exist - it's table", function(assert) {
		assert.notEqual(gridDom.rows, undefined, "Passed!");
	});
	QUnit.test("grid has 6 rows", function(assert) {
		assert.equal(gridDom.rows.length, 6, "Passed!");
	});
	QUnit.test("grid has 1 hidden first rows (with class jqgfirstrow)", function(assert) {
		assert.equal($(gridDom.rows[0]).hasClass("jqgfirstrow"), true, "Passed!");
	});
	QUnit.test("grid has 5 data rows (with class jqgrow)", function(assert) {
		assert.equal($grid.find(">tbody>tr.jqgrow").length, 5, "Passed!");
	});
	/*
	QUnit.test("grid has the pager", function(assert) {
		let pagerIdSelector = $grid.jqGrid("getGridParam", "pager");
		assert.equal($(pagerIdSelector).length, 1, "Passed!");
	});
	QUnit.test("the pager is DIV", function(assert) {
		let pagerIdSelector = $grid.jqGrid("getGridParam", "pager");
		assert.equal($(pagerIdSelector)[0].nodeName.toUpperCase(), "DIV", "Passed!");
	});
	QUnit.test("the pager is inside of gbox", function(assert) {
		let pagerIdSelector = $grid.jqGrid("getGridParam", "pager");
		assert.equal($(pagerIdSelector).closest(".ui-jqgrid").length, 1, "Passed!");
	});
	QUnit.test("the pager is inside of gbox", function(assert) {
		let pagerIdSelector = $grid.jqGrid("getGridParam", "pager");
		assert.equal($(pagerIdSelector).closest(".ui-jqgrid").length, 1, "Passed!");
	});
	QUnit.test("the pager has INPUT with 1", function(assert) {
		let pagerIdSelector = $grid.jqGrid("getGridParam", "pager");
		assert.equal($(pagerIdSelector).find("input.ui-pg-input").val(), "1", "Passed!");
	});
	QUnit.test("the last page is 2", function(assert) {
		let pagerIdSelector = $grid.jqGrid("getGridParam", "pager"),
			lastPageSpanId = "#sp_1_" + pagerIdSelector.substring(1);
		assert.equal($(lastPageSpanId).text(), "2", "Passed!");
	});
	QUnit.test("the page size is 10", function(assert) {
		let pagerIdSelector = $grid.jqGrid("getGridParam", "pager");
		assert.equal($(pagerIdSelector).find("select.ui-pg-selbox").val(), "10", "Passed!");
	});
	QUnit.test("the page info \"View 1 - 10 of 12\"", function(assert) {
		let pagerIdSelector = $grid.jqGrid("getGridParam", "pager");
		assert.equal($(pagerIdSelector).find(".ui-paging-info").text(), "View 1 - 10 of 12", "Passed!");
	});
	QUnit.test("the pager contains navigator bar", function(assert) {
		let pagerIdSelector = $grid.jqGrid("getGridParam", "pager");
		assert.equal($(pagerIdSelector).find(".navtable").length, 1, "Passed!");
	});
	QUnit.test("the navigator bar is DIV", function(assert) {
		let pagerIdSelector = $grid.jqGrid("getGridParam", "pager");
		assert.equal($(pagerIdSelector).find(".navtable")[0].nodeName.toUpperCase(), "DIV", "Passed!");
	});
	QUnit.test("the navigator bar contains 4 buttons", function(assert) {
		let pagerIdSelector = $grid.jqGrid("getGridParam", "pager");
		assert.equal($(pagerIdSelector).find(".navtable").find(".ui-pg-button>.ui-pg-div").length, 4, "Passed!");
	});
	QUnit.test("the first row if data have id 11", function(assert) {
		assert.equal($grid[0].rows[1].id, "11", "Passed!");
	});*/
	QUnit.test("1-st cell of the 1-st row contain \"Angela\"", function(assert) {
		assert.equal($((<HTMLTableRowElement>gridDom.rows[1]).cells[0]).text(), "Angela", "Passed!");
	});
	QUnit.test("2-d cell of the 1-st row contain \"Merkel\"", function(assert) {
		assert.equal($((<HTMLTableRowElement>gridDom.rows[1]).cells[1]).text(), "Merkel", "Passed!");
	});	
	/*
	QUnit.test("formatted 2007-10-01 is 01-Oct-2007", function(assert) {
		assert.equal($($grid[0].rows[1].cells[1]).text(), "01-Oct-2007", "Passed!");
	});
	QUnit.test("0 formatted as number is 0.00", function(assert) {
		assert.equal($($grid[0].rows[1].cells[2]).text(), "0.00", "Passed!");
	});*/
	/*QUnit.test("test data returned by getRowData for the rowid=51", function(assert) {
		let rowData = $grid.jqGrid("getRowData", "51");
		assert.deepEqual(rowData, { invdate: "31-Oct-2007", name: "test5",  note: "note5",  amount: "300.00", tax: "20.00", closed: "false", ship_via: "FE", total: "320.00" }, "Passed!");
	});
	QUnit.test("test add data by addRowData for the rowid=10", function(assert) {
		let rowData = $grid.jqGrid("addRowData", "10", { invdate: "2015-04-03", name: "test15",  note: "note15",  amount: 300.00, tax: 20.00, closed: true, ship_via: "FE", total: 320.00 });
		assert.equal((<FreeJqGrid.BodyTable>$grid[0]).rows.length, 12, "the grid has 11 data rows");
		assert.equal($((<FreeJqGrid.BodyTable>$grid[0]).rows[11].cells[1]).text(), "03-Apr-2015", "2015-04-03 is displayed as 03-Apr-2015");
		assert.equal($((<FreeJqGrid.BodyTable>$grid[0]).rows[11]).hasClass("myAltRowClass"), false, "the last row has no myAltRowClass");
		assert.equal($((<FreeJqGrid.BodyTable>$grid[0]).rows[10]).hasClass("myAltRowClass"), true, "the previous row has myAltRowClass");
	});*/
});
