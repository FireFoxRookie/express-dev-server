const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const apiRouter = express.Router();
const fs = require('fs');

// 使用bodyparser中间件进行路径参数的格式化
// bodyParser.urlencoded作用是将url的路径参数转化为对象
app.use(bodyParser.urlencoded({extended: true}));
// bodyParser.json作用是将参数转化为字符串
app.use(bodyParser.json());

function apiRouterFn (port, routePath, filePath) {
  apiRouter.route('/:apiName').all(function (req, res) {
    fs.readFile(filePath, 'utf-8', function (err, data) {
      if (err) throw err;
      let jsonData = JSON.parse(data);
      if (data[req.params.apiName]) {
        res.json(data[req.params.apiName])
      } else {
        console.log('no such api name');
      }
    })
  })
  if (Array.isArray(routePath)) {
    routePath.forEach(function (val, index) {
      app.use(val, apiRouter)
    })
  } else {
    app.use(routePath, apiRouter)
  }
  app.listen(port, function (err) {
    if(err) {
      console.log(err);
      return;
    }
    console.log('Listening at http://localhost:' + port + '\n')
  });
}

module.exports = {
  apiRouterFn: apiRouterFn
}
