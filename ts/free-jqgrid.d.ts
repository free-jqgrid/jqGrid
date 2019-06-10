/**
 * Copyright (c) 2017, Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 */

/// <reference types="jquery" />
/// <reference types="jqueryui" />

declare namespace FreeJqGrid {
	interface HDivWithLoading extends HTMLDivElement {
		loading?: boolean; // the expando property will be set to true only during pending Ajax request to the server
	}
	interface GridInfo {
		bDiv: HTMLDivElement;
		beginReq(this: BodyTable): void;
		cDiv: HTMLDivElement;
		cols: HTMLCollection | HTMLTableDataCellElement[];     // td[]
		curGbox?: JQuery | null;
		dragEnd(this: GridInfo): void;
		dragMove(this: GridInfo, eventObject: JQueryEventObject): void;
		dragStart(this: GridInfo, iCol: number, eventObject: JQueryEventObject, y: number[], $th: JQuery): void;
		eDiv: HTMLDivElement;
		emptyRows(this: BodyTable, scroll?: boolean, clearLocalData?: boolean): void;
		endReq(this: BodyTable): void;
		fbDiv?: JQuery;
		fbRows?: HTMLCollection | HTMLTableRowElement[];       // tr[]
		fhDiv?: JQuery;
		footers?: HTMLCollection | HTMLTableDataCellElement[]; // td[]
		fsDiv?: JQuery;
		hDiv: HDivWithLoading;
		headers: { el: HTMLTableHeaderCellElement; width: number; }[];
		newWidth?: number;
		populate(this: BodyTable, npage?: number): void;
		populateVisible(this: BodyTable): void;
		prevRowHeight?: number;
		resizeColumn(this: GridInfo, iCol: number, skipCallbacks: boolean, skipGridAdjustments): void;
		resizing?: false | { idx: number, startX: number, sOL: number, moved: boolean, delta: number }; 
		scrollGrid(): void;
		sDiv?: HTMLDivElement;
		selectionPreserver(this: BodyTable): boolean;
		timer?: any;
		topDiv?: HTMLDivElement;
		ubDiv?: HTMLDivElement;
		uDiv?: HTMLDivElement;
		width: number;
	}
	interface BodyTable extends HTMLTableElement {
		p: JqGridOptions;
		grid: GridInfo;
		ftoolbar?: boolean;
		nav?: boolean;
		addItemDataToColumnIndex(item: Object, id: string): void;
		addJSONData(data: any[], rcnt?: number, more?: boolean, adjust?: number): void;
		addXmlData(data: any[], rcnt?: number, more?: boolean, adjust?: number): void;
		clearToolbar?(trigger: boolean): void;
		constructTr(id: string, hide: boolean, spaceSeparatedCssClasses: string, rd: any, cur: any, selected: boolean): string;
		fixScrollOffsetAndhBoxPadding(): void;
		formatCol(pos: number, rowInd: number, tv: string, rawObject: any, rowId: string, rdata?: any): string;
		formatter(rowId: string, cellval: any, colpos: number, rwdat: any, act?: "add" | "edit", rdata?: any): string;
		generateValueFromColumnIndex(cmName: string, separator?: string, delimiter?: string);
		modalAlert?(): void;
		rebuildRowIndexes(): void;
		refreshIndex(): void;
		removeItemDataFromColumnIndex(id): void;
		setHeadCheckBox(checked: boolean): void;
		sortData(index: string, idxcol: number, reload: boolean, sor: string, obj: HTMLTableHeaderCellElement, eventObject?: JQueryEventObject): void;
		toogleToolbar?(): void;
		triggerToolbar?(): void;
		updatepager(rn: boolean, dnd: boolean): void;
	}
	interface JQueryJqGrid extends JQuery {
		[index: number]: BodyTable;
	}
	interface QueryObject {
		ignoreCase(): QueryObject;
		useCase(): QueryObject;
		trim(): QueryObject;
		noTrim(): QueryObject;
		execute(): QueryObject;
		data(): QueryObject;
		select(f?: (v: any) => any): QueryObject;
		hasMatch(): QueryObject;
		andNot(f: string, v: any, x: any): QueryObject;
		orNot(f: string, v: any, x: any): QueryObject;
		not(f: string, v: any, x: any): QueryObject;
		and(f: string, v: any, x: any): QueryObject;
		or(f: string, v: any, x: any): QueryObject;
		orBegin(): QueryObject;
		orEnd(): QueryObject;
		isNot(f: string): QueryObject;
		is(f: string): QueryObject;
		equals(f: string, v: any, t: any): QueryObject;
		notEquals(f: string, v: any, t: any): QueryObject;
		isNull(f: string, v: any, t: any): QueryObject;
		greater(f: string, v: any, t: any): QueryObject;
		less(f: string, v: any, t: any): QueryObject;
		greaterOrEquals(f: string, v: any, t: any): QueryObject;
		lessOrEquals(f: string, v: any, t: any): QueryObject;
		startsWith(f: string, v: any): QueryObject;
		endsWith(f: string, v: any): QueryObject;
		contains(f: string, v: any): QueryObject;
		groupBy(by: string, dir: "a" | "asc" | "ascending" | "d" | "desc" | "descending", type: "text" | "int" | "integer" | "float" | "number" | "currency" | "numeric" | "date" | "datetime" | ((value: string) => string), datefmt: string): any[];
		orderBy(by: string, dir: "a" | "asc" | "ascending" | "d" | "desc" | "descending", type: "text" | "int" | "integer" | "float" | "number" | "currency" | "numeric" | "date" | "datetime" | ((value: string) => string), datefmt: string, sfunc?: (a: any, b: any, direction: 1 | -1, aItem: any, bItem: any) => any): any[];
		inSet(f: string, v: any, t: any): QueryObject;
		custom(ruleOp: string, field: string, data: any): QueryObject;
	}
	const enum InputNameType {
		ColName = 0,
		AdditionalProperty = 1,
		RowId = 2
	}
	const enum ComponentName {
		GridBoxDiv = 0,                   // tagName: "div". class: "ui-jqgrid". Id: "gbox_" + gridId
		GridOverlayDiv = 1,               // tagName: "div". class: "jqgrid-overlay". Id: "lui_" + gridId
		LoadingDiv = 2,                   // tagName: "div". class: "loading". Id: "load_" + gridId
		DialogAlertDiv = 3,               // tagName: "div". class: "ui-jqdialog". Id: "alertmod_" + gridId
		DialogSearchDiv = 4,              // tagName: "div". class: "ui-jqdialog". Id: "searchmodfbox_" + gridId
		DialogViewDiv = 5,                // tagName: "div". class: "ui-jqdialog". Id: "viewmod" + gridId
		DialogEditDiv = 6,                // tagName: "div". class: "ui-jqdialog". Id: "editmod" + gridId
		DialogDeleteDiv = 7,              // tagName: "div". class: "ui-jqdialog". Id: "delmod" + gridId
		GridViewDiv = 8,                  // tagName: "div". class: "ui-jqgrid-view". Id: "gview_" + gridId
		TitleBarDiv = 9,                  // tagName: "div". class: "ui-jqgrid-titlebar" and either "ui-jqgrid-caption" or "ui-jqgrid-caption-rtl"
		UpperToolbarDiv = 10,             // tagName: "div". class: "ui-userdata". Id: "tb_" + gridId
		TopPagerDiv = 11,                 // tagName: "div". class: "ui-jqgrid-toppager". Id: gridId + "_toppager"
		HeaderDiv = 12,                   // tagName: "div". class: "ui-jqgrid-hdiv"
		HeaderBoxDiv = 13,                // tagName: "div". class: either "ui-jqgrid-hdiv" or "ui-jqgrid-hbox-rtl"
		HeaderTable = 14,                 // tagName: "table". class: "ui-jqgrid-htable"
		HeaderColsRow = 15,               // tagName: "tr". class: "jqgfirstrow" or the row with column headers
		HeaderCols = 16,                  // tagName: "th". class: either "ui-first-th-rtl" or "ui-first-th-rtl"
		HeaderRows = 47,                  // tagName: "tr". class: "ui-jqgrid-labels"
		HeaderTh = 48,                    // tagName: "th". class: "ui-th-column" and either "ui-th-ltr" or "ui-th-rtl"
		HeaderSortableDiv = 49,           // tagName: "div". class: "ui-jqgrid-labels"
		HeaderResizableSpan = 50,         // tagName: "span". class: "ui-jqgrid-resize" and either "ui-jqgrid-resize-ltr" or "ui-jqgrid-resize-rtl"
		HeaderSelectAllRowsCheckbox = 45, // tagName: "input" (can be changed to "button" in the future). class: "cbox". Id: "cb_" + gridId
		SearchToolbar = 17,               // tagName: "tr". class: "ui-search-toolbar". Its direct children are th having class "ui-th-column" and optionally "ui-th-rtl"
		BodyDiv = 18,                     // tagName: "div". class: "ui-jqgrid-bdiv"
		BodyScrollFullDiv = 19,           // tagName: "div" - It can have height CSS property which simulate the total size of virtual data.
		BodyScrollTopDiv = 20,            // tagName: "div" - It can have height CSS property which simulate virtual data before the current displayed in btable.
		BodyTable = 21,                   // tagName: "table". class: "ui-jqgrid-btable". Id: gridId
		Grid = 21,                        // tagName: "table". class: "ui-jqgrid-btable". Id: gridId
		BodyColsRow = 22,                 // tagName: "tr". class: "jqgfirstrow"
		BodyCols = 23,                    // tagName: "td"
		BodyDataRows = 24,                // tagName: "tr". class: "jqgrow" and optionally "ui-row-rtl"
		FooterDiv = 25,                   // tagName: "div". class: "ui-jqgrid-sdiv"
		FooterBoxDiv = 26,                // tagName: "div". class: either "ui-jqgrid-hdiv" or "ui-jqgrid-hbox-rtl". ??? is it really needed ???
		FooterTable = 27,                 // tagName: "table". class: "ui-jqgrid-ftable"
		FooterRows = 28,                  // tagName: "tr". class: "footrow", optionally additionally "footrow-rtl"
		BottomToolbarDiv = 29,            // tagName: "div". class: "ui-userdata". Id: "tb_" + gridId
		FrozenHeaderDiv = 30,             // tagName: "div". class: "frozen-div" and "ui-jqgrid-hdiv"
		FrozenHeaderTable = 31,           // tagName: "table". class: "ui-jqgrid-htable"
		FrozenHeaderColsRow = 32,         // tagName: "tr". class: "jqgfirstrow"
		FrozenHeaderCols = 33,            // tagName: "th". class: either "ui-first-th-rtl" or "ui-first-th-rtl"
		FrozenSearchToolbar = 34,         // tagName: "tr". class: "ui-search-toolbar". Its direct children are th having class "ui-th-column" and optionally "ui-th-rtl"
		FrozenFooterDiv = 35,             // tagName: "div". class: "frozen-div" and "ui-jqgrid-sdiv"
		FrozenFooterTable = 36,           // tagName: "table". class: "ui-jqgrid-ftable"
		FrozenFooterDataRows = 37,        // tagName: "tr". class: "footrow", optionally additionally "footrow-rtl"
		FrozenBobyDiv = 38,               // tagName: "div". class: "frozen-div" and "ui-jqgrid-bdiv"
		FrozenBobyTable = 39,             // tagName: "table". class: "ui-jqgrid-btable". Id: gridId + "_frozen"
		FrozenBobyColsRow = 40,           // tagName: "tr". class: "jqgfirstrow"
		FrozenBobyCols = 41,              // tagName: "td"
		FrozenBobyDataRows = 42,          // tagName: "tr". class: "jqgrow" and optionally "ui-row-rtl"
		ColumnResizerDiv = 43,            // tagName: "div". class: "ui-jqgrid-resize-mark". Id: "rs_m" + gridId
		BottomPagerDiv = 44,              // tagName: "div". class: "ui-jqgrid-pager"
		SearchOperationMenuUl = 46
	}
	// The ModalHash represent internal structure used by jqModal - Minimalist Modaling with jQuery (see jqmodal.js)
	interface ModalHash {
		w: JQuery;  // The modal element, represent the outer div of the modal dialog
		o: JQuery;  // The overlay element. It will be assigned on the first opening of the modal
		c: JqModalOptions; // The modal's options object. The options used durin creating the modal. One can use global $.jgrid.jqModal or gris specifif p.jqModal to specify defaults of the options.
		t: Element | string | JQuery; // The triggering element
		s: number;  // numeric part of "id" used for modal dialog. The modal dialog have class "jqmID" + s.
		a: boolean; // It's false initially. It will be set to true during opening and will set to false on closing.
	}
	interface JqModalOptions {
		ajax?: string | false; // false
		ajaxText?: string; // ""
		closeClass?: string; // "jqmClose"
		closeoverlay?: boolean; // false
		modal?: boolean; // false
		onHide?: false | ((h: ModalHash) => void);
		onLoad?: false | ((h: ModalHash) => void);
		onShow?: false | ((h: ModalHash) => void);
		overlay?: number; // 50
		overlayClass?: string; // "jqmOverlay"
		target?: string | JQuery | false; // false
		toTop?: boolean; // false
		trigger?: string; // ".jqModal"
	}
	interface CreateModalOptions {
		caption?: string;
		closeOnEscape?: boolean;
		drag?: boolean;
		gbox?: string;
		form?: string;
		jqModal?: boolean;
		height: number | "auto" | "100%" | string;
		left?: number;
		onClose?: (this: BodyTable, selector: string | Element | JQuery) => boolean;
		overlay?: number;
		recreateForm?: boolean;
		removemodal?: boolean;
		resize?: boolean;
		resizingRightBottomIcon: string;
		toTop?: boolean;
		top?: number;
		width: number | "auto" | "100%" | string;
		zIndex?: number;
    }
	interface ViewModalOptions extends JqmOptions {
		overlay?: number; // 30
		modal?: boolean; // false,
		overlayClass?: string; // getGuiStyles.call(this, "overlay"), // "ui-widget-overlay"
		onShow?: (h: ModalHash) => void; // $.jgrid.showModal
		onHide?: (h: ModalHash) => void; // $.jgrid.closeModal
		gbox?: string; // ""
		jqm?: boolean; // true
		jqM?: boolean; // true
	}
	interface JqmOptions {
		hash?: ModalHash[];
		open?: (s: number, trigger: Element | string | JQuery) => boolean | void;
		close?: (s: number, trigger: Element | string | JQuery) => boolean | void;
		params?: JqModalOptions;
	}
	interface DeleteFormLocaleOptions {
		bCancel?: string;
		bSubmit?: string;
		caption?: string;
		msg?: string;
		[propName: string]: any;
	}
	interface EditFormLocaleOptions {
		addCaption?: string;
		bCancel?: string;
		bClose?: string;
		bExit?: string;
		bNo?: string;
		bSubmit?: string;
		bYes?: string;
		editCaption?: string;
		msg: { customarray?: string, customfcheck?: string, date?: string, email?: string, integer?: string, maxValue?: string, minValue?: string, novalue?: string, number?: string, required?: string, url?: string, [propName: string]: any };
		saveData?: string;
		[propName: string]: any;
	}
	interface NavLocaleOptions {
		addtext?: string;
		addtitle?: string;
		alertcap?: string;
		alerttext?: string;
		canceltext?: string;
		canceltitle?: string;
		deltext?: string;
		deltitle?: string;
		edittext?: string;
		edittitle?: string;
		refreshtext?: string;
		refreshtitle?: string;
		savetext?: string;
		savetitle?: string;
		searchtext?: string;
		searchtitle?: string;
		viewtext?: string;
		viewtitle?: string;
		[propName: string]: any;
	}
	interface SearchLocaleOptions {
		addGroupTitle?: string;
		addRuleTitle?: string;
		caption?: string;
		deleteGroupTitle?: string;
		deleteRuleTitle?: string;
		Find?: string;
		groupOps?: { op: string, text: string }[];
		odata?: { oper: string, text: string }[];
		operandTitle?: string;
		Reset?: string;
		resetTitle?: string | ((options: { options: FilterFoolbarOptions, cm: ColumnModel, cmName: string, iCol: number }) => string);
		[propName: string]: any;
	}
	interface ViewLocaleOptions {
		bClose?: string;
		caption?: string;
		[propName: string]: any;
	}
	interface JqGridLocaleOptions {
		emptyrecords?: string;
		loadtext?: string;
		pgfirst?: string;
		pglast?: string;
		pgnext?: string;
		pgprev?: string;
		pgrecs?: string;
		pgtext?: string;
		recordtext?: string;
		savetext?: string;
		showhide?: string;
		[propName: string]: any;
	}
	interface FormatterIntegerLocaleOptions {
		thousandsSeparator?: string;
		defaultValue?: string;
	}
	interface FormatterNumberLocaleOptions extends FormatterIntegerLocaleOptions {
		decimalSeparator?: string;
		decimalPlaces?: number;
	}
	interface FormatterCurrencyLocaleOptions extends FormatterNumberLocaleOptions {
		prefix?: string;
		suffix?: string;
	}
	interface FormatterDateLocaleOptions {
		dayNames?: string[];
		monthNames?: string[];
		AmPm?: string[];
		S?: (j: number) => string;
		srcformat?: string;
		newformat?: string;
		masks?: {
			ShortDate?: string;
			LongDate?: string;
			FullDateTime?: string;
			MonthDay?: string;
			ShortTime?: string;
			LongTime?: string;
			YearMonth?: string;
		};
	}
	interface FormattersLocaleOptions {
		integer?: FormatterIntegerLocaleOptions;
		number?: FormatterNumberLocaleOptions;
		currency?: FormatterCurrencyLocaleOptions;
		date?: FormatterDateLocaleOptions;
		[propName: string]: any;
	}
	interface JqGridStaticLocaleOptions {
		col?: {
			bCancel?: string;
			bSubmit?: string;
			caption?: string;
			[propName: string]: any;
		};
		defaults?: JqGridLocaleOptions;
		del?: DeleteFormLocaleOptions;
		edit?: EditFormLocaleOptions;
		errors?: {
			errcap?: string;
			model?: string;
			norecords?: string;
			nourl?: string;
			[propName: string]: any;
		};
		formatter?: FormattersLocaleOptions;
		isRTL?: boolean;
		nav?: NavLocaleOptions;
		search?: SearchLocaleOptions;
		view?: ViewLocaleOptions;
		[propName: string]: any;
	}
	interface EditableCellInfo {
		rowid: string;
		iCol: number;
		iRow: number;
		cmName: string;
		cm: ColumnModel;
		mode: "add" | "edit";
		td: HTMLTableDataCellElement;
		tr: HTMLTableRowElement;
		trFrozen: HTMLTableRowElement;
		dataElement: Element;
		dataWidth: number;
	}
	interface IconsInfo {
		baseIconSet?: string;
		common?: string; // "ui-icon",
		pager?: {
			common?: string;
			ignoreParents?: boolean;
			first?: string; // "ui-icon-seek-first",
			prev?: string; // "ui-icon-seek-prev",
			next?: string; // "ui-icon-seek-next",
			last?: string; // "ui-icon-seek-end"
		};
		sort?: {
			common?: string;
			ignoreParents?: boolean;
			asc?: string; // "ui-icon-triangle-1-n",
			desc?: string; // "ui-icon-triangle-1-s"
		};
		gridMinimize?: {
			common?: string;
			ignoreParents?: boolean;
			visible?: string; // "ui-icon-circle-triangle-n",
			hidden?: string; // "ui-icon-circle-triangle-s"
		};
		nav?: {
			common?: string;
			ignoreParents?: boolean;
			edit?: string; // "ui-icon-pencil",
			add?: string; // "ui-icon-plus",
			del?: string; // "ui-icon-trash",
			search?: string; // "ui-icon-search",
			refresh?: string; // "ui-icon-refresh",
			view?: string; // "ui-icon-document",
			save?: string; // "ui-icon-disk",
			cancel?: string; // "ui-icon-cancel",
			newbutton?: string; // "ui-icon-newwin"
		};
		actions?: {
			common?: string; // string;
			ignoreParents?: boolean;
			edit?: string; // "ui-icon-pencil",
			del?: string; // "ui-icon-trash",
			save?: string; // "ui-icon-disk",
			cancel?: string; // "ui-icon-cancel"
		};
		form?: {
			common?: string;
			ignoreParents?: boolean;
			close?: string; // "ui-icon-closethick",
			prev?: string; // "ui-icon-triangle-1-w",
			next?: string; // "ui-icon-triangle-1-e",
			save?: string; // "ui-icon-disk",
			undo?: string; // "ui-icon-close",
			del?: string; // "ui-icon-scissors",
			cancel?: string; // "ui-icon-cancel",
			resizableLtr?: string; // "ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se"
		};
		search?: {
			common?: string;
			ignoreParents?: boolean;
			search?: string; // "ui-icon-search",
			reset?: string; // "ui-icon-arrowreturnthick-1-w",
			query?: string; // "ui-icon-comment"
		};
		subgrid?: {
			common?: string;
			ignoreParents?: boolean;
			plus?: string; // "ui-icon-plus",
			minus?: string; // "ui-icon-minus",
			openLtr?: string; // "ui-icon-carat-1-sw",
			openRtl?: string; // "ui-icon-carat-1-se"
		};
		grouping?: {
			common?: string; // string;
			ignoreParents?: boolean;
			plus?: string; // "ui-icon-circlesmall-plus",
			minus?: string; // "ui-icon-circlesmall-minus"
		};
		treeGrid?: {
			common?: string;
			ignoreParents?: boolean;
			minus?: string; // "ui-icon-triangle-1-s",
			leaf?: string; // "ui-icon-radio-off",
			plusLtr?: string; // "ui-icon-triangle-1-e",
			plusRtl?: string; // "ui-icon-triangle-1-w"
		};
		checkbox ?: {
			ignoreParents?: boolean;
			checkedClasses?: string; // "fa-check-square-o",
			checked?: string; // "fa-check-square-o fa-lg",
			unchecked?: string; // "fa-square-o fa-lg"
		};
	}
	interface GuiStyleInfo {
		baseGuiStyle?: string;
		gBox?: string; // "ui-jqgrid-jquery-ui ui-widget ui-widget-content ui-corner-all",  // ui-widget-content??? for the children of gbox
		gView?: string; // "",
		overlay?: string; // "ui-widget-overlay",
		loading?: string; // "ui-state-default ui-state-active",
		hDiv?: string; // "ui-state-default ui-corner-top",
		hTable?: string; // "",
		colHeaders?: string; // "ui-state-default",
		states?: {
			select?: string; // "ui-state-highlight",
			disabled?: string; // "ui-state-disabled ui-jqgrid-disablePointerEvents",
			hover?: string; // "ui-state-hover",    // can be table-hover on <table> only and style like .table-hover tbody tr:hover td
			error?: string; // "ui-state-error",
			active?: string; // "ui-state-active",
			textOfClickable?: string; // "ui-state-default"
		};
		dialog?: {
			header?: string; // "ui-widget-header ui-dialog-titlebar ui-corner-all ui-helper-clearfix",
			window?: string; // "ui-jqgrid-jquery-ui ui-widget ui-widget-content ui-corner-all ui-front",
			document?: string; // "",
			subdocument?: string; // "",
			body?: string; // "",
			footer?: string; // "",
			content?: string; // "ui-widget-content",
			hr?: string; // "ui-widget-content",
			closeButton?: string; // "ui-corner-all",
			fmButton?: string; // "ui-state-default",
			dataField?: string; // "ui-widget-content ui-corner-all",
			viewCellLabel?: string; // "ui-widget-content",
			viewLabel?: string; // "",
			viewCellData?: string; // "ui-widget-content",
			viewData?: string; // "",
			leftCorner?: string; // "ui-corner-left",
			rightCorner?: string; // "ui-corner-right",
			defaultCorner?: string; // "ui-corner-all"
		};
		filterToolbar?: {
			dataField?: string; // "ui-widget-content"
		};
		subgrid?: {
			thSubgrid?: string; // "ui-state-default", // used only with subGridModel
			rowSubTable?: string; // "ui-widget-content", // used only with subGridModel additionally to ui-subtblcell
			row?: string; // "ui-widget-content", // class of the subgrid row, additional to ui-subgrid
			tdStart?: string; // "", // it can be with span over rownumber and multiselect columns
			tdWithIcon?: string; // "ui-widget-content", // class of cell with +- icon, additional to subgrid-cell
			buttonDiv?: string; // "",
			button?: string; // "",
			tdData?: string; // "ui-widget-content", // class of main td with span over the grid, additional subgrid-data
			legacyTable?: string; // ""
		};
		grid?: string; // "",
		gridRow?: string; // "ui-widget-content",
		rowNum?: string; // "ui-state-default",
		gridFooter?: string; // "",
		rowFooter?: string; // "ui-widget-content",
		gridTitle?: string; // "ui-widget-header ui-corner-top",
		gridError?: string; // "ui-state-error",
		gridErrorText?: string; // "",
		titleButton?: string; // "ui-corner-all",
		toolbarUpper?: string; // "ui-state-default",
		toolbarBottom?: string; // "ui-state-default",
		actionsDiv?: string; // "ui-widget-content",
		actionsButton?: string; // "ui-corner-all",
		pager?: {
			pager?: string; // "ui-state-default",
			pagerButton?: string; // "ui-corner-all",
			pagerInput?: string; // "ui-widget-content",
			pagerSelect?: string; // "ui-widget-content"
		};
		navButton?: string; // "ui-corner-all",
		searchDialog?: {
			operator?: string; // "ui-corner-all",
			label?: string; // "ui-corner-all",
			elem?: string; // "ui-corner-all",
			operationGroup?: string; // "",
			addRuleButton?: string; // "ui-corner-all",
			deleteRuleButton?: string; // "ui-corner-all",
			operationSelect?: string; // "ui-corner-all",
			addGroupButton?: string; // "ui-corner-all",
			deleteGroupButton?: string; // "ui-corner-all"
		};
		searchToolbar?: {
			menu?: string; // "ui-menu-jqueryui",
			operButton?: string; // "ui-corner-all",
			clearButton?: string; // "ui-corner-all"
		};
		top?: string; // "ui-corner-top",
		bottom?: string; // "ui-corner-bottom",
		resizer?: string; // "ui-widget-header"
	}
	interface JqGridStaticOptions extends JqGridOptions {
		fatalError?: (errorText: string) => void; // default is alert function
	}
	type BooleanFeedbackValues = false | "stop" | void;
	interface JqGridStatic extends JqGridStaticLocaleOptions {
		_multiselect?: boolean;
		actionsNav?: FormatterActionsOptions;
		ajaxOptions?: JQueryAjaxSettings;
		cell_width: boolean;
		cellattr?: { [key: string]: (this: BodyTable, rowId: string, cellValue: any, rowObject: any, cm: ColumnModel, rdata: any, formattedCellValue: string) => string; };
		cmTemplate?: { [key: string]: ColumnModel; };
		defaults: JqGridStaticOptions;
		del?: FormDeletingOptions;
		edit?: FormEditingOptions;
		filter?: JqFilterOptions;
		getXmlData(this: BodyTable, obj: any, dotSeparatedNamesOrFunc: string | ((obj: any) => any), returnObj?: boolean): string | undefined | JQuery; // JQuery returns only if returnObj is true
		guid: number;
		guiStyles: {
			jQueryUI: GuiStyleInfo;
			bootstrap: GuiStyleInfo;
			bootstrapPrimary: GuiStyleInfo;
			bootstrap4: GuiStyleInfo;
			[propName: string]: GuiStyleInfo;
		};
		icons: {
			jQueryUI: IconsInfo;
			fontAwesome: IconsInfo;
			glyph: IconsInfo;
			[propName: string]: IconsInfo;
		};
		inlineEdit?: InlineEditingOptions;
		inlineNavOptions?: InlineNavOptions;
		jqModal?: JqModalOptions; // { toTop: true }
		locales: { [key: string]: JqGridStaticLocaleOptions; };
		msie: boolean;
		nav?: NavOptions;
		no_legacy_api?: boolean;
		productName: "free jqGrid";
		rowattr?: ( (this: BodyTable, item: any, rowObject: any, rowid: string) => { [attributeName: string]: string } | null | undefined );
		search?: SearchLocaleOptions;
		uidPref: string;
		version: string; // like "4.13.7" for example
		view?: FormViewingOptions;
		bindEv(element: Element | JQuery, options: EditOptions | SearchOptions): any;
		builderFmButon(this: BodyTable, id: string, text?: string, icon?: string, iconOnLeftOrRight?: "right" | "left" | undefined, conner?: "right" | "left" | undefined): any;
		builderSortIcons(this: BodyTable, iCol: number): string;
		cellWidth(): boolean;
		checkDate(format: string, date: string): boolean;
		checkTime(time: string): boolean;
		checkValues(this: BodyTable, value: any, iCol: number | string, customobject?: any, name?: string, options?: any): boolean;
		clearArray(array: any[]): void;
		closeModal(h: ModalHash): void;
		convertOnSaveLocally(this: BodyTable, nData: any, cm: any, oData: any, id: string, item: any, iCol: number): any;
		createEl(this: BodyTable, elementType: string, options: any, value: string, autoWidth?: boolean, ajaxso?: any): Element;
		createModal(this: BodyTable, aIDs: any, content: Element | JQuery, o: CreateModalOptions, insertSelector: string | Element | JQuery, posSelector: string | Element | JQuery, appendsel?: boolean | string | Element | JQuery, css?: any): void;
		//detectRowEditing(rowid: string): RowEditingInfo;
		detectRowEditing(this: BodyTable, rowid: string): { mode: "inlineEditing" | "cellEditing"; savedRow: any[]; editable: { [cmName: string]: boolean | "hidden" | "disabled" | "readonly" } };
		enumEditableCells(this: BodyTable, tr: HTMLTableRowElement, mode: "add" | "edit", callback: (options: EditableCellInfo) => boolean): void;
		extend(this: JqGridStatic, methods: any): void;
		feedback(this: BodyTable | JQuery, p: any, eventPrefix: string, callbackSuffix: string, callbackName: string): boolean;
		fillSelectOptions(element, value: any, separator: string, delimiter: string, isMultiple: boolean, valuesToSelect?: string): boolean;
		fixMaxHeightOfDiv(height: number): number;
		fixScrollOffsetAndhBoxPadding(this: BodyTable): void;
		format(format: string, ...rest: any[]): string;
		from(source: any): QueryObject;
		fullBoolFeedback(this: BodyTable, callback: (...rest: any[]) => BooleanFeedbackValues, eventName: string, ...rest: any[]): boolean;
		getAccessor(obj: any, dotSeparatedNamesOrFunc: string | ((obj: any) => any)): any;
		getCell(this: BodyTable, tr: HTMLTableRowElement | JQuery, iCol: number): JQuery;
		getCellIndex(cell: Element | JQuery): number;
		getDataFieldOfCell(this: BodyTable, tr: HTMLTableRowElement | JQuery, iCol: number): JQuery;
		getEditedValue(this: BodyTable, $dataFiled: JQuery, cm: any, valueText: Object, editable: boolean | "hidden" | "readonly"): string;
		getGridComponent(componentName: ComponentName, $p: HTMLElement | JQuery): JQuery;
		getGridComponentId(this: BodyTable, componentName: ComponentName): string;
		getGridComponentIdSelector(this: BodyTable, componentName: ComponentName): string;
		getIcon(iconSetStr: string, path: string): string;
		getMethod(this: JqGridStatic, methodName: string): Function;
		getRelativeRect(this: BodyTable, element: Element | JQuery): JQueryCoordinates;
		getRes(basePath: Object, path: string): any;
		getXmlData(obj: Node, dotSeparatedNamesOrFunc: string | ((obj: any) => any), returnObj?: boolean): string;
		hasAllClasses(element: Element | JQuery, spaceSeparatedCssClasses: string): boolean;
		hasOneFromClasses(element: Element | JQuery, spaceSeparatedCssClasses: string): boolean;
		hideModal(selector: string | Element | JQuery, options: {jqm?: boolean, gb?: string, removemodal?: boolean}): void;
		htmlDecode(value: string): string;
		htmlEncode(value: string): string;
		info_dialog(this: BodyTable, caption: string, content: string, closeButtonText: string, modalOptions: any): void;
		isCellClassHidden(spaceSeparatedCssClasses: string): boolean;
		isEmpty(testString: string): boolean;
		isHTMLElement(element: Element): boolean;
		jqID(idName: string): string;
		mergeCssClasses(...spaceSeparatedCssClasses: string[]): boolean;
		msiever(): number;
		oldDecodePostedData(value: string): string;
		oldEncodePostedData(value: string): string;
		parseDataToHtml(this: BodyTable, len: number, ids: string[], items: any[], cellsToDisplay: any[], rcnt?: number, adjust?: number, readAllInputData?: boolean): string[];
		parseDate(this: BodyTable, format: string, date: string | number | Date, newformat?: string, options?: any): string | Date;
		parseDateToNumber(this: BodyTable, format: string, date: string | number | Date): number;
		randId(prefix?: string): string;
		serializeFeedback(this: BodyTable | JQuery, callback: ((this: BodyTable | JQuery, postData: any) => any), eventName: string, postData: Object | string): any;
		showModal(h: ModalHash): void;
		stripHtml(htmlString: string): string;
		stripPref(prefix: string, id: string): string;
		template(format: string): string;
		viewModal(this: BodyTable, selector: string | Element | JQuery, options?: ViewModalOptions): void;
		[propName: string]: any;
	}
	interface JqGridFmatter {
		isEmpty: (o: any) => boolean;
		isNumber: (o: any) => boolean;
		isObject: (o: any) => boolean;
		isValue: (o: any) => boolean;
		NumberFormat: (nData: number, opts: { decimalSeparator: string, decimalPlaces: number, thousandsSeparator: string }) => string;
	}
	interface FormatterOptions {
		rowId: string;
		colModel: ColumnModel;
		gid: string;
		pos: number;
		rowData: any;
	}
	interface FormatterActionsCustomButton {
		action: string;
		position?: "first" | "last";
		onClick: (options: {rowid: string, event: JQueryEventObject, action: string, options: FormatterActionsCustomButton }) => void;
		[propName: string]: any; // attribute for the editable element
	}
	interface FormatterActionButtonMask {
		display?: boolean;    // whether to include the button in the actions div
		hidden?: boolean;     // whether to add style="display:none;" to the button
		noHovering?: boolean; // whether to add/remove hovering classes on mouseover/mouseout events
	}
	interface FormatterActionsOptions {
		editbutton?: boolean;
		delbutton?: boolean;
		editformbutton?: boolean;
		commonIconClass?: string; // "ui-icon",
		editicon?: string; // "ui-icon-pencil",
		delicon?: string; // "ui-icon-trash",
		saveicon?: string; // "ui-icon-disk",
		cancelicon?: string; // "ui-icon-cancel",
		savetitle?: string; // edit.bSubmit || "",
		canceltitle?: string; // edit.bCancel || ""
		isDisplayButtons?: (this: BodyTable, options: FormatterOptions, rwd, act) => { [propName: string]: FormatterActionButtonMask };
		custom?: FormatterActionsCustomButton[];
		editOptions?: FormEditingOptions;
		delOptions?: FormDeletingOptions;
		keys?: boolean;
		onEdit?: (this: BodyTable, rowid: string, options: EditRowOptions) => void;
		onSuccess?: (this: BodyTable, jqXhr: JQueryXHR, rowid: string, options: FreeJqGrid.SaveRowOptions) => boolean | [boolean, any];
		url?: string | ((this: BodyTable, rowid: string, editOrAdd: "add" | "edit", postData: any, options: SaveRowOptions) => string);
		extraparam?: Object;
		afterSave?: (this: BodyTable, rowid: string, jqXhr: JQueryXHR, postData: any, options: SaveRowOptions) => void;
		onError?: (this: BodyTable, rowid: string, jqXhr: JQueryXHR, textStatus: string, errorThrown: string) => void;
		afterRestore?: (this: BodyTable, rowid: string) => void;
		restoreAfterError?: boolean;
		mtype?: string | ((this: BodyTable, editOrAdd: "add" | "edit", options: SaveRowOptions, rowid: string, postData: any) => string);
		[propName: string]: any; // attribute for the editable element
	}
	interface JqGridFormatters {
		[propName: string]: any;
	}
	interface EditOptions {
		buildSelect?: (this: BodyTable, data: any, jqXhr: JQueryXHR, cm: ColumnModel, iCol: number) => string;
		dataEvents?: { type: string, data?: any, fn: (e) => void }[];
		dataInit?: (this: BodyTable, element: Element, options: EditOptions) => void;
		dataUrl?: string | ((this: BodyTable, rowid: string, value: string, cmName: string, ajaxContext: { elem: Element, options: any, cm: ColumnModel, mode: "cell" | "addForm" | "editForm" | "add" | "edit", rowid: string, iCol: number, ovm: string[] }) => string);
		generateValue?: boolean;
		value?: string | { [propName: string]: string } | (() => string | { [propName: string]: string });
		defaultValue?: string | (() => string) | boolean; // boolean for SearchOptions compatibility
		[propName: string]: any; // attribute for the editable element
	}
	interface SearchOptions extends EditOptions {
		attr?: Object;
		clearSearch?: boolean;
		defaultValue?: boolean;
		generateDatalist?: boolean;
		searchhidden?: boolean;
		sopt?: string[];
		[propName: string]: any;
	}
	interface EditOrSearchRules {
		custom?: boolean | ((this: BodyTable, options: { oldValue: string, newValue: string, oldRowData?: any, rowid: string, iCol: number, iRow: number, mode: "cell" | "addForm" | "editForm" | "add" | "edit", cmName: string, cm: ColumnModel, td?: HTMLTableDataCellElement, tr?: HTMLTableRowElement }) => any[]);
		custom_func?: (this: BodyTable, value: string, name: string, iCol: number) => any[];
		date?: boolean | ((this: BodyTable, options: { oldValue: string, newValue: string, oldRowData?: any, rowid: string, iCol: number, iRow: number, mode: "cell" | "addForm" | "editForm" | "add" | "edit", cmName: string, cm: ColumnModel, td?: HTMLTableDataCellElement, tr?: HTMLTableRowElement }) => boolean);
		edithidden?: boolean;
		email?: boolean | ((this: BodyTable, options: { oldValue: string, newValue: string, oldRowData?: any, rowid: string, iCol: number, iRow: number, mode: "cell" | "addForm" | "editForm" | "add" | "edit", cmName: string, cm: ColumnModel, td?: HTMLTableDataCellElement, tr?: HTMLTableRowElement }) => boolean);
		integer?: boolean | ((this: BodyTable, options: { oldValue: string, newValue: string, oldRowData?: any, rowid: string, iCol: number, iRow: number, mode: "cell" | "addForm" | "editForm" | "add" | "edit", cmName: string, cm: ColumnModel, td?: HTMLTableDataCellElement, tr?: HTMLTableRowElement }) => boolean);
		maxValue?: number;
		minValue?: number;
		number?: boolean | ((this: BodyTable, options: { oldValue: string, newValue: string, oldRowData?: any, rowid: string, iCol: number, iRow: number, mode: "cell" | "addForm" | "editForm" | "add" | "edit", cmName: string, cm: ColumnModel, td?: HTMLTableDataCellElement, tr?: HTMLTableRowElement }) => boolean);
		required?: boolean | ((this: BodyTable, options: { oldValue: string, newValue: string, oldRowData?: any, rowid: string, iCol: number, iRow: number, mode: "cell" | "addForm" | "editForm" | "add" | "edit", cmName: string, cm: ColumnModel, td?: HTMLTableDataCellElement, tr?: HTMLTableRowElement }) => boolean);
		time?: boolean | ((this: BodyTable, options: { oldValue: string, newValue: string, oldRowData?: any, rowid: string, iCol: number, iRow: number, mode: "cell" | "addForm" | "editForm" | "add" | "edit", cmName: string, cm: ColumnModel, td?: HTMLTableDataCellElement, tr?: HTMLTableRowElement }) => boolean);
		url?: boolean | ((this: BodyTable, options: { oldValue: string, newValue: string, oldRowData?: any, rowid: string, iCol: number, iRow: number, mode: "cell" | "addForm" | "editForm" | "add" | "edit", cmName: string, cm: ColumnModel, td?: HTMLTableDataCellElement, tr?: HTMLTableRowElement }) => boolean);
	}
	interface ColumnModelWithoutLabel {
		align?: "left" | "center" | "right";
		autoResizable?: boolean; // default value false
		autoResizing?: { minColWidth?: number, maxColWidth?: number, compact?: boolean };
		cellattr?: "string" | ((this: BodyTable, rowId: string, cellValue: any, rowObject: any, cm: ColumnModel, rdata: any, formattedCellValue: string) => string);
		cellBuilder?: (this: BodyTable, cellValue: any, options: FormatterOptions, rowObject: any, action?: "edit" | "add") => string;
		classes?: string; // spaceSeparatedCssClasses
		convertOnSave?: (this: BodyTable, options: { newValue: any, cm: ColumnModel, oldValue: any, id: string, item: any, iCol: number }) => any;
		createColumnIndex?: boolean;
		datefmt?: string;
		editable?: boolean | "hidden" | "disabled" | "readonly" | ((options: { rowid: string, iCol: number, iRow: number, mode: "cell" | "addForm" | "editForm" | "add" | "edit", cmName: string, cm: ColumnModel, td?: HTMLTableDataCellElement, tr?: HTMLTableRowElement, trFrozen?: HTMLTableRowElement, dataElement?: Element, dataWidth?: number }) => boolean | "hidden" | "disabled" | "readonly"); // default value false
		editoptions?: EditOptions;
		editrules?: EditOrSearchRules;
		edittype?: "text" | "textarea" | "checkbox" | "select" | "password" | "button" | "image" | "file" | "custom";
		firstsortorder?: "asc" | "desc"; // default value "asc"
		fixed?: boolean; // default value false
		formatoptions?: any; // TODO: define formatoptions for different standard formatters
		formatter?: "integer" | "number" | "currency" | "date" | "select" | "actions" | "checkbox" | "checkboxFontAwesome4" | "showlink" | "email" | "link" | string | ((this: BodyTable, cellValue: any, options: FormatterOptions, rowObject: any, action?: "edit" | "add") => string);
		formoptions?: {
			elmprefix?: string;
			elmsuffix?: string;
			label?: string;
			rowabove?: boolean; // false
			rowcontent?: string; // ""
			rowpos?: number;
			colpos?: number;
		};
		frozen?: boolean; // default value false
		jsonmap?: (this: BodyTable, item: any, options: { cmName: string, iItem: number }) => any;
		headerTitle?: string;
		hidden?: boolean; // default value false
		hidedlg?: boolean;
		index?: string;
		key?: boolean;
		labelAlign?: "left" | "center" | "right" | "likeData";
		labelClasses?: string;
		lso?: "asc" | "desc" | "asc-desc" | "desc-asc" | "" | string;
		name: string;
		resizable?: boolean;
		rotated?: boolean;
		saveLocally?: (this: BodyTable, options: { newValue: any, newItem: Object, oldItem: Object, id: string, rowid: string, cm: ColumnModel, cmName: string, iCol: number }) => void;
		search?: boolean;
		searchoptions?: SearchOptions;
		searchrules?: EditOrSearchRules;
		sortable?: boolean;
		sortfunc?: (a: any, b: any, direction: 1 | -1, aItem: any, bItem: any) => any;
		sortIconName?: (this: BodyTable, options: { order: "asc" | "desc", iCol: number, cm: ColumnModel }) => string; // return CSS classes
		sorttype?: "integer" | "int" | "number" | "currency" | "float" | "numeric" | "boolean" | "date" | "datetime" | "text" | string | ((this: BodyTable, value: any, item: any) => any);
		summaryRound?: number; // exponent used in Math.pow during rounding of summary values during data grouping
		summaryRoundType?: "fixed" | "round"; // can be used during calculation of summary values during data grouping
		summaryType?: "sum" | "min" | "max" | "count" | "avg"; // can be used in data grouping
		summaryFormat?: (this: BodyTable, group: GroupInformation, cellData: string, cellValue: any, cm: ColumnModel, summary: GroupSummaryInformation) => string;
		stype?: "select" | "checkbox" | "custom" | "text"; // default value "text"
		template?: "actions" | "integer" | "integerStr" | "number" | "numberStr" | "booleanCheckbox" | "booleanCheckboxFa" | string | ColumnModel;
		title?: boolean;
		unformat?: (this: BodyTable, cellValue: string, options: { rowId: string, colModel: ColumnModel }, dataElement: Element) => string;
		viewable?: boolean; // default value true
		width?: number; // default value 150
		widthOrg?: number; // used internally by jqGrid
		xmlmap?: (this: BodyTable, item: any, options: { cmName: string, iItem: number }) => any;
		[propName: string]: any; // allow to have any number of other properties
	}
	interface ColumnModel extends ColumnModelWithoutLabel {
		label?: string;
	}
	interface ReloadGridOptions {
		current?: boolean;
		fromServer?: boolean;
		page?: number;
	}
	type AddRowDataPosition = "first" | "last" | "before" | "after" | "afterSelected" | "beforeSelected";
	type LoadType = "disable" | "enable" | "block";
	type FormIcon = [boolean, "left"|"right", string];
	type NavKeys = [boolean, number, number]; // [shouldBeUsed, upKeyCode, downKeyCode]: [false,38,40]
	interface FormEditingOptions extends EditFormLocaleOptions {
		_savedData?: { [propName: string]: any };
		addedrow?: AddRowDataPosition;
		afterclickPgButtons?: (this: BodyTable, whichButton: "next" | "prev", $form: JQuery, rowid: string) => void;
		afterComplete?: (this: BodyTable, jqXhr: JQueryXHR, postdata: Object | string, $form: JQuery, editOrAdd: "edit" | "add") => void;
		afterShowForm?: (this: BodyTable, $form: JQuery, editOrAdd: "edit" | "add") => void;
		afterSubmit?: (this: BodyTable, jqXhr: JQueryXHR, postdata: Object | string, editOrAdd: "edit" | "add") => void;
		ajaxEditOptions?: JQueryAjaxSettings;
		beforeCheckValues?: (this: BodyTable, postdata: Object | string, $form: JQuery, editOrAdd: "edit" | "add") => Object | void;
		beforeInitData?: (this: BodyTable, $form: JQuery, editOrAdd: "edit" | "add") => BooleanFeedbackValues;
		beforeShowForm?: (this: BodyTable, $form: JQuery, editOrAdd: "edit" | "add") => void;
		beforeSubmit?: (this: BodyTable, postdata: Object | string, $form: JQuery, editOrAdd: "edit" | "add") => [true] | [true, any] | true | null | undefined | [false, string];
		bottominfo?: string;
		checkOnSubmit?: boolean;
		checkOnUpdate?: boolean;
		clearAfterAdd?: boolean;
		closeAfterEdit?: boolean;
		closeicon?: [boolean, string, string]; // [true,"left","fa fa-undo"]
		closeOnEscape?: boolean;
		commonIconClass?: string; // "fa"
		dataheight?: number | "auto" | "100%" | string; // "auto"
		datawidth?: number | "auto" | "100%" | string; // "auto"
		drag?: boolean;
		editData?: any;
		errorTextFormat?: (this: BodyTable, jqXhr: JQueryXHR, editOrAdd: "edit" | "add") => void;
		jqModal?: boolean;
		height?: number | "auto" | "100%" | string; // "auto"
		left?: number;
		modal?: boolean;
		mtype?: string | ((this: BodyTable, rowid: string, editOrAdd: "edit" | "add", options: FormEditingOptions, postdata: Object | string) => string);
		navkeys?: NavKeys; // [false,38,40]
		nextIcon?: string; // "fa fa-caret-right"
		onclickPgButtons?: (this: BodyTable, whichButton: "next" | "prev", $form: JQuery, rowid: string) => void;
		onclickSubmit?: (this: BodyTable, options: FormEditingOptions, postdata: Object | string, editOrAdd: "edit" | "add") => Object | string;
		onClose?: (this: BodyTable, selector: string | Element | JQuery) => boolean;
		onInitializeForm?: (this: BodyTable, $form: JQuery, editOrAdd: "edit" | "add") => void;
		overlayClass?: string; // "ui-widget-overlay"
		prevIcon?: string; // "fa fa-caret-left"
		processing?: boolean;
		reloadAfterSubmit?: boolean;
		reloadGridOptions?: ReloadGridOptions;
		removemodal?: boolean;
		resize?: boolean;
		saveicon?: FormIcon; // [true,"left","fa fa-floppy-o"]
		savekey?: [boolean, number]; // [false,13]
		savetext?: string; // default from $.jgrid.locales[currentLocale].defaults.savetext or $.jgrid.defaults.savetext
		saveui?: LoadType; // "enable"
		serializeEditData?: (this: BodyTable, postdata: Object) => Object | string;
		skipPostTypes?: string[]; // ["image","file"]
		top?: number;
		topinfo?: string;
		useDataProxy?: boolean;
		url?: string | ((this: BodyTable, rowid: string, editOrAdd: "edit" | "add", postdata: Object | string, options: FormEditingOptions) => string);
		viewPagerButtons?: boolean;
		width?: number | "auto" | "100%" | string; // "auto"
		[propName: string]: any; // allow to have any number of other properties
	}
	interface FormDeletingOptions extends DeleteFormLocaleOptions {
		afterComplete?: (this: BodyTable, jqXhr: JQueryXHR, postdata: Object | string, $form: JQuery, rowids: string[]) => void;
		afterShowForm?: (this: BodyTable, $form: JQuery) => void;
		afterSubmit?: (this: BodyTable, jqXhr: JQueryXHR, postdata: Object | string, rowids: string[]) => void;
		ajaxDelOptions?: JQueryAjaxSettings;
		beforeInitData?: (this: BodyTable, $form: JQuery) => BooleanFeedbackValues;
		beforeShowForm?: (this: BodyTable, $form: JQuery) => void;
		beforeSubmit?: (this: BodyTable, postdata: Object | string, rowids: string[]) => [true] | [true, any] | undefined | [false, string];
		cancelicon?: FormIcon; // [true,"left","fa fa-ban"]
		closeOnEscape?: boolean;
		commonIconClass?: string; // "fa"
		dataheight?: number | "auto" | "100%" | string; // "auto"
		datawidth?: number | "auto" | "100%" | string; // "auto"
		delData?: any;
		delicon?: FormIcon; // [true,"left","fa fa-trash-o"]
		deltext?: string; // default from $.jgrid.locales[currentLocale].defaults.deltext or $.jgrid.defaults.deltext or "Deleting..."
		delui?: LoadType; // "disable" 
		drag?: boolean;
		errorTextFormat?: (this: BodyTable, jqXhr: JQueryXHR) => string;
		height?: number | "auto" | "100%" | string; // "auto"
		jqModal?: boolean;
		idSeparator?: string; // ","
		left?: number;
		modal?: boolean;
		mtype?: string; // "POST"
		onclickSubmit?: (this: BodyTable, options: FormDeletingOptions, postdata: Object | string, rowids: string[]) => Object | string;
		onClose?: (this: BodyTable, selector: string | Element | JQuery) => boolean;
		overlay?: number;
		processing?: boolean; // internal used
		reloadAfterSubmit?: boolean;
		reloadGridOptions?: ReloadGridOptions;
		removemodal?: boolean;
		resize?: boolean;
		serializeDelData?: (this: BodyTable, postdata: Object | string, rowids: string[]) => Object | string;
		top?: number;
		toTop?: boolean;
		url?: string | ((this: BodyTable, rowid: string, postdata: Object | string, options: FormDeletingOptions, rowids: string[]) => string);
		useDataProxy?: boolean;
		width?: number | "auto" | "100%" | string; // "auto"
		[propName: string]: any; // allow to have any number of other properties
	}
	interface FormViewingOptions extends ViewLocaleOptions, CreateModalOptions {
		beforeShowForm?: (this: BodyTable, $form: JQuery) => void;
		beforeInitData?: (this: BodyTable, $form: JQuery) => BooleanFeedbackValues;
		closeicon?: FormIcon; // [true, "left", getIcon("form.cancel")]
		commonIconClass?: string; // getIcon("form.common")
		dataheight?: number | "auto" | "100%" | string; // "auto"
		datawidth?: number | "auto" | "100%" | string; // "auto"
		labelswidth?: number | string; // "", 350, "30%" and so on 
		prevIcon?: string; // getIcon("form.prev")
		nextIcon?: string; // getIcon("form.next")
		navkeys?: NavKeys; // [false, 38, 40]
		modal?: boolean; // false
		viewPagerButtons?: boolean; // true
	}
	interface SearchingDialogOptions extends SearchLocaleOptions, CreateModalOptions {
		afterChange?: (this: BodyTable, $filter: JQuery, options: SearchingDialogOptions, filterOptions: JqFilterOptions, searchFilterDiv: JqFilterDiv) => void;
		afterShowSearch?: (this: BodyTable, $filter: JQuery) => void;
		afterRedraw?: (this: BodyTable, options: JqFilterOptions, searchFilterDiv: JqFilterDiv) => void;
		beforeShowSearch?: (this: BodyTable, $filter: JQuery) => BooleanFeedbackValues;
		closeAfterSearch?: boolean; // default false
		closeAfterReset?: boolean; // default false
		columns?: ColumnModel[];
		commonIconClass?: string;
		dataheight?: number | "auto" | "100%" | string; // "auto"
		errorcheck?: boolean; // default true,
		groupOps?: { op: string, text: string }[];
		layer?: null | string; // can be id. be used in createModal as appendsel
		loadDefaults?: boolean;
		multipleSearch?: boolean; // default false
		multipleGroup?: boolean; // default false
		sField?: string; // default "searchField"
		sValue?: string; // default "searchString"
		sOper?: string; // default "searchOper"
		sFilter?: string; // default "filters"
		searchForAdditionalProperties?: boolean;
		searchOnEnter?: boolean; // default false
		showOnLoad: boolean; // default false
		showQuery?: boolean; // default false,
		sopt?: null; // used only if .searchoptions.sopt is undefined
		stringResult?: boolean;
		onInitializeSearch?: (this: BodyTable, $filter: JQuery) => void;
		onSearch?: (this: BodyTable, filters: Filter) => void;
		onReset?: (this: BodyTable) => BooleanFeedbackValues;
		operands?: {
			eq: string; // default "="
			ne: string; // default "<>"
			lt: string; // default "<"
			le: string; // default "<="
			gt: string; // default ">"
			ge: string; // default ">="
			bw: string; // default "LIKE"
			bn: string; // default "NOT LIKE"
			"in": string; // default "IN"
			ni: string; // default "NOT IN"
			ew: string; // default "LIKE"
			en: string; // default "NOT LIKE"
			cn: string; // default "LIKE"
			nc: string; // default "NOT LIKE"
			nu: string; // default "IS NULL"
			nn: string; // default "IS NOT NULL"
			[searchOperation: string]: string;
		};
		overlay?: number;
		overlayClass?: string;
		tmplNames?: string[];
		tmplFilters?: Filter[] | null;
		tmplLabel?: string; // default " Template: "
		[propName: string]: any; // allow to have any number of other properties
	}
	interface FilterFoolbarOptions extends SearchLocaleOptions {
		afterClear?: (this: BodyTable) => void;
		afterSearch?: (this: BodyTable) => void;
		applyLabelClasses?: boolean; //true
		autosearch?: boolean; //true
		autosearchDelay?: number; // 500
		beforeClear?: (this: BodyTable) => boolean;
		beforeSearch?: (this: BodyTable) => boolean;
		defaultSearch?: string; // "bw"
		groupOp?: string; // "AND"
		idMode?: "new" | "old" | "compatibility"; // "new"
		loadFilterDefaults?: boolean; //true
		operands?: {
			eq: string; // "=="
			ne: string; // "!"
			lt: string; // "<"
			le: string; // "<="
			gt: string; // ">"
			ge: string; // ">="
			bw: string; // "^"
			bn: string; // "!^"
			"in": string; // "="
			ni: string; // "!="
			ew: string; // "|"
			en: string; // "!@"
			cn: string; // "~"
			nc: string; // "!~"
			nu: string; // "#"
			nn: string; // "!#"
			[searchOperation: string]: string;
		};
		reloadGridResetOptions?: ReloadGridOptions;
		reloadGridSearchOptions?: ReloadGridOptions;
		resetTitle?: string | ((options: { options: FilterFoolbarOptions, cm: ColumnModel, cmName: string, iCol: number }) => string);
		searchOnEnter?: boolean; //true
		searchOperators?: boolean; //false
		searchurl?: string; // ""
		sField?: string; // default "searchField"
		sValue?: string; // default "searchString"
		sOper?: string; // default "searchOper"
		sFilter?: string; // default "filters"
		stringResult?: boolean; //false
		resetIcon?: string; // "&times;"
		[propName: string]: any; // allow to have any number of other properties
	}
	interface SearchingOptions extends FilterFoolbarOptions, SearchingDialogOptions {
	}
	interface NavOptions extends NavLocaleOptions {
		add?: boolean;
		addicon?: string; // "fa fa-lg fa-fw fa-plus"
		addfunc?: (this: BodyTable, pAdd: FormEditingOptions) => void;
		afterRefresh?: (this: BodyTable) => void;
		alertheight?: number | "auto" | "100%" | string; // "auto"
		alertleft?: null | number;
		alerttop?: null | number;
		alertwidth?: number; // 200
		alertzIndex?: null | number;
		beforeRefresh?: (this: BodyTable) => void;
		buttonicon?: string; // "fa fa-lg fa-fw fa-external-link"
		cancelicon?: string; // "fa fa-lg fa-fw fa-ban"
		cloneToTop?: boolean;
		closeOnEscape?: boolean;
		commonIconClass?: string; // "fa fa-lg fa-fw"
		del?: boolean;
		delicon?: string; // "fa fa-lg fa-fw fa-trash-o"
		delfunc?: (this: BodyTable, rowid: string | string[], pDel?: FormDeletingOptions) => void;
		edit?: boolean;
		editicon?: string; // "fa fa-lg fa-fw fa-pencil"
		editfunc?: (this: BodyTable, rowid: string, pEdit: FormEditingOptions) => void;
		hideEmptyPagerParts?: boolean;
		iconsOverText?: boolean;
		jqModal?: boolean;
		position?: "left" | "center" | "right";
		refresh?: boolean;
		refreshicon?: string; // "fa fa-lg fa-fw fa-refresh"
		refreshstate?: "firstpage" | "current" | "currentfilter";
		reloadGridOptions?: ReloadGridOptions;
		removemodal?: boolean;
		saveicon?: string; // "fa fa-lg fa-fw fa-floppy-o"
		search?: boolean;
		searchicon?: string; // "fa fa-lg fa-fw fa-search"
		searchfunc?: (this: BodyTable, rowid: string, pSearch?: SearchingDialogOptions) => void;
		view?: boolean;
		viewicon?: string; // "fa fa-lg fa-fw fa-file-o"
		viewfunc?: (this: BodyTable, rowid: string, pView?: FormViewingOptions) => void;
	}
	interface navButtonAddOptions {
		buttonicon?: string;
		caption?: string;
		commonIconClass?: string;
		iconsOverText?: boolean;
		id?: string;
		onClickButton?: (this: BodyTable, options: navButtonAddOptions, eventObject: JQueryEventObject) => void;
		position?: "first" | "last";
		title?: string;
	}
	interface InlineNavOptions {
		edit?: boolean;
		editicon?: string; // "ui-icon-pencil"
		edittitle?: string;
		edittext?: string;
		add?: boolean;
		addicon?: string; // "ui-icon-plus"
		addtext?: string;
		addtitle?: string;
		save?: boolean;
		saveicon?: string; //"ui-icon-disk",
		savetitle?: string;
		savetext?: string;
		cancel?: boolean;
		cancelicon?: string; //"ui-icon-cancel",
		canceltitle?: string;
		canceltext?: string;
		commonIconClass?: string; //"ui-icon",
		iconsOverText?: boolean;
		addParams?: AddRowOptions;
		editParams?: EditRowOptions;
		restoreAfterSelect?: boolean;
	}
	interface JsonOrLocalReader {
		root?: string | ((item: any) => string); // "rows"
		repeatitems?: boolean;
		cell?: string; // "cell"
		page?: string | ((item: any) => number | string); // "page",
		total?: string | ((item: any) => number | string); // "total",
		records?: string | ((item: any) => number | string); // "records",
		id?: string | ((this: BodyTable, item: any) => string); // "id",
		userdata?: string | ((this: BodyTable, item: any) => Object); //"userdata",
		subgrid?: {
			root?: string; // "rows"
			repeatitems?: boolean;
			cell?: string; // "cell"
		};
	}
	interface XmlReader extends JsonOrLocalReader {
		row?: string; // "row",
		subgrid?: {
			root?: string; // "rows"
			repeatitems?: boolean;
			row: string; // "row"
			cell?: string; // "cell"
		};
	}
	interface BaseTreeReader {
		level_field?: string; // "level"
		expanded_field?: string; // "expanded"
		loaded?: string; // "loaded"
		icon_field?: string; // "icon"
	}
	interface NestedTreeReader extends BaseTreeReader {
		left_field?: string; // "lft",
		right_field?: string; // "rgt",
		leaf_field?: string; // "isLeaf"
	}
	interface AdjacencyTreeReader extends BaseTreeReader{
		parent_id_field?: string; // "parent",
		leaf_field?: string; // "isLeaf"
	}
	interface TreeGridReader extends AdjacencyTreeReader, NestedTreeReader {
	}
	interface SubGridOptions {
		commonIconClass?: string; // "fa fa-fw"
		delayOnLoad?: number; // 50
		expandOnLoad?: boolean;
		hasSubgrid?: boolean | ((this: BodyTable, options: { rowid: string, iRow: number, iCol: number, data: Object }) => boolean);
		noEmptySubgridOnError?: boolean;
		minusicon?: string; // "fa fa-fw fa-minus"
		openicon?: string; // "fa fa-fw fa-reply fa-rotate-180"
		plusicon?: string; // "fa fa-fw fa-plus"
		reloadOnExpand?: boolean;
		selectOnCollapse?: boolean;
		selectOnExpand?: boolean;
	}
	interface JqGridSubGridOptions {
		ajaxSubgridOptions?: JQueryAjaxSettings;
		subGridBeforeCollapse?: (this: BodyTable, subgridDivId: string, rowid: string) => void;
		subGridBeforeExpand?: (this: BodyTable, subgridDivId: string, rowid: string) => void;
		loadSubgridError?: (this: BodyTable, jqXhr: JQueryXHR, textStatus: string, errorThrown: string) => void;
		serializeSubGridData?: (this: BodyTable, postData: any) => Object | string;
		subGrid?: boolean;
		subGridModel?: { align?: ("left" | "center" | "right")[], name: string[], mapping?: string[], params?: string[], width: number[] }[];
		subGridOptions?: SubGridOptions;
		subGridRowExpanded?: (this: BodyTable, subgridDivId: string, rowid: string) => void;
		subGridUrl?: string | ((this: BodyTable, postData: Object | string) => string);
		subgridtype?: string | ((this: BodyTable, postData: Object | string) => void);
		subGridWidth?: number; // 16
	}
	interface JqGridSelectionOptions {
		beforeSelectRow?: (this: BodyTable, rowid: string, eventObject: JQueryEventObject) => false | void;
		readonly cb?: string;   // "#cb_list"
		readonly cbId?: string; // "cb_list"
		checkboxHtml?: (this: BodyTable, options: { rowid: string, iRow: number, iCol: number, data: any, checked: boolean }) => string;
		deselectAfterSort?: boolean;
		resetPageAfterSort?: boolean; // true
		hasMultiselectCheckBox?: (this: BodyTable, options: { rowid: string, iRow: number, iCol: number, data: any, checked: boolean }) => string | false | undefined;
		multiboxonly?: boolean;
		multikey?: boolean;
		multiPageSelection?: boolean;
		selectAllMode?: "filtered" | "all"; // "filtered"
		multiselect?: boolean;
		multiselectPosition?: "left" | "right" | "none";
		multiselectWidth?: number; // 16
		onSelectAll?: (this: BodyTable, rowids: string[], toCheck: boolean) => void;
		onSelectRow?: (this: BodyTable, rowid: string, state: boolean, eventObject: JQueryEventObject) => void;
		selrow?: null | string; // null
		selarrrow?: string[]; // []
		selectOnContextMenu?: boolean; // true
		singleSelectClickMode?: "toggle" | "selectonly"; // "toggle"
	}
	interface JqGridSortingOptions {
		builderSortIcons?: (this: BodyTable, iCol: number) => string;
		forceClientSorting?: boolean;
		ignoreCase?: boolean; // true
		formatSortOrder?: (this: BodyTable, options: { cm: ColumnModel, sortIndex: number }) => string;
		readonly lastsort?: number; // 0
		maxSortColumns?: number; // 3
		multiSort?: boolean; // false
		multiSortOrder?: "lastClickedLastSorted" | "lastClickedFirstSorted" | ((this: BodyTable, options: {sortNames: string[], cm: ColumnModel, sortDirs: {[cmName: string]: "asc" | "desc" }, removeSorting: (cmIndexOrName: string) => void }) => string[]);
		onSortCol?: (this: BodyTable, cmOrIndexName: string, iCol: number, sortOrder: string, eventObject?: JQueryEventObject) => BooleanFeedbackValues;
		sortname?: string; // ""
		sortIconsBeforeText?: boolean; // false
		sortIconName?: (this: BodyTable, options: { order: "asc" | "desc", iCol: number, cm: ColumnModel }) => string; // return CSS classes
		sortingDuringEditing?: "prevent" | "cancel" | "save"; // "prevent"
		sortOrderPosition?: "afterSortIcons" | "beforeSortIcons"; // "afterSortIcons"
		showOneSortIcon?: boolean; // false
		showSortOrder?: boolean; // true
		sortorder?: "asc" | "desc" | string; // "asc"
		threeStateSort?: boolean; // false
		viewsortcols?: [boolean, "vertical" | "horizontal", boolean]; // [false, "vertical", true]
	}
	interface JqGridTreeGridOptions {
		ExpandColClick?: boolean;
		ExpandColumn?: string;
		tree_root_level?: number; // 0
		treeANode?: number; // -1, used internally
		treedatatype?: string | ((this: BodyTable, postData: Object | string, loadId: string, rcnt: number, npage: number, adjust: number) => void); // used iinternally as copy of datatype
		treeGrid?: boolean;
		treeGridModel?: "adjacency" | "nested";
		treeIcons?: {
			commonIconClass?: string; // "fa fa-fw"
			leaf?: string; // "fa fa-fw fa-dot-circle-o"
			minus?: string; // "fa fa-fw fa-lg fa-sort-desc"
			plusLtr?: string; // "fa fa-fw fa-lg fa-caret-right"
			plusRtl?: string; // "fa fa-fw fa-lg fa-caret-left"
		};
		treeReader?: TreeGridReader;
		unloadNodeOnCollapse?: boolean | ((this: BodyTable, treeItem: any) => boolean);
	}
	interface JqGridResizingOptions {
		autoresizeOnLoad?: boolean; 
		afterResizeDblClick?: (this: BodyTable, options: { iCol: number, cm: ColumnModel, cmName: string }) => void;
		columnsToReResizing?: number[]; // used internally by jqGrid
		doubleClickSensitivity?: number; // 250
		forceFit?: boolean; // false
		minResizingWidth?: number; // 10
		resizeDblClick?: (this: BodyTable, iCol: number, cm: ColumnModel, eventObject: JQueryEventObject) => BooleanFeedbackValues;
		resizeclass?: string; // ""
		resizeStart?: (this: BodyTable, eventObject: JQueryEventObject, iCol: number) => void;
		resizeStop?: (this: BodyTable, newWidth: number, iCol: number) => void;
		readonly rs?: string; // "#rs_mlist"
		readonly rsId?: string; // "rs_mlist"
	}
	interface JqGridPagingOptions {
		gridComplete?: (this: BodyTable) => void;
		lastpage?: number; // 0
		onPaging?: (this: BodyTable, source: "records" | "user" | "first" | "prev" | "next" | "last", options: { newPage: number, currentPage: number, lastPage: number, currentRowNum: number, newRowNum: number }) => BooleanFeedbackValues;
		page?: number;
		pager?: boolean | string; // default: "". Example, "#jqg1"
		pagerCenterWidth?: number;
		pagerLeftWidth?: number; // 125
		pagerRightWidth?: number;
		pagerpos?: "left" | "center" | "right";
		pagingDuringEditing?: "prevent" | "cancel" | "save"; // "prevent"
		pgbuttons?: boolean; // true
		pginput?: boolean; // true
		reccount?: number; // 0
		recordpos?: "left" | "center" | "right"; // default "left" or "right" in case of p.direction === "rtl"
		records?: number; // 0
		rowList?: (number | string)[]; // example [5, 10, 20, "10000:All"]
		toppager?: string; // Default false. Be changed by jqGrid to string in the form "#list_toppager"
		viewrecords?: boolean; // false
	}
	interface GroupSummaryInformation {
		groupCount?: number;
		groupIndex?: string; // cmName
		groupValue?: any;
		nm: string; // cmName
		sr?: number; // cm.summaryRound
		srt?: "fixed" | "round"; // cm.summaryRoundType
		st?: ("sum" | "min" | "max" | "count" | "avg") | ("sum" | "min" | "max" | "count" | "avg")[]; //cm.summaryType
		v: any;
	}
	interface GroupInformation {
		cnt?: number;
		collapsed?: boolean;
		dataIndex: string; // cmName
		displayValue: string; //displayValue,
		idx: number; // index in grp.groupField array
		keys?: any[];
		parentGroup?: GroupInformation;
		parentGroupIndex?: number;
		startRow?: number; // iRow
		summary: GroupSummaryInformation[];
		value?: any;
	}
	interface CounterInformation {
		cnt: number;
		pos: number;
		summary: GroupSummaryInformation[];
	}
	interface GroupingView {
		_locgr?: boolean;
		commonIconClass?: string;
		counters?: CounterInformation[];
		displayField?: string[];
		formatDisplayField?: ((this: BodyTable, displayValue: string, value: any, cm: ColumnModel, idx: number, grp: GroupInformation, index: number) => string)[];
		groupCollapse?: (options: { group: number, rowid: string }) => boolean;
		groupColumnShow?: boolean[];
		groupField: string[];
		groupOrder?: ("asc" | "desc")[];
		groups?: GroupInformation[];
		groupSummary?: boolean[];
		groupSummaryPos?: ("footer" | "header")[];
		groupText?: string[];
		hideFirstGroupCol?: boolean;
		iconColumnName?: string; // cmName
		isInTheSameGroup?: boolean[];
		lastvalues?: Object[];
		minusicon?: string; // "fa fa-fw fa-minus-square-o"
		plusicon?: string; // "fa fa-fw fa-plus-square-o"
		showSummaryOnHide?: boolean;
		summary?: GroupSummaryInformation[];
		useDefaultValuesOnGrouping?: boolean;
		visibiltyOnNextGrouping?: boolean[];
		[propName: string]: any; // allow to have any number of other properties
	}
	interface JqGridGroupingOptions {
		grouping?: boolean;
		groupingView?: GroupingView;
		onClickGroup?: (this: BodyTable, hid: string, collapsed: boolean) => void;
	}
	interface JqGridOptions extends JqGridSubGridOptions,
									JqGridSelectionOptions,
									JqGridSortingOptions,
									JqGridGroupingOptions,
									JqGridTreeGridOptions,
									JqGridResizingOptions,
									JqGridPagingOptions {
		_index?: {[rowid: string]: number }; // used internally by jqGrid if local data exists
		_inlinenav?: boolean; // used internally by jqGrid if inlineNav be called
		_nvtd?: [number, number]; // used internally by jqGrid

		actionsNavOptions?: FormatterActionsOptions;
		additionalProperties?: (string | ColumnModel)[];
		afterAddRow?: (this: BodyTable, options: { rowid: string, inputData: Object | Object[], position: AddRowDataPosition, srcRowid?: string, iRow: number, tr: HTMLTableRowElement, localData?: Object, iData?: number }) => void;
		afterChangeRowid?: (this: BodyTable, options: { rowid: string, oldRowid: string, iRow: number, tr: HTMLTableRowElement }) => void;
		afterDelRow?: (this: BodyTable, rowid: string) => void;
		afterInsertRow?: (this: BodyTable, rowid: string, item: { [cmOrPropName: string]: any }, srcItem: any) => void;
		afterSetRow?: (this: BodyTable, options: { rowid: string, inputData: Object | Object[], iRow?: number, localData?: Object, iData?: number, tr: HTMLTableRowElement, cssProp: string | Object }) => void;
		ajaxGridOptions?: JQueryAjaxSettings;
		altclass?: string;
		altRows?: boolean;
		arrayReader?: any[]; // used internally
		arrayReaderInfos?: { [name: string]: { name?: string, index: string, order?: number, type: InputNameType } }; // used internally
		autoencode?: boolean; // true starting with version 4.15.0
		autoResizing?: { adjustGridWidth?: boolean, compact?: boolean, fixWidthOnShrink?: boolean, maxColWidth?: number, minColWidth?: number, resetWidthOrg?: boolean, widthOfVisiblePartOfSortIcon?: number, wrapperClassName?: string };
		autowidth?: boolean;
		beforeInitGrid?: (this: BodyTable) => void;
		beforeProcessing?: (this: BodyTable, data: any, textStatus: string, jqXhr: JQueryXHR) => false | void;
		beforeRequest?: (this: BodyTable) => BooleanFeedbackValues;
		caption?: string;
		cellEdit?: boolean;
		cellLayout?: number; // 5
		cellsubmit?: string; // "clientArray"
		cmNamesInputOrder?: string[]; // used internally by jqGrid, can be generated if remapColumns is used
		cmTemplate?: ColumnModel;
		colModel: ColumnModel[];
		colNames?: string[];
		createColumnIndex?: boolean;
		customSortOperations?: {
			[customOperation: string]: CustomFilterOperation;
		};
		customUnaryOperations?: string[]; // the list of customOperation from customSortOperations, which should be interpreted as unary, like standard operations "nu" and "nn". Unary operations has no data and be triggerd in searching toolbar on selection (without pressing Enter). See http://stackoverflow.com/a/41445578/315935 for detailes
		data?: any[];
		dataIndexById?: {
			[id: string]: {
				[cmName: string]: {
					[value: string]: Object; // the reference on the object indexByColumnData[cmName][value]
				}
			}
		};
		datastr?: string | any[];
		datatype?: string | ((this: BodyTable, postData: Object | string, loadId: string, rcnt: number, npage: number, adjust: number) => void);
		dataTypeOrg?: string;
		deepempty?: boolean;
		direction?: "ltr" | "rtl";
		disableClick?: boolean;
		editurl?: string; // "clientArray"
		errorDisplayTimeout?: number; // be used inside of displayErrorMessage method
		footerrow?: boolean;
		formDeleting?: FormDeletingOptions;
		formEditing?: FormEditingOptions;
		formViewing?: FormViewingOptions;
		frozenColumns?: boolean;
		readonly gBox?: string; // "#gbox_list"
		readonly gBoxId?: string; // gbox_list"
		gridstate?: "visible" | "hidden";
		gridview?: boolean;
		guiStyle?: string; // "jQueryUI"
		inFilterSeparator?: boolean; // ","
		readonly gView?: string; // "#gview_list"
		readonly gViewId?: string; // "gview_list"
		headertitles?: boolean;
		height?: "auto" | "100%" | number;
		hiddengrid?: boolean;
		hidegrid?: boolean;
		hoverrows?: boolean;
		iCol?: number; // -1
		iColByName?: {[cmName: string]: number };
		iconSet?: string; // "fontAwesome"
		indexByColumnData?: {
			[cmName: string]: {
				[value: string]: {
					[rowid: string]: Object; // Object is the reference of the item from data array
				}
			}
		};
		readonly id?: string; // "list"
		readonly idPrefix?: string; // ""
		readonly idSel?: string; // "#list"
		inlineEditing?: InlineEditingOptions;
		iPropByName?: {[additionalPropertyName: string]: number };
		jqgdnd?: boolean;
		jqXhr?: JQueryXHR; // JQueryXHR of the last pending Ajax request. Be used by abortAjaxRequest method
		iRow?: number; // -1
		jsonReader?: JsonOrLocalReader;
		keyName?: boolean;
		lastSelectedData?: any[];
		loadBeforeSend?: (this: BodyTable, jqXhr: JQueryXHR, settings: JQueryAjaxSettings) => false | void;
		loadComplete?: (this: BodyTable, data: any) => void;
		loadError?: (this: BodyTable, jqXhr: JQueryXHR, textStatus: string, errorThrown: string) => void;
		loadonce?: boolean;
		loadui?: LoadType;
		locale?: string; // default is "en-US". It will be overwrite if by the last included i18n\grid.locale-XX.min.js
		localReader?: JsonOrLocalReader;
		maxItemsToJoin?: number; // 32768
		maxRowNum?: number; // 10000
		mtype?: string; // "GET"
		navOptions?: NavOptions;
		nv?: number; // 0
		ondblClickRow?: (this: BodyTable, rowid: string, iRow: number, iCol: number, eventObject: JQueryEventObject) => void;
		onHeaderClick?: (this: BodyTable, gridState: "visible" | "hidden", eventObject: JQueryEventObject) => void;
		onInitGrid?: (this: BodyTable) => void;
		onRemapColumns?: (this: BodyTable, permutation: number[], updateCells?: boolean, keepHeader?: boolean) => void;
		onRightClickRow?: (this: BodyTable, rowid: string, iRow: number, iCol: number, eventObject: JQueryEventObject) => void;
		onShowHideCol?: (this: BodyTable, show: boolean | "none" | "", cmName: string, iCol: number, options: ShowHideColOptions) => void;
		postData?: Object | string;
		prmNames?: {
			addoper?: string | null; // "add"
			deloper?: string | null; // "del"
			editoper?: string | null; // "edit"
			id?: string | null; // "id"
			idold?: string | null; // "idOld"
			filters?: string | null; // "filters"
			nd?: string | null; // "nd"
			npage?: string | null; // null
			oper?: string | null; // "oper"
			order?: string | null; // "sord"
			page?: string | null; // "page"
			rows?: string | null; // "rows"
			rowidName?: string; // "rowid" - will be not really used currently
			search?: string | null; // "_search"
			sort?: string | null; // "sidx"
			subgridid?: string | null; // "id"
			totalrows?: string | null; // "totalrows"
		};
		quickEmpty?: boolean | "quickest";
		reloadGridOptions?: ReloadGridOptions;
		reloadingDuringEditing?: "prevent" | "cancel" | "save"; // "prevent"
		remapColumns?: number[];
		resetsearch?: boolean;
		reservedColumnNames?: string[]; // ["rn","cb","subgrid"]
		rowattr?: ( (this: BodyTable, item: any, rowObject: any, rowid: string) => { [attributeName: string]: string } | null | undefined );
		rowIndexes?: {[rowid: string]: number};
		rowNum?: number; // 10
		rownumbers?: boolean;
		rownumWidth?: number; // 25
		rowTotal?: null | number;
		savedRow?: any[];
		editingInfo?: {[rowid: string]: { mode: "inlineEditing" | "cellEditing"; savedRow: any[]; editable: { [cmName: string]: boolean | "hidden" | "disabled" | "readonly" } }};
		scroll?: boolean | 1;
		scrollOffset?: number; // 0
		scrollrows?: boolean;
		scrollTimeout?: number; // 40
		search?: boolean;
		searching?: SearchingOptions;
		serializeGridData?: (this: BodyTable, postData: any) => Object | string;
		sortable?: boolean | ((permutation: number[]) => void) | { exclude?: string, update?: (permutation: number[]) => void, options?: JQueryUI.SortableOptions };
		shrinkToFit?: boolean;
		tblwidth?: number; // 487
		toolbar?: [boolean, "top" | "bottom" | "both"];
		readonly totaltime?: number; // 94
		url?: string; // ""
		userData?: any;
		userDataOnFooter?: boolean;
		useUnformattedDataForCellAttr?: boolean;
		width?: number;
		widthOrg?: number; // used internally by jqGrid
		xmlReader?: XmlReader;
		[propName: string]: any; // allow to have any number of other properties
	}
	interface ShowHideColOptions {
		newGridWidth?: number;
		notSkipFrozen?: boolean;
		toReport?: Object;
		skipFeedback?: boolean;
		skipSetGridWidth?: boolean;
		skipSetGroupHeaders?: boolean;
	}

