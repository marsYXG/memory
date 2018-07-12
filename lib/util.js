var md5 = require('md5');

var util = {
	httpRequest : function (url,method,data,callback){
		var that = this;
		var data = that.signature(data);
		$.ajax({
            url : url,
            type : method,
            data : data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            success : callback
        })
	},
    /** 同步ajax **/
    ajaxSyncFn: function (url,method,data,callback) {
        var that = this;
        var data = that.signature(data);
        $.ajax({
            async: false,
            url : url,
            type : method,
            data : data,
            traditional: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            success : callback
        })
    },
	/**
	 * [objSortKeys 对象按照键值排序]
	 * @param  {[type]} obj [需要排序的对象]
	 * @return {[type]}     
	 */
	objSortKeys : function (obj){
        var arr = [];
        for(var i in obj){
            arr.push(i)
        }
        arr = arr.sort();
        var newObj = {};
        for(var i = 0 ; i < arr.length;i ++){
            newObj[arr[i]] = obj[arr[i]]
        }
        return newObj;
	},
  /**
     * 验证手机号是否合法
     * @param  {[type]} phone [description]
     * @return {[type]}       [description]
     */
    verifyPhone : function ( phone ) {
        var reg = /^[0-9]{11}$/;
        if(reg.test(phone)){
            return true;
        }else{
            alert("手机号格式不正确");
            return false;
        }
    },
	/**
	 * [signature 签名]
	 * @param  {[type]} obj [需要签名的对象]
	 * @return {[type]}     
	 */
	signature : function (obj){
		var data = this.objSortKeys(obj);
        var Signature = "sign:";
        for(var i in data){
            if (!data[i] && data[i] != 0) {
                data[i] = "";
            }
            Signature += i + data[i];
        }
        data.Signature  = md5(Signature);
        return data;
	},
	/**
	 * [getParam 获取URL参数]
	 * @param  {[type]} name [参数名字]
	 * @return {[type]}      
	 */
	getParam : function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },
    /**
     * 获取Token
     * @returns {*|null|string}
     */
    getToken : function () {
        var that = this;
        var token = (window.lotusRoot ? window.lotusRoot.getToken() : "") || (that.getParam("Token") !== "(null)" ? that.getParam("Token") : "" );
        return token;

    },

    /**
     * 判断是否是Android
     * @returns {boolean}  true是Android
     */
    isAndroid : function () {
        var isApp = window.lotusRoot ?  window.lotusRoot.isApp() : "";
        if(isApp) {
            return true;
        }else{
            return false;
        }
    },
    /**
     * 跳转到APP
     * @param redirectURL   跳转的链接
     * @param clsName       a链接的dom节点
     */
    jumpApp : function (redirectURL,clsName) {
        if (this.isAndroid()){      //如果是Android就走location.href否则走a链接
            window.location.href = redirectURL;
        }else{
            clsName.attr("href",redirectURL);
            clsName.trigger("click");
        }
    },
    /**
     * 遮罩层事件
     * @param clsName  需要弹出的容器
     * @param flag     true时点击遮罩层隐藏,false一直显示,默认为false
     * @returns {boolean}
     */
    mask : function (clsName,flag) {
        var mask = $(".mask")
        mask.css("display","block");
        clsName.css("display","block");
        if(flag) {
            mask.on("click",function () {
                mask.css("display","none");
                clsName.css("display","none");
            });
            return false;
        }
    },
    /**
     * 设置cookie
     * @param name        cookie名字
     * @param value       cookie值
     * @param Hours       cookie时间
     */
    setCookie : function(name, value, Hours) {
        var d = new Date();
        var offset = 8;
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        var nd = utc + (3600000 * offset);
        var exp = new Date(nd);
        exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString() + ";"
    },
    /**
     * 获取cookie
     * @param name        cookie名字
     * @returns {arr}  
     */
    getCookie : function(name) {
      var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
      if (arr != null) return unescape(arr[2]);
      return null;
    },
    isWX : function(){
      var ua = navigator.userAgent.toLowerCase();  
      if(ua.match(/MicroMessenger/i)=="micromessenger") {  
          return true;  
      } else {  
          return false;  
      } 
    }
};


module.exports = util;