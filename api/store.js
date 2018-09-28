import Api from '../common/api.js';
export default class Store extends Api {
  // 获取店铺列表
  list(id) {
    return this.get('productList', id)
  }
} 