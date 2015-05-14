!function(){"use strict";var a=["html","json","jsonp","script"],b=["connect","delete","get","head","options","patch","post","put","trace"],c=function f(){var a={},b={},c={url:function(a){return h.call(this,"url",a,d.string)},sync:function(a){return h.call(this,"sync",a,d.bool)},cache:function(a){return h.call(this,"cache",a,d.bool)},type:function(a){return h.call(this,"type",a,d.type)},header:function(b,c){return a.headers=a.headers||{},d.string(b),"undefined"!=typeof c?(d.string(c),a.headers[b]=c,this):a.headers[b]},auth:function(b,c){return d.string(b),d.string(c),a.auth={user:b,passwd:c},this},method:function(a){return h.call(this,"method",a,d.method)},queryString:function(a){return h.call(this,"queryString",a,d.queryString)},data:function(a){return h.call(this,"data",a,d.plainObject)},body:function(a){return h.call(this,"body",a,null,function(a){if("object"==typeof a){if(!(a instanceof FormData)){try{a=JSON.stringify(a)}catch(b){throw new TypeError("Unable to stringify body's content : "+b.name)}this.header("Content-Type","application/json")}}else a+="";return a})},into:function(a){return h.call(this,"into",a,d.selector,function(a){return"string"==typeof a?document.querySelectorAll(a):a instanceof HTMLElement?[a]:void 0})},jsonPaddingName:function(a){return h.call(this,"jsonPaddingName",a,d.string)},jsonPadding:function(a){return h.call(this,"jsonPadding",a,d.func)},on:function(a,c){return"function"==typeof c&&(b[a]=b[a]||[],b[a].push(c)),this},off:function(a){return b[a]=[],this},trigger:function(a,c){var d=this,e=function(a,c){b[a]instanceof Array&&b[a].forEach(function(a){a.call(d,c)})};if("undefined"!=typeof a){a+="";var f=/^([0-9])([0-9x])([0-9x])$/i,g=a.match(f);g&&g.length>3?Object.keys(b).forEach(function(a){var b=a.match(f);!(b&&b.length>3&&g[1]===b[1])||"x"!==b[2]&&g[2]!==b[2]||"x"!==b[3]&&g[3]!==b[3]||e(a,c)}):b[a]&&e(a,c)}return this},go:function(){var b=a.type||(a.into?"html":"json"),c=j();return"function"==typeof g[b]?g[b].call(this,c):void 0}},g={json:function(a){var b=this;g._xhr.call(this,a,function(a){if(a)try{a=JSON.parse(a)}catch(c){return b.trigger("error",c),null}return a})},html:function(b){g._xhr.call(this,b,function(b){return a.into&&a.into.length&&[].forEach.call(a.into,function(a){a.innerHTML=b}),b})},_xhr:function(b,c){var d,e,f,g,h=this,j=a.method||"get",k=a.sync!==!0,l=new XMLHttpRequest,m=a.data,n=a.body,o=(a.headers||{},this.header("Content-Type"));if(!o&&m&&i()&&(this.header("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),o=this.header("Content-Type")),m&&i())if("string"!=typeof n&&(n=""),o.indexOf("json")>-1)try{n=JSON.stringify(m)}catch(p){throw new TypeError("Unable to stringify body's content : "+p.name)}else{f=o&&o.indexOf("x-www-form-urlencoded")>1;for(d in m)n+=f?encodeURIComponent(d)+"="+encodeURIComponent(m[d])+"&":d+"="+m[d]+"\n\r"}g=[j,b,k],a.auth&&(g.push(a.auth.user),g.push(a.auth.passwd)),l.open.apply(l,g);for(e in a.headers)l.setRequestHeader(e,a.headers[e]);l.onprogress=function(a){a.lengthComputable&&h.trigger("progress",a.loaded/a.total)},l.onload=function(){var a=l.responseText;this.status>=200&&this.status<300&&("function"==typeof c&&(a=c(a)),h.trigger("success",a)),h.trigger(this.status,a),h.trigger("end",a)},l.onerror=function(a){h.trigger("error",a,arguments)},l.send(n)},jsonp:function(b){var c,d=this,g=document.querySelector("head"),h=a.sync!==!0,i=a.jsonPaddingName||"callback",j=a.jsonPadding||"_padd"+(new Date).getTime()+Math.floor(1e4*Math.random()),k={};if(f[j])throw new Error("Padding "+j+"  already exists. It must be unique.");/^ajajsonp_/.test(j)||(j="ajajsonp_"+j),window[j]=function(a){d.trigger("success",a),g.removeChild(c),window[j]=void 0},k[i]=j,b=e(b,k),c=document.createElement("script"),c.async=h,c.src=b,c.onerror=function(){d.trigger("error",arguments),g.removeChild(c),window[j]=void 0},g.appendChild(c)},script:function(b){var c,d=this,e=document.querySelector("head")||document.querySelector("body"),f=a.sync!==!0;if(!e)throw new Error("Ok, wait a second, you want to load a script, but you don't have at least a head or body tag...");c=document.createElement("script"),c.async=f,c.src=b,c.onerror=function(){d.trigger("error",arguments),e.removeChild(c)},c.onload=function(){d.trigger("success",arguments)},e.appendChild(c)}},h=function(b,c,e,f){if("undefined"!=typeof c){if("function"==typeof e)try{c=e.call(d,c)}catch(g){throw new TypeError("Failed to set "+b+" : "+g.message)}return a[b]="function"==typeof f?f.call(this,c):c,this}return"undefined"===a[b]?null:a[b]},i=function(){return["delete","patch","post","put"].indexOf(a.method)>-1},j=function(){var b=a.url,c="undefined"!=typeof a.cache?!!a.cache:!0,d=a.queryString||"",f=a.data;return c===!1&&(d+="&ajabuster="+(new Date).getTime()),b=e(b,d),f&&!i()&&(b=e(b,f)),b};return c},d={bool:function(a){return!!a},string:function(a){if("string"!=typeof a)throw new TypeError("a string is expected, but "+a+" ["+typeof a+"] given");return a},plainObject:function(a){if("object"!=typeof a||a.constructor!==Object)throw new TypeError("an object is expected, but "+a+"  ["+typeof a+"] given");return a},type:function(b){if(b=this.string(b),a.indexOf(b.toLowerCase())<0)throw new TypeError("a type in ["+a.join(", ")+"] is expected, but "+b+" given");return b.toLowerCase()},method:function(a){if(a=this.string(a),b.indexOf(a.toLowerCase())<0)throw new TypeError("a method in ["+b.join(", ")+"] is expected, but "+a+" given");return a.toLowerCase()},queryString:function(a){var b={};return"string"==typeof a?a.replace("?","").split("&").forEach(function(a){var c=a.split("=");2===c.length&&(b[decodeURIComponent(c[0])]=decodeURIComponent(c[1]))}):b=a,this.plainObject(b)},selector:function(a){if("string"!=typeof a&&!(a instanceof HTMLElement))throw new TypeError("a selector or an HTMLElement is expected, "+a+" ["+typeof a+"] given");return a},func:function(a){if(a=this.string(a),!/^([a-zA-Z_])([a-zA-Z0-9_\-])+$/.test(a))throw new TypeError("a valid function name is expected, "+a+" ["+typeof a+"] given");return a}},e=function(a,b){var c;if(a=a||"",b)if(-1===a.indexOf("?")&&(a+="?"),"string"==typeof b)a+=b;else if("object"==typeof b)for(c in b)a+="&"+encodeURIComponent(c)+"="+encodeURIComponent(b[c]);return a};"function"==typeof define&&define.amd?define([],function(){return c}):"object"==typeof exports?module.exports=c:window.aja=window.aja||c}();
(function(w,d){var atc_url="//addtocalendar.com/atc/",atc_version="1.5",b=d.documentElement;if(!Array.indexOf){Array.prototype.indexOf=function(e){for(var t=0,n=this.length;t<n;t++){if(this[t]==e){return t}}return-1}}if(!Array.prototype.map){Array.prototype.map=function(e){var t=[];for(var n=0,r=this.length;n<r;n++){t.push(e(this[n]))}return t}}var isArray=function(e){return Object.prototype.toString.call(e)==="[object Array]"};var isFunc=function(e){return Object.prototype.toString.call(e)==="[object Function]"};var ready=function(e,t){function u(){if(!n){if(!t.body)return setTimeout(u,13);n=true;if(i){var e,r=0;while(e=i[r++])e.call(null);i=null}}}function a(){if(r)return;r=true;if(t.readyState==="complete")return u();if(t.addEventListener){t.addEventListener("DOMContentLoaded",s,false);e.addEventListener("load",u,false)}else{if(t.attachEvent){t.attachEvent("onreadystatechange",s);e.attachEvent("onload",u);var n=false;try{n=e.frameElement==null}catch(i){}if(b.doScroll&&n)f()}else{o=e.onload;e.onload=function(e){o(e);u()}}}}function f(){if(n)return;try{b.doScroll("left")}catch(e){setTimeout(f,1);return}u()}var n=false,r=false,i=[],s,o;if(t.addEventListener){s=function(){t.removeEventListener("DOMContentLoaded",s,false);u()}}else{if(t.attachEvent){s=function(){if(t.readyState==="complete"){t.detachEvent("onreadystatechange",s);u()}}}}return function(e){a();if(n){e.call(null)}else{i.push(e)}}}(w,d);if(w.addtocalendar&&typeof w.addtocalendar.start=="function")return;if(!w.addtocalendar)w.addtocalendar={};addtocalendar.languages={de:"In den Kalender",en:"Add to Calendar",es:"Añadir al Calendario",fr:"Ajouter au calendrier",hi:"कैलेंडर में जोड़ें","in":"Tambahkan ke Kalender",ja:"カレンダーに追加",ko:"캘린더에 추가",pt:"Adicionar ao calendário",ru:"Добавить в календарь",uk:"Додати в календар",zh:"添加到日历"};addtocalendar.calendar_urls={};addtocalendar.loadSettings=function(element){var settings={language:"auto","show-list-on":"click",calendars:["iCalendar","Google Calendar","Outlook","Outlook Online","Yahoo! Calendar"],secure:"auto","on-button-click":function(){},"on-calendar-click":function(){}};for(var option in settings){var pname="data-"+option;var eattr=element.getAttribute(pname);if(eattr!=null){if(isArray(settings[option])){settings[option]=eattr.replace(/\s*,\s*/g,",").replace(/^\s+|\s+$/g,"").split(",");continue}if(isFunc(settings[option])){var fn=window[eattr];if(isFunc(fn)){settings[option]=fn}else{settings[option]=eval("(function(mouseEvent){"+eattr+"})")}continue}settings[option]=element.getAttribute(pname)}}return settings};addtocalendar.load=function(){ready(function(){var e={iCalendar:"ical","Google Calendar":"google",Outlook:"outlook","Outlook Online":"outlookonline","Yahoo! Calendar":"yahoo"};var t=-(new Date).getTimezoneOffset().toString();var n=addtocalendar.languages;var r=document.getElementsByTagName("*");for(var i=0;i<r.length;i++){var s=r[i].className;if(s.split(" ").indexOf("addtocalendar")!=-1){var o=addtocalendar.loadSettings(r[i]);var u=o["calendars"].length==1;var a="http:";if(o["secure"]=="auto"){a=location.protocol=="https:"?"https:":"http:"}else if(o["secure"]=="true"){a="https:"}var f=a+atc_url;var l=r[i].id;var c=n["en"];if(o["language"]=="auto"){var h="no_lang";if(typeof navigator.language==="string"){h=navigator.language.substr(0,2)}else if(typeof navigator.browserLanguage==="string"){h=navigator.browserLanguage.substr(0,2)}if(n.hasOwnProperty(h)){c=n[h]}}else if(n.hasOwnProperty(o["language"])){c=n[o["language"]]}var p=["utz="+t,"uln="+navigator.language,"vjs="+atc_version];var d=r[i].getElementsByTagName("var");var v=-1;for(var m=0;m<d.length;m++){var g=d[m].className.replace("atc_","");var y=d[m].innerHTML;if(g=="event"){v++;continue}if(g==d[m].className){if(g=="atc-body"){c=y}continue}if(v==-1){continue}p.push("e["+v+"]["+g+"]"+"="+encodeURIComponent(y))}var b=l==""?"":l+"_link";var w=document.createElement("ul");w.className="atcb-list";var E="";var S="";for(var x in o["calendars"]){if(!e.hasOwnProperty(o["calendars"][x])){continue}var T=e[o["calendars"][x]];var N=l==""?"":'id="'+l+"_"+T+'_link"';var C=f+T+"?"+p.join("&");if(u){S=C}else{E+='<li class="atcb-item"><a '+N+' class="atcb-item-link" href="'+C+'" target="_blank">'+o["calendars"][x]+"</a></li>"}}w.innerHTML=E;if(r[i].getElementsByClassName("atcb-link")[0]==undefined){var k=document.createElement("a");k.className="atcb-link";k.innerHTML=c;k.id=b;k.tabIndex="-1";if(u){k.href=S;k.target="_blank"}r[i].appendChild(k);if(!u){r[i].appendChild(w)}}else{var k=r[i].getElementsByClassName("atcb-link")[0];if(!u){k.parentNode.appendChild(w)}k.tabIndex="-1";if(k.id==""){k.id=b}if(u){k.href=S;k.target="_blank"}}r[i].getElementsByClassName("atcb-link")[0].addEventListener("click",o["on-button-click"],false);var L=r[i].getElementsByClassName("atcb-item-link");for(var m=0;m<L.length;m++){L[m].addEventListener("click",o["on-calendar-click"],false)}}}})};addtocalendar.load()})(window,document)

/*!

 handlebars v3.0.3

Copyright (C) 2011-2014 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
!function(a,b){"object"==typeof exports&&"object"==typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):"object"==typeof exports?exports.Handlebars=b():a.Handlebars=b()}(this,function(){return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={exports:{},id:d,loaded:!1};return a[d].call(e.exports,e,e.exports,b),e.loaded=!0,e.exports}var c={};return b.m=a,b.c=c,b.p="",b(0)}([function(a,b,c){"use strict";function d(){var a=r();return a.compile=function(b,c){return k.compile(b,c,a)},a.precompile=function(b,c){return k.precompile(b,c,a)},a.AST=i["default"],a.Compiler=k.Compiler,a.JavaScriptCompiler=m["default"],a.Parser=j.parser,a.parse=j.parse,a}var e=c(8)["default"];b.__esModule=!0;var f=c(1),g=e(f),h=c(2),i=e(h),j=c(3),k=c(4),l=c(5),m=e(l),n=c(6),o=e(n),p=c(7),q=e(p),r=g["default"].create,s=d();s.create=d,q["default"](s),s.Visitor=o["default"],s["default"]=s,b["default"]=s,a.exports=b["default"]},function(a,b,c){"use strict";function d(){var a=new g.HandlebarsEnvironment;return m.extend(a,g),a.SafeString=i["default"],a.Exception=k["default"],a.Utils=m,a.escapeExpression=m.escapeExpression,a.VM=o,a.template=function(b){return o.template(b,a)},a}var e=c(8)["default"];b.__esModule=!0;var f=c(9),g=e(f),h=c(10),i=e(h),j=c(11),k=e(j),l=c(12),m=e(l),n=c(13),o=e(n),p=c(7),q=e(p),r=d();r.create=d,q["default"](r),r["default"]=r,b["default"]=r,a.exports=b["default"]},function(a,b){"use strict";b.__esModule=!0;var c={Program:function(a,b,c,d){this.loc=d,this.type="Program",this.body=a,this.blockParams=b,this.strip=c},MustacheStatement:function(a,b,c,d,e,f){this.loc=f,this.type="MustacheStatement",this.path=a,this.params=b||[],this.hash=c,this.escaped=d,this.strip=e},BlockStatement:function(a,b,c,d,e,f,g,h,i){this.loc=i,this.type="BlockStatement",this.path=a,this.params=b||[],this.hash=c,this.program=d,this.inverse=e,this.openStrip=f,this.inverseStrip=g,this.closeStrip=h},PartialStatement:function(a,b,c,d,e){this.loc=e,this.type="PartialStatement",this.name=a,this.params=b||[],this.hash=c,this.indent="",this.strip=d},ContentStatement:function(a,b){this.loc=b,this.type="ContentStatement",this.original=this.value=a},CommentStatement:function(a,b,c){this.loc=c,this.type="CommentStatement",this.value=a,this.strip=b},SubExpression:function(a,b,c,d){this.loc=d,this.type="SubExpression",this.path=a,this.params=b||[],this.hash=c},PathExpression:function(a,b,c,d,e){this.loc=e,this.type="PathExpression",this.data=a,this.original=d,this.parts=c,this.depth=b},StringLiteral:function(a,b){this.loc=b,this.type="StringLiteral",this.original=this.value=a},NumberLiteral:function(a,b){this.loc=b,this.type="NumberLiteral",this.original=this.value=Number(a)},BooleanLiteral:function(a,b){this.loc=b,this.type="BooleanLiteral",this.original=this.value="true"===a},UndefinedLiteral:function(a){this.loc=a,this.type="UndefinedLiteral",this.original=this.value=void 0},NullLiteral:function(a){this.loc=a,this.type="NullLiteral",this.original=this.value=null},Hash:function(a,b){this.loc=b,this.type="Hash",this.pairs=a},HashPair:function(a,b,c){this.loc=c,this.type="HashPair",this.key=a,this.value=b},helpers:{helperExpression:function(a){return!("SubExpression"!==a.type&&!a.params.length&&!a.hash)},scopedId:function(a){return/^\.|this\b/.test(a.original)},simpleId:function(a){return 1===a.parts.length&&!c.helpers.scopedId(a)&&!a.depth}}};b["default"]=c,a.exports=b["default"]},function(a,b,c){"use strict";function d(a,b){if("Program"===a.type)return a;g["default"].yy=o,o.locInfo=function(a){return new o.SourceLocation(b&&b.srcName,a)};var c=new k["default"];return c.accept(g["default"].parse(a))}var e=c(8)["default"];b.__esModule=!0,b.parse=d;var f=c(14),g=e(f),h=c(2),i=e(h),j=c(15),k=e(j),l=c(16),m=e(l),n=c(12);b.parser=g["default"];var o={};n.extend(o,m,i["default"])},function(a,b,c){"use strict";function d(){}function e(a,b,c){if(null==a||"string"!=typeof a&&"Program"!==a.type)throw new k["default"]("You must pass a string or Handlebars AST to Handlebars.precompile. You passed "+a);b=b||{},"data"in b||(b.data=!0),b.compat&&(b.useDepths=!0);var d=c.parse(a,b),e=(new c.Compiler).compile(d,b);return(new c.JavaScriptCompiler).compile(e,b)}function f(a,b,c){function d(){var b=c.parse(a,f),d=(new c.Compiler).compile(b,f),e=(new c.JavaScriptCompiler).compile(d,f,void 0,!0);return c.template(e)}function e(a,b){return g||(g=d()),g.call(this,a,b)}var f=void 0===arguments[1]?{}:arguments[1];if(null==a||"string"!=typeof a&&"Program"!==a.type)throw new k["default"]("You must pass a string or Handlebars AST to Handlebars.compile. You passed "+a);"data"in f||(f.data=!0),f.compat&&(f.useDepths=!0);var g=void 0;return e._setup=function(a){return g||(g=d()),g._setup(a)},e._child=function(a,b,c,e){return g||(g=d()),g._child(a,b,c,e)},e}function g(a,b){if(a===b)return!0;if(l.isArray(a)&&l.isArray(b)&&a.length===b.length){for(var c=0;c<a.length;c++)if(!g(a[c],b[c]))return!1;return!0}}function h(a){if(!a.path.parts){var b=a.path;a.path=new n["default"].PathExpression(!1,0,[b.original+""],b.original+"",b.loc)}}var i=c(8)["default"];b.__esModule=!0,b.Compiler=d,b.precompile=e,b.compile=f;var j=c(11),k=i(j),l=c(12),m=c(2),n=i(m),o=[].slice;d.prototype={compiler:d,equals:function(a){var b=this.opcodes.length;if(a.opcodes.length!==b)return!1;for(var c=0;b>c;c++){var d=this.opcodes[c],e=a.opcodes[c];if(d.opcode!==e.opcode||!g(d.args,e.args))return!1}b=this.children.length;for(var c=0;b>c;c++)if(!this.children[c].equals(a.children[c]))return!1;return!0},guid:0,compile:function(a,b){this.sourceNode=[],this.opcodes=[],this.children=[],this.options=b,this.stringParams=b.stringParams,this.trackIds=b.trackIds,b.blockParams=b.blockParams||[];var c=b.knownHelpers;if(b.knownHelpers={helperMissing:!0,blockHelperMissing:!0,each:!0,"if":!0,unless:!0,"with":!0,log:!0,lookup:!0},c)for(var d in c)d in c&&(b.knownHelpers[d]=c[d]);return this.accept(a)},compileProgram:function(a){var b=new this.compiler,c=b.compile(a,this.options),d=this.guid++;return this.usePartial=this.usePartial||c.usePartial,this.children[d]=c,this.useDepths=this.useDepths||c.useDepths,d},accept:function(a){this.sourceNode.unshift(a);var b=this[a.type](a);return this.sourceNode.shift(),b},Program:function(a){this.options.blockParams.unshift(a.blockParams);for(var b=a.body,c=b.length,d=0;c>d;d++)this.accept(b[d]);return this.options.blockParams.shift(),this.isSimple=1===c,this.blockParams=a.blockParams?a.blockParams.length:0,this},BlockStatement:function(a){h(a);var b=a.program,c=a.inverse;b=b&&this.compileProgram(b),c=c&&this.compileProgram(c);var d=this.classifySexpr(a);"helper"===d?this.helperSexpr(a,b,c):"simple"===d?(this.simpleSexpr(a),this.opcode("pushProgram",b),this.opcode("pushProgram",c),this.opcode("emptyHash"),this.opcode("blockValue",a.path.original)):(this.ambiguousSexpr(a,b,c),this.opcode("pushProgram",b),this.opcode("pushProgram",c),this.opcode("emptyHash"),this.opcode("ambiguousBlockValue")),this.opcode("append")},PartialStatement:function(a){this.usePartial=!0;var b=a.params;if(b.length>1)throw new k["default"]("Unsupported number of partial arguments: "+b.length,a);b.length||b.push({type:"PathExpression",parts:[],depth:0});var c=a.name.original,d="SubExpression"===a.name.type;d&&this.accept(a.name),this.setupFullMustacheParams(a,void 0,void 0,!0);var e=a.indent||"";this.options.preventIndent&&e&&(this.opcode("appendContent",e),e=""),this.opcode("invokePartial",d,c,e),this.opcode("append")},MustacheStatement:function(a){this.SubExpression(a),this.opcode(a.escaped&&!this.options.noEscape?"appendEscaped":"append")},ContentStatement:function(a){a.value&&this.opcode("appendContent",a.value)},CommentStatement:function(){},SubExpression:function(a){h(a);var b=this.classifySexpr(a);"simple"===b?this.simpleSexpr(a):"helper"===b?this.helperSexpr(a):this.ambiguousSexpr(a)},ambiguousSexpr:function(a,b,c){var d=a.path,e=d.parts[0],f=null!=b||null!=c;this.opcode("getContext",d.depth),this.opcode("pushProgram",b),this.opcode("pushProgram",c),this.accept(d),this.opcode("invokeAmbiguous",e,f)},simpleSexpr:function(a){this.accept(a.path),this.opcode("resolvePossibleLambda")},helperSexpr:function(a,b,c){var d=this.setupFullMustacheParams(a,b,c),e=a.path,f=e.parts[0];if(this.options.knownHelpers[f])this.opcode("invokeKnownHelper",d.length,f);else{if(this.options.knownHelpersOnly)throw new k["default"]("You specified knownHelpersOnly, but used the unknown helper "+f,a);e.falsy=!0,this.accept(e),this.opcode("invokeHelper",d.length,e.original,n["default"].helpers.simpleId(e))}},PathExpression:function(a){this.addDepth(a.depth),this.opcode("getContext",a.depth);var b=a.parts[0],c=n["default"].helpers.scopedId(a),d=!a.depth&&!c&&this.blockParamIndex(b);d?this.opcode("lookupBlockParam",d,a.parts):b?a.data?(this.options.data=!0,this.opcode("lookupData",a.depth,a.parts)):this.opcode("lookupOnContext",a.parts,a.falsy,c):this.opcode("pushContext")},StringLiteral:function(a){this.opcode("pushString",a.value)},NumberLiteral:function(a){this.opcode("pushLiteral",a.value)},BooleanLiteral:function(a){this.opcode("pushLiteral",a.value)},UndefinedLiteral:function(){this.opcode("pushLiteral","undefined")},NullLiteral:function(){this.opcode("pushLiteral","null")},Hash:function(a){var b=a.pairs,c=0,d=b.length;for(this.opcode("pushHash");d>c;c++)this.pushParam(b[c].value);for(;c--;)this.opcode("assignToHash",b[c].key);this.opcode("popHash")},opcode:function(a){this.opcodes.push({opcode:a,args:o.call(arguments,1),loc:this.sourceNode[0].loc})},addDepth:function(a){a&&(this.useDepths=!0)},classifySexpr:function(a){var b=n["default"].helpers.simpleId(a.path),c=b&&!!this.blockParamIndex(a.path.parts[0]),d=!c&&n["default"].helpers.helperExpression(a),e=!c&&(d||b);if(e&&!d){var f=a.path.parts[0],g=this.options;g.knownHelpers[f]?d=!0:g.knownHelpersOnly&&(e=!1)}return d?"helper":e?"ambiguous":"simple"},pushParams:function(a){for(var b=0,c=a.length;c>b;b++)this.pushParam(a[b])},pushParam:function(a){var b=null!=a.value?a.value:a.original||"";if(this.stringParams)b.replace&&(b=b.replace(/^(\.?\.\/)*/g,"").replace(/\//g,".")),a.depth&&this.addDepth(a.depth),this.opcode("getContext",a.depth||0),this.opcode("pushStringParam",b,a.type),"SubExpression"===a.type&&this.accept(a);else{if(this.trackIds){var c=void 0;if(!a.parts||n["default"].helpers.scopedId(a)||a.depth||(c=this.blockParamIndex(a.parts[0])),c){var d=a.parts.slice(1).join(".");this.opcode("pushId","BlockParam",c,d)}else b=a.original||b,b.replace&&(b=b.replace(/^\.\//g,"").replace(/^\.$/g,"")),this.opcode("pushId",a.type,b)}this.accept(a)}},setupFullMustacheParams:function(a,b,c,d){var e=a.params;return this.pushParams(e),this.opcode("pushProgram",b),this.opcode("pushProgram",c),a.hash?this.accept(a.hash):this.opcode("emptyHash",d),e},blockParamIndex:function(a){for(var b=0,c=this.options.blockParams.length;c>b;b++){var d=this.options.blockParams[b],e=d&&l.indexOf(d,a);if(d&&e>=0)return[b,e]}}}},function(a,b,c){"use strict";function d(a){this.value=a}function e(){}function f(a,b,c,d){var e=b.popStack(),f=0,g=c.length;for(a&&g--;g>f;f++)e=b.nameLookup(e,c[f],d);return a?[b.aliasable("this.strict"),"(",e,", ",b.quotedString(c[f]),")"]:e}var g=c(8)["default"];b.__esModule=!0;var h=c(9),i=c(11),j=g(i),k=c(12),l=c(17),m=g(l);e.prototype={nameLookup:function(a,b){return e.isValidJavaScriptVariableName(b)?[a,".",b]:[a,"['",b,"']"]},depthedLookup:function(a){return[this.aliasable("this.lookup"),'(depths, "',a,'")']},compilerInfo:function(){var a=h.COMPILER_REVISION,b=h.REVISION_CHANGES[a];return[a,b]},appendToBuffer:function(a,b,c){return k.isArray(a)||(a=[a]),a=this.source.wrap(a,b),this.environment.isSimple?["return ",a,";"]:c?["buffer += ",a,";"]:(a.appendToBuffer=!0,a)},initializeBuffer:function(){return this.quotedString("")},compile:function(a,b,c,d){this.environment=a,this.options=b,this.stringParams=this.options.stringParams,this.trackIds=this.options.trackIds,this.precompile=!d,this.name=this.environment.name,this.isChild=!!c,this.context=c||{programs:[],environments:[]},this.preamble(),this.stackSlot=0,this.stackVars=[],this.aliases={},this.registers={list:[]},this.hashes=[],this.compileStack=[],this.inlineStack=[],this.blockParams=[],this.compileChildren(a,b),this.useDepths=this.useDepths||a.useDepths||this.options.compat,this.useBlockParams=this.useBlockParams||a.useBlockParams;var e=a.opcodes,f=void 0,g=void 0,h=void 0,i=void 0;for(h=0,i=e.length;i>h;h++)f=e[h],this.source.currentLocation=f.loc,g=g||f.loc,this[f.opcode].apply(this,f.args);if(this.source.currentLocation=g,this.pushSource(""),this.stackSlot||this.inlineStack.length||this.compileStack.length)throw new j["default"]("Compile completed with content left on stack");var k=this.createFunctionContext(d);if(this.isChild)return k;var l={compiler:this.compilerInfo(),main:k},m=this.context.programs;for(h=0,i=m.length;i>h;h++)m[h]&&(l[h]=m[h]);return this.environment.usePartial&&(l.usePartial=!0),this.options.data&&(l.useData=!0),this.useDepths&&(l.useDepths=!0),this.useBlockParams&&(l.useBlockParams=!0),this.options.compat&&(l.compat=!0),d?l.compilerOptions=this.options:(l.compiler=JSON.stringify(l.compiler),this.source.currentLocation={start:{line:1,column:0}},l=this.objectLiteral(l),b.srcName?(l=l.toStringWithSourceMap({file:b.destName}),l.map=l.map&&l.map.toString()):l=l.toString()),l},preamble:function(){this.lastContext=0,this.source=new m["default"](this.options.srcName)},createFunctionContext:function(a){var b="",c=this.stackVars.concat(this.registers.list);c.length>0&&(b+=", "+c.join(", "));var d=0;for(var e in this.aliases){var f=this.aliases[e];this.aliases.hasOwnProperty(e)&&f.children&&f.referenceCount>1&&(b+=", alias"+ ++d+"="+e,f.children[0]="alias"+d)}var g=["depth0","helpers","partials","data"];(this.useBlockParams||this.useDepths)&&g.push("blockParams"),this.useDepths&&g.push("depths");var h=this.mergeSource(b);return a?(g.push(h),Function.apply(this,g)):this.source.wrap(["function(",g.join(","),") {\n  ",h,"}"])},mergeSource:function(a){var b=this.environment.isSimple,c=!this.forceBuffer,d=void 0,e=void 0,f=void 0,g=void 0;return this.source.each(function(a){a.appendToBuffer?(f?a.prepend("  + "):f=a,g=a):(f&&(e?f.prepend("buffer += "):d=!0,g.add(";"),f=g=void 0),e=!0,b||(c=!1))}),c?f?(f.prepend("return "),g.add(";")):e||this.source.push('return "";'):(a+=", buffer = "+(d?"":this.initializeBuffer()),f?(f.prepend("return buffer + "),g.add(";")):this.source.push("return buffer;")),a&&this.source.prepend("var "+a.substring(2)+(d?"":";\n")),this.source.merge()},blockValue:function(a){var b=this.aliasable("helpers.blockHelperMissing"),c=[this.contextName(0)];this.setupHelperArgs(a,0,c);var d=this.popStack();c.splice(1,0,d),this.push(this.source.functionCall(b,"call",c))},ambiguousBlockValue:function(){var a=this.aliasable("helpers.blockHelperMissing"),b=[this.contextName(0)];this.setupHelperArgs("",0,b,!0),this.flushInline();var c=this.topStack();b.splice(1,0,c),this.pushSource(["if (!",this.lastHelper,") { ",c," = ",this.source.functionCall(a,"call",b),"}"])},appendContent:function(a){this.pendingContent?a=this.pendingContent+a:this.pendingLocation=this.source.currentLocation,this.pendingContent=a},append:function(){if(this.isInline())this.replaceStack(function(a){return[" != null ? ",a,' : ""']}),this.pushSource(this.appendToBuffer(this.popStack()));else{var a=this.popStack();this.pushSource(["if (",a," != null) { ",this.appendToBuffer(a,void 0,!0)," }"]),this.environment.isSimple&&this.pushSource(["else { ",this.appendToBuffer("''",void 0,!0)," }"])}},appendEscaped:function(){this.pushSource(this.appendToBuffer([this.aliasable("this.escapeExpression"),"(",this.popStack(),")"]))},getContext:function(a){this.lastContext=a},pushContext:function(){this.pushStackLiteral(this.contextName(this.lastContext))},lookupOnContext:function(a,b,c){var d=0;c||!this.options.compat||this.lastContext?this.pushContext():this.push(this.depthedLookup(a[d++])),this.resolvePath("context",a,d,b)},lookupBlockParam:function(a,b){this.useBlockParams=!0,this.push(["blockParams[",a[0],"][",a[1],"]"]),this.resolvePath("context",b,1)},lookupData:function(a,b){this.pushStackLiteral(a?"this.data(data, "+a+")":"data"),this.resolvePath("data",b,0,!0)},resolvePath:function(a,b,c,d){var e=this;if(this.options.strict||this.options.assumeObjects)return void this.push(f(this.options.strict,this,b,a));for(var g=b.length;g>c;c++)this.replaceStack(function(f){var g=e.nameLookup(f,b[c],a);return d?[" && ",g]:[" != null ? ",g," : ",f]})},resolvePossibleLambda:function(){this.push([this.aliasable("this.lambda"),"(",this.popStack(),", ",this.contextName(0),")"])},pushStringParam:function(a,b){this.pushContext(),this.pushString(b),"SubExpression"!==b&&("string"==typeof a?this.pushString(a):this.pushStackLiteral(a))},emptyHash:function(a){this.trackIds&&this.push("{}"),this.stringParams&&(this.push("{}"),this.push("{}")),this.pushStackLiteral(a?"undefined":"{}")},pushHash:function(){this.hash&&this.hashes.push(this.hash),this.hash={values:[],types:[],contexts:[],ids:[]}},popHash:function(){var a=this.hash;this.hash=this.hashes.pop(),this.trackIds&&this.push(this.objectLiteral(a.ids)),this.stringParams&&(this.push(this.objectLiteral(a.contexts)),this.push(this.objectLiteral(a.types))),this.push(this.objectLiteral(a.values))},pushString:function(a){this.pushStackLiteral(this.quotedString(a))},pushLiteral:function(a){this.pushStackLiteral(a)},pushProgram:function(a){this.pushStackLiteral(null!=a?this.programExpression(a):null)},invokeHelper:function(a,b,c){var d=this.popStack(),e=this.setupHelper(a,b),f=c?[e.name," || "]:"",g=["("].concat(f,d);this.options.strict||g.push(" || ",this.aliasable("helpers.helperMissing")),g.push(")"),this.push(this.source.functionCall(g,"call",e.callParams))},invokeKnownHelper:function(a,b){var c=this.setupHelper(a,b);this.push(this.source.functionCall(c.name,"call",c.callParams))},invokeAmbiguous:function(a,b){this.useRegister("helper");var c=this.popStack();this.emptyHash();var d=this.setupHelper(0,a,b),e=this.lastHelper=this.nameLookup("helpers",a,"helper"),f=["(","(helper = ",e," || ",c,")"];this.options.strict||(f[0]="(helper = ",f.push(" != null ? helper : ",this.aliasable("helpers.helperMissing"))),this.push(["(",f,d.paramsInit?["),(",d.paramsInit]:[],"),","(typeof helper === ",this.aliasable('"function"')," ? ",this.source.functionCall("helper","call",d.callParams)," : helper))"])},invokePartial:function(a,b,c){var d=[],e=this.setupParams(b,1,d,!1);a&&(b=this.popStack(),delete e.name),c&&(e.indent=JSON.stringify(c)),e.helpers="helpers",e.partials="partials",d.unshift(a?b:this.nameLookup("partials",b,"partial")),this.options.compat&&(e.depths="depths"),e=this.objectLiteral(e),d.push(e),this.push(this.source.functionCall("this.invokePartial","",d))},assignToHash:function(a){var b=this.popStack(),c=void 0,d=void 0,e=void 0;this.trackIds&&(e=this.popStack()),this.stringParams&&(d=this.popStack(),c=this.popStack());var f=this.hash;c&&(f.contexts[a]=c),d&&(f.types[a]=d),e&&(f.ids[a]=e),f.values[a]=b},pushId:function(a,b,c){"BlockParam"===a?this.pushStackLiteral("blockParams["+b[0]+"].path["+b[1]+"]"+(c?" + "+JSON.stringify("."+c):"")):"PathExpression"===a?this.pushString(b):this.pushStackLiteral("SubExpression"===a?"true":"null")},compiler:e,compileChildren:function(a,b){for(var c=a.children,d=void 0,e=void 0,f=0,g=c.length;g>f;f++){d=c[f],e=new this.compiler;var h=this.matchExistingProgram(d);null==h?(this.context.programs.push(""),h=this.context.programs.length,d.index=h,d.name="program"+h,this.context.programs[h]=e.compile(d,b,this.context,!this.precompile),this.context.environments[h]=d,this.useDepths=this.useDepths||e.useDepths,this.useBlockParams=this.useBlockParams||e.useBlockParams):(d.index=h,d.name="program"+h,this.useDepths=this.useDepths||d.useDepths,this.useBlockParams=this.useBlockParams||d.useBlockParams)}},matchExistingProgram:function(a){for(var b=0,c=this.context.environments.length;c>b;b++){var d=this.context.environments[b];if(d&&d.equals(a))return b}},programExpression:function(a){var b=this.environment.children[a],c=[b.index,"data",b.blockParams];return(this.useBlockParams||this.useDepths)&&c.push("blockParams"),this.useDepths&&c.push("depths"),"this.program("+c.join(", ")+")"},useRegister:function(a){this.registers[a]||(this.registers[a]=!0,this.registers.list.push(a))},push:function(a){return a instanceof d||(a=this.source.wrap(a)),this.inlineStack.push(a),a},pushStackLiteral:function(a){this.push(new d(a))},pushSource:function(a){this.pendingContent&&(this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent),this.pendingLocation)),this.pendingContent=void 0),a&&this.source.push(a)},replaceStack:function(a){var b=["("],c=void 0,e=void 0,f=void 0;if(!this.isInline())throw new j["default"]("replaceStack on non-inline");var g=this.popStack(!0);if(g instanceof d)c=[g.value],b=["(",c],f=!0;else{e=!0;var h=this.incrStack();b=["((",this.push(h)," = ",g,")"],c=this.topStack()}var i=a.call(this,c);f||this.popStack(),e&&this.stackSlot--,this.push(b.concat(i,")"))},incrStack:function(){return this.stackSlot++,this.stackSlot>this.stackVars.length&&this.stackVars.push("stack"+this.stackSlot),this.topStackName()},topStackName:function(){return"stack"+this.stackSlot},flushInline:function(){var a=this.inlineStack;this.inlineStack=[];for(var b=0,c=a.length;c>b;b++){var e=a[b];if(e instanceof d)this.compileStack.push(e);else{var f=this.incrStack();this.pushSource([f," = ",e,";"]),this.compileStack.push(f)}}},isInline:function(){return this.inlineStack.length},popStack:function(a){var b=this.isInline(),c=(b?this.inlineStack:this.compileStack).pop();if(!a&&c instanceof d)return c.value;if(!b){if(!this.stackSlot)throw new j["default"]("Invalid stack pop");this.stackSlot--}return c},topStack:function(){var a=this.isInline()?this.inlineStack:this.compileStack,b=a[a.length-1];return b instanceof d?b.value:b},contextName:function(a){return this.useDepths&&a?"depths["+a+"]":"depth"+a},quotedString:function(a){return this.source.quotedString(a)},objectLiteral:function(a){return this.source.objectLiteral(a)},aliasable:function(a){var b=this.aliases[a];return b?(b.referenceCount++,b):(b=this.aliases[a]=this.source.wrap(a),b.aliasable=!0,b.referenceCount=1,b)},setupHelper:function(a,b,c){var d=[],e=this.setupHelperArgs(b,a,d,c),f=this.nameLookup("helpers",b,"helper");return{params:d,paramsInit:e,name:f,callParams:[this.contextName(0)].concat(d)}},setupParams:function(a,b,c){var d={},e=[],f=[],g=[],h=void 0;d.name=this.quotedString(a),d.hash=this.popStack(),this.trackIds&&(d.hashIds=this.popStack()),this.stringParams&&(d.hashTypes=this.popStack(),d.hashContexts=this.popStack());var i=this.popStack(),j=this.popStack();(j||i)&&(d.fn=j||"this.noop",d.inverse=i||"this.noop");for(var k=b;k--;)h=this.popStack(),c[k]=h,this.trackIds&&(g[k]=this.popStack()),this.stringParams&&(f[k]=this.popStack(),e[k]=this.popStack());return this.trackIds&&(d.ids=this.source.generateArray(g)),this.stringParams&&(d.types=this.source.generateArray(f),d.contexts=this.source.generateArray(e)),this.options.data&&(d.data="data"),this.useBlockParams&&(d.blockParams="blockParams"),d},setupHelperArgs:function(a,b,c,d){var e=this.setupParams(a,b,c,!0);return e=this.objectLiteral(e),d?(this.useRegister("options"),c.push("options"),["options=",e]):(c.push(e),"")}},function(){for(var a="break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false".split(" "),b=e.RESERVED_WORDS={},c=0,d=a.length;d>c;c++)b[a[c]]=!0}(),e.isValidJavaScriptVariableName=function(a){return!e.RESERVED_WORDS[a]&&/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(a)},b["default"]=e,a.exports=b["default"]},function(a,b,c){"use strict";function d(){this.parents=[]}var e=c(8)["default"];b.__esModule=!0;var f=c(11),g=e(f),h=c(2),i=e(h);d.prototype={constructor:d,mutating:!1,acceptKey:function(a,b){var c=this.accept(a[b]);if(this.mutating){if(c&&(!c.type||!i["default"][c.type]))throw new g["default"]('Unexpected node type "'+c.type+'" found when accepting '+b+" on "+a.type);a[b]=c}},acceptRequired:function(a,b){if(this.acceptKey(a,b),!a[b])throw new g["default"](a.type+" requires "+b)},acceptArray:function(a){for(var b=0,c=a.length;c>b;b++)this.acceptKey(a,b),a[b]||(a.splice(b,1),b--,c--)},accept:function(a){if(a){this.current&&this.parents.unshift(this.current),this.current=a;var b=this[a.type](a);return this.current=this.parents.shift(),!this.mutating||b?b:b!==!1?a:void 0}},Program:function(a){this.acceptArray(a.body)},MustacheStatement:function(a){this.acceptRequired(a,"path"),this.acceptArray(a.params),this.acceptKey(a,"hash")},BlockStatement:function(a){this.acceptRequired(a,"path"),this.acceptArray(a.params),this.acceptKey(a,"hash"),this.acceptKey(a,"program"),this.acceptKey(a,"inverse")},PartialStatement:function(a){this.acceptRequired(a,"name"),this.acceptArray(a.params),this.acceptKey(a,"hash")},ContentStatement:function(){},CommentStatement:function(){},SubExpression:function(a){this.acceptRequired(a,"path"),this.acceptArray(a.params),this.acceptKey(a,"hash")},PathExpression:function(){},StringLiteral:function(){},NumberLiteral:function(){},BooleanLiteral:function(){},UndefinedLiteral:function(){},NullLiteral:function(){},Hash:function(a){this.acceptArray(a.pairs)},HashPair:function(a){this.acceptRequired(a,"value")}},b["default"]=d,a.exports=b["default"]},function(a,b){(function(c){"use strict";b.__esModule=!0,b["default"]=function(a){var b="undefined"!=typeof c?c:window,d=b.Handlebars;a.noConflict=function(){b.Handlebars===a&&(b.Handlebars=d)}},a.exports=b["default"]}).call(b,function(){return this}())},function(a,b){"use strict";b["default"]=function(a){return a&&a.__esModule?a:{"default":a}},b.__esModule=!0},function(a,b,c){"use strict";function d(a,b){this.helpers=a||{},this.partials=b||{},e(this)}function e(a){a.registerHelper("helperMissing",function(){if(1===arguments.length)return void 0;throw new k["default"]('Missing helper: "'+arguments[arguments.length-1].name+'"')}),a.registerHelper("blockHelperMissing",function(b,c){var d=c.inverse,e=c.fn;if(b===!0)return e(this);if(b===!1||null==b)return d(this);if(o(b))return b.length>0?(c.ids&&(c.ids=[c.name]),a.helpers.each(b,c)):d(this);if(c.data&&c.ids){var g=f(c.data);g.contextPath=i.appendContextPath(c.data.contextPath,c.name),c={data:g}}return e(b,c)}),a.registerHelper("each",function(a,b){function c(b,c,e){j&&(j.key=b,j.index=c,j.first=0===c,j.last=!!e,l&&(j.contextPath=l+b)),h+=d(a[b],{data:j,blockParams:i.blockParams([a[b],b],[l+b,null])})}if(!b)throw new k["default"]("Must pass iterator to #each");var d=b.fn,e=b.inverse,g=0,h="",j=void 0,l=void 0;if(b.data&&b.ids&&(l=i.appendContextPath(b.data.contextPath,b.ids[0])+"."),p(a)&&(a=a.call(this)),b.data&&(j=f(b.data)),a&&"object"==typeof a)if(o(a))for(var m=a.length;m>g;g++)c(g,g,g===a.length-1);else{var n=void 0;for(var q in a)a.hasOwnProperty(q)&&(n&&c(n,g-1),n=q,g++);n&&c(n,g-1,!0)}return 0===g&&(h=e(this)),h}),a.registerHelper("if",function(a,b){return p(a)&&(a=a.call(this)),!b.hash.includeZero&&!a||i.isEmpty(a)?b.inverse(this):b.fn(this)}),a.registerHelper("unless",function(b,c){return a.helpers["if"].call(this,b,{fn:c.inverse,inverse:c.fn,hash:c.hash})}),a.registerHelper("with",function(a,b){p(a)&&(a=a.call(this));var c=b.fn;if(i.isEmpty(a))return b.inverse(this);if(b.data&&b.ids){var d=f(b.data);d.contextPath=i.appendContextPath(b.data.contextPath,b.ids[0]),b={data:d}}return c(a,b)}),a.registerHelper("log",function(b,c){var d=c.data&&null!=c.data.level?parseInt(c.data.level,10):1;a.log(d,b)}),a.registerHelper("lookup",function(a,b){return a&&a[b]})}function f(a){var b=i.extend({},a);return b._parent=a,b}var g=c(8)["default"];b.__esModule=!0,b.HandlebarsEnvironment=d,b.createFrame=f;var h=c(12),i=g(h),j=c(11),k=g(j),l="3.0.1";b.VERSION=l;var m=6;b.COMPILER_REVISION=m;var n={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1"};b.REVISION_CHANGES=n;var o=i.isArray,p=i.isFunction,q=i.toString,r="[object Object]";d.prototype={constructor:d,logger:s,log:t,registerHelper:function(a,b){if(q.call(a)===r){if(b)throw new k["default"]("Arg not supported with multiple helpers");i.extend(this.helpers,a)}else this.helpers[a]=b},unregisterHelper:function(a){delete this.helpers[a]},registerPartial:function(a,b){if(q.call(a)===r)i.extend(this.partials,a);else{if("undefined"==typeof b)throw new k["default"]("Attempting to register a partial as undefined");this.partials[a]=b}},unregisterPartial:function(a){delete this.partials[a]}};var s={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:1,log:function(a,b){if("undefined"!=typeof console&&s.level<=a){var c=s.methodMap[a];(console[c]||console.log).call(console,b)}}};b.logger=s;var t=s.log;b.log=t},function(a,b){"use strict";function c(a){this.string=a}b.__esModule=!0,c.prototype.toString=c.prototype.toHTML=function(){return""+this.string},b["default"]=c,a.exports=b["default"]},function(a,b){"use strict";function c(a,b){var e=b&&b.loc,f=void 0,g=void 0;e&&(f=e.start.line,g=e.start.column,a+=" - "+f+":"+g);for(var h=Error.prototype.constructor.call(this,a),i=0;i<d.length;i++)this[d[i]]=h[d[i]];Error.captureStackTrace&&Error.captureStackTrace(this,c),e&&(this.lineNumber=f,this.column=g)}b.__esModule=!0;var d=["description","fileName","lineNumber","message","name","number","stack"];c.prototype=new Error,b["default"]=c,a.exports=b["default"]},function(a,b){"use strict";function c(a){return j[a]}function d(a){for(var b=1;b<arguments.length;b++)for(var c in arguments[b])Object.prototype.hasOwnProperty.call(arguments[b],c)&&(a[c]=arguments[b][c]);return a}function e(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1}function f(a){if("string"!=typeof a){if(a&&a.toHTML)return a.toHTML();if(null==a)return"";if(!a)return a+"";a=""+a}return l.test(a)?a.replace(k,c):a}function g(a){return a||0===a?o(a)&&0===a.length?!0:!1:!0}function h(a,b){return a.path=b,a}function i(a,b){return(a?a+".":"")+b}b.__esModule=!0,b.extend=d,b.indexOf=e,b.escapeExpression=f,b.isEmpty=g,b.blockParams=h,b.appendContextPath=i;var j={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},k=/[&<>"'`]/g,l=/[&<>"'`]/,m=Object.prototype.toString;b.toString=m;var n=function(a){return"function"==typeof a};n(/x/)&&(b.isFunction=n=function(a){return"function"==typeof a&&"[object Function]"===m.call(a)});var n;b.isFunction=n;var o=Array.isArray||function(a){return a&&"object"==typeof a?"[object Array]"===m.call(a):!1};b.isArray=o},function(a,b,c){"use strict";function d(a){var b=a&&a[0]||1,c=p.COMPILER_REVISION;if(b!==c){if(c>b){var d=p.REVISION_CHANGES[c],e=p.REVISION_CHANGES[b];throw new o["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+d+") or downgrade your runtime to an older version ("+e+").")}throw new o["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+a[1]+").")}}function e(a,b){function c(c,d,e){e.hash&&(d=m.extend({},d,e.hash)),c=b.VM.resolvePartial.call(this,c,d,e);var f=b.VM.invokePartial.call(this,c,d,e);if(null==f&&b.compile&&(e.partials[e.name]=b.compile(c,a.compilerOptions,b),f=e.partials[e.name](d,e)),null!=f){if(e.indent){for(var g=f.split("\n"),h=0,i=g.length;i>h&&(g[h]||h+1!==i);h++)g[h]=e.indent+g[h];f=g.join("\n")}return f}throw new o["default"]("The partial "+e.name+" could not be compiled when running in runtime-only mode")}function d(b){var c=void 0===arguments[1]?{}:arguments[1],f=c.data;
d._setup(c),!c.partial&&a.useData&&(f=j(b,f));var g=void 0,h=a.useBlockParams?[]:void 0;return a.useDepths&&(g=c.depths?[b].concat(c.depths):[b]),a.main.call(e,b,e.helpers,e.partials,f,h,g)}if(!b)throw new o["default"]("No environment passed to template");if(!a||!a.main)throw new o["default"]("Unknown template object: "+typeof a);b.VM.checkRevision(a.compiler);var e={strict:function(a,b){if(!(b in a))throw new o["default"]('"'+b+'" not defined in '+a);return a[b]},lookup:function(a,b){for(var c=a.length,d=0;c>d;d++)if(a[d]&&null!=a[d][b])return a[d][b]},lambda:function(a,b){return"function"==typeof a?a.call(b):a},escapeExpression:m.escapeExpression,invokePartial:c,fn:function(b){return a[b]},programs:[],program:function(a,b,c,d,e){var g=this.programs[a],h=this.fn(a);return b||e||d||c?g=f(this,a,h,b,c,d,e):g||(g=this.programs[a]=f(this,a,h)),g},data:function(a,b){for(;a&&b--;)a=a._parent;return a},merge:function(a,b){var c=a||b;return a&&b&&a!==b&&(c=m.extend({},b,a)),c},noop:b.VM.noop,compilerInfo:a.compiler};return d.isTop=!0,d._setup=function(c){c.partial?(e.helpers=c.helpers,e.partials=c.partials):(e.helpers=e.merge(c.helpers,b.helpers),a.usePartial&&(e.partials=e.merge(c.partials,b.partials)))},d._child=function(b,c,d,g){if(a.useBlockParams&&!d)throw new o["default"]("must pass block params");if(a.useDepths&&!g)throw new o["default"]("must pass parent depths");return f(e,b,a[b],c,0,d,g)},d}function f(a,b,c,d,e,f,g){function h(b){var e=void 0===arguments[1]?{}:arguments[1];return c.call(a,b,a.helpers,a.partials,e.data||d,f&&[e.blockParams].concat(f),g&&[b].concat(g))}return h.program=b,h.depth=g?g.length:0,h.blockParams=e||0,h}function g(a,b,c){return a?a.call||c.name||(c.name=a,a=c.partials[a]):a=c.partials[c.name],a}function h(a,b,c){if(c.partial=!0,void 0===a)throw new o["default"]("The partial "+c.name+" could not be found");return a instanceof Function?a(b,c):void 0}function i(){return""}function j(a,b){return b&&"root"in b||(b=b?p.createFrame(b):{},b.root=a),b}var k=c(8)["default"];b.__esModule=!0,b.checkRevision=d,b.template=e,b.wrapProgram=f,b.resolvePartial=g,b.invokePartial=h,b.noop=i;var l=c(12),m=k(l),n=c(11),o=k(n),p=c(9)},function(a,b){"use strict";b.__esModule=!0;var c=function(){function a(){this.yy={}}var b={trace:function(){},yy:{},symbols_:{error:2,root:3,program:4,EOF:5,program_repetition0:6,statement:7,mustache:8,block:9,rawBlock:10,partial:11,content:12,COMMENT:13,CONTENT:14,openRawBlock:15,END_RAW_BLOCK:16,OPEN_RAW_BLOCK:17,helperName:18,openRawBlock_repetition0:19,openRawBlock_option0:20,CLOSE_RAW_BLOCK:21,openBlock:22,block_option0:23,closeBlock:24,openInverse:25,block_option1:26,OPEN_BLOCK:27,openBlock_repetition0:28,openBlock_option0:29,openBlock_option1:30,CLOSE:31,OPEN_INVERSE:32,openInverse_repetition0:33,openInverse_option0:34,openInverse_option1:35,openInverseChain:36,OPEN_INVERSE_CHAIN:37,openInverseChain_repetition0:38,openInverseChain_option0:39,openInverseChain_option1:40,inverseAndProgram:41,INVERSE:42,inverseChain:43,inverseChain_option0:44,OPEN_ENDBLOCK:45,OPEN:46,mustache_repetition0:47,mustache_option0:48,OPEN_UNESCAPED:49,mustache_repetition1:50,mustache_option1:51,CLOSE_UNESCAPED:52,OPEN_PARTIAL:53,partialName:54,partial_repetition0:55,partial_option0:56,param:57,sexpr:58,OPEN_SEXPR:59,sexpr_repetition0:60,sexpr_option0:61,CLOSE_SEXPR:62,hash:63,hash_repetition_plus0:64,hashSegment:65,ID:66,EQUALS:67,blockParams:68,OPEN_BLOCK_PARAMS:69,blockParams_repetition_plus0:70,CLOSE_BLOCK_PARAMS:71,path:72,dataName:73,STRING:74,NUMBER:75,BOOLEAN:76,UNDEFINED:77,NULL:78,DATA:79,pathSegments:80,SEP:81,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",13:"COMMENT",14:"CONTENT",16:"END_RAW_BLOCK",17:"OPEN_RAW_BLOCK",21:"CLOSE_RAW_BLOCK",27:"OPEN_BLOCK",31:"CLOSE",32:"OPEN_INVERSE",37:"OPEN_INVERSE_CHAIN",42:"INVERSE",45:"OPEN_ENDBLOCK",46:"OPEN",49:"OPEN_UNESCAPED",52:"CLOSE_UNESCAPED",53:"OPEN_PARTIAL",59:"OPEN_SEXPR",62:"CLOSE_SEXPR",66:"ID",67:"EQUALS",69:"OPEN_BLOCK_PARAMS",71:"CLOSE_BLOCK_PARAMS",74:"STRING",75:"NUMBER",76:"BOOLEAN",77:"UNDEFINED",78:"NULL",79:"DATA",81:"SEP"},productions_:[0,[3,2],[4,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[12,1],[10,3],[15,5],[9,4],[9,4],[22,6],[25,6],[36,6],[41,2],[43,3],[43,1],[24,3],[8,5],[8,5],[11,5],[57,1],[57,1],[58,5],[63,1],[65,3],[68,3],[18,1],[18,1],[18,1],[18,1],[18,1],[18,1],[18,1],[54,1],[54,1],[73,2],[72,1],[80,3],[80,1],[6,0],[6,2],[19,0],[19,2],[20,0],[20,1],[23,0],[23,1],[26,0],[26,1],[28,0],[28,2],[29,0],[29,1],[30,0],[30,1],[33,0],[33,2],[34,0],[34,1],[35,0],[35,1],[38,0],[38,2],[39,0],[39,1],[40,0],[40,1],[44,0],[44,1],[47,0],[47,2],[48,0],[48,1],[50,0],[50,2],[51,0],[51,1],[55,0],[55,2],[56,0],[56,1],[60,0],[60,2],[61,0],[61,1],[64,1],[64,2],[70,1],[70,2]],performAction:function(a,b,c,d,e,f){var g=f.length-1;switch(e){case 1:return f[g-1];case 2:this.$=new d.Program(f[g],null,{},d.locInfo(this._$));break;case 3:this.$=f[g];break;case 4:this.$=f[g];break;case 5:this.$=f[g];break;case 6:this.$=f[g];break;case 7:this.$=f[g];break;case 8:this.$=new d.CommentStatement(d.stripComment(f[g]),d.stripFlags(f[g],f[g]),d.locInfo(this._$));break;case 9:this.$=new d.ContentStatement(f[g],d.locInfo(this._$));break;case 10:this.$=d.prepareRawBlock(f[g-2],f[g-1],f[g],this._$);break;case 11:this.$={path:f[g-3],params:f[g-2],hash:f[g-1]};break;case 12:this.$=d.prepareBlock(f[g-3],f[g-2],f[g-1],f[g],!1,this._$);break;case 13:this.$=d.prepareBlock(f[g-3],f[g-2],f[g-1],f[g],!0,this._$);break;case 14:this.$={path:f[g-4],params:f[g-3],hash:f[g-2],blockParams:f[g-1],strip:d.stripFlags(f[g-5],f[g])};break;case 15:this.$={path:f[g-4],params:f[g-3],hash:f[g-2],blockParams:f[g-1],strip:d.stripFlags(f[g-5],f[g])};break;case 16:this.$={path:f[g-4],params:f[g-3],hash:f[g-2],blockParams:f[g-1],strip:d.stripFlags(f[g-5],f[g])};break;case 17:this.$={strip:d.stripFlags(f[g-1],f[g-1]),program:f[g]};break;case 18:var h=d.prepareBlock(f[g-2],f[g-1],f[g],f[g],!1,this._$),i=new d.Program([h],null,{},d.locInfo(this._$));i.chained=!0,this.$={strip:f[g-2].strip,program:i,chain:!0};break;case 19:this.$=f[g];break;case 20:this.$={path:f[g-1],strip:d.stripFlags(f[g-2],f[g])};break;case 21:this.$=d.prepareMustache(f[g-3],f[g-2],f[g-1],f[g-4],d.stripFlags(f[g-4],f[g]),this._$);break;case 22:this.$=d.prepareMustache(f[g-3],f[g-2],f[g-1],f[g-4],d.stripFlags(f[g-4],f[g]),this._$);break;case 23:this.$=new d.PartialStatement(f[g-3],f[g-2],f[g-1],d.stripFlags(f[g-4],f[g]),d.locInfo(this._$));break;case 24:this.$=f[g];break;case 25:this.$=f[g];break;case 26:this.$=new d.SubExpression(f[g-3],f[g-2],f[g-1],d.locInfo(this._$));break;case 27:this.$=new d.Hash(f[g],d.locInfo(this._$));break;case 28:this.$=new d.HashPair(d.id(f[g-2]),f[g],d.locInfo(this._$));break;case 29:this.$=d.id(f[g-1]);break;case 30:this.$=f[g];break;case 31:this.$=f[g];break;case 32:this.$=new d.StringLiteral(f[g],d.locInfo(this._$));break;case 33:this.$=new d.NumberLiteral(f[g],d.locInfo(this._$));break;case 34:this.$=new d.BooleanLiteral(f[g],d.locInfo(this._$));break;case 35:this.$=new d.UndefinedLiteral(d.locInfo(this._$));break;case 36:this.$=new d.NullLiteral(d.locInfo(this._$));break;case 37:this.$=f[g];break;case 38:this.$=f[g];break;case 39:this.$=d.preparePath(!0,f[g],this._$);break;case 40:this.$=d.preparePath(!1,f[g],this._$);break;case 41:f[g-2].push({part:d.id(f[g]),original:f[g],separator:f[g-1]}),this.$=f[g-2];break;case 42:this.$=[{part:d.id(f[g]),original:f[g]}];break;case 43:this.$=[];break;case 44:f[g-1].push(f[g]);break;case 45:this.$=[];break;case 46:f[g-1].push(f[g]);break;case 53:this.$=[];break;case 54:f[g-1].push(f[g]);break;case 59:this.$=[];break;case 60:f[g-1].push(f[g]);break;case 65:this.$=[];break;case 66:f[g-1].push(f[g]);break;case 73:this.$=[];break;case 74:f[g-1].push(f[g]);break;case 77:this.$=[];break;case 78:f[g-1].push(f[g]);break;case 81:this.$=[];break;case 82:f[g-1].push(f[g]);break;case 85:this.$=[];break;case 86:f[g-1].push(f[g]);break;case 89:this.$=[f[g]];break;case 90:f[g-1].push(f[g]);break;case 91:this.$=[f[g]];break;case 92:f[g-1].push(f[g])}},table:[{3:1,4:2,5:[2,43],6:3,13:[2,43],14:[2,43],17:[2,43],27:[2,43],32:[2,43],46:[2,43],49:[2,43],53:[2,43]},{1:[3]},{5:[1,4]},{5:[2,2],7:5,8:6,9:7,10:8,11:9,12:10,13:[1,11],14:[1,18],15:16,17:[1,21],22:14,25:15,27:[1,19],32:[1,20],37:[2,2],42:[2,2],45:[2,2],46:[1,12],49:[1,13],53:[1,17]},{1:[2,1]},{5:[2,44],13:[2,44],14:[2,44],17:[2,44],27:[2,44],32:[2,44],37:[2,44],42:[2,44],45:[2,44],46:[2,44],49:[2,44],53:[2,44]},{5:[2,3],13:[2,3],14:[2,3],17:[2,3],27:[2,3],32:[2,3],37:[2,3],42:[2,3],45:[2,3],46:[2,3],49:[2,3],53:[2,3]},{5:[2,4],13:[2,4],14:[2,4],17:[2,4],27:[2,4],32:[2,4],37:[2,4],42:[2,4],45:[2,4],46:[2,4],49:[2,4],53:[2,4]},{5:[2,5],13:[2,5],14:[2,5],17:[2,5],27:[2,5],32:[2,5],37:[2,5],42:[2,5],45:[2,5],46:[2,5],49:[2,5],53:[2,5]},{5:[2,6],13:[2,6],14:[2,6],17:[2,6],27:[2,6],32:[2,6],37:[2,6],42:[2,6],45:[2,6],46:[2,6],49:[2,6],53:[2,6]},{5:[2,7],13:[2,7],14:[2,7],17:[2,7],27:[2,7],32:[2,7],37:[2,7],42:[2,7],45:[2,7],46:[2,7],49:[2,7],53:[2,7]},{5:[2,8],13:[2,8],14:[2,8],17:[2,8],27:[2,8],32:[2,8],37:[2,8],42:[2,8],45:[2,8],46:[2,8],49:[2,8],53:[2,8]},{18:22,66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{18:33,66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{4:34,6:3,13:[2,43],14:[2,43],17:[2,43],27:[2,43],32:[2,43],37:[2,43],42:[2,43],45:[2,43],46:[2,43],49:[2,43],53:[2,43]},{4:35,6:3,13:[2,43],14:[2,43],17:[2,43],27:[2,43],32:[2,43],42:[2,43],45:[2,43],46:[2,43],49:[2,43],53:[2,43]},{12:36,14:[1,18]},{18:38,54:37,58:39,59:[1,40],66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{5:[2,9],13:[2,9],14:[2,9],16:[2,9],17:[2,9],27:[2,9],32:[2,9],37:[2,9],42:[2,9],45:[2,9],46:[2,9],49:[2,9],53:[2,9]},{18:41,66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{18:42,66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{18:43,66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{31:[2,73],47:44,59:[2,73],66:[2,73],74:[2,73],75:[2,73],76:[2,73],77:[2,73],78:[2,73],79:[2,73]},{21:[2,30],31:[2,30],52:[2,30],59:[2,30],62:[2,30],66:[2,30],69:[2,30],74:[2,30],75:[2,30],76:[2,30],77:[2,30],78:[2,30],79:[2,30]},{21:[2,31],31:[2,31],52:[2,31],59:[2,31],62:[2,31],66:[2,31],69:[2,31],74:[2,31],75:[2,31],76:[2,31],77:[2,31],78:[2,31],79:[2,31]},{21:[2,32],31:[2,32],52:[2,32],59:[2,32],62:[2,32],66:[2,32],69:[2,32],74:[2,32],75:[2,32],76:[2,32],77:[2,32],78:[2,32],79:[2,32]},{21:[2,33],31:[2,33],52:[2,33],59:[2,33],62:[2,33],66:[2,33],69:[2,33],74:[2,33],75:[2,33],76:[2,33],77:[2,33],78:[2,33],79:[2,33]},{21:[2,34],31:[2,34],52:[2,34],59:[2,34],62:[2,34],66:[2,34],69:[2,34],74:[2,34],75:[2,34],76:[2,34],77:[2,34],78:[2,34],79:[2,34]},{21:[2,35],31:[2,35],52:[2,35],59:[2,35],62:[2,35],66:[2,35],69:[2,35],74:[2,35],75:[2,35],76:[2,35],77:[2,35],78:[2,35],79:[2,35]},{21:[2,36],31:[2,36],52:[2,36],59:[2,36],62:[2,36],66:[2,36],69:[2,36],74:[2,36],75:[2,36],76:[2,36],77:[2,36],78:[2,36],79:[2,36]},{21:[2,40],31:[2,40],52:[2,40],59:[2,40],62:[2,40],66:[2,40],69:[2,40],74:[2,40],75:[2,40],76:[2,40],77:[2,40],78:[2,40],79:[2,40],81:[1,45]},{66:[1,32],80:46},{21:[2,42],31:[2,42],52:[2,42],59:[2,42],62:[2,42],66:[2,42],69:[2,42],74:[2,42],75:[2,42],76:[2,42],77:[2,42],78:[2,42],79:[2,42],81:[2,42]},{50:47,52:[2,77],59:[2,77],66:[2,77],74:[2,77],75:[2,77],76:[2,77],77:[2,77],78:[2,77],79:[2,77]},{23:48,36:50,37:[1,52],41:51,42:[1,53],43:49,45:[2,49]},{26:54,41:55,42:[1,53],45:[2,51]},{16:[1,56]},{31:[2,81],55:57,59:[2,81],66:[2,81],74:[2,81],75:[2,81],76:[2,81],77:[2,81],78:[2,81],79:[2,81]},{31:[2,37],59:[2,37],66:[2,37],74:[2,37],75:[2,37],76:[2,37],77:[2,37],78:[2,37],79:[2,37]},{31:[2,38],59:[2,38],66:[2,38],74:[2,38],75:[2,38],76:[2,38],77:[2,38],78:[2,38],79:[2,38]},{18:58,66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{28:59,31:[2,53],59:[2,53],66:[2,53],69:[2,53],74:[2,53],75:[2,53],76:[2,53],77:[2,53],78:[2,53],79:[2,53]},{31:[2,59],33:60,59:[2,59],66:[2,59],69:[2,59],74:[2,59],75:[2,59],76:[2,59],77:[2,59],78:[2,59],79:[2,59]},{19:61,21:[2,45],59:[2,45],66:[2,45],74:[2,45],75:[2,45],76:[2,45],77:[2,45],78:[2,45],79:[2,45]},{18:65,31:[2,75],48:62,57:63,58:66,59:[1,40],63:64,64:67,65:68,66:[1,69],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{66:[1,70]},{21:[2,39],31:[2,39],52:[2,39],59:[2,39],62:[2,39],66:[2,39],69:[2,39],74:[2,39],75:[2,39],76:[2,39],77:[2,39],78:[2,39],79:[2,39],81:[1,45]},{18:65,51:71,52:[2,79],57:72,58:66,59:[1,40],63:73,64:67,65:68,66:[1,69],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{24:74,45:[1,75]},{45:[2,50]},{4:76,6:3,13:[2,43],14:[2,43],17:[2,43],27:[2,43],32:[2,43],37:[2,43],42:[2,43],45:[2,43],46:[2,43],49:[2,43],53:[2,43]},{45:[2,19]},{18:77,66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{4:78,6:3,13:[2,43],14:[2,43],17:[2,43],27:[2,43],32:[2,43],45:[2,43],46:[2,43],49:[2,43],53:[2,43]},{24:79,45:[1,75]},{45:[2,52]},{5:[2,10],13:[2,10],14:[2,10],17:[2,10],27:[2,10],32:[2,10],37:[2,10],42:[2,10],45:[2,10],46:[2,10],49:[2,10],53:[2,10]},{18:65,31:[2,83],56:80,57:81,58:66,59:[1,40],63:82,64:67,65:68,66:[1,69],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{59:[2,85],60:83,62:[2,85],66:[2,85],74:[2,85],75:[2,85],76:[2,85],77:[2,85],78:[2,85],79:[2,85]},{18:65,29:84,31:[2,55],57:85,58:66,59:[1,40],63:86,64:67,65:68,66:[1,69],69:[2,55],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{18:65,31:[2,61],34:87,57:88,58:66,59:[1,40],63:89,64:67,65:68,66:[1,69],69:[2,61],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{18:65,20:90,21:[2,47],57:91,58:66,59:[1,40],63:92,64:67,65:68,66:[1,69],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{31:[1,93]},{31:[2,74],59:[2,74],66:[2,74],74:[2,74],75:[2,74],76:[2,74],77:[2,74],78:[2,74],79:[2,74]},{31:[2,76]},{21:[2,24],31:[2,24],52:[2,24],59:[2,24],62:[2,24],66:[2,24],69:[2,24],74:[2,24],75:[2,24],76:[2,24],77:[2,24],78:[2,24],79:[2,24]},{21:[2,25],31:[2,25],52:[2,25],59:[2,25],62:[2,25],66:[2,25],69:[2,25],74:[2,25],75:[2,25],76:[2,25],77:[2,25],78:[2,25],79:[2,25]},{21:[2,27],31:[2,27],52:[2,27],62:[2,27],65:94,66:[1,95],69:[2,27]},{21:[2,89],31:[2,89],52:[2,89],62:[2,89],66:[2,89],69:[2,89]},{21:[2,42],31:[2,42],52:[2,42],59:[2,42],62:[2,42],66:[2,42],67:[1,96],69:[2,42],74:[2,42],75:[2,42],76:[2,42],77:[2,42],78:[2,42],79:[2,42],81:[2,42]},{21:[2,41],31:[2,41],52:[2,41],59:[2,41],62:[2,41],66:[2,41],69:[2,41],74:[2,41],75:[2,41],76:[2,41],77:[2,41],78:[2,41],79:[2,41],81:[2,41]},{52:[1,97]},{52:[2,78],59:[2,78],66:[2,78],74:[2,78],75:[2,78],76:[2,78],77:[2,78],78:[2,78],79:[2,78]},{52:[2,80]},{5:[2,12],13:[2,12],14:[2,12],17:[2,12],27:[2,12],32:[2,12],37:[2,12],42:[2,12],45:[2,12],46:[2,12],49:[2,12],53:[2,12]},{18:98,66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{36:50,37:[1,52],41:51,42:[1,53],43:100,44:99,45:[2,71]},{31:[2,65],38:101,59:[2,65],66:[2,65],69:[2,65],74:[2,65],75:[2,65],76:[2,65],77:[2,65],78:[2,65],79:[2,65]},{45:[2,17]},{5:[2,13],13:[2,13],14:[2,13],17:[2,13],27:[2,13],32:[2,13],37:[2,13],42:[2,13],45:[2,13],46:[2,13],49:[2,13],53:[2,13]},{31:[1,102]},{31:[2,82],59:[2,82],66:[2,82],74:[2,82],75:[2,82],76:[2,82],77:[2,82],78:[2,82],79:[2,82]},{31:[2,84]},{18:65,57:104,58:66,59:[1,40],61:103,62:[2,87],63:105,64:67,65:68,66:[1,69],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{30:106,31:[2,57],68:107,69:[1,108]},{31:[2,54],59:[2,54],66:[2,54],69:[2,54],74:[2,54],75:[2,54],76:[2,54],77:[2,54],78:[2,54],79:[2,54]},{31:[2,56],69:[2,56]},{31:[2,63],35:109,68:110,69:[1,108]},{31:[2,60],59:[2,60],66:[2,60],69:[2,60],74:[2,60],75:[2,60],76:[2,60],77:[2,60],78:[2,60],79:[2,60]},{31:[2,62],69:[2,62]},{21:[1,111]},{21:[2,46],59:[2,46],66:[2,46],74:[2,46],75:[2,46],76:[2,46],77:[2,46],78:[2,46],79:[2,46]},{21:[2,48]},{5:[2,21],13:[2,21],14:[2,21],17:[2,21],27:[2,21],32:[2,21],37:[2,21],42:[2,21],45:[2,21],46:[2,21],49:[2,21],53:[2,21]},{21:[2,90],31:[2,90],52:[2,90],62:[2,90],66:[2,90],69:[2,90]},{67:[1,96]},{18:65,57:112,58:66,59:[1,40],66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{5:[2,22],13:[2,22],14:[2,22],17:[2,22],27:[2,22],32:[2,22],37:[2,22],42:[2,22],45:[2,22],46:[2,22],49:[2,22],53:[2,22]},{31:[1,113]},{45:[2,18]},{45:[2,72]},{18:65,31:[2,67],39:114,57:115,58:66,59:[1,40],63:116,64:67,65:68,66:[1,69],69:[2,67],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{5:[2,23],13:[2,23],14:[2,23],17:[2,23],27:[2,23],32:[2,23],37:[2,23],42:[2,23],45:[2,23],46:[2,23],49:[2,23],53:[2,23]},{62:[1,117]},{59:[2,86],62:[2,86],66:[2,86],74:[2,86],75:[2,86],76:[2,86],77:[2,86],78:[2,86],79:[2,86]},{62:[2,88]},{31:[1,118]},{31:[2,58]},{66:[1,120],70:119},{31:[1,121]},{31:[2,64]},{14:[2,11]},{21:[2,28],31:[2,28],52:[2,28],62:[2,28],66:[2,28],69:[2,28]},{5:[2,20],13:[2,20],14:[2,20],17:[2,20],27:[2,20],32:[2,20],37:[2,20],42:[2,20],45:[2,20],46:[2,20],49:[2,20],53:[2,20]},{31:[2,69],40:122,68:123,69:[1,108]},{31:[2,66],59:[2,66],66:[2,66],69:[2,66],74:[2,66],75:[2,66],76:[2,66],77:[2,66],78:[2,66],79:[2,66]},{31:[2,68],69:[2,68]},{21:[2,26],31:[2,26],52:[2,26],59:[2,26],62:[2,26],66:[2,26],69:[2,26],74:[2,26],75:[2,26],76:[2,26],77:[2,26],78:[2,26],79:[2,26]},{13:[2,14],14:[2,14],17:[2,14],27:[2,14],32:[2,14],37:[2,14],42:[2,14],45:[2,14],46:[2,14],49:[2,14],53:[2,14]},{66:[1,125],71:[1,124]},{66:[2,91],71:[2,91]},{13:[2,15],14:[2,15],17:[2,15],27:[2,15],32:[2,15],42:[2,15],45:[2,15],46:[2,15],49:[2,15],53:[2,15]},{31:[1,126]},{31:[2,70]},{31:[2,29]},{66:[2,92],71:[2,92]},{13:[2,16],14:[2,16],17:[2,16],27:[2,16],32:[2,16],37:[2,16],42:[2,16],45:[2,16],46:[2,16],49:[2,16],53:[2,16]}],defaultActions:{4:[2,1],49:[2,50],51:[2,19],55:[2,52],64:[2,76],73:[2,80],78:[2,17],82:[2,84],92:[2,48],99:[2,18],100:[2,72],105:[2,88],107:[2,58],110:[2,64],111:[2,11],123:[2,70],124:[2,29]},parseError:function(a){throw new Error(a)},parse:function(a){function b(){var a;return a=c.lexer.lex()||1,"number"!=typeof a&&(a=c.symbols_[a]||a),a}var c=this,d=[0],e=[null],f=[],g=this.table,h="",i=0,j=0,k=0;this.lexer.setInput(a),this.lexer.yy=this.yy,this.yy.lexer=this.lexer,this.yy.parser=this,"undefined"==typeof this.lexer.yylloc&&(this.lexer.yylloc={});var l=this.lexer.yylloc;f.push(l);var m=this.lexer.options&&this.lexer.options.ranges;"function"==typeof this.yy.parseError&&(this.parseError=this.yy.parseError);for(var n,o,p,q,r,s,t,u,v,w={};;){if(p=d[d.length-1],this.defaultActions[p]?q=this.defaultActions[p]:((null===n||"undefined"==typeof n)&&(n=b()),q=g[p]&&g[p][n]),"undefined"==typeof q||!q.length||!q[0]){var x="";if(!k){v=[];for(s in g[p])this.terminals_[s]&&s>2&&v.push("'"+this.terminals_[s]+"'");x=this.lexer.showPosition?"Parse error on line "+(i+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+v.join(", ")+", got '"+(this.terminals_[n]||n)+"'":"Parse error on line "+(i+1)+": Unexpected "+(1==n?"end of input":"'"+(this.terminals_[n]||n)+"'"),this.parseError(x,{text:this.lexer.match,token:this.terminals_[n]||n,line:this.lexer.yylineno,loc:l,expected:v})}}if(q[0]instanceof Array&&q.length>1)throw new Error("Parse Error: multiple actions possible at state: "+p+", token: "+n);switch(q[0]){case 1:d.push(n),e.push(this.lexer.yytext),f.push(this.lexer.yylloc),d.push(q[1]),n=null,o?(n=o,o=null):(j=this.lexer.yyleng,h=this.lexer.yytext,i=this.lexer.yylineno,l=this.lexer.yylloc,k>0&&k--);break;case 2:if(t=this.productions_[q[1]][1],w.$=e[e.length-t],w._$={first_line:f[f.length-(t||1)].first_line,last_line:f[f.length-1].last_line,first_column:f[f.length-(t||1)].first_column,last_column:f[f.length-1].last_column},m&&(w._$.range=[f[f.length-(t||1)].range[0],f[f.length-1].range[1]]),r=this.performAction.call(w,h,j,i,this.yy,q[1],e,f),"undefined"!=typeof r)return r;t&&(d=d.slice(0,-1*t*2),e=e.slice(0,-1*t),f=f.slice(0,-1*t)),d.push(this.productions_[q[1]][0]),e.push(w.$),f.push(w._$),u=g[d[d.length-2]][d[d.length-1]],d.push(u);break;case 3:return!0}}return!0}},c=function(){var a={EOF:1,parseError:function(a,b){if(!this.yy.parser)throw new Error(a);this.yy.parser.parseError(a,b)},setInput:function(a){return this._input=a,this._more=this._less=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var a=this._input[0];this.yytext+=a,this.yyleng++,this.offset++,this.match+=a,this.matched+=a;var b=a.match(/(?:\r\n?|\n).*/g);return b?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),a},unput:function(a){var b=a.length,c=a.split(/(?:\r\n?|\n)/g);this._input=a+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-b-1),this.offset-=b;var d=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),c.length-1&&(this.yylineno-=c.length-1);var e=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:c?(c.length===d.length?this.yylloc.first_column:0)+d[d.length-c.length].length-c[0].length:this.yylloc.first_column-b},this.options.ranges&&(this.yylloc.range=[e[0],e[0]+this.yyleng-b]),this},more:function(){return this._more=!0,this},less:function(a){this.unput(this.match.slice(a))},pastInput:function(){var a=this.matched.substr(0,this.matched.length-this.match.length);return(a.length>20?"...":"")+a.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var a=this.match;return a.length<20&&(a+=this._input.substr(0,20-a.length)),(a.substr(0,20)+(a.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var a=this.pastInput(),b=new Array(a.length+1).join("-");return a+this.upcomingInput()+"\n"+b+"^"},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var a,b,c,d,e;this._more||(this.yytext="",this.match="");for(var f=this._currentRules(),g=0;g<f.length&&(c=this._input.match(this.rules[f[g]]),!c||b&&!(c[0].length>b[0].length)||(b=c,d=g,this.options.flex));g++);return b?(e=b[0].match(/(?:\r\n?|\n).*/g),e&&(this.yylineno+=e.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:e?e[e.length-1].length-e[e.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+b[0].length},this.yytext+=b[0],this.match+=b[0],this.matches=b,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._input=this._input.slice(b[0].length),this.matched+=b[0],a=this.performAction.call(this,this.yy,this,f[d],this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),a?a:void 0):""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var a=this.next();return"undefined"!=typeof a?a:this.lex()},begin:function(a){this.conditionStack.push(a)},popState:function(){return this.conditionStack.pop()},_currentRules:function(){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules},topState:function(){return this.conditionStack[this.conditionStack.length-2]},pushState:function(a){this.begin(a)}};return a.options={},a.performAction=function(a,b,c,d){function e(a,c){return b.yytext=b.yytext.substr(a,b.yyleng-c)}switch(c){case 0:if("\\\\"===b.yytext.slice(-2)?(e(0,1),this.begin("mu")):"\\"===b.yytext.slice(-1)?(e(0,1),this.begin("emu")):this.begin("mu"),b.yytext)return 14;break;case 1:return 14;case 2:return this.popState(),14;case 3:return b.yytext=b.yytext.substr(5,b.yyleng-9),this.popState(),16;case 4:return 14;case 5:return this.popState(),13;case 6:return 59;case 7:return 62;case 8:return 17;case 9:return this.popState(),this.begin("raw"),21;case 10:return 53;case 11:return 27;case 12:return 45;case 13:return this.popState(),42;case 14:return this.popState(),42;case 15:return 32;case 16:return 37;case 17:return 49;case 18:return 46;case 19:this.unput(b.yytext),this.popState(),this.begin("com");break;case 20:return this.popState(),13;case 21:return 46;case 22:return 67;case 23:return 66;case 24:return 66;case 25:return 81;case 26:break;case 27:return this.popState(),52;case 28:return this.popState(),31;case 29:return b.yytext=e(1,2).replace(/\\"/g,'"'),74;case 30:return b.yytext=e(1,2).replace(/\\'/g,"'"),74;case 31:return 79;case 32:return 76;case 33:return 76;case 34:return 77;case 35:return 78;case 36:return 75;case 37:return 69;case 38:return 71;case 39:return 66;case 40:return 66;case 41:return"INVALID";case 42:return 5}},a.rules=[/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/,/^(?:[^\x00]*?(?=(\{\{\{\{\/)))/,/^(?:[\s\S]*?--(~)?\}\})/,/^(?:\()/,/^(?:\))/,/^(?:\{\{\{\{)/,/^(?:\}\}\}\})/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^\s*(~)?\}\})/,/^(?:\{\{(~)?\s*else\s*(~)?\}\})/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{(~)?!--)/,/^(?:\{\{(~)?![\s\S]*?\}\})/,/^(?:\{\{(~)?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.)|])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s)])))/,/^(?:false(?=([~}\s)])))/,/^(?:undefined(?=([~}\s)])))/,/^(?:null(?=([~}\s)])))/,/^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/,/^(?:as\s+\|)/,/^(?:\|)/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/],a.conditions={mu:{rules:[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42],inclusive:!1},emu:{rules:[2],inclusive:!1},com:{rules:[5],inclusive:!1},raw:{rules:[3,4],inclusive:!1},INITIAL:{rules:[0,1,42],inclusive:!0}},a}();return b.lexer=c,a.prototype=b,b.Parser=a,new a}();b["default"]=c,a.exports=b["default"]},function(a,b,c){"use strict";function d(){}function e(a,b,c){void 0===b&&(b=a.length);var d=a[b-1],e=a[b-2];return d?"ContentStatement"===d.type?(e||!c?/\r?\n\s*?$/:/(^|\r?\n)\s*?$/).test(d.original):void 0:c}function f(a,b,c){void 0===b&&(b=-1);var d=a[b+1],e=a[b+2];return d?"ContentStatement"===d.type?(e||!c?/^\s*?\r?\n/:/^\s*?(\r?\n|$)/).test(d.original):void 0:c}function g(a,b,c){var d=a[null==b?0:b+1];if(d&&"ContentStatement"===d.type&&(c||!d.rightStripped)){var e=d.value;d.value=d.value.replace(c?/^\s+/:/^[ \t]*\r?\n?/,""),d.rightStripped=d.value!==e}}function h(a,b,c){var d=a[null==b?a.length-1:b-1];if(d&&"ContentStatement"===d.type&&(c||!d.leftStripped)){var e=d.value;return d.value=d.value.replace(c?/\s+$/:/[ \t]+$/,""),d.leftStripped=d.value!==e,d.leftStripped}}var i=c(8)["default"];b.__esModule=!0;var j=c(6),k=i(j);d.prototype=new k["default"],d.prototype.Program=function(a){var b=!this.isRootSeen;this.isRootSeen=!0;for(var c=a.body,d=0,i=c.length;i>d;d++){var j=c[d],k=this.accept(j);if(k){var l=e(c,d,b),m=f(c,d,b),n=k.openStandalone&&l,o=k.closeStandalone&&m,p=k.inlineStandalone&&l&&m;k.close&&g(c,d,!0),k.open&&h(c,d,!0),p&&(g(c,d),h(c,d)&&"PartialStatement"===j.type&&(j.indent=/([ \t]+$)/.exec(c[d-1].original)[1])),n&&(g((j.program||j.inverse).body),h(c,d)),o&&(g(c,d),h((j.inverse||j.program).body))}}return a},d.prototype.BlockStatement=function(a){this.accept(a.program),this.accept(a.inverse);var b=a.program||a.inverse,c=a.program&&a.inverse,d=c,i=c;if(c&&c.chained)for(d=c.body[0].program;i.chained;)i=i.body[i.body.length-1].program;var j={open:a.openStrip.open,close:a.closeStrip.close,openStandalone:f(b.body),closeStandalone:e((d||b).body)};if(a.openStrip.close&&g(b.body,null,!0),c){var k=a.inverseStrip;k.open&&h(b.body,null,!0),k.close&&g(d.body,null,!0),a.closeStrip.open&&h(i.body,null,!0),e(b.body)&&f(d.body)&&(h(b.body),g(d.body))}else a.closeStrip.open&&h(b.body,null,!0);return j},d.prototype.MustacheStatement=function(a){return a.strip},d.prototype.PartialStatement=d.prototype.CommentStatement=function(a){var b=a.strip||{};return{inlineStandalone:!0,open:b.open,close:b.close}},b["default"]=d,a.exports=b["default"]},function(a,b,c){"use strict";function d(a,b){this.source=a,this.start={line:b.first_line,column:b.first_column},this.end={line:b.last_line,column:b.last_column}}function e(a){return/^\[.*\]$/.test(a)?a.substr(1,a.length-2):a}function f(a,b){return{open:"~"===a.charAt(2),close:"~"===b.charAt(b.length-3)}}function g(a){return a.replace(/^\{\{~?\!-?-?/,"").replace(/-?-?~?\}\}$/,"")}function h(a,b,c){c=this.locInfo(c);for(var d=a?"@":"",e=[],f=0,g="",h=0,i=b.length;i>h;h++){var j=b[h].part,k=b[h].original!==j;if(d+=(b[h].separator||"")+j,k||".."!==j&&"."!==j&&"this"!==j)e.push(j);else{if(e.length>0)throw new n["default"]("Invalid path: "+d,{loc:c});".."===j&&(f++,g+="../")}}return new this.PathExpression(a,f,e,d,c)}function i(a,b,c,d,e,f){var g=d.charAt(3)||d.charAt(2),h="{"!==g&&"&"!==g;return new this.MustacheStatement(a,b,c,h,e,this.locInfo(f))}function j(a,b,c,d){if(a.path.original!==c){var e={loc:a.path.loc};throw new n["default"](a.path.original+" doesn't match "+c,e)}d=this.locInfo(d);var f=new this.Program([b],null,{},d);return new this.BlockStatement(a.path,a.params,a.hash,f,void 0,{},{},{},d)}function k(a,b,c,d,e,f){if(d&&d.path&&a.path.original!==d.path.original){var g={loc:a.path.loc};throw new n["default"](a.path.original+" doesn't match "+d.path.original,g)}b.blockParams=a.blockParams;var h=void 0,i=void 0;return c&&(c.chain&&(c.program.body[0].closeStrip=d.strip),i=c.strip,h=c.program),e&&(e=h,h=b,b=e),new this.BlockStatement(a.path,a.params,a.hash,b,h,a.strip,i,d&&d.strip,this.locInfo(f))}var l=c(8)["default"];b.__esModule=!0,b.SourceLocation=d,b.id=e,b.stripFlags=f,b.stripComment=g,b.preparePath=h,b.prepareMustache=i,b.prepareRawBlock=j,b.prepareBlock=k;var m=c(11),n=l(m)},function(a,b,c){"use strict";function d(a,b,c){if(f.isArray(a)){for(var d=[],e=0,g=a.length;g>e;e++)d.push(b.wrap(a[e],c));return d}return"boolean"==typeof a||"number"==typeof a?a+"":a}function e(a){this.srcFile=a,this.source=[]}b.__esModule=!0;var f=c(12),g=void 0;try{}catch(h){}g||(g=function(a,b,c,d){this.src="",d&&this.add(d)},g.prototype={add:function(a){f.isArray(a)&&(a=a.join("")),this.src+=a},prepend:function(a){f.isArray(a)&&(a=a.join("")),this.src=a+this.src},toStringWithSourceMap:function(){return{code:this.toString()}},toString:function(){return this.src}}),e.prototype={prepend:function(a,b){this.source.unshift(this.wrap(a,b))},push:function(a,b){this.source.push(this.wrap(a,b))},merge:function(){var a=this.empty();return this.each(function(b){a.add(["  ",b,"\n"])}),a},each:function(a){for(var b=0,c=this.source.length;c>b;b++)a(this.source[b])},empty:function(){var a=void 0===arguments[0]?this.currentLocation||{start:{}}:arguments[0];return new g(a.start.line,a.start.column,this.srcFile)},wrap:function(a){var b=void 0===arguments[1]?this.currentLocation||{start:{}}:arguments[1];return a instanceof g?a:(a=d(a,this,b),new g(b.start.line,b.start.column,this.srcFile,a))},functionCall:function(a,b,c){return c=this.generateList(c),this.wrap([a,b?"."+b+"(":"(",c,")"])},quotedString:function(a){return'"'+(a+"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")+'"'},objectLiteral:function(a){var b=[];for(var c in a)if(a.hasOwnProperty(c)){var e=d(a[c],this);"undefined"!==e&&b.push([this.quotedString(c),":",e])
}var f=this.generateList(b);return f.prepend("{"),f.add("}"),f},generateList:function(a,b){for(var c=this.empty(b),e=0,f=a.length;f>e;e++)e&&c.add(","),c.add(d(a[e],this,b));return c},generateArray:function(a,b){var c=this.generateList(a,b);return c.prepend("["),c.add("]"),c}},b["default"]=e,a.exports=b["default"]}])});
/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-borderradius-generatedcontent-csstransitions-shiv-mq-teststyles-testprop-testallprops-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function z(a){i.cssText=a}function A(a,b){return z(prefixes.join(a+";")+(b||""))}function B(a,b){return typeof a===b}function C(a,b){return!!~(""+a).indexOf(b)}function D(a,b){for(var d in a){var e=a[d];if(!C(e,"-")&&i[e]!==c)return b=="pfx"?e:!0}return!1}function E(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:B(f,"function")?f.bind(d||b):f}return!1}function F(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+n.join(d+" ")+d).split(" ");return B(b,"string")||B(b,"undefined")?D(e,b):(e=(a+" "+o.join(d+" ")+d).split(" "),E(e,b,c))}var d="2.8.3",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k=":)",l={}.toString,m="Webkit Moz O ms",n=m.split(" "),o=m.toLowerCase().split(" "),p={},q={},r={},s=[],t=s.slice,u,v=function(a,c,d,e){var h,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:g+(d+1),l.appendChild(j);return h=["&#173;",'<style id="s',g,'">',a,"</style>"].join(""),l.id=g,(m?l:n).innerHTML+=h,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=f.style.overflow,f.style.overflow="hidden",f.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),f.style.overflow=k),!!i},w=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b)&&c(b).matches||!1;var d;return v("@media "+b+" { #"+g+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},x={}.hasOwnProperty,y;!B(x,"undefined")&&!B(x.call,"undefined")?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=t.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(t.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(t.call(arguments)))};return e}),p.borderradius=function(){return F("borderRadius")},p.csstransitions=function(){return F("transition")},p.generatedcontent=function(){var a;return v(["#",g,"{font:0/0 a}#",g,':after{content:"',k,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a};for(var G in p)y(p,G)&&(u=G.toLowerCase(),e[u]=p[G](),s.push((e[u]?"":"no-")+u));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)y(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},z(""),h=j=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._domPrefixes=o,e._cssomPrefixes=n,e.mq=w,e.testProp=function(a){return D([a])},e.testAllProps=F,e.testStyles=v,e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
// https://developer.mozilla.org/en-US/docs/Web/Events/wheel
(function(window,document) {

    var prefix = "", _addEventListener, onwheel, support;

    // detect event model
    if ( window.addEventListener ) {
        _addEventListener = "addEventListener";
    } else {
        _addEventListener = "attachEvent";
        prefix = "on";
    }

    // detect available wheel event
    support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
              document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
              "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

    window.addWheelListener = function( elem, callback, useCapture ) {
        _addWheelListener( elem, support, callback, useCapture );

        // handle MozMousePixelScroll in older Firefox
        if( support == "DOMMouseScroll" ) {
            _addWheelListener( elem, "MozMousePixelScroll", callback, useCapture );
        }
    };

    function _addWheelListener( elem, eventName, callback, useCapture ) {
        elem[ _addEventListener ]( prefix + eventName, support == "wheel" ? callback : function( originalEvent ) {
            !originalEvent && ( originalEvent = window.event );

            // create a normalized event object
            var event = {
                // keep a ref to the original event object
                originalEvent: originalEvent,
                target: originalEvent.target || originalEvent.srcElement,
                type: "wheel",
                deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
                deltaX: 0,
                deltaZ: 0,
                preventDefault: function() {
                    originalEvent.preventDefault ?
                        originalEvent.preventDefault() :
                        originalEvent.returnValue = false;
                }
            };
            
            // calculate deltaY (and deltaX) according to the event
            if ( support == "mousewheel" ) {
                event.deltaY = - 1/40 * originalEvent.wheelDelta;
                // Webkit also support wheelDeltaX
                originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 * originalEvent.wheelDeltaX );
            } else {
                event.deltaY = originalEvent.detail;
            }

            // it's time to fire the callback
            return callback( event );

        }, useCapture || false );
    }

})(window,document);
this["app"] = this["app"] || {};
this["app"]["templates"] = this["app"]["templates"] || {};
this["app"]["templates"]["how"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "<nav class=\"main-nav\">\n  <img class=\"logo\" src=\"../assets/png/logo.png\">\n  <h1>            \n    <a class=\"go-first\" href=\"../index.html\">Am I Rent Stabilized?</a>\n  </h1>\n  <div class=\"burger\" alt=\"-\"></div>\n  <ul>\n    <li class=\"nav\"><a href=\"why.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.why : stack1), depth0))
    + "</a></li>\n    <li class=\"nav\"><a href=\"how.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.how : stack1), depth0))
    + "</a></li>\n    <li class=\"nav\"><a href=\"resources.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.resources : stack1), depth0))
    + "</a></li>\n  </ul>\n</nav>\n\n<div id=\"left\">\n  <div class=\"lang-toggle\">\n      <ul>\n          <li><a class=\"toggle-es\" href=\"#\">en español</a></li>\n          <li><p>•</p></li>\n          <li><a class=\"toggle-zh\" href=\"#\">中文</a></li>\n      </ul>\n  </div>\n\n  <div id=\"side-nav\">\n    <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n    <ul>\n      <li><a href=\"#how\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.how : stack1), depth0))
    + "</a></li>\n      <li><a href=\"#code-data\">"
    + ((stack1 = alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.code : stack1), depth0)) != null ? stack1 : "")
    + "</a></li>\n      <li><a href=\"#credits\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.credits : stack1), depth0))
    + "</a></li>\n    </ul>          \n  </div>\n</div>\n\n<div id=\"main\">\n  <a name=\"how\"></a>\n  <h1> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.h1 : stack1), depth0))
    + " </h1>\n  <p>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p01 : stack1)) != null ? stack1['0'] : stack1), depth0))
    + "\n    <strong> "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p01 : stack1)) != null ? stack1['1'] : stack1), depth0))
    + " </strong>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p01 : stack1)) != null ? stack1['2'] : stack1), depth0))
    + "\n  </p>\n\n  <p>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p02 : stack1)) != null ? stack1['0'] : stack1), depth0))
    + "\n    <strong> "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p02 : stack1)) != null ? stack1['1'] : stack1), depth0))
    + " </strong></p>\n\n  <h3>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.h3 : stack1)) != null ? stack1['0'] : stack1), depth0))
    + "</h3>\n  <p>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p03 : stack1)) != null ? stack1['0'] : stack1), depth0))
    + "\n    <strong>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p03 : stack1)) != null ? stack1['1'] : stack1), depth0))
    + "</strong>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p03 : stack1)) != null ? stack1['2'] : stack1), depth0))
    + "\n  </p>\n\n  <h3>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.h3 : stack1)) != null ? stack1['1'] : stack1), depth0))
    + "</h3>\n  <p>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p04 : stack1)) != null ? stack1['0'] : stack1), depth0))
    + "\n    <a target=\"_blank\" href=\"http://www.nyshcr.org/\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p04 : stack1)) != null ? stack1['1'] : stack1), depth0))
    + "\n    </a>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p04 : stack1)) != null ? stack1['2'] : stack1), depth0))
    + "\n  </p>\n  <p>\n    "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p05 : stack1), depth0))
    + "\n  </p>\n  <p>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p06 : stack1)) != null ? stack1['0'] : stack1), depth0))
    + "\n    <a target=\"_blank\" href=\"http://www.nyc.gov/html/dcp/html/bytes/dwn_pluto_mappluto.shtml\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p06 : stack1)) != null ? stack1['1'] : stack1), depth0))
    + "\n    </a>\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p06 : stack1)) != null ? stack1['2'] : stack1), depth0))
    + "\n    <a target=\"_blank\" href=\"http://cdb.io/1CxBFB4\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p06 : stack1)) != null ? stack1['3'] : stack1), depth0))
    + "\n    </a>\n  </p>\n\n  <p>\n    "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p07 : stack1), depth0))
    + "\n  </p>\n  \n  <a name=\"code-data\"></a>\n  <h1>"
    + ((stack1 = alias1(((stack1 = (depth0 != null ? depth0.code : depth0)) != null ? stack1.h1 : stack1), depth0)) != null ? stack1 : "")
    + "</h1>\n  <p>\n    "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.code : depth0)) != null ? stack1.p : stack1), depth0))
    + "\n  </p>\n  <ul>\n    <li><a target=\"_blank\" href=\"https://github.com/clhenrick/am-i-rent-stabilized\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.code : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['0'] : stack1), depth0))
    + "\n    </a></li>\n    <li><a target=\"_blank\" href=\"http://chenrick.cartodb.com/tables/all_nyc_likely_rent_stabl_merged/public\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.code : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['1'] : stack1), depth0))
    + "\n    </a></li>\n    <li><a target=\"_blank\" href=\"https://github.com/clhenrick/dhcr-rent-stabilized-data\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.code : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['2'] : stack1), depth0))
    + "\n    </a></li>\n  </ul>\n  \n  <a name=\"credits\"></a>\n  <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n  <p>\n    "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.p01 : stack1), depth0))
    + "\n  </p>\n  <ul>\n    <li>\n      <a target=\"_blank\" href=\"http://carolinewoolard.com/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['0'] : stack1), depth0))
    + "\n      </a>\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['1'] : stack1), depth0))
    + "\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://radishlab.com/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['2'] : stack1), depth0))
    + "\n      </a>\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['3'] : stack1), depth0))
    + "\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://goodlemons.com/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['4'] : stack1), depth0))
    + "\n      </a>\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['5'] : stack1), depth0))
    + "\n    </li>            \n    <li>\n      <a target=\"_blank\" href=\"http://betanyc.us\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['6'] : stack1), depth0))
    + "\n      </a>\n      "
    + ((stack1 = alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['7'] : stack1), depth0)) != null ? stack1 : "")
    + "\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://cartodb.com\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['8'] : stack1), depth0))
    + "\n      </a>\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['9'] : stack1), depth0))
    + "\n   </li>\n  </ul>\n\n  <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n  <p>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.p02 : stack1)) != null ? stack1['0'] : stack1), depth0))
    + "\n    <a href=\"mailto:amirentstabilized@gmail.com\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.p02 : stack1)) != null ? stack1['1'] : stack1), depth0))
    + "\n    </a>\n  </p> \n  <p>\n    "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.p03 : stack1), depth0))
    + "\n  </p>\n</div>";
},"useData":true});
this["app"]["templates"]["main"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.lambda, alias2=this.escapeExpression;

  return "<nav class=\"main-nav\">\n  <img class=\"logo\" src=\"assets/png/logo.png\">\n  <h1>            \n    <a class=\"go-first\" href=\"#\">Am I Rent Stabilized?</a>\n  </h1>\n  <div class=\"burger\" alt=\"-\"></div>\n  <ul>\n    <li class=\"nav\"><a href=\"html/why.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.why : stack1), depth0))
    + "</a></li>\n    <li class=\"nav\"><a href=\"html/how.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.how : stack1), depth0))
    + "</a></li>\n    <li class=\"nav\"><a href=\"html/resources.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.resources : stack1), depth0))
    + "</a></li>            \n  </ul>\n</nav>\n\n<div id=\"mobile-message\">\n  <img src=\"assets/png/rotate.png\">\n  <h1>"
    + alias2(((helper = (helper = helpers.mobile_msg || (depth0 != null ? depth0.mobile_msg : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"mobile_msg","hash":{},"data":data}) : helper)))
    + "</h1>          \n</div>\n\n<div class=\"lang-toggle desktop\">\n    <ul>\n        <li><a class=\"toggle-es\" href=\"#\"></a></li>\n        <li><p>•</p></li>\n        <li><a class=\"toggle-zh\" href=\"#\"></a></li>\n    </ul>\n</div>\n\n<nav class=\"margin-circles\">\n    <ul>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n    </ul>\n</nav>\n\n<div class=\"slides-container\">\n    <div class=\"slide\" id=\"slide-1\">\n      <div class=\"lang-toggle mobile\">\n          <ul>\n              <li><a class=\"toggle-es\" href=\"#\"></a></li>\n              <li><p>•</p></li>\n              <li><a class=\"toggle-zh\" href=\"#\"></a></li>\n          </ul>\n      </div>      \n      <div class=\"centered\"> \n          <img class=\"triple-s\" src=\"assets/png/triple-sss.png\">              \n          <img class=\"building intro\" src=\"assets/png/building.png\">\n          <h1 class=\"landing\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide01 : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1> \n          <h2 class=\"sub-head\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide01 : depth0)) != null ? stack1.h2 : stack1), depth0))
    + "</h2>\n          <p class=\"landing\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide01 : depth0)) != null ? stack1.landing : stack1), depth0))
    + "</p>\n          <p class=\"go-step4\"><a class=\"go-step4\" href=\"#\">\n            "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide01 : depth0)) != null ? stack1.go_step_4 : stack1), depth0))
    + "\n          </a></p>\n      </div>\n      <div class=\"go-next bottom-arrow\">\n        <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_bottom_arrow : depth0)) != null ? stack1.begin : stack1), depth0))
    + "</h3>\n        <div class=\"arrow\"></div>\n      </div>  \n    </div>\n\n    <div class=\"slide\" id=\"slide-2\">\n      <div class=\"centered\">\n        <!-- <h4 class=\"step\">Step 1 of 5</h4> -->\n        <h1 class=\"step\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n        <p class=\"step\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.privacy : stack1), depth0))
    + "</p>\n\n        <form id=\"address-form\">                    \n          <div class=\"user-data street-address\">\n              <input class=\"address-input\" name=\"address-input\" type=\"text\" placeholder=\""
    + ((stack1 = alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.address : stack1), depth0)) != null ? stack1 : "")
    + "\" tabindex=\"1\">\n          </div>                        \n          <div class=\"user-data borough-select\">\n              <span id=\"select-boro\"> "
    + ((stack1 = alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.boro_select : stack1), depth0)) != null ? stack1 : "")
    + " </span>\n              <ul class=\"drop-down\" id=\"boroughs\">\n                <li><a data-boro=\"BX\" href=\"#\"> "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.boroughs : stack1)) != null ? stack1.bx : stack1), depth0))
    + " </a></li>\n                <li><a data-boro=\"BK\" href=\"#\"> "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.boroughs : stack1)) != null ? stack1.bk : stack1), depth0))
    + " </a></li>\n                <li><a data-boro=\"MN\" href=\"#\"> "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.boroughs : stack1)) != null ? stack1.mn : stack1), depth0))
    + " </a></li>\n                <li><a data-boro=\"QN\" href=\"#\"> "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.boroughs : stack1)) != null ? stack1.qn : stack1), depth0))
    + "  </a></li>\n                <li><a data-boro=\"SI\" href=\"#\"> "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.boroughs : stack1)) != null ? stack1.si : stack1), depth0))
    + "  </a></li>\n              </ul>\n          </div>\n          <ul class=\"validation-error\">\n            <li id=\"error-not-found\"  class=\"val-err vis-hidden\">"
    + ((stack1 = alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.val_errors : stack1)) != null ? stack1.not_found : stack1), depth0)) != null ? stack1 : "")
    + "</li>\n            <li id=\"error-address\" class=\"val-err vis-hidden\"> "
    + ((stack1 = alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.val_errors : stack1)) != null ? stack1.address : stack1), depth0)) != null ? stack1 : "")
    + " </li>\n            <li id=\"error-boro\" class=\"val-err vis-hidden\"> "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.val_errors : stack1)) != null ? stack1.boro : stack1), depth0))
    + " </li>\n          </ul>                                                \n        </form>                       \n      </div>\n      <p class=\"button search\" type=\"submit\"><a href=\"#\"> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.search : stack1), depth0))
    + " </a></p>\n    </div>  \n\n    <div class=\"slide\" id=\"slide-3\">\n        <div class=\"centered v-centered\">\n            <h1 class=\"checking\"> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide03 : depth0)) != null ? stack1.checking : stack1), depth0))
    + " </h1>\n            <p> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide03 : depth0)) != null ? stack1.p : stack1), depth0))
    + " </p>\n            <div id=\"sprite\"></div>\n        </div>\n    </div>\n\n    <div class=\"slide\" id=\"slide-4\">\n        <div class=\"centered\">\n          <div class=\"yes hidden\">\n              <!-- <h1 class=\"news\">Good News!</h1> -->\n              <h1> "
    + ((stack1 = alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.slide04 : depth0)) != null ? stack1.yes : stack1)) != null ? stack1.h1 : stack1), depth0)) != null ? stack1 : "")
    + " </h1>\n              <p> "
    + ((stack1 = alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.slide04 : depth0)) != null ? stack1.yes : stack1)) != null ? stack1.p : stack1), depth0)) != null ? stack1 : "")
    + " </p>\n          </div>\n\n          <div class=\"no\">\n              <!-- <h1 class=\"news\">Sorry!</h1> -->\n              <p> "
    + ((stack1 = alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.slide04 : depth0)) != null ? stack1.no : stack1)) != null ? stack1.p : stack1), depth0)) != null ? stack1 : "")
    + " </p>\n          </div>\n\n          <div id=\"map-container\">\n              <div id=\"map\"></div>\n              <p class=\"map-message\"> "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.slide04 : depth0)) != null ? stack1.map : stack1)) != null ? stack1.caption : stack1), depth0))
    + " </p>\n              <p class=\"map-message\"><a href=\"http://cdb.io/1CvSBy7\" target=\"_blank\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.slide04 : depth0)) != null ? stack1.map : stack1)) != null ? stack1.view_map : stack1), depth0))
    + "</a></p>\n          </div>                                    \n        </div>\n\n        <div class=\"go-next bottom-arrow\">\n          <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_bottom_arrow : depth0)) != null ? stack1.next : stack1), depth0))
    + "</h3>\n          <div class=\"arrow\"></div>\n        </div>\n    </div>        \n\n    <div class=\"slide\" id=\"slide-5\">\n        <div class=\"centered\">\n            <!-- <h4 class=\"step\">Step 2 of 5</h4> -->\n            <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide05 : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n            <div class=\"dhcr-choice\">\n              <p><a id=\"mail-to\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide05 : depth0)) != null ? stack1.mail : stack1), depth0))
    + "</a></p>\n              <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide05 : depth0)) != null ? stack1.phone : stack1), depth0))
    + "<br><a href=\"tel:1-718-739-6400\">718 739-6400</a></p>\n              <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide05 : depth0)) != null ? stack1.visit : stack1), depth0))
    + "<br><a href=\"http://www.nyshcr.org/AboutUs/contact.htm#rent-admin\" target=\"_blank\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide05 : depth0)) != null ? stack1.office : stack1), depth0))
    + "</a></p>                      \n            </div>\n            <p class=\"be-sure\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide05 : depth0)) != null ? stack1.tell_them : stack1), depth0))
    + "</p>\n            <p class=\"be-sure\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide05 : depth0)) != null ? stack1.mailed : stack1), depth0))
    + "</p>\n        </div>                \n        <div class=\"go-next bottom-arrow\">\n          <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_bottom_arrow : depth0)) != null ? stack1.next : stack1), depth0))
    + "</h3>\n          <div class=\"arrow\"></div>\n        </div>\n    </div>\n\n    <div class=\"slide\" id=\"slide-6\">\n        <div class=\"centered\">\n            <!-- <h4 class=\"step\">Step 3 of 5</h4> -->\n            <h1 class=\"check-it\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide06 : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n            <p class=\"check-it\">\n              <span class=\"addtocalendar atc-style-menu-wb\" id=\"atc_text_link\">\n                <a class=\"atcb-link\" id=\"atc_text_link_link\" href=\"#\" tabindex=\"-1\"></a><br> \n              </span>\n            </p>\n            <p class=\"check-it\">\n               "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide06 : depth0)) != null ? stack1.arrive : stack1), depth0))
    + "\n            </p>\n            <p class=\"check-it\">\n              "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide06 : depth0)) != null ? stack1.friends : stack1), depth0))
    + "\n            </p>\n        </div>\n        <div class=\"go-next bottom-arrow\">\n          <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_bottom_arrow : depth0)) != null ? stack1.next : stack1), depth0))
    + "</h3>\n          <div class=\"arrow\"></div>\n        </div>\n    </div>\n\n    <div class=\"slide\" id=\"slide-7\">                \n        <div class=\"centered\">                    \n            <!-- <h4 class=\"step\">Step 4 of 5</h4> -->\n            <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide07 : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n            <a href=\"#rent-history\">\n              <img class=\"rent-history\" src=\"assets/png/sample-rent-history-thumb.png\">\n            </a>\n            <p class=\"view-sample\"><a href=\"#rent-history\">\n              "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide07 : depth0)) != null ? stack1.p : stack1), depth0))
    + "\n            </a></p>\n        </div>\n        <div class=\"go-next bottom-arrow\">\n          <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_bottom_arrow : depth0)) != null ? stack1.next : stack1), depth0))
    + "</h3>\n          <div class=\"arrow\"></div>\n        </div>\n    </div>   \n\n    <div class=\"slide\" id=\"slide-8\">\n        <div class=\"centered\">\n            <!-- <h4 class=\"step\">Step 5 of 5</h4> -->\n            <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide08 : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n            <!-- <img class=\"mascot monster\" src=\"assets/png/no1.png\"> -->\n            <div class=\"action-choice\">                      \n              <h4>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide08 : depth0)) != null ? stack1.option01 : stack1), depth0))
    + "</h4>\n              <p class=\"no-local-tr\">\n                 <a href=\"html/resources.html\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.slide08 : depth0)) != null ? stack1.no_local_tr : stack1)) != null ? stack1.a : stack1), depth0))
    + "</a>\n                 "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.slide08 : depth0)) != null ? stack1.no_local_tr : stack1)) != null ? stack1.p : stack1), depth0))
    + "\n              </p>\n\n              <p class=\"yes-local-tr hidden\">\n                "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.slide08 : depth0)) != null ? stack1.yes_local_tr : stack1)) != null ? stack1.p : stack1), depth0))
    + "\n                <a href=\"#open-modal\"> "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.slide08 : depth0)) != null ? stack1.yes_local_tr : stack1)) != null ? stack1.a : stack1), depth0))
    + " </a>\n              </p>\n\n              <h4>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide08 : depth0)) != null ? stack1.option02 : stack1), depth0))
    + "</h4>\n              <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide08 : depth0)) != null ? stack1.p1 : stack1), depth0))
    + "\n                <a href=\"http://www.nyshcr.org/Forms/Rent/ra89.pdf\" target=\"_blank\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide08 : depth0)) != null ? stack1.a : stack1), depth0))
    + "</a>\n                "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide08 : depth0)) != null ? stack1.p2 : stack1), depth0))
    + "\n              </p>\n            </div>                    \n        </div>                \n        <div class=\"go-next bottom-arrow\">\n          <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_bottom_arrow : depth0)) != null ? stack1.next : stack1), depth0))
    + "</h3>\n          <div class=\"arrow\"></div>\n        </div>\n    </div>    \n\n    <div class=\"slide\" id=\"slide-9\">\n        <div class=\"centered v-centered\">\n            <h1 class=\"end\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide09 : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n            <img class=\"mascot\" src=\"assets/png/yes.png\">\n            <!-- <p><span class=\"go-first\">Start Over</span></p> -->\n            <div class=\"button-holder\">\n              <p class=\"button start-over go-first\" type=\"submit\"><a href=\"#\">\n                "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide09 : depth0)) != null ? stack1.start : stack1), depth0))
    + "</a></p>\n              <p class=\"button learn-more\" type=\"submit\"><a href=\"html/why.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide09 : depth0)) != null ? stack1.learn : stack1), depth0))
    + "</a></p>\n            </div>\n            <div class=\"share-box-end\">\n                <p class=\"share-it\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide09 : depth0)) != null ? stack1.share : stack1), depth0))
    + "</p>\n                <div class=\"addthis_sharing_toolbox\"></div> \n            </div>                                    \n        </div>\n    </div>                        \n</div> <!-- end slides container -->\n<script src=\"//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-551311020cabbff0\" async=\"async\"></script>";
},"useData":true});
this["app"]["templates"]["resources"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "<nav class=\"main-nav\">\n  <img class=\"logo\" src=\"../assets/png/logo.png\">\n  <h1>            \n    <a class=\"go-first\" href=\"../index.html\">Am I Rent Stabilized?</a>\n  </h1>\n  <div class=\"burger\" alt=\"-\"></div>\n  <ul>\n    <li class=\"nav\"><a href=\"why.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.why : stack1), depth0))
    + "</a></li>\n    <li class=\"nav\"><a href=\"how.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.how : stack1), depth0))
    + "</a></li>\n    <li class=\"nav\"><a href=\"resources.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.resources : stack1), depth0))
    + "</a></li>\n  </ul>\n</nav>\n\n<div id=\"left\">\n  <div class=\"lang-toggle\">\n      <ul>\n          <li><a class=\"toggle-es\" href=\"#\">en español</a></li>\n          <li><p>•</p></li>\n          <li><a class=\"toggle-zh\" href=\"#\">中文</a></li>\n      </ul>\n  </div>\n\n  <div id=\"side-nav\">\n    <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n    <ul>\n      <li>\n        <a class=\"responsive-turn-off\" href=\"#non-gov\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.nongov : stack1), depth0))
    + "</a>\n        <ul>\n          <li><a href=\"#city-wide\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.citywide : stack1), depth0))
    + "</a></li>\n          <li><a href=\"#boro\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.boro : stack1), depth0))
    + "</a></li>\n          <li class=\"responsive\"><a href=\"#hood\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.hood : stack1), depth0))
    + "</a></li>\n        </ul>\n      </li>\n      <li><a href=\"#gov\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.gov : stack1), depth0))
    + "</a></li>\n    </ul>\n  </div>\n</div>\n\n<div id=\"main\">\n  <a name=\"non-gov\"></a>\n  <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n  <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.h3 : stack1), depth0))
    + "</p>\n  <a name=\"city-wide\"></a>\n  <h3>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n  <p>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.p01 : stack1), depth0))
    + "</p>\n  <ul>\n    <li>\n      <a target=\"_blank\" href=\"http://www.aafe.org\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['0'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['0'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.anhd.org\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['1'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['1'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://cuffh.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['2'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['2'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.eisny.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['3'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['3'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['3'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n    </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['3'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://metcouncilonhousing.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['4'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['4'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.mfy.org/projects\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['5'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n    </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['5'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.picturethehomeless.org/\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['6'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['6'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>            \n    <li>\n      <a target=\"_blank\" href=\"http://righttothecity.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['7'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['7'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.tenantsandneighbors.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['8'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['8'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>            \n    <li>\n      <a target=\"_blank\" href=\"http://www.uhab.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['9'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['9'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n  </ul>\n  \n  <a name=\"boro\"></a>          \n  <h3>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n  <p>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.p : stack1), depth0))
    + "</p>\n  <ul>\n    <li>\n      <a href=\"http://brooklynhousing.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['0'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['0'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.bronxshepherds.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['1'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['1'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>                        \n    <li>\n      <a target=\"_blank\" href=\"http://www.bka.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['2'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['2'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://queenscommunityhouse.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['3'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['3'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li><a target=\"_blank\" href=\"www.nhsofsi.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['4'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['4'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n  </ul>\n  \n  <a name=\"hood\"></a>\n  <h3>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n  <p>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.p : stack1), depth0))
    + "</p>\n  <ul>\n    <li>\n      <a target=\"_blank\" href=\"http://www.carrollgardensassociation.com/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['0'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['0'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>            \n    <li>\n      <a target=\"_blank\" href=\"https://coopersquare.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['1'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['1'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://crownheightstenantunion.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['2'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "        \n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['2'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.enyuyc.net\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['3'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['3'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.ebofb.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['4'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['4'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.fifthave.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['5'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['5'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.fdconline.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['6'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['6'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://mvdc.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['7'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['7'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.nhsnyc.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['8'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['8'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://NWBcommunity.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['9'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['9'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"www.prattarea.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['10'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['10'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://stnicksalliance.org/SNA/#\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['11'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['11'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.unhp.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['12'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['12'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.whedco.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['13'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['13'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n  </ul>\n\n  <a name=\"gov\"></a>\n  <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.h3 : stack1), depth0))
    + "</h1>\n  <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.p : stack1), depth0))
    + "</p>\n  <ul>\n    <li>\n      <a target=\"_blank\" href=\"http://www.nyshcr.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['0'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['0'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "\n        <a href=\"http://www.nyshcr.org/AboutUs/contact.htm#rent-admin\">\n          "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['0'] : stack1)) != null ? stack1.a : stack1), depth0))
    + "\n        </a>\n      </p>\n    </li>          \n    <li>\n      <a target=\"_blank\" href=\"http://a836-acris.nyc.gov/CP/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['1'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['1'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>          \n    <li>\n      <a target=\"_blank\" href=\"http://www.nyc.gov/html/dob/html/bis/bis.shtml\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['2'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['2'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www1.nyc.gov/site/finance/benefits/tenants-drie.page\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['3'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['3'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a href=\"https://a806-housingconnect.nyc.gov/nyclottery/lottery.html#home\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['4'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['4'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>          \n    <li>\n      <a target=\"_blank\" href=\"http://www1.nyc.gov/site/hpd/index.page\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['5'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['5'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "\n        <a target=\"_blank\" href=\"https://hpdonline.hpdnyc.org/HPDonline/provide_address.aspx\">\n          "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['5'] : stack1)) != null ? stack1.a : stack1), depth0))
    + "\n        </a>\n      </p>\n    </li>          \n    <li>\n      <a target=\"_blank\" href=\"http://nycrgb.org/html/resources/resources.html\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['6'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['6'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www1.nyc.gov/site/finance/benefits/tenants-scrie.page\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['7'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['7'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n  </ul>          \n</div>   ";
},"useData":true});
this["app"]["templates"]["why"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "<nav class=\"main-nav\">\n  <img class=\"logo\" src=\"../assets/png/logo.png\">\n  <h1>            \n    <a class=\"go-first\" href=\"../index.html\">Am I Rent Stabilized?</a>\n  </h1>\n  <div class=\"burger\" alt=\"-\"></div>\n  <ul>\n    <li class=\"nav\"><a href=\"why.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.why : stack1), depth0))
    + "</a></li>\n    <li class=\"nav\"><a href=\"how.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.how : stack1), depth0))
    + "</a></li>\n    <li class=\"nav\"><a href=\"resources.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.resources : stack1), depth0))
    + "</a></li>\n  </ul>\n</nav>\n\n<div id=\"left\">\n  <div class=\"lang-toggle\">\n      <ul>\n          <li><a class=\"toggle-es\" href=\"#\">en español</a></li>\n          <li><p>•</p></li>\n          <li><a class=\"toggle-zh\" href=\"#\">中文</a></li>\n      </ul>\n  </div>\n\n  <div id=\"side-nav\">\n    <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n    <ul>\n      <li><a href=\"#why\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.why : stack1), depth0))
    + "</a></li>\n      <li><a href=\"#what\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.what : stack1), depth0))
    + "</a></li>\n      <li><a href=\"#under-attack\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.under : stack1), depth0))
    + "</a></li>\n      <li><a href=\"#messed-up\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.messed : stack1), depth0))
    + "</a></li>\n      <li><a href=\"#videos\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.videos : stack1), depth0))
    + "</a></li>\n      <li><a href=\"#get-involved\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.involved : stack1), depth0))
    + "</a></li>\n      <li><a href=\"#not-rs\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.not : stack1), depth0))
    + "</a></li>\n    </ul>\n  </div>\n</div>\n\n<div id=\"main\">\n  <a name=\"why\"></a>\n  <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.why : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n  \n  <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.why : depth0)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n  \n  <h3 class=\"italic\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.why : depth0)) != null ? stack1.facts : stack1), depth0))
    + "</h3>\n  \n  <ul>\n    <li>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.why : depth0)) != null ? stack1.one : stack1), depth0))
    + "</li>\n    <li>"
    + ((stack1 = alias1(((stack1 = (depth0 != null ? depth0.why : depth0)) != null ? stack1.two : stack1), depth0)) != null ? stack1 : "")
    + "</li>\n    <li>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.why : depth0)) != null ? stack1.three : stack1), depth0))
    + "</li>\n    <li>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.why : depth0)) != null ? stack1.four : stack1), depth0))
    + "</li>\n  </ul>\n  \n  <a name=\"what\"></a>\n  <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.what : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n  \n  <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.what : depth0)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n  \n  <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.what : depth0)) != null ? stack1.p1 : stack1), depth0))
    + "\n    <a href=\"http://www.dnainfo.com/new-york/20150302/hamilton-heights/landlord-owes-tenant-112000-after-overcharging-him-for-years\" target=\"_blank\">\n      "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.what : depth0)) != null ? stack1.a : stack1), depth0))
    + "\n    </a>\n  </p>\n  \n  <a name=\"under-attack\"></a>\n  <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.under : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n  \n  <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.under : depth0)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n  \n  <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.under : depth0)) != null ? stack1.p : stack1), depth0))
    + "</p>\n  \n  <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.under : depth0)) != null ? stack1.methods : stack1), depth0))
    + "</h3>\n\n  <ul>\n    <li>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.under : depth0)) != null ? stack1.one : stack1), depth0))
    + "</li>\n    <li>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.under : depth0)) != null ? stack1.two : stack1), depth0))
    + "</li>\n    <li>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.under : depth0)) != null ? stack1.three : stack1), depth0))
    + "</li>\n  </ul>\n  \n  <a name=\"messed-up\"></a>\n  <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.messed : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n  \n  <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.messed : depth0)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n  \n  <p>\n    "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.messed : depth0)) != null ? stack1.p1 : stack1), depth0))
    + "\n    <strong>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.messed : depth0)) != null ? stack1.p1_s : stack1), depth0))
    + "</strong>\n  <p/>\n\n  <a name=\"videos\"></a>\n  <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.messed : depth0)) != null ? stack1.p2 : stack1), depth0))
    + "\n    <a href=\"http://projects.studio20nyu.org/ny-tenants/\" target=\"_blank\">\n      "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.messed : depth0)) != null ? stack1.a : stack1), depth0))
    + "\n    </a>\n    "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.messed : depth0)) != null ? stack1.p3 : stack1), depth0))
    + "\n  </p>\n\n  <div class=\"video\">\n    <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.videos : depth0)) != null ? stack1.how : stack1), depth0))
    + "</h3>\n    <iframe src=\"https://www.youtube.com/embed/uvZWZy9uZqA\" frameborder=\"0\" allowfullscreen></iframe>\n  </div>\n\n  <div class=\"video\">\n    <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.videos : depth0)) != null ? stack1.what : stack1), depth0))
    + "</h3>\n    <iframe src=\"https://www.youtube.com/embed/9MB-BhoUXg4\" frameborder=\"0\" allowfullscreen></iframe>\n  </div>\n\n  <div class=\"video\">\n    <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.videos : depth0)) != null ? stack1.bronx : stack1), depth0))
    + "</h3>\n    <iframe src=\"https://www.youtube.com/embed/Yn8tj-8-TeE\" frameborder=\"0\" allowfullscreen></iframe>\n  </div>\n\n  <div class=\"video\">\n    <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.videos : depth0)) != null ? stack1.bushwick : stack1), depth0))
    + "</h3>\n    <iframe src=\"https://www.youtube.com/embed/6oSbEpdL968\" frameborder=\"0\" allowfullscreen></iframe>\n  </div>\n\n  <div class=\"video\">\n    <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.videos : depth0)) != null ? stack1.chinatown : stack1), depth0))
    + "</h3>\n    <iframe src=\"https://www.youtube.com/embed/TtZmANXveXg\" frameborder=\"0\" allowfullscreen></iframe>\n  </div>\n  \n  <a name=\"get-involved\"></a>\n  <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.get_involved : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n  \n  <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.get_involved : depth0)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n  \n  <ul>\n    <li>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.get_involved : depth0)) != null ? stack1.first : stack1), depth0))
    + "\n      <a href=\"./resources.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.get_involved : depth0)) != null ? stack1.a : stack1), depth0))
    + "</a>\n    </li>\n    <li>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.get_involved : depth0)) != null ? stack1.second : stack1), depth0))
    + "</li>\n    <li>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.get_involved : depth0)) != null ? stack1.third : stack1), depth0))
    + "</li>\n  </ul>\n  \n  <a name=\"not-rs\"></a>\n  <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.not_rs : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n  \n  <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.not_rs : depth0)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n  \n  <p>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.not_rs : depth0)) != null ? stack1.p1 : stack1)) != null ? stack1.one : stack1), depth0))
    + "\n    <a href=\"http://thebillfold.com/2012/08/how-to-negotiate-a-lease-renewal/\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.not_rs : depth0)) != null ? stack1.p1 : stack1)) != null ? stack1.a : stack1), depth0))
    + "</a>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.not_rs : depth0)) != null ? stack1.p1 : stack1)) != null ? stack1.two : stack1), depth0))
    + "\n  </p> \n  \n  <p>\n    <strong>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.not_rs : depth0)) != null ? stack1.p2 : stack1)) != null ? stack1.s : stack1), depth0))
    + "</strong>\n    <a href=\"http://www1.nyc.gov/311/index.page\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.not_rs : depth0)) != null ? stack1.p2 : stack1)) != null ? stack1.a1 : stack1), depth0))
    + "</a>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.not_rs : depth0)) != null ? stack1.p2 : stack1)) != null ? stack1.two : stack1), depth0))
    + "\n    <a href=\"./resources.html\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.not_rs : depth0)) != null ? stack1.p2 : stack1)) != null ? stack1.a2 : stack1), depth0))
    + "</a>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.not_rs : depth0)) != null ? stack1.p2 : stack1)) != null ? stack1.three : stack1), depth0))
    + "\n  </p>\n</div>     ";
},"useData":true});
var app = app || {};

