let $iconBlock = $('.icon-block')
let $body = $('body')


const screenHeight = $(window).height()
const offset = 200

$iconBlock.top = $iconBlock.offset().top



document.addEventListener('scroll', function() {
    if ($body[0].scrollTop > ($iconBlock.top - screenHeight + offset)) {
        $iconBlock.find('img').addClass('visible')
    }
    else {
        $iconBlock.find('img').removeClass('visible')
    }
});
