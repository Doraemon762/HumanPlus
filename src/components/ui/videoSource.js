import manifest from '../../data/media-manifest.json'
export default function videoSource(src) {
 const profile=window.matchMedia('(max-width:767px)').matches?'mobile':'desktop'
 return manifest.videos[src]?.[profile]?.src || src
}
