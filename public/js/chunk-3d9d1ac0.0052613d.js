(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3d9d1ac0"],{"0d3c":function(e,t,n){"use strict";var i=n("f765"),s=n.n(i);s.a},"26b0":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"edit-form",class:{close:e.closed}},[n("ButtonAndIcon",{staticClass:"save btn",attrs:{prefix:"fas",icon:"save",transition:!1},nativeOn:{click:function(t){return e.save()}}},[e._v("Save")]),n("fa-icon",{staticClass:"close-icon m-1",attrs:{icon:["fas","times"]},on:{click:function(t){return e.close()}}}),e._m(0),n("div",{staticClass:"info flex-container cols"},[n("p",{staticClass:"my-1"},[e._v("Name")]),n("div",{staticClass:"name"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.client.forename,expression:"client.forename"}],staticClass:"input mx-1",attrs:{type:"search"},domProps:{value:e.client.forename},on:{input:function(t){t.target.composing||e.$set(e.client,"forename",t.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.client.surname,expression:"client.surname"}],staticClass:"input mx-1",attrs:{type:"search"},domProps:{value:e.client.surname},on:{input:function(t){t.target.composing||e.$set(e.client,"surname",t.target.value)}}})]),n("p",{staticClass:"my-1"},[e._v("Address")]),n("div",{staticClass:"location"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.client.address,expression:"client.address"}],staticClass:"input mx-1 address",attrs:{type:"search"},domProps:{value:e.client.address},on:{input:function(t){t.target.composing||e.$set(e.client,"address",t.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.client.postcode,expression:"client.postcode"}],staticClass:"input mx-1 postcode",attrs:{type:"search"},domProps:{value:e.client.postcode},on:{input:function(t){t.target.composing||e.$set(e.client,"postcode",t.target.value)}}})]),n("p",{staticClass:"my-1"},[e._v("Comments")]),n("div",{staticClass:"comments"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.newComment,expression:"newComment"}],staticClass:"input mx-1",attrs:{type:"search",placeholder:"add new comment"},domProps:{value:e.newComment},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.addComment()},input:function(t){t.target.composing||(e.newComment=t.target.value)}}}),n("button",{staticClass:"btn px-2 mx-1",attrs:{type:"button"},on:{click:function(t){return e.addComment()}}},[e._v(" Add ")])]),n("div",{staticClass:"tag-group m-1"},e._l(e.client.comments,(function(t,i){return n("div",{key:i,staticClass:"tag"},[n("p",[e._v(e._s(t))]),n("fa-icon",{attrs:{icon:["fas","times"],id:i},on:{click:function(t){return e.removeComment(t.currentTarget.id)}}})],1)})),0),n("p",{staticClass:"my-1"},[e._v("Dietary Requirements")]),n("div",{staticClass:"comments"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.newRequirement,expression:"newRequirement"}],staticClass:"input mx-1",attrs:{type:"search",placeholder:"add new dietary Requirements"},domProps:{value:e.newRequirement},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.addRequirement()},input:function(t){t.target.composing||(e.newRequirement=t.target.value)}}}),n("button",{staticClass:"btn px-2 mx-1",attrs:{type:"button"},on:{click:function(t){return e.addRequirement()}}},[e._v(" Add ")])]),n("div",{staticClass:"tag-group m-1"},e._l(e.client.dietaryRequirements,(function(t,i){return n("div",{key:i,staticClass:"tag"},[n("p",[e._v(e._s(t))]),n("fa-icon",{attrs:{icon:["fas","times"],id:i},on:{click:function(t){return e.removeRquirement(t.currentTarget.id)}}})],1)})),0),n("div",{staticClass:"felx-conatiner"},[n("button",{staticClass:"btn discard m-1",attrs:{type:"button"},on:{click:function(t){return e.disgard()}}},[e._v(" reset changes ")])])])],1)},s=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"title"},[n("p",[e._v("Edit client")])])}],a=(n("4160"),n("a434"),n("b64b"),n("d3b7"),n("159b"),n("5530")),c=n("2ef0"),o={name:"EditForm",props:{client:{type:Object,required:!0}},components:{ButtonAndIcon:function(){return n.e("chunk-a61843fc").then(n.bind(null,"1032"))}},data:function(){return{closed:!0,newComment:"",newRequirement:"",cache:{}}},methods:{addComment:function(){this.client.comments.push(this.newComment),this.newComment=""},addRequirement:function(){this.client.dietaryRequirements.push(this.newRequirement),this.newRequirement=""},removeComment:function(e){this.client.comments.splice(e,1)},removeRquirement:function(e){this.client.dietaryRequirements.splice(e,1)},close:function(){var e=this;Object(c["isEqual"])(this.client,this.cache)?(this.closed=!0,setTimeout((function(){e.$store.commit("formStatus",{active:!1,type:""})}),750)):this.$parent.SendNotification("Changes have't been saved","warning",3e3)},save:function(){var e=this;this.$http.put("clients/".concat(this.client._id),Object(a["a"])({},this.client)).then((function(t){t.data?(e.cache=Object(c["cloneDeep"])(e.client),e.$parent.refresh(),e.close()):e.$parent.SendNotification(t.data,"warning",3e3)})).catch((function(t){e.$parent.SendNotification(t,"warning",1e4)}))},disgard:function(){var e=this;Object.keys(this.cache).forEach((function(t){e.client[t]=e.cache[t]}))}},mounted:function(){var e=this;this.cache=Object(c["cloneDeep"])(this.client),setTimeout((function(){e.closed=!1}),10)}},r=o,l=(n("0d3c"),n("2877")),u=Object(l["a"])(r,i,s,!1,null,"031dea4e",null);t["default"]=u.exports},a434:function(e,t,n){"use strict";var i=n("23e7"),s=n("23cb"),a=n("a691"),c=n("50c4"),o=n("7b0b"),r=n("65f0"),l=n("8418"),u=n("1dde"),m=n("ae40"),d=u("splice"),p=m("splice",{ACCESSORS:!0,0:0,1:2}),f=Math.max,v=Math.min,h=9007199254740991,C="Maximum allowed length exceeded";i({target:"Array",proto:!0,forced:!d||!p},{splice:function(e,t){var n,i,u,m,d,p,g=o(this),w=c(g.length),y=s(e,w),b=arguments.length;if(0===b?n=i=0:1===b?(n=0,i=w-y):(n=b-2,i=v(f(a(t),0),w-y)),w+n-i>h)throw TypeError(C);for(u=r(g,i),m=0;m<i;m++)d=y+m,d in g&&l(u,m,g[d]);if(u.length=i,n<i){for(m=y;m<w-i;m++)d=m+i,p=m+n,d in g?g[p]=g[d]:delete g[p];for(m=w;m>w-i+n;m--)delete g[m-1]}else if(n>i)for(m=w-i;m>y;m--)d=m+i-1,p=m+n-1,d in g?g[p]=g[d]:delete g[p];for(m=0;m<n;m++)g[m+y]=arguments[m+2];return g.length=w-i+n,u}})},f765:function(e,t,n){}}]);
//# sourceMappingURL=chunk-3d9d1ac0.0052613d.js.map