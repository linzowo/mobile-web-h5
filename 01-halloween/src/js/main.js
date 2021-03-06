// 程序入口文件

// 引入js文件
import "./dpr_rem_scale.config.js";
// import "./swipe.js";

// 引入其他模块
import show from "./index.js"; // 测试导入模块是否成功的测试模块
import musicControlModel from "./music_control_model.js"; // 控制音乐播放与暂停的模块
import swipe from "./swipe.js";

// 引入样式文件
// import "../css/common.scss";
import "../css/1.scss";

// 引入动画样式库
import "../css/animate.css";

// 为音乐播放元素添加事件，同时解决浏览器禁用自动播放功能
musicControlModel(document.querySelector(".music"));

// 动态设置main区域的margin,保证内容在垂直方向是居中显示的
(function() {
  let docEl = document.documentElement;
  let mainEl = document.querySelector(".main");

  mainEl.style.marginTop =
    (docEl.clientHeight - mainEl.clientHeight) / 2 + "px";
})();

// 为页面添加滑动功能
swipe(document.querySelector(".main"),document.querySelectorAll(".main>li"));

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
