$(function () {
    "use strict";
    var mydata = [
        { id: 10, firstName: "Angela", lastName: "Merkel" },
        { id: 20, firstName: "Vladimir", lastName: "Putin" },
        { id: 30, firstName: "David", lastName: "Cameron" },
        { id: 40, firstName: "Barack", lastName: "Obama" },
        { id: 50, firstName: "François", lastName: "Hollande" }
    ];
    var $grid = $("#grid").jqGrid({
        colModel: [
            { name: "firstName" },
            { name: "lastName" }
        ],
        data: mydata
    });
    var grid = $grid[0].grid;
    var t1 = $("#grid").jqGrid("getGridParam", "data");
    var t11 = $("#grid").jqGrid("getGridParam", "data");
    var ids = $("#grid").jqGrid("getDataIDs");
    var gridDom = $("#grid")[0];
    var headers = gridDom.grid.headers;
    var colHeaderHeight = $(headers[1].el).height();
    QUnit.test("grid exists", function (assert) {
        assert.equal($grid.length, 1, "Passed!");
    });
    QUnit.test("gbox exists", function (assert) {
        assert.equal($grid.closest(".ui-jqgrid").length, 1, "Passed!");
    });
    QUnit.test("grid expando exists", function (assert) {
        assert.notEqual(gridDom.grid, undefined, "Passed!");
    });
    QUnit.test("p expando exists", function (assert) {
        assert.notEqual(gridDom.p, undefined, "Passed!");
    });
    QUnit.test("rows of grid exist - it's table", function (assert) {
        assert.notEqual(gridDom.rows, undefined, "Passed!");
    });
    QUnit.test("grid has 6 rows", function (assert) {
        assert.equal(gridDom.rows.length, 6, "Passed!");
    });
    QUnit.test("grid has 1 hidden first rows (with class jqgfirstrow)", function (assert) {
        assert.equal($(gridDom.rows[0]).hasClass("jqgfirstrow"), true, "Passed!");
    });
    QUnit.test("grid has 5 data rows (with class jqgrow)", function (assert) {
        assert.equal($grid.find(">tbody>tr.jqgrow").length, 5, "Passed!");
    });
    QUnit.test("1-st cell of the 1-st row contain \"Angela\"", function (assert) {
        assert.equal($(gridDom.rows[1].cells[0]).text(), "Angela", "Passed!");
    });
    QUnit.test("2-d cell of the 1-st row contain \"Merkel\"", function (assert) {
        assert.equal($(gridDom.rows[1].cells[1]).text(), "Merkel", "Passed!");
    });
});
//# sourceMappingURL=test.js.map