// 处理页面滑动功能的组件
(function() {
  let mainEl = document.querySelector(".main"); // 获取内容展示区的容器
  let pageList = document.querySelectorAll(".main>li"); // 获取所有展示页面元素
  let touchstartY = 0; // 记录触摸开始时的y坐标
  let touchendY = 0; // 记录触摸结束时的y坐标
  let touchMoveDistance = 0; // 记录移动距离的变量
  let currentTouchElIndex = 0; // 记录当前展示的是第几个页面，为了后面滑动时判断前后的元素
  let preIndex = 0; // 记录前一页的索引值
  let nextIndex = 0; // 记录后一页的索引值
  let currentTouchEl = {}; // 保存当前展示那一页所在的li对象
  let preEl = {}; // 保存前一页对象
  let nextEl = {}; // 保存后一页对象
  console.dir(pageList);
  

  //   为每个页面li添加唯一数据id，方便后面操作
  pageList.forEach((ele, key) => {
    ele.setAttribute("data-id", key);
  });

  //   检测用户的touch事件，根据touch触发不同的处理

  // 采用事件委托的方式，避免了因为层级不同而无法touch目标元素的问题

//   touchstart事件===》初始化必要的变量信息，touchstartY，currentTouchEl，currentTouchElIndex
  mainEl.addEventListener("touchstart", function(e) {
    //   存储起始点纵坐标信息
    touchstartY = e.touches[0].pageY;

    // 重置current元素
    currentTouchEl = mainEl.querySelector(".current");
    currentTouchElIndex = parseInt(currentTouchEl.dataset.id);
  });

//   touchmove事件===》
// 根据用户上下滑动，将用户移动的距离实时赋予前后页面，
// 实现前后页面跟随上下滑动而伸缩的效果，
// 同时实现前后页面出现时重新加载动画效果
  mainEl.addEventListener("touchmove", function(e) {

    touchendY = e.targetTouches[0].pageY;
    touchMoveDistance = touchendY - touchstartY;

    // 改变前后兄弟元素的层级 bottom 或 top
    if (touchMoveDistance > 0) {
      // pre
    //   重置下一页的定位，防止其停留在当前展示页面中
    //  移除动画样式，以便再次加载动画
      if (document.querySelector(".next")) { // 必须在这里重新查询这个元素，因为原始获取到的哪个nextEl的有可能已经变成currentEl了
        document.querySelector(".next").style.top = "100%";
        document.querySelector(".next").classList.remove("animated");
      }

    // 动态计算前一页的索引值，并根据索引值选择合适的元素
      preIndex = currentTouchElIndex <= 0 ? pageList.length - 1 : currentTouchElIndex - 1;
      preEl = pageList[preIndex];

    //   为选定的前一页元素添加对应样式，如果已经存在这个样式了就不做任何操作
    // 每次添加pre的时候同时添加animated触发其动画进行执行，实现每次滑动都能刷新动画
      preEl.classList.contains("pre") ? "" : preEl.setAttribute("class", "pre animated");
    //   根据用户滑动的距离实时计算前一页的位置
      preEl.style.top = touchMoveDistance - preEl.offsetHeight + "px";
    } else if (touchMoveDistance < 0) {
      // next
      // 如果存在preEL将它的定位重置，不存在就不做操作
      if (document.querySelector(".pre")) { //与上面同理
        document.querySelector(".pre").style.top = "-100%";
        document.querySelector(".pre").classList.remove("animated");
      }
      nextIndex = currentTouchElIndex >= pageList.length - 1 ? 0 : currentTouchElIndex + 1;
      nextEl = pageList[nextIndex];

      nextEl.classList.contains("next")?"":nextEl.classList.add("next","animated");
      nextEl.style.top = nextEl.offsetHeight + touchMoveDistance + "px";
    }
  });

//   touchend事件===》
//  用户结束touch说明用户已经选择了前一页或后一页
// 判断用户结束处的y坐标与开始处的距离，决定是前后
// 然后使用定时器，完成后续的位置移动，实现一种动画效果
  mainEl.addEventListener("touchend", function(e) {
    //  获取结束触摸时的位置
    let timeID = 0;
    touchendY = e.changedTouches[0].pageY;
    touchMoveDistance = touchendY - touchstartY;

    // 根据最终位置确定展示前后页
    if (touchMoveDistance < 0) { // 为负 next
      timeID = setInterval(function() { // 通过定时器实现动画
        nextEl.style.top = nextEl.offsetTop - 100 + "px";
        if (nextEl.offsetTop <= 0) { // 当到达指定位置时清理定时器，并重置目标元素的位置到目标位置
          nextEl.style.top = 0;
          currentTouchEl.setAttribute("class",""); // 清除过期的标识
          //   完成位移后将其的标识改为current为下次滑动做准备
          nextEl.classList.remove("next");
          nextEl.classList.add("current");
          clearInterval(timeID);
        }
      }, 10);
    }
    if (touchMoveDistance > 0) {
        // 内容和上面一样
      timeID = setInterval(function() {
        preEl.style.top = preEl.offsetTop + 100 + "px";
        if (preEl.offsetTop <= 0) {
          preEl.style.top = 0;
          currentTouchEl.setAttribute("class","");
          preEl.classList.remove("pre");
          preEl.classList.add("current");
          clearInterval(timeID);
        }
      }, 10);
    }
  });
})();
