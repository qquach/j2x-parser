/**
 * New node file
 */
function isDate(obj){
  return Object.prototype.toString.call(obj) === '[object Date]';
}
function clone(obj){
  if(typeof(obj)!="object") {
    return undefined;
  }
  var out = {};
  for(var i in obj){
    if(isDate(obj[i])){
      out[i] = new Date(obj[i]);
    }
    else if(typeof(obj[i])=="object"){
      out[i] = clone(obj[i]);
    }
    else{
      out[i] = obj[i];
    }
  }
  return out;
}
function extend(){
  var recursive, args;
  if(typeof(arguments[0])=="boolean"){
    recursive = arguments[0];
    args = Array.prototype.slice.call(arguments, 1);
  }
  else{
    recursive = false;
    args = Array.prototype.slice.call(arguments, 0);
  }
  if(args.length==0) return {};
  if(args.length==1) return args[0];

  var out = args.pop();
  for(var i = args.length-1; i>=0; i--){
    if(i==0){
      out = _extend(args[i], out, recursive);
    }
    else{
      out = _extend(clone(args[i]), out, recursive);
    }
  }

  return out;
}
function _extend(obj1, obj2, recursive){
  var out = (typeof(obj1)=="object") ? obj1 : {};
  if(typeof(obj2)!="object") return out;
  for(var i in obj2){
    if(typeof(obj2[i])=="object"){
      if(recursive && typeof(out[i])=="object"){
        out[i] = extend(out[i],obj2[i]);
      }
      else{
        out[i] = clone(obj2[i]);
      }
    }
    else{
      out[i] = obj2[i];
    }

  }
  return out;
}
module.exports = extend;