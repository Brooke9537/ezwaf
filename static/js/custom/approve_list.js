$(document).ready(function () {
    document.getElementById('approveDetail').style.display = 'none';
    $("#approveDetail").removeClass("active");
    $("#tab-2").removeClass("active");
    $("#approveList").addClass("active");
    $("#tab-1").addClass("active");
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

}

$('#createApprove').click(function () {
    document.getElementById('approveDetail').style.display = '';
    $("#approveList").removeClass("active");
    $("#tab-1").removeClass("active");
    $("#approveDetail").addClass("active");
    $("#tab-2").addClass("active");
});

$("#approveList").click(function () {
    document.getElementById('approveDetail').style.display = 'none';
    $("#approveDetail").removeClass("active");
    $("#tab-2").removeClass("active");
    $("#approveList").addClass("active");
    $("#tab-1").addClass("active");

});

function approveSheet(sheet_id) {
    let url = '/asset/approve/init/?sheet_id=' + sheet_id;
    $.ajax({
        url: url,
        type: "GET",
        beforeSend: function () {
            $("#page_loading").show();
        },
        success: function (result) {
            if (result.length > 0) {
                $("#tab-2").html(result);
            }
            $("#page_loading").hide();
        },
        error: function () {
            alert('失败');
            $("#page_loading").hide();
        }
    });
}

function approveRefuseReasonDetail(sheet_id) {
    let url = '/asset/project/publishsheet/reason/?sheet_id=' + sheet_id;
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            if (result.length > 0) {
                $("#refuse_reason_modal").html(result);
            }
        },
        error: function () {
            alert('失败');
        }
    });
}

function approve_sheet_detail(sheet_id, can_approve) {
    let url = '/asset/approve/sheet/detail/?sheet_id=' + sheet_id + '&can_approve=' + can_approve;
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            if (result.length > 0) {
                $("#approve_detail_modal").html(result);
            }
        },
        error: function () {
            alert('失败');
        }
    });
}

