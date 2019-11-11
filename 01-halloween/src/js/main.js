// 程序入口文件

// 引入其他模块
import show from "./index.js";

// 引入样式文件
import '../css/common.scss';
import "../css/1.scss";

// 引入动画样式库
import "../css/animate.css"

// 解决移动端样式尺寸适配问题。动态计算rem的基准值
document.documentElement.style.fontSize = document.documentElement.clientWidth/30 + "px";


// 热模块更新处理区域
if (module.hot) {
  module.hot.accept("./index.js", function() {
    console.log("Accepting the updated show module!");
    show();
  });
}
