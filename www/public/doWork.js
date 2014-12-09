postMessage("I\'m working before postMessage(\'ali\').");

onmessage = function (oEvent) {
  postMessage("Hi " + oEvent.data);
  setTimeout(function() { 
  	postMessage("alertSomething for seconds"); 
  }, 3000);
};