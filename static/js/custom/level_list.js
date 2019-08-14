$(document).ready(function () {
    $("#approvalLevelList").addClass("active");
    $("#tab-6").addClass("active");
    init_add_button();
    init_page();
    $("#optionsRadios1").click(function () {
        $('#level_select2').html("");
        $('#add_button').html("<button type='button' class='btn btn-sm btn-success m-t-n-xs'\n" +
            "                                                    id='add_level_select2'><i\n" +
            "                                                    class='fa fa-plus'></i></button>");
        init_add_button();
        init_custom();
    });
    $("#optionsRadios2").click(function () {
        $('#level_select2').html("");
        $('#add_button').html("");
        init_template();
    });
});

function init_page() {
    $('#project_select2').select2({
        placeholder: '请选择',
        allowClear: true
    });
    $('.weekday-start').select2({
        minimumResultsForSearch: Infinity,
        language: 'zh-CN',
        width: '100%',
        placeholder: '请选择',
    });
    $('.weekday-end').select2({
        minimumResultsForSearch: Infinity,
        language: 'zh-CN',
        width: '100%',
        placeholder: '请选择',
    });

    $('.form-control.input-small.timepicker').timepicker({
        minuteStep: 30,
        showMeridian: false,   // 24hr mode
        defaultTime: '0:00',
    });


    $('.level-select').select2({
        minimumResultsForSearch: Infinity,
        language: 'zh-CN',
        width: '100%',
        placeholder: '请选择',
    });
}

function init_add_button() {
    $('#add_level_select2').click(function () {
        let level_obj = document.getElementsByClassName("select-level");
        init_custom();
        init_page();
        $('.close-level-set').click(function () {
            let content = $(this).closest('div.ibox');
            if (level_obj.length !== 1) {
                content.remove();
            }
            else {
                return false;
            }
        });
    });
}

function init_template() {
    let url = '/asset/project/template/checkboxlist/';
    $.ajax({
        url: url,
        type: "GET",
        beforeSend: function () {
            $("#page_loading").show();
        },
        success: function (result) {
            if (result.length > 0) {
                $('#level_select2').html(result);
            }
            $("#page_loading").hide();
        },
        error: function () {
            alert('失败');
            $("#page_loading").hide();
        }
    });
}

function init_custom() {
    let append_str = " <div class='select-level ibox'>\n" +
        "                                                <div class='ibox-tools'>\n" +
        "                                                    <a class='close-level-set'>\n" +
        "                                                        <i class='fa fa-times' style='color: #ed5565'></i>\n" +
        "                                                    </a>\n" +
        "                                                </div>\n" +
        "\n" +
        "                                                <form role='form'>\n" +
        "                                                    <div class='row'>\n" +
        "                                                        <div class='col-lg-6'>\n" +
        "                                                            <div class='form-group'>\n" +
        "                                                                <label>起始日</label>\n" +
        "                                                                <select class='form-control weekday-start'>\n" +
        "                                                                    <option value=1>周一</option>\n" +
        "                                                                    <option value=2>周二</option>\n" +
        "                                                                    <option value=3>周三</option>\n" +
        "                                                                    <option value=4>周四</option>\n" +
        "                                                                    <option value=5>周五</option>\n" +
        "                                                                    <option value=6>周六</option>\n" +
        "                                                                    <option value=7>周日</option>\n" +
        "                                                                </select>\n" +
        "                                                            </div>\n" +
        "                                                        </div>\n" +
        "                                                        <div class='col-lg-6'>\n" +
        "                                                            <div class='form-group'>\n" +
        "                                                                <label>截止日</label>\n" +
        "                                                                <select class='form-control weekday-end'>\n" +
        "                                                                    <option value=1>周一</option>\n" +
        "                                                                    <option value=2>周二</option>\n" +
        "                                                                    <option value=3>周三</option>\n" +
        "                                                                    <option value=4>周四</option>\n" +
        "                                                                    <option value=5>周五</option>\n" +
        "                                                                    <option value=6>周六</option>\n" +
        "                                                                    <option value=7 selected>周日</option>\n" +
        "                                                                </select>\n" +
        "                                                            </div>\n" +
        "                                                        </div>\n" +
        "                                                    </div>\n" +
        "\n" +
        "                                                    <div class='row'>\n" +
        "                                                        <div class='col-lg-6'>\n" +
        "                                                            <div class='form-group'>\n" +
        "                                                                <label>起始时间</label>\n" +
        "                                                                <div class='input-group bootstrap-timepicker timepicker'>\n" +
        "                                                                    <input type='text'\n" +
        "                                                                           class='form-control input-small timepicker start-time'>\n" +
        "                                                                    <span class='input-group-addon'><i\n" +
        "                                                                            class='glyphicon glyphicon-time'></i></span>\n" +
        "                                                                </div>\n" +
        "                                                            </div>\n" +
        "                                                        </div>\n" +
        "                                                        <div class='col-lg-6'>\n" +
        "                                                            <div class='form-group'>\n" +
        "                                                                <label>截止时间</label>\n" +
        "                                                                <div class='input-group bootstrap-timepicker timepicker'>\n" +
        "                                                                    <input type='text'\n" +
        "                                                                           class='form-control input-small timepicker end-time'>\n" +
        "                                                                    <span class='input-group-addon'><i\n" +
        "                                                                            class='glyphicon glyphicon-time'></i></span>\n" +
        "                                                                </div>\n" +
        "                                                            </div>\n" +
        "                                                        </div>\n" +
        "                                                    </div>\n" +
        "\n" +
        "                                                    <div class='row'>\n" +
        "                                                        <div class='col-lg-12'>\n" +
        "                                                            <div class='form-group'>\n" +
        "                                                                <label>审批级别</label>\n" +
        "                                                                <select class='form-control level-select'>\n" +
        "                                                                    <option value='1' selected>无需审批</option>\n" +
        "                                                                    <option value='2'>一级审批</option>\n" +
        "                                                                    <option value='3'>二级审批</option>\n" +
        "                                                                </select>\n" +
        "                                                            </div>\n" +
        "                                                        </div>\n" +
        "                                                    </div>\n" +
        "                                                </form>\n" +
        "                                                <br>\n" +
        "                                            </div> ";


    $('#level_select2').append(append_str);
    init_page();
}

