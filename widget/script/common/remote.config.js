//const BASE_URL = "http://doclever.cn:；8080/mock/597f470ce550c4121bbe101e"


(function(window) {
//       var host = 'http://47.93.238.45/'  //release
//var host = 'http://dev.znphjf.com/'
//var host = 'http://172.16.36.126:8080/'  //小强
var host = 'http://172.16.36.119:8080/'  //富川

    var basePath = '/app'

    var debug = true; // 打印错误信息，false不打印

    var url = function(path) {
        var u = host + basePath + path
        if (debug){
          console.log(u);
        }
        return u
    }
    window.remote = {
        url: url,
        debug: function(){
          return debug;
        },
        debugUserId: function(){
          return 1888
        }
    }
})(window)
