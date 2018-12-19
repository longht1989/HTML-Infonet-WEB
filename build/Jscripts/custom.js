/* ====================================
   Onload functions
   ==================================== */
function randomImg() {
    var store = $("img[src*='unsplash']");
    for (i = 0; i < store.length; i++) {
        var imgsrc = $(store[i]).attr('src');
        $(store[i]).attr("src", imgsrc + i)
    }
}
$(function() {
    $('.story__thumb img[src$=".gif"]').parents('.story').addClass('story--gif');
    var myLazyLoad = new LazyLoad({
        elements_selector: ".story__thumb img , .lazyload"
    });
    // DO NOT run randomImg() function in live site;
    // randomImg();
});