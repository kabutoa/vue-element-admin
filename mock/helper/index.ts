import { fileURLToPath } from 'url'
import { readdir } from 'fs/promises'
import path, { dirname } from 'path'
import { IMockData } from '../types'
import Mock from 'mockjs'
import type { Context } from 'koa'

export function getResponse(data) {
  const initialResponse = {
    status: 'success',
    code: 200,
    message: '',
  }
  return {
    ...initialResponse,
    data,
  }
}

export const PORT = 3000

export const SUPPORT_METHODS = ['get', 'post', 'put', 'delete', 'head']

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

// get mocks recursively
export const getMocks = async (dir = path.resolve(__dirname, '../services')) => {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const res = path.resolve(dir, entry.name)
      return entry.isDirectory() ? getMocks(res) : import(res)
    }),
  )
  return files.flat()
}

export const buildRouter = async (router) => {
  const mocks = (await getMocks()) as IMockData[]
  mocks.forEach((mock) => {
    const { type, url, response, apiPrefix = true } = mock.default as IMockData
    if (SUPPORT_METHODS.includes(type) && url) {
      console.log(`Mocked ${type.toUpperCase()} ${apiPrefix ? '/api' : ''}${url}`)
      router[type](apiPrefix ? `/api${url}` : url, async (ctx: Context) => {
        // 获取1～3之间的随机数
        const random = Math.floor(Math.random() * 3) + 1
        await new Promise((resolve) => setTimeout(resolve, random * 1000))
        ctx.body = Mock.mock(typeof response === 'function' ? response(ctx) : response)
      })
    }
  })
  return router
}
