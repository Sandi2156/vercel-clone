const express = require("express");
const httpProxy = require("http-proxy");

const app = express();
const PORT = process.env.PORT || 8000;

const proxy = httpProxy.createProxy();

app.use((req, res) => {
  const hostName = req.hostname;
  const subdomain = hostName.split(".")[0];

  const resolvesTo = `https://versel-clone-sss-bucket.s3.ap-south-1.amazonaws.com/outputs/${subdomain}`;

  console.log(`Proxying request for subdomain: ${subdomain}`);
  console.log(`Target URL: ${resolvesTo}`);

  return proxy.web(
    req,
    res,
    { target: resolvesTo, changeOrigin: true },
    (err) => {
      if (err) {
        console.error("Proxy error:", err);
        res.status(500).send("Proxy error");
      }
    }
  );
});

proxy.on("proxyReq", (proxyReq, req, res) => {
  const url = req.url;

  if (url === "/") proxyReq.path += "index.html";

  console.log(`Modified request path: ${proxyReq.path}`);
});

proxy.on("error", (err, req, res) => {
  console.error("Proxy error event:", err);
  res.status(500).send("Proxy encountered an error");
});

app.listen(PORT, () => console.log(`Proxy is listening on port ${PORT}`));
