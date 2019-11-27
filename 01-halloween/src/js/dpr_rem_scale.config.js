// 动态设置rem相关的尺寸大小问题，以解决不同设备下的适配问题

// 声明并获取相关元素
let dpr, rem, scale;
let docEl = document.documentElement;
let fontSizeEl = document.createElement("style");
let metaEl = document.querySelector('meta[name="viewport"]');

// 初步计算相关数据
dpr = window.devicePixelRatio || 1;
scale = 1 / dpr;
rem = (docEl.clientWidth * dpr) / 10;

// 设置viewport，进行缩放，达到高清效果
metaEl.setAttribute(
  "content",
  "width=" +
    dpr * docEl.clientWidth +
    ",initial-scale=" +
    scale +
    ",maximum-scale=" +
    scale +
    ",minimum-scale=" +
    scale +
    ",user-scalable=no"
);

// 设置data-dpr属性，留作的css hack之用
docEl.setAttribute('data-dpr',dpr);

// 动态写入样式
docEl.firstElementChild.appendChild(fontSizeEl);
fontSizeEl.innerHTML = 'html{font-size:'+rem+'px!important;}';

// 创建两个公共的转换函数，用于某一dpr下的rem和px互转
window.rem2px = function(v){
    v= parseFloat(v);
    return v * rem;
}

window.px2rem = function(v){
    v= parseFloat(v);
    return v / rem;
}

// 方便后面操作时查询和调用
window.dpr = dpr;
window.rem = rem;
