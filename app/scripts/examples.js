$('.code-toggle').click(function() {
    let $parent = $(this).parent('.example')
    $parent.find('.tag').fadeToggle().parent('.text').toggleClass('opened')
    $parent.find('.code').slideToggle()
})
