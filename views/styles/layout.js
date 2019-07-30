function logout()
{
    window.location.href = "/users/logout";
}

function timeString(date)
{
    console.log("date: " + date);
}

function goback()
{
    window.history.go(-1);
    return false;
}

function postMetaphor()
{
    const text = $("#text").val();
    const exp = $("#explanation").val();

    const body = "text=" + text + "&explanation=" + exp;
    const payload = body.replace(/ /g, "+");

    $("#text").val("");
    $("#explanation").val("");
    $('#new-metaphor-modal').modal('toggle');

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhr.responseText);
            window.location.href = "/dashboard";
        }
    };

    xhr.open("POST", "/metaphors/add", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(payload);
}

$("#search-form").submit( (e)=> {
    e.preventDefault();
    const searchString = $('#search-string').val();
    $('#search-string').val("");

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

// edit-modal show event handler
$('#edit-modal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var text = button.data('text'); // Extract info from data-* attributes
    var explanation = button.data('explanation');
    var metaid = button.data('metaid');
    var modal = $(this);

    modal.find('#edit-text').val(text);
    modal.find('#edit-explanation').val(explanation);

    $('#save-changes-button').on('click', function (event) {
        var text = $("#edit-text").val();
        var exp = $("#edit-explanation").val();

        const body = "text=" + text + "&explanation=" + exp + "&id=" + metaid;
        const payload = body.replace(/ /g, "+");

        $('#edit-modal').modal('toggle');

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(xhr.responseText);
                window.location.href = "/dashboard";
            }
        };

        xhr.open("PUT", "/metaphors/edit", true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(payload);
    });
});




function cancelEdit()
{
    $('#edit-modal').modal('toggle');
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
        element.next().html(likeCount);
    }

    else if (metaphor.attr('class') == "metaphor-liked")
    {
        likeCount--;
        metaphor.removeClass("metaphor-liked");
        metaphor.addClass("metaphor-default");
        element.next().html(likeCount);
    }

    else if (metaphor.attr('class') == "metaphor-disliked")
    {
        likeCount++;
        dislikeCount--;
        metaphor.removeClass("metaphor-disliked");
        metaphor.addClass("metaphor-liked");
        element.next().html(likeCount);
        element.next().next().next().html(dislikeCount);
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
        element.next().html(dislikeCount);
    }

    else if (metaphor.attr('class') == "metaphor-disliked")
    {
        dislikeCount--;
        metaphor.removeClass("metaphor-disliked");
        metaphor.addClass("metaphor-default");
        element.next().html(dislikeCount);
    }

    else if (metaphor.attr('class') == "metaphor-liked")
    {
        dislikeCount++;
        likeCount--;
        metaphor.removeClass("metaphor-liked");
        metaphor.addClass("metaphor-disliked");
        element.next().html(dislikeCount);
        element.prev().html(likeCount);
    };
});
