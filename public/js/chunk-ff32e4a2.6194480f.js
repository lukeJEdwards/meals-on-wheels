(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ff32e4a2"],{"13d5":function(t,e,r){"use strict";var n=r("23e7"),a=r("d58f").left,i=r("a640"),o=r("ae40"),s=i("reduce"),c=o("reduce",{1:0});n({target:"Array",proto:!0,forced:!s||!c},{reduce:function(t){return a(this,t,arguments.length,arguments.length>1?arguments[1]:void 0)}})},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,r){var n=r("1d80"),a=r("5899"),i="["+a+"]",o=RegExp("^"+i+i+"*"),s=RegExp(i+i+"*$"),c=function(t){return function(e){var r=String(n(e));return 1&t&&(r=r.replace(o,"")),2&t&&(r=r.replace(s,"")),r}};t.exports={start:c(1),end:c(2),trim:c(3)}},7156:function(t,e,r){var n=r("861d"),a=r("d2bb");t.exports=function(t,e,r){var i,o;return a&&"function"==typeof(i=e.constructor)&&i!==r&&n(o=i.prototype)&&o!==r.prototype&&a(t,o),t}},a9e3:function(t,e,r){"use strict";var n=r("83ab"),a=r("da84"),i=r("94ca"),o=r("6eeb"),s=r("5135"),c=r("c6b6"),u=r("7156"),f=r("c04e"),l=r("d039"),p=r("7c73"),d=r("241c").f,v=r("06cf").f,h=r("9bf2").f,b=r("58a8").trim,y="Number",N=a[y],I=N.prototype,_=c(p(I))==y,g=function(t){var e,r,n,a,i,o,s,c,u=f(t,!1);if("string"==typeof u&&u.length>2)if(u=b(u),e=u.charCodeAt(0),43===e||45===e){if(r=u.charCodeAt(2),88===r||120===r)return NaN}else if(48===e){switch(u.charCodeAt(1)){case 66:case 98:n=2,a=49;break;case 79:case 111:n=8,a=55;break;default:return+u}for(i=u.slice(2),o=i.length,s=0;s<o;s++)if(c=i.charCodeAt(s),c<48||c>a)return NaN;return parseInt(i,n)}return+u};if(i(y,!N(" 0o1")||!N("0b1")||N("+0x1"))){for(var k,E=function(t){var e=arguments.length<1?0:t,r=this;return r instanceof E&&(_?l((function(){I.valueOf.call(r)})):c(r)!=y)?u(new N(g(e)),r,E):g(e)},C=n?d(N):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),T=0;C.length>T;T++)s(N,k=C[T])&&!s(E,k)&&h(E,k,v(N,k));E.prototype=I,I.constructor=E,o(a,y,E)}},be6e:function(t,e,r){"use strict";var n=r("bfc2"),a=r.n(n);a.a},bfc2:function(t,e,r){},cbae:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"totals"},[r("div",{staticClass:"total"},[r("p",{staticClass:"title"},[t._v("Weekly Total")]),r("div",{staticClass:"options"},t._l(t.options,(function(e,n){return r("div",{key:n,staticClass:"option"},[t._v(" "+t._s(e[0].toUpperCase())+": "+t._s(t.weeklyTotal(e))+" ")])})),0)]),r("div",{staticClass:"total"},[r("p",{staticClass:"title"},[t._v("Daily Total")]),r("div",{staticClass:"options"},t._l(t.options,(function(e,n){return r("div",{key:n,staticClass:"option"},[t._v(" "+t._s(e[0].toUpperCase())+": "+t._s(t.dailyTotal(e))+" ")])})),0)])])},a=[],i=(r("13d5"),r("a9e3"),r("b64b"),{name:"Totals",props:{currentWeek:{type:Object,required:!0},currentDay:{type:Number,required:!0}},computed:{haveData:function(){return this.currentDay>-1&&Object.keys(this.currentWeek).length>0}},data:function(){return{options:["main","veg","soup","pudding"]}},methods:{dailyTotal:function(t){var e=this;return this.haveData?this.currentWeek.data.reduce((function(r,n){return r+parseInt(n.days[e.currentDay][t])}),0):"Na"},weeklyTotal:function(t){var e=this;if(this.haveData){for(var r=0,n=function(n){r+=e.currentWeek.data.reduce((function(e,r){return e+parseInt(r.days[n][t])}),0)},a=0;a<5;a++)n(a);return r}return"Na"}}}),o=i,s=(r("be6e"),r("2877")),c=Object(s["a"])(o,n,a,!1,null,"1c37b7ee",null);e["default"]=c.exports},d58f:function(t,e,r){var n=r("1c0b"),a=r("7b0b"),i=r("44ad"),o=r("50c4"),s=function(t){return function(e,r,s,c){n(r);var u=a(e),f=i(u),l=o(u.length),p=t?l-1:0,d=t?-1:1;if(s<2)while(1){if(p in f){c=f[p],p+=d;break}if(p+=d,t?p<0:l<=p)throw TypeError("Reduce of empty array with no initial value")}for(;t?p>=0:l>p;p+=d)p in f&&(c=r(c,f[p],p,u));return c}};t.exports={left:s(!1),right:s(!0)}}}]);
//# sourceMappingURL=chunk-ff32e4a2.6194480f.js.map