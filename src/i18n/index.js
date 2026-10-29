import {useSyncExternalStore} from 'react'
import zh from './zh.json'

// Deliberately no browser-language detection or persisted preference:
// every fresh visit starts in English; only the visitor changes the language.
let language = 'en'
const listeners = new Set()
const normalize = value => value.replace(/\s+/g, ' ').trim()
export function setSiteLanguage(next) {
  if (!['en', 'zh'].includes(next) || next === language) return
  language = next
  document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en'
  listeners.forEach(listener => listener())
}
const subscribe = listener => {listeners.add(listener); return () => listeners.delete(listener)}
export function useSiteLanguage() {
  return useSyncExternalStore(subscribe, () => language, () => language)
}

export function translate(value) {
  if (language !== 'zh' || typeof value !== 'string') return value
  const key = normalize(value)
  if (Object.hasOwn(zh, key)) {
    const start = value.indexOf(key)
    return start < 0 ? zh[key] : value.slice(0, start) + zh[key] + value.slice(start + key.length)
  }
  // Dynamic labels keep their original data/IDs; translate only their presentation.
  const patterns = [
    [/^Explore (.+)$/, (_, name) => `了解 ${name}`],
    [/^Read more: (.+)$/, (_, title) => `阅读更多：${translate(title)}`],
    [/^Read more about (.+)$/, (_, title) => `了解更多：${translate(title)}`],
    [/^Reconstruction sample (\d+)$/, (_, n) => `重建示例 ${n}`],
    [/^Show visualization (\d+)$/, (_, n) => `查看可视化示例 ${n}`],
    [/^(Play|Pause) (.+)$/, (_, action, label) => `${translate(action)} ${translate(label)}`],
    [/^(\d+)-IMU (.+)$/, (_, n, label) => `${n} IMU · ${translate(label)}`],
    [/^(\d+) (IMUs|hours|m)$/, (_, n, unit) => `${n} ${unit === 'IMUs' ? '个 IMU' : unit === 'hours' ? '小时' : '米'}`],
    [/^(Home|Hardware|Dataset|About|Contact|Careers) footer links$/, (_, label) => `${translate(label)}页脚链接`],
    [/^All (.+)$/, (_, label) => `全部${translate(label)}`],
    [/^(.+) conference logo$/, (_, label) => `${label} 会议标志`],
    [/^(.+) research overview$/, (_, label) => `${translate(label)}研究概览`],
  ]
  for (const [pattern, replacement] of patterns) if (pattern.test(key)) return key.replace(pattern, replacement)
  return value
}
