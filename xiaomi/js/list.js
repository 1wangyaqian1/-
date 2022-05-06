class List{
    constructor(){
      this. getData()
      this.$('.mb10 ').addEventListener('click',this.addCartFn.bind(this))
    }
    async getData(){
        let num=10
        let {status,data}=await axios.get('http://localhost:8888/goods/list?current=3&pagesize='+num)
        //  console.log(data)
        if(status==200){
            let html=''
            data.list.forEach(goods => {
                // console.log(goods)
             html+=`
             <div class="mingxing fl mb20" data-id='${goods.goods_id}' style="border:2px solid #fff;width:230px;cursor:pointer;" onmouseout="this.style.border='2px solid #fff'" onmousemove="this.style.border='2px solid red'">
             <div class="sub_mingxing"><a href="./xiangqing.html" target="_blank"><img src="${goods.img_big_logo}" alt=""></a></div>
             <div class="pinpai"><a href="./xiangqing.html" target="_blank">${goods.category}</a></div>
             <div class="youhui">${goods.title}</div>
             <div class="jiage">${goods.price}</div>
             <a   href="#none" class="gouwuche">立即抢购</a>
             </div>
     `
            });
            this.$('.mb10 ').innerHTML=html
        }

    }
   async addCartFn(eve){
        // console.log(eve.target)
        let token=localStorage.getItem('token')
        if(!token)location.assign('../xiaomi/login.html?ReturnUrl=./liebiao.html')
        // console.log(location.search);
        if(eve.target.classList.contains('gouwuche')){
            let lisObj=eve.target.parentNode;
            let goodsId=lisObj.dataset.id;
            let userId=localStorage.getItem('user_id')
            if(!userId||!goodsId) throw new Error('两个id有问题，请打印。。。')
            axios.defaults.headers.common['authorization'] = token;
            axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            let param=`id=${userId}&goodsId=${goodsId}`
           let {data,status}=await axios.post('http://localhost:8888/cart/add', param)
           if(status==200){
                   if(data.code==1){
                    layer.open({
                        title: '加入购物车成功',
                        btn: ['前往购物车', '留在当前页'],yes: function(index, layero){
                            //按钮【按钮一】的回调
                            location.assign('../xiaomi/gouwuche.html')
                          }
                          ,btn2: function(index, layero){
                            //按钮【按钮二】的回调
                            //return false 开启该代码可禁止点击该按钮关闭
                          }
                          
                         
                      });
                   }
            }              
              
        }
    }
    $(tag){
        let res=document.querySelectorAll(tag)
        return res.length==1?res[0]:res
    }  
}
new List