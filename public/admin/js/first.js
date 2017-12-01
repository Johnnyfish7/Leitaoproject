$(function () {
  
    var page = 1;
    var pageSize = 5;
    //发送ajax请求，渲染页面
    var render = function () {
      $.ajax({
        type: "get",
        url: "/category/queryTopCategoryPaging",
        data: {
          page: page,
          pageSize: pageSize
        },
        success: function (data) {
          // console.log(data);
  
          //使用模版引擎渲染到页面
          $("tbody").html(template("first_tpl", data));
  
          //渲染分页
          $("#firstpaginator").bootstrapPaginator({
            bootstrapMajorVersion: 3,
            currentPage: page,
            totalPages: Math.ceil(data.total / data.size),
            onPageClicked: function (a, b, c, p) {
              page = p;
              render();
            }
          });
  
        }
      });
    }
    render();
  
  
    //点击添加分类，显示模态框
    $(".add_category").on("click", function () {
      // console.log(222);
      $("#add_Modal").modal("show");
  
    });
  
  
  
    //表单校验
    var $form = $("form");
    console.log($form);
    $form.bootstrapValidator({
      //小图标
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      //配置校验规则
      fields: {
        categoryName: {
  
          validators: {
            notEmpty: {
              message: "一级分类的名称不能为空"
            }
          }
  
        }
      }
  
  
    });
  
    //注册校验成功事件，阻止默认行为，使用ajax提交
    $form.on("success.form.bv", function (e) {
      e.preventDefault();
  
      //console.log("呵呵");
      $.ajax({
        type: "post",
        url:"/category/addTopCategory",
        data: $form.serialize(),
        success:function(data) {
          // console.log(data);  
          if(data.success){
  
            //关闭模态框
            $("#add_Modal").modal("hide");
            //重新渲染第一页，因为新增的分类在第一页。
            page = 1;
            render();
  
            //需要清空表单的值和样式
            $form.data("bootstrapValidator").resetForm();
            //重置表单的value值
            $form[0].reset();
          }
        }
      });
    });
  
  
  });