import Api from '../common/api.js';
export default class Index extends Api {
  // 获取店铺列表
  list(){
    return this.get('storeList',{})
  }
  // 条件排序
  listBy(c){
    return this.get('storeListBy',c)
  }
} 