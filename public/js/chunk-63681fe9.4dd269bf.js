(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-63681fe9"],{"0f9f":function(t,n,e){"use strict";var i=e("8060"),s=e.n(i);s.a},"6f69":function(t,n,e){"use strict";e.r(n);var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"base",class:{close:t.closed}},[e("div",{staticClass:"title"},[e("fa-icon",{staticClass:"icon",attrs:{icon:["fas","times"]},on:{click:function(n){return t.close()}}}),t._v(" Add client ")],1),e("Searchbar",{on:{"search-value":t.FilterHandler}}),e("div",{staticClass:"results"},[t.noResults?e("div",{staticClass:"no-results"},[e("p",[t._v("no clients found")])]):t._e(),t.noSearch?e("div",{staticClass:"no-results"},[e("p",[t._v("please search for a client")])]):t._e(),t.noArray?e("div",t._l(t.clients,(function(n,i){return e("div",{key:i,staticClass:"client"},[e("div",{staticClass:"name"},[t._v(t._s(n.forename))]),e("div",{staticClass:"name"},[t._v(t._s(n.surname))]),e("ButtonIcon",{class:{Added:t.Added(i)},attrs:{icon:t.getButtonIcon(i),"pulse-on-hover":"",type:t.getButtonType(i)},nativeOn:{click:function(n){return t.AddClient(i)}}},[t._v(t._s(t.Added(i)?"Added":"Add"))])],1)})),0):t._e()])],1)},s=[],c=(e("4de4"),e("d3b7"),e("b012")),o={name:"AddForm",components:{Searchbar:function(){return e.e("chunk-5061a671").then(e.bind(null,"e287"))},ButtonIcon:function(){return e.e("chunk-a61843fc").then(e.bind(null,"1032"))}},computed:{noSearch:function(){return""==this.filter},noArray:function(){return this.clients instanceof Array}},props:{addedClients:{type:Array,required:!1,default:function(){return[]}}},data:function(){return{clients:[],filter:"",noResults:!1,closed:!0}},watch:{filter:function(){""==this.filter?this.clients=[]:this.getClients()}},methods:{FilterHandler:function(t){this.filter=t},getClients:Object(c["debounce"])((function(){var t=this;this.$http.get("clients?filter=".concat(this.filter.toLowerCase())).then((function(n){t.clients=n.data,t.clients.length<1?t.noResults=!0:t.noResults=!1})).catch((function(n){t.$toast.open({message:n,type:"error",position:"top"})}))}),500),Added:function(t){var n=this;return this.addedClients.filter((function(e){return e._id==n.clients[t]._id})).length>0},getButtonType:function(t){return this.Added(t)?"default":"add"},getButtonIcon:function(t){return this.Added(t)?"check-circle":"plus"},close:function(){var t=this;this.closed=!0,setTimeout((function(){t.$store.commit("formStatus",{active:!1,type:""})}),750)},AddClient:function(t){this.$emit("add-client",this.clients[t])}},mounted:function(){var t=this;setTimeout((function(){t.closed=!1}),10)}},l=o,r=(e("0f9f"),e("2877")),u=Object(r["a"])(l,i,s,!1,null,"b1297c42",null);n["default"]=u.exports},8060:function(t,n,e){},b012:function(t,n){function e(t,n,e){var i,s,c,o,l;function r(){var u=Date.now()-o;u<n&&u>=0?i=setTimeout(r,n-u):(i=null,e||(l=t.apply(c,s),c=s=null))}null==n&&(n=100);var u=function(){c=this,s=arguments,o=Date.now();var u=e&&!i;return i||(i=setTimeout(r,n)),u&&(l=t.apply(c,s),c=s=null),l};return u.clear=function(){i&&(clearTimeout(i),i=null)},u.flush=function(){i&&(l=t.apply(c,s),c=s=null,clearTimeout(i),i=null)},u}e.debounce=e,t.exports=e}}]);
//# sourceMappingURL=chunk-63681fe9.4dd269bf.js.map