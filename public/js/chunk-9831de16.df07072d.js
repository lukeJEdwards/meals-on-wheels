(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9831de16"],{"0e80":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main"},[t.addform?n("AddForm"):t._e(),t.editform?n("EditForm",{attrs:{client:t.currentClient}}):t._e(),t.deleteform?n("DeleteForm",{attrs:{client:t.currentClient,delete:t.DeleteClient}}):t._e(),n("Bar",{class:{freeze:t.formOpen},attrs:{refresh:t.refresh}}),n("div",{staticClass:"mid",class:{freeze:t.formOpen}},[n("ClientViewport",{ref:"viewPort",attrs:{"current-client":t.currentClient},on:{"current-client":t.currentClientHandler}})],1),n("div",{staticClass:"buttons",class:{freeze:t.formOpen}},[n("ButtonIcon",{attrs:{icon:"plus","rotate-on-hover":"",type:"add"},nativeOn:{click:function(e){return t.openAddUser()}}},[t._v(" Add ")]),n("ButtonIcon",{attrs:{icon:"user-edit","pulse-on-hover":"",type:"edit"},nativeOn:{click:function(e){return t.openEditUser()}}},[t._v(" Edit ")]),n("ButtonIcon",{attrs:{icon:"minus","pulse-on-hover":"",type:"delete"},nativeOn:{click:function(e){return t.openDeleteUser()}}},[t._v(" Delete ")])],1)],1)},i=[],o=(n("b64b"),n("d3b7"),{name:"ClientForm",components:{Bar:function(){return n.e("chunk-6f13877a").then(n.bind(null,"37d8"))},ClientViewport:function(){return n.e("chunk-5d0581cf").then(n.bind(null,"8f8d"))},ButtonIcon:function(){return n.e("chunk-a61843fc").then(n.bind(null,"1032"))},AddForm:function(){return n.e("chunk-336b6ebb").then(n.bind(null,"8997"))},EditForm:function(){return Promise.all([n.e("chunk-5559dad2"),n.e("chunk-3d9d1ac0")]).then(n.bind(null,"26b0"))},DeleteForm:function(){return n.e("chunk-188265f4").then(n.bind(null,"516f"))}},computed:{editform:function(){var t=this.$store.state.formStatus;return t.active&&"edit"==t.type},deleteform:function(){var t=this.$store.state.formStatus;return t.active&&"delete"==t.type},addform:function(){var t=this.$store.state.formStatus;return t.active&&"add"==t.type},formOpen:function(){return this.$store.state.formStatus.active}},data:function(){return{currentClient:{},form:"",openSideForm:!1}},methods:{currentClientHandler:function(t){this.currentClient=t},refresh:function(){this.$refs.viewPort.refresh()},openAddUser:function(){this.$store.commit("formStatus",{active:!0,type:"add"})},openEditUser:function(){Object.keys(this.currentClient).length>0?this.$store.commit("formStatus",{active:!0,type:"edit"}):this.SendNotification("Please select a client","warning")},openDeleteUser:function(){Object.keys(this.currentClient).length>0?this.$store.commit("formStatus",{active:!0,type:"delete"}):this.SendNotification("Please select a client","warning")},DeleteClient:function(){var t=this;this.$http.delete("clients/".concat(this.currentClient._id)).then((function(e){"err"in e.data?t.SendNotification(e.data,"warning",3e3):(t.refresh(),t.currentClient={})})).catch((function(e){t.SendNotification(e,"warning",1e4)}))},SendNotification:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2e3,r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"top";this.$toast.open({message:t,type:e,position:i,duration:n,pauseOnHover:!0,dismissible:r})}}}),c=o,s=(n("873d"),n("2877")),u=Object(s["a"])(c,r,i,!1,null,"4d62e2b6",null);e["default"]=u.exports},7847:function(t,e,n){},"873d":function(t,e,n){"use strict";var r=n("7847"),i=n.n(r);i.a},b64b:function(t,e,n){var r=n("23e7"),i=n("7b0b"),o=n("df75"),c=n("d039"),s=c((function(){o(1)}));r({target:"Object",stat:!0,forced:s},{keys:function(t){return o(i(t))}})}}]);
//# sourceMappingURL=chunk-9831de16.df07072d.js.map