app.address = (function(w,d) {
  /*
  ** User address related functions
   */

   var el = app.el;
   var f = app.fns;
   var state = app.s;
   var parsed_address;

   function address() {
     return {
       // form validation for when user enters address and selects boro
      checkAddressInput : function(address, borough) {        
        if (address !== "" && borough !== undefined) {  
          app.events.publish('state-change', {
            formFilled : true
          });
          
          app.f.goToNextSlide();
          parsed_address = app.a.parseAddressInput(address);      
          
          // delay API calls so user sees loading gif
          setTimeout(function(){    
            // console.log('form filled, parsed address: ', parsed_address);
            app.map.fns.geoclient(parsed_address[0], parsed_address[1], borough); 
          }, 1000);              

        } else if (address === "" && borough === undefined) {      
          if (app.f.hasClass(app.el.valErrorAddress, 'vis-hidden')===true && app.f.hasClass(app.el.valErrorBoro, 'vis-hidden')===true){
            app.f.toggleClass(app.el.valErrorAddress, 'vis-hidden');
            app.f.toggleClass(app.el.valErrorBoro, 'vis-hidden');
          }

        } else if (borough === undefined) {
          // alert('Please select your borough.');
          if (app.f.hasClass(app.el.valErrorBoro, 'vis-hidden')===true) {
            app.f.toggleClass(app.el.valErrorBoro, 'vis-hidden');
          }

        } else if (address === '') {
          // alert('Please enter your house number and street.');
          if (app.f.hasClass(app.el.valErrorAddress, 'vis-hidden')===true) {
            app.f.toggleClass(app.el.valErrorAddress, 'vis-hidden');
          }

        } else {
          app.f.goToPrevSlide();
        } 
      },

      // separate the building number and street name from the address input
      parseAddressInput : function(input) {
        var input_split = input.split(' '),
              len = input_split.length,
              num = input_split[0],
              input_last = input_split.splice(1, len),
              street = input_last.join(' ');
        return [num, street];
      },

      // create the mailto content for requesting rent history from dhcr
      createMailTo : function() {
        var email = "rentinfo@nyshcr.org",
              subject = "request for rent history",
              body = "Hello, \n\n" +
                          "I, YOUR NAME HERE, am currently renting " + 
                          "YOUR ADDRESS, APARTMENT NUMBER, BOROUGH, ZIPCODE" +
                          " and would like to request the rent history for this apartment." +
                          " Any information you can provide me would be greatly appreciated. \n\n" +
                          "thank you,\n\n" +
                          "- YOUR NAME HERE",
              msg = 'mailto:' + encodeURIComponent(email) +
                         '?subject=' + encodeURIComponent(subject) +
                         '&body=' + encodeURIComponent(body); 
        app.el.mailTo.setAttribute('href', msg);
      }   
    };
   }

   return {
    address : address
   };

})(window, document);
var app = app || {};

