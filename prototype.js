String.prototype.parser = function() {
return JSON.parse( this.replace(/(.*):(.*):(.*)/, '{"action":"$1","data":"$2","city":"$3"}'));
}


Object.prototype.chekuser = function(){
  return !this.length;
}


Object.prototype.userID = function() {
 return this.message.from.id
}

Date.prototype.monthDay = function(initDay){
   return {month: this.getMonth()+1 ,day: this.getDate() + initDay}
}