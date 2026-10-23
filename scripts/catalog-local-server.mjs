import { createServer } from 'node:http'
import { makeCatalogHandler } from '../api/catalog.mjs'
import { readFileSync } from 'node:fs'
const file=JSON.parse(readFileSync(new URL('../.catalog-local.json',import.meta.url),'utf8'))
const handler=makeCatalogHandler({accessKey:file.key,secure:false})
createServer(handler).listen(4199,'127.0.0.1',()=>console.log('Private catalogue API listening on 4199'))