app.elems = (function(w,d,$) { 
  var el;
  // drop down class
  //  code reference: http://tympanus.net/codrops/2012/10/04/custom-drop-down-list-styling/
  function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.drop-down > li > a');
    this.val = undefined;    
    this.name = undefined;
    this.index = -1;
    this.initEvents();
  }  

  // dropdown
  DropDown.prototype = {
    initEvents : function() {
      var obj = this;

      // console.log('initEvents this: ', this);

      obj.dd.on('click', function(e){
        e.preventDefault();
        // $(this).toggleClass('active');
        app.f.toggleClass(this, 'active');
        return false;
      });

      obj.opts.on('click',function(e){
        e.preventDefault();
        var opt = $(this);
        obj.val = opt.data("boro");
        obj.name = opt.text();
        // obj.data = opt.children('span').text();
        obj.index = opt.index();
        obj.placeholder.text('Borough: ' + obj.name);        
        // console.log('obj: ', obj);  
      });
    },

    getValue : function() {
      return this.val;
    },

    getIndex : function() {
      return this.index;
    }
  };  

  // references to DOM elements
  function refDOM(){
    el =  {
      navGoNext : d.querySelectorAll('.go-next'),
      navGoFirst : d.querySelectorAll('.go-first'),
      navGoFour : d.querySelectorAll('.go-step4'),
      burgerIcon : d.querySelector('.burger'),
      navBar : d.querySelector('.main-nav'),
      mainNavList : d.querySelector('.main-nav ul'),
      progressCircles : d.querySelectorAll('.margin-circles li'),
      slidesContainer : d.querySelector('.slides-container'),
      slides : d.querySelectorAll('.slide'),
      slide4 : d.querySelector('#slide-8'),
      dd : new DropDown( $('.user-data.borough-select')),
      addressInput : d.querySelector('.address-input'),
      boroSelect : d.querySelector('.user-data.borough-select'),
      boroDropDown : d.getElementById('boroughs'),
      boroDropDownItems : d.querySelectorAll('#boroughs li a'),
      selectBoro : d.getElementsByName('borough'),
      search : d.querySelector('.search'),
      valErrors : d.querySelectorAll('.val-err'),
      valErrorAddress : d.getElementById('error-address'),
      valErrorBoro : d.getElementById('error-boro'),
      valErrorNF : d.getElementById('error-not-found'),
      yes : d.querySelectorAll('.yes'),
      no : d.querySelectorAll('.no'),
      yesNoState : false,
      map : d.getElementById('map'),
      mapMessage : d.querySelector('.map-message'),
      mailTo : d.getElementById('mail-to'),
      lightBox : d.getElementById('rent-history'),
      addToCalendar : d.getElementById('atc_text_link'),
      addToCalendarLink : d.querySelector('.atcb-link'),
      noTR : d.querySelector('.no-local-tr'),
      yesTR : d.querySelector('.yes-local-tr'),
      trModal : d.getElementsByClassName('tr-modal')[0],           
      learnMore : d.querySelector('.button.learn-more')
    };

    return el;
  }
  
   // trModalClose : d.querySelector('.org-container .close'),      

  return {
    refDOM : refDOM
  };

})(window, document, jQuery);
var app = app || {};

