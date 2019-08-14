$(document).ready(function () {
    $('#reboot_services_choice').val(null).trigger('change');
    $('#reboot_services_choice').empty();
    init_tab1();
});

function init_tab1() {
    $('#reboot_services_choice').val(null).trigger('change');
    $('#reboot_services_choice').empty();
    $('#project_select').select2({
        placeholder: '请选择',
        allowClear: true
    });

    $('#owner_select').select2({
        placeholder: '请选择',
        allowClear: true
    });
    $('#first_select').select2({
        placeholder: '请选择',
        allowClear: true
    });
    $('#second_select').select2({
        placeholder: '请选择',
        allowClear: true
    });
    $('#mailgroup_select').select2({
        placeholder: '请选择',
        allowClear: true
    });
}

function init_tab2() {
    $('#reboot_services_choice').val(null).trigger('change');
    $('#reboot_services_choice').empty();
    let url = '/asset/project/publishsheet/list/';
    $.ajax({
        url: url,
        type: "GET",
        beforeSend: function () {
            $("#page_loading").show();
        },
        success: function (result) {
            if (result.length > 0) {
                $("#publish_sheet").html(result);
            }
            $("#page_loading").hide();
        },
        error: function () {
            alert('失败');
            $("#page_loading").hide();
        }
    });
}

$("#projectInfo").click(function () {
    document.getElementById('createTab').style.display = 'none';
    document.getElementById('initTemplate').style.display = 'none';
    document.getElementById('publishResult').style.display = 'none';
    $("#publishSheet").removeClass("active");
    $("#tab-2").removeClass("active");
    $("#createTab").removeClass("active");
    $("#tab-3").removeClass("active");
    $("#projectInfo").addClass("active");
    $("#tab-1").addClass("active");
    $("#doneSheet").removeClass("active");
    $("#tab-4").removeClass("active");
    init_tab1();
    $("#initTemplate").removeClass("active");
    $("#tab-5").removeClass("active");
    $("#approvalLevelList").removeClass("active");
    $("#tab-6").removeClass("active");
    $("#publishResult").removeClass("active");
    $("#tab-7").removeClass("active");
});

$("#publishSheet").click(function () {
    document.getElementById('createTab').style.display = 'none';
    document.getElementById('initTemplate').style.display = 'none';
    document.getElementById('publishResult').style.display = 'none';
    $("#projectInfo").removeClass("active");
    $("#tab-1").removeClass("active");
    $("#createTab").removeClass("active");
    $("#tab-3").removeClass("active");
    $("#publishSheet").addClass("active");
    $("#tab-2").addClass("active");
    $("#doneSheet").removeClass("active");
    $("#tab-4").removeClass("active");
    init_tab2();
    $("#initTemplate").removeClass("active");
    $("#tab-5").removeClass("active");
    $("#approvalLevelList").removeClass("active");
    $("#tab-6").removeClass("active");
    $("#publishResult").removeClass("active");
    $("#tab-7").removeClass("active");
});


$('#create_projectinfo').click(function () {
    let project_select_list = $('#project_select').val();
    let owner_select_list = $('#owner_select').val();
    let first_select_list = $('#first_select').val();
    let second_select_list = $('#second_select').val();
    let mailgroup_select_list = $('#mailgroup_select').val();

    if (!project_select_list || !owner_select_list) {
        alert("必填内容不能为空 ！");
        return false;
    }
    let data = {
        'project_select_list': project_select_list,
        'owner_select_list': owner_select_list,
        'first_select_list': first_select_list,
        'second_select_list': second_select_list,
        'mailgroup_select_list': mailgroup_select_list,
    };


    let url = '/asset/project/init/create/';
    $.ajax({
        url: url,
        type: "POST",
        data: data,
        contentType: 'application/x-www-form-urlencoded',
        traditional: true,
        beforeSend: function () {
            // 禁用按钮防止重复提交
            $("#create_projectinfo").attr({disabled: "disabled"});
            $("#page_loading").show();
        },
        success: function (result) {
            if (result.code === 0) {
                window.location.reload();
            }
            else {
                alert(result.msg);
                window.location.reload();
                $("#create_projectinfo").removeAttr("disabled");
            }
            $("#page_loading").hide();
        },
        error: function () {
            alert('失败');
            $("#create_projectinfo").removeAttr("disabled");
            $("#page_loading").hide();
        }
    });
});


