import Koa from 'koa'
import { getResponse } from '../helper'

const error = async (ctx: Koa.Context, next: Koa.Next) => {
  try {
    await next()
  } catch (err) {
    ctx.body = getResponse({
      code: 500,
      message: err?.message || 'Internal Server Error',
    })
  }
}

export default error
