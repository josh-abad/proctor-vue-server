(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-13da0e6f"],{"19bf":function(e,t,a){"use strict";var l=a("7a23"),n={class:"bg-gray-100 dark:bg-gray-800 shadow p-6 rounded-lg"};function o(e,t){return Object(l["s"])(),Object(l["f"])("div",n,[Object(l["z"])(e.$slots,"default")])}const d={};d.render=o;t["a"]=d},"5c37":function(e,t,a){"use strict";a.r(t);var l=a("7a23"),n=Object(l["j"])("div",{class:"flex items-center"},[Object(l["j"])("svg",{class:"fill-current w-8 h-8",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},[Object(l["j"])("path",{"fill-rule":"evenodd",d:"M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z","clip-rule":"evenodd"})]),Object(l["j"])("div",{class:"ml-2 font-bold text-3xl"},"Settings")],-1),o={class:"mt-8"},d=Object(l["j"])("h1",{class:"uppercase font-semibold tracking-wide text-xs dark:text-gray-400"}," Appearance ",-1);function c(e,t,a,c,s,r){var u=Object(l["A"])("ToggleButton"),i=Object(l["A"])("BasePanel");return Object(l["s"])(),Object(l["f"])("div",null,[Object(l["j"])(i,null,{default:Object(l["M"])((function(){return[n,Object(l["j"])("div",o,[d,Object(l["j"])("div",null,[Object(l["j"])(u,{modelValue:e.automatic,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.automatic=t}),label:"Automatic (follows system settings)"},null,8,["modelValue"])]),Object(l["j"])("div",null,[Object(l["j"])(u,{modelValue:e.darkMode,"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.darkMode=t}),label:"Dark Mode",disabled:e.automatic},null,8,["modelValue","disabled"])])])]})),_:1})])}var s=a("19bf"),r={class:"relative"},u={class:"ml-3 text-sm"};function i(e,t,a,n,o,d){return Object(l["s"])(),Object(l["f"])("label",{for:e.label,class:["mt-3 inline-flex items-center",e.disabled?"opacity-50 cursor-default":"opacity-100 cursor-pointer"]},[Object(l["j"])("span",r,[Object(l["j"])("span",{class:["block w-10 h-6 rounded-full shadow-inner",e.modelValue?"bg-green-500":"bg-gray-400 dark:bg-gray-600"]},null,2),Object(l["j"])("span",{class:["absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow-lg inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out",e.modelValue?"transform translate-x-full":""]},[Object(l["j"])("input",{value:e.modelValue,onChange:t[1]||(t[1]=function(t){return e.$emit("update:modelValue",t.target.checked)}),id:e.label,disabled:e.disabled,type:"checkbox",class:"absolute opacity-0 w-0 h-0"},null,40,["value","id","disabled"])],2)]),Object(l["j"])("span",u,Object(l["F"])(e.label),1)],10,["for"])}var b=Object(l["k"])({name:"ToggleButton",props:{modelValue:{type:Boolean,required:!1,default:!1},label:{type:String,required:!1,default:""},disabled:{type:Boolean,required:!1,default:!1}},emits:["update:modelValue"]});b.render=i;var m=b,h=a("2d40"),f=Object(l["k"])({name:"SettingsPage",components:{ToggleButton:m,BasePanel:s["a"]},data:function(){return{automatic:!1,darkMode:!1}},computed:{theme:function(){return this.$store.state.theme.theme}},watch:{automatic:function(e){e?this.handleChangeTheme(null):this.handleChangeTheme(this.darkMode?"dark":"light")},darkMode:function(e){this.handleChangeTheme(e?"dark":"light")}},mounted:function(){this.theme?this.darkMode="dark"===this.theme:this.automatic=!0},methods:{handleChangeTheme:function(e){this.$store.commit(h["o"],e)}}});f.render=c;t["default"]=f}}]);
//# sourceMappingURL=chunk-13da0e6f.3e41c7a8.js.map