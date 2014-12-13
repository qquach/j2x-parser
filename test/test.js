/**
 * New node file
 */
var Parser = require("../j2x-parser.js"),
    j2xParser = new Parser({format:{indent:"  "}});

module.exports = {
 test1: function(test){
   console.log("simple data");
   //test.expect(1);
   var simple = {
       "name":"some name",
       "age": 20
   };
   console.log(j2xParser.parse(simple));
   test.done();
 },
 test2: function(test){
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
   console.log(j2xParser.parse(array));
   test.done();
 },
 test3: function(test){
   var arrayString = {
       "array":["test","something","here"]
   };
   console.log(j2xParser.parse(arrayString));
   test.done();
 },
 test4: function(test){
   var arrayString = {
       "array":[new Date()]
   };
   console.log(j2xParser.parse(arrayString,{dateFormat:"utc"}));
   test.done();
 }
};

