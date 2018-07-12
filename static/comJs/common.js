//自适应
function Base(){
    this.width = 750;
    this.fontSize = 100;
    this.renderDOM();
}

Base.prototype.renderDOM = function(){
    var _self = this;
    _self.width = this.width;//设置默认最大宽度
    _self.fontSize = this.fontSize;//默认字体大小
    _self.widthProportion = function(){var p = (document.body&&document.body.clientWidth||document.getElementsByTagName("html")[0].offsetWidth)/_self.width;
        return p;
    };
    _self.changePage = function(){
        document.getElementsByTagName("html")[0].setAttribute("style","font-size:"+_self.widthProportion()*_self.fontSize+"px !important");
    }
    _self.changePage();
    window.addEventListener('resize',function(){_self.changePage();},false);
};

var a = new Base();
a.renderDOM();