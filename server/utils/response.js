'use strinct'
const getResult = (type,data,msg,code) => {
  var res = {
    type:type,
    data:data,
    message:msg,
    code:code,
  }
  return res;
}

module.exports = {
  getResult
}
