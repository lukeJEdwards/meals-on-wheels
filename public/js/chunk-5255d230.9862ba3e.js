(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5255d230"],{"81b3":function(t,n,e){},c4df:function(t,n,e){"use strict";var i=e("81b3"),c=e.n(i);c.a},ca60:function(t,n,e){"use strict";e.r(n);var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{on:{click:function(n){return t.SignOut()}}},[e("fa-icon",{attrs:{icon:["fas","sign-out-alt"]}}),e("p",[t._v("Signout")])],1)},c=[],o={name:"SignOutButton",props:{check:{type:Function,required:!1,default:function(){return!0}}},methods:{SignOut:function(){this.check()?(this.$store.commit("authentication",!1),this.$router.push({name:"login"})):this.$toast.open({message:"Please Save",type:"warning",position:"top"})}}},u=o,s=(e("c4df"),e("2877")),a=Object(s["a"])(u,i,c,!1,null,"e1cc717e",null);n["default"]=a.exports}}]);
//# sourceMappingURL=chunk-5255d230.9862ba3e.js.map