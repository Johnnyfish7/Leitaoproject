$(function(){
    $(".icon_menu").on("click",function(){
        // console.log(11);
       
          $(".aside").toggleClass("now");
          $(".main").toggleClass("now");
       
       
        
      });
    
      $('.icon_loginout').on("click",function(){
        console.log(11);
    
    
        $('#myModal').modal({
          show: true
        })
        
      })
    
    
    
    
      $('.btn_quit').on("click",function(){
        $.ajax({
          type:'get',
          url:'/employee/employeeLogout',
          success:function(data){
            if(data.success){
              location.href = "login.html";
            }
          }
          
        })
      });
    
    
      // 分类管理二级标题 下拉菜单 
    
      $('.mycategory').on("click",function(){
        // console.log(111);
        // console.log( $('.child'));
        $('.child').slideToggle();
      })
    
})