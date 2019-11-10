// 程序入口文件

// 引入其他模块
import show from "./index.js";

// 引入样式文件
import '../css/common.scss';

// 解决移动端样式尺寸适配问题。动态计算rem的基准值
document.documentElement.style.fontSize = document.documentElement.clientWidth/30 + "px";

// test
let container = document.createElement("div");
container.innerHTML = "hello webpack";
document.querySelector("body").appendChild(container);

if (module.hot) {
  module.hot.accept("./index.js", function() {
    console.log("Accepting the updated show module!");
    show();
  });
}
