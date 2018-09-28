import Api from '../common/api.js';
export default class Order extends Api {
  // 添加订单
  add(obj){
    return this.post('addOrder',{
      address:obj.address,
      sid:obj.sid,
      sname:obj.sname,
      slogo:obj.slogo,
      uid:obj.uid,
      uname:obj.uname,
      phone:obj.phone,
      price:obj.price,
      listing:obj.listing
    })
  }
}