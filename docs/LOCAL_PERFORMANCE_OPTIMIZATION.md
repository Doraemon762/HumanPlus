# 官网本地加载优化

日期：2026-10-11。基于 abd8993 的本地源码副本。

## 已实施

- 为 93 张图片生成 213 个响应式版本，使用 WebP，保留真实透明背景和宽高比。
- 图片通过 srcset/sizes 按显示尺寸与屏幕像素密度选择文件；首屏产品图优先加载，其余图片懒加载。
- 研究图片轮播从一次性加载原始背景图改为响应式图片。
- 为 16 个视频生成电脑、手机两个 H.264 MP4 版本及封面，不裁剪、不截短内容。
- MP4 使用 fast-start，将播放索引放在文件前部，支持尚未完整下载时起播。
- 首屏视频优先加载；其余视频在可见时才设置源地址，离开视野时暂停。
- Application 隐藏面板不加载视频，切换面板后加载，并保留手动播放控制。
- 首页之外的页面按路由分包，进入对应页面时才加载代码。
- Geist 原始字体文件、字体设置和 Google Fonts 链接保留。Geist 文件 SHA-256 与原仓库一致。

## 素材体积

以下为素材文件体积，不能直接当作实际页面打开时间，也不是一次访问需要下载的总量。
图片优化后列取每张图片最大的网页版本，手机通常会使用更小版本。

| 素材 | 原始合计 | 网页版本合计 |
| --- | ---: | ---: |
| 93 张图片 | 90.03 MB | 7.40 MB |
| 16 个视频，电脑版本 | 111.36 MB | 68.23 MB |
| 16 个视频，手机版本 | 111.36 MB | 20.33 MB |
| 首页视频，电脑版本 | 7.39 MB | 4.82 MB |
| 首页视频，手机版本 | 7.39 MB | 1.22 MB |

原始图片和视频均保留在 public 下，以便调整质量、重新生成和处理视频加载失败的回退。
压缩文件位于 public/media，映射表位于 src/data/media-manifest.json。
因此本地目录和部署包体积会增加，浏览器正常访问使用的是轻量版本。
逐个文件体积详见 media-optimization-sizes.json。

## 验证结果

- npm run build 通过。
- 首页主 JavaScript 从原构建 374.11 kB（gzip 126.51 kB）降至 211.80 kB（gzip 64.79 kB）；进入其他页面再下载其分包。
- 93 张图片、213 个响应式版本的尺寸、比例和透明背景检查通过。
- 16 个视频的文件完整性和 fast-start 索引检查通过。
- Chrome 桌面 1440×900 和手机尺寸 390×844：主要页面无本地资源 404、脚本错误或横向溢出，字体设置为 Geist Sans。
- 首页首屏请求仅包含首屏视频；第二屏视频未设置源地址，滚动后再加载。
- 两种尺寸下，Application 视频切换、手动播放、隐藏后暂停通过；产品性能视频的播放暂停、静音、进度条操作通过。
- 截图检查确认产品图片和透明背景正常显示。未进行 Safari 或线上弱网实测。

## 官方参考

- Google web.dev 图片优化：https://web.dev/learn/performance/image-performance
- Google web.dev 视频懒加载：https://web.dev/articles/lazy-loading-video
- FFmpeg MP4 fast-start：https://ffmpeg.org/ffmpeg-formats.html
- React 页面按需加载：https://react.dev/reference/react/lazy

## 维护

正常预览和构建仍然使用 npm run dev / npm run build，不需要安装压缩工具。

重新生成素材需要 Node.js 的 sharp 包和支持 libx264 的 FFmpeg。
本机的临时压缩工具已准备在 /private/tmp/humanplus-media-tools，可执行：

```bash
MEDIA_TOOLS_DIR=/private/tmp/humanplus-media-tools \
FFMPEG_BIN=/private/tmp/humanplus-media-tools/node_modules/@ffmpeg-installer/darwin-x64/ffmpeg \
node scripts/optimize-media.mjs --videos
```

临时目录被清理后需要重新准备工具。另一台电脑应使用其平台对应的 FFmpeg。
脚本不裁剪视频内容；默认最多 1080p/30fps，手机最多 540p/30fps；原视频有音频时保留音频。
新增素材后应重新生成，再执行 node scripts/check-media.cjs 检查资源、MP4 索引与字体。

推送 main 后由 GitHub Actions 自动构建并发布，部署结果以对应 Actions 记录为准。Dataset 页嵌入的外部网站不在本仓库优化范围内。