app.events = (function(w, d, $) {    

    var publish = function (name, o) {
       
       // console.log("EVENT [" + name + "]", o);
        $(document).trigger(name, [o]);
    
    };

    var subscribe = function (name, callback) {
        
        $(document).on(name, function(event, o){            
            callback(o);
        });

    };

    return {
        publish : publish,
        subscribe : subscribe
    }; 

})(window, document, jQuery);
var app = app || {};

app.helpers = (function(w,d,el) {
  
  // var el = app.el.refDOM();
  var state = app.s;
  app.f = {};

  app.events.subscribe('state-updated', function(updatedState){
    state = updatedState;
  });

  // key codes for up / down arrows for navigation
  var keyCodes = {
    UP : 38,
    DOWN : 40
  };  

  function registerfns() {
    app.f = {
      addEventListenerList : function (list, event, fn) {
        var i=0, len=list.length;
        for (i; i< len; i++) {
            list[i].addEventListener(event, fn, false);
        }
      },

      onKeyDown : function (event){
        var pressedKey = event.keyCode;
        if (pressedKey === keyCodes.UP) {
          app.f.goToPrevSlide();
          event.preventDefault();
        } 
        else if (pressedKey === keyCodes.DOWN) {
          app.f.goToNextSlide();
          event.preventDefault();
        }
      },

      onMouseWheel : function(event) {
        var delta = event / 30 || -event;    
        if (delta < -1) {
          app.f.goToNextSlide();
        }
        else if (delta > 1) {
          app.f.goToPrevSlide();
        } 
      },

      getSlideIndex : function(slide){
          var index;
          for (var i=0; i < app.el.slides.length; i++) { 
            if (app.el.slides[i] === slide) { 
              index = i; 
            }        
          }
          return index;
      },

      goToSlide : function(slide){
        if (!state.isAnimating && slide) {

          app.events.publish('state-change', {
            isAnimating : true,
            currentSlide : slide
          });

          var index = app.f.getSlideIndex(slide); 
          // console.log('index: ', index, ' slide: ', slide);                 
          TweenLite.to(app.el.slidesContainer, 1, {scrollTo: {y: state.pageHeight * index}, onComplete: app.f.onSlideChangeEnd});
        }
      },

      goToPrevSlide : function(callback){          
        var previous = app.f.getSlideIndex(state.currentSlide) -1;
        // console.log('go previous slide', previous);
        if (previous >=0) {      
          app.f.goToSlide(app.el.slides[previous]);       
          if (callback && typeof callback === "function") { 
            callback();
          }
        }    
      },

      goToNextSlide: function(callback) {
        // console.log('local slide state: ', state);
        var index = app.f.getSlideIndex(state.currentSlide);
        var next = app.el.slides[index + 1];
        if (next && ( index === 0 || (index >= 1 && state.formFilled === true ) ) ) {      
          app.f.goToSlide(next);
          if (callback && typeof callback === "function") { 
            callback(); 
          }  
        }      
      },

      goToFirstSlide : function() {
        // reset everything to defaults
        if (state.currentSlide) {
          app.el.addressInput.value = '';
          app.f.resetSearchResultMsg();      
          app.f.hideFormValidationErrors();
          app.f.resetBoroValue();
          app.map.resetMap();
          app.f.addClass(app.el.yes, 'hidden');
          app.f.removeClass(app.el.no, 'hidden');
          app.f.addClass(app.el.yesTR, 'hidden');
          app.f.removeClass(app.el.noTR, 'hidden');
          d.querySelector('.tr-modal').innerHTML = '';
          app.f.goToSlide(app.el.slides[0]);
          app.events.publish('state-change', {
            formFilled : false
          });
        }
      },

      onSlideChangeEnd : function(){
        app.events.publish('state-change', {
          isAnimating : false
        });      
        app.f.updateProgCircles(state.currentSlide);
      },

      updateProgCircles : function (slide) {
        var s = app.f.getSlideIndex(slide),
              i = 0,
              l = app.el.progressCircles.length,
              backgroundSize;

        if (w.innerHeight <= 770 || w.innerWidth <= 1100) {
          backgroundSize = '20px';
        } else {
          backgroundSize = '25px';
        }
        
        for (i; i<l; i++) {
          var circle = app.el.progressCircles[i];
          if (s===i) {
            circle.style.backgroundImage = 'url(assets/png/oval_25_filled.png)';
            circle.style.backgroundSize = backgroundSize;
            circle.style.backgroundRepeat = 'no-repeat';        
          } else {
            circle.style.background = 'url(assets/png/oval_25_blank.png)';
            circle.style.backgroundSize = backgroundSize; 
            circle.style.backgroundRepeat = 'no-repeat';               
          }
        }
      },

      /*
      ** jQuery-esque helper functions
       */

       // resize window
      onResize : function() {
        // console.log('onResize called');
        var newPageHeight = w.innerHeight - 60;
        var slide = state.currentSlide;
        var index = app.f.getSlideIndex(slide);
        if (state.pageHeight !== newPageHeight) {
          app.events.publish('state-change', { pageHeight : newPageHeight });
          //This can be done via CSS only, but fails into some old browsers, so I prefer to set height via JS
          TweenLite.set([app.el.slidesContainer, app.el.slides], {height: state.pageHeight + "px"});
          //The current slide should be always on the top
          TweenLite.set(app.el.slidesContainer, {scrollTo: {y: state.pageHeight * index}});
        }
      },

      // iterate over node lists
      iterateNodeList : function(list,fn) {
        if (list && list.length) {
          var i=0, len=list.length;
          for (i; i<len; i++) {
            return fn(list[i], i);
          }
        }
        if (list && !list.length) {
          return fn(list);
        }
      },

      indexOf : function(array, item) {
        for (var i = 0; i < array.length; i++) {
          if (array[i] === item)
            return i;
        }
        return -1;
      },  
      
      hasClass : function(el, className) {
        return app.f.iterateNodeList(el, function(el){
          if (el.classList) {
            return el.classList.contains(className);
          } else {
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
          }        
        });
      },

      addClass : function(el, className) {
        app.f.iterateNodeList(el, function(el) {
          if (el.classList) {
            el.classList.add(className);
          } else {
            el.className += ' ' + className;
          }
        });
      },

      toggleClass : function(el, className) {
        app.f.iterateNodeList(el, function(el){
          if (el.classList) {
            el.classList.toggle(className);
          } else {
            var classes = el.className.split(' ');
            var existingIndex = classes.indexOf(className);
            if (existingIndex >=0) {
              classes.splice(existingIndex, 1);
            } else {
              classes.push(className);
              el.className = classes.join(' ');
            }
          }
        });
      },

      removeClass : function(el, className) {
        app.f.iterateNodeList(el, function(el){
          if (el.classList) {
            el.classList.remove(className);
          }
          else {
            el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
          }
        });
      }  ,  

      // reset the yes / no message above map on slide 4
      resetSearchResultMsg : function() {
        if (app.el.yesNoState === true) {
          app.f.toggleClass(el.yes, 'hidden');
          app.f.toggleClass(el.no, 'hidden');
          app.el.yesNoState = false;
        }
      },

      // hide all validation errors
      hideFormValidationErrors : function() {
        var i=0, len=app.el.valErrors.length;
        for (i; i<len; i++) {
          if (app.f.hasClass(app.el.valErrors[i], 'vis-hidden')===false){
            app.f.addClass(app.el.valErrors[i], 'vis-hidden');
          }   
        }    
      },

      resetBoroValue : function() {
        app.el.dd.val = undefined;
        app.el.dd.placeholder.text('Select a Borough');
      },

      addToCalendar : function() {
        var curDate = new Date(),
              startDate,
              endDate;
        startDate = new Date(curDate);
        startDate.setDate(startDate.getDate() + 7);
        endDate = new Date(curDate);
        endDate.setDate(startDate.getDate() + 1);
        app.el.addToCalendar.innerHTML = 
            '<var class="atc_event">' +
                '<var class="atc_date_start">' + startDate + '</var>' +
                '<var class="atc_date_end">' + endDate + '</var>' +
                '<var class="atc_timezone">America/New_York</var>' +
                '<var class="atc_title">Check mail for my rent history</var>' +
                '<var class="atc_description">See if your rent history arrived in the mail, then go back to http://amirentstabilzed.com!</var>' +
                '<var class="atc_location">my house</var>'+
            '</var>';   
        // init the add to calendar library
        w.addtocalendar.load();
        // change the text of the link to be more descriptive
        var atcLink = d.querySelector('.atcb-link');
        atcLink.innerHTML = "Create a calendar reminder.";
        atcLink.tabindex = "-1";
      }
    };
    return app.f;
  }

  return {
    registerfns : registerfns
  };

})(window, document, app.el);
var app = app || {};

