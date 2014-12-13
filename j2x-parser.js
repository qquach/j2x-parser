/**
 * New node file
 */
/**
 * options include
 */
var extend = require("./lib/extend.js");
var defaultOptions = {
    format:{
      indent: "\t",
      ending: "\n"
    },
    root: "root",
    declaration: {
      version:"1.0",
      encoding:"UTF-8"
    },
    dateFormat: ""
};

var j2xParser = function(options){
  this.options = extend(true,{},defaultOptions,options);
};

j2xParser.prototype.parse = function(obj,opts){
  var options = extend({},this.options,opts);
  var out = getDeclaration(options);
  out += toXml(obj, options, options.root, 0);
  return out;
};

/**
 * This is the main function for converting object to xml
 * @param obj
 * @param options
 * @returns {String}
 */
function toXml(obj, options, tag, level){
  var out = "";
  if(!obj) return out;
  var indent = getIndent(level, options.format.indent);
  if(isDate(obj)){
    out += openTag(tag, indent, "");
    out += formatDate(obj, options.dateFormat);
    out += closeTag(tag,"", options.format.ending);
  }
  else if(isArray(obj)){
    for(var i = 0; i<obj.length; i++){
      out += toXml(obj[i], options, tag, level);
    }
  }
  else if(typeof(obj)=="object"){
    out += openTag(tag, indent, options.format.ending);
    for(var i in obj){
      out += toXml(obj[i], options, i, level+1);
    }
    var ending = (level==0) ? "" : options.format.ending;
    out += closeTag(tag, indent, ending);
  }
  else{
    //leaf node
    out += openTag(tag, indent, "");
    out += obj.toString();
    out += closeTag(tag,"", options.format.ending);
  }
  return out;
}

//=================================
function getDeclaration(options){
  if(!options.declaration) return "";
  var out = "<?xml";
  if(options.declaration.version){
    out += " version=\"" + options.declaration.version + "\"";
  }
  if(options.declaration.encoding){
    out += " encoding=\"" + options.declaration.encoding + "\"";
  }
  out += "?>";
  var ending = (options.format && options.format.ending) ? options.format.ending : "";
  out += ending;
  return out;
}
function isDate(obj){
  return Object.prototype.toString.call(obj) === '[object Date]';
}

function isArray(obj){
  return Object.prototype.toString.call(obj) === '[object Array]';
}


function formatDate(date, dateFormat){
  switch (dateFormat){
  case "gmt":
    return date.toGMTString();
  case "iso":
    return date.toISOString();
  case "locale":
    return date.toLocaleString();
  case "utc":
    return date.toUTCString();
  case "":
    return date.toString();
  default:
    return customFormat(date, dateFormat);
  }
}

function customDateFormat(date, dateFormat){
  return dateFormat.replace("yyyy",date.getFullYear())
  .replace("yy",date.getFullYear().toString().slice(-2))
  .replace("MM",("0" + (date.getMonth()+1)).slice(-2))
  .replace("dd",("0" + date.getDate()).slice(-2))
  .replace("HH",("0" + date.getHours()).slice(-2))
  .replace("mm",("0" + date.getMinutes()).slice(-2))
  .replace("ss",("0" + date.getSesonds()).slice(-2))
  .replace("zz",("0" + date.getMilliseconds()).slice(-2));
}

function getIndent(level, char){
  if(char==="") return;
  var out = "";
  for(var i = 0; i<level; i++){
    out += char;
  }
  return out;
}

function openTag(tag, indent, ending){
  return indent + "<" + tag + ">" + ending;
}

function closeTag(tag, indent, ending){
  return indent + "</" + tag + ">" + ending;
}
//=================================
module.exports = j2xParser;