/**
 * Created by smahmud on 7/20/2015.
 */

var BLANK_TOKEN = "::blank::";

function genSentenceMarkup(sentenceFragments) {
    var $sentence = $("<li></li>");

    sentenceFragments.forEach(function (fragment) {
        console.log(fragment);

        if(fragment == BLANK_TOKEN) {
            $sentence.append($("<input type=text/>"));
        } else {
            $sentence.append(fragment);
        }
        $sentence.append(" ");
    });

    return $sentence.get(0);
}

function genAndAppendSentence() {
    var inputStr = $("#gen-input").val();
    if(inputStr == "") {
        alert("String cannot be empty");
        return;
    }

    var sentenceFragments = inputStr.split(" ");

    // append the generated sentence to the list
    $("#sentence-list").append($(genSentenceMarkup(sentenceFragments)));
}


$(document).ready(function() {

    $("#gen-btn").on("click", function(e) {
        genAndAppendSentence();
    });

    $("#insert-blank-btn").on("click", function(e) {
        $("#gen-input").val($("#gen-input").val() + BLANK_TOKEN);
    });

});