$("#create_level").click(function () {
    let radio = $("input[name='optionsRadios']:checked").val();
    let project_select_list = $('#project_select2').val();
    let level_list = [];
    if (!project_select_list) {
        alert("请选择项目 ！");
        return false;
    }
    let data = {};
    if (radio === '1') {
        let weekday_start_list = $('.weekday-start');
        let weekday_end_list = $('.weekday-end');
        let time_start_list = $('.start-time');
        let time_end_list = $('.end-time');
        let level_select_list = $('.level-select');
        console.log('level_select_list : ');
        console.log(level_select_list);
        level_select_list.each(function (index, el) {
            console.log(index);
            level_list.push([weekday_start_list[index].value, weekday_end_list[index].value, time_start_list[index].value, time_end_list[index].value, el.value]);
        });
        // weekday_start_list.each(function (index, el) {
        //     console.log(index);
        //     level_list.push([el.value, weekday_end_list[index].value, time_start_list[index].value, time_end_list[index].value, level_select_list[index].value]);
        // });
        data = {
            'radio': radio,
            'project_select_list': project_select_list,
            'level_list': level_list,
        };
    }
    else {
        let check_list = document.getElementsByName("approve_level_checkbox");
        for (let i = 0; i < check_list.length; i++) {
            if (check_list[i].checked) {
                level_list.push(check_list[i].value);
            }
        }
        if (level_list.length <= 0) {
            alert("请选择模板 ！");
            return false;
        }
        data = {
            'radio': radio,
            'project_select_list': project_select_list,
            'level_list': level_list,
        }
    }

    let url = '/asset/project/level/create/';
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
                // window.location.reload();
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

function delete_level(timeslot_id) {
    let url = '/asset/project/level/delete/';
    let data = {
        'timeslot_id': timeslot_id,
    };
    $.ajax({
        url: url,
        type: "POST",
        data: data,
        contentType: 'application/x-www-form-urlencoded',
        traditional: true,
        beforeSend: function () {
            // 禁用按钮防止重复提交
            $("#deleteLevelButton").attr({disabled: "disabled"});
            $("#page_loading").show();
        },
        success: function (result) {
            if (result.code === 0) {
                window.location.reload();
            }
            else {
                alert(result.msg);
            }

            $("#deleteLevelButton").removeAttr("disabled");
            $("#deleteLevelModal").modal('hide');
            $("#page_loading").hide();
        },
        error: function () {
            alert('失败');
            $("#deleteLevelButton").removeAttr("disabled");
            $("#page_loading").hide();
        }
    });
}

function levelDetail(timeslot_id) {
    let url = '/asset/project/level/detail/?timeslot_id=' + timeslot_id;
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            if (result.length > 0) {
                $("#level_detail_modal").html(result);
            }
        },
        error: function () {
            alert('失败');
        }
    });

}

// $("#template_init").click(function () {
//     document.getElementById('createTab').style.display = 'none';
//     document.getElementById('doneSheet').style.display = 'none';
//     document.getElementById('publishResult').style.display = 'none';
//     document.getElementById('initTemplate').style.display = '';
//     $("#projectInfo").removeClass("active");
//     $("#tab-1").removeClass("active");
//     $("#publishSheet").removeClass("active");
//     $("#tab-2").removeClass("active");
//     $("#createTab").removeClass("active");
//     $("#tab-3").removeClass("active");
//     $("#doneSheet").removeClass("active");
//     $("#tab-4").removeClass("active");
//
//     $("#initTemplate").addClass("active");
//     $("#tab-5").addClass("active");
//     init_tab5();
//     $("#approvalLevelList").removeClass("active");
//     $("#tab-6").removeClass("active");
//     $("#publishResult").removeClass("active");
//     $("#tab-7").removeClass("active");
// });
//
// function init_tab5() {
//     $('#reboot_services_choice').val(null).trigger('change');
//     $('#reboot_services_choice').empty();
//     let url = '/asset/project/template/list/';
//     $.ajax({
//         url: url,
//         type: "GET",
//         beforeSend: function () {
//             $("#page_loading").show();
//         },
//         success: function (result) {
//             if (result.length > 0) {
//                 $("#init_template").html(result);
//             }
//             $("#page_loading").hide();
//         },
//         error: function () {
//             alert('失败');
//             $("#page_loading").hide();
//         }
//     });
// }