/**
 * New node file
 */
var js2xmlparser = require("js2xmlparser");
var J2xParser = require("../j2x-parser.js");
var j2xParser = new J2xParser();
module.exports = {
 test1: function(test){
   console.log("simple data");
   test.expect(1);
   var simple = {
       "name":"some name",
       "age": 20
   };
   var s1 = js2xmlparser("user",simple);
   //console.log(s1);
   var s2 = j2xParser.parse(simple,{root:"user"});
   //console.log(s2);
   test.equal(s1,s2);
   test.done();
 },
 test2: function(test){
   test.expect(1);
   var array = {
       "array":[
          {
            "name":"some name",
            "age": 20
           },
           {
             "name":"other name",
             "age": 10
            },
        ]
   };
   test.equal(js2xmlparser("users",array),j2xParser.parse(array,{root:"users"}));
   test.done();
 },
 test3: function(test){
   var arrayString = {
       "array":["test","something","here"]
   };
   test.equal(js2xmlparser("string",arrayString),j2xParser.parse(arrayString,{root:"string"}));
   test.done();
 },
 test4: function(test){
   var arrayString = {
       "array":["test","something","here"]
   };
   test.equal(js2xmlparser("root",arrayString),j2xParser.parse(arrayString));
   test.done();
 }
};