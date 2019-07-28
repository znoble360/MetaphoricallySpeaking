function logout()
{
    window.location.href = "/users/logout";
}

function postMetaphor()
{
    const text = $("#text").val();
    const explanation = $("#explanation").val();
    $("#text").val("");
    $("#explanation").val("");
    $('#new-metaphor-modal').modal('toggle');
    console.log("text: " + text + "\nexplanation: " + explanation);
}

$("#search-form").submit( (e)=> {
    e.preventDefault();
    console.log("hello");
    const searchString = $('#search-string').val();

    window.location.href = "/search/search?searchString=" + searchString;
});



function report()
{
    const selection = $('input[name="report-radio"]:checked');
    if (selection.val() == null)
        return;
    console.log("Report reason: " + selection.val());
    $('#report-modal').modal('toggle');
    selection.prop('checked', false);
}

function loginMessage()
{
    window.location.href = "/please-log-in";
}

$('.btn-vote.btn-like.btn-vote-allow').on('click', function(){
    const element = $(this);
    var likeCount = parseInt(element.next().html());
    var dislikeCount = parseInt(element.next().next().next().html());
    const metaphor = element.parent().parent().parent().parent();

    if (metaphor.attr('class') == "metaphor-default")
    {
        likeCount++;
        metaphor.removeClass("metaphor-default");
        metaphor.addClass("metaphor-liked");
        element.next().html(likeCount.toString());
    }

    else if (metaphor.attr('class') == "metaphor-liked")
    {
        likeCount--;
        metaphor.removeClass("metaphor-liked");
        metaphor.addClass("metaphor-default");
        element.next().html(likeCount.toString());
    }

    else if (metaphor.attr('class') == "metaphor-disliked")
    {
        likeCount++;
        dislikeCount--;
        metaphor.removeClass("metaphor-disliked");
        metaphor.addClass("metaphor-liked");
        element.next().html(likeCount.toString());
        element.next().next().next().html(dislikeCount.toString());
    };
});

$('.btn-vote.btn-dislike.btn-vote-allow').on('click', function(){
    const element = $(this);
    var dislikeCount = parseInt(element.next().html());
    var likeCount = parseInt(element.prev().html());
    const metaphor = element.parent().parent().parent().parent();

    if (metaphor.attr('class') == "metaphor-default")
    {
        dislikeCount++;
        metaphor.removeClass("metaphor-default");
        metaphor.addClass("metaphor-disliked");
        element.next().html(dislikeCount.toString());
    }

    else if (metaphor.attr('class') == "metaphor-disliked")
    {
        dislikeCount--;
        metaphor.removeClass("metaphor-disliked");
        metaphor.addClass("metaphor-default");
        element.next().html(dislikeCount.toString());
    }

    else if (metaphor.attr('class') == "metaphor-liked")
    {
        dislikeCount++;
        likeCount--;
        metaphor.removeClass("metaphor-liked");
        metaphor.addClass("metaphor-disliked");
        element.next().html(dislikeCount.toString());
        element.prev().html(likeCount.toString());
    };
});
