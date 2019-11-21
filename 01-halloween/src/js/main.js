// 程序入口文件

// 引入其他模块
import show from "./index.js"; // 测试导入模块是否成功的测试模块
import musicControlModel from "./music_control_model.js"; // 控制音乐播放与暂停的模块

// 引入样式文件
import "../css/common.scss";
import "../css/1.scss";

// 引入动画样式库
import "../css/animate.css";


// 根据设备高度动态设置容器高度
let htmlObj = document.documentElement,
containerObj = document.querySelector('.container');

htmlObj.style.fontSize = containerObj.clientWidth / 30 + "px";
containerObj.style.height = (containerObj.offsetWidth * (1920/1080)) + "px";



// 动态计算content区域的高度，保证其填满标题下方到页面底部的距离
let titleObj = htmlObj.querySelector(".title");
let titleHeight = titleObj.offsetHeight + titleObj.offsetTop;
htmlObj.querySelector(".content").style.height = (containerObj.clientHeight - titleHeight) + "px";

// 为音乐播放元素添加事件，同时解决浏览器禁用自动播放功能
let musicObj = document.querySelector(".music");
musicControlModel(musicObj);

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
