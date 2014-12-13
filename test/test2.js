/**
 * New node file
 */
var extend = require("../lib/extend.js");
module.exports = {
 test1: function(test){
   test.expect(2);
   var simple = {
       "name":"some name",
       "age": 20
   };
   var out = extend({},simple,{name:"other"});
   test.deepEqual(out,{name:"other",age:20});
   test.equal(simple.name,"some name");
   test.done();
 },
 test2: function(test){
    test.expect(2);
    var simple = {
        "name":"some name",
        "age": 20
    };
    var out = extend(simple,{name:"other"});
    test.deepEqual(out,{name:"other",age:20});
    test.deepEqual(out,simple);
    test.done();
  },
  test3: function(test){
    test.expect(2);
    var simple = {
        "name":"some name",
        "age": 20
    };
    var out = extend(simple,null);
    test.deepEqual(out,{name:"some name",age:20});
    test.deepEqual(out,simple);
    test.done();
  },
  test4: function(test){
    test.expect(2);
    var simple = {
        "name":"some name",
        "age": 20
    };
    var out = extend(simple);
    test.deepEqual(out,{name:"some name",age:20});
    test.deepEqual(out,simple);
    test.done();
  },
  test5: function(test){
    test.expect(1);
    var options = {
        format:{
          indent: "\t",
          ending: "\n"
        },
        dateFormat: ""
    };
    var out = extend(true, options, {format:{indent: "  "}});
    test.deepEqual(out.format, {indent: "  ", ending: "\n"});
    test.done();
  }
 };