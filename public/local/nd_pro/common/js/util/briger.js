/*
 * McDispatchr({
 *  'type': 'token',
 *  'param': 'token string~'
 * })
*/

window.McDispatchr = function(obj) {
  var _type = obj.type;
  var _param = obj.param;
  var _actions = actions[obj.type];
  for(var i=0; i<_actions.length; i++) {
    _actions[i](_param)
  }
}

var actions = {
  // token: [callback],
  // ...
}

var Briger = function(type, callback) {
  if(!actions[type]) {
    actions[type] = [];
  }
  actions[type].push(callback)
}

module.exports = Briger;