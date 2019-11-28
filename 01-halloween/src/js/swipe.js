// 处理页面滑动功能的组件
(function() {
  let mainEl = document.querySelector(".main");
  let pageList = document.querySelectorAll(".main>li");
  let touchstartY = 0;
  let touchendY = 0;
  let touchMoveDistance = 0;
  let currentTouchElIndex = 0;
  let preIndex = 0;
  let nextIndex = 0;
  let currentTouchEl = {};
  let preEl = {};
  let nextEl = {};

  //   为每个页面li添加唯一标识id，方便后面操作
  pageList.forEach((ele, key) => {
    ele.setAttribute("id", "page" + key);
    ele.setAttribute("data-id", key);
  });

  //   检测用户的touch事件
  mainEl.addEventListener("touchstart", function(e) {
    //   存储起始点纵坐标信息
    touchstartY = e.touches[0].pageY;

    // 重置current元素
    currentTouchEl = document.querySelector(".current");
    currentTouchElIndex = parseInt(currentTouchEl.dataset.id);
  });

  mainEl.addEventListener("touchmove", function(e) {
    touchendY = e.targetTouches[0].pageY;
    touchMoveDistance = touchendY - touchstartY;

    // 改变前后兄弟元素的层级 bottom 或 top
    if (touchMoveDistance > 0) {
      // pre
      // 如果存在nextEL将它的定位重置，不存在就不做操作
      if (document.querySelector(".next")) { // 必须在这里重新查询这个元素，因为原始获取到的哪个nextEl的有可能已经变成currentEl了
        document.querySelector(".next").style.top = "100%";
        document.querySelector(".next").classList.remove("animated");
      }

      preIndex = currentTouchElIndex <= 0 ? 8 : currentTouchElIndex - 1;
      preEl = pageList[preIndex];

      preEl.classList.contains("pre") ? "" : preEl.setAttribute("class", "pre animated");
      preEl.style.top = -preEl.offsetHeight + touchMoveDistance + "px";
    } else if (touchMoveDistance < 0) {
      // next
      // 如果存在preEL将它的定位重置，不存在就不做操作
      if (document.querySelector(".pre")) { //与上面同理
        document.querySelector(".pre").style.top = "-100%";
        document.querySelector(".pre").classList.remove("animated");
      }
      nextIndex = currentTouchElIndex >= 8 ? 0 : currentTouchElIndex + 1;
      nextEl = pageList[nextIndex];

      nextEl.classList.contains("next")?"":nextEl.classList.add("next","animated");
      nextEl.style.top = nextEl.offsetHeight + touchMoveDistance + "px";
    }
  });

  mainEl.addEventListener("touchend", function(e) {
    //  获取结束触摸时的位置
    let timeID = 0;
    touchendY = e.changedTouches[0].pageY;
    touchMoveDistance = touchendY - touchstartY;
    if (touchMoveDistance < 0) {
      timeID = setInterval(function() {
        nextEl.style.top = nextEl.offsetTop - 100 + "px";
        if (nextEl.offsetTop <= 0) {
          nextEl.style.top = 0;
          currentTouchEl.setAttribute("class","");
          nextEl.classList.remove("next");
          nextEl.classList.add("current");
          clearInterval(timeID);
        }
      }, 10);
    }
    if (touchMoveDistance > 0) {
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
    if (touchMoveDistance == 0) {
    }
  });
})();
