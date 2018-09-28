Component({
  properties:{
    num:{
      "type":Number,
      value:0
    },
    price:{
      "type":Number
    },
    prodName:{
      'type':String
    },
    prod:{
      'type':Object
    }
  },
  methods:{
    add(){
      
      this.setData({
        num:this.data.num+1
      })
      this.triggerEvent('countNum', { num: this.data.num, 'type': 'add', price: this.data.price, prodName: this.data.prodName, prod: this.data.prod})
    },
    minus(){
      if(this.data.num>0){
        this.setData({
          num:this.data.num - 1
        })
        this.triggerEvent('countNum', { num: this.data.num, 'type': 'minus', price: this.data.price, prodName: this.data.prodName, prod: this.data.prod})
      }
    }
  }
})