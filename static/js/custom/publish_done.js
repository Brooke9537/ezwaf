$(document).ready(function () {
    document.getElementById('doneSheet').style.display = '';
    $("#doneSheet").addClass("active");
    $("#tab-4").addClass("active");
});

function see_publish_result(sheet_id) {
    let url = '/asset/project/publishsheet/publish/result/?sheet_id='+sheet_id;
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            init_tab7();
            $("#publish_result").html(result);
        },
        error: function () {
            alert('失败');
        }
    });
}

function done_sheet_detail(sheet_id) {
    let url = '/asset/project/publishsheet/detail/?sheet_id=' + sheet_id + '&can_publish=2';
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            if (result.length > 0) {
                $("#done_detail_modal").html(result);
            }
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
