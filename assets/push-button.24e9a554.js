import{e as r}from"./vuetify.bb113346.js";import{n as p}from"./index.9708b740.js";import"./vue.87a98c28.js";import"./vue3-sfc-loader.a7c67584.js";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e(r,{attrs:{large:"",color:this.color},on:{click:function(n){return t.clickEv(n)}}},[t._v(" "+t._s(t.press?"mdi-radiobox-marked":"mdi-radiobox-blank")+" ")]),e("span",{staticClass:"grey--text px-1 text--darken-2"},[t._v(t._s(t.press?"ON":"OFF"))])],1)},l=[];const u={name:"push-button",icon:"mdi-radiobox-marked",help:"",props:{inputs:{type:Object,value:["pin VDC","pin GND"]},"pin VDC":{default:"",dynamic:"GND"},"pin GND":{default:"",dynamic:"GND"},outputs:{type:Object,value:["output"]},output:{default:"",static:""},color:{default:"#00BCD4"}},data(){return{press:!1}},methods:{clickEv(t){console.log(this.color),this.press=!this.press,console.log("PushButton event:",this.press?"ON":"OFF"),this.$props["pin VDC"]=="ON"&&this.$props["pin GND"]=="OFF"&&this.$emit("send",{title:this.$props.output.toString(),value:this.press?"ON":"OFF"})}}},o={};var i=p(u,a,l,!1,c,null,null,null);function c(t){for(let s in o)this[s]=o[s]}i.options.__file="src/widgets/push-button.vue";var f=i.exports;export{f as default};
