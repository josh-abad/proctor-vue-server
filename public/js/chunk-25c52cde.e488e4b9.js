(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-25c52cde"],{"0ccb":function(e,t,n){var r=n("50c4"),i=n("1148"),s=n("1d80"),a=Math.ceil,c=function(e){return function(t,n,c){var u,o,d=String(s(t)),l=d.length,f=void 0===c?" ":String(c),h=r(n);return h<=l||""==f?d:(u=h-l,o=i.call(f,a(u/f.length)),o.length>u&&(o=o.slice(0,u)),e?d+o:o+d)}};e.exports={start:c(!1),end:c(!0)}},1148:function(e,t,n){"use strict";var r=n("a691"),i=n("1d80");e.exports="".repeat||function(e){var t=String(i(this)),n="",s=r(e);if(s<0||s==1/0)throw RangeError("Wrong number of repetitions");for(;s>0;(s>>>=1)&&(t+=t))1&s&&(n+=t);return n}},"19bf":function(e,t,n){"use strict";var r=n("7a23");function i(e,t,n,i,s,a){return Object(r["r"])(),Object(r["f"])("div",{class:["bg-gray-100 dark:bg-gray-800 shadow p-6 rounded-lg",e.vibrancy?"bg-opacity-50 dark:bg-opacity-75 backdrop-blur border border-gray-300 dark:border-gray-700":""]},[Object(r["y"])(e.$slots,"default")],2)}var s=Object(r["j"])({name:"BasePanel",props:{vibrancy:{type:Boolean,default:!1}}});s.render=i;t["a"]=s},3457:function(e,t,n){"use strict";var r=n("7a23"),i={class:"flex justify-between"},s={class:"text-3xl text-white font-bold"},a=Object(r["i"])("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"},null,-1);function c(e,t,n,c,u,o){var d=Object(r["z"])("Breadcrumbs"),l=Object(r["z"])("BasePanel");return Object(r["r"])(),Object(r["f"])(l,{class:"bg-gradient-to-r from-green-600 to-green-400 dark:from-green-700 dark:to-green-500"},{default:Object(r["L"])((function(){return[Object(r["i"])("div",i,[Object(r["i"])("div",s,[Object(r["y"])(e.$slots,"default")]),e.hideMenu?Object(r["g"])("",!0):(Object(r["r"])(),Object(r["f"])("svg",{key:0,class:"fill-current text-white w-6 h-6 cursor-pointer",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",onClick:t[1]||(t[1]=function(t){return e.$emit("menu-clicked")})},[a]))]),e.links?(Object(r["r"])(),Object(r["f"])(d,{key:0,class:"mt-2",links:e.links},null,8,["links"])):Object(r["g"])("",!0)]})),_:3})}var u=n("19bf"),o=(n("b0c0"),{class:"flex items-center"}),d=Object(r["i"])("svg",{class:"ml-1 stroke-current w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[Object(r["i"])("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M9 5l7 7-7 7"})],-1);function l(e,t,n,i,s,a){var c=Object(r["z"])("router-link");return Object(r["r"])(),Object(r["f"])("ol",o,[(Object(r["r"])(!0),Object(r["f"])(r["a"],null,Object(r["x"])(e.linksMinusLast,(function(e,t){return Object(r["r"])(),Object(r["f"])("li",{key:t,class:"mr-1 flex items-center text-green-200"},[Object(r["i"])(c,{to:e.url},{default:Object(r["L"])((function(){return[Object(r["h"])(Object(r["E"])(e.name),1)]})),_:2},1032,["to"]),d])})),128)),Object(r["i"])("li",null,[Object(r["i"])(c,{to:e.lastLink.url,class:"text-white"},{default:Object(r["L"])((function(){return[Object(r["h"])(Object(r["E"])(e.lastLink.name),1)]})),_:1},8,["to"])])])}n("fb6a");var f=Object(r["j"])({name:"Breadcrumbs",props:{links:{type:Array,required:!0}},computed:{lastLink:function(){return this.links[this.links.length-1]},linksMinusLast:function(){return this.links.slice(0,this.links.length-1)}}});f.render=l;var h=f,m=Object(r["j"])({name:"ColorHeader",components:{BasePanel:u["a"],Breadcrumbs:h},emits:["menu-clicked"],props:{links:{type:Array,required:!1},hideMenu:{type:Boolean,default:!1}}});m.render=c;t["a"]=m},4181:function(e,t,n){"use strict";var r=n("7a23"),i={class:"fixed inset-0"},s={class:"flex justify-center items-center"},a=Object(r["i"])("span",{class:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true"},"​",-1);function c(e,t){return Object(r["r"])(),Object(r["f"])("div",i,[Object(r["i"])("div",s,[a,Object(r["y"])(e.$slots,"default")])])}const u={};u.render=c;t["a"]=u},"4d90":function(e,t,n){"use strict";var r=n("23e7"),i=n("0ccb").start,s=n("9a0c");r({target:"String",proto:!0,forced:s},{padStart:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}})},"5a0c":function(e,t,n){!function(t,n){e.exports=n()}(0,(function(){"use strict";var e="millisecond",t="second",n="minute",r="hour",i="day",s="week",a="month",c="quarter",u="year",o="date",d=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d+)?$/,l=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,f={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},h=function(e,t,n){var r=String(e);return!r||r.length>=t?e:""+Array(t+1-r.length).join(n)+e},m={s:h,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),r=Math.floor(n/60),i=n%60;return(t<=0?"+":"-")+h(r,2,"0")+":"+h(i,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var r=12*(n.year()-t.year())+(n.month()-t.month()),i=t.clone().add(r,a),s=n-i<0,c=t.clone().add(r+(s?-1:1),a);return+(-(r+(n-i)/(s?i-c:c-i))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(d){return{M:a,y:u,w:s,d:i,D:o,h:r,m:n,s:t,ms:e,Q:c}[d]||String(d||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},b="en",O={};O[b]=f;var j=function(e){return e instanceof v},p=function(e,t,n){var r;if(!e)return b;if("string"==typeof e)O[e]&&(r=e),t&&(O[e]=t,r=e);else{var i=e.name;O[i]=e,r=i}return!n&&r&&(b=r),r||!n&&b},g=function(e,t){if(j(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new v(n)},y=m;y.l=p,y.i=j,y.w=function(e,t){return g(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var v=function(){function f(e){this.$L=p(e.locale,null,!0),this.parse(e)}var h=f.prototype;return h.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(y.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var r=t.match(d);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},h.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},h.$utils=function(){return y},h.isValid=function(){return!("Invalid Date"===this.$d.toString())},h.isSame=function(e,t){var n=g(e);return this.startOf(t)<=n&&n<=this.endOf(t)},h.isAfter=function(e,t){return g(e)<this.startOf(t)},h.isBefore=function(e,t){return this.endOf(t)<g(e)},h.$g=function(e,t,n){return y.u(e)?this[t]:this.set(n,e)},h.unix=function(){return Math.floor(this.valueOf()/1e3)},h.valueOf=function(){return this.$d.getTime()},h.startOf=function(e,c){var d=this,l=!!y.u(c)||c,f=y.p(e),h=function(e,t){var n=y.w(d.$u?Date.UTC(d.$y,t,e):new Date(d.$y,t,e),d);return l?n:n.endOf(i)},m=function(e,t){return y.w(d.toDate()[e].apply(d.toDate("s"),(l?[0,0,0,0]:[23,59,59,999]).slice(t)),d)},b=this.$W,O=this.$M,j=this.$D,p="set"+(this.$u?"UTC":"");switch(f){case u:return l?h(1,0):h(31,11);case a:return l?h(1,O):h(0,O+1);case s:var g=this.$locale().weekStart||0,v=(b<g?b+7:b)-g;return h(l?j-v:j+(6-v),O);case i:case o:return m(p+"Hours",0);case r:return m(p+"Minutes",1);case n:return m(p+"Seconds",2);case t:return m(p+"Milliseconds",3);default:return this.clone()}},h.endOf=function(e){return this.startOf(e,!1)},h.$set=function(s,c){var d,l=y.p(s),f="set"+(this.$u?"UTC":""),h=(d={},d[i]=f+"Date",d[o]=f+"Date",d[a]=f+"Month",d[u]=f+"FullYear",d[r]=f+"Hours",d[n]=f+"Minutes",d[t]=f+"Seconds",d[e]=f+"Milliseconds",d)[l],m=l===i?this.$D+(c-this.$W):c;if(l===a||l===u){var b=this.clone().set(o,1);b.$d[h](m),b.init(),this.$d=b.set(o,Math.min(this.$D,b.daysInMonth())).$d}else h&&this.$d[h](m);return this.init(),this},h.set=function(e,t){return this.clone().$set(e,t)},h.get=function(e){return this[y.p(e)]()},h.add=function(e,c){var o,d=this;e=Number(e);var l=y.p(c),f=function(t){var n=g(d);return y.w(n.date(n.date()+Math.round(t*e)),d)};if(l===a)return this.set(a,this.$M+e);if(l===u)return this.set(u,this.$y+e);if(l===i)return f(1);if(l===s)return f(7);var h=(o={},o[n]=6e4,o[r]=36e5,o[t]=1e3,o)[l]||1,m=this.$d.getTime()+e*h;return y.w(m,this)},h.subtract=function(e,t){return this.add(-1*e,t)},h.format=function(e){var t=this;if(!this.isValid())return"Invalid Date";var n=e||"YYYY-MM-DDTHH:mm:ssZ",r=y.z(this),i=this.$locale(),s=this.$H,a=this.$m,c=this.$M,u=i.weekdays,o=i.months,d=function(e,r,i,s){return e&&(e[r]||e(t,n))||i[r].substr(0,s)},f=function(e){return y.s(s%12||12,e,"0")},h=i.meridiem||function(e,t,n){var r=e<12?"AM":"PM";return n?r.toLowerCase():r},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:c+1,MM:y.s(c+1,2,"0"),MMM:d(i.monthsShort,c,o,3),MMMM:d(o,c),D:this.$D,DD:y.s(this.$D,2,"0"),d:String(this.$W),dd:d(i.weekdaysMin,this.$W,u,2),ddd:d(i.weekdaysShort,this.$W,u,3),dddd:u[this.$W],H:String(s),HH:y.s(s,2,"0"),h:f(1),hh:f(2),a:h(s,a,!0),A:h(s,a,!1),m:String(a),mm:y.s(a,2,"0"),s:String(this.$s),ss:y.s(this.$s,2,"0"),SSS:y.s(this.$ms,3,"0"),Z:r};return n.replace(l,(function(e,t){return t||m[e]||r.replace(":","")}))},h.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},h.diff=function(e,o,d){var l,f=y.p(o),h=g(e),m=6e4*(h.utcOffset()-this.utcOffset()),b=this-h,O=y.m(this,h);return O=(l={},l[u]=O/12,l[a]=O,l[c]=O/3,l[s]=(b-m)/6048e5,l[i]=(b-m)/864e5,l[r]=b/36e5,l[n]=b/6e4,l[t]=b/1e3,l)[f]||b,d?O:y.a(O)},h.daysInMonth=function(){return this.endOf(a).$D},h.$locale=function(){return O[this.$L]},h.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),r=p(e,t,!0);return r&&(n.$L=r),n},h.clone=function(){return y.w(this.$d,this)},h.toDate=function(){return new Date(this.valueOf())},h.toJSON=function(){return this.isValid()?this.toISOString():null},h.toISOString=function(){return this.$d.toISOString()},h.toString=function(){return this.$d.toUTCString()},f}(),$=v.prototype;return g.prototype=$,[["$ms",e],["$s",t],["$m",n],["$H",r],["$W",i],["$M",a],["$y",u],["$D",o]].forEach((function(e){$[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),g.extend=function(e,t){return e.$i||(e(t,v,g),e.$i=!0),g},g.locale=p,g.isDayjs=j,g.unix=function(e){return g(1e3*e)},g.en=O[b],g.Ls=O,g.p={},g}))},8706:function(e,t,n){"use strict";n.r(t);var r=n("7a23"),i={key:0},s={class:"mt-4 flex justify-between items-center"},a=Object(r["h"])("Submit"),c={class:"flex flex-col items-center"},u=Object(r["i"])("p",{class:"font-thin text-2xl"}," Sorry, you are not allowed to take this exam. ",-1),o=Object(r["h"])("Return to course");function d(e,t,n,d,l,f){var h=Object(r["z"])("ColorHeader"),m=Object(r["z"])("BaseExamItem"),b=Object(r["z"])("Timer"),O=Object(r["z"])("BaseButton"),j=Object(r["z"])("BasePanel"),p=Object(r["z"])("Center");return Object(r["r"])(),Object(r["f"])("div",null,[e.$store.getters.permissions("coordinator","admin")||e.hasToken&&e.activeExam===e.exam.id?(Object(r["r"])(),Object(r["f"])("div",i,[Object(r["i"])(h,{hideMenu:""},{default:Object(r["L"])((function(){return[Object(r["h"])(Object(r["E"])(e.exam.label),1)]})),_:1}),Object(r["i"])(j,{class:"mt-4"},{default:Object(r["L"])((function(){return[(Object(r["r"])(!0),Object(r["f"])(r["a"],null,Object(r["x"])(e.exam.examItems,(function(t,n){return Object(r["r"])(),Object(r["f"])(m,{key:n,examItem:t,questionNumber:n+1,onAnswerChanged:e.handleAnswerChange},null,8,["examItem","questionNumber","onAnswerChanged"])})),128)),Object(r["i"])("div",s,[Object(r["i"])(b,{end:e.attempt.endDate,onTimerEnded:e.handleTimeEnd},null,8,["end","onTimerEnded"]),Object(r["i"])(O,{onClick:e.handleSubmit,prominent:""},{default:Object(r["L"])((function(){return[a]})),_:1},8,["onClick"])])]})),_:1})])):(Object(r["r"])(),Object(r["f"])(p,{key:1},{default:Object(r["L"])((function(){return[Object(r["i"])("div",c,[u,Object(r["i"])(O,{class:"mt-3",onClick:t[1]||(t[1]=function(t){return e.$router.push("/courses/".concat(e.courseId))}),prominent:""},{default:Object(r["L"])((function(){return[o]})),_:1})])]})),_:1}))])}n("99af"),n("c740"),n("45fc"),n("b0c0"),n("96cf");var l=n("1da1"),f=n("82ea"),h={class:"flex mt-3 shadow rounded-lg overflow-hidden"},m={class:"px-3 py-3 bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 dark:bg-opacity-50 backdrop-blur"},b={class:"pl-4 pr-12 py-3 bg-gray-100 dark:bg-gray-800 w-full select-none"},O={class:"mt-4"},j={key:1},p={key:2};function g(e,t,n,i,s,a){var c=Object(r["z"])("BaseInput");return Object(r["r"])(),Object(r["f"])("div",h,[Object(r["i"])("div",m,Object(r["E"])(e.questionNumber),1),Object(r["i"])("div",b,[Object(r["h"])(Object(r["E"])(e.examItem.question)+" ",1),Object(r["i"])("div",O,["text"===e.examItem.questionType?(Object(r["r"])(),Object(r["f"])(c,{key:0,modelValue:e.answer,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.answer=t}),type:"text",onInput:t[2]||(t[2]=function(t){return e.$emit("answer-changed",{question:e.examItem.question,answer:e.answer})})},null,8,["modelValue"])):"multiple choice"===e.examItem.questionType?(Object(r["r"])(),Object(r["f"])("div",j,[(Object(r["r"])(!0),Object(r["f"])(r["a"],null,Object(r["x"])(e.examItem.choices,(function(n,i){return Object(r["r"])(),Object(r["f"])("div",{key:i},[Object(r["M"])(Object(r["i"])("input",{type:"radio",value:n,name:"Question ".concat(e.questionNumber),id:n,"onUpdate:modelValue":t[3]||(t[3]=function(t){return e.answer=t}),onChange:t[4]||(t[4]=function(t){return e.$emit("answer-changed",{question:e.examItem.question,answer:e.answer})})},null,40,["value","name","id"]),[[r["H"],e.answer]]),Object(r["i"])("label",{for:n,class:"ml-2"},Object(r["E"])("".concat(e.getNextAlphabetLetter(i),". ").concat(n)),9,["for"])])})),128))])):(Object(r["r"])(),Object(r["f"])("div",p,[(Object(r["r"])(!0),Object(r["f"])(r["a"],null,Object(r["x"])(e.examItem.choices,(function(n,i){return Object(r["r"])(),Object(r["f"])("div",{key:i},[Object(r["M"])(Object(r["i"])("input",{type:"checkbox",name:n,id:n,value:n,"onUpdate:modelValue":t[5]||(t[5]=function(t){return e.answer=t}),onChange:t[6]||(t[6]=function(t){return e.$emit("answer-changed",{question:e.examItem.question,answer:e.answer})})},null,40,["name","id","value"]),[[r["G"],e.answer]]),Object(r["i"])("label",{for:n,class:"ml-2"},Object(r["E"])(n),9,["for"])])})),128))]))])])])}n("a9e3");var y=n("b3b3"),v=Object(r["j"])({components:{BaseInput:y["a"]},name:"ExamItem",emits:["answer-changed"],data:function(){var e;return e="text"===this.examItem.questionType||"multiple choice"===this.examItem.questionType?"":[],{alphabetStart:"a",answer:e}},methods:{getNextAlphabetLetter:function(e){return String.fromCharCode(this.alphabetStart.charCodeAt(0)+e)}},props:{examItem:{type:Object,required:!0},questionNumber:Number}});v.render=g;var $=v,w=n("a784"),x={class:"flex items-center h-10 rounded overflow-hidden"},k=Object(r["i"])("div",{class:"w-2 h-full bg-green-500"},null,-1),M={class:"p-3 bg-gray-700 text-lg font-semibold"},S={key:0},I=Object(r["i"])("span",{class:"font-thin"},"h",-1),D={key:1},q=Object(r["i"])("span",{class:"font-thin"},"m",-1),C=Object(r["i"])("span",{class:"font-thin"},"s",-1);function _(e,t,n,i,s,a){return Object(r["r"])(),Object(r["f"])("div",x,[k,Object(r["i"])("div",M,["00"!==e.displayHours?(Object(r["r"])(),Object(r["f"])("span",S,[Object(r["h"])(Object(r["E"])(e.displayHours),1),I])):Object(r["g"])("",!0),"00"!==e.displayMinutes?(Object(r["r"])(),Object(r["f"])("span",D,[Object(r["h"])(Object(r["E"])(e.displayMinutes),1),q])):Object(r["g"])("",!0),Object(r["h"])(" "+Object(r["E"])(e.displaySeconds),1),C])])}n("d3b7"),n("25f0"),n("4d90");var T=n("5a0c"),E=n.n(T),L=Object(r["j"])({name:"Timer",props:{end:{type:[Date,String],required:!0}},data:function(){return{displaySeconds:"0",displayMinutes:"0",displayHours:"0"}},emits:["timer-ended"],methods:{format:function(e){return e.toString().padStart(2,"0")},countdown:function(){var e=this,t=setInterval((function(){var n=E()(e.end).diff(new Date);if(n<0)return e.$emit("timer-ended"),void clearInterval(t);var r=Math.floor(n%e.days/e.hours),i=Math.floor(n%e.hours/e.minutes),s=Math.floor(n%e.minutes/e.seconds);e.displayMinutes=e.format(i),e.displaySeconds=e.format(s),e.displayHours=e.format(r)}),1e3)}},mounted:function(){this.countdown()},computed:{seconds:function(){return 1e3},minutes:function(){return 60*this.seconds},hours:function(){return 60*this.minutes},days:function(){return 24*this.hours}}});L.render=_;var B=L,A=n("2d40"),H=n("8141"),z=n("19bf"),N=n("4181"),Y=n("3457"),V=Object(r["j"])({components:{BaseExamItem:$,BaseButton:f["a"],Timer:B,BasePanel:z["a"],Center:N["a"],ColorHeader:Y["a"]},name:"ExamPage",data:function(){var e=[];return{answers:e,hasToken:!1}},props:{courseId:{type:String,required:!0},examId:{type:String,required:!0},attemptId:{type:String,required:!0}},mounted:function(){document.title="".concat(this.exam.label," in ").concat(this.exam.course.name," | Proctor Vue"),this.hasToken=w["a"].hasToken()},computed:{exam:function(){return this.$store.getters.getExamByID(this.examId)},attempt:function(){return this.$store.getters.getAttemptByID(this.attemptId)},activeExam:function(){return this.$store.state.activeExam}},methods:{handleAnswerChange:function(e){var t=e.question,n=e.answer;if(this.answers.some((function(e){return e.question===t}))){var r=this.answers.findIndex((function(e){return e.question===t}));this.answers[r]={question:t,answer:n}}else this.answers.push({question:t,answer:n})},handleTimeEnd:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch(H["p"],{answers:e.answers,examId:e.examId});case 2:e.$store.commit(A["j"],null),e.$router.push("/courses/".concat(e.courseId,"/exams/").concat(e.examId));case 4:case"end":return t.stop()}}),t)})))()},handleSubmit:function(){var e=this;this.$store.commit(A["g"],{header:"Submit Answers",actionLabel:"Submit",message:"Are you sure you want to submit your answers?"}),this.$emitter.on("closedDialog",function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!n){t.next=5;break}return t.next=3,e.$store.dispatch(H["p"],{answers:e.answers,examId:e.examId});case 3:e.$store.commit(A["j"],null),e.$router.push("/courses/".concat(e.courseId,"/exams/").concat(e.examId));case 5:e.$emitter.all.clear();case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}}});V.render=d;t["default"]=V},"9a0c":function(e,t,n){var r=n("342f");e.exports=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(r)},c740:function(e,t,n){"use strict";var r=n("23e7"),i=n("b727").findIndex,s=n("44d2"),a=n("ae40"),c="findIndex",u=!0,o=a(c);c in[]&&Array(1)[c]((function(){u=!1})),r({target:"Array",proto:!0,forced:u||!o},{findIndex:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),s(c)}}]);
//# sourceMappingURL=chunk-25c52cde.e488e4b9.js.map