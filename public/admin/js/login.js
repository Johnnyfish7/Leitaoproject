$(function () {
    var $form = $("form");
    //在调用了bootstrapValidator方法初始化了表单校验之后，
    //可以通过$form.data('bootstrapValidate')可以得到一个插件对象，
    //通过对象可以调用插件给我们提供的方法
    $form.bootstrapValidator({
      //配置校验的小图标
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
  
      //配置的参数
      //配置校验规则,需要校验的字段,对应表单中的name属性
      fields: {
        username:{
          //配置username所有的校验规则
          validators: {
            //非空校验
            notEmpty: {
              message: "用户名不能为空"
            },
            callback: {
              message:"用户名不存在"
            }
          }
        },
        password:{
          validators:{
            notEmpty: {
              message:"密码不能为空"
            },
            stringLength: {
              min:6,
              max:12,
              message:"密码长度在6-12位"
            },
            callback: {
              message: "密码错误"
            }
          }
        }
      }
    });
    $form.on("success.form.bv", function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: "/employee/employeeLogin",
            data: $('form').serialize(),
            success: function (data) {
                if(data.success){
                    location.href="index.html";
                }
                if(data.error==1000){
                    $form.data("bootstrapValidator").updateStatus("username","INVALID","callback");
                }
                if(data.error==1001){
                    $form.data("bootstrapValidator").updateStatus("password","INVALID","callback");
                }
            },
           
        })
    });


    // 重置样式
    $("[type='reset']").on("click",function(){
      $form.data("bootstrapValidator").resetForm();

    });


})















