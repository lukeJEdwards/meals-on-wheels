(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["signoutBtn"],{"7be3":function(t,n,s){},"7d0d":function(t,n,s){"use strict";var i=s("7be3"),e=s.n(i);e.a},fa72:function(t,n,s){"use strict";s.r(n);var i=function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"sign-out-btn",on:{click:function(n){return t.signOut()}}},[s("fa-icon",{staticClass:"icon",attrs:{icon:"sign-out-alt"}}),s("p",{staticClass:"text"},[t._v("Signout")])],1)},e=[],o={name:"SingOutBtn",props:{check:{type:Boolean,default:!0}},methods:{signOut:function(){this.check&&(this.$store.commit("setAuth",!1),this.$store.commit("setUsername",""),this.$router.push("/login"))}}},c=o,u=(s("7d0d"),s("2877")),a=Object(u["a"])(c,i,e,!1,null,"099679d1",null);n["default"]=a.exports}}]);
//# sourceMappingURL=signoutBtn.3e92e1ba.js.map