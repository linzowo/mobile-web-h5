// 声明一些公共的函数

// 检测用户使用的是什么设备，并根据设备类型执行不同回调函数
window.checkUserDevice = function(callback = null) {
  if (navigator.userAgent.match(/(iPhone|iPod|ipad|Android|ios|SymbianOS)/i)) {
    console.log("是手机");
  } else {
    console.log("是电脑");
  }
};
