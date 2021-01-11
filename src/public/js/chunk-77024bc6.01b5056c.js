(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-77024bc6"],{"19bf":function(e,t,r){"use strict";var n=r("7a23"),a={class:"bg-gray-100 dark:bg-gray-800 shadow p-6 rounded-lg"};function s(e,t){return Object(n["s"])(),Object(n["f"])("div",a,[Object(n["z"])(e.$slots,"default")])}const c={};c.render=s;t["a"]=c},2380:function(e,t,r){"use strict";r.r(t);r("a4d3"),r("e01a"),r("b0c0");var n=r("7a23"),a=Object(n["P"])("data-v-6d21e132");Object(n["v"])("data-v-6d21e132");var s={key:0},c={class:"origin-top-right z-10 absolute right-0 -mt-24 mr-20 w-56 rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:text-white border dark:border-gray-700"},o={class:"py-1",role:"menu","aria-orientation":"vertical","aria-labelledby":"options-menu"},i=Object(n["i"])("Create Exam"),l=Object(n["i"])("Edit Course"),u={class:"flex mt-4"},d={class:"flex-grow mr-4"},b={class:"flex space-x-2 text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-t-lg shadow border-b border-gray-300 dark:border-gray-700"},j=Object(n["i"])(" Overview "),f=Object(n["i"])(" Students "),m={class:"w-72"},O=Object(n["i"])("Course Progress"),g={class:"flex flex-col items-center"},p=Object(n["j"])("p",{class:"font-thin text-2xl"},"Sorry, that course cannot be found.",-1),v=Object(n["i"])("Go to courses");Object(n["t"])();var h=a((function(e,t,r,h,y,k){var x=Object(n["A"])("ColorHeader"),w=Object(n["A"])("router-link"),C=Object(n["A"])("DialogModal"),B=Object(n["A"])("router-view"),A=Object(n["A"])("BasePanel"),M=Object(n["A"])("AboutCourse"),_=Object(n["A"])("BaseLabel"),$=Object(n["A"])("ProgressBar"),S=Object(n["A"])("BaseButton"),P=Object(n["A"])("Center");return e.course?(Object(n["s"])(),Object(n["f"])("div",s,[Object(n["j"])(x,{links:e.links,onMenuClicked:t[1]||(t[1]=function(t){return e.menuOpen=!e.menuOpen}),"hide-menu":!e.$store.getters.permissions("coordinator","admin")},{default:a((function(){return[Object(n["i"])(Object(n["F"])(e.course.name),1)]})),_:1},8,["links","hide-menu"]),Object(n["N"])(Object(n["j"])(n["c"],{"enter-active-class":"transition ease-out duration-100 transform","enter-from-class":"opacity-0 scale-95","enter-to-class":"opacity-100 scale-100","leave-active-class":"transition ease-in duration-75 transform","leave-from-class":"opacity-100 scale-100","leave-to-class":"opacity-0 scale-95"},{default:a((function(){return[Object(n["j"])("div",c,[Object(n["j"])("div",o,[Object(n["j"])(w,{to:"/courses/".concat(e.courseId,"/exams/new"),class:"block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700",role:"menuitem"},{default:a((function(){return[i]})),_:1},8,["to"]),Object(n["j"])(w,{to:"/courses/".concat(e.courseId,"/edit"),class:"block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700",role:"menuitem"},{default:a((function(){return[l]})),_:1},8,["to"]),Object(n["j"])("button",{onClick:t[2]||(t[2]=function(t){return e.deleteModalOpen=!0}),class:"block w-full text-left px-4 py-2 text-sm border-t dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none",role:"menuitem"}," Delete Course "),(Object(n["s"])(),Object(n["f"])(n["b"],{to:"#modals"},[Object(n["N"])(Object(n["j"])(C,{header:"Delete Course",message:"Are you sure you want to delete this course?","action-label":"Delete",onCancel:t[3]||(t[3]=function(t){return e.deleteModalOpen=!1}),onConfirm:e.deleteCourse},null,8,["onConfirm"]),[[n["K"],e.deleteModalOpen]])]))])])]})),_:1},512),[[n["K"],e.menuOpen]]),Object(n["j"])("div",u,[Object(n["j"])("div",d,[Object(n["j"])("div",b,[Object(n["j"])(w,{to:"/courses/".concat(e.courseId),class:"tab"},{default:a((function(){return[j]})),_:1},8,["to"]),Object(n["j"])(w,{to:"/courses/".concat(e.courseId,"/students"),class:"tab"},{default:a((function(){return[f]})),_:1},8,["to"])]),Object(n["j"])(A,{class:"rounded-t-none pt-2 overflow-hidden"},{default:a((function(){return[Object(n["j"])(B,null,{default:a((function(e){var t=e.Component,r=e.route;return[Object(n["j"])(n["c"],{name:r.meta.transition||"fade",mode:"out-in"},{default:a((function(){return[(Object(n["s"])(),Object(n["f"])(Object(n["C"])(t)))]})),_:2},1032,["name"])]})),_:1})]})),_:1})]),Object(n["j"])("div",m,[Object(n["j"])(M,{"student-count":e.course.studentsEnrolled.length,description:e.course.description,"coordinator-name":e.course.coordinator.fullName,"coordinator-avatar-url":e.course.coordinator.avatarUrl},null,8,["student-count","description","coordinator-name","coordinator-avatar-url"]),Object(n["j"])(A,{class:"mt-4"},{default:a((function(){return[Object(n["j"])(_,{emphasis:""},{default:a((function(){return[O]})),_:1}),Object(n["j"])($,{class:"mt-2",percentage:e.$store.getters.courseCompletedPercentage(e.courseId)},null,8,["percentage"])]})),_:1})])])])):(Object(n["s"])(),Object(n["f"])(P,{key:1},{default:a((function(){return[Object(n["j"])("div",g,[p,Object(n["j"])(S,{class:"mt-3",onClick:t[4]||(t[4]=function(t){return e.$router.push("/courses")}),prominent:""},{default:a((function(){return[v]})),_:1})])]})),_:1}))})),y=(r("ac1f"),r("5319"),Object(n["i"])("About course")),k={class:"text-sm"},x={class:"mt-4"},w={class:"text-sm text-gray-600 dark:text-gray-400"},C={class:"mt-4 flex items-center"},B={class:"ml-2"},A=Object(n["j"])("div",{class:"text-sm text-gray-600 dark:text-gray-400"}," Course Coordinator ",-1);function M(e,t,r,a,s,c){var o=Object(n["A"])("BaseLabel"),i=Object(n["A"])("BasePanel");return Object(n["s"])(),Object(n["f"])(i,null,{default:Object(n["M"])((function(){return[Object(n["j"])(o,{emphasis:""},{default:Object(n["M"])((function(){return[y]})),_:1}),Object(n["j"])("div",k,Object(n["F"])(e.description),1),Object(n["j"])("div",x,[Object(n["j"])("div",null,Object(n["F"])(e.studentCount),1),Object(n["j"])("div",w,Object(n["F"])(1===e.studentCount?"Student":"Students")+" Enrolled ",1)]),Object(n["j"])("div",C,[Object(n["j"])("img",{src:e.coordinatorAvatarUrl,alt:"Avatar",class:"w-10 h-10 object-cover rounded-full"},null,8,["src"]),Object(n["j"])("div",B,[Object(n["j"])("div",null,Object(n["F"])(e.coordinatorName),1),A])])]})),_:1})}r("a9e3");var _=r("3a42"),$=r("19bf"),S=Object(n["k"])({name:"AboutCourse",components:{BaseLabel:_["a"],BasePanel:$["a"]},props:{studentCount:{type:Number,required:!0},description:{type:String,required:!0},coordinatorName:{type:String,required:!0},coordinatorAvatarUrl:{type:String,required:!0}}});S.render=M;var P=S,I=r("82ea"),E=r("4181"),L=r("3457"),z=r("d16b"),F=r("b6b4"),q=r("8141"),N=r("2d40"),D=Object(n["k"])({name:"CoursePage",components:{BaseButton:I["a"],BasePanel:$["a"],Center:E["a"],BaseLabel:_["a"],ColorHeader:L["a"],AboutCourse:P,ProgressBar:F["a"],DialogModal:z["a"]},props:{courseId:{type:String,required:!0}},data:function(){return{menuOpen:!1,deleteModalOpen:!1}},computed:{links:function(){return[{name:"Home",url:"/"},{name:"Courses",url:"/courses"},{name:this.course.name,url:"/courses/".concat(this.courseId)}]},course:function(){return this.$store.getters.getCourseByID(this.courseId)}},mounted:function(){this.$store.getters.permissions("admin")||this.$store.getters.hasCourse(this.courseId)||this.$router.replace("/"),document.title=this.course?"".concat(this.course.name," - Proctor Vue"):"Course Not Found - Proctor Vue",this.$store.commit(N["e"],this.courseId)},methods:{deleteCourse:function(){this.$store.dispatch(q["c"],this.courseId),this.$router.push("/courses")},editCourse:function(){}}});r("f25e");D.render=h,D.__scopeId="data-v-6d21e132";t["default"]=D},3457:function(e,t,r){"use strict";var n=r("7a23"),a={class:"flex justify-between"},s={class:"text-3xl text-white font-bold"},c=Object(n["j"])("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"},null,-1);function o(e,t,r,o,i,l){var u=Object(n["A"])("Breadcrumbs"),d=Object(n["A"])("BasePanel");return Object(n["s"])(),Object(n["f"])(d,{class:"bg-gradient-to-r from-green-600 to-green-400 dark:from-green-700 dark:to-green-500"},{default:Object(n["M"])((function(){return[Object(n["j"])("div",a,[Object(n["j"])("div",s,[Object(n["z"])(e.$slots,"default")]),e.hideMenu?Object(n["g"])("",!0):(Object(n["s"])(),Object(n["f"])("svg",{key:0,class:"fill-current text-white w-6 h-6 cursor-pointer",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",onClick:t[1]||(t[1]=function(t){return e.$emit("menu-clicked")})},[c]))]),e.links?(Object(n["s"])(),Object(n["f"])(u,{key:0,class:"mt-2",links:e.links},null,8,["links"])):Object(n["g"])("",!0)]})),_:3})}var i=r("19bf"),l=(r("b0c0"),{class:"flex items-center"}),u=Object(n["j"])("svg",{class:"ml-1 stroke-current w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[Object(n["j"])("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M9 5l7 7-7 7"})],-1);function d(e,t,r,a,s,c){var o=Object(n["A"])("router-link");return Object(n["s"])(),Object(n["f"])("ol",l,[(Object(n["s"])(!0),Object(n["f"])(n["a"],null,Object(n["y"])(e.linksMinusLast,(function(e,t){return Object(n["s"])(),Object(n["f"])("li",{key:t,class:"mr-1 flex items-center text-green-200"},[Object(n["j"])(o,{to:e.url},{default:Object(n["M"])((function(){return[Object(n["i"])(Object(n["F"])(e.name),1)]})),_:2},1032,["to"]),u])})),128)),Object(n["j"])("li",null,[Object(n["j"])(o,{to:e.lastLink.url,class:"text-white"},{default:Object(n["M"])((function(){return[Object(n["i"])(Object(n["F"])(e.lastLink.name),1)]})),_:1},8,["to"])])])}r("fb6a");var b=Object(n["k"])({name:"Breadcrumbs",props:{links:{type:Array,required:!0}},computed:{lastLink:function(){return this.links[this.links.length-1]},linksMinusLast:function(){return this.links.slice(0,this.links.length-1)}}});b.render=d;var j=b,f=Object(n["k"])({name:"ColorHeader",components:{BasePanel:i["a"],Breadcrumbs:j},props:{links:{type:Array,required:!1},hideMenu:{type:Boolean,default:!1}},emits:["menu-clicked"]});f.render=o;t["a"]=f},"3a42":function(e,t,r){"use strict";var n=r("7a23");function a(e,t,r,a,s,c){return Object(n["s"])(),Object(n["f"])("div",{class:["text-xs text-gray-600 dark:text-gray-400 font-semibold mb-1",e.emphasis?"uppercase tracking-wider":"capitalize"]},[Object(n["z"])(e.$slots,"default")],2)}var s=Object(n["k"])({name:"BaseLabel",props:{emphasis:{type:Boolean,default:!1}}});s.render=a;t["a"]=s},4181:function(e,t,r){"use strict";var n=r("7a23"),a={class:"fixed inset-0"},s={class:"flex justify-center items-center"},c=Object(n["j"])("span",{class:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true"},"​",-1);function o(e,t){return Object(n["s"])(),Object(n["f"])("div",a,[Object(n["j"])("div",s,[c,Object(n["z"])(e.$slots,"default")])])}const i={};i.render=o;t["a"]=i},5319:function(e,t,r){"use strict";var n=r("d784"),a=r("825a"),s=r("7b0b"),c=r("50c4"),o=r("a691"),i=r("1d80"),l=r("8aa5"),u=r("14c3"),d=Math.max,b=Math.min,j=Math.floor,f=/\$([$&'`]|\d\d?|<[^>]*>)/g,m=/\$([$&'`]|\d\d?)/g,O=function(e){return void 0===e?e:String(e)};n("replace",2,(function(e,t,r,n){var g=n.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,p=n.REPLACE_KEEPS_$0,v=g?"$":"$0";return[function(r,n){var a=i(this),s=void 0==r?void 0:r[e];return void 0!==s?s.call(r,a,n):t.call(String(a),r,n)},function(e,n){if(!g&&p||"string"===typeof n&&-1===n.indexOf(v)){var s=r(t,e,this,n);if(s.done)return s.value}var i=a(e),j=String(this),f="function"===typeof n;f||(n=String(n));var m=i.global;if(m){var y=i.unicode;i.lastIndex=0}var k=[];while(1){var x=u(i,j);if(null===x)break;if(k.push(x),!m)break;var w=String(x[0]);""===w&&(i.lastIndex=l(j,c(i.lastIndex),y))}for(var C="",B=0,A=0;A<k.length;A++){x=k[A];for(var M=String(x[0]),_=d(b(o(x.index),j.length),0),$=[],S=1;S<x.length;S++)$.push(O(x[S]));var P=x.groups;if(f){var I=[M].concat($,_,j);void 0!==P&&I.push(P);var E=String(n.apply(void 0,I))}else E=h(M,j,_,$,P,n);_>=B&&(C+=j.slice(B,_)+E,B=_+M.length)}return C+j.slice(B)}];function h(e,r,n,a,c,o){var i=n+e.length,l=a.length,u=m;return void 0!==c&&(c=s(c),u=f),t.call(o,u,(function(t,s){var o;switch(s.charAt(0)){case"$":return"$";case"&":return e;case"`":return r.slice(0,n);case"'":return r.slice(i);case"<":o=c[s.slice(1,-1)];break;default:var u=+s;if(0===u)return t;if(u>l){var d=j(u/10);return 0===d?t:d<=l?void 0===a[d-1]?s.charAt(1):a[d-1]+s.charAt(1):t}o=a[u-1]}return void 0===o?"":o}))}}))},"7d00":function(e,t,r){},"82ea":function(e,t,r){"use strict";var n=r("7a23");function a(e,t,r,a,s,c){return Object(n["s"])(),Object(n["f"])("button",{class:["transform ease-in-out duration-150 capitalize focus:outline-none appearance-none active:scale-95 text-sm font-medium py-2 px-6 rounded-lg disabled:opacity-50 shadow",e.prominent?"text-white bg-gradient-to-t from-green-600 to-green-500 hover:from-green-700 hover:to-green-600":"bg-white dark:bg-gray-200 dark:bg-opacity-5 text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:bg-opacity-30 hover:shadow-md"],type:e.type,disabled:e.disabled},[Object(n["z"])(e.$slots,"default")],10,["type","disabled"])}var s=Object(n["k"])({name:"BaseButton",props:{prominent:{type:Boolean,default:!1},disabled:{type:Boolean,required:!1,default:!1},type:{type:String,required:!1,default:"button"}}});s.render=a;t["a"]=s},b6b4:function(e,t,r){"use strict";var n=r("7a23"),a={class:"bg-gray-300 dark:bg-gray-700 w-full h-2 rounded-full overflow-hidden"},s={class:"text-sm mt-2"},c={class:"font-semibold"},o=Object(n["i"])("% complete ");function i(e,t,r,i,l,u){return Object(n["s"])(),Object(n["f"])("div",null,[Object(n["j"])("div",a,[Object(n["j"])("div",{style:"width: ".concat(e.percentage,"%"),class:"bg-gradient-to-r from-green-600 to-green-400 percentage h-full rounded-full"},null,4)]),Object(n["j"])("div",s,[Object(n["j"])("span",c,Object(n["F"])(e.percentage),1),o])])}r("a9e3");var l=Object(n["k"])({name:"ProgressBar",props:{percentage:{type:Number,required:!0}}});l.render=i;t["a"]=l},d16b:function(e,t,r){"use strict";var n=r("7a23"),a={class:"fixed z-30 inset-0 overflow-y-auto"},s={class:"flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"},c=Object(n["j"])("div",{class:"fixed inset-0 transition-opacity","aria-hidden":"true"},[Object(n["j"])("div",{class:"absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"})],-1),o=Object(n["j"])("span",{class:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true"},"​",-1),i={class:"inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full",role:"dialog","aria-modal":"true","aria-labelledby":"modal-headline"},l={class:"px-4 pt-5 pb-4 sm:p-6 sm:pb-4"},u={class:"sm:flex sm:items-start"},d=Object(n["j"])("div",{class:"mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"},[Object(n["j"])("svg",{class:"h-6 w-6 text-red-600",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","aria-hidden":"true"},[Object(n["j"])("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})])],-1),b={class:"mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"},j={class:"text-lg leading-6 font-medium text-gray-900 dark:text-white",id:"modal-headline"},f={class:"mt-2"},m={class:"text-sm text-gray-500"},O={class:"px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"},g=Object(n["i"])(" Cancel ");function p(e,t,r,p,v,h){var y=Object(n["A"])("BaseButton");return Object(n["s"])(),Object(n["f"])(n["c"],{"enter-active-class":"transition ease-out duration-300 transform","enter-from-class":"opacity-0 translate-y-4","enter-to-class":"opacity-100 translate-y-0","leave-active-class":"transition ease-in duration-300 transform","leave-from-class":"opacity-100 translate-y-0","leave-to-class":"opacity-0 translate-y-4"},{default:Object(n["M"])((function(){return[Object(n["j"])("div",a,[Object(n["j"])("div",s,[c,o,Object(n["j"])("div",i,[Object(n["j"])("div",l,[Object(n["j"])("div",u,[d,Object(n["j"])("div",b,[Object(n["j"])("h3",j,Object(n["F"])(e.header),1),Object(n["j"])("div",f,[Object(n["j"])("p",m,Object(n["F"])(e.message),1)])])])]),Object(n["j"])("div",O,[Object(n["j"])(y,{onClick:t[1]||(t[1]=function(t){return e.$emit("confirm")}),prominent:""},{default:Object(n["M"])((function(){return[Object(n["i"])(Object(n["F"])(e.actionLabel),1)]})),_:1}),Object(n["j"])(y,{onClick:t[2]||(t[2]=function(t){return e.$emit("cancel")}),class:"mr-3"},{default:Object(n["M"])((function(){return[g]})),_:1})])])])])]})),_:1})}var v=r("82ea"),h=Object(n["k"])({name:"DialogModal",components:{BaseButton:v["a"]},props:{header:{type:String,required:!0},message:{type:String,required:!0},actionLabel:{type:String,default:"Confirm"}},emits:["cancel","confirm"]});h.render=p;t["a"]=h},f25e:function(e,t,r){"use strict";r("7d00")}}]);
//# sourceMappingURL=chunk-77024bc6.01b5056c.js.map