app.init = (function(w,d){
  
  // gets the whole thing going
  // called after langToggle loads JSON data for content
  function init(){
      app.el = app.elems.refDOM();
      app.a = app.address.address();
      app.f = app.helpers.registerfns();
      app.l.listen();
      app.language.initLangButtons();

      app.events.publish('state-change', {
        currentSlide : app.el.slides[0]
      });

      app.f.onResize();
      app.f.goToSlide(app.el.currentSlide);
      app.a.createMailTo();
      app.f.addToCalendar();      
      app.map.init();      
  }
  
  return {
    init : init
  };

})(window, document);
var app = app || {};

app.l = (function(w,d,$,el,f) {
  /*
  * Event listeners
  */

  // var el = app.elem;
  // var f = app.fns;
  var state = app.s; // create state object
  var a = app.a; // create address searching object
  var self = this;

    // swipe interaction for mobile
  // $(document).touchwipe({
  //   wipeUp              : function()
  //   {
  //       self.goToNextSlide();
  //   },

  //   wipeDown            : function()
  //   {
  //       self.goToPrevSlide();
  //   },

  //   min_move_x          : 50,
  //   min_move_y          : 15,
  //   preventDefaultEvents: true    
  // });

  function listen() {
    app.events.subscribe('state-updated', function(updatedState){
      state = updatedState;
    });

    // resize window height
    w.onresize = app.f.onResize;

    // use mouse wheel to scroll
    addWheelListener( w, function(e) { 
      app.f.onMouseWheel(e.deltaY); 
      e.preventDefault(); 
    });

    // up / down key navigation
    w.onkeydown = app.f.onKeyDown;

    // listen to window hash change
    w.onhashchange = function() {
      // console.log('window.location.hash: ', w.location.hash);
      // console.log(d.URL.substring(d.URL.lastIndexOf('=') + 1, d.URL.length));
    };

    // go back
    // addEventListenerList(el.navGoPrev, 'click', goToPrevSlide);

    // go forward
    app.f.addEventListenerList(app.el.navGoNext, 'click', app.f.goToNextSlide);

    // go to inspect rent-history
    app.f.addEventListenerList(app.el.navGoFour, 'click', function(e){
      e.preventDefault();
      
      app.events.publish('state-change', {
        formFilled : true
      });
      
      app.f.hideFormValidationErrors();
      app.f.goToSlide(app.el.slides[6]);
    });

    // hamburger icon
    app.el.burgerIcon.addEventListener('click', function(e) {
      e.preventDefault();
      app.f.toggleClass(app.el.burgerIcon, 'open');
      app.f.toggleClass(app.el.mainNavList, 'responsive');
    });

    // if dropdown is visible & user clicks outside of it collapse it
    app.el.slidesContainer.addEventListener('click', function(e){
      if (app.f.hasClass(app.el.boroSelect, 'active')) {
        app.f.removeClass(app.el.boroSelect, 'active');
      }    
    });

    // search button for address
    app.el.search.addEventListener('click', function(e){
      e.preventDefault();
      var streetAddress = app.el.addressInput.value,
            boro = app.el.dd.getValue();    
      _gaq.push(['_trackEvent', 'Address Entered', 'Search', streetAddress + ', ' + boro ]);
      app.a.checkAddressInput(streetAddress, boro);
    });

    // start over
    app.f.addEventListenerList(app.el.navGoFirst, 'click', app.f.goToFirstSlide);

    // hide address error message if it's displayed and user enters text
    app.el.addressInput.addEventListener("blur", function(e){
      if (app.el.addressInput.value !== "" && app.f.hasClass(app.el.valErrorAddress, 'vis-hidden') !== true) {
        app.f.addClass(app.el.valErrorAddress, 'vis-hidden');
      }
    });

    // hide boro error message if it's displayed and user clicks a button
    app.f.addEventListenerList(app.el.boroDropDownItems, 'click', function(e){
      if (app.f.hasClass(app.el.valErrorBoro, 'vis-hidden') !== true && app.el.dd.getValue !== undefined) {
        app.f.addClass(app.el.valErrorBoro, 'vis-hidden');
      }
    });

    app.el.lightBox.addEventListener('click', function(e) {
      e.preventDefault();    
      app.f.goToSlide(app.el.slides[6]);
      w.location.hash = '';
    });  

    // el.trModal.addEventListener('click', function(e) {
    //   e.preventDefault();
    //   f.goToSlide(el.slides[7]);
    //   w.location.hash = '';
    // });
  }

  return {
    listen : listen
  };

})(window, document, jQuery, app.el, app.f);
var app = app || {};

