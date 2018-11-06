
module.exports = function(location){

  var result = {};

  result.buildTargets = [
    ``
  ];


  result.settingLocal = {
    "title": "local",
    "path": "/" 
  };

  result.settingDev = {
    "title": "dev",
    "path": "/" 
  };
  
  result.settingRelease = {
    "title": "release",
    "path": "/"  
  };

  return result;
}