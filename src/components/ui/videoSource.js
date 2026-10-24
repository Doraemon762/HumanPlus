import manifest from '../../data/media-manifest.json'
import { mediaKey } from './OptimizedImage'
export function mediaProfile() {
 const connection = navigator.connection
 const slow = connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || '') || (connection?.downlink > 0 && connection.downlink < 2)
 return slow ? 'slow' : window.matchMedia('(max-width:767px)').matches ? 'mobile' : 'desktop'
}
export default function videoSource(src) {
 const entry = manifest.videos[mediaKey(src)]
 return entry?.[mediaProfile()]?.src || entry?.mobile?.src || src
}
