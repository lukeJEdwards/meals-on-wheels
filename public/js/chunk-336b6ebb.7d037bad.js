(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-336b6ebb"],{"057f":function(t,e,n){var r=n("fc6a"),i=n("241c").f,o={}.toString,s="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],c=function(t){try{return i(t)}catch(e){return s.slice()}};t.exports.f=function(t){return s&&"[object Window]"==o.call(t)?c(t):i(r(t))}},"0940":function(t,e,n){},"159b":function(t,e,n){var r=n("da84"),i=n("fdbc"),o=n("17c2"),s=n("9112");for(var c in i){var a=r[c],u=a&&a.prototype;if(u&&u.forEach!==o)try{s(u,"forEach",o)}catch(f){u.forEach=o}}},"17c2":function(t,e,n){"use strict";var r=n("b727").forEach,i=n("a640"),o=n("ae40"),s=i("forEach"),c=o("forEach");t.exports=s&&c?[].forEach:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}},"1dde":function(t,e,n){var r=n("d039"),i=n("b622"),o=n("2d00"),s=i("species");t.exports=function(t){return o>=51||!r((function(){var e=[],n=e.constructor={};return n[s]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},4160:function(t,e,n){"use strict";var r=n("23e7"),i=n("17c2");r({target:"Array",proto:!0,forced:[].forEach!=i},{forEach:i})},"4de4":function(t,e,n){"use strict";var r=n("23e7"),i=n("b727").filter,o=n("1dde"),s=n("ae40"),c=o("filter"),a=s("filter");r({target:"Array",proto:!0,forced:!c||!a},{filter:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},5530:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));n("a4d3"),n("4de4"),n("4160"),n("e439"),n("dbb4"),n("b64b"),n("159b");function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}},"65f0":function(t,e,n){var r=n("861d"),i=n("e8b5"),o=n("b622"),s=o("species");t.exports=function(t,e){var n;return i(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!i(n.prototype)?r(n)&&(n=n[s],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===e?0:e)}},"746f":function(t,e,n){var r=n("428f"),i=n("5135"),o=n("e538"),s=n("9bf2").f;t.exports=function(t){var e=r.Symbol||(r.Symbol={});i(e,t)||s(e,t,{value:o.f(t)})}},"7bbc":function(t,e,n){"use strict";var r=n("0940"),i=n.n(r);i.a},8418:function(t,e,n){"use strict";var r=n("c04e"),i=n("9bf2"),o=n("5c6c");t.exports=function(t,e,n){var s=r(e);s in t?i.f(t,s,o(0,n)):t[s]=n}},8997:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"add-form",class:{close:t.closed}},[n("ButtonAndIcon",{staticClass:"save btn",attrs:{prefix:"fas",icon:"save",transition:!1},nativeOn:{click:function(e){return t.save()}}},[t._v("Save")]),n("fa-icon",{staticClass:"close-icon m-1",attrs:{icon:["fas","times"]},on:{click:function(e){return t.close()}}}),t._m(0),n("div",{staticClass:"info flex-container cols"},[n("p",{staticClass:"my-1"},[t._v("Name")]),n("div",{staticClass:"name"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.client.forename,expression:"client.forename"}],staticClass:"input mx-1",attrs:{type:"search",placeholder:"forename"},domProps:{value:t.client.forename},on:{input:function(e){e.target.composing||t.$set(t.client,"forename",e.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:t.client.surname,expression:"client.surname"}],staticClass:"input mx-1",attrs:{type:"search",placeholder:"surname"},domProps:{value:t.client.surname},on:{input:function(e){e.target.composing||t.$set(t.client,"surname",e.target.value)}}})]),n("p",{staticClass:"my-1"},[t._v("Address")]),n("div",{staticClass:"location"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.client.address,expression:"client.address"}],staticClass:"input mx-1 address",attrs:{type:"search",placeholder:"address"},domProps:{value:t.client.address},on:{input:function(e){e.target.composing||t.$set(t.client,"address",e.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:t.client.postcode,expression:"client.postcode"}],staticClass:"input mx-1 postcode",attrs:{type:"search",placeholder:"postcode"},domProps:{value:t.client.postcode},on:{input:function(e){e.target.composing||t.$set(t.client,"postcode",e.target.value)}}})]),n("p",{staticClass:"my-1"},[t._v("Comments")]),n("div",{staticClass:"comments"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.newComment,expression:"newComment"}],staticClass:"input mx-1",attrs:{type:"search",placeholder:"add new comment"},domProps:{value:t.newComment},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.addComment()},input:function(e){e.target.composing||(t.newComment=e.target.value)}}}),n("button",{staticClass:"btn px-2 mx-1",attrs:{type:"button"},on:{click:function(e){return t.addComment()}}},[t._v(" Add ")])]),n("div",{staticClass:"tag-group m-1"},t._l(t.client.comments,(function(e,r){return n("div",{key:r,staticClass:"tag"},[n("p",[t._v(t._s(e))]),n("fa-icon",{attrs:{icon:["fas","times"],id:r},on:{click:function(e){return t.removeComment(e.currentTarget.id)}}})],1)})),0),n("p",{staticClass:"my-1"},[t._v("Dietary Requirements")]),n("div",{staticClass:"comments"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.newRequirement,expression:"newRequirement"}],staticClass:"input mx-1",attrs:{type:"search",placeholder:"add new dietary Requirements"},domProps:{value:t.newRequirement},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.addRequirement()},input:function(e){e.target.composing||(t.newRequirement=e.target.value)}}}),n("button",{staticClass:"btn px-2 mx-1",attrs:{type:"button"},on:{click:function(e){return t.addRequirement()}}},[t._v(" Add ")])]),n("div",{staticClass:"tag-group m-1"},t._l(t.client.dietaryRequirements,(function(e,r){return n("div",{key:r,staticClass:"tag"},[n("p",[t._v(t._s(e))]),n("fa-icon",{attrs:{icon:["fas","times"],id:r},on:{click:function(e){return t.removeRquirement(e.currentTarget.id)}}})],1)})),0),n("div",{staticClass:"felx-conatiner"},[n("button",{staticClass:"btn discard m-1",attrs:{type:"button"},on:{click:function(e){return t.disgard()}}},[t._v(" reset changes ")])])])],1)},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"title"},[n("p",[t._v("Add client")])])}],o=(n("4de4"),n("4160"),n("a434"),n("b64b"),n("d3b7"),n("159b"),n("5530")),s={name:"AddForm",components:{ButtonAndIcon:function(){return n.e("chunk-a61843fc").then(n.bind(null,"1032"))}},data:function(){return{closed:!0,newComment:"",newRequirement:"",client:{forename:"",surname:"",address:"",postcode:"",comments:[],dietaryRequirements:[]},error:""}},computed:{HasForename:function(){return""!=this.client.forename?null:"client needs a forename"},HasSurname:function(){return""!=this.client.surname?null:"client need a surname"},HasAdress:function(){return""!=this.client.address?null:"client need a address"},HasPostCode:function(){return""!=this.client.postcode?null:"client need a postcode"},postcodeFormat:function(){return/([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/.test(this.client.postcode)?null:"Post code has wrong format"}},methods:{addComment:function(){this.client.comments.push(this.newComment),this.newComment=""},addRequirement:function(){this.client.dietaryRequirements.push(this.newRequirement),this.newRequirement=""},removeComment:function(t){this.client.comments.splice(t,1)},removeRquirement:function(t){this.client.dietaryRequirements.splice(t,1)},close:function(){var t=this;this.closed=!0,setTimeout((function(){t.$store.commit("formStatus",{active:!1,type:""})}),750)},save:function(){var t=this,e=[this.HasForename,this.HasSurname,this.HasAdress,this.HasPostCode,this.postcodeFormat].filter((function(t){return null!=t}));if(e.length>0)e.forEach((function(e){return t.$parent.SendNotification(e,"warning",3e3,!0,"top-right")}));else{var n={forename:this.client.forename,surname:this.client.surname,address:this.client.address,postcode:this.client.postcode};this.client.comments.length>0&&(n.comments=this.client.comments),this.client.dietaryRequirements.length>0&&(n.dietaryRequirements=this.client.dietaryRequirements),this.$http.post("/clients",Object(o["a"])({},n)).then((function(e){Object.keys(e.data).length>0&&(t.$parent.refresh(),t.close())})).catch((function(e){return t.$parent.SendNotification(e,"warning",1e4)}))}},disgard:function(){var t=this;Object.keys(this.client).forEach((function(e){t.client[e]=""})),this.client.comments=[],this.client.dietaryRequirements=[]}},mounted:function(){var t=this;setTimeout((function(){t.closed=!1}),10)}},c=s,a=(n("7bbc"),n("2877")),u=Object(a["a"])(c,r,i,!1,null,"2cf6c760",null);e["default"]=u.exports},a434:function(t,e,n){"use strict";var r=n("23e7"),i=n("23cb"),o=n("a691"),s=n("50c4"),c=n("7b0b"),a=n("65f0"),u=n("8418"),f=n("1dde"),l=n("ae40"),d=f("splice"),m=l("splice",{ACCESSORS:!0,0:0,1:2}),p=Math.max,h=Math.min,v=9007199254740991,b="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!d||!m},{splice:function(t,e){var n,r,f,l,d,m,y=c(this),g=s(y.length),w=i(t,g),C=arguments.length;if(0===C?n=r=0:1===C?(n=0,r=g-w):(n=C-2,r=h(p(o(e),0),g-w)),g+n-r>v)throw TypeError(b);for(f=a(y,r),l=0;l<r;l++)d=w+l,d in y&&u(f,l,y[d]);if(f.length=r,n<r){for(l=w;l<g-r;l++)d=l+r,m=l+n,d in y?y[m]=y[d]:delete y[m];for(l=g;l>g-r+n;l--)delete y[l-1]}else if(n>r)for(l=g-r;l>w;l--)d=l+r-1,m=l+n-1,d in y?y[m]=y[d]:delete y[m];for(l=0;l<n;l++)y[l+w]=arguments[l+2];return y.length=g-r+n,f}})},a4d3:function(t,e,n){"use strict";var r=n("23e7"),i=n("da84"),o=n("d066"),s=n("c430"),c=n("83ab"),a=n("4930"),u=n("fdbf"),f=n("d039"),l=n("5135"),d=n("e8b5"),m=n("861d"),p=n("825a"),h=n("7b0b"),v=n("fc6a"),b=n("c04e"),y=n("5c6c"),g=n("7c73"),w=n("df75"),C=n("241c"),O=n("057f"),S=n("7418"),x=n("06cf"),P=n("9bf2"),A=n("d1e7"),j=n("9112"),k=n("6eeb"),R=n("5692"),E=n("f772"),L=n("d012"),q=n("90e3"),_=n("b622"),T=n("e538"),N=n("746f"),H=n("d44e"),D=n("69f3"),M=n("b727").forEach,$=E("hidden"),F="Symbol",z="prototype",G=_("toPrimitive"),V=D.set,Z=D.getterFor(F),I=Object[z],J=i.Symbol,B=o("JSON","stringify"),Y=x.f,Q=P.f,W=O.f,K=A.f,U=R("symbols"),X=R("op-symbols"),tt=R("string-to-symbol-registry"),et=R("symbol-to-string-registry"),nt=R("wks"),rt=i.QObject,it=!rt||!rt[z]||!rt[z].findChild,ot=c&&f((function(){return 7!=g(Q({},"a",{get:function(){return Q(this,"a",{value:7}).a}})).a}))?function(t,e,n){var r=Y(I,e);r&&delete I[e],Q(t,e,n),r&&t!==I&&Q(I,e,r)}:Q,st=function(t,e){var n=U[t]=g(J[z]);return V(n,{type:F,tag:t,description:e}),c||(n.description=e),n},ct=u?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof J},at=function(t,e,n){t===I&&at(X,e,n),p(t);var r=b(e,!0);return p(n),l(U,r)?(n.enumerable?(l(t,$)&&t[$][r]&&(t[$][r]=!1),n=g(n,{enumerable:y(0,!1)})):(l(t,$)||Q(t,$,y(1,{})),t[$][r]=!0),ot(t,r,n)):Q(t,r,n)},ut=function(t,e){p(t);var n=v(e),r=w(n).concat(pt(n));return M(r,(function(e){c&&!lt.call(n,e)||at(t,e,n[e])})),t},ft=function(t,e){return void 0===e?g(t):ut(g(t),e)},lt=function(t){var e=b(t,!0),n=K.call(this,e);return!(this===I&&l(U,e)&&!l(X,e))&&(!(n||!l(this,e)||!l(U,e)||l(this,$)&&this[$][e])||n)},dt=function(t,e){var n=v(t),r=b(e,!0);if(n!==I||!l(U,r)||l(X,r)){var i=Y(n,r);return!i||!l(U,r)||l(n,$)&&n[$][r]||(i.enumerable=!0),i}},mt=function(t){var e=W(v(t)),n=[];return M(e,(function(t){l(U,t)||l(L,t)||n.push(t)})),n},pt=function(t){var e=t===I,n=W(e?X:v(t)),r=[];return M(n,(function(t){!l(U,t)||e&&!l(I,t)||r.push(U[t])})),r};if(a||(J=function(){if(this instanceof J)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=q(t),n=function(t){this===I&&n.call(X,t),l(this,$)&&l(this[$],e)&&(this[$][e]=!1),ot(this,e,y(1,t))};return c&&it&&ot(I,e,{configurable:!0,set:n}),st(e,t)},k(J[z],"toString",(function(){return Z(this).tag})),k(J,"withoutSetter",(function(t){return st(q(t),t)})),A.f=lt,P.f=at,x.f=dt,C.f=O.f=mt,S.f=pt,T.f=function(t){return st(_(t),t)},c&&(Q(J[z],"description",{configurable:!0,get:function(){return Z(this).description}}),s||k(I,"propertyIsEnumerable",lt,{unsafe:!0}))),r({global:!0,wrap:!0,forced:!a,sham:!a},{Symbol:J}),M(w(nt),(function(t){N(t)})),r({target:F,stat:!0,forced:!a},{for:function(t){var e=String(t);if(l(tt,e))return tt[e];var n=J(e);return tt[e]=n,et[n]=e,n},keyFor:function(t){if(!ct(t))throw TypeError(t+" is not a symbol");if(l(et,t))return et[t]},useSetter:function(){it=!0},useSimple:function(){it=!1}}),r({target:"Object",stat:!0,forced:!a,sham:!c},{create:ft,defineProperty:at,defineProperties:ut,getOwnPropertyDescriptor:dt}),r({target:"Object",stat:!0,forced:!a},{getOwnPropertyNames:mt,getOwnPropertySymbols:pt}),r({target:"Object",stat:!0,forced:f((function(){S.f(1)}))},{getOwnPropertySymbols:function(t){return S.f(h(t))}}),B){var ht=!a||f((function(){var t=J();return"[null]"!=B([t])||"{}"!=B({a:t})||"{}"!=B(Object(t))}));r({target:"JSON",stat:!0,forced:ht},{stringify:function(t,e,n){var r,i=[t],o=1;while(arguments.length>o)i.push(arguments[o++]);if(r=e,(m(e)||void 0!==t)&&!ct(t))return d(e)||(e=function(t,e){if("function"==typeof r&&(e=r.call(this,t,e)),!ct(e))return e}),i[1]=e,B.apply(null,i)}})}J[z][G]||j(J[z],G,J[z].valueOf),H(J,F),L[$]=!0},a640:function(t,e,n){"use strict";var r=n("d039");t.exports=function(t,e){var n=[][t];return!!n&&r((function(){n.call(null,e||function(){throw 1},1)}))}},ae40:function(t,e,n){var r=n("83ab"),i=n("d039"),o=n("5135"),s=Object.defineProperty,c={},a=function(t){throw t};t.exports=function(t,e){if(o(c,t))return c[t];e||(e={});var n=[][t],u=!!o(e,"ACCESSORS")&&e.ACCESSORS,f=o(e,0)?e[0]:a,l=o(e,1)?e[1]:void 0;return c[t]=!!n&&!i((function(){if(u&&!r)return!0;var t={length:-1};u?s(t,1,{enumerable:!0,get:a}):t[1]=1,n.call(t,f,l)}))}},b727:function(t,e,n){var r=n("0366"),i=n("44ad"),o=n("7b0b"),s=n("50c4"),c=n("65f0"),a=[].push,u=function(t){var e=1==t,n=2==t,u=3==t,f=4==t,l=6==t,d=5==t||l;return function(m,p,h,v){for(var b,y,g=o(m),w=i(g),C=r(p,h,3),O=s(w.length),S=0,x=v||c,P=e?x(m,O):n?x(m,0):void 0;O>S;S++)if((d||S in w)&&(b=w[S],y=C(b,S,g),t))if(e)P[S]=y;else if(y)switch(t){case 3:return!0;case 5:return b;case 6:return S;case 2:a.call(P,b)}else if(f)return!1;return l?-1:u||f?f:P}};t.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6)}},dbb4:function(t,e,n){var r=n("23e7"),i=n("83ab"),o=n("56ef"),s=n("fc6a"),c=n("06cf"),a=n("8418");r({target:"Object",stat:!0,sham:!i},{getOwnPropertyDescriptors:function(t){var e,n,r=s(t),i=c.f,u=o(r),f={},l=0;while(u.length>l)n=i(r,e=u[l++]),void 0!==n&&a(f,e,n);return f}})},e439:function(t,e,n){var r=n("23e7"),i=n("d039"),o=n("fc6a"),s=n("06cf").f,c=n("83ab"),a=i((function(){s(1)})),u=!c||a;r({target:"Object",stat:!0,forced:u,sham:!c},{getOwnPropertyDescriptor:function(t,e){return s(o(t),e)}})},e538:function(t,e,n){var r=n("b622");e.f=r},e8b5:function(t,e,n){var r=n("c6b6");t.exports=Array.isArray||function(t){return"Array"==r(t)}},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-336b6ebb.7d037bad.js.map