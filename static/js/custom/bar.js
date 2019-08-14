/*********************************
 * Author: HuangYao
 * Content: 定义左侧导航栏动作
 *********************************/

$('.nav-second-level').find('a').each(function () {
    let href_list = this.href.split('/');
    let new_url = '';
    for (let i = 0; i < 5; i++){
        new_url = new_url + href_list[i] + '/'
    }
    if (this.href == document.location.href || document.location.href.search(this.href) >= 0 || document.location.href.search(new_url) >= 0) {
        $(this).parent().addClass('active'); // this.className = 'active';
        $(this).parent().parent().parent().addClass('active');
    }
});

