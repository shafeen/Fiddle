$(document).ready(function () {
    $("body").bind("touchstart", function() { /* nothing needed here, see http://stackoverflow.com/a/23012580 */ });
    $(".fan li").hover(function() {
        $(this).nextAll().each(function(i) {
            $(this).addClass("after prefix_" + (i+1));
        });
        $(this).prevAll().each(function(i) {
            $(this).addClass("before prefix_" + (i+1));
        });
    }, function() {
        $(this).nextAll().each(function(i) {
            $(this).removeClass("after prefix_" + (i+1));
        });
        $(this).prevAll().each(function(i) {
            $(this).removeClass("before prefix_" + (i+1));
        });
    });
    /* add the "flip" function */
    $(".fan li").click(function(){
        $(this).find(".card").addClass("flipped").mouseleave(function(){
            $(this).removeClass("flipped");
        });
        return false;
    });
    /* set the card's data + bgcolor */
    $(".face.front").each(function(){
        $(this).css("background",$(this).data("bgcolor"));
        $(this).html($(this).data("bgcolor"));
    });
    $("a[rel='external']").attr("target", "_blank");
});