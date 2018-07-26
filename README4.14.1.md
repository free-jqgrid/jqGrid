# free fork of jqGrid
[![npm version](https://img.shields.io/npm/v/free-jqgrid.svg?style=flat)](https://www.npmjs.com/package/free-jqgrid)![downloadstotal](https://img.shields.io/npm/dt/free-jqgrid.svg?style=flat-square)&nbsp;[![CDNJS](https://img.shields.io/cdnjs/v/free-jqgrid.svg)](https://cdnjs.com/libraries/free-jqgrid/)&nbsp;[![jsDelivr CDN](https://img.shields.io/badge/jsDelivr%20CDN-v4.14.1-blue.svg)](https://www.jsdelivr.com/projects/free-jqgrid)&nbsp;[![Bower](https://img.shields.io/bower/v/free-jqgrid.svg?style=flat-square)](http://bower.io/search/?q=free-jqgrid)&nbsp;[![NuGet](https://img.shields.io/nuget/v/free-jqgrid.svg?style=flat-square)](https://www.nuget.org/packages/free-jqGrid/)&nbsp;[![Maven Central](https://img.shields.io/maven-central/v/org.webjars.npm/free-jqgrid.svg?style=flat-square)](http://search.maven.org/#search%7Cga%7C1%7Cfree-jqgrid)<br>[![GitHub commits](https://img.shields.io/github/commits-since/free-jqgrid/jqgrid/v4.7.0.svg)](https://github.com/free-jqgrid/jqGrid/compare/v4.7.0...master)&nbsp;[![GitHub watchers](https://img.shields.io/github/watchers/free-jqgrid/jqGrid.svg)](https://github.com/free-jqgrid/jqGrid/watchers)[![GitHub forks](https://img.shields.io/github/forks/free-jqgrid/jqGrid.svg)](https://github.com/free-jqgrid/jqGrid/network)[![GitHub stars](https://img.shields.io/github/stars/free-jqgrid/jqGrid.svg)](https://github.com/free-jqgrid/jqGrid/stargazers)&nbsp;![devDependency status](https://david-dm.org/free-jqgrid/jqgrid/dev-status.svg)&nbsp;[![GitHub license](https://img.shields.io/badge/license-MIT%20or%20GNU%20GPLv2-blue.svg)](https://github.com/free-jqgrid/jqGrid/blob/master/LICENSE.md)
---
jqGrid is a popular jQuery Plugin for displaying and editing data in tabular form. It has some other more sophisticated features, like subgrids, TreeGrids, grouping and so on.

jqGrid was developed originally by [Tony Tomov](https://github.com/tonytomov) and it was available under MIT/GPL-licenses till the version 4.7.0 published Dec 8, 2014 (see [here](https://github.com/tonytomov/jqGrid/tree/v4.7.0)). Short time after that the license agreement was changed (see <a href="https://github.com/tonytomov/jqGrid/commit/1b2cb55c93ee8b279f15a3faf5a2f82a98da3b4c">here</a>) and new 4.7.1 version was <a href="https://github.com/tonytomov/jqGrid/tree/v4.7.1">published</a>.

The code from the GitHib repository is the fork of jqGrid 4.7.0 - the latest version available under MIT/GPL-licenses. It will be provided under MIT/GPL-licenses.

Below you can find short description of new features and the bug fixes implemented in free jqGrid 4.14.1 (compared with version 4.14.0). The version is developed by [Oleg Kiriljuk](https://github.com/OlegKi), alias [Oleg](https://stackoverflow.com/users/315935/oleg) on the stackoverflow and [OlegK](http://www.trirand.com/blog/?page_id=393) on trirand forum.

Read [Wiki](https://github.com/free-jqgrid/jqGrid/wiki) for more detailed information about the features of free-jqGrid. The preliminary version of the documentation can be found [here](https://free-jqgrid.github.io/).

Free jqGrid can be used *for free*. We still ask to contribute the development by donating via PayPal, if one have the possibility for it. One can donate by clicking on the following button [![PayPayl donate button](https://www.paypalobjects.com/webstatic/en_US/btn/btn_donate_pp_142x27.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=JGTCBLQM2BYHG "Donate once-off to free jqGrid project using PayPal") or by sending money via PayPal to oleg.kiriljuk@ok-soft-gmbh.com with the comment "free jqGrid". Bank transfer based on the invoice from OK soft GmbH is another option of donating. Just send the email with the information about the amount of donation and you will get the corresponding invoice with the full information about our bank account and our VAT number.

One can install the package with respect of [npm](https://www.npmjs.com/package/free-jqgrid) by using "npm install free-jqgrid", with respect of [bower](https://bower.io/search/?q=free-jqgrid) by using "bower install free-jqgrid" or from [NuGet](https://www.nuget.org/packages/free-jqGrid) by using "Install-Package free-jqGrid".

The package is published on [WebJars](http://www.webjars.org/) too and it's deployed to [Maven Central](https://search.maven.org/#search%7Cga%7C1%7Cfree-jqgrid).

Free jqGrid is is available from [jsDelivr CDN](https://www.jsdelivr.com/projects/free-jqgrid) and [cdnjs](https://cdnjs.com/libraries/free-jqgrid). Thus one can use it directly from Internet by including for example the URLs like
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/free-jqgrid/4.14.1/css/ui.jqgrid.min.css">
<script src="https://cdn.jsdelivr.net/free-jqgrid/4.14.1/js/jquery.jqgrid.min.js"></script>
```
or
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.14.1/css/ui.jqgrid.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.14.1/jquery.jqgrid.min.js"></script>
```
**The locale file is optional**. One can, but one don't need to include `grid.locale-en.min.js`, because the same information is already included in the `jquery.jqgrid.min.js` (or `jquery.jqgrid.src.js`).

If somebody want to test the *latest* version of free jqGrid, one can load it directly from GitHib using [RawGit](https://rawgit.com/) service:
```html
<link rel="stylesheet" href="https://rawgit.com/free-jqgrid/jqGrid/master/css/ui.jqgrid.css">
<script src="https://rawgit.com/free-jqgrid/jqGrid/master/js/jquery.jqgrid.src.js"></script>
```
All other language files and plugins are available from CDN too. See [the wiki article](https://github.com/free-jqgrid/jqGrid/wiki/Access-free-jqGrid-from-different-CDNs) for more details about the usage of free jqGrid from CDNs and RawGit.

Remark: the above URLs will be available **after publishing** the release of the version of 4.14.1.

### New main features implemented in the version 4.14.1 compared with 4.14.0:

* Add support of `generateDatalist:true` in `searchoptions` and new method `generateDatalistFromColumnIndex`. The option `generateDatalist: true` can be added to `searchoptions` of the column, which has `createColumnIndex: true`. It generates `<datalist>` with unique values of the column. As the result, one gets the feature close to Autocomplete using only built-in functionality of HTML5. The demo https://jsfiddle.net/OlegKi/su7ebs65/ shows the usage of the feature. The demo is close to the demo https://jsfiddle.net/OlegKi/yvbt6w54/ from the [README](https://github.com/free-jqgrid/jqGrid/blob/master/README4.14.0.md) to the version 4.14.0, but it uses no jQuery UI Autocomplete.
* Performance improvement in `$.jgrid.isCellClassHidden` method. See [the issue](https://github.com/free-jqgrid/jqGrid/issues/330) for more details.
* Allow to use callback functions as the value of Boolean properties of `editrules`.
* Initialize `this` and add the options for `jsonmap`/`xmlmap` defined as functions. Add second `options` parameter with two properties: `cmName` and `iItem`.
* Add `filters` property of `prmNames` and `searching.sFilter` allows to change the name of postData properties used for filtering.
* Add `Event` parameter to `onSortCol` callback and `jqGridSortCol` event. See [the issue](https://github.com/free-jqgrid/jqGrid/issues/336) for more details.

### Below one can see the full list of changes in the version 4.14.1 compared with 4.14.0:

* Bug fix in `sortData` in case of usage reload parameter set to `true`. The method `sortData` be used for example inside of the method `sortGrid`.
* Allow to use callback functions as the value of Boolean properties of `editrules`.
* Add `Event` parameter to `onSortCol` callback and `jqGridSortCol` event. See [the issue](https://github.com/free-jqgrid/jqGrid/issues/336) for more details.
* Add support of `generateDatalist:true` in `searchoptions` and new method `generateDatalistFromColumnIndex`. The option `generateDatalist: true` can be added to `searchoptions` of the column, which has `createColumnIndex: true`. It generates `<datalist>` with unique values of the column. As the result, one gets the feature close to Autocomplete using only built-in functionality of HTML5.
* Performance improvement in `$.jgrid.isCellClassHidden` method. See [the issue](https://github.com/free-jqgrid/jqGrid/issues/330) for more details.
* Bug fix in the name of the subgrid open icon in jQuery UI `iconSet`. The typing error in the class name is fixed.
* Fill `savedRow` after `beforeEditCell`. See [the issue](https://github.com/free-jqgrid/jqGrid/issues/328) for more details.
* Initialize `data` property of events called by `dataEvents`.
* Small bug fixes in the usage of of `additionalProperties` and `iPropByName`.
* Fix processing of IN operation and multiselect in Searching Dialog. See [the answer](https://stackoverflow.com/a/43681749/315935) for more details.
* Add `filters` property of `prmNames` and `searching.sFilter` allows to change the name of postData properties used for filtering.
* Extension of `filterToolbar`: add `name`, `cm` and `id` properties of `options` parameter of `dataInit`.
* Add `options` as the second parameter of `editoptions.defaultValue` callback function.
* Bug fix: prevent possible recursion in `getCell` and `getRowData` methods if `editable` property is a function, which calls the methods. New `editingInfo` parameter of jqGrid is introduced. The method `$.jgrid.detectRowEditing` is simplified to mostly one line of code, which uses `editingInfo`. See [the issue](https://github.com/free-jqgrid/jqGrid/issues/315) for more details.
* Bug fix in `addRowData` in case of data grouping is enabled. See [the issue](https://github.com/free-jqgrid/jqGrid/issues/319) for more details.
* Bug fix the bug in `parseDate` in processing of negative time offsets relative to UTC (processing the ISO date with `Z` formatter).
* Bug fix of deleting previously created pager (`pager: true`). See [the issue](https://github.com/free-jqgrid/jqGrid/issues/308) for more details.
* Changes in Croatian locale, adding Bosnian Translation. See [the issue](https://github.com/free-jqgrid/jqGrid/issues/306) for more details.
* Bug fix: reset of custom filtering operation after clear (click on `x` button) in the filter toolbar. See [the question](http://stackoverflow.com/q/42908639/315935) for additional information.
* Initialize `this` and add the options for `jsonmap`/`xmlmap` defined as functions. Add second `options` parameter with two properties: `cmName` and `iItem`.
* Bug fix: add support of `u1000` format of date as `newformat` of `parseDate`.
* Bug fix in `editGridRow` (form editing): set focus only on the first focusable element.

Other old readmes contain the list of the features and bug fixed implemented in previous versions of free jqGrid:

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
