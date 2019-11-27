// 关于音乐控制的控件

export default function musicControlModel(dom) {
  let domNode = dom;
  let musicPlayer = domNode.querySelector(".music-control audio");
  domNode.addEventListener("click", function() {
    // 检测当前音乐播放器状态，根据状态变换为另一状态
    if (musicPlayer.paused) {
      musicPlayer.play(); // 继续播放
      domNode.style = "animation-play-state: running;"; // 继续运行播放动画
    } else {
      musicPlayer.pause(); // 停止播放
      domNode.style = "animation-play-state: paused;"; // 停止运行播放动画
    }
  });

  //   以下内容为处理部分浏览器不能自动播放问题的处理措施
  // touchstart处理函数
  function touchstartHandle() {
    setTimeout(function() {
      domNode.click();
    }, 1000);
    document.documentElement.removeEventListener(
      "touchstart",
      touchstartHandle,
      false
    );
  }

  setTimeout(function() {
    if (musicPlayer.paused) {
      document.documentElement.addEventListener("touchstart", touchstartHandle);
    } else {
      domNode.style = "animation-play-state: running;"; // 继续运行播放动画
    }
  }, 100);
}