$("#done_sheets").click(function () {
    document.getElementById('createTab').style.display = 'none';
    document.getElementById('initTemplate').style.display = 'none';
    $("#projectInfo").removeClass("active");
    $("#tab-1").removeClass("active");
    $("#publishSheet").removeClass("active");
    $("#tab-2").removeClass("active");
    $("#createTab").removeClass("active");
    $("#tab-3").removeClass("active");
    $("#initTemplate").removeClass("active");
    $("#tab-5").removeClass("active");

    $("#doneSheet").addClass("active");
    $("#tab-4").addClass("active");
    init_tab4();
    $("#approvalLevelList").removeClass("active");
    $("#tab-6").removeClass("active");
    document.getElementById('publishResult').style.display = 'none';
    $("#publishResult").removeClass("active");
    $("#tab-7").removeClass("active");
});


function init_tab4() {
    $('#reboot_services_choice').val(null).trigger('change');
    $('#reboot_services_choice').empty();
    let url = '/asset/project/publishsheet/list/done/';
    $.ajax({
        url: url,
        type: "GET",
        beforeSend: function () {
            $("#page_loading").show();
        },
        success: function (result) {
            if (result.length > 0) {
                $("#done_outtime_sheet").html(result);
            }
            $("#page_loading").hide();
        },
        error: function () {
            alert('失败');
            $("#page_loading").hide();
        }
    });
}


$("#approvalLevelList").click(function () {
    document.getElementById('createTab').style.display = 'none';
    document.getElementById('initTemplate').style.display = 'none';
    document.getElementById('publishResult').style.display = 'none';
    $("#projectInfo").removeClass("active");
    $("#tab-1").removeClass("active");
    $("#publishSheet").removeClass("active");
    $("#tab-2").removeClass("active");
    $("#createTab").removeClass("active");
    $("#tab-3").removeClass("active");
    $("#doneSheet").removeClass("active");
    $("#tab-4").removeClass("active");
    $("#initTemplate").removeClass("active");
    $("#tab-5").removeClass("active");

    $("#approvalLevelList").addClass("active");
    $("#tab-6").addClass("active");
    $("#publishResult").removeClass("active");
    $("#tab-7").removeClass("active");
    init_tab6();

});

function init_tab6() {
    $('#reboot_services_choice').val(null).trigger('change');
    $('#reboot_services_choice').empty();
    let url = '/asset/project/level/list/';
    $.ajax({
        url: url,
        type: "GET",
        beforeSend: function () {
            $("#page_loading").show();
        },
        success: function (result) {
            if (result.length > 0) {
                $("#approval_level_list").html(result);
            }
            $("#page_loading").hide();
        },
        error: function () {
            alert('失败');
            $("#page_loading").hide();
        }
    });
}

function delete_projectinfo(projectinfo_id) {
    let url = '/asset/project/init/delete/';
    let data = {
        'projectinfo_id': projectinfo_id,
    };
    $.ajax({
        url: url,
        type: "POST",
        data: data,
        contentType: 'application/x-www-form-urlencoded',
        traditional: true,
        beforeSend: function () {
            // 禁用按钮防止重复提交
            $("#deleteProjectButton").attr({disabled: "disabled"});
        },
        success: function (result) {
            if (result.code === 0) {
                console.log('delete project info ok');
            }
            else {
                alert(result.msg);
            }
            window.location.reload();
            $("#deleteProjectButton").removeAttr("disabled");
            $("#deleteProjectModal_"+projectinfo_id).modal('hide');
        },
        error: function () {
            alert('失败');
            $("#deleteProjectButton").removeAttr("disabled");
        }
    });
}
