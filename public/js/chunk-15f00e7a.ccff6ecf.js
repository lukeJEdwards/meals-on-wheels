(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-15f00e7a"],{5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,r){var n=r("1d80"),i=r("5899"),a="["+i+"]",o=RegExp("^"+a+a+"*"),c=RegExp(a+a+"*$"),s=function(t){return function(e){var r=String(n(e));return 1&t&&(r=r.replace(o,"")),2&t&&(r=r.replace(c,"")),r}};t.exports={start:s(1),end:s(2),trim:s(3)}},7156:function(t,e,r){var n=r("861d"),i=r("d2bb");t.exports=function(t,e,r){var a,o;return i&&"function"==typeof(a=e.constructor)&&a!==r&&n(o=a.prototype)&&o!==r.prototype&&i(t,o),t}},8648:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"base"},[t._m(0),t._m(1),r("div",{staticClass:"info"},[t._l(t.deliversClients,(function(e,n){return r("div",{key:n,staticClass:"row"},[r("div",{staticClass:"clients"},t._l(e.clients,(function(e,n){return r("div",{key:n+1e3,staticClass:"client"},[r("div",{staticClass:"name"},[t._v(t._s(e.forename))]),r("div",{staticClass:"name"},[t._v(t._s(e.surname))]),r("div",{staticClass:"address"},[t._v(t._s(e.address))])])})),0),r("div",{staticClass:"delivers"},[t._v(t._s(e.deliver))])])})),t.noDelivers?r("div",{staticClass:"no-items"},[r("p",[t._v("No delivers picked")])]):t._e(),t.noClients?r("div",{staticClass:"no-items"},[r("p",[t._v("No Clients for this day")])]):t._e()],2)])},i=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"titles"},[r("div",{staticClass:"client title"},[r("div",[t._v("Clients")])]),r("div",{staticClass:"delivers title"},[r("div",[t._v("Deliverers")])])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"titles"},[r("div",{staticClass:"client title sub"},[r("div",{staticClass:"name"},[t._v("Forname")]),r("div",{staticClass:"name"},[t._v("Surname")]),r("div",{staticClass:"address"},[t._v("Address")])]),r("div",{staticClass:"delivers title sub"})])}];r("4de4"),r("fb6a"),r("b0c0"),r("a9e3"),r("b64b"),r("96cf"),r("d3b7");function a(t,e,r,n,i,a,o){try{var c=t[a](o),s=c.value}catch(u){return void r(u)}c.done?e(s):Promise.resolve(s).then(n,i)}function o(t){return function(){var e=this,r=arguments;return new Promise((function(n,i){var o=t.apply(e,r);function c(t){a(o,n,i,c,s,"next",t)}function s(t){a(o,n,i,c,s,"throw",t)}c(void 0)}))}}var c={name:"DeliveriersWeek",props:{currentWeek:{type:Object,required:!0},currentDay:{type:Number,required:!0}},computed:{delivers:function(){return this.haveData?this.currentWeek.delivers[this.currentDay].delivers:null},noClients:function(){return this.getDayClients.length<1},noDelivers:function(){return!this.noClients&&this.delivers.length<1},getDayClients:function(){var t=this;return this.haveData?this.currentWeek.data.filter((function(e){return t.hasMeal(e.days[t.currentDay])})):[]},haveData:function(){return Object.keys(this.currentWeek).length>0}},data:function(){return{deliversClients:[]}},watch:{currentWeek:{handler:function(){this.haveData&&this.PairClientDeliver()},deep:!0},currentDay:function(){this.haveData&&this.PairClientDeliver()},deliversClients:{handler:function(){this.$emit("pairing-changed",this.deliversClients)}}},methods:{chunkify:function(t,e){if(e<2)return[t];var r,n=t.length,i=[],a=0;if(n%e===0){r=Math.floor(n/e);while(a<n)i.push(t.slice(a,a+=r))}else while(a<n)r=Math.ceil((n-a)/e--),i.push(t.slice(a,a+=r));return i},PairClientDeliver:function(){var t=this;return o(regeneratorRuntime.mark((function e(){var r,n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.deliversClients=[],r=t.chunkify(t.getDayClients,t.delivers.length),n={},i=0;case 4:if(!(i<t.delivers.length)){e.next=14;break}return e.next=7,t.getDeliver(t.delivers[i]);case 7:n.deliver=e.sent,n.clients=r[i],t.deliversClients.push(n),n={};case 11:i++,e.next=4;break;case 14:case"end":return e.stop()}}),e)})))()},hasMeal:function(t){return t.main>0||t.veg>0||t.soup>0},getDeliver:function(t){var e=this;return o(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,e.$http.get("/delivers/".concat(t));case 3:return n=r.sent,r.abrupt("return",n.data.name);case 7:r.prev=7,r.t0=r["catch"](0),console.log(r.t0);case 10:case"end":return r.stop()}}),r,null,[[0,7]])})))()}}},s=c,u=(r("f878"),r("2877")),l=Object(u["a"])(s,n,i,!1,null,"1020e2f4",null);e["default"]=l.exports},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",o=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(S){s=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var i=e&&e.prototype instanceof y?e:y,a=Object.create(i.prototype),o=new D(n||[]);return a._invoke=L(t,r,o),a}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(S){return{type:"throw",arg:S}}}t.wrap=u;var f="suspendedStart",h="suspendedYield",v="executing",d="completed",p={};function y(){}function g(){}function m(){}var w={};w[a]=function(){return this};var b=Object.getPrototypeOf,_=b&&b(b(A([])));_&&_!==r&&n.call(_,a)&&(w=_);var C=m.prototype=y.prototype=Object.create(w);function x(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function r(i,a,o,c){var s=l(t[i],t,a);if("throw"!==s.type){var u=s.arg,f=u.value;return f&&"object"===typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,o,c)}),(function(t){r("throw",t,o,c)})):e.resolve(f).then((function(t){u.value=t,o(u)}),(function(t){return r("throw",t,o,c)}))}c(s.arg)}var i;function a(t,n){function a(){return new e((function(e,i){r(t,n,e,i)}))}return i=i?i.then(a,a):a()}this._invoke=a}function L(t,e,r){var n=f;return function(i,a){if(n===v)throw new Error("Generator is already running");if(n===d){if("throw"===i)throw a;return O()}r.method=i,r.arg=a;while(1){var o=r.delegate;if(o){var c=N(o,r);if(c){if(c===p)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=d,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=v;var s=l(t,e,r);if("normal"===s.type){if(n=r.done?d:h,s.arg===p)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n=d,r.method="throw",r.arg=s.arg)}}}function N(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,N(t,r),"throw"===r.method))return p;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var i=l(n,t.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,p;var a=i.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,p):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,p)}function k(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function I(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function D(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function A(t){if(t){var r=t[a];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var i=-1,o=function r(){while(++i<t.length)if(n.call(t,i))return r.value=t[i],r.done=!1,r;return r.value=e,r.done=!0,r};return o.next=o}}return{next:O}}function O(){return{value:e,done:!0}}return g.prototype=C.constructor=m,m.constructor=g,g.displayName=s(m,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,s(t,c,"GeneratorFunction")),t.prototype=Object.create(C),t},t.awrap=function(t){return{__await:t}},x(E.prototype),E.prototype[o]=function(){return this},t.AsyncIterator=E,t.async=function(e,r,n,i,a){void 0===a&&(a=Promise);var o=new E(u(e,r,n,i),a);return t.isGeneratorFunction(r)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},x(C),s(C,c,"Generator"),C[a]=function(){return this},C.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=A,D.prototype={constructor:D,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(I),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function i(n,i){return c.type="throw",c.arg=t,r.next=n,i&&(r.method="next",r.arg=e),!!i}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],c=o.completion;if("root"===o.tryLoc)return i("end");if(o.tryLoc<=this.prev){var s=n.call(o,"catchLoc"),u=n.call(o,"finallyLoc");if(s&&u){if(this.prev<o.catchLoc)return i(o.catchLoc,!0);if(this.prev<o.finallyLoc)return i(o.finallyLoc)}else if(s){if(this.prev<o.catchLoc)return i(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return i(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r];if(i.tryLoc<=this.prev&&n.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var a=i;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var o=a?a.completion:{};return o.type=t,o.arg=e,a?(this.method="next",this.next=a.finallyLoc,p):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),I(r),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var i=n.arg;I(r)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:A(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),p}},t}(t.exports);try{regeneratorRuntime=n}catch(i){Function("r","regeneratorRuntime = r")(n)}},a9e3:function(t,e,r){"use strict";var n=r("83ab"),i=r("da84"),a=r("94ca"),o=r("6eeb"),c=r("5135"),s=r("c6b6"),u=r("7156"),l=r("c04e"),f=r("d039"),h=r("7c73"),v=r("241c").f,d=r("06cf").f,p=r("9bf2").f,y=r("58a8").trim,g="Number",m=i[g],w=m.prototype,b=s(h(w))==g,_=function(t){var e,r,n,i,a,o,c,s,u=l(t,!1);if("string"==typeof u&&u.length>2)if(u=y(u),e=u.charCodeAt(0),43===e||45===e){if(r=u.charCodeAt(2),88===r||120===r)return NaN}else if(48===e){switch(u.charCodeAt(1)){case 66:case 98:n=2,i=49;break;case 79:case 111:n=8,i=55;break;default:return+u}for(a=u.slice(2),o=a.length,c=0;c<o;c++)if(s=a.charCodeAt(c),s<48||s>i)return NaN;return parseInt(a,n)}return+u};if(a(g,!m(" 0o1")||!m("0b1")||m("+0x1"))){for(var C,x=function(t){var e=arguments.length<1?0:t,r=this;return r instanceof x&&(b?f((function(){w.valueOf.call(r)})):s(r)!=g)?u(new m(_(e)),r,x):_(e)},E=n?v(m):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),L=0;E.length>L;L++)c(m,C=E[L])&&!c(x,C)&&p(x,C,d(m,C));x.prototype=w,w.constructor=x,o(i,g,x)}},b0c0:function(t,e,r){var n=r("83ab"),i=r("9bf2").f,a=Function.prototype,o=a.toString,c=/^\s*function ([^ (]*)/,s="name";n&&!(s in a)&&i(a,s,{configurable:!0,get:function(){try{return o.call(this).match(c)[1]}catch(t){return""}}})},e381:function(t,e,r){},f878:function(t,e,r){"use strict";var n=r("e381"),i=r.n(n);i.a},fb6a:function(t,e,r){"use strict";var n=r("23e7"),i=r("861d"),a=r("e8b5"),o=r("23cb"),c=r("50c4"),s=r("fc6a"),u=r("8418"),l=r("b622"),f=r("1dde"),h=r("ae40"),v=f("slice"),d=h("slice",{ACCESSORS:!0,0:0,1:2}),p=l("species"),y=[].slice,g=Math.max;n({target:"Array",proto:!0,forced:!v||!d},{slice:function(t,e){var r,n,l,f=s(this),h=c(f.length),v=o(t,h),d=o(void 0===e?h:e,h);if(a(f)&&(r=f.constructor,"function"!=typeof r||r!==Array&&!a(r.prototype)?i(r)&&(r=r[p],null===r&&(r=void 0)):r=void 0,r===Array||void 0===r))return y.call(f,v,d);for(n=new(void 0===r?Array:r)(g(d-v,0)),l=0;v<d;v++,l++)v in f&&u(n,l,f[v]);return n.length=l,n}})}}]);
//# sourceMappingURL=chunk-15f00e7a.ccff6ecf.js.map