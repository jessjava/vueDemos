'use strict'
require('./check-versions')()

const config = require('../config')
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
    // automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser
    // Define HTTP proxies to your custom API backend
    // https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
        log: false,
        heartbeat: 2000
    })
    // force page reload when html-webpack-plugin template changes
    // currently disabled until this is resolved:
    // https://github.com/jantimon/html-webpack-plugin/issues/680
    // compiler.plugin('compilation', function (compilation) {
    //   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    //     hotMiddleware.publish({ action: 'reload' })
    //     cb()
    //   })
    // })

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// proxy api requests
// Object.keys(proxyTable).forEach(function (context) {
//   let options = proxyTable[context]
//   if (typeof options === 'string') {
//     options = { target: options,changeOrigin:true}
//   }
//   app.use(proxyMiddleware(options.filter || context, options))
// })



// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)


//增加18位渠道号
app.use("/api/channel18/addinfo", (req, res) => {
    console.log(req.query);
    res.send([{
        "result": "success"
    }]);
})

app.use("/api/channel18/info", (req, res) => {
        console.log(req.query);
        res.send([{
            "mst_channel_code": "1",
            "mst_channel_name": "bd",
            "mst_contract_subject": "baidu",
            "create_timel": null,
            "admin_user": "muju",
            "update_time": "2017-11-28",
            "update_user": "muju",
            "remarks": "baidu123",
            "classify": "baidu1",
            "contact": "anyone",
            "phone": "123456789101",
            "address": "beijing",
            "taxpayer_identifier": "111222333444",
            "register_bank": "huaxiabank",
            "bank_account": "61324568798455125"
        }]);
    })
    //游戏
app.use("/api/queryinfo/gameinfo", (req, res) => {
    res.send([
        { id: "120", name: "战舰猎手" },
        { id: "306", name: "战舰大海战" },
        { id: "126", name: "进击吧三国" }
    ]);
})

//公司
app.use("/api/queryinfo/companyinfo", (req, res) => {
    res.send([
        { id: "1", name: "北京自研" },
        { id: "2", name: "代理" }
    ]);
})

//平台 
app.use("/api/queryinfo/platforminfo", (req, res) => {
    res.send([
        { id: "1", name: "ios" },
        { id: "2", name: "安卓" }
    ]);
})

//主渠道
app.use("/api/queryinfo/mstchannelinfo", (req, res) => {
    res.send([
        { id: "A00", name: "ios官方" },
        { id: "A11", name: "googleplay" }
    ]);
})

//语言
app.use("/api/queryinfo/languageinfo", (req, res) => {
    res.send([
        { id: "0", name: "简体中文" },
        { id: "1", name: "英文" }
    ]);
})

//子渠道
app.use("/api/queryinfo/subchannelinfo", (req, res) => {
    res.send([
        { id: "00", name: "子渠道1" },
        { id: "01", name: "子渠道2" }
    ]);
})


//运营方式
app.use("/api/queryinfo/operatewayinfo", (req, res) => {
    res.send([
        { id: "0", name: "联运" },
        { id: "1", name: "独代" }
    ]);
})

//游戏版本
app.use("/api/queryinfo/gameversioninfo", (req, res) => {
    res.send([
        { id: "0", name: "普通" }
    ]);
})

//设备类型
app.use("/api/queryinfo/devicetypeinfo", (req, res) => {
    res.send([
        { id: "0", name: "iphone&ipad" }
    ]);
})

//门标识
app.use("/api/queryinfo/gateinfo", (req, res) => {
    res.send([
        { id: "0", name: "普通" }
    ]);
})

//运营商
app.use("/api/queryinfo/operatorinfo", (req, res) => {
    res.send([
        { id: "0", name: "智能机" }
    ]);
})

//区域
app.use("/api/queryinfo/areainfo", (req, res) => {
        res.send([
            { id: "0", name: "大陆" }
        ]);
    })
    // serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

console.log('> Starting dev server...')
    // devMiddleware.waitUntilValid(() => {
    //     portfinder.getPort((err, port) => {
    //         if (err) {
    //             _reject(err)
    //         }
    //         process.env.PORT = port
    //         var uri = 'http://localhost:' + port
    //         console.log('> Listening at ' + uri + '\n')
    //             // when env is testing, don't need open it
    //         if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    //             opn(uri)
    //         }
    //         server = app.listen(port)
    //         _resolve()
    //     })
    // })
server = app.listen(port)
module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}