(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6ad39ff3"],{"0dc3":function(e,t,r){"use strict";r("4a64")},"19bf":function(e,t,r){"use strict";var n=r("7a23"),a={class:"bg-gray-100 dark:bg-gray-800 shadow p-6 rounded-lg"};function c(e,t){return Object(n["s"])(),Object(n["f"])("div",a,[Object(n["z"])(e.$slots,"default")])}const s={};s.render=c;t["a"]=s},2380:function(e,t,r){"use strict";r.r(t);r("a4d3"),r("e01a"),r("b0c0");var n=r("7a23"),a=Object(n["P"])("data-v-425a67ee");Object(n["v"])("data-v-425a67ee");var c={key:0},s={class:"origin-top-right z-10 absolute right-0 -mt-24 mr-20 w-56 rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:text-white border dark:border-gray-700"},o={class:"py-1",role:"menu","aria-orientation":"vertical","aria-labelledby":"options-menu"},i=Object(n["i"])("Create Exam"),u=Object(n["i"])("Edit Course"),l=Object(n["i"])(" Are you sure you want to delete this course? "),d={class:"flex mt-4"},b={class:"flex-grow mr-4"},j={class:"flex space-x-2 text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-t-lg shadow border-b border-gray-300 dark:border-gray-700"},f=Object(n["i"])(" Overview "),O=Object(n["i"])(" Students "),m={class:"w-72"},g={class:"flex flex-col items-center"},p=Object(n["j"])("p",{class:"font-thin text-2xl"},"Sorry, that course cannot be found.",-1),v=Object(n["i"])("Go to courses");Object(n["t"])();var h=a((function(e,t,r,h,k,y){var x=Object(n["A"])("ColorHeader"),w=Object(n["A"])("router-link"),C=Object(n["A"])("DialogModal"),B=Object(n["A"])("router-view"),A=Object(n["A"])("BasePanel"),P=Object(n["A"])("CoursePageAbout"),M=Object(n["A"])("CoursePageProgress"),$=Object(n["A"])("BaseButton"),_=Object(n["A"])("Center");return e.course?(Object(n["s"])(),Object(n["f"])("div",c,[Object(n["j"])(x,{links:e.links,onMenuClicked:t[1]||(t[1]=function(t){return e.menuOpen=!e.menuOpen}),"hide-menu":!e.hasPermission(["coordinator","admin"])},{default:a((function(){return[Object(n["i"])(Object(n["F"])(e.course.name),1)]})),_:1},8,["links","hide-menu"]),Object(n["N"])(Object(n["j"])(n["c"],{name:"dropdown-fade"},{default:a((function(){return[Object(n["j"])("div",s,[Object(n["j"])("div",o,[Object(n["j"])(w,{to:"/courses/".concat(e.courseId,"/exams/new"),class:"link",role:"menuitem"},{default:a((function(){return[i]})),_:1},8,["to"]),Object(n["j"])(w,{to:"/courses/".concat(e.courseId,"/edit"),class:"link",role:"menuitem"},{default:a((function(){return[u]})),_:1},8,["to"]),Object(n["j"])("button",{onClick:t[2]||(t[2]=function(t){return e.deleteModalOpen=!0}),class:"link w-full text-left border-t dark:border-gray-700 focus:outline-none",role:"menuitem"}," Delete Course "),(Object(n["s"])(),Object(n["f"])(n["b"],{to:"#modals"},[Object(n["N"])(Object(n["j"])(C,{header:"Delete Course","action-label":"Delete",onCancel:t[3]||(t[3]=function(t){return e.deleteModalOpen=!1}),onConfirm:e.deleteCourse},{default:a((function(){return[l]})),_:1},8,["onConfirm"]),[[n["K"],e.deleteModalOpen]])]))])])]})),_:1},512),[[n["K"],e.menuOpen]]),Object(n["j"])("div",d,[Object(n["j"])("div",b,[Object(n["j"])("div",j,[Object(n["j"])(w,{to:"/courses/".concat(e.courseId),class:"tab"},{default:a((function(){return[f]})),_:1},8,["to"]),Object(n["j"])(w,{to:"/courses/".concat(e.courseId,"/students"),class:"tab"},{default:a((function(){return[O]})),_:1},8,["to"])]),Object(n["j"])(A,{class:"rounded-t-none pt-2 overflow-hidden"},{default:a((function(){return[Object(n["j"])(B,null,{default:a((function(e){var t=e.Component,r=e.route;return[Object(n["j"])(n["c"],{name:r.meta.transition||"fade",mode:"out-in"},{default:a((function(){return[(Object(n["s"])(),Object(n["f"])(Object(n["C"])(t)))]})),_:2},1032,["name"])]})),_:1})]})),_:1})]),Object(n["j"])("div",m,[Object(n["j"])(P,{"student-count":e.course.studentsEnrolled.length,description:e.course.description,"coordinator-name":e.course.coordinator.fullName,"coordinator-avatar-url":e.course.coordinator.avatarUrl},null,8,["student-count","description","coordinator-name","coordinator-avatar-url"]),Object(n["j"])(M,{courseId:e.courseId},null,8,["courseId"])])])])):(Object(n["s"])(),Object(n["f"])(_,{key:1},{default:a((function(){return[Object(n["j"])("div",g,[p,Object(n["j"])($,{class:"mt-3",onClick:t[4]||(t[4]=function(t){return e.$router.push("/courses")}),prominent:""},{default:a((function(){return[v]})),_:1})])]})),_:1}))})),k=(r("ac1f"),r("5319"),Object(n["i"])("About course")),y={class:"text-sm"},x={class:"mt-4"},w={class:"text-sm text-gray-600 dark:text-gray-400"},C={class:"mt-4 flex items-center"},B={class:"ml-2"},A=Object(n["j"])("div",{class:"text-sm text-gray-600 dark:text-gray-400"}," Course Coordinator ",-1);function P(e,t,r,a,c,s){var o=Object(n["A"])("BaseLabel"),i=Object(n["A"])("BasePanel");return Object(n["s"])(),Object(n["f"])(i,null,{default:Object(n["M"])((function(){return[Object(n["j"])(o,{emphasis:""},{default:Object(n["M"])((function(){return[k]})),_:1}),Object(n["j"])("div",y,Object(n["F"])(e.description),1),Object(n["j"])("div",x,[Object(n["j"])("div",null,Object(n["F"])(e.studentCount),1),Object(n["j"])("div",w,Object(n["F"])(1===e.studentCount?"Student":"Students")+" Enrolled ",1)]),Object(n["j"])("div",C,[Object(n["j"])("img",{src:e.coordinatorAvatarUrl,alt:"Avatar",class:"w-10 h-10 object-cover rounded-full"},null,8,["src"]),Object(n["j"])("div",B,[Object(n["j"])("div",null,Object(n["F"])(e.coordinatorName),1),A])])]})),_:1})}r("a9e3");var M=r("3a42"),$=r("19bf"),_=Object(n["k"])({name:"CoursePageAbout",components:{BaseLabel:M["a"],BasePanel:$["a"]},props:{studentCount:{type:Number,required:!0},description:{type:String,required:!0},coordinatorName:{type:String,required:!0},coordinatorAvatarUrl:{type:String,required:!0}}});_.render=P;var I=_,S=Object(n["i"])("Course Progress");function L(e,t,r,a,c,s){var o=Object(n["A"])("BaseLabel"),i=Object(n["A"])("ProgressBar"),u=Object(n["A"])("BasePanel");return Object(n["s"])(),Object(n["f"])(u,{class:"mt-4"},{default:Object(n["M"])((function(){return[Object(n["j"])(o,{emphasis:""},{default:Object(n["M"])((function(){return[S]})),_:1}),Object(n["j"])(i,{class:"mt-2",percentage:e.percentage},null,8,["percentage"])]})),_:1})}var E=r("b6b4"),z=Object(n["k"])({name:"CoursePageProgress",components:{BasePanel:$["a"],BaseLabel:M["a"],ProgressBar:E["a"]},props:{courseId:{type:String,required:!0}},computed:{percentage:function(){return this.$store.getters.courseCompletedPercentage(this.courseId,this.$store.state.user.id)}}});z.render=L;var F=z,q=r("82ea"),N=r("4181"),D=r("3457"),U=r("d16b"),H=r("8141"),R=r("2d40"),T=r("961d"),V=Object(n["k"])({name:"CoursePage",components:{BaseButton:q["a"],BasePanel:$["a"],Center:N["a"],BaseLabel:M["a"],ColorHeader:D["a"],CoursePageAbout:I,ProgressBar:E["a"],DialogModal:U["a"],CoursePageProgress:F},mixins:[T["a"]],props:{courseId:{type:String,required:!0}},data:function(){return{menuOpen:!1,deleteModalOpen:!1}},computed:{links:function(){return[{name:"Home",url:"/"},{name:"Courses",url:"/courses"},{name:this.course?this.course.name:"",url:"/courses/".concat(this.courseId)}]},course:function(){return this.$store.getters.courseByID(this.courseId)}},created:function(){var e=this;this.$watch((function(){return e.$route.params}),(function(t){var r=e.$store.getters.courseByID(t.courseId);document.title=r?"".concat(r.name," - Proctor Vue"):"Course Not Found - Proctor Vue"}))},mounted:function(){this.hasPermission(["admin"])||this.$store.getters.hasCourse(this.courseId)||this.$router.replace("/"),document.title=this.course?"".concat(this.course.name," - Proctor Vue"):"Course Not Found - Proctor Vue",this.$store.commit(R["e"],this.courseId)},methods:{deleteCourse:function(){this.$store.dispatch(H["c"],this.courseId),this.$router.push("/courses")},editCourse:function(){}}});r("0dc3");V.render=h,V.__scopeId="data-v-425a67ee";t["default"]=V},3457:function(e,t,r){"use strict";var n=r("7a23"),a={class:"flex justify-between"},c={class:"text-3xl text-white font-bold"},s=Object(n["j"])("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"},null,-1);function o(e,t,r,o,i,u){var l=Object(n["A"])("Breadcrumbs"),d=Object(n["A"])("BasePanel");return Object(n["s"])(),Object(n["f"])(d,{class:"bg-gradient-to-r from-green-600 to-green-400 dark:from-green-700 dark:to-green-500"},{default:Object(n["M"])((function(){return[Object(n["j"])("div",a,[Object(n["j"])("div",c,[Object(n["z"])(e.$slots,"default")]),e.hideMenu?Object(n["g"])("",!0):(Object(n["s"])(),Object(n["f"])("svg",{key:0,class:"fill-current text-white w-6 h-6 cursor-pointer",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",onClick:t[1]||(t[1]=function(t){return e.$emit("menu-clicked")})},[s]))]),e.links?(Object(n["s"])(),Object(n["f"])(l,{key:0,class:"mt-2",links:e.links},null,8,["links"])):Object(n["g"])("",!0)]})),_:3})}var i=r("19bf"),u=(r("b0c0"),{class:"flex items-center"}),l=Object(n["j"])("svg",{class:"ml-1 stroke-current w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[Object(n["j"])("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M9 5l7 7-7 7"})],-1);function d(e,t,r,a,c,s){var o=Object(n["A"])("router-link");return Object(n["s"])(),Object(n["f"])("ol",u,[(Object(n["s"])(!0),Object(n["f"])(n["a"],null,Object(n["y"])(e.linksMinusLast,(function(e,t){return Object(n["s"])(),Object(n["f"])("li",{key:t,class:"mr-1 flex items-center text-green-200"},[Object(n["j"])(o,{to:e.url},{default:Object(n["M"])((function(){return[Object(n["i"])(Object(n["F"])(e.name),1)]})),_:2},1032,["to"]),l])})),128)),Object(n["j"])("li",null,[Object(n["j"])(o,{to:e.lastLink.url,class:"text-white"},{default:Object(n["M"])((function(){return[Object(n["i"])(Object(n["F"])(e.lastLink.name),1)]})),_:1},8,["to"])])])}r("fb6a");var b=Object(n["k"])({name:"Breadcrumbs",props:{links:{type:Array,required:!0}},computed:{lastLink:function(){return this.links[this.links.length-1]},linksMinusLast:function(){return this.links.slice(0,this.links.length-1)}}});b.render=d;var j=b,f=Object(n["k"])({name:"ColorHeader",components:{BasePanel:i["a"],Breadcrumbs:j},props:{links:{type:Array,required:!1},hideMenu:{type:Boolean,default:!1}},emits:["menu-clicked"]});f.render=o;t["a"]=f},"3a42":function(e,t,r){"use strict";var n=r("7a23");function a(e,t,r,a,c,s){return Object(n["s"])(),Object(n["f"])("div",{class:["text-xs text-gray-600 dark:text-gray-400 font-semibold mb-1",e.emphasis?"uppercase tracking-wider":"capitalize"]},[Object(n["z"])(e.$slots,"default")],2)}var c=Object(n["k"])({name:"BaseLabel",props:{emphasis:{type:Boolean,default:!1}}});c.render=a;t["a"]=c},4181:function(e,t,r){"use strict";var n=r("7a23"),a={class:"fixed inset-0"},c={class:"flex justify-center items-center"},s=Object(n["j"])("span",{class:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true"},"​",-1);function o(e,t){return Object(n["s"])(),Object(n["f"])("div",a,[Object(n["j"])("div",c,[s,Object(n["z"])(e.$slots,"default")])])}const i={};i.render=o;t["a"]=i},"4a64":function(e,t,r){},5319:function(e,t,r){"use strict";var n=r("d784"),a=r("825a"),c=r("7b0b"),s=r("50c4"),o=r("a691"),i=r("1d80"),u=r("8aa5"),l=r("14c3"),d=Math.max,b=Math.min,j=Math.floor,f=/\$([$&'`]|\d\d?|<[^>]*>)/g,O=/\$([$&'`]|\d\d?)/g,m=function(e){return void 0===e?e:String(e)};n("replace",2,(function(e,t,r,n){var g=n.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,p=n.REPLACE_KEEPS_$0,v=g?"$":"$0";return[function(r,n){var a=i(this),c=void 0==r?void 0:r[e];return void 0!==c?c.call(r,a,n):t.call(String(a),r,n)},function(e,n){if(!g&&p||"string"===typeof n&&-1===n.indexOf(v)){var c=r(t,e,this,n);if(c.done)return c.value}var i=a(e),j=String(this),f="function"===typeof n;f||(n=String(n));var O=i.global;if(O){var k=i.unicode;i.lastIndex=0}var y=[];while(1){var x=l(i,j);if(null===x)break;if(y.push(x),!O)break;var w=String(x[0]);""===w&&(i.lastIndex=u(j,s(i.lastIndex),k))}for(var C="",B=0,A=0;A<y.length;A++){x=y[A];for(var P=String(x[0]),M=d(b(o(x.index),j.length),0),$=[],_=1;_<x.length;_++)$.push(m(x[_]));var I=x.groups;if(f){var S=[P].concat($,M,j);void 0!==I&&S.push(I);var L=String(n.apply(void 0,S))}else L=h(P,j,M,$,I,n);M>=B&&(C+=j.slice(B,M)+L,B=M+P.length)}return C+j.slice(B)}];function h(e,r,n,a,s,o){var i=n+e.length,u=a.length,l=O;return void 0!==s&&(s=c(s),l=f),t.call(o,l,(function(t,c){var o;switch(c.charAt(0)){case"$":return"$";case"&":return e;case"`":return r.slice(0,n);case"'":return r.slice(i);case"<":o=s[c.slice(1,-1)];break;default:var l=+c;if(0===l)return t;if(l>u){var d=j(l/10);return 0===d?t:d<=u?void 0===a[d-1]?c.charAt(1):a[d-1]+c.charAt(1):t}o=a[l-1]}return void 0===o?"":o}))}}))},"82ea":function(e,t,r){"use strict";var n=r("7a23");function a(e,t,r,a,c,s){return Object(n["s"])(),Object(n["f"])("button",{class:["transform ease-in-out duration-150 capitalize focus:outline-none appearance-none active:scale-95 text-sm font-medium py-2 px-6 rounded-lg disabled:opacity-50 shadow",e.prominent?"text-white bg-gradient-to-t from-green-600 to-green-500 hover:from-green-700 hover:to-green-600":"bg-white dark:bg-gray-200 dark:bg-opacity-5 text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:bg-opacity-30 hover:shadow-md"],type:e.type,disabled:e.disabled},[Object(n["z"])(e.$slots,"default")],10,["type","disabled"])}var c=Object(n["k"])({name:"BaseButton",props:{prominent:{type:Boolean,default:!1},disabled:{type:Boolean,required:!1,default:!1},type:{type:String,required:!1,default:"button"}}});c.render=a;t["a"]=c},b6b4:function(e,t,r){"use strict";var n=r("7a23"),a={class:"bg-gray-300 dark:bg-gray-700 w-full h-2 rounded-full overflow-hidden"},c={class:"text-sm mt-2"},s={class:"font-semibold"},o=Object(n["i"])("% complete ");function i(e,t,r,i,u,l){return Object(n["s"])(),Object(n["f"])("div",null,[Object(n["j"])("div",a,[Object(n["j"])("div",{style:"width: ".concat(e.percentage,"%"),class:"bg-gradient-to-r from-green-600 to-green-400 percentage h-full rounded-full"},null,4)]),Object(n["j"])("div",c,[Object(n["j"])("span",s,Object(n["F"])(e.percentage),1),o])])}r("a9e3");var u=Object(n["k"])({name:"ProgressBar",props:{percentage:{type:Number,required:!0}}});u.render=i;t["a"]=u},d16b:function(e,t,r){"use strict";var n=r("7a23"),a={class:"fixed z-30 inset-0 overflow-y-auto"},c={class:"flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"},s=Object(n["j"])("div",{class:"fixed inset-0 transition-opacity","aria-hidden":"true"},[Object(n["j"])("div",{class:"absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"})],-1),o=Object(n["j"])("span",{class:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true"},"​",-1),i={class:"inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full",role:"dialog","aria-modal":"true","aria-labelledby":"modal-headline"},u={class:"px-4 pt-5 pb-4 sm:p-6 sm:pb-4"},l={class:"sm:flex sm:items-start"},d=Object(n["j"])("div",{class:"mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"},[Object(n["j"])("svg",{class:"h-6 w-6 text-red-600",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","aria-hidden":"true"},[Object(n["j"])("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})])],-1),b={class:"mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"},j={class:"text-lg leading-6 font-medium text-gray-900 dark:text-white",id:"modal-headline"},f={class:"mt-2"},O={class:"text-sm text-gray-500"},m={class:"px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"},g=Object(n["i"])(" Cancel ");function p(e,t,r,p,v,h){var k=Object(n["A"])("BaseButton");return Object(n["s"])(),Object(n["f"])(n["c"],{name:"modal-fade"},{default:Object(n["M"])((function(){return[Object(n["j"])("div",a,[Object(n["j"])("div",c,[s,o,Object(n["j"])("div",i,[Object(n["j"])("div",u,[Object(n["j"])("div",l,[d,Object(n["j"])("div",b,[Object(n["j"])("h3",j,Object(n["F"])(e.header),1),Object(n["j"])("div",f,[Object(n["j"])("p",O,[Object(n["z"])(e.$slots,"default")])])])])]),Object(n["j"])("div",m,[e.noAction?Object(n["g"])("",!0):(Object(n["s"])(),Object(n["f"])(k,{key:0,onClick:t[1]||(t[1]=function(t){return e.$emit("confirm")}),prominent:""},{default:Object(n["M"])((function(){return[Object(n["i"])(Object(n["F"])(e.actionLabel),1)]})),_:1})),Object(n["j"])(k,{onClick:t[2]||(t[2]=function(t){return e.$emit("cancel")}),class:"mr-3"},{default:Object(n["M"])((function(){return[g]})),_:1})])])])])]})),_:3})}var v=r("82ea"),h=Object(n["k"])({name:"DialogModal",components:{BaseButton:v["a"]},props:{header:{type:String,required:!0},actionLabel:{type:String,default:"Confirm"},noAction:{type:Boolean,default:!1}},emits:["cancel","confirm"]});h.render=p;t["a"]=h}}]);
//# sourceMappingURL=chunk-6ad39ff3.265d365c.js.map