app.language = (function(w,d,$) {

    var $es,
        $zh,
        $en,
        langs = ['en','es','zh'];

  function loadTemplateData(lang, currentPage, callback){
    var template,
        html,
        filePath,
        contentFolder = 'data/';

    // load the correct JSON file based on the app's page
    if (currentPage === 'index') {      
      filePath = contentFolder + 'main-content.json';
      template = app.templates.main;
    } else if (currentPage === 'why') {
      filePath = '../' + contentFolder + 'why-content.json';
      template = app.templates.why;
    } else if (currentPage === 'how') {
      filePath = '../' + contentFolder + 'how-content.json';
      template = app.templates.how;
    } else if (currentPage === 'resources') {
      filePath = '../' + contentFolder + 'resources-content.json';
      template = app.templates.resources;
    }    
    
    $.getJSON(filePath, function(data) {
      // load the correct language object
      if (lang === 'es') {
        html = template(data.languages.es);        
      } else if (lang === 'zh') {
        html = template(data.languages.zh);
      } else  {
        html = template(data.languages.en);
      }      
      d.querySelector('#wrapper').innerHTML = html;
      initLangButtons(); 
    })
    .done(function(){     
      if (currentPage === 'index') {
        app.init.init();
      } else {
        app.pages.toggleBurger();
      }  
      $es = $('.lang-toggle .toggle-es');
      $zh = $('.lang-toggle .toggle-zh');
      $en = $('.lang-toggle .toggle-en');
      changeLangButtons(lang);  
      if (callback && typeof callback === "function") { 
        callback();
      }           
    });
  }
  
  function langToggle(lang, callback) {
      var curLang = w.localStorage.getItem('lang') || 'en';
      var currentPage = document.URL.substring(document.URL.lastIndexOf('/') + 1, document.URL.lastIndexOf('.'));
      
      if (['index', 'why', 'how', 'resources'].indexOf(currentPage) === -1) {
        currentPage = 'index';
      }

      loadTemplateData(curLang, currentPage);
  }

  function changeLangButtons(lang) {
    if (lang === "es") {  
      $es.html('in english');
      $es.removeClass('toggle-es').addClass('toggle-en');
      $zh.html('中文');
      $('body').addClass('es');
      $('body').removeClass('en');
      $('body').removeClass('zh');
    } else if (lang === "zh") {
      $es.html('en español');
      $zh.html('in english');
      $zh.removeClass('toggle-zh').addClass('toggle-en');
      $('body').addClass('zh');
      $('body').removeClass('es');
      $('body').removeClass('en');
    } else {
      $es.html('en español');
      $zh.html('中文');
      $('body').addClass('en');
      $('body').removeClass('es');
      $('body').removeClass('zh');
    }
  }

  function initLangButtons() {
    $('.lang-toggle').find('a').on('click', function(e) {
      e.preventDefault();
      
      var lang;
      
      var val = $(this).html();
      if (val === "en español") {
        lang = 'es';        
      } else if (val === "中文") {
        lang = 'zh';
      } else {
        lang = 'en';
      }
      langToggle(lang);
      w.localStorage.setItem('lang', lang);
      return false;            
    });
  }

  return {
    langToggle : langToggle,
    initLangButtons : initLangButtons
  };

})(window, document, jQuery);
// map & cartodb stuff
var app = app || {};

