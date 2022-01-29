Array.prototype.gener = function({action,page}) {
    let newArray = new Array(), genarray = new Array();
      for (let i = 0; i < this.length; i++) {
        genarray.push({ text: `${this[i].name}`, callback_data: `${action}:${this[i].value}:${this[i].name}`, hide: false })
          if(genarray.length == page){
          newArray.push(genarray);
          genarray= []
        } }
        return newArray;
}

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