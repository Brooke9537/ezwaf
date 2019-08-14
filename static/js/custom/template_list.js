$(document).ready(function () {
    document.getElementById('initTemplate').style.display = '';
    $("#initTemplate").addClass("active");
    $("#tab-5").addClass("active");

    init_approval_level();
});

function init_approval_level() {
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


    $('.approve-select').select2({
        minimumResultsForSearch: Infinity,
        language: 'zh-CN',
        width: '100%',
        placeholder: '请选择',
    });
}

$("#create_project_template").click(function () {
    let weekday_start = $('#weekday_start').val();
    let weekday_end = $('#weekday_end').val();
    let time_start = $('#start_time').val();
    let time_end = $('#end_time').val();
    let level = $('.approve-select').val();
    let url = '/asset/project/template/create/';
    let data = {
        'weekday_start': weekday_start,
        'weekday_end': weekday_end,
        'time_start': time_start,
        'time_end': time_end,
        'level': level,
    };
    $.ajax({
        url: url,
        type: "POST",
        data: data,
        contentType: 'application/x-www-form-urlencoded',
        traditional: true,
        beforeSend: function () {
            // 禁用按钮防止重复提交
            $("#create_project_template").attr({disabled: "disabled"});
            $("#page_loading").show();
        },
        success: function (result) {
            if (result.code === 0) {
                window.location.reload();
            }
            else {
                alert(result.msg);
                $("#create_project_template").removeAttr("disabled");
            }
            $("#page_loading").hide();
        },
        error: function () {
            alert('失败');
            $("#create_project_template").removeAttr("disabled");
            $("#page_loading").hide();
        }
    });
});

function delete_timeslot(timeslot_id) {
    let url = '/asset/project/template/delete/';
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
            $("#deleteTemplateButton").attr({disabled: "disabled"});
            $("#page_loading").show();
        },
        success: function (result) {
            if (result.code === 0) {
                window.location.reload();
            }
            else {
                alert(result.msg);
            }
            $("#deleteTemplateButton").removeAttr("disabled");
            $("#deleteTemplateModal").modal('hide');
            $("#page_loading").hide();
        },
        error: function () {
            alert('失败');
            $("#deleteTemplateButton").removeAttr("disabled");
            $("#page_loading").hide();
        }
    });
}
