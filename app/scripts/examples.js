$('.left-nav a').click(function(e) {
    e.preventDefault()
    var id = $(this).attr('href')
    $('html,body').animate({
            scrollTop: $(id).offset().top - 70
        },
        'slow');
})
