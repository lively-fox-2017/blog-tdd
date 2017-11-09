module.exports =  function lzero(str,addStr,countStr){
   var output='',panjang=str.toString().length;
  //  console.log(str+' '+addStr+' panjang baru='+countStr)
   if (panjang===countStr) {return str;}
   else {
     while (panjang<countStr){output+=addStr;panjang++}
   }
   return output+str;
}
