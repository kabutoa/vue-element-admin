import Koa from 'koa'
import cors from '@koa/cors'
import Router from '@koa/router'
import bodyParser from 'koa-bodyparser'

import { PORT, buildRouter } from './helper'
import logger from './middleware/logger'
import error from './middleware/error'

const app = new Koa()

app.use(logger).use(error).use(cors()).use(bodyParser())

// 路由
const router = new Router()
const mockRouter = await buildRouter(router)

app.use(mockRouter.routes()).use(mockRouter.allowedMethods())

app.listen(PORT, () => console.log(`mock server is running at port ${PORT}`))
