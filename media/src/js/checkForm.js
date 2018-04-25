var Validator = function(strategys) {
  this.cache = []; // 保存效验规则验证函数
  this.strategys = strategys; // 自定义检验规则
};

Validator.prototype.addRules = function(dom, ruleList) {
  var _this = this;
  this.cache.push(function() {
    for (var k = 0; k < ruleList.length; k++) {
      var item = ruleList[k];
      //str 返回 ['minLength' , '6']
      var str = item.strategy.split(":");
      var strategy = str.shift();

      str.unshift(dom.value); // 把input的value添加进参数列表
      str.push(item.errorMsg); // 把errorMsg添加进参数列表

      // 验证函数
      var msg = _this.strategys[strategy].apply(dom, str);
      // 返回值不为undefined，才退出循环
      if (msg) {
        return msg;
      }
    }
  });
};

Validator.prototype.start = function() {
  for (var i = 0; i < this.cache.length; i++) {
    var msg = this.cache[i](); // 开始效验 并取得效验后的返回信息
    if (msg) {
      return msg;
    }
  }
};

export default Validator;
