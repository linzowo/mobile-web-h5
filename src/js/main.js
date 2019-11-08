// 程序入口文件

// 引入其他模块
import show from "./index.js";

// 引入样式文件
import '../css/common.scss';

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
