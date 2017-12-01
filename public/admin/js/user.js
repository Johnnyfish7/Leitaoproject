$(function () {

  var page = 1;
  var pageSize = 5;


  function render() {
    console.log(2);
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (data) {
        console.log(data);
        // 从后台接收到数据
        $('tbody').html(template("user_tpl", data))

        // 分页功能
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(data.total / data.size),
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        });
      }
    })
  };

  render();


  // 操作栏点击 

  $("tbody").on("click", ".btn", function (){
      $('#activeModal').modal('show');
      var id= $(this).parent().attr('data-id');
     var  isDelete=$(this).hasClass('btn-danger')? 0:1;
    //  console.log(isDelete);
      $('.btn_sure').off().on("click",function(){
        $.ajax({
          type:"post",
          url:"/user/updateUser",
          data:{
            id:id,
            isDelete:isDelete
          },
          success:function(data){
            console.log(data);
            if(data.success){
              $('#activeModal').modal('hide');
              render();
            }
          }
        })
      })
      
    })


  





})