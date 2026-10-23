# 客户产品画册

已接入现有 React 官网的 `/catalog`，不加入公开导航。电脑双页、窄屏单页，支持翻页、跳页、放大和全屏。当前内容来自桌面《产品手册V2.pdf》，共 8 页。

## 本地预览
分别运行 `node scripts/catalog-local-server.mjs` 和 `npm run dev -- --host 127.0.0.1 --port 4198`。首次运行 `node scripts/catalog-key.mjs` 生成本地访问密钥。访问 `http://127.0.0.1:4198/catalog#access=本地密钥`。

## Vercel 上线
在现有官网 Vercel 项目设置服务端环境变量 `CATALOG_ACCESS_KEY`，使用至少 32 位的随机密钥，不能使用 VITE_ 前缀，不能提交到仓库。重新部署后，发送给客户的入口为 `https://官网域名/catalog#access=密钥`。已提供 vercel.json 的 API 文件打包与路由配置；纯静态托管不能使用此访问保护。

首次打开后链接片段会被清除，服务器签发 12 小时 HttpOnly 会话。页面、图片和清单需要授权，图片没有放进公开静态目录。入口设置 noindex，但真正保护来自服务端验证。持有链接的客户仍可转发链接、截图；如需逐客户撤销或到期，应后续增加独立邀请令牌。目前为一个共用客户入口，轮换密钥会让旧链接和旧会话失效。

## 更新手册
使用安装了 pypdfium2、pypdf、Pillow 的 Python 执行：

    python scripts/update-catalog.py "C:/Users/15575/Desktop/产品手册V2.pdf"

提交生成的 private/catalog 内容并重新部署。原访问入口保持不变。修改 InDesign 文件本身不会自动同步，需先导出 PDF。当前未添加下载原 PDF 功能。

## 验证
`node --test scripts/catalog.test.mjs` 验证授权、跨域拒绝、图片访问及篡改 Cookie；`npm run build` 验证网站构建。翻页使用 MIT 许可的 StPageFlip（page-flip）。本次未执行官网发布。
