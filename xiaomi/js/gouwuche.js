class Cart {
    constructor() {
        this.checkLogin()
        this.getCartGoods()
        this.bindEve()
    }
    bindEve() {
        this.$('.content2').addEventListener('click', this.distributEve.bind(this))
        this.$('.sub_top input').addEventListener('click', this.clickAllchecked.bind(this))
    }
    checkLogin() {
        const TOKEN = localStorage.getItem('token');
        if (!TOKEN) {
            location.assign('../xiaomi/login.html?ReturnUrl=./gouwuche.html')
        }
    }
    async getCartGoods() {
        const TOKEN = localStorage.getItem('token');
        let userId = localStorage.getItem('user_id')
        axios.defaults.headers.common['authorization'] = TOKEN;
        let { data, status } = await axios.get('http://localhost:8888/cart/list?id=' + userId);
        if (status == 200) {
            if (data.code == 1) {
                let html = '';
                data.cart.forEach(goods => {
                    html += `
                  <div class="content2 center   shangpin" data-id=${goods.goods_id}>
					<div class="sub_content fl ">
						<input type="checkbox" value="quanxuan" class="danxuan" />
					</div>
					<div class="sub_content fl"><img src="${goods.img_small_logo}"  style="width:100%"></div>
					<div class="sub_content fl ft20" ><p style='line-height:20px '>${goods.title}</p></div>
					<div class="sub_content fl price">${goods.current_price}</div>
					<div class="sub_content fl">
						<input class="shuliang" type="number" value="${goods.cart_number}" step="1" min="1" >
					</div>
					<div class="sub_content fl totalPrice">${goods.current_price * goods.cart_number}</div>
					<div class="sub_content fl del"><a href="#" style="font-size:16px">删除</a></div>
					<div class="clear"></div>
				</div>
                  `
                });
                this.$('.content2').innerHTML += html
            }
        }
    }
    distributEve({ target }) {
        // console.log(target)
        if (target.parentNode.classList.contains('del')) {
            // console.log(target)
            this.delGoods(target);
         

        }
        if(target.classList.contains('danxuan')){
            this.getOneGoodsCheck(target)
            this.getNumPriceGoods()
        }

    }
    delGoods(target){
        let that=this;
        let layerIndex = layer.confirm("主人确定要抛弃我吗", {
            title: '删除提示'
        }, function () {
            let divObj = target.parentNode.parentNode;
            let goodsId = divObj.dataset.id;
            let userId = localStorage.getItem('user_id')
            axios.get('http://localhost:8888/cart/remove?id=' + userId + '&goodsId=' + goodsId)
                .then(res => {
                    let { data, status } = res;
                    console.log(data, status)
                    if (data.code == 1) {
                        layer.close(layerIndex)
                        layer.msg("商品删除成功")
                        divObj.remove()
                        that.getNumPriceGoods()
                    }
                }

                )
        })
    }
    getNumPriceGoods(){
        let goods=this.$('.shangpin');
        let totalNum=0;
        let totalPrice=0;
        goods.forEach(one=>{
            if(one.firstElementChild.firstElementChild.checked){
            // console.log(one)
            
            // console.log(one.querySelector('.shuliang').value-0+totalNum)
            totalNum=one.querySelector('.shuliang').value-0+totalNum;
            // console.log(one.querySelector('.totalPrice').innerHTML);
            totalPrice=one.querySelector('.totalPrice').innerHTML-0+totalPrice;
            }
        })
       this.$('.jiesuanjiage span' ).innerHTML= totalPrice;
       this.$('.tishi span').innerHTML=totalNum
    }
  getOneGoodsCheck(target){
      if(!target.checked){
        this.$('.sub_top input').checked=false;
        return
      }
      if(target.checked){
          let res=Array.from(this.$('.danxuan')).find(checkbox=>{
              return !checkbox.checked
          })
          if(!res)this.$('.sub_top input').checked=true
      }
  }
    clickAllchecked(eve) {
        let checked=eve.target.checked
        // console.log(checked)
        this.oneGoodsChecked(checked)
        this.getNumPriceGoods()
    }
    oneGoodsChecked(checkStatus){
      let goodsList=this.$('.shangpin ')
    //   console.log(goodsList,checkStatus)
    goodsList.forEach(ele=>{
        ele.firstElementChild.firstElementChild.checked=checkStatus
    })
   
    }
    $(tag) {
        let res = document.querySelectorAll(tag)
        return res.length == 1 ? res[0] : res
    }
    

}
new Cart