	// inline editing options
	interface RestoreRowOptions {
		afterrestorefunc?: (this: BodyTable, rowid: string) => void;
		beforeCancelRow?: (this: BodyTable, options: RestoreRowOptions, rowid: string) => BooleanFeedbackValues;
		[propName: string]: any; // allow to have any number of other properties
	}
	interface BaseSaveRowOptions extends RestoreRowOptions {
		aftersavefunc?: (this: BodyTable, rowid: string, jqXhr: JQueryXHR, postData: any, options: SaveRowOptions) => void;
		errorfunc?: (this: BodyTable, rowid: string, jqXhr: JQueryXHR, textStatus: string, errorThrown: string) => void;
		extraparam?: Object;
		successfunc?: (this: BodyTable, jqXhr: JQueryXHR, rowid: string, options: FreeJqGrid.SaveRowOptions, editOrAdd: string, postData: any) => boolean | [boolean, any];
		url?: string | ((this: BodyTable, rowid: string, editOrAdd: "add" | "edit", postData: any, options: SaveRowOptions) => string);
	}
	interface EditRowOptions extends BaseSaveRowOptions {
		beforeEditRow?: (this: BodyTable, options: EditRowOptions, rowid: string) => BooleanFeedbackValues;
		defaultFocusField?: number | string;
		focusField?: boolean | number | string | { target: JQueryEventObject };
		keys?: boolean;
		oneditfunc?: (this: BodyTable, rowid: string, options: EditRowOptions) => void;
		[propName: string]: any; // allow to have any number of other properties
	}
	interface SaveRowOptions extends BaseSaveRowOptions {
		ajaxSaveOptions?: JQueryAjaxSettings;
		beforeSaveRow?: (this: BodyTable, options: SaveRowOptions, rowid: string, editOrAdd: "add" | "edit") => BooleanFeedbackValues;
		mtype?: string | ((this: BodyTable, editOrAdd: "add" | "edit", options: SaveRowOptions, rowid: string, postData: any) => string);
		saveRowValidation?: (this: BodyTable, options: { options: SaveRowOptions, rowid: string, tr: HTMLTableRowElement, iRow: string, savedRow: any, newData: any, mode: "add" | "edit" }) => BooleanFeedbackValues;
		savetext?: string; // default from $.jgrid.locales[currentLocale].defaults.savetext or $.jgrid.defaults.savetext or "Saving..."
		saveui?: LoadType; // "enable"
		serializeSaveData?: (this: BodyTable, postData: any) => Object | string; 
		restoreAfterError?: boolean;
		[propName: string]: any; // allow to have any number of other properties
	}
	interface AddRowOptions {
		addRowParams?: EditRowOptions;
		beforeAddRow?: (this: BodyTable, options: AddRowOptions) => BooleanFeedbackValues;
		initdata?: any;
		position?: AddRowDataPosition;
		rowID?: null | string | ((options: AddRowOptions) => string);
		srcRowid?: string;
		useDefValues?: boolean;
		useFormatter?: boolean;
		[propName: string]: any; // allow to have any number of other properties
	}
	interface InlineEditingOptions extends EditRowOptions, SaveRowOptions, RestoreRowOptions, AddRowOptions {
	}
	type FilterOperation = "eq" | "ne" | "bw" | "bn" | "ew" | "en" | "cn" | "nc" | "nu" | "nn" | "in" | "ni" | string;
	interface Rule {
		field: string;
		op: FilterOperation;
		data?: any;
	} 
	interface Filter {
		groupOp: "OR" | "AND";
		rules: Rule[];
		groups: Filter[];
	}
	interface CustomFilterOperation {
		operand: string;
		text: string;
		filter: (options: { item: Object, cmName: string, searchValue: string }) => number;
		buildQueryValue?: (options: any) => string;
	}
	interface JqFilterDiv extends HTMLDivElement {
		p: JqFilterOptions;
		filter: boolean;
		onchange(): boolean;
		reDraw(): void;
		createTableForGroup(group: Filter, parentgroup: Filter): JQuery; // return jQuery wrapper on HTMLTableElement
		createTableRowForRule(rule: Rule, group: Filter): JQuery; // return jQuery wrapper on HTMLTableRowElement
		getStringForGroup(group: Filter): string;
		getStringForRule(rule: Rule): string;
		resetFilter(): void; // copy p.filter from p.initFilter and call reDraw() and onchange()
		hideError(): void;
		showError(): void;
		toUserFriendlyString(): string; // convert p.filter to string with respect of getStringForGroup
		toString(): string;
	}
	interface JqFilterOptions {
		afterRedraw?: (this: BodyTable, options: JqFilterOptions, searchFilterDiv: JqFilterDiv) => void;
		ajaxSelectOptions?: JQueryAjaxSettings;
		columns?: ColumnModel[];
		cops: {
			[operationName: string]: CustomFilterOperation;
		}; // p.customSortOperations
		direction?: "ltr" | "rtl"; // default "ltr"
		errmsg?: string; // default "" - HTML fragment
		error?: boolean; // default false
		errorcheck?: boolean; // default true
		filter?: null | Filter;
		groupButton?: boolean; // default true
		groupOps?: { op: "AND" | "OR", text: string }[]; // default [{ op: "AND", text: "AND" }, { op: "OR", text: "OR" }]
		id: string; // id of the grid, which created jqFilter
		initFilter?: null | Filter; // used internally
		numopts?: FilterOperation[]; // default ["eq", "ne", "lt", "le", "gt", "ge", "nu", "nn", "in", "ni"]
		onChange?: (this: BodyTable, options: JqFilterOptions, searchFilterDiv: JqFilterDiv) => void;
		operands?: {
			[searchOperation: string]: string // maps search operation name (FilterOperation) to the text
		};
		ops?: { oper: FilterOperation; text: string }[];
		ruleButtons?: boolean; // default true
		showQuery?: boolean; // default true
		sopt?: null | string[]; // default null. It's used only if cm.searchoptions.sopt is undefined. If null then be used stropts or numopts depend on whether cm.sorttype is in strarr array
		strarr?: ["text", "string", "blob"];
		stropts?: FilterOperation[]; // default ["eq", "ne", "bw", "bn", "ew", "en", "cn", "nc", "nu", "nn", "in", "ni"]
	}
	interface XmlJsonClass {
		xml2json(this: XmlJsonClass, xml: Node, tab: string): string;
		json2xml(this: XmlJsonClass, o: Object, tab: string): string;
		toObj(this: XmlJsonClass, xml: Node): Object | null;
		toJson(this: XmlJsonClass, o: Object, name: string | false, indent: string, wellform: boolean): string;
		innerXml(this: XmlJsonClass, node: Node): string;
		escape(txt: string): string;
		removeWhite(node: Node): Node;
	}
	interface JqGridImportOptions {
		imptype?: "xml" | "json" | "xmlstring" | "jsonstring"; // default "xml"
		impstring?: string; // default ""
		impurl?: string; // default ""
		mtype?: string; // default "GET"
		impData?: Object; // default {}
		xmlGrid?: {
			config?: string; // default "roots>grid",
			data?: string; // default "roots>rows"
		};
		jsonGrid?: {
			config?: string; // default "grid"
			data?: string; // default "data"
		};
		ajaxOptions?: Object; // default {}
	}
	interface SetGroupHeaderOptions {
		useColSpanStyle?: boolean;
		applyLabelClasses?: boolean;
		groupHeaders: {
			startColumnName: string,
			numberOfColumns: number,
			titleText: string
		}[];
	}
	interface PivotAjaxOptions extends JQueryAjaxSettings {
		reader?: string; // "rows"
	}
	enum PivotColumnType {
		StandardColumn = 0, // standard column
		TotalGroupCulumn = 1, // total group
		GrandTotalGroupCulumn = 2, // grand total
	}
	interface XDimension extends ColumnModelWithoutLabel {
		dataName: string;
		footerText?: string; // text which will be placed in the column of the footer row 
		label?: string | ((this: BodyTable, x, i, o) => string);
	}
	interface YDimension extends ColumnModelWithoutLabel {
		label?: string | (() => string);
	}
	interface Aggregate extends ColumnModel {
		member: string;
		aggregator?: "sum" | "count" | "avg" | "min" | "max" | ((options: {previousResult: any, value: any, fieldName: string, item: any, iItem: number, items: any[]}) => any);
	}
	interface PivotOptions {
		totals?: boolean; // false - replacement for rowTotals. totalText and totalHeader can be used additionally
		rowTotals?: boolean; // obsolate. One should use totals instead
		totalHeader?: string;
		totalText?: string;
		footerAggregator?: string;
		compareVectorsByX: null;
		compareVectorsByY: null;
		useColSpanStyle?: boolean; // false
		trimByCollect?: boolean; // true
		skipSortByX?: boolean; // false
		skipSortByY?: boolean; // false
		caseSensitive?: boolean; // false
		footerTotals?: boolean; // false - replacement colTotals. footerAggregator option and totalText properties of xDimension[i] can be used additionally
		colTotals?: boolean; // obsolate. One should use footerTotals instead
		groupSummary?: boolean; // true
		groupSummaryPos?: "footer" | "header"; // "header"
		frozenStaticCols?: boolean; // false
		defaultFormatting?: boolean; // true
		data?: any[];
		xDimension?: XDimension[];
		yDimension?: YDimension[];
		aggregates?: Aggregate[];
	}
	interface JqGridGroupingOptionsAndSortname extends JqGridGroupingOptions {
		sortname?: string;
	}
	interface PivotSetupResult {
		additionalProperties: string[];
		colModel: ColumnModel;
		options: PivotOptions;
		rows: any[];
		groupOptions: JqGridGroupingOptionsAndSortname;
		groupHeaders: SetGroupHeaderOptions[];
		summary: { [propName: string]: any; }; // be used as userdata togrthrr with footerrow:true and userDataOnFooter:true
	}
	interface ResetFrozenHeightsOptions {
		body: {
			resizeDiv?: boolean;
			resizedRows?: {
				iRowStart: number; // -1 means don't recalculate heights or rows
				iRowEnd: number;
			}
		};
		header: {
			resizeDiv?: boolean;
			resizedRows?: {
				iRowStart: number; // -1 means don't recalculate heights or rows
				iRowEnd: number;
			}
		};
		resizeFooter?: boolean;
	}
}

