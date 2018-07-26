/*global module,require*/
module.exports = function (grunt) {
	grunt.initConfig({
		pkgFreejqGrid: grunt.file.readJSON("package.json"),
		clean: [
			"css/*.min.css",
			"css/*.min.css.map",
			"js/jquery.jqgrid.min.js",
			"js/jquery.jqgrid.min.map",
			"js/jquery.jqgrid.min.js.map",
			"js/jquery.jqgrid.src.js",
			"js/i18n/min/",
			"js/min/",
			"plugins/min/",
			"dist/",
			"plugins/*.min.js",
			"plugins/css/*.min.css",
			"plugins/css/*.min.css.map",
			"plugins/*.min.map",
			"ts/tests/*.js",
			"ts/tests/*.map",
			"js/i18n/grid.locale-*.min.js",
			"js/i18n/grid.locale-*.min.map",
			"js/i18n/grid.locale-*.min.js",
			"js/i18n/grid.locale-*.min.map"
		],
		copy: {
			main: {
				files: [
					{
						src: ["js/i18n/*"],
						dest: "dist/i18n/",
						//timestamp: true,
						expand: true,
						filter: "isFile",
						flatten: true
					},
					{
						src: ["js/i18n/min/*"],
						dest: "dist/i18n/min/",
						//timestamp: true,
						expand: true,
						filter: "isFile",
						flatten: true
					},
					{
						src: ["plugins/*"],
						dest: "dist/plugins/",
						//timestamp: true,
						expand: true,
						filter: "isFile",
						flatten: true
					},
					{
						src: ["plugins/min/*"],
						dest: "dist/plugins/min/",
						//timestamp: true,
						expand: true,
						filter: "isFile",
						flatten: true
					},
					{
						src: ["plugins/css/*"],
						dest: "dist/plugins/css/",
						//timestamp: true,
						expand: true,
						filter: "isFile",
						flatten: true
					},
					{
						src: ["css/*"],
						dest: "dist/css/",
						//timestamp: true,
						expand: true,
						filter: "isFile",
						flatten: true
					},
					{
						src: ["ts/*.d.ts"],
						dest: "dist/ts/",
						//timestamp: true,
						expand: true,
						filter: "isFile",
						flatten: true
					},
					{
						src: ["js/jquery.jqgrid.src.js", "js/jquery.jqgrid.min.js", "js/jquery.jqgrid.min*.map"],
						dest: "dist/",
						expand: true,
						flatten: true
					},
					{
						src: [
							"js/*.js",
							"!js/min/*",
							"!js/jquery.jqgrid.*.js",
							"!js/jquery.jqgrid.min*.map"
						],
						dest: "dist/modules/",
						//timestamp: true,
						expand: true,
						filter: "isFile",
						flatten: true
					},
					{
						src: [
							"js/min/*"
						],
						dest: "dist/modules/min/",
						//timestamp: true,
						expand: true,
						filter: "isFile",
						flatten: true
					}
				]
			}
		},
		concat: {
			all: {
				options: {
					process: function (src, filepath) {
						// see https://github.com/gruntjs/grunt-contrib-concat#custom-process-function
						grunt.verbose.writeln("concat begin process the file " + filepath);
						// the below code is tested with Windows encoding of the files CRLF (\r\n for new line),
						// but it work with UNIX encoding LF (\n for new line) too.
						// One should modify the code to support other end-line characters (Macintosh CR,
						// Unicode line separator LS and Unicode pharagraph separator PS).
						var iBeginModule = src.indexOf("// begin module "), iLicenseEnd = 0, iBeginModuleStartLine,
							iEndModule, licenseComment = "", moduleCode = "", iRowStart, iRowEnd, margin = "";
						if (iBeginModule >= 0) {
							//grunt.log.writeln("first 3 characters are: '" + src.substring(0, 3) + "'");
							if (src.substring(0, 3) === "/**") {
								iLicenseEnd = src.substring(0, iBeginModule).indexOf("*/");
							}
							iBeginModuleStartLine = src.lastIndexOf("\n", iBeginModule);
							margin = src.substring(iBeginModuleStartLine + 1, iBeginModule);
							//grunt.log.writeln("margin: '" + margin + "'");
							iBeginModule = iBeginModuleStartLine + 1;
							if (iLicenseEnd > 0) {
								iLicenseEnd = src.indexOf("\n", iLicenseEnd);
								for (iRowStart = 0; iRowStart < iLicenseEnd; iRowStart = iRowEnd + 1) {
									iRowEnd = src.indexOf("\n", iRowStart);
									licenseComment += (iRowStart + 1 !== iRowEnd ? margin : "") + src.substring(iRowStart, iRowEnd + 1);
								}
								//grunt.log.writeln("License:\n" + licenseComment);
							}
							iEndModule = src.lastIndexOf("// end module ");
							if (iEndModule >= 0) {
								iEndModule = src.indexOf("\n", iEndModule);
								moduleCode = licenseComment + src.substring(iBeginModule, iEndModule + 1);
							}
						}
						if (filepath.lastIndexOf("grid.base.js") >= 0) {
							return src.substring(0, src.indexOf("}));", iEndModule));
						}
						return moduleCode;
					},
					footer: "}));\n"
				},
				src: [
					"js/grid.base.js",
					"js/grid.celledit.js",
					"js/grid.common.js",
					"js/grid.custom.js",
					"js/grid.filter.js",
					"js/jsonxml.js",
					"js/grid.formedit.js",
					"js/grid.grouping.js",
					"js/grid.import.js",
					"js/grid.inlinedit.js",
					"js/grid.jqueryui.js",
					"js/grid.pivot.js",
					"js/grid.subgrid.js",
					"js/grid.tbltogrid.js",
					"js/grid.treegrid.js",
					"js/jqdnr.js",
					"js/jqmodal.js",
					"js/jquery.fmatter.js"
				],
				dest: "js/jquery.jqgrid.src.js"
			}
		},
		jshint: {
			all: {
				src: ["js/jquery.jqgrid.src.js"],
				options: {
					//'-W069': false
					//"-W041": false,
					"boss": true,
					"curly": true,
					"eqeqeq": true,
					"eqnull": true,
					"expr": true,
					"immed": true,
					"noarg": true,
					//"quotmark": "double",
					"undef": true,
					"unused": true,
					"node": true
				}
			}
		},
		tslint: {
			options: {
				configuration: "tslint.json",
				force: false,
				fix: false
			},
			files: {
				src: [
					"ts/free-jqgrid.d.ts",
					"ts/tests/*.ts"
				]
			}
		},
		jscs: {
			all: {
				src: ["gruntfile.js", "js/*.js", "!js/*.min.js"],
				options: {
					config: ".jscsrc"
				}
			}
		},
		ts: {
			all: {
				src: ["ts/**/*.ts"],
				options: {
					target: "es5",
					lib: ["es2015", "es2017", "dom"]
				}
			}
		},
		cssmin: {
			options: {
				// compatibility: "ie8"
				sourceMap: true,
				report: "gzip"
			},
			target: {
				files: [
					{
						src: "css/ui.jqgrid.css",
						dest: "css/ui.jqgrid.min.css"
						// "sources":["css/ui.jqgrid.css"] in ui.jqgrid.min.css.map is wrong!!!
						// one have to fix it to "sources":["ui.jqgrid.css"]
					},
					{
						src: "plugins/css/ui.multiselect.css",
						dest: "plugins/css/ui.multiselect.min.css"
						// "sources":["plugins/ui.multiselect.css"] in ui.multiselect.min.css.map is wrong!!!
						// one have to fix it to "sources":["ui.multiselect.css"]
					}
				]
			}
		},
		watch: {
			files: [
				"js/*.js",
				"plugins/*.js",
				"css/*.css",
				"plugins/*.css",
				"ts/free-jqgrid.d.ts",
				"ts/tests/*.ts",
				"!css/*.min.css",
				"!js/*.min.js",
				"!js/min/*.js",
				"!ts/*.js",
				"!ts/tests/*.js",
				"!js/jquery.jqgrid.*.js",
				"!plugins/*.min.js",
				"!plugins/*.min.css",
				"!js/i18n/grid.locale-*.min.js",
				"!dist/**",
				'!node_modules/**'
				],
			tasks: ["default"]
		},
		replace: {
			cssmin_jqgrid: {
				src: "css/ui.jqgrid.min.css.map",
				dest: "./",
				options: {
					patterns: [{
						// "sources":["css\\ui.jqgrid.css"]
						match: /\"sources\":\[\"css\\\\ui\.jqgrid\.css\"\],/,
						replacement: "\"sources\":[\"ui.jqgrid.css\"],"
					}]
				}
			},
			cssmin_multiselect: {
				src: "plugins/css/ui.multiselect.min.css.map",
				dest: "./",
				options: {
					patterns: [{
						// "sources":["plugins\\css\\ui.multiselect.css"]
						match: /\"sources\":\[\"plugins\\\\css\\\\ui\.multiselect\.css\"\],/,
						replacement: "\"sources\":[\"ui.multiselect.css\"],"
					}]
				}
			}
		},
		uglify: {
			all: {
				files: {
					"js/min/grid.base.js": ["js/grid.base.js"],
					"js/min/grid.celledit.js": ["js/grid.celledit.js"],
					"js/min/grid.common.js": ["js/grid.common.js"],
					"js/min/grid.custom.js": ["js/grid.custom.js"],
					"js/min/grid.filter.js": ["js/grid.filter.js"],
					"js/min/jsonxml.js": ["js/jsonxml.js"],
					"js/min/grid.formedit.js": ["js/grid.formedit.js"],
					"js/min/grid.grouping.js": ["js/grid.grouping.js"],
					"js/min/grid.import.js": ["js/grid.import.js"],
					"js/min/grid.inlinedit.js": ["js/grid.inlinedit.js"],
					"js/min/grid.jqueryui.js": ["js/grid.jqueryui.js"],
					"js/min/grid.pivot.js": ["js/grid.pivot.js"],
					"js/min/grid.subgrid.js": ["js/grid.subgrid.js"],
					"js/min/grid.tbltogrid.js": ["js/grid.tbltogrid.js"],
					"js/min/grid.treegrid.js": ["js/grid.treegrid.js"],
					"js/min/jqdnr.js": ["js/jqdnr.js"],
					"js/min/jqmodal.js": ["js/jqmodal.js"],
					"js/min/jquery.fmatter.js": ["js/jquery.fmatter.js"],
					"plugins/min/grid.odata.js": ["plugins/grid.odata.js"],
					"plugins/min/jquery.contextmenu-ui.js": ["plugins/jquery.contextmenu-ui.js"],
					"plugins/min/jquery.contextmenu.js": ["plugins/jquery.contextmenu.js"],
					"plugins/min/jquery.createcontexmenufromnavigatorbuttons.js": ["plugins/jquery.createcontexmenufromnavigatorbuttons.js"],
					"plugins/min/jquery.jqgrid.showhidecolumnmenu.js": ["plugins/jquery.jqgrid.showhidecolumnmenu.js"],
					"plugins/min/ui.multiselect.js": ["plugins/ui.multiselect.js"],
					"js/i18n/min/grid.locale-ar.js": ["js/i18n/grid.locale-ar.js"],
					"js/i18n/min/grid.locale-bg.js": ["js/i18n/grid.locale-bg.js"],
					"js/i18n/min/grid.locale-ca.js": ["js/i18n/grid.locale-ca.js"],
					"js/i18n/min/grid.locale-cn.js": ["js/i18n/grid.locale-cn.js"],
					"js/i18n/min/grid.locale-cs.js": ["js/i18n/grid.locale-cs.js"],
					"js/i18n/min/grid.locale-da.js": ["js/i18n/grid.locale-da.js"],
					"js/i18n/min/grid.locale-de.js": ["js/i18n/grid.locale-de.js"],
					"js/i18n/min/grid.locale-el.js": ["js/i18n/grid.locale-el.js"],
					"js/i18n/min/grid.locale-en.js": ["js/i18n/grid.locale-en.js"],
					"js/i18n/min/grid.locale-es.js": ["js/i18n/grid.locale-es.js"],
					"js/i18n/min/grid.locale-fa.js": ["js/i18n/grid.locale-fa.js"],
					"js/i18n/min/grid.locale-fi.js": ["js/i18n/grid.locale-fi.js"],
					"js/i18n/min/grid.locale-fr.js": ["js/i18n/grid.locale-fr.js"],
					"js/i18n/min/grid.locale-gl.js": ["js/i18n/grid.locale-gl.js"],
					"js/i18n/min/grid.locale-he.js": ["js/i18n/grid.locale-he.js"],
					"js/i18n/min/grid.locale-hr.js": ["js/i18n/grid.locale-hr.js"],
					"js/i18n/min/grid.locale-hu.js": ["js/i18n/grid.locale-hu.js"],
					"js/i18n/min/grid.locale-id.js": ["js/i18n/grid.locale-id.js"],
					"js/i18n/min/grid.locale-is.js": ["js/i18n/grid.locale-is.js"],
					"js/i18n/min/grid.locale-it.js": ["js/i18n/grid.locale-it.js"],
					"js/i18n/min/grid.locale-ja.js": ["js/i18n/grid.locale-ja.js"],
					"js/i18n/min/grid.locale-kr.js": ["js/i18n/grid.locale-kr.js"],
					"js/i18n/min/grid.locale-lt.js": ["js/i18n/grid.locale-lt.js"],
					"js/i18n/min/grid.locale-me.js": ["js/i18n/grid.locale-me.js"],
					"js/i18n/min/grid.locale-nl.js": ["js/i18n/grid.locale-nl.js"],
					"js/i18n/min/grid.locale-no.js": ["js/i18n/grid.locale-no.js"],
					"js/i18n/min/grid.locale-pl.js": ["js/i18n/grid.locale-pl.js"],
					"js/i18n/min/grid.locale-pt-br.js": ["js/i18n/grid.locale-pt-br.js"],
					"js/i18n/min/grid.locale-pt.js": ["js/i18n/grid.locale-pt.js"],
					"js/i18n/min/grid.locale-ro.js": ["js/i18n/grid.locale-ro.js"],
					"js/i18n/min/grid.locale-ru.js": ["js/i18n/grid.locale-ru.js"],
					"js/i18n/min/grid.locale-sk.js": ["js/i18n/grid.locale-sk.js"],
					"js/i18n/min/grid.locale-sr.js": ["js/i18n/grid.locale-sr.js"],
					"js/i18n/min/grid.locale-sv.js": ["js/i18n/grid.locale-sv.js"],
					"js/i18n/min/grid.locale-th.js": ["js/i18n/grid.locale-th.js"],
					"js/i18n/min/grid.locale-tr.js": ["js/i18n/grid.locale-tr.js"],
					"js/i18n/min/grid.locale-tw.js": ["js/i18n/grid.locale-tw.js"],
					"js/i18n/min/grid.locale-ua.js": ["js/i18n/grid.locale-ua.js"],
					"js/i18n/min/grid.locale-vi.js": ["js/i18n/grid.locale-vi.js"],
					"js/jquery.jqgrid.min.js": ["js/jquery.jqgrid.src.js"]
				},
				options: {
					output: {
						comments: "some"
					},
					sourceMap: true
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-tslint");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-replace");
	grunt.loadNpmTasks("grunt-jscs");
	grunt.loadNpmTasks("grunt-ts");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-newer");

	grunt.registerTask("default", ["newer:concat:all", "newer:jshint:all", "newer:tslint", "ts:all", "newer:jscs:all",
		"newer:cssmin:target", "newer:replace:cssmin_jqgrid", "newer:replace:cssmin_multiselect", "uglify:all",
		"copy"]);
	grunt.registerTask("all", ["clean", "default"]);
};
