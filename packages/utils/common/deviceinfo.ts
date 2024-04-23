export const getMobileDeviceInfo = () => {
  const userAgent = typeof window !== 'undefined' && window.navigator ? window.navigator.userAgent : ''

  let deviceType = ''
  let osVersion = ''
  let osName = ''

  // 获取设备类型
  if (/Android/.test(userAgent)) {
    deviceType = 'Android'
    osName = 'Android'
  } else if (/iPhone|iPad|iPod/.test(userAgent)) {
    deviceType = 'Apple'
    osName = 'iOS'
  }

  // 获取操作系统版本
  if (/Android (\d+\.\d+)/.test(userAgent)) {
    osVersion = RegExp.$1
  } else if (/OS (\d+_\d+)/.test(userAgent)) {
    osVersion = RegExp.$1.replace(/_/, '.')
  }
  return {
    deviceType,
    osName,
    osVersion,
  }
}
