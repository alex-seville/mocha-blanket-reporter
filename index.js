var blanket = require("blanket");

/**
 * Expose `BlanketReporter`.
 */

exports = module.exports =  BlanketReporter;

/**
 * Initialize a new BlanketReporter reporter.
 * @param {Runner} runner
 * @api public
 */

function BlanketReporter(runner) {
  runner.on('end', function(){
    var cov = global._$jscoverage || {};
    if (blanket.options("reporter")){
      blanket.options("reporter").call(this,cov);
    }else{
      console.log(cov);
    }
  });

  runner.on('fail', function(test,err){
    console.log("Tests failed.\n");
    if (err){
      var message = err.message || ''
        , stack = err.stack || message
        , index = stack.indexOf(message) + message.length
        , msg = stack.slice(0, index)
        , actual = err.actual
        , expected = err.expected
        , escape = true;

      
      console.log(msg + stack);
    }
    process.exit(1);
  });
}

