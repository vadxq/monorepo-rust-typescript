import { differenceInDays, format, formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export const formatTimeToNow = (date: Date | string | number) => {
  const now = new Date()
  const targetDate = new Date(typeof date === 'string' ? date.replace(/-/g, '/') : date)
  const diffDays = differenceInDays(now, targetDate)

  if (diffDays <= 7) {
    return formatDistanceToNow(targetDate, { addSuffix: true, locale: zhCN })
  } else {
    return format(targetDate, 'yyyy-MM-dd HH:mm', { locale: zhCN })
  }
}

/**
 * 转换时间周期，间隔符为:
 * @param {Number} date 大小，单位时间毫秒
 * @return {String} 格式化后的大小 hh:mm:ss 20:21:02
 */
export const formatDurationTime = (date: number) => {
  if (date === 0) return '00:00:00'
  const hours = Math.ceil(date / 1000 / (60 * 60) - 1)
  const minutes = Math.ceil((date / 1000 - hours * 3600) / 60 - 1)
  const seconds = Math.ceil(date / 1000 - hours * 3600 - minutes * 60)
  // const minutes = Math.ceil((date / 1000 - seconds) % 60);
  // const hours = Math.ceil((date / 1000 - minutes * 60 - seconds) % 60);
  return `${hours > 9 ? hours : `0${hours}`}:${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`
}