// global function
interface Window {
	// grid.tbltogrid module
	tableToGrid(selector: Element | string | JQuery, options: FreeJqGrid.JqGridOptions): void;

	// jsonxml module
	xmlJsonClass: FreeJqGrid.XmlJsonClass;
}

interface JQueryStatic {
	jgrid: FreeJqGrid.JqGridStatic;
	fmatter: FreeJqGrid.JqGridFmatter;
	jqm: FreeJqGrid.JqmOptions;
	jqDnR: {
		drag(eventObject: JQueryEventObject); // ("mousemove" handler)
		stop(); // ("mouseup" handler)
	};
	unformat: (element: Element | JQuery, options: { rowId: string, colModel: FreeJqGrid.ColumnModel }, iCol: number, content: boolean) => string;
	[propName: string]: any; // allow to have any number of other properties
}

interface JQuery {
	jqGrid(options: FreeJqGrid.JqGridOptions): FreeJqGrid.JQueryJqGrid;

	// grid.base module
	abortAjaxRequest?(): FreeJqGrid.JQueryJqGrid;
	addRowData?(rowid: string, rdata: Object | Object[], position?: FreeJqGrid.AddRowDataPosition, srcRowid?: string): boolean;
	autoResizeAllColumns?(): FreeJqGrid.JQueryJqGrid;
	autoResizeColumn?(iCol: number, skipGridAdjustments?: boolean): FreeJqGrid.JQueryJqGrid;
	bindKeys?(settings: { onEnter?: (this: FreeJqGrid.BodyTable, rowid: string) => void, onSpace?: (this: FreeJqGrid.BodyTable, rowid: string) => void, onLeftKey?: (this: FreeJqGrid.BodyTable, rowid: string) => void, onRightKey?: (this: FreeJqGrid.BodyTable, rowid: string) => void, scrollingRows: boolean }): FreeJqGrid.JQueryJqGrid;
	changeRowid?(oldRowId: string, newRowId: string): FreeJqGrid.JQueryJqGrid;
	clearGridData?(clearFooter: boolean): FreeJqGrid.JQueryJqGrid;
	delRowData?(rowid: string): boolean;
	displayErrorMessage?(htmlFragment: string): void;
	footerData?(action?: "get" | "set", data?: Object, format?: boolean): Object | boolean;
	generateDatalistFromColumnIndex?(cmName: string): JQuery;
	getAutoResizableWidth?(iCol: number): number;
	getCell?(rowid: string, cmName: string): string | false;
	getCell?(rowid: string, iCol: number): string | false;
	getCol?(cmName: string, asObj?: boolean, mathopr?: "sum" | "avg" | "count" | "min" | "max"): string[] | { id: string, value: string }[] | number;
	getCol?(iCol: number, asObj?: boolean, mathopr?: "sum" | "avg" | "count" | "min" | "max"): string[] | { id: string, value: string }[] | number;
	getDataIDs?(): string[];
	getGridParam?(parameterName?: string): any;
	getGridRes?(propertyPath: string): any;
	getGridRowById?(rowid: string): HTMLTableRowElement | null;
	getGuiStyles?(guiStylePath?: string, additionalCssClasses?: string): string;
	getIconRes?(iconResourcePath: string): string;
	getInd?(): HTMLTableRowElement | number | false;
	getLocalRow?(rowid: string): false | Object;
	getRowData?(rowid?: string, options?: { includeId: boolean, skipHidden?: boolean }): Object[] | Object;
	getUniqueValueFromColumnIndex?(cmName: string): string[];
	hideCol?(cmName: string[] | string, options?: FreeJqGrid.ShowHideColOptions): FreeJqGrid.JQueryJqGrid;
	isBootstrapGuiStyle?(): boolean;
	isCellEditing?(rowid: string, cmName: string, tr?: HTMLTableRowElement): boolean;
	isCellEditing?(rowid: string, iCol: number, tr?: HTMLTableRowElement): boolean;
	isInCommonIconClass?(testClassName: string): boolean;
	progressBar?(options: { htmlContent: string, method: "hide" | "show", loadtype: FreeJqGrid.LoadType }): FreeJqGrid.JQueryJqGrid;
	remapColumns?(permutationByName: number[], updateCells?: boolean, keepHeader?: boolean): FreeJqGrid.JQueryJqGrid;
	remapColumnsByName?(permutationByName: string[], updateCells?: boolean, keepHeader?: boolean): FreeJqGrid.JQueryJqGrid;
	resetColumnResizerHeight?: FreeJqGrid.JQueryJqGrid;
	resetSelection?(rowid?: string): FreeJqGrid.JQueryJqGrid;
	rotateColumnHeaders?(columnNameOrIndexes: string[], headerHeight?: number): FreeJqGrid.JQueryJqGrid;
	setCaption?(newCaption: string): FreeJqGrid.JQueryJqGrid;
	setCell?(rowid: string, cmName: string, nData: any, cssp?: string | Object, attrp?: Object, forceUpdate?: boolean): FreeJqGrid.JQueryJqGrid;
	setColWidth?(iCol: number, newWidth: number, adjustGridWidth?: boolean, skipGridAdjustments?: boolean): FreeJqGrid.JQueryJqGrid;
	setGridHeight?(newHeight: number | "auto" | "100%" | string): FreeJqGrid.JQueryJqGrid;
	setGridParam?(newParams: Object, overwrite?: boolean): FreeJqGrid.JQueryJqGrid;
	setGridWidth?(newWidth: number, shrink?: boolean): FreeJqGrid.JQueryJqGrid;
	setLabel?(cmName: string, nData: string, cssp?: string | Object, attrp?: Object): FreeJqGrid.JQueryJqGrid;
	setRowData?(rowid: string, data: any, cssp?: string | Object): boolean;
	setSelection?(rowid: string, callOnSelectRow?: boolean, eventObject?: JQueryEventObject): FreeJqGrid.JQueryJqGrid;
	showCol?(cmName: string[] | string, options?: FreeJqGrid.ShowHideColOptions): FreeJqGrid.JQueryJqGrid;
	showHideCol?(cmName: string[] | string, show?: boolean | "none" | "", options?: FreeJqGrid.ShowHideColOptions): FreeJqGrid.JQueryJqGrid;
	unbindKeys?(): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "abortAjaxRequest"): FreeJqGrid.JQueryJqGrid;	
	jqGrid(methodName: "addRowData", rowid: string, rdata: Object | Object[], position?: FreeJqGrid.AddRowDataPosition, srcRowid?: string): boolean;
	jqGrid(methodName: "autoResizeAllColumns"): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "autoResizeColumn", iCol: number, skipGridAdjustments?: boolean): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "bindKeys", settings: { onEnter?: (this: FreeJqGrid.BodyTable, rowid: string) => void, onSpace?: (this: FreeJqGrid.BodyTable, rowid: string) => void, onLeftKey?: (this: FreeJqGrid.BodyTable, rowid: string) => void, onRightKey?: (this: FreeJqGrid.BodyTable, rowid: string) => void, scrollingRows: boolean }): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "changeRowid", oldRowId: string, newRowId: string): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "clearGridData", clearFooter: boolean): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "delRowData", rowid: string): boolean;
	jqGrid(methodName: "displayErrorMessage", htmlFragment: string): void;
	jqGrid(methodName: "footerData", action?: "get" | "set", data?: Object, format?: boolean): Object | boolean;
	jqGrid(methodName: "generateDatalistFromColumnIndex", cmName: string): JQuery;
	jqGrid(methodName: "getAutoResizableWidth", iCol: number): number;
	jqGrid(methodName: "getCell", rowid: string, cmName: string): string | false;
	jqGrid(methodName: "getCell", rowid: string, iCol: number): string | false;
	jqGrid(methodName: "getCol", cmName: string, asObj?: boolean, mathopr?: "sum" | "avg" | "count" | "min" | "max"): string[] | { id: string, value: string }[] | number;
	jqGrid(methodName: "getCol", iCol: number, asObj?: boolean, mathopr?: "sum" | "avg" | "count" | "min" | "max"): string[] | { id: string, value: string }[] | number;
	jqGrid(methodName: "getDataIDs"): string[];
	jqGrid(methodName: "getGridParam", parameterName?: string): any;
	jqGrid(methodName: "getGridRes", propertyPath: string): any;
	jqGrid(methodName: "getGridRowById", rowid: string): HTMLTableRowElement | null;
	jqGrid(methodName: "getGuiStyles", guiStylePath?: string, additionalCssClasses?: string): string;
	jqGrid(methodName: "getIconRes", iconResourcePath: string): string;
	jqGrid(methodName: "getInd"): HTMLTableRowElement | number | false;
	jqGrid(methodName: "getLocalRow", rowid: string): false | Object;
	jqGrid(methodName: "getRowData", rowid?: string, options?: { includeId: boolean, skipHidden?: boolean }): Object[] | Object;
	jqGrid(methodName: "getUniqueValueFromColumnIndex", cmName: string): string[];
	jqGrid(methodName: "hideCol", cmName: string[] | string, options?: FreeJqGrid.ShowHideColOptions): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "isBootstrapGuiStyle"): boolean;
	jqGrid(methodName: "isCellEditing", rowid: string, cmName: string, tr?: HTMLTableRowElement): boolean;
	jqGrid(methodName: "isCellEditing", rowid: string, iCol: number, tr?: HTMLTableRowElement): boolean;
	jqGrid(methodName: "isInCommonIconClass", testClassName: string): boolean;
	jqGrid(methodName: "progressBar", iCol: number, newWidth: number, adjustGridWidth?: boolean, skipGridAdjustments?: boolean): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "remapColumns", permutationByName: number[], updateCells?: boolean, keepHeader?: boolean): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "remapColumnsByName", permutationByName: string[], updateCells?: boolean, keepHeader?: boolean): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "resetColumnResizerHeight"): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "resetSelection", rowid?: string): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "rotateColumnHeaders", columnNameOrIndexes: string[], headerHeight?: number): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "setCaption", newCaption: string): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "setCell", rowid: string, cmName: string, nData: any, cssp?: string | Object, attrp?: Object, forceUpdate?: boolean): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "setColWidth", iCol: number, newWidth: number, adjustGridWidth?: boolean, skipGridAdjustments?: boolean): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "setGridHeight", newHeight: number | "auto" | "100%" | string): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "setGridParam", newParams: Object, overwrite?: boolean): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "setGridWidth", newWidth: number, shrink?: boolean): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "setLabel", cmName: string, nData: string, cssp?: string | Object, attrp?: Object): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "setRowData", rowid: string, data: any, cssp?: string | Object): boolean;
	jqGrid(methodName: "setSelection", rowid: string, callOnSelectRow: boolean, eventObject: JQueryEventObject): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "showCol", cmName: string[] | string, options?: FreeJqGrid.ShowHideColOptions): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "showHideCol", cmName: string[] | string, show?: boolean | "none" | "", options?: FreeJqGrid.ShowHideColOptions): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "unbindKeys"): FreeJqGrid.JQueryJqGrid;

	// grid.grouping module
	getGroupHeaderIndex?(hid: string, clickedElem?: Element | JQuery): number;
	groupingGroupBy?(name: string | string[], options: FreeJqGrid.GroupingView): FreeJqGrid.JQueryJqGrid;
	groupingPrepare?(record: object, iRow: number): FreeJqGrid.JQueryJqGrid;
	groupingRemove?(current?: boolean): FreeJqGrid.JQueryJqGrid;
	groupingRender?(grdata: string[], rn: number): string;
	groupingSetup?(): FreeJqGrid.JQueryJqGrid;
	groupingToggle?(hid: string, clickedElem?: Element | JQuery): false;
	jqGrid(methodName: "getGroupHeaderIndex", hid: string, clickedElem?: Element | JQuery): number;
	jqGrid(methodName: "groupingGroupBy", name: string | string[], options: FreeJqGrid.GroupingView): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "groupingPrepare", record: object, iRow: number): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "groupingRemove", current?: boolean): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "groupingRender", grdata: string[], rn: number): string;
	jqGrid(methodName: "groupingSetup"): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "groupingToggle", hid: string, clickedElem?: Element | JQuery): false;

	// grid.pivot module
	pivotSetup?(data: any[] | string, pivotOpt: FreeJqGrid.PivotOptions): FreeJqGrid.PivotSetupResult;
	jqPivot?(data: any[] | string, pivotOpt: FreeJqGrid.PivotOptions, gridOpt?: FreeJqGrid.JqGridOptions, ajaxOptions?: FreeJqGrid.PivotAjaxOptions): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "pivotSetup", data: any[] | string, pivotOpt: FreeJqGrid.PivotOptions): FreeJqGrid.PivotSetupResult;
	jqGrid(methodName: "jqPivot", data: any[] | string, pivotOpt: FreeJqGrid.PivotOptions, gridOpt?: FreeJqGrid.JqGridOptions, ajaxOptions?: FreeJqGrid.PivotAjaxOptions): FreeJqGrid.JQueryJqGrid;

	// grid.formedit module
	delGridRow?(rowid: string, options: FreeJqGrid.FormDeletingOptions): FreeJqGrid.JQueryJqGrid;
	editGridRow?(rowid: string, options: FreeJqGrid.FormEditingOptions): FreeJqGrid.JQueryJqGrid;
	FormToGrid?(rowid: string, formid: string | Element | JQuery, mode?: "add" | "set", position?: "first" | "last"): FreeJqGrid.JQueryJqGrid;
	GridToForm?(rowid: string, formid: string | Element | JQuery): FreeJqGrid.JQueryJqGrid;
	navButtonAdd?(pagerIdSelector: string, options: FreeJqGrid.navButtonAddOptions): FreeJqGrid.JQueryJqGrid;
	navButtonAdd?(options: FreeJqGrid.navButtonAddOptions): FreeJqGrid.JQueryJqGrid;
	navGrid?(pagerIdSelector: string, navOptions?: FreeJqGrid.NavOptions, pEdit?: FreeJqGrid.FormEditingOptions, pAdd?: FreeJqGrid.FormEditingOptions, pDel?: FreeJqGrid.FormDeletingOptions, pSearch?: FreeJqGrid.SearchingDialogOptions, pView?: FreeJqGrid.FormViewingOptions): FreeJqGrid.JQueryJqGrid;
	navGrid?(navOptions?: FreeJqGrid.NavOptions, pEdit?: FreeJqGrid.FormEditingOptions, pAdd?: FreeJqGrid.FormEditingOptions, pDel?: FreeJqGrid.FormDeletingOptions, pSearch?: FreeJqGrid.SearchingDialogOptions, pView?: FreeJqGrid.FormViewingOptions): FreeJqGrid.JQueryJqGrid;
	navSeparatorAdd?(pagerIdSelector: string, options?: { sepclass?: string, sepcontent: string, position: "first" | "last" }): FreeJqGrid.JQueryJqGrid;
	navSeparatorAdd?(options?: { sepclass?: string, sepcontent?: string, position?: "first" | "last" }): FreeJqGrid.JQueryJqGrid;
	searchGrid?(options: FreeJqGrid.SearchingDialogOptions): FreeJqGrid.JQueryJqGrid;
	viewGridRow?(rowid: string, options: FreeJqGrid.FormViewingOptions): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "delGridRow", rowid: string, options: FreeJqGrid.FormDeletingOptions): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "editGridRow", rowid: string, options: FreeJqGrid.FormEditingOptions): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "FormToGrid", rowid: string, formid: string | Element | JQuery, mode?: "add" | "set", position?: "first" | "last"): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "GridToForm", rowid: string, formid: string | Element | JQuery): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "navButtonAdd", pagerIdSelector: string, options: FreeJqGrid.navButtonAddOptions): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "navButtonAdd", options: FreeJqGrid.navButtonAddOptions): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "navGrid", pagerIdSelector: string, navOptions?: FreeJqGrid.NavOptions, pEdit?: FreeJqGrid.FormEditingOptions, pAdd?: FreeJqGrid.FormEditingOptions, pDel?: FreeJqGrid.FormDeletingOptions, pSearch?: FreeJqGrid.SearchingDialogOptions, pView?: FreeJqGrid.FormViewingOptions): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "navGrid", navOptions?: FreeJqGrid.NavOptions, pEdit?: FreeJqGrid.FormEditingOptions, pAdd?: FreeJqGrid.FormEditingOptions, pDel?: FreeJqGrid.FormDeletingOptions, pSearch?: FreeJqGrid.SearchingDialogOptions, pView?: FreeJqGrid.FormViewingOptions): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "navSeparatorAdd", pagerIdSelector: string, options?: { sepclass?: string, sepcontent?: string, position?: "first" | "last" }): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "navSeparatorAdd", options?: { sepclass?: string, sepcontent?: string, position?: "first" | "last" }): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "searchGrid", options: FreeJqGrid.SearchingDialogOptions): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "viewGridRow", rowid: string, options: FreeJqGrid.FormViewingOptions): FreeJqGrid.JQueryJqGrid;

	// grid.custom module
	getColProp?(cmName: string): FreeJqGrid.ColumnModel | {};
	jqGrid(methodName: "getColProp", cmName: string): FreeJqGrid.ColumnModel | {};
	setColProp?(cmName: string, cm: FreeJqGrid.ColumnModel): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "setColProp", cmName: string, cm: FreeJqGrid.ColumnModel): FreeJqGrid.JQueryJqGrid;
	sortGrid?(cmName: string, reload: boolean, sor: string): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "sortGrid", cmName: string, reload: boolean, sor: string): FreeJqGrid.JQueryJqGrid;
	clearBeforeUnload?(): FreeJqGrid.JQueryJqGrid;
	GridDestroy?(): FreeJqGrid.JQueryJqGrid;
	GridUnload?(): FreeJqGrid.JQueryJqGrid;
	setGridState?(state: "hidden" | "visible"): FreeJqGrid.JQueryJqGrid;
	filterToolbar?(options: FreeJqGrid.FilterFoolbarOptions): FreeJqGrid.JQueryJqGrid;
	destroyFilterToolbar?(): FreeJqGrid.JQueryJqGrid;
	destroyGroupHeader?(nullHeader?: boolean): FreeJqGrid.JQueryJqGrid;
	setGroupHeaders?(options: FreeJqGrid.SetGroupHeaderOptions): FreeJqGrid.JQueryJqGrid;
	getNumberOfFrozenColumns?(): number;
	destroyFrozenColumns?(): FreeJqGrid.JQueryJqGrid;
	setFrozenColumns?(options: { mouseWheel: (this: FreeJqGrid.BodyTable, eventObject: JQueryEventObject) => number }): FreeJqGrid.JQueryJqGrid;

	// grid.inlinedit module
	addRow?(options: FreeJqGrid.AddRowOptions): FreeJqGrid.JQueryJqGrid;
	editRow?(rowid: string, options: FreeJqGrid.EditRowOptions): FreeJqGrid.JQueryJqGrid;
	editRow?(rowid: string, keys: boolean, oneditfunc: (this: FreeJqGrid.BodyTable, rowid: string, options: FreeJqGrid.EditRowOptions) => void, successfunc: (this: FreeJqGrid.BodyTable, jqXhr: JQueryXHR) => boolean | [boolean, any], url: string | ((this: FreeJqGrid.BodyTable, rowid: string, editOrAdd: "add" | "edit", postData: any, options: FreeJqGrid.SaveRowOptions) => string), extraparam: Object, aftersavefunc: (this: FreeJqGrid.BodyTable, rowid: string, jqXhr: JQueryXHR, postData: any, options: FreeJqGrid.SaveRowOptions) => void, errorfunc: (this: FreeJqGrid.BodyTable, rowid: string, jqXhr: JQueryXHR, textStatus: string, errorThrown: string) => void, afterrestorefunc: (this: FreeJqGrid.BodyTable, rowid: string) => void, beforeEditRow: (this: FreeJqGrid.BodyTable, options: FreeJqGrid.EditRowOptions, rowid: string) => FreeJqGrid.BooleanFeedbackValues): FreeJqGrid.JQueryJqGrid;
	inlineNav?(pagerIdSelector: string, options?: FreeJqGrid.InlineNavOptions): FreeJqGrid.JQueryJqGrid;
	inlineNav?(options?: FreeJqGrid.InlineNavOptions): FreeJqGrid.JQueryJqGrid;
	saveRow?(rowid: string, options: FreeJqGrid.SaveRowOptions): FreeJqGrid.JQueryJqGrid;
	saveRow?(rowid: string, successfunc: (this: FreeJqGrid.BodyTable, jqXhr: JQueryXHR) => boolean | [boolean, any], url: string | ((this: FreeJqGrid.BodyTable, rowid: string, editOrAdd: "add" | "edit", postData: any, options: FreeJqGrid.SaveRowOptions) => string), extraparam: Object, aftersavefunc: (this: FreeJqGrid.BodyTable, rowid: string, jqXhr: JQueryXHR, postData: any, options: FreeJqGrid.SaveRowOptions) => void, errorfunc: (this: FreeJqGrid.BodyTable, rowid: string, jqXhr: JQueryXHR, textStatus: string, errorThrown: string) => void, afterrestorefunc: (this: FreeJqGrid.BodyTable, rowid: string) => void, beforeSaveRow: (this: FreeJqGrid.BodyTable, options: FreeJqGrid.EditRowOptions, rowid: string, editOrAdd: "add" | "edit") => FreeJqGrid.BooleanFeedbackValues): FreeJqGrid.JQueryJqGrid;
	showAddEditButtons?(isEditing: boolean): FreeJqGrid.JQueryJqGrid;
	restoreRow?(rowid: string, options: FreeJqGrid.RestoreRowOptions): FreeJqGrid.JQueryJqGrid;
	restoreRow?(rowid: string, afterrestorefunc: (this: FreeJqGrid.BodyTable, rowid: string) => void): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "addRow", options: FreeJqGrid.AddRowOptions): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "editRow", rowid: string, options: FreeJqGrid.EditRowOptions): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "editRow", rowid: string, keys: boolean, oneditfunc: (this: FreeJqGrid.BodyTable, rowid: string, options: FreeJqGrid.EditRowOptions) => void, successfunc: (this: FreeJqGrid.BodyTable, jqXhr: JQueryXHR) => boolean | [boolean, any], url: string | ((this: FreeJqGrid.BodyTable, rowid: string, editOrAdd: "add" | "edit", postData: any, options: FreeJqGrid.SaveRowOptions) => string), extraparam: Object, aftersavefunc: (this: FreeJqGrid.BodyTable, rowid: string, jqXhr: JQueryXHR, postData: any, options: FreeJqGrid.SaveRowOptions) => void, errorfunc: (this: FreeJqGrid.BodyTable, rowid: string, jqXhr: JQueryXHR, textStatus: string, errorThrown: string) => void, afterrestorefunc: (this: FreeJqGrid.BodyTable, rowid: string) => void, beforeEditRow: (this: FreeJqGrid.BodyTable, options: FreeJqGrid.EditRowOptions, rowid: string) => FreeJqGrid.BooleanFeedbackValues): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "inlineNav", pagerIdSelector: string, options?: FreeJqGrid.InlineNavOptions): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "inlineNav", options?: FreeJqGrid.InlineNavOptions): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "saveRow", rowid: string, options: FreeJqGrid.SaveRowOptions): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "saveRow", rowid: string, successfunc: (this: FreeJqGrid.BodyTable, jqXhr: JQueryXHR) => boolean | [boolean, any], url: string | ((this: FreeJqGrid.BodyTable, rowid: string, editOrAdd: "add" | "edit", postData: any, options: FreeJqGrid.SaveRowOptions) => string), extraparam: Object, aftersavefunc: (this: FreeJqGrid.BodyTable, rowid: string, jqXhr: JQueryXHR | boolean, postData: any, options: FreeJqGrid.SaveRowOptions) => void, errorfunc: (this: FreeJqGrid.BodyTable, rowid: string, jqXhr: JQueryXHR, textStatus: string, errorThrown: string) => void, afterrestorefunc: (this: FreeJqGrid.BodyTable, rowid: string) => void, beforeSaveRow: (this: FreeJqGrid.BodyTable, options: FreeJqGrid.EditRowOptions, rowid: string, editOrAdd: "add" | "edit") => FreeJqGrid.BooleanFeedbackValues): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "showAddEditButtons", isEditing?: boolean): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "restoreRow", rowid: string, options: FreeJqGrid.RestoreRowOptions): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "restoreRow", rowid: string, afterrestorefunc: (this: FreeJqGrid.BodyTable, rowid: string) => void): FreeJqGrid.JQueryJqGrid;

	// grid.celledit
	editCell?(iRow: number, iCol: number, ed?: boolean): FreeJqGrid.JQueryJqGrid;
	getChangedCells?(method: "all" | "dirty"): string[];
	GridNav?(): FreeJqGrid.JQueryJqGrid;
	nextCell?(iRow: number, iCol: number): FreeJqGrid.JQueryJqGrid;
	prevCell?(iRow: number, iCol: number): FreeJqGrid.JQueryJqGrid;
	restoreCell?(iRow: number, iCol: number): FreeJqGrid.JQueryJqGrid;
	saveCell?(iRow: number, iCol: number): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "editCell", iRow: number, iCol: number, ed?: boolean): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "getChangedCells", method: "all" | "dirty"): string[];
	jqGrid(methodName: "GridNav"): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "nextCell", iRow: number, iCol: number): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "prevCell", iRow: number, iCol: number): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "restoreCell", iRow: number, iCol: number): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "saveCell", iRow: number, iCol: number): FreeJqGrid.JQueryJqGrid;

	// grid.subgrid module
	addSubGrid?(iCol: number, iRow?: number): FreeJqGrid.JQueryJqGrid;
	addSubGridCell?(iCol: number, iRow: number, rowid: string, item: Object): string;
	collapseSubGridRow?(rowid: string): FreeJqGrid.JQueryJqGrid;
	expandSubGridRow?(rowid: string): FreeJqGrid.JQueryJqGrid;
	setSubGrid?(): FreeJqGrid.JQueryJqGrid;
	toggleSubGridRow?(rowid: string): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "addSubGrid", iCol: number, iRow?: number): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "addSubGridCell", iCol: number, iRow: number, rowid: string, item: Object): string;
	jqGrid(methodName: "collapseSubGridRow", rowid: string): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "expandSubGridRow", rowid: string): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "setSubGrid"): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "toggleSubGridRow", rowid: string): FreeJqGrid.JQueryJqGrid;

	// grid.treegrid module
	setTreeNode?(): FreeJqGrid.JQueryJqGrid;
	setTreeGrid?(): FreeJqGrid.JQueryJqGrid;
	expandRow?(item: Object): FreeJqGrid.JQueryJqGrid;
	collapseRow?(item: Object): FreeJqGrid.JQueryJqGrid;
	getRootNodes?(): Object[];
	getNodeDepth?(item: Object): number;
	getNodeParent?(item: Object): Object;
	getNodeChildren?(item: Object): Object[];
	getFullTreeNode?(item: Object): Object[];
	getNodeAncestors?(item: Object): Object[];
	isVisibleNode?(item: Object): boolean;
	isNodeLoaded?(item: Object): boolean;
	expandNode?(item: Object): FreeJqGrid.JQueryJqGrid;
	collapseNode?(item: Object): FreeJqGrid.JQueryJqGrid;
	SortTree?(sortname: string, newDir: "a" | "asc" | "ascending" | "d" | "desc" | "descending", st: "text" | "int" | "integer" | "float" | "number" | "currency" | "numeric" | "date" | "datetime" | ((value: string) => string), datefmt: string): FreeJqGrid.JQueryJqGrid;
	collectChildrenSortTree?(items: Object[], item: Object, sortname: string, newDir: "a" | "asc" | "ascending" | "d" | "desc" | "descending", st: "text" | "int" | "integer" | "float" | "number" | "currency" | "numeric" | "date" | "datetime" | ((value: string) => string), datefmt: string): FreeJqGrid.JQueryJqGrid;
	setTreeRow?(rowid: string, item: Object): boolean;
	delTreeNode?(rowid: string, skipSelf?: boolean): FreeJqGrid.JQueryJqGrid;
	addChildNode?(nodeid: string, parentid: string, item: Object, expandData?: boolean): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "setTreeNode"): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "setTreeGrid"): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "expandRow", item: Object): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "collapseRow", item: Object): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "getRootNodes"): Object[];
	jqGrid(methodName: "getNodeDepth", item: Object): number;
	jqGrid(methodName: "getNodeParent", item: Object): Object;
	jqGrid(methodName: "getNodeChildren", item: Object): Object[];
	jqGrid(methodName: "getFullTreeNode", item: Object): Object[];
	jqGrid(methodName: "getNodeAncestors", item: Object): Object[];
	jqGrid(methodName: "isVisibleNode", item: Object): boolean;
	jqGrid(methodName: "isNodeLoaded", item: Object): boolean;
	jqGrid(methodName: "expandNode", item: Object): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "collapseNode", item: Object): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "SortTree", sortname: string, newDir: "a" | "asc" | "ascending" | "d" | "desc" | "descending", st: "text" | "int" | "integer" | "float" | "number" | "currency" | "numeric" | "date" | "datetime" | ((value: string) => string), datefmt: string): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "collectChildrenSortTree", items: Object[], item: Object, sortname: string, newDir: "a" | "asc" | "ascending" | "d" | "desc" | "descending", st: "text" | "int" | "integer" | "float" | "number" | "currency" | "numeric" | "date" | "datetime" | ((value: string) => string), datefmt: string): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "setTreeRow", rowid: string, item: Object): boolean;
	jqGrid(methodName: "delTreeNode", rowid: string, skipSelf?: boolean): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "addChildNode", nodeid: string, parentid: string, item: Object, expandData?: boolean): FreeJqGrid.JQueryJqGrid;

	// grid.import module
	jqGridImport?(options: FreeJqGrid.JqGridImportOptions): FreeJqGrid.JQueryJqGrid;
	jqGridExport?(options?: { exptype?: "xmlstring" | "jsonstring", root?: "grid" | string, ident?: "\t" | string }): string;
	excelExport?(options?: { exptype?: "remote" | string, url?: null | string, oper?: "oper" | string, tag?: "excel" | string, exportOptions?: Object }): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "jqGridImport", options: FreeJqGrid.JqGridImportOptions): FreeJqGrid.JQueryJqGrid;
	jqGrid(methodName: "jqGridExport", options?: { exptype?: "xmlstring" | "jsonstring", root?: "grid" | string, ident?: "\t" | string }): string;
	jqGrid(methodName: "excelExport", options?: { exptype?: "remote" | string, url?: null | string, oper?: "oper" | string, tag?: "excel" | string, exportOptions?: Object }): FreeJqGrid.JQueryJqGrid;

	// grid.filter module: jqFilter
	jqFilter(options: FreeJqGrid.JqFilterOptions): JQuery;
	jqFilter(methodName: "toSQLString"): string;
	jqFilter(methodName: "filterData"): string;
	jqFilter(methodName: "getParameter", name: string): any;
	jqFilter(methodName: "toSQLString"): string;
	jqFilter(methodName: "resetFilter"): JQuery;
	jqFilter(methodName: "addFilter", filter: string | FreeJqGrid.Filter): void;

	// jqmodal module: jqModal
	jqm(options: FreeJqGrid.JqModalOptions): JQuery;
	jqmAddClose(trigger: Element | string | JQuery): JQuery;
	jqmAddTrigger(trigger: Element | string | JQuery): JQuery;
	jqmShow(trigger: Element | string | JQuery): JQuery;
	jqmHide(trigger: Element | string | JQuery): JQuery;

	// jqdnr module: jqDnR - Minimalistic Drag'n'Resize for jQuery
	jqDrag(handle: Element | string | JQuery): JQuery;
	jqResize(handle: Element | string | JQuery, alsoResize: Element | string | JQuery): JQuery;

	// jqGrid events
	on(eventName: "jqGridAfterAddRow", handler: (eventObject: JQueryEventObject, options: { rowid: string, inputData: Object | Object[], position: FreeJqGrid.AddRowDataPosition, srcRowid?: string, iRow: number, tr: HTMLTableRowElement, localData?: Object, iData?: number }) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridAfterChangeRowid", handler: (ventObject: JQueryEventObject, options: { rowid: string, oldRowid: string, iRow: number, tr: HTMLTableRowElement }) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridAfterDelRow", handler: (eventObject: JQueryEventObject, rowid: string) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridAfterInsertRow", handler: (eventObject: JQueryEventObject, rowid: string, item: { [cmOrPropName: string]: any }, srcItem: any) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridAfterLoadComplete", handler: (eventObject: JQueryEventObject, data: any) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridAfterSetRow", handler: (eventObject: JQueryEventObject, options: { rowid: string, inputData: Object | Object[], iRow?: number, localData?: Object, iData?: number, tr: HTMLTableRowElement, cssProp: string | Object }) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridAfterResizeDblClick", handler: (eventObject: JQueryEventObject, options: { iCol: number, cm: FreeJqGrid.ColumnModel, cmName: string }) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridBeforeInitGrid", handler: (eventObject: JQueryEventObject) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridBeforeProcessing", handler: (eventObject: JQueryEventObject, data: any, textStatus: string, jqXhr: JQueryXHR) => FreeJqGrid.BooleanFeedbackValues): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridBeforeRequest", handler: (eventObject: JQueryEventObject) => FreeJqGrid.BooleanFeedbackValues): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridBeforeSelectRow", handler: (eventObject: JQueryEventObject, rowid: string, orgEventObject: JQueryEventObject) => FreeJqGrid.BooleanFeedbackValues): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridGridComplete", handler: (eventObject: JQueryEventObject) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridLoadBeforeSend", handler: (eventObject: JQueryEventObject, jqXhr: JQueryXHR, settings: JQueryAjaxSettings) => FreeJqGrid.BooleanFeedbackValues): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridLoadComplete", handler: (eventObject: JQueryEventObject, data: any) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridDblClickRow", handler: (eventObject: JQueryEventObject, rowid: string, iRow: number, iCol: number, orgEventObject: JQueryEventObject) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridHeaderClick", handler: (eventObject: JQueryEventObject, gridState: "visible" | "hidden", orgEventObject: JQueryEventObject) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridInitGrid", handler: (eventObject: JQueryEventObject) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridPaging", handler: (eventObject: JQueryEventObject, source: "records" | "user" | "first" | "prev" | "next" | "last", options: { newPage: number, currentPage: number, lastPage: number, currentRowNum: number, newRowNum: number }) => FreeJqGrid.BooleanFeedbackValues): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridRightClickRow", handler: (eventObject: JQueryEventObject, rowid: string, iRow: number, iCol: number, orgEventObject: JQueryEventObject) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridSelectAll", handler: (eventObject: JQueryEventObject, rowids: string[], toCheck: boolean) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridSelectRow", handler: (eventObject: JQueryEventObject, rowid: string, state: boolean, orgEventObject: JQueryEventObject) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridSerializeGridData", handler: (eventObject: JQueryEventObject, postdata: Object) => Object | string): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridShowHideCol", handler: (eventObject: JQueryEventObject, show: boolean | "none" | "", cmName: string, iCol: number, options: FreeJqGrid.ShowHideColOptions) => void): FreeJqGrid.JQueryJqGrid;	
	on(eventName: "jqGridSortCol", handler: (eventObject: JQueryEventObject, cmOrIndexName: string, iCol: number, sortOrder: string, orgEventObject?: JQueryEventObject) => FreeJqGrid.BooleanFeedbackValues): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridRemapColumns", handler: (eventObject: JQueryEventObject, permutation: number[], updateCells?: boolean, keepHeader?: boolean) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridResizeDblClick", handler: (eventObject: JQueryEventObject, iCol: number, cm: FreeJqGrid.ColumnModel, orgEventObject: JQueryEventObject) => FreeJqGrid.BooleanFeedbackValues): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridResizeStart", handler: (eventObject: JQueryEventObject, orgEventObject: JQueryEventObject, iCol: number) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridResizeStop", handler: (eventObject: JQueryEventObject, newWidth: number, iCol: number) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridResetFrozenHeights", handler: (eventObject: JQueryEventObject, options: FreeJqGrid.ResetFrozenHeightsOptions) => void): FreeJqGrid.JQueryJqGrid;

	// grouping event
	on(eventName: "jqGridGroupingClickGroup", handler: (eventObject: JQueryEventObject, hid: string, collapsed: boolean) => void): FreeJqGrid.JQueryJqGrid;

	// form editing events
	on(eventName: "jqGridAddEditAfterClickPgButtons", handler: (eventObject: JQueryEventObject, whichButton: "next" | "prev", $form: JQuery, rowid: string) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridAddEditAfterComplete", handler: (eventObject: JQueryEventObject, jqXhr: JQueryXHR, postdata: Object | string, $form: JQuery, editOrAdd: "edit" | "add") => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridAddEditAfterShowForm", handler: (eventObject: JQueryEventObject, $form: JQuery, editOrAdd: "edit" | "add") => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridAddEditAfterSubmit", handler: (eventObject: JQueryEventObject, jqXhr: JQueryXHR, postdata: Object | string, editOrAdd: "edit" | "add") => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridAddEditBeforeCheckValues", handler: (eventObject: JQueryEventObject, postdata: Object | string, $form: JQuery, editOrAdd: "edit" | "add") => Object | void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridAddEditBeforeInitData", handler: (eventObject: JQueryEventObject, $form: JQuery, editOrAdd: "edit" | "add") => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridAddEditBeforeShowForm", handler: (eventObject: JQueryEventObject, $form: JQuery, editOrAdd: "edit" | "add") => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridAddEditBeforeSubmit", handler: (eventObject: JQueryEventObject, postdata: Object | string, $form: JQuery, editOrAdd: "edit" | "add") =>  [true] | [true, any] | true | null | undefined | [false, string]): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridAddEditClickPgButtons", handler: (eventObject: JQueryEventObject, whichButton: "next" | "prev", $form: JQuery, rowid: string) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridAddEditClickSubmit", handler: (eventObject: JQueryEventObject, options: FreeJqGrid.FormEditingOptions, postdata: Object | string, editOrAdd: "edit" | "add") => Object | string): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridAddEditInitializeForm", handler: (eventObject: JQueryEventObject, $form: JQuery, editOrAdd: "edit" | "add") => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridAddEditSerializeEditData", handler: (eventObject: JQueryEventObject, postdata: Object) => Object | string): FreeJqGrid.JQueryJqGrid;

	// form view events
	on(eventName: "jqGridViewBeforeInitData", handler: (eventObject: JQueryEventObject, $form: JQuery) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridViewBeforeShowForm", handler: (eventObject: JQueryEventObject, $form: JQuery) => void): FreeJqGrid.JQueryJqGrid;

	// form deleting events
	on(eventName: "jqGridDeleteAfterShowForm", handler: (eventObject: JQueryEventObject, $form: JQuery) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridDeleteAfterComplete", handler: (eventObject: JQueryEventObject, jqXhr: JQueryXHR, postdata: Object | string, $form: JQuery, rowids: string[]) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridDeleteBeforeInitData", handler: (eventObject: JQueryEventObject, $form: JQuery) => FreeJqGrid.BooleanFeedbackValues): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridDeleteBeforeShowForm", handler: (eventObject: JQueryEventObject, $form: JQuery) => void): FreeJqGrid.JQueryJqGrid;

	// searching form
	on(eventName: "jqGridFilterAfterChange", handler: (eventObject: JQueryEventObject, $form: JQuery, options: FreeJqGrid.SearchingDialogOptions, filterOptions: FreeJqGrid.JqFilterOptions, searchFilterDiv: FreeJqGrid.JqFilterDiv) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridFilterAfterShow", handler: (eventObject: JQueryEventObject, $form: JQuery) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridFilterInitialize", handler: (eventObject: JQueryEventObject, $form: JQuery) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridFilterBeforeShow", handler: (eventObject: JQueryEventObject, $form: JQuery) => FreeJqGrid.BooleanFeedbackValues): FreeJqGrid.JQueryJqGrid;

	// inline editing events
	on(eventName: "jqGridInlineBeforeAddRow", handler: (eventObject: JQueryEventObject, options: FreeJqGrid.AddRowOptions) => FreeJqGrid.BooleanFeedbackValues): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridInlineBeforeCancelRow", handler: (eventObject: JQueryEventObject, options: FreeJqGrid.RestoreRowOptions, rowid: string) => FreeJqGrid.BooleanFeedbackValues): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridInlineBeforeEditRow", handler: (eventObject: JQueryEventObject, options: FreeJqGrid.EditRowOptions, rowid: string) => FreeJqGrid.BooleanFeedbackValues): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridInlineBeforeSaveRow", handler: (eventObject: JQueryEventObject, options: FreeJqGrid.EditRowOptions, rowid: string, editOrAdd: "add" | "edit") => FreeJqGrid.BooleanFeedbackValues): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridInlineAfterRestoreRow", handler: (eventObject: JQueryEventObject, rowid: string) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridInlineEditRow", handler: (eventObject: JQueryEventObject, rowid: string, options: FreeJqGrid.EditRowOptions) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridInlineSaveRowValidation", handler: (eventObject: JQueryEventObject, options: { options: FreeJqGrid.SaveRowOptions, rowid: string, tr: HTMLTableRowElement, iRow: string, savedRow: any, newData: any, mode: "add" | "edit" }) => FreeJqGrid.BooleanFeedbackValues): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridInlineAfterSaveRow", handler: (eventObject: JQueryEventObject, rowid: string, jqXhr: JQueryXHR, postData: any, options: FreeJqGrid.SaveRowOptions) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridInlineSerializeSaveData", handler: (eventObject: JQueryEventObject, postdata: Object) => Object | string): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridInlineSuccessSaveRow", handler: (eventObject: JQueryEventObject, jqXhr: JQueryXHR, rowid: string, options: FreeJqGrid.SaveRowOptions) => boolean | [boolean, any]): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridInlineErrorSaveRow", handler: (eventObject: JQueryEventObject, rowid: string, jqXhr: JQueryXHR, textStatus: string, errorThrown: string, options: FreeJqGrid.SaveRowOptions) => void): FreeJqGrid.JQueryJqGrid;

	// cell editing events
	on(eventName: "jqGridBeforeEditCell", handler: (eventObject: JQueryEventObject, rowid: string, cmName: string, data: string, iRow: number, iCol: number) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridAfterEditCell", handler: (eventObject: JQueryEventObject, rowid: string, cmName: string, data: string, iRow: number, iCol: number) => void): FreeJqGrid.JQueryJqGrid;

	// subgrid events
	on(eventName: "jqGridSerializeSubGridData", handler: (eventObject: JQueryEventObject, postdata: Object) => Object | string): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridSubGridBeforeCollapse", handler: (eventObject: JQueryEventObject, subgridDivId: string, rowid: string) => FreeJqGrid.BooleanFeedbackValues): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridSubGridBeforeExpand", handler: (eventObject: JQueryEventObject, subgridDivId: string, rowid: string) => FreeJqGrid.BooleanFeedbackValues): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridSubGridRowExpanded", handler: (eventObject: JQueryEventObject, subgridDivId: string, rowid: string) => void): FreeJqGrid.JQueryJqGrid;

	// TreeGrid events
	on(eventName: "jqGridTreeGridAfterCollapseNode", handler: (eventObject: JQueryEventObject, options: { rowid: string, item: Object }) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridTreeGridAfterCollapseRow", handler: (eventObject: JQueryEventObject, options: { rowid: string, item: Object }) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridTreeGridAfterExpandNode", handler: (eventObject: JQueryEventObject, options: { rowid: string, item: Object }) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridTreeGridAfterExpandRow", handler: (eventObject: JQueryEventObject, options: { rowid: string, item: Object }) => void): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridTreeGridBeforeCollapseNode", handler: (eventObject: JQueryEventObject, options: { rowid: string, item: Object }) => FreeJqGrid.BooleanFeedbackValues): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridTreeGridBeforeCollapseRow", handler: (eventObject: JQueryEventObject, options: { rowid: string, item: Object }) => FreeJqGrid.BooleanFeedbackValues): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridTreeGridBeforeExpandNode", handler: (eventObject: JQueryEventObject, options: { rowid: string, item: Object }) => FreeJqGrid.BooleanFeedbackValues): FreeJqGrid.JQueryJqGrid;
	on(eventName: "jqGridTreeGridBeforeExpandRow", handler: (eventObject: JQueryEventObject, options: { rowid: string, item: Object }) => FreeJqGrid.BooleanFeedbackValues): FreeJqGrid.JQueryJqGrid;
}
