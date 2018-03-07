var pds = (typeof this.pds === 'undefined') ? {} : this.pds;
(function ($) {

	var uriConfig = {
	  //  dev:"http://172.16.36.98:8080/",
		dev:'http://192.168.10.159:8080/',//小强
			//dev:'http://39.106.46.30:8081/',//富川
		//	dev:'http://172.16.36.119:8080/',//富川
		// dev:"http://172.16.36.132:8080/",
		// uat:"http://60.205.185.177/",
		uat:"http://dev.znphjf.com/",
		release:"http://47.93.238.45/",
		show:"http://ys.znphjf.com/",
		app:"http://121.42.230.107:8089/",
		ph:"http://ph.znphjf.com/"
	}
	/**
	 * 获取服务器端uri
	 */
	var remoteUri = function(env){
		var uri = "";
		switch(env){
			case "dev":
				uri = uriConfig.dev;
				break;
			case "uat":
				uri = uriConfig.uat;
				break;
			case "release":
				uri = uriConfig.release;
				break;
			case "show":
				uri = uriConfig.show;
				break;
			case "app":
				uri = uriConfig.app;
				break;
				case "ph":
					uri = uriConfig.ph;
					break;
			default:
				uri = uriConfig.dev;
		}
		return uri;
	}


	var defaultUri = remoteUri("uat")


	/**release
	 * ajax提交
	 * @param {Object} option
	 * @param {Object} env
     */
	var ajaxSubmit = function(option,callback) {
		// 默认配置项
		var _default = {
			// ajax设置
			url : "",
			type : "POST",
			dataType:"json",
			data : null,//传输数据，
			fileData:null,
			//timeout : 3,
			success : null,
			error : null
		};

		// 客户化配置
		var _custom = $.extend({}, _default, option);


		var paramData = {};
		if(_custom.fileData){
			paramData["files"] = _custom.fileData;
		}
		if(_custom.data){
			paramData["values"] = _custom.data;
		}
		api.showProgress({
		    title: '努力加载中...',
		    text: '先喝杯茶...',
		    modal: true
		});
		var headers = {
	    authorization: $api.getStorage('userId'),
	    mobile: 'true'
	  };
		api.ajax({
		    url: defaultUri + _custom.url,
		    method: _custom.type,
		    data: paramData,
				headers: headers,
        timeout:60
		},function(ret, err){
			api.hideProgress();

			console.log("ret:"+JSON.stringify(ret));
			console.log("err:"+JSON.stringify(err));
		    if (ret) {
					// 登录失效
					if(ret.status == 'deny'){
						if($api.getStorage("denyNum") == "undefined" || $api.getStorage("denyNum") != 1){
								api.alert({msg:ret.message});
								$api.setStorage("denyNum",1);
						}
						api.closeToWin({
								name: 'login_new'
						});
						return;
					}
		    	if (ret.status == 'ok' || ret.data) {
		    	  _custom.success(ret);
		    	  }
		    	else {
		    	  api.alert({msg:ret.message})
		    	}
		    } else {
//		          _custom.error(err);
		    	//code:0,                    //错误码，数字类型。（0：连接错误、1：超时、2：授权错误、3：数据类型错误）
		    	switch(err.code){
					case 0 :
						if(err.statusCode==500){
							api.alert({msg:"服务器异常，请联系管理员!"});
						}else{
						 	api.alert({msg:"服务器无法连接，请稍后重试!"});
						}
						 break;
					case 1 :
						 api.alert({msg:"服务器连接超时，请稍后重试!"});
						 break;
					case 2 :
						 api.alert({msg:"登录失效,请重新登录!"});
						 break;
					case 3 :
						 api.alert({msg:"服务器异常，请联系管理员!"});
						 break;
					case 404 :
						 api.alert({msg:"服务器连接失败，请联系管理员!"});
						 break;
					case 500 :
						 api.alert({msg:"服务器异常，请联系管理员!"});
						 break;
				 }

		    }
		});
	};
	var buriedPoint = function(){
		var device = {}
		device.deviceId = api.deviceId; //设备唯一标识，字符串类型
		device.platform  = api.systemType; //手机操作系统（平台来源ios/android）
		device.edition  = api.appVersion; //app版本号
		device.network  = api.connectionType; //手机所处网络类型（wifi，2G,3G,4G）
		device.deviceModel = api.deviceModel; //设备型号，字符串类型
		device.deviceName = api.deviceName; //设备名称，字符串类型
		device.resPower = api.winWidth+'*'+api.winHeight; //分辨率
		device.terminal  = 'App';
		device.product = 'boss';
		return device
	}
	$.extend(pds,{
    	"ajaxSubmit":ajaxSubmit,
			"buriedPoint":buriedPoint,
    	"defaultUri":defaultUri
	});
})(jQuery)
//})(Zepto)
