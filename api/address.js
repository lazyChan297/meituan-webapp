import Api from '../common/api.js';
export default class Address extends Api {
  // 获取地址列表
  list(uid) {
    return this.get('addressList', uid)
  }
  // 添加地址
  add(obj){
    return this.post('addAddr',{
      addr:obj.addr,
      name:obj.name,
      phone:obj.phone,
      gender:obj.gender,
      uid:obj.uid
    })
  }
  // 修改地址
  update(obj){
    return this.post('updateAddr',{
      addr: obj.addr,
      name: obj.name,
      phone: obj.phone,
      gender: obj.gender,
      id: obj.id
    })
  }
} 