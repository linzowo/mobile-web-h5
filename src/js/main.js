// 程序入口文件
import show from "./index.js";
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
