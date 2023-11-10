  /**
   * @File-name : Sentiment.js
   * @author : Gunaseelan.T
   * @File-Description : Aspect-based sentiment analysis using IBM Watson API.
   **/
  var watson = require('watson-developer-cloud');
  var jsonfile = require('jsonfile');
  var sleep = require('async-sleep');
  var path = require('path');
  
  var alchemy_language = watson.alchemy_language({
      api_key: 'api_key'
  })
  
  var file = "File path";
  
  var wfile = "File path";
  
  function index() {
      jsonfile.readFile(file, function(err, obj) {
  
          var results = [];
          var errorResults = [];
          var hasError = false;
          var count = 0;
          function completedCallback(status){
              count ++;
              console.log('Completed statements count:', count);
              if(count == obj.length){
                  console.log('Analysis completed.');
                  if(hasError){
                      console.log('There is error accoured on following statements', errorResults);
                  }
                  console.log('Completed analysis result:', results)
  
                  jsonfile.writeFile(wfile, results, function (err) {
                      console.error(err);
                  })
              }
              else{
              }
          }
          for (var i = 0, len = obj.length; i < len; i++) {
              
              if(obj[i].reviews && obj[i].reviews != ''){
                  setTimeout(process(obj[i].reviews, results, errorResults, completedCallback),1000*i)
              }
              else{
                  count ++;
              }
          }
      });   
  }
  
  function process(data, results, errorResults, callback) {
      var newArray = [];
      var parameters = {
          text: data
      };
      return function(){
  
          alchemy_language.keywords(parameters, function (err, response) {
              if (err){
                  console.log('key word error:', err, parameters);
                  errorResults.push(parameters);
                  callback(false);
              }else{
  
                  var keyWord = response.keywords;
  
                  for (var i = 0, len = keyWord.length; i < len; i++) {
                      newArray.push(keyWord[i].text);
                  }
  
                  var parameter = {
                      text: data,
                      targets: newArray
                  };
  
                  alchemy_language.sentiment(parameter, function (err, response) {
                      if (err){
                          console.log('sentiment error:', err, parameter);
                          errorResults.push(parameters)
                          callback(false);
                      }else{
                          results.push(response.results);
                          callback(true);
                      }
                  });
              }
          });
      }
  }
  
  // call the first chunk of code right away
  index();