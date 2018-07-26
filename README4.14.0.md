# free fork of jqGrid
[![npm version](https://img.shields.io/npm/v/free-jqgrid.svg?style=flat)](https://www.npmjs.com/package/free-jqgrid)![downloadstotal](https://img.shields.io/npm/dt/free-jqgrid.svg?style=flat-square)&nbsp;[![CDNJS](https://img.shields.io/cdnjs/v/free-jqgrid.svg)](https://cdnjs.com/libraries/free-jqgrid/)&nbsp;[![jsDelivr CDN](https://img.shields.io/badge/jsDelivr%20CDN-v4.14.0-blue.svg)](https://www.jsdelivr.com/projects/free-jqgrid)&nbsp;[![Bower](https://img.shields.io/bower/v/free-jqgrid.svg?style=flat-square)](http://bower.io/search/?q=free-jqgrid)&nbsp;[![NuGet](https://img.shields.io/nuget/v/free-jqgrid.svg?style=flat-square)](https://www.nuget.org/packages/free-jqGrid/)&nbsp;[![Maven Central](https://img.shields.io/maven-central/v/org.webjars.npm/free-jqgrid.svg?style=flat-square)](http://search.maven.org/#search%7Cga%7C1%7Cfree-jqgrid)<br>[![GitHub commits](https://img.shields.io/github/commits-since/free-jqgrid/jqgrid/v4.7.0.svg)](https://github.com/free-jqgrid/jqGrid/compare/v4.7.0...master)&nbsp;[![GitHub watchers](https://img.shields.io/github/watchers/free-jqgrid/jqGrid.svg)](https://github.com/free-jqgrid/jqGrid/watchers)[![GitHub forks](https://img.shields.io/github/forks/free-jqgrid/jqGrid.svg)](https://github.com/free-jqgrid/jqGrid/network)[![GitHub stars](https://img.shields.io/github/stars/free-jqgrid/jqGrid.svg)](https://github.com/free-jqgrid/jqGrid/stargazers)&nbsp;![devDependency status](https://david-dm.org/free-jqgrid/jqgrid/dev-status.svg)&nbsp;[![GitHub license](https://img.shields.io/badge/license-MIT%20or%20GNU%20GPLv2-blue.svg)](https://github.com/free-jqgrid/jqGrid/blob/master/LICENSE.md)
---
jqGrid is a popular jQuery Plugin for displaying and editing data in tabular form. It has some other more sophisticated features, like subgrids, TreeGrids, grouping and so on.

jqGrid was developed originally by [Tony Tomov](https://github.com/tonytomov) and it was available under MIT/GPL-licenses till the version 4.7.0 published Dec 8, 2014 (see [here](https://github.com/tonytomov/jqGrid/tree/v4.7.0)). Short time after that the license agreement was changed (see <a href="https://github.com/tonytomov/jqGrid/commit/1b2cb55c93ee8b279f15a3faf5a2f82a98da3b4c">here</a>) and new 4.7.1 version was <a href="https://github.com/tonytomov/jqGrid/tree/v4.7.1">published</a>.

The code from the GitHib repository is the fork of jqGrid 4.7.0 - the latest version available under MIT/GPL-licenses. It will be provided under MIT/GPL-licenses.

Below you can find short description of new features and the bug fixes implemented in free jqGrid 4.14.0 (compared with version 4.13.6). The version is developed by [Oleg Kiriljuk](https://github.com/OlegKi), alias [Oleg](https://stackoverflow.com/users/315935/oleg) on the stackoverflow and [OlegK](http://www.trirand.com/blog/?page_id=393) on trirand forum.

Read [Wiki](https://github.com/free-jqgrid/jqGrid/wiki) for more detailed information about the features of free-jqGrid. The preliminary version of the documentation can be found [here](https://free-jqgrid.github.io/).

Free jqGrid can be used *for free*. We still ask to contribute the development by donating via PayPal, if one have the possibility for it. One can donate by clicking on the following button [![PayPayl donate button](https://www.paypalobjects.com/webstatic/en_US/btn/btn_donate_pp_142x27.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=JGTCBLQM2BYHG "Donate once-off to free jqGrid project using PayPal") or by sending money via PayPal to oleg.kiriljuk@ok-soft-gmbh.com with the comment "free jqGrid". Bank transfer based on the invoice from OK soft GmbH is another option of donating. Just send the email with the information about the amount of donation and you will get the corresponding invoice with the full information about our bank account and our VAT number.

One can install the package with respect of [npm](https://www.npmjs.com/package/free-jqgrid) by using "npm install free-jqgrid", with respect of [bower](https://bower.io/search/?q=free-jqgrid) by using "bower install free-jqgrid" or from [NuGet](https://www.nuget.org/packages/free-jqGrid) by using "Install-Package free-jqGrid".

The package is published on [WebJars](http://www.webjars.org/) too and it's deployed to [Maven Central](https://search.maven.org/#search%7Cga%7C1%7Cfree-jqgrid).

Free jqGrid is is available from [jsDelivr CDN](https://www.jsdelivr.com/projects/free-jqgrid) and [cdnjs](https://cdnjs.com/libraries/free-jqgrid). Thus one can use it directly from Internet by including for example the URLs like
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/free-jqgrid/4.14.0/css/ui.jqgrid.min.css">
<script src="https://cdn.jsdelivr.net/free-jqgrid/4.14.0/js/jquery.jqgrid.min.js"></script>
```
or
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.14.0/css/ui.jqgrid.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.14.0/jquery.jqgrid.min.js"></script>
```
**The locale file is optional**. One can, but one don't need to include `grid.locale-en.min.js`, because the same information is already included in the `jquery.jqgrid.min.js` (or `jquery.jqgrid.src.js`).

If somebody want to test the *latest* version of free jqGrid, one can load it directly from GitHib using [RawGit](https://rawgit.com/) service:
```html
<link rel="stylesheet" href="https://rawgit.com/free-jqgrid/jqGrid/master/css/ui.jqgrid.css">
<script src="https://rawgit.com/free-jqgrid/jqGrid/master/js/jquery.jqgrid.src.js"></script>
```
All other language files and plugins are available from CDN too. See [the wiki article](https://github.com/free-jqgrid/jqGrid/wiki/Access-free-jqGrid-from-different-CDNs) for more details about the usage of free jqGrid from CDNs and RawGit.

Remark: the above URLs will be available **after publishing** the release of the version of 4.14.0.

### New main features implemented in the version 4.14.0 compared with 4.13.6:

* New Boolean property `createColumnIndex: true` in `colModel` or `generateValue: true` of `searchoptions` or `editoptions` can be used in combination with `stype: "select"` or `edittype: "select"`. The idea of the new feature come from [the old answer](http://stackoverflow.com/a/5329014/315935). jqGrid can "look through" all values in the column and fill the list of unique value, sort the values and to generate the array of the resulting strings (see the new method `getUniqueValueFromColumnIndex`). Additionally, jqGrid can generate `value` property of `searchoptions`/`editoptions`, which can be used by `stype: "select"`. The simplest usage of the new feature consist in adding of `stype: "select", searchoptions: { generateValue: true, noFilterText: "Any" }` properties to any column. The demo https://jsfiddle.net/OlegKi/yvbt6w54/ shows the usage of the new feature. It generates the options of `<select>` dynamically (the column "tax"). Other columns ("name" and "ship_via") uses [jQuery UI Autocomplete](https://jqueryui.com/autocomplete/) and [select2](https://select2.github.io/) with dynamically generated options.
* `getRowData`, `getCell`, `getCol` and `getDataFieldOfCell` methods work now with cells/rows, which could be **in editing mode** (inline editing or cell editing). It solves the old problem. I hope that the new changes allow to simplify the usage of jqGrid.
* Add first support of **Bootstrap v4** (tested with 4.0.0-alpha.6). The option `guiStyle: "bootstrap4"` can be used now instead of `guiStyle: "bootstrap"` to use jqGrid with Bootstrap v4. Of cause, one have to replace the CSS of Bootstrap 3 to the CSS of Bootstrap 4.
* The folder `ts` of free jqGrid incudes `free-jqgrid.d.ts` file with **TypeScript type declaration** of jqGrid methods, optons and events. The file is created manually. The information could contain some typing errors. Nevertheless. it provides many information, which could be helpful. Some text editors, like free [Visual Studio Code](https://code.visualstudio.com/), available for Widows, Linux and macOS, can use the type information for [IntelliSense](https://code.visualstudio.com/docs/editor/intellisense). IntelliSense can essental speep up writing of the code and it can be used as context sesitive documentation of free jqGrid options, methods and events.
* Free jqGrid supports now **editing of rowids in inline editing mode**. If one have, for exmple, the column `id` (or with the name, which corresponds tha value of `jsonReader.id`) or some other column, which has `key: true` property, and the column is editable, then the value of rowid should be the same as the value from the cells of the column. Free jqGrid detect now the changes in the column in inline editing mode and changes the rowid after saving the modifications. The new method `changeRowid` can be used to apply the chanhes of rowid manually. Additionally, jqGrid sends in the case of changing of rowid the value of rowid before the modification as `"idOld"` property. The name of the property can be changed using `idold` property of `prmNames`. For example, `prmNames: { idold: "orgId"}` options renames `"idOld"` property to `"orgId"`.
* New `saveRowValidation` callback is added to inline editing for the final validation of *all* decoded data. The problem is that the classic validation via `editrules` allows to validate a value in the cell, but it dosen't allow to validate **relation between the columns**. The new `saveRowValidation` callback will be called *after all individual fields are processed*. The `options` parameter of the callback contains `savedRow`, `newData` and some other properties, which can be helpful to make the final validation of the changes. See [the answer](http://stackoverflow.com/a/41655786/315935) and the comment to [the commit](https://github.com/free-jqgrid/jqGrid/commit/94b6218f451d62bb3fb1dc5c7b11383c906672ea) for more details.
* New `sortIconName` callback as the property in `colModel` or as the option of jqGrid simplifies building of custom sorting icons. The demo https://jsfiddle.net/OlegKi/ffgg9wdu/ provides an example of the the usage of the `sortIconName` callback.

### Possible small compatibility issues

* Move `*.css` and `*.min.js` files of plugins in subfolders `css` and `min`. The changes simplifie the usage of jqGrid with SystemJS. One could need to adjust the paths in existing projects.
* The module names used in free jqGrid are now the following: "free-jqgrid", "free-jqgrid-plugins", "jquery", "jquery-ui". One should uses paths mapping to map the module identifier to the real path. [The demo](http://www.ok-soft-gmbh.com/jqGrid/OK/SystemJs3_4.14.0-jquery-ui1.11.4.htm) is an example of the usage SystemJS for loading free jqGrid 4.14.0 modules together with jQuery UI 1.11.4 modules. [Another demo](http://www.ok-soft-gmbh.com/jqGrid/OK/SystemJs3_4.14.0-jquery-ui1.12.1.htm) uses jQuery UI 1.12.1 modules instead. Probably more typical is loading the whole jQuery UI as one file from CDN like in [the next demo](http://www.ok-soft-gmbh.com/jqGrid/OK/SystemJs3_4.14.0-jquery-ui1.12.1-full.htm). The same works of cause with RequireJS. See [the corresponding demo](http://www.ok-soft-gmbh.com/jqGrid/OK/requireJsInline3_4.14.0.htm).

### Below one can see the full list of changes in the version 4.14.0 compared with 4.13.6:

* Add support of `customUnaryOperations` option to specify the names of `customUnaryOperations` operation which required no data (like `"nu"` and `"nn"`). See comment to [the commit](https://github.com/free-jqgrid/jqGrid/commit/265935c7e726b2cc571b0b33e65f0575fb9f02c1) and [the answer](http://stackoverflow.com/a/41445578/315935) for more details.
* Small Bug fixes in `jqPivot` to allow non-string values be used in aggregators
* New `sortIconName` property of colModel or as grid option to simplify building of custom sorting icons
* Bug fix the problem with setting attributes on `<select>`, which be built via `dataUrl`
* Add `saveRowValidation` callback to inline editing to final validation of all decoded data. The usage of `saveRowValidation` can be changed before publishing of new version. The later changes will allow to return error message, which jqGrid will display to the user.
* Add first support of Bootstrap v4. The option `guiStyle: "bootstrap4"` can be used now instead of `guiStyle: "bootstrap"` to use jqGrid with Bootstrap v4 (tested with 4.0.0-alpha.6) instead of Bootstrap 3.x.
* Allow to use callback function as the value of the property `label` of the option `yDimension` of the method `jqPivot`
* Fixing in cell editing: the `name` propertyof the `editable` callback is changed to `cmName` to have the same names in all editing modes
* DefinitelyTyped file `free-jqgrid.d.ts` with the type definitions for TypeScript
* Bug fixes in the form Delete: remove unneeded `style='white-space:pre;'` inline style, make `reloadAfterSubmit: true` working with local grid. The fix is required in `loadonce: true` scenario if one uses `formDeleting: { reloadGridOptions: { fromServer: true } }`
* Bug fix in processing custom buttons in `info_dialog`
* Bug fixes of CSS for `nav-button` with the text
* Use CSS classes `ui-jqgrid-pg-left`, `ui-jqgrid-pg-center`, `ui-jqgrid-pg-right` to style the pager parts
* Bug fix in testing for empty `ExpandColumn` option
* Add parameters to `addfunc`, `editfunc`, `viewfunc`, `delfunc` like it exist already for `searchfunc`
* Bug fix of `footerData` metod in case of usage with `"get"` parameter
* Extend the option of `onShowHideCol` with the options of `showHideCol` method
* Small changes in `saveRow` and `editRow`: `rowid` and `options` parameters are added to `successfunc` like is was already before for the event `jqGridInlineSuccessSaveRow`.
* Move some part of subgrid initializing from the base module into the subgrid module
* Add new method `changeRowid`, which simplifys changing of rowid in the grid
* Add `afterChangeRowid` callback and `jqGridAfterChangeRowid` event
* Modify `saveRow` to use new `changeRowid` method
* Add `defaultValue: false` to default checkbox `formatoptions`
* Add new `useDefaultValuesOnGrouping: true` option of `groupingView`
* Use `formatoptions.defaultValue` during grouping if formatter is specified. One can change the behavior to old behavior by usaging `useDefaultValuesOnGrouping: false` in `groupingView` option.
* Move testing for the existence of `$.fn.sortable` from base module into `sortableColumns` method of `grid.jqueryui.js` to better separate modules
* Remove some unused code from `$.jgrid.from`
* Improvements in the old code of `addChildNode`
* Bug fix of the options of afterChange callback of Searching Dialog, removing some unused parameters and some other minor fixes
* Add new `idold: "idOld"` property in `prmNames`, which will be used in inline editing on id changing and remote `editurl`
* Send additional parameter `idOld` to the server in case of id changes
* Set `this` in the `afterClear` callback
* Bug fix in usage of `skipSortByX` option of the method jqPivot
* Add initial support of boolean `searchoptions.generateValue` property of `stype: "select"`
* Add new `inFilterSeparator` parameter, which will be used in multiple select and in "in" operation
* Filling of `indexByColumnData` parameter after column templates are expanded
* Add new `resetWidthOrg` property of `autoResizing` property of `colModel`
* Filling of `indexByColumnData` parameter after column templates are expanded
* Add id and item properties in the editable callback
* Some changes in at the begining of the files: AMD/Node/CommonJS module loading
* Small fix: use empty object (`{}`) as `Event` in case if `setSelection` was called with `undefined` `Event`. See [the commit](https://github.com/free-jqgrid/jqGrid/commit/4e1a5e066a59b544f3bc8ac41f3c593fe0e5bebb) for more details.
* Fix the visibility in View/Edit forms if formoptions with rowpos,colpos used and some columns are hidden
* Move css and min.js files of plugins in subfolders css and min. The changes simplifie the usage of jqGrid in SystemJS
* Remove some old unused properties of `groupingView`
* Add new `isCellEditing` method and change `getRowData`, `getCell`, `getCol` and `getDataFieldOfCell` to work with editable cells/rows
* Amall bug fix: remove the second (duplicate) triggering of `jqGridAfterEditCell` event
* Initialize `lastSelectedData` array as copy of data if `loadonce: true` be used without `forceClientSorting: true`
* Remove the second (duplicate) triggering of `jqGridAfterEditCell` event
* Small fix in processing of options of the old `excelExport` method.
* Apply `autowidth:true` **after** call of `autoResizeAllColumns` if `autoresizeOnLoad:true` option is used. The changes work espesially good with new `resetWidthOrg: true` property of `autoResizing` option. See [the issue](https://github.com/free-jqgrid/jqGrid/issues/289) for more details.
* Migrate from google-closure-compiler 20170124 to uglify 2.1.0 because or bugs in minification of module header by closure compiler. See [the commit](https://github.com/free-jqgrid/jqGrid/commit/a385f56e7597c1a8caefd452598070d77012b943) for more detailes.
* Add new method `getUniqueValueFromColumnIndex` to simplify usage of `createColumnIndex:true` with jQuery UI Autocomplete
* Bug fix in `addRowData` in case of usage `idPrefix` with local data
* Bug fix processing of `stype:"custom"` in searching dialog and the filter toolbar
* Add `sorttype:"boolean"` as the workaround of problems with filtering by Boolean `false` value
* Add `"Y"` and `"N"` to possible default values of `formatter:"checkbox"`

Other old readmes contain the list of the features and bug fixed implemented in previous versions of free jqGrid:

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
