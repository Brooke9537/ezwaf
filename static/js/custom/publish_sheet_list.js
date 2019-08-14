$(document).ready(function () {
    $("#publishSheet").addClass("active");
    $("#tab-2").addClass("active");
});

function delete_publishsheet(sheet_id) {
    let url = '/asset/project/publishsheet/delete/';
    let data = {
        'sheet_id': sheet_id,
    };
    $.ajax({
        url: url,
        type: "POST",
        data: data,
        contentType: 'application/x-www-form-urlencoded',
        traditional: true,
        beforeSend: function () {
            // 禁用按钮防止重复提交
            $("#deleteSheetButton").attr({disabled: "disabled"});
        },
        success: function (result) {
            if (result.code === 0) {
                window.location.reload();
            }
            else {
                alert(result.msg);
            }
            $("#deleteSheetButton").removeAttr("disabled");
            $("#deleteSheetModal").modal('hide');
            $("#page_loading").hide();
        },
        error: function () {
            alert('失败');
            $("#page_loading").hide();
            $("#deleteSheetButton").removeAttr("disabled");
        }
    });
}

function sheetRefuseReasonDetail(sheet_id) {
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

function sheet_detail(sheet_id) {
    // 可以发布的单子
    let url = '/asset/project/publishsheet/detail/?sheet_id=' + sheet_id + '&can_publish=1';
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            if (result.length > 0) {
                $("#sheet_detail_modal").html(result);
            }
        },
        error: function () {
            alert('失败');
        }
    });
}

function publish_sheet_detail(sheet_id, can_delete=2) {
    let url = '/asset/project/publishsheet/detail/?sheet_id=' + sheet_id + '&can_publish=2&can_delete=' + can_delete ;
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            if (result.length > 0) {
                $("#sheet_detail_modal").html(result);
            }
        },
        error: function () {
            alert('失败');
        }
    });
}

function start_publish(sheet_id) {
    let url = '/asset/project/publishsheet/publish/start/?sheet_id='+sheet_id;
    let result_url = '/asset/project/publishsheet/publish/result/?sheet_id='+sheet_id;
    $.ajax({
        url: url,
        type: "GET",
        beforeSend: function(){
            init_tab7();
            console.log(result_url);
        },
        success: function (result) {
            console.log(result);
            window.location.href=result_url;
        },
        error: function () {
            alert('失败');
        }
    });
}

function init_tab7() {
    document.getElementById('publishResult').style.display = '';
    document.getElementById('createTab').style.display = 'none';
    document.getElementById('doneSheet').style.display = 'none';
    document.getElementById('initTemplate').style.display = 'none';
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
    $("#approvalLevelList").removeClass("active");
    $("#tab-6").removeClass("active");

    $("#publishResult").addClass("active");
    $("#tab-7").addClass("active");
}

