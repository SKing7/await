var request = require('request');

function getData() {
  return new Promise(function (resolve, reject) {
    request('http://m.amap.com/service/geo/getadcode.json?longitude=116.405285&latitude=39.904989', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(body)
      } else {
        reject(error)
      }
    });
  });
}

var waitfor = function (genFun) {
  var gen = genFun();

  starter();

  function starter() {
    var rt;
    try{
      rt = gen.next();
    } catch (e) {
      reject(e);
    }
    next(rt);
  }
  function next(result) {
    if (result.done) {
      result.value;
    } else {
      Promise.resolve(result.value).then(gen.next.bind(gen), gen.throw.bind(gen));
    }
  }
}
waitfor(function *() {
  var data =  yield getData(); 
  console.log(data);
});
