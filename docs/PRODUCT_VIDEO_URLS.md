# Product video QR entrypoints

Permanent base URL: https://humanplusai.cn/manual-videos/

The five print entrypoints are recorded in `public/manual-videos/entrypoints.json`.
Keep the domain, directory, and `product` values (`weave`, `pulse`, `glove`, `cap`, `datasets`) unchanged. Existing bare-directory links continue to show Weave. Do not put MP4 URLs, temporary preview URLs, commit hashes, or filenames in printed QR codes.

Each QR opens the complete product collection. The page supports Chinese and English; the five shared QR codes omit `lang`, so visitors can use the language switch. Explicit `lang=zh` and `lang=en` links remain supported.

## Updating videos

Edit the matching `library` collection in `public/manual-videos/index.html`. Add, remove, rename, or reorder video entries without changing its product key. Keep meaningful stable asset filenames; for changed media, use a new asset filename and update its `src`, `mobile`, `poster`, `width`, and `height` in the collection. This avoids stale media caches while keeping the printed collection URL unchanged. Keep Chinese and English titles aligned.

The CAP collection is intentionally empty until approved footage is supplied; its QR already opens the permanent CAP page. Dataset scene clips remain in the single-screen scene carousel.

Run `node scripts/check-video-entrypoints.mjs` and the normal production build before publishing. Verify all five page links and scan-test the QR exports. Deployment uses the existing GitHub Pages workflow for `Doraemon762/HumanPlus` main; do not replace it with another host or directory.
