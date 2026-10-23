import { randomBytes } from 'node:crypto'
import { writeFileSync } from 'node:fs'
writeFileSync(new URL('../.catalog-local.json',import.meta.url),JSON.stringify({key:randomBytes(32).toString('base64url')})+'\n')
console.log('Local access key generated in ignored .catalog-local.json')
