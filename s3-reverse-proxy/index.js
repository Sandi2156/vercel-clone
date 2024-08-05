const express = require("express")
const httpProxy = require("http-proxy")

const app = express()
const PORT = 8000

const proxy = httpProxy.createProxy()

app.use((req, res) => {
    const hostName = req.hostname
    const subdomain = hostName.split(".")[0]

    const resolvesTo = `https://versel-clone-sss-bucket.s3.ap-south-1.amazonaws.com/outputs/${subdomain}`

    return proxy.web(req, res, {target: resolvesTo, changeOrigin: true})
})

proxy.on("proxyReq", (proxyReq, req, res) => {
    const url = req.url

    if(url === '/')
        proxyReq.path += "index.html"
})

app.listen(PORT, () => console.log(`Proxy is listening on port ${PORT}`))