app.map = (function(d,w,a,H,$){
  var el = {}, // to store DOM element references from app.ui
      f = {},  // to store DOM manipulation and UI functions from app.ui
      state = app.s,
      addressMarker, // leaflet marker to locate user's address on map
      sqlURL = "https://chenrick.cartodb.com/api/v2/sql?q=", //cartodb SQL API reference
      g = {}, // to store properties from NYC Geoclient API result      
      source = d.getElementById('org-template').innerHTML,
      template = H.compile(source),
      hbData = {orgs: []};

  H.registerHelper('each', function(context, options) {
    var ret = "";
    for(var i=0, j=context.length; i<j; i++) {
      ret = ret + options.fn(context[i]);
    }
    return ret;
  });

  H.registerHelper('if', function(conditional, options) {
    if (conditional) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });   

  app.events.subscribe('state-updated', function(updatedState){
    state = updatedState;
  });


  function mapfns() {

    function getJSON(url, type, callback) {
      a().url(url)
          .type(type)
          .on('success', function(data){
            callback(data);
            // console.log('getJSON data: ', data);
          })
          .on('error', function(err){
            // callback('error');
          })
          .go();
    }

    // grab property data from nyc geo-client api
    var geoclient = function(num, name, boro) {
      // create URL to pass to geoclient api
      var id = '9cd0a15f',
            appID = 'app_id=' + id + '&',
            key = '54dc84bcaca9ff4877da771750033275',
            appKey = 'app_key=' + key,
            stNum = 'houseNumber='+ num + '&',
            nameEncoded = name.replace(' ', '+'),
            stName = 'street=' + nameEncoded + '&',
            borough = 'borough=' + boro + '&',
            url = 'https://api.cityofnewyork.us/geoclient/v1/address.json?',
            urlConcat = url + stNum + stName + borough + appID + appKey;
      
      getJSON(urlConcat, 'jsonp', checkResult);      
    };

    // see if the geolient result has a bbl
    var checkResult = function(data) {
      if (typeof data === "object" && data.address.bbl !== undefined ) {      
        var d = data.address;
        g =  {
          bbl : d.bbl,
          lon : d.longitudeInternalLabel,
          lat : d.latitudeInternalLabel,
          hNo : d.houseNumber,
          sName : d.streetName1In,
          bCode : d.boroughCode1In,
          bUSPS : d.uspsPreferredCityName,
          zip : d.zipCode,
          cd: d.communityDistrict,
          bin : d.giBuildingIdentificationNumber1,
          tr_groups : []
        };      
        var bbl = d.bbl;
        var gcr_stringify = JSON.stringify(g);
        _gaq.push(['_trackEvent', 'Geoclient Success', 'Result', gcr_stringify]);

        // console.log('geoclient success, data: ', g);
        
        getCDBdata(bbl);
        showMarker(data);

      } else {      

        app.el.addressInput.value='';
        app.f.resetBoroValue();      
        if (app.f.hasClass(app.el.valErrorNF, 'vis-hidden')===true) {
          app.f.toggleClass(app.el.valErrorNF, 'vis-hidden');
        }
        if (app.f.hasClass(app.el.valErrorBoro, 'vis-hidden')===false) {
          app.f.addClass(app.el.valErrorBoro, 'vis-hidden');
        }
        if (app.f.hasClass(app.el.valErrorAddress, 'vis-hidden')===false) {
          app.f.addClass(app.el.valErrorAddress, 'vis-hidden');
        }
        
        app.events.publish('state-change', { formFilled : false });
        app.f.goToPrevSlide(); 
      }     
    };

    function trQuery(lat, lon) {
      // construct the tenants rights group query
      var query = "SELECT * FROM nyc_tenants_rights_service_areas " +
                  "WHERE " +
                  "ST_Contains(" +
                    "nyc_tenants_rights_service_areas.the_geom," +
                    "ST_GeomFromText(" +
                     "'Point(" + lon + " " + lat + ")', 4326" +
                    ")" +      
                  ");";  
      return query;
    }  

    // check the bbl number against the cartodb data
    var getCDBdata = function(bbl) {
      // sql to pass cartodb's sql api
      var sql1 = "SELECT bbl FROM map_pluto_likely_rs " +
                    "WHERE bbl = " + bbl;    
      var sql2 = trQuery(g.lat, g.lon);                  

      getJSON(sqlURL + sql1, 'json', checkRS);
      getJSON(sqlURL + sql2, 'json', checkTR);
    };

    function checkRS(data) {
      if (data.rows.length > 0 && state.yesNoState === false) {      
        var bbl_match = JSON.stringify(data.rows[0].bbl);
        _gaq.push(['_trackEvent', 'CDB', 'Match', bbl_match]);
        app.f.toggleClass(app.el.yes, 'hidden');
        app.f.toggleClass(app.el.no, 'hidden');
        app.events.publish('state-change', { yesNoState : true });            
      } 

      app.f.goToNextSlide();
    }

    function checkTR(data) {
      if (data.rows.length > 0) {
        app.f.addClass(app.el.noTR, 'hidden');
        app.f.removeClass(app.el.yesTR, 'hidden');
        
        var i = 0, l = data.rows.length;
        for (i; i<l; i++) {
          var x = data.rows[i];
          g.tr_groups.push(x);
          hbData.orgs.push(handlebarsMake(x));
        }
        var html = template(hbData);
        app.el.trModal.innerHTML = html;
        g.tr_groups.length = 0;     
      } 
    }

    function handlebarsMake(data) {
      var context = {
        name: data.name,
        website: data.website_url,
        phone: data.phone,
        email: data.email,
        address: data.address,
        description: data.description
      };
      // var html = template(context);
      return context;
    }  

    // if the results of the CDB SQL query have a row then show yes else display no
    var checkData = function(data) {   
      // console.log('cdb data: ', data); 
      if (data.rows.length > 0 && state.yesNoState === false) {
        // console.log('bbl match!');
        var bbl_match = JSON.stringify(data.rows[0].bbl);
        _gaq.push(['_trackEvent', 'CDB', 'Match', bbl_match]);
        app.f.toggleClass(app.el.yes, 'hidden');
        app.f.toggleClass(app.el.no, 'hidden');
        app.events.publish('state-change', { yesNoState : true });
      } 
      app.f.goToNextSlide();
      // console.log('checkData goToNextSlide called');
    };

    var showMarker = function(data) {
      // console.log('showMarker data: ', data);
      var x = data.address.longitudeInternalLabel,
            y = data.address.latitudeInternalLabel,
            latlng = [y, x],
            address = data.address.houseNumber + ' ' + 
                            data.address.firstStreetNameNormalized + '<br>' +
                            data.address.uspsPreferredCityName + ', NY ' +
                            data.address.zipCode;
      // remove geocoded marker if one already exists
      if (addressMarker) { 
        app.el.map.removeLayer(addressMarker);
      }
      // add a marker and pan and zoom the el.map to it
      addressMarker = new L.marker(latlng).addTo(el.map);
      addressMarker.on('popupopen', function(e){
        app.el.map.setView(latlng, 16);  
      }); 
      addressMarker.bindPopup("<b>" + address + "</b>").openPopup();   
    };

    app.map.fns = {
      geoclient : geoclient,
      showMarker : showMarker
    };

    return app.map.fns;
  } // end mapfns

  var initMap = function() {  

    app.el.map = new L.Map('map', {
      center : [40.7127, -74.0059],
      zoom : 12,
      dragging : false,
      touchZoom : false,
      doubleClickZoom : false,
      scrollWheelZoom : false,
      zoomControl : false,
      keyboard : false
    });

    if (app.el.map.tap) app.el.map.tap.disable();
    // app.el.map.style.cursor='default';

    var basemap = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    });

    var cdbURL = 'https://chenrick.cartodb.com/api/v2/viz/20b7c6ac-ee12-11e4-b74e-0e853d047bba/viz.json';

    var cartocss = "#all_map_pluto_rent_stabl_reg_2014v1 {" +
                      "polygon-fill: #FF6600;" +
                      "polygon-opacity: 0.6;" +
                      "line-color: #000;" +
                      "line-width: 0.7;" +
                      "line-opacity: 0.3;" +
                    "}";
                    
    var sql = 'SELECT the_geom, the_geom_webmercator, cartodb_id, address, borough, ownername, unitsres ' + 
              'FROM all_nyc_likely_rent_stabl_merged';

    var taxLots;

    app.el.map.addLayer(basemap);

    cartodb.createLayer(el.map, cdbURL, {
        cartodb_logo: false, 
        legends: false,
        https: true,
        fullscreen : true     
    },
    function(layer) {
      taxLots = layer.getSubLayer(0);
      taxLots.setCartoCSS(cartocss);
      taxLots.setInteraction(false);      
      app.el.map.addLayer(layer, false);
      basemap.bringToBack();
    })    
    .done(function(layer){
    });
  }; // end init()

  var resetMap = function() {
    if (addressMarker) {
      app.el.map.removeLayer(addressMarker);
    }
    app.el.map.setView([40.7127, -74.0059], 12);
  };

  function init() {
    el = app.el;
    f = app.f;
    state = app.s;
    mapfns();
    initMap();
  }

  return   {
    init : init,
    resetMap : resetMap,
  };

})(document, window, aja, Handlebars, jQuery);
var app = app || {};

