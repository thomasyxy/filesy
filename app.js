"use strict"
const koa = require('koa')
const convert = require('koa-convert')
const app = new koa()
const Jade = require('koa-jade')
const staticCache = require('koa-static-cache')
const webpack = require('webpack')
const router = require('./config/routes')
const webpackConfig = require('./webpack.config')
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require('koa-webpack-hot-middleware')

const port = 7010

//静态资源文件
app.use(convert(staticCache('./static', {
  maxAge: 0
})))

const jade = new Jade({
  viewPath: __dirname + "/views",
  debug: true,
  pretty: true,
  compileDebug: false,
  locals: {
    staticPath: '/static'
  },
  app: app
})

//路由
app.use(router.routes())

app.use(async (ctx, next) => {
  await next()
  if (404 !== ctx.status) return
  ctx.status = 404
  ctx.body = {
    msg: 'not found'
  }
})

// const spinner = ora('building...')
// spinner.start()

function webpackBuild() {
  const compiler = webpack(webpackConfig)

  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  })

  const hotMiddleware = webpackHotMiddleware(compiler)

  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
      hotMiddleware.publish({ action: 'reload' })
      cb()
    })
  })

  app.use(convert(devMiddleware))

  app.use(convert(hotMiddleware))
}

webpackBuild()

app.listen(port, (err) => {
	if(err){
		console.log(err)
		return false
	}
	console.log(`> listen at: http://127.0.0.1:${port}`)
})
