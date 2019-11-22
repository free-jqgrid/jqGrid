/**
 * GPL licenses
 * Author: veto@myridia.com 
 *
 *
 * Usage example:       
 * ,onClickButton: function(err,res)
 * {
 *   jQuery(this).jqGrid("jqgrid_download",'csv');
 * }
 *
 */

/*global jQuery, define, module, require */
(function (global, factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		// AMD. Register as an anonymous module.
		define([
			"jquery",
			"./jquery.contextmenu-ui",
			"free-jqgrid/grid.base"
		], function ($) {
			return factory($, global, global.document);
		});
	} else if (typeof module === "object" && module.exports) {
		// Node/CommonJS
		module.exports = function (root, $) {
			if ($ === undefined) {
				// require("jquery") returns a factory that requires window to
				// build a jQuery instance, we normalize how we use modules
				// that require this pattern but the window provided is a noop
				// if it's defined (how jquery works)
				$ = typeof window !== "undefined" ?
						require("jquery") :
						require("jquery")(root || window);
			}
			require("./jquery.contextmenu-ui");
			require("free-jqgrid/grid.base");
			factory($, root, root.document);
			return $;
		};
	} else {
		// Browser globals
		factory(jQuery, global, global.document);
	}
}(typeof window !== "undefined" ? window : this, function ($, window, document){
    "use strict";
    $.jgrid.extend({
	jqgrid_download: function (format = 'csv', separator = ',', endline = '\n' )
        {
          format = format.toLowerCase();
          switch(format)
	  {
	    case 'csv':
              this._csv(separator, endline);
	      break;
	    default:
              alert('Format ' + format + ' is not yet supported \n Please use: csv');
	  } 
	}, 
        _csv: function(separator, endline)
          {
	    let data   = jQuery(this).jqGrid("getGridParam", "lastSelectedData");
	    let col    = jQuery(this).jqGrid("getGridParam", "colModel");
	    let rows   = [];
	    let header = [];

            for(let c in col)
            {
              header.push(col[c]['name']);
            }
            rows.push(header);
            for(let d in data)
            {
              let row = [];
              for(let c in col)
              {
               	let name = col[c]['name'];
		let col_val = data[d][name];
		if(typeof col_val === 'string')
		{
                  if(col_val.indexOf(',') > 0)
                  {
                   col_val = '"' + col_val + '"';
                  }
                  row.push(col_val);
		}
                else
		{
                  row.push('');
		}
              }
              rows.push(row);
            }

            let csv  = rows.map(e => e.join(separator)).join(endline);
            let blob = new Blob([csv],{type: 'text/csv;charset=utf-8;'});
            let uri  = URL.createObjectURL(blob);
            let link = document.createElement("a");
            link.download = jQuery(this).jqGrid("getGridParam", "caption") + '.csv';
            link.href = uri;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }

	});
}));
