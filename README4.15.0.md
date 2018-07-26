# free fork of jqGrid
[![npm version](https://img.shields.io/npm/v/free-jqgrid.svg?style=flat)](https://www.npmjs.com/package/free-jqgrid)![downloadstotal](https://img.shields.io/npm/dt/free-jqgrid.svg?style=flat-square)&nbsp;[![Bower](https://img.shields.io/bower/v/free-jqgrid.svg?style=flat-square)](http://bower.io/search/?q=free-jqgrid)&nbsp;[![NuGet](https://img.shields.io/nuget/v/free-jqgrid.svg?style=flat-square)](https://www.nuget.org/packages/free-jqGrid/)![downloadstotal](https://img.shields.io/nuget/dt/free-jqgrid.svg?style=flat-square)&nbsp;[![Maven Central](https://img.shields.io/maven-central/v/org.webjars.npm/free-jqgrid.svg?style=flat-square)](http://search.maven.org/#search%7Cga%7C1%7Cfree-jqgrid)<br>[![CDNJS](https://img.shields.io/cdnjs/v/free-jqgrid.svg)](https://cdnjs.com/libraries/free-jqgrid/)&nbsp;[![jsDelivr CDN](https://img.shields.io/badge/jsDelivr%20CDN-v4.15.0-blue.svg)](https://www.jsdelivr.com/projects/free-jqgrid)&nbsp;<br>[![GitHub commits](https://img.shields.io/github/commits-since/free-jqgrid/jqgrid/v4.7.0.svg)](https://github.com/free-jqgrid/jqGrid/compare/v4.7.0...master)&nbsp;[![GitHub watchers](https://img.shields.io/github/watchers/free-jqgrid/jqGrid.svg)](https://github.com/free-jqgrid/jqGrid/watchers)[![GitHub forks](https://img.shields.io/github/forks/free-jqgrid/jqGrid.svg)](https://github.com/free-jqgrid/jqGrid/network)[![GitHub stars](https://img.shields.io/github/stars/free-jqgrid/jqGrid.svg)](https://github.com/free-jqgrid/jqGrid/stargazers)&nbsp;![devDependency status](https://david-dm.org/free-jqgrid/jqgrid/dev-status.svg)&nbsp;[![GitHub license](https://img.shields.io/badge/license-MIT%20or%20GNU%20GPLv2-blue.svg)](https://github.com/free-jqgrid/jqGrid/blob/master/LICENSE.md)
---
jqGrid is a popular jQuery Plugin for displaying and editing data in tabular form. It has some other more sophisticated features, like subgrids, TreeGrids, grouping and so on.

jqGrid was developed originally by [Tony Tomov](https://github.com/tonytomov) and it was available under MIT/GPL-licenses till the version 4.7.0 published Dec 8, 2014 (see [here](https://github.com/tonytomov/jqGrid/tree/v4.7.0)). Short time after that the license agreement was changed (see <a href="https://github.com/tonytomov/jqGrid/commit/1b2cb55c93ee8b279f15a3faf5a2f82a98da3b4c">here</a>) and new 4.7.1 version was <a href="https://github.com/tonytomov/jqGrid/tree/v4.7.1">published</a>.

The code from the GitHib repository is the fork of jqGrid 4.7.0 - the latest version available under MIT/GPL-licenses. It will be provided under MIT/GPL-licenses.

Below you can find short description of new features and the bug fixes implemented in free jqGrid 4.15.0 (compared with version 4.14.1). The version is developed by [Oleg Kiriljuk](https://github.com/OlegKi), alias [Oleg](https://stackoverflow.com/users/315935/oleg) on the stackoverflow and [OlegK](http://www.trirand.com/blog/?page_id=393) on trirand forum.

Read [Wiki](https://github.com/free-jqgrid/jqGrid/wiki) for more detailed information about the features of free-jqGrid. The preliminary version of the documentation can be found [here](https://free-jqgrid.github.io/).

Free jqGrid can be used *for free*. We still ask to contribute the development by donating via PayPal, if one have the possibility for it. One can donate by clicking on the following button [![PayPayl donate button](https://www.paypalobjects.com/webstatic/en_US/btn/btn_donate_pp_142x27.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=JGTCBLQM2BYHG "Donate once-off to free jqGrid project using PayPal") or by sending money via PayPal to oleg.kiriljuk@ok-soft-gmbh.com with the comment "free jqGrid". Bank transfer based on the invoice from OK soft GmbH is another option of donating. Just send the email with the information about the amount of donation and you will get the corresponding invoice with the full information about our bank account and our VAT number.

One can install the package with respect of [npm](https://www.npmjs.com/package/free-jqgrid) by using "npm install free-jqgrid", with respect of [bower](https://bower.io/search/?q=free-jqgrid) by using "bower install free-jqgrid" or from [NuGet](https://www.nuget.org/packages/free-jqGrid) by using "Install-Package free-jqGrid".

The package is published on [WebJars](http://www.webjars.org/) too and it's deployed to [Maven Central](https://search.maven.org/#search%7Cga%7C1%7Cfree-jqgrid).

Free jqGrid is is available from [jsDelivr CDN](https://www.jsdelivr.com/projects/free-jqgrid) and [cdnjs](https://cdnjs.com/libraries/free-jqgrid). Thus one can use it directly from Internet by including for example the URLs like
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/free-jqgrid@4.15.0/css/ui.jqgrid.min.css">
<script src="https://cdn.jsdelivr.net/npm/free-jqgrid@4.15.0/js/jquery.jqgrid.min.js"></script>
```
or
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.15.0/css/ui.jqgrid.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.15.0/jquery.jqgrid.min.js"></script>
```
**The locale file is optional**. One can, but one don't need to include `grid.locale-en.min.js`, because the same information is already included in the `jquery.jqgrid.min.js` (or `jquery.jqgrid.src.js`).

If somebody want to test the *latest* version of free jqGrid, one can load it directly from GitHib using [RawGit](https://rawgit.com/) service:
```html
<link rel="stylesheet" href="https://rawgit.com/free-jqgrid/jqGrid/master/css/ui.jqgrid.css">
<script src="https://rawgit.com/free-jqgrid/jqGrid/master/js/jquery.jqgrid.src.js"></script>
```
All other language files and plugins are available from CDN too. See [the wiki article](https://github.com/free-jqgrid/jqGrid/wiki/Access-free-jqGrid-from-different-CDNs) for more details about the usage of free jqGrid from CDNs and RawGit.

Remark: the above URLs will be available **after publishing** the release of the version of 4.15.0.

### New main features implemented in the version 4.15.0 compared with 4.14.1:

* New methods `rotateColumnHeaders` allow to rotate the column headers to -90 degree. It could be practical to hold the grid compact in case of usage columns with small conent like checkboxes. Such columns could have header, which text is longer the the checkboxes. If one need to display many such columns then ratation of the column headers of such columns can essentially reduce the width od the grid and to improve the visibility. The CSS of the column resizer is changed to have better results in medern web browsers. The old Internet Explorer calculate wrong height of resizer with the new settings. The method `resetColumnResizerHeight` fixs the height of column resizer in IE. It will be automatically called in `rotateColumnHeaders` near to the end. I still not sure that recalculation of the height of the resize in IE should be done in other situations. Because of that I made the method public.
* New options milti-sorting option (`multiSort: true`): `showSortOrder`, `multiSortOrder` and `formatSortOrder`. The default behavior of multisorting is changed. It uses now new options by default. The option `showSortOrder: true` follows deiplaying of small 1-based index of sorting near the column header. It visualize the order of sorting columns. See the comment of [the commit](https://github.com/free-jqgrid/jqGrid/commit/77e0c884db30623d26f43b28b454125a865327ec) for more detailed information.
* New multiselect options `maxSortColumns` and `sortOrderPosition` are added. New numeric option `maxSortColumns` with default value 3 allows to reduce the total number of column by which the grid could be sorted. It works only in case of usage `multiSortOrder: "lastClickedFirstSorted"` option. If the user clicks of the 4th column header and `maxSortColumns` is 3 then the column with the 4th sorting index will be removed and the grid will be sorted by 3 columns maximal. Such behavir simplify for the user removing of sorting by unneed columns. New option `sortOrderPosition` with two allowed values `"afterSortIcons"` and `"beforeSortIcons"` provides more customization possibilities. Default value is `"afterSortIcons"`, but `sortOrderPosition: "beforeSortIcons"` could be interesing, for example, in case of combination with `sortIconsBeforeTex. The option `multiSortOrder` could be used as callback function additionally to the usage as `"lastClickedFirstSorted"` or `"lastClickedLastSorted"`. The callback has now only one `options` parameter with `sortNames`, `cm`, `sortDirs` and `removeSorting` properties. New property `removeSorting` is the function, which can be used by `multiSortOrder` callback to remove some column from sorting. As I mention above, the option `maxSortColumns` works only in case of usage `multiSortOrder: "lastClickedFirstSorted"`. If the callback want to implement close behavior it should be able to remove sorting order. In the case it can call `options.removeSorting` function with the element of `options.sortNames` array as parameter.
* Cell editing is extended. On can use now cell editing in combined with `multiselect: true`. One can `noCellSelection: true` to change the default behavior of cell editing and to replace cell celection to selection of rows.

The default value of `autoencode` option is changed to `autoencode: true`. Such changes could have minor **compatibility** issue, but the comfort of usage for new users seems be more important. New setting `autoencode: true` is important to prevent Cross Site Scipting (XSS) *by default*.

### Below one can see the full list of changes in the version 4.15.0 compared with 4.14.1:

* Fix/extend `free-jqgrid.d.ts` to describe more full all existing options, methods and events
* Fix calculation of alert position of form editing if no `alerttop` and `alertleft` specified
* Bug fix for correct deleting of row in cell editing mode
* Fix the code of `rotateColumnHeaders` to work on columns, which has not `autoResizable:true` property
* Fix `sortGrid` to use `sortData` correctly (the first parameter)
* Some bug fixes in working with frozen columns
* Add `delui` and `deltext` options of `delGridRow`. New options allows to display div with some information like `"Deleting..."` during Ajax request to delete row(s). See [the issue #365](https://github.com/free-jqgrid/jqGrid/issues/365) for more details.
* Fix selection in multiselct mode if used in combination with cell editing and if checkbox of multiselect is clicked during cell editing in the line
* Fix working with prefix/suffix in `filterToolbar` in case of currency formatter
* Fix typing error in the name of internaly use function: from `moveVerical` to `moveVertical`
* Improve formatting of the code of the old plugin `ui.multiselect.js`
* Change default value for `autoencode` option from the old value `false` to `true`. Such changes could have compatibility issue, but I think that the comfort for new users is more important. New setting `autoencode: true` is important to prevent Cross Site Scipting (XSS) *by default*.
* Fix unneeded border if the first hidden row of grouping headers in Bootstrap
* Fix CSS rules: improve alignment of the editing elements of jqGrid
* Remove "shaking" of grid with frozen columns during start of cell editing
* Fixes in row selection logic in combination with cell editing
* Fix the height of rows during cell editing when frozen columns be editing
* Improve the code of `$.jgrid.parseDate` for better upwards compatibility. See the comment for [the commit](https://github.com/free-jqgrid/jqGrid/commit/63c1833f718bb45a736417a312b57bfedaa6bb6f) for more details.
* Add Boolean `selectOnContextMenu` option, which allows to prevent row selection on contextmenu (right mouse click). One can use the option `selectOnContextMenu: false` to prevent selection of the row on contextmenu (right mouse click) before call of `onRightClickRow` callback or `jqGridRightClickRow` event. One can still select the row, if needed, inside the callback (or inside the event) by call of `setSelection` method.
* Make the code of `getLocalRow` method mode safe
* Inctroduce new Boolean option `noCellSelection`, which can be combined with cell editing
* Bug fix of `setAttributes` function of `createEl` to prevent setting `generateValue` and `postData` as DOM attributes
* Fix applying `itemIconSpanStyle` and `itemAnchorStyle` options for jQuery UI menu without ancors
* Bug fix in the code of `changeRowid` method to refresh `_index` after chaning of id
* Fix: remove transparence of btable used in frozen div of Bootstrap
* Add first version of implementation of new methods `rotateColumnHeaders` and `resetColumnResizerHeight`
* Add new multiselect options `maxSortColumns`, `sortOrderPosition`. Change default value of `multiSortOrder` and the options of `multiSortOrder` callback. See the comment of [the commit](https://github.com/free-jqgrid/jqGrid/commit/9152f47430bb16778a2e59bd9530409b9fbe6660) for more detailes.
* Fix the usage of the `index` parameter of internal `dataSort` function
* Fix the bug in `refreshIndex` if one use wrong input parameters: `loadonce:true` with local `datatype`
* Some preliminary changes in auto-resizing for new property in `colModel`: `rotated: true`
* Fix: make the code of `setFrozenColumns` more safe (prevent exception)
* Fix the problem with asyncronous processing in latest versions of jQuery
* Fix `setFrozenColumns` to be more safe for exceptions in case of usage `sortable` option
* Add new options of milti-sorting implemented: `showSortOrder`, `multiSortOrder` and `formatSortOrder`. See the comment of [the commit](https://github.com/free-jqgrid/jqGrid/commit/77e0c884db30623d26f43b28b454125a865327ec) for more detailed information.
* Fix CSS inline styles of column header in case of usage labelAlign:"right" or labelAlign:"likeData"
* Fix detection of IE web browser
* Move some CSS settings of groupped header (ui-th-column-header) from JavaScript code to CSS
* Add DefinitelyTyped package in devDependencies of bower.json
* Change options used by TypeScript compiler to use "es2015", "es2017" and "dom"
* Change CSS rules of `.ui-jqgrid-resize` to hold 100% height of the resizer div, adjust the code of `setGroupHeaders`
* Bug fix in vertical scrolling during cell editing
* Fix title of formatter:"select" in `setRowData`
* Fix processing of formatter:"select", edittype: "select" during navigation in Add/Edit forms
* Initialize `this` as DOM of grid in sorttype defined as function
* Allow to specify classes with custom icons for TreeGrid nodes. The `icon` property of input data of TreeGrid already could specify the custom class of **leafs** of TreeGrid. The changes allows to specify custom icons of **nodes** of TreeGrid too. The nodes displays one from **two** icons depend on the state of the node (expanded or collapsed). The `icon` property can now specify the two icons, which need be comma separated. For example, one can use `icon: "ui-icon-folder-open,ui-icon-folder-collapsed"` in case of using jQuery UI icons.
* Fix the URLs to jsdelivr.net CDN
* Fix uglify option to hold license comment in minimized files

Other old readmes contain the list of the features and bug fixed implemented in previous versions of free jqGrid:

* [README4.14.1.md](https://github.com/free-jqgrid/jqGrid/blob/master/README4.14.1.md) contains the readme of free jqGrid 4.14.1.
* [README4.14.0.md](https://github.com/free-jqgrid/jqGrid/blob/master/README4.14.0.md) contains the readme of free jqGrid 4.14.0.
* [README4.13.6.md](https://github.com/free-jqgrid/jqGrid/blob/master/README4.13.6.md) contains the readme of free jqGrid 4.13.6.
* [README4.13.5.md](https://github.com/free-jqgrid/jqGrid/blob/master/README4.13.5.md) contains the readme of free jqGrid 4.13.5.
* [README4.13.4.md](https://github.com/free-jqgrid/jqGrid/blob/master/README4.13.4.md) contains the readme of free jqGrid 4.13.4.
* [README4.13.3.md](https://github.com/free-jqgrid/jqGrid/blob/master/README4.13.3.md) contains the readme of free jqGrid 4.13.3.
* [README4.13.2.md](https://github.com/free-jqgrid/jqGrid/blob/master/README4.13.2.md) contains the readme of free jqGrid 4.13.2.
* [README4.13.1.md](https://github.com/free-jqgrid/jqGrid/blob/master/README4.13.1.md) contains the readme of free jqGrid 4.13.1.
* [README4.13.0.md](https://github.com/free-jqgrid/jqGrid/blob/master/README4.13.0.md) contains the readme of free jqGrid 4.13.0.
* [README4.12.1.md](https://github.com/free-jqgrid/jqGrid/blob/master/README4.12.1.md) contains the readme of free jqGrid 4.12.1.
* [README4.12.0.md](https://github.com/free-jqgrid/jqGrid/blob/master/README4.12.0.md) contains the readme of free jqGrid 4.12.0.
* [README4.11.1.md](https://github.com/free-jqgrid/jqGrid/blob/master/README4.11.1.md) contains the readme of free jqGrid 4.11.1.
* [README4.11.0.md](https://github.com/free-jqgrid/jqGrid/blob/master/README4.11.0.md) contains the readme of free jqGrid 4.11.0.
* [README4.10.0.md](https://github.com/free-jqgrid/jqGrid/blob/master/README4.10.0.md) contains the readme of free jqGrid 4.10.0.
* [README492.md](https://github.com/free-jqgrid/jqGrid/blob/master/README492.md) contains the readme of free jqGrid 4.9.2.
* [README491.md](https://github.com/free-jqgrid/jqGrid/blob/master/README491.md) contains the readme of free jqGrid 4.9.1.
* [README49.md](https://github.com/free-jqgrid/jqGrid/blob/master/README49.md) contains the readme of free jqGrid 4.9.0.
* [README48.md](https://github.com/free-jqgrid/jqGrid/blob/master/README48.md) contains the readme of free jqGrid 4.8.0.

**Many thanks to all, who sent bug reports and suggestions to improve free jqGrid!**