app.pages = (function(w,d,$){          

  function iterateNodeList(list, fn) {
    if (list && list.length) {
      var i=0, len=list.length;
      for (i; i<len; i++) {
        return fn(list[i], i);
      }
    }
    if (list && !list.length) {
      return fn(list);
    }   
  } 
  
  function toggleClass(el, className) {
    iterateNodeList(el, function(el){
      if (el.classList) {
        el.classList.toggle(className);
      } else {
        var classes = el.className.split(' ');
        var existingIndex = classes.indexOf(className);
        if (existingIndex >=0) {
          classes.splice(existingIndex, 1);
        } else {
          classes.push(className);
          el.className = classes.join(' ');
        }
      }
    });   
  }

  function toggleBurger(){
    // hamburger icon
    var burgerIcon = document.querySelector('.burger'),
        mainNavList = document.querySelector('.main-nav ul');          
    burgerIcon.addEventListener('click', function(e) {
      e.preventDefault();            
      toggleClass(burgerIcon, 'open');
      toggleClass(mainNavList, 'responsive');
    });              
  }   

	return {
    toggleBurger : toggleBurger,
	};
})(window, document, jQuery);
var app = app || {};

app.s = (function(w,d) {
  // this is for storing the app's current state

  var state = {
    formFilled : false, // has the user filled out the address form?    
    currentSlide : null,
    isAnimating : false,
    pageHeight : null,
    yesNoState : false,
    propertyData : null
  };

  app.events.subscribe('state-change', function(updates){
    
    if (updates.isAnimating !== undefined) state.isAnimating = updates.isAnimating;
    if (updates.formFilled !== undefined) state.formFilled = updates.formFilled;    
    if (updates.currentSlide !== undefined) state.currentSlide = updates.currentSlide;
    if (updates.pageHeight !== undefined) state.pageHeight = updates.pageHeight; 
    if (updates.yesNoState !== undefined) state.yesNoState = updates.yesNoState;
    if (updates.propertyData !== undefined) state.propertyData = updates.propertyData;
    
    // console.log('state: ', state);

    app.events.publish('state-updated', state);
  });

  return {
    state : state
  };

})(window, document);