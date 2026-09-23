# Changelog — HumanPlus Website

## V0.2.0 — 2026-09-23（仅本地，未部署）

信息架构与视觉重构。

- Hash 路由化（`useHashRoute`，无 react-router）：`/`、`/products`、`/products/:id`、`/research`、`/news`、`/solutions`、`/solutions/:id`、`/contact`，共 15 个可达页面
- 首页改为 Overview：每个模块简要介绍 + CTA 跳独立页面
- 品牌名统一 Renyi Intelligence → HumanPlus（用户可见文案；技术标识不变）
- Navbar Logo 缩至 80%（36px → 28.8px），导航高度与文字不变
- Our Products 重构：Motion-0 全宽横版 banner + Glove-0/Vision-0 双梯形卡（skew + 圆角裁剪，斜边同向 `\ \`），#252525 占位，图片/视频位预留
- 动画规范：0.3s hover、0.2s dropdown 延续既有体系

## V0.1.0 — 2026-09-23

Framework first pass（本地骨架阶段，未部署、未 push）。

- React 18 + Vite 5 + Tailwind 3（继承 HumanPlus-1000 技术栈与极简依赖策略）
- 白色 / 浅色主题：HumanPlus-1000 排版系统全量继承，颜色层整体翻转
- 品牌蓝从人一智能 Logo 提取：主色 `#0148EE`，辅色 `#5A9CFC`
- Navbar：桌面 hover dropdown（Products / Solutions）+ 移动端汉堡 + 手风琴二级菜单
- 首页 8 个 Section：Hero / About / Products / Robotics / Research / News / Solutions / Contact
- 全部内容为占位符，不包含任何真实公司信息、产品参数、新闻或案例
- 真实 Logo 资源接入 `public/images/logo/logo.png`（未做任何修改）
