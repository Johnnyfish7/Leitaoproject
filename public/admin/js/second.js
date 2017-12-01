$(function(){
  var page=1;
  var pageSize=5;

  function render(){
    $.ajax({
      type :'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function(data){
        console.log(data);
        
        $('tbody').html(template('second_tpl',data));
  
         //渲染分页
         $("#secondPaginator").bootstrapPaginator({
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
  }
    render();


    // 弹出模态框
    $('.add_category').click(function(){
      // console.log(22);
      $('#secondModal').modal('show');
    })
  
    // 点击选择一级分类开始 发送ajax

    $('.dropdown-toggle').click(function(){
      // console.log(22222);
      $.ajax({
        type:'get',
        url:'/category/queryTopCategoryPaging',
        data:{
          page:1,
          pageSize:1000
        },
        success:function(data){
          console.log(data);

          // 渲染下拉框
          
          $('.dropdown-menu').html(template('firstCategory_tpl',data));

        }
      })
    })


    // 下来选中li

    // $('.dropdown-menu li').addeventlistener('click',function(){
    //   console.log(22);
    // })

   
    $('.dropdown-menu').on("click","a",function(){
      // console.log($(this).text());
      $('.dropdown-text').text($(this).text());
      $("[name='categoryId']").val($(this).data('id'));
      // 手动效验成功
      $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");
      
      



    });


    // 文件上传
    // console.log($('#fileupload'));
    $('#fileupload').fileupload({
      dataType:"json",
      done:function(e,data){
        console.log(data);
        $('#logoPic img').attr('src',data.result.picAddr);
        $("[name='brandLogo']").val(data.result.picAddr);
         // 手动效验成功
        $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        
      }
    });



    // 表单效验
    var $form = $("form");
    $form.bootstrapValidator({
      excluded: [],
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields: {
        categoryId:{
          validators:{
            notEmpty:{
              message:"请选择一级分类"
            }
          }
        },
        brandName:{
          validators:{
            notEmpty:{
              message:"请输入品牌的名称"
            }
          }
        },
        brandLogo:{
          validators:{
            notEmpty:{
              message:"请上传一张品牌的图片"
            }
          }
        }
      }
    });

    // 校验成功
    $form.on("success.form.bv",function(e){
      e.preventDefault();

      // ajax发送数据

      $.ajax({
        type:'post',
        url:'/category/addSecondCategory',
        data:$form.serialize(),
        success:function(data){
          
            $('#secondModal').modal('hide');
            page=1;
            render();
            $form.data('bootstrapValidator').resetForm();
            $form[0].reset();
            $("[type='hidden']").val('');

            $(".dropdown-text").text("请选择一级分类");
            $(".img_box img").attr("src", "images/none.png");

          }
        
        
      });
    });



});