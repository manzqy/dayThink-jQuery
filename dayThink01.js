(function(window, undefined) {
  window.$ = window.jTools = jTools;
  function jTools(selector) {
    return new Init(selector);
  }
  /**
   * jTools选择器
   * @param { string } selector css选择器
   * @return 伪数组
   */
  function Init(selector) {
    selector = typeof selector == "string" ? selector.trim() : selector;
    let dom = document.querySelectorAll(selector);
    [].slice.call(dom);
    [].push.apply(this, dom);
    return this;
  }
  /**
   * 遍历伪数组
   * @param { function } callback 回调函数
   */
  Init.prototype.each = function(callback) {
    [].forEach.call(this, function(e, i) {
      callback(i, e);
    });
  };
  /**
   * 注册事件
   * @param { string } type 事件处理类型
   * @param { function } callback 事件处理函数
   * @return 伪数组
   */
  Init.prototype.on = function(type, callback) {
    this.each(function(i, e) {
      e.addEventListener(type, callback);
    });
    return this;
  };
  /**
   * css修改样式
   * @param { string || object } key css属性名或者是对象
   * @param { string } value css属性值有设置属性，为空获取属性
   * @return 伪数组
   */
  Init.prototype.css = function(key, value) {
    k = typeof key == "string" ? key : 0;
    if (typeof key == "object") {
      for (var prop in key) {
        k = prop;
        value = key[prop];
      }
    }
    if (value == undefined) {
      let event = window.getComputedStyle(this[0])[k];
      console.log(event);
      return event;
    } else {
      this.each(function(i, e) {
        e.style[k] = value;
      });
      return this;
    }
  };
  /**
   * 添加类名
   * @param { string } name 类名
   * @return 伪数组
   */
  Init.prototype.addClass = function(name) {
    this.each(function(i, e) {
      e.classList.add(name);
    });
    return this;
  };
  /**
   * 删除类名
   * @param { string } name 类名
   * @return 伪数组
   */
  Init.prototype.removeClass = function(name) {
    this.each(function(i, e) {
      e.classList.remove(name);
    });
    return this;
  };
  /**
   * 切换类名
   * @param { string } name 类名
   * @return 伪数组
   */
  Init.prototype.toggleClass = function(name) {
    this.each(function(i, e) {
      e.classList.toggle(name);
    });
    return this;
  };
  /**
   * 设置或者获取属性
   * @param { string } key css开关属性名
   * @param { boolean } value true/false
   */
  Init.prototype.prop = function(key, value) {
    if (value == undefined) {
      console.log(this[0][key]);
      return this[0][key];
    } else {
      this.each(function(i, e) {
        e[key] = value;
      });
      return this;
    }
  };
  /**
   * 修改标签的属性
   * @param { string } key 标签属性名
   * @param { string } value 标签属性值
   */
  Init.prototype.attr = function(key, value) {
    key = key.trim();
    var reg = /^data-/;
    var flag = reg.test(key);
    key = flag ? key.replace(reg, "") : key;
    if (value == undefined) {
      if (flag) {
        console.log(this[0].dataset[key]);
        return this[0].dataset[key];
      } else {
        console.log(this[0].getAttribute(key));
        return this[0].getAttribute(key);
      }
    } else {
      flag && (this[0].dataset[key] = value);
      flag || this[0].setAttribute(key, value);
      return this;
    }
  };
})(window);
