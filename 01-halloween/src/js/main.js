// 程序入口文件

// 引入js文件
import "./dpr_rem_scale.config.js";

// 引入其他模块
import show from "./index.js"; // 测试导入模块是否成功的测试模块
import musicControlModel from "./music_control_model.js"; // 控制音乐播放与暂停的模块

// 引入样式文件
// import "../css/common.scss";
import "../css/1.scss";

// 引入动画样式库
import "../css/animate.css";

// 为音乐播放元素添加事件，同时解决浏览器禁用自动播放功能
musicControlModel(document.querySelector(".music"));

// 保证内容一屏显示
// 判断用户使用的是什么设备
let docEl = document.documentElement;
var elObj = {};
elObj["mainEl"] = document.querySelector(".main");
elObj["container"] = document.querySelector(".container");
elObj["swipeEl"] = document.querySelector(".swipe-up");
elObj["musicEl"] = document.querySelector(".music");

// if (navigator.userAgent.match(/(iPhone|iPod|ipad|Android|ios|SymbianOS)/i)) {
//   // 用户采用手机访问

//   // 去除电脑端浏览相关样式设置
//   for(let ele in elObj){
//     elObj[ele].setAttribute("class",elObj[ele].className.replace("phone-box",""));
//   } //===> container.setAttribute("class","container");

//   // 动态设置main区域的margin
//   elObj["mainEl"].style.marginTop = (docEl.clientHeight - elObj["mainEl"].clientHeight) / 2 + "px";
// } else {
//   // 用户采用电脑访问

//   // 添加电脑端相关设置样式
//   for(let ele in elObj){
//     elObj[ele].setAttribute("class",elObj[ele].className + " phone-box");
//   } //===> container.setAttribute("class","container phone-box");

//   // 将音乐和滑动组件的参照点改为盒子容器而不是整个屏幕

// }
// 动态设置main区域的margin
elObj["mainEl"].style.marginTop =
  (docEl.clientHeight - elObj["mainEl"].clientHeight) / 2 + "px";

// 热模块更新处理区域
if (module.hot) {
  module.hot.accept("./index.js", function() {
    console.log("Accepting the updated show module!");
    show();
  });
  module.hot.accept("./music_control_model.js", function() {
    console.log("Accepting the updated show module!");
    musicControlModel(document.querySelector(".music"));
  });
}
