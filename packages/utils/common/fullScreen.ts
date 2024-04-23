// 请求开启全屏
export const requestFullScreen = (elem: any) => {
  console.log(elem)
  try {
    if (typeof window !== 'undefined') {
      if (elem?.requestFullscreen) {
        elem.requestFullscreen()
      } else if (elem?.msRequestFullscreen) {
        elem.msRequestFullscreen()
      } else if (elem?.mozRequestFullScreen) {
        elem.mozRequestFullScreen()
      } else if (elem?.webkitRequestFullscreen) {
        // 对 Chrome 特殊处理，
        // 参数 Element.ALLOW_KEYBOARD_INPUT 使全屏状态中可以键盘输入。
        if (window.navigator.userAgent.toUpperCase().indexOf('CHROME') >= 0) {
          elem.webkitRequestFullScreen(elem?.ALLOW_KEYBOARD_INPUT)
        } else {
          // Safari 浏览器中，如果方法内有参数，则 Fullscreen 功能不可用。
          elem.webkitRequestFullScreen()
        }
      } else if (elem?.webkitEnterFullscreen) {
        elem.webkitEnterFullscreen()
      }
      return true
    }
    return false
  } catch (error) {
    return false
  }
}

// 取消全屏
export const cancelFullscreen = () => {
  try {
    if (typeof window !== 'undefined') {
      const docs: any = document
      if (docs?.exitFullscreen) {
        docs.exitFullscreen()
      } else if (docs?.msExitFullscreen) {
        docs.msExitFullscreen()
      } else if (docs?.mozCancelFullScreen) {
        docs.mozCancelFullScreen()
      } else if (docs?.oRequestFullscreen) {
        docs.oCancelFullScreen()
      } else if (docs?.webkitExitFullscreen) {
        alert('webkit')
        docs.webkitExitFullscreen()
      }
      return true
    }
  } catch (error) {
    return false
  }
}

// 检查是否是全屏状态
export const checkFullScreen = () => {
  try {
    if (typeof window !== 'undefined') {
      const docs: any = document
      console.log(docs?.webkitIsFullScreen)
      return docs.fullscreenElement || docs?.webkitIsFullScreen || docs?.mozFullScreen || docs?.msFullscreenElement || docs?.oFullscreenElement || false
    }
    return false
  } catch (error) {
    return false
  }
}
