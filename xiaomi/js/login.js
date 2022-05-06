class Login{
   constructor(){
    this.$('.login_submit').addEventListener('click',this.clickFn.bind(this))
   }
   clickFn(eve){
      console.log(location.search)
       eve.preventDefault()
       let forms=document.forms[0].elements;
    //    console.log(forms)
       let username=forms[0].value;
       let password=forms[1].value
    //    console.log(username,password)
       if(!username.trim()||!password.trim()) throw new Error('not can null')
       axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
       let data=`username=${username}&password=${password}`
       axios.post('http://localhost:8888/users/login', data).then(res=>{
         //   console.log(data)
           let{status,data}=res;
           console.log(data)
           if(status==200){
              if(data.code==1){
               localStorage.setItem('token',data.token);
               localStorage.setItem('user_id',data.user.id);
               location.assign(location.search.split('=')[1])
              }else{
               layer.open({
                  title: '登录提醒'
                  ,content: '用户名或密码错误'
                });
              }
              
           }
    })
}  
      
   $(tag){
    let res=document.querySelectorAll(tag)
    return res.length==1?res[0]:res
}  
}
new Login