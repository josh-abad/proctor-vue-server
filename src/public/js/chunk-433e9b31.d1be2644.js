(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-433e9b31"],{1503:function(e,t,a){"use strict";var r=a("7a23"),n={class:"fixed z-30 inset-0 overflow-y-auto bg-gradient-to-t from-green-700 to-teal-900 dark:from-green-700 dark:to-teal-900"},c={class:"p-4"},o=Object(r["j"])("div",{class:"mt-4 font-semibold text-xl"},"Welcome back!",-1),i=Object(r["j"])("div",{class:"mt-4"}," You are already logged in and will be redirected back to Proctor Vue shortly. ",-1),s={class:"mt-4 text-gray-500 text-sm"},l=Object(r["i"])(" If you are not redirected automatically, follow "),u=Object(r["i"])("this link"),d=Object(r["i"])(". ");function b(e,t,b,j,f,O){var g=Object(r["A"])("router-link"),p=Object(r["A"])("ColorBackgroundCard");return Object(r["s"])(),Object(r["f"])(r["b"],{to:"#modals"},[Object(r["j"])("div",n,[Object(r["j"])(p,null,{default:Object(r["M"])((function(){return[Object(r["j"])("div",c,[Object(r["j"])("img",{src:a("1771")("./".concat(e.logoFilename)),alt:"Logo",class:"h-7",onClick:t[1]||(t[1]=function(t){return e.$router.push("/")})},null,8,["src"]),o,i,Object(r["j"])("div",s,[l,Object(r["j"])(g,{to:"/",class:"text-green-500",replace:""},{default:Object(r["M"])((function(){return[u]})),_:1}),d])])]})),_:1})])])}a("ac1f"),a("5319");var j=a("f856"),f=a("a405"),O=Object(r["k"])({name:"Redirect",components:{ColorBackgroundCard:f["a"]},mixins:[j["a"]],mounted:function(){var e=this;setTimeout((function(){e.$router.replace("/")}),5e3)}});O.render=b;t["a"]=O},"19bf":function(e,t,a){"use strict";var r=a("7a23"),n={class:"bg-gray-100 dark:bg-gray-800 shadow p-6 rounded-lg"};function c(e,t){return Object(r["s"])(),Object(r["f"])("div",n,[Object(r["z"])(e.$slots,"default")])}const o={};o.render=c;t["a"]=o},"3a42":function(e,t,a){"use strict";var r=a("7a23");function n(e,t,a,n,c,o){return Object(r["s"])(),Object(r["f"])("div",{class:["text-xs text-gray-600 dark:text-gray-400 font-semibold mb-1",e.emphasis?"uppercase tracking-wider":"capitalize"]},[Object(r["z"])(e.$slots,"default")],2)}var c=Object(r["k"])({name:"BaseLabel",props:{emphasis:{type:Boolean,default:!1}}});c.render=n;t["a"]=c},4181:function(e,t,a){"use strict";var r=a("7a23"),n={class:"fixed inset-0"},c={class:"flex justify-center items-center"},o=Object(r["j"])("span",{class:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true"},"​",-1);function i(e,t){return Object(r["s"])(),Object(r["f"])("div",n,[Object(r["j"])("div",c,[o,Object(r["z"])(e.$slots,"default")])])}const s={};s.render=i;t["a"]=s},5319:function(e,t,a){"use strict";var r=a("d784"),n=a("825a"),c=a("7b0b"),o=a("50c4"),i=a("a691"),s=a("1d80"),l=a("8aa5"),u=a("14c3"),d=Math.max,b=Math.min,j=Math.floor,f=/\$([$&'`]|\d\d?|<[^>]*>)/g,O=/\$([$&'`]|\d\d?)/g,g=function(e){return void 0===e?e:String(e)};r("replace",2,(function(e,t,a,r){var p=r.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,m=r.REPLACE_KEEPS_$0,v=p?"$":"$0";return[function(a,r){var n=s(this),c=void 0==a?void 0:a[e];return void 0!==c?c.call(a,n,r):t.call(String(n),a,r)},function(e,r){if(!p&&m||"string"===typeof r&&-1===r.indexOf(v)){var c=a(t,e,this,r);if(c.done)return c.value}var s=n(e),j=String(this),f="function"===typeof r;f||(r=String(r));var O=s.global;if(O){var k=s.unicode;s.lastIndex=0}var y=[];while(1){var x=u(s,j);if(null===x)break;if(y.push(x),!O)break;var w=String(x[0]);""===w&&(s.lastIndex=l(j,o(s.lastIndex),k))}for(var B="",_=0,C=0;C<y.length;C++){x=y[C];for(var $=String(x[0]),A=d(b(i(x.index),j.length),0),M=[],S=1;S<x.length;S++)M.push(g(x[S]));var E=x.groups;if(f){var P=[$].concat(M,A,j);void 0!==E&&P.push(E);var L=String(r.apply(void 0,P))}else L=h($,j,A,M,E,r);A>=_&&(B+=j.slice(_,A)+L,_=A+$.length)}return B+j.slice(_)}];function h(e,a,r,n,o,i){var s=r+e.length,l=n.length,u=O;return void 0!==o&&(o=c(o),u=f),t.call(i,u,(function(t,c){var i;switch(c.charAt(0)){case"$":return"$";case"&":return e;case"`":return a.slice(0,r);case"'":return a.slice(s);case"<":i=o[c.slice(1,-1)];break;default:var u=+c;if(0===u)return t;if(u>l){var d=j(u/10);return 0===d?t:d<=l?void 0===n[d-1]?c.charAt(1):n[d-1]+c.charAt(1):t}i=n[u-1]}return void 0===i?"":i}))}}))},"82ea":function(e,t,a){"use strict";var r=a("7a23");function n(e,t,a,n,c,o){return Object(r["s"])(),Object(r["f"])("button",{class:["transform ease-in-out duration-150 capitalize focus:outline-none appearance-none active:scale-95 text-sm font-medium py-2 px-6 rounded-lg disabled:opacity-50 shadow",e.prominent?"text-white bg-gradient-to-t from-green-600 to-green-500 hover:from-green-700 hover:to-green-600":"bg-white dark:bg-gray-200 dark:bg-opacity-5 text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:bg-opacity-30 hover:shadow-md"],type:e.type,disabled:e.disabled},[Object(r["z"])(e.$slots,"default")],10,["type","disabled"])}var c=Object(r["k"])({name:"BaseButton",props:{prominent:{type:Boolean,default:!1},disabled:{type:Boolean,required:!1,default:!1},type:{type:String,required:!1,default:"button"}}});c.render=n;t["a"]=c},a405:function(e,t,a){"use strict";var r=a("7a23"),n=Object(r["j"])("div",{class:"-mb-12"},[Object(r["j"])("img",{class:"w-60 h-full -m-6 object-cover",src:"https://cdn.pixabay.com/photo/2020/04/16/11/13/background-5050213_1280.png",alt:"Panel Background"})],-1);function c(e,t,a,c,o,i){var s=Object(r["A"])("BasePanel"),l=Object(r["A"])("Center");return Object(r["s"])(),Object(r["f"])(l,null,{default:Object(r["M"])((function(){return[Object(r["j"])(s,{class:"flex overflow-hidden"},{default:Object(r["M"])((function(){return[n,Object(r["z"])(e.$slots,"default")]})),_:3})]})),_:1})}var o=a("19bf"),i=a("4181"),s=Object(r["k"])({name:"ColorBackgroundCard",components:{Center:i["a"],BasePanel:o["a"]}});s.render=c;t["a"]=s},a55b:function(e,t,a){"use strict";a.r(t);var r=a("7a23"),n={class:"p-4"},c={class:"mt-4"},o=Object(r["j"])("h3",{class:"font-medium"},"Login",-1),i={class:"text-xs dark:text-gray-400"},s=Object(r["i"])(" By continuing, you agree to our "),l=Object(r["i"])("User Agreement"),u=Object(r["i"])(" and "),d=Object(r["i"])("Privacy Policy"),b=Object(r["i"])(". "),j={class:"mt-4"},f={for:"email"},O=Object(r["i"])("Email"),g={class:"mt-2"},p={for:"password"},m=Object(r["i"])("Password"),v={class:"mt-4"},h=Object(r["i"])("Sign In"),k={class:"mt-3 text-xs"},y=Object(r["i"])(" Forgot your "),x=Object(r["i"])("password"),w=Object(r["i"])("? "),B={class:"mt-3 text-xs"},_=Object(r["i"])(" New to Proctor Vue? "),C=Object(r["i"])("Sign Up");function $(e,t,$,A,M,S){var E=Object(r["A"])("router-link"),P=Object(r["A"])("BaseLabel"),L=Object(r["A"])("BaseInput"),I=Object(r["A"])("BaseButton"),R=Object(r["A"])("ColorBackgroundCard"),z=Object(r["A"])("Redirect");return Object(r["s"])(),Object(r["f"])("div",null,[e.$store.state.user?(Object(r["s"])(),Object(r["f"])(z,{key:1})):(Object(r["s"])(),Object(r["f"])(R,{key:0},{default:Object(r["M"])((function(){return[Object(r["j"])("div",n,[Object(r["j"])("img",{src:a("1771")("./".concat(e.logoFilename)),alt:"Logo",class:"h-7"},null,8,["src"]),Object(r["j"])("form",c,[o,Object(r["j"])("p",i,[s,Object(r["j"])(E,{to:"#",class:"text-green-500"},{default:Object(r["M"])((function(){return[l]})),_:1}),u,Object(r["j"])(E,{to:"#",class:"text-green-500"},{default:Object(r["M"])((function(){return[d]})),_:1}),b]),Object(r["j"])("div",j,[Object(r["j"])("label",f,[Object(r["j"])(P,null,{default:Object(r["M"])((function(){return[O]})),_:1})]),Object(r["j"])(L,{class:"w-full",id:"email",type:"text",modelValue:e.email,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.email=t})},null,8,["modelValue"])]),Object(r["j"])("div",g,[Object(r["j"])("label",p,[Object(r["j"])(P,null,{default:Object(r["M"])((function(){return[m]})),_:1})]),Object(r["j"])(L,{class:"w-full",id:"password",type:"password",modelValue:e.password,"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.password=t})},null,8,["modelValue"])]),Object(r["j"])("div",v,[Object(r["j"])(I,{onClick:Object(r["O"])(e.handleLogin,["prevent"]),disabled:!e.fieldsFilled,type:"submit",prominent:""},{default:Object(r["M"])((function(){return[h]})),_:1},8,["onClick","disabled"])]),Object(r["j"])("p",k,[y,Object(r["j"])(E,{to:"#",class:"text-green-500"},{default:Object(r["M"])((function(){return[x]})),_:1}),w]),Object(r["j"])("p",B,[_,Object(r["j"])(E,{to:"/register",class:"uppercase font-semibold tracking-wide text-green-500"},{default:Object(r["M"])((function(){return[C]})),_:1})])])])]})),_:1}))])}a("96cf");var A=a("1da1"),M=a("82ea"),S=a("b3b3"),E=a("3a42"),P=a("8141"),L=a("f856"),I=a("a405"),R=a("1503"),z=Object(r["k"])({name:"Login",components:{BaseButton:M["a"],BaseInput:S["a"],BaseLabel:E["a"],ColorBackgroundCard:I["a"],Redirect:R["a"]},mixins:[L["a"]],data:function(){return{email:"",password:""}},computed:{fieldsFilled:function(){return this.email.length>0&&this.password.length>0}},methods:{handleLogin:function(){var e=this;return Object(A["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch(P["l"],{email:e.email,password:e.password});case 2:e.email="",e.password="";case 4:case"end":return t.stop()}}),t)})))()}}});z.render=$;t["default"]=z}}]);
//# sourceMappingURL=chunk-433e9b31.d1be2644.js.map