function refreshPage() {

    var navHeight = $('#divNav').outerHeight();
    var windowHeight = $(window).height();

    $('#divContent').height(windowHeight - navHeight + 'px');

}

window.addEventListener('load', function() {
    refreshPage();
})

window.addEventListener('resize', function() {
    refreshPage();
})