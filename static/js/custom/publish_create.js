$(document).ready(function () {
    document.getElementById('createTab').style.display = '';
    $("#createTab").addClass("active");
    $("#tab-3").addClass("active");

    $('#reboot_services_choice').val(null).trigger('change');
    $('#reboot_services_choice').empty();

    init_tab3();
});

function init_tab3() {
    $("#if_review2").click(function () {
        $("#review_select").val(null).trigger('change');
        $("#review_select").prop("disabled", true);
    });

    $("#if_review1").click(function () {
        $("#review_select").prop("disabled", false);
    });

    let project_name = $('#project_name').val();
    $('#datepicker').parent().datepicker({
        autoclose: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        startDate: "today",
    });

    $('#publish_time').timepicker({
        minuteStep: 5,
        showMeridian: false,   // 24hr mode
        defaultTime: '12:00',
    });

    $('#project_name').select2({
        placeholder: '请选择',
    });

    $('#qa_select').select2({
        placeholder: '请选择',
        allowClear: true
    });
    $('#review_select').select2({
        placeholder: '请选择',
        allowClear: true
    });

    $('#project_name').on("change", function () {
        let project_name = $(this).val();
        let env_id = $('#env_id').val();
        get_reboot_services(project_name, env_id);
    });

    $('#env_id').select2({
        minimumResultsForSearch: Infinity,
        placeholder: '请选择',
    });

    $('#env_id').on("change", function () {
        let project_name = $('#project_name').val();
        let env_id = $(this).val();
        get_reboot_services(project_name, env_id);
    });

    $('#reboot_services_choice').select2({
        allowClear: true,
        maximumSelectionLength: 4,
        minimumResultsForSearch: Infinity,
        language: 'zh-CN',
        width: '100%',
        placeholder: '请选择',
    });
    $('#reboot_services_choice').val(null).trigger('change');
    $('#reboot_services_choice').empty();

    let env_id = $('#env_id').val();
    get_reboot_services(project_name, env_id);
}


$("#create_publishsheet").click(function () {
    let project_name = $('#project_name').val();
    let env_id = $('#env_id').val();
    let tapd_url = $('#tapd_url').val();
    let reboot_services_list = $('#reboot_services_choice').val();
    let publish_date = $('#datepicker').datepicker('getData').val();
    let publish_time = $('#publish_time').val();
    let sql_before = $('#sql_before').val();
    let sql_after = $('#sql_after').val();
    let consul_key = $('#consul_key').val();

    let qa_list = $('#qa_select').val();

    let if_review = $("input[name='if_review']:checked").val();
    let review_list = $('#review_select').val();
    if (if_review === '1') {
        if (!review_list) {
            alert('请选择code review 人');
            return false;
        }
    }
    let if_browse = $("input[name='if_browse']:checked").val();
    let if_order = $("input[name='if_order']:checked").val();
    let if_buy = $("input[name='if_buy']:checked").val();
    let comment = $('#comment').val();
    let reason = $('#reason').val();

    if (!project_name || !env_id || !reboot_services_list || !publish_date || !publish_time || !tapd_url || !sql_after || !sql_before || !consul_key || !qa_list) {
        alert('必填内容不能为空');
        return false;
    }

    if (tapd_url.match("tower.im") || tapd_url.match("tapd.cn")) {
        console.log('url ok');
    }
    else {
        alert('TAPD URL格式不正确');
        return false;
    }

    let url = '/asset/project/publishsheet/create/';
    let data = {
        'project_name': project_name,
        'env_id': env_id,
        'tapd_url': tapd_url,
        'reboot_services_list': reboot_services_list,
        'publish_date': publish_date,
        'publish_time': publish_time,
        'sql_before': sql_before,
        'sql_after': sql_after,
        'consul_key': consul_key,
        'qa_list': qa_list,
        'if_review': if_review,
        'review_list': review_list,
        'reason': reason,
        'comment': comment,
        'if_browse': if_browse,
        'if_order': if_order,
        'if_buy': if_buy
    };
    console.log(data);
    $.ajax({
        url: url,
        type: "POST",
        data: data,
        contentType: 'application/x-www-form-urlencoded',
        traditional: true,
        beforeSend: function () {
            // 禁用按钮防止重复提交
            $("#create_publishsheet").attr({disabled: "disabled"});
            $("#page_loading").show();
        },
        success: function (result) {
            if (result.code === 0) {
                window.location.href="/asset/project/publishsheet/list/";
            }
            else {
                alert(result.msg);
                $("#create_publishsheet").removeAttr("disabled");
            }
            $("#page_loading").hide();
        },
        error: function () {
            alert('失败');
            $("#create_publishsheet").removeAttr("disabled");
            $("#page_loading").hide();
        }
    });
});

function get_reboot_services(project_name, env_id) {
    $('#reboot_services_choice').val(null).trigger('change');
    $('#reboot_services_choice').empty();
    $('#reboot_services_choice').on("removed", function () {
    });
    let old_obj = document.getElementById('reboot_services_choice');
    old_obj.options.length = 0;
    $.getJSON("/asset/getProjectList", {"project": project_name, "env": env_id}, function (result) {
        console.log(result);
        console.log(result.length);
        for (let i = 0; i < result.length; i++) {
            let newOption = new Option(result[i], result[i], false, false);
            $('#reboot_services_choice').append(newOption).trigger('change');
        }
    });
}
