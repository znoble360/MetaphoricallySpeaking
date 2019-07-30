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
            location.reload();
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

    window.location.href = "/search/search?searchString=" + searchString + "&sort=Most+Liked";
});

function changeSearchSort(sort)
{    
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhr.responseText);
            location.reload();
        }
    };

    xhr.open("PUT", "/search/sort/" + sort, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function changeSortMethod(sort)
{
    const url = "/sort/" + sort;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhr.responseText);
            location.reload();
        }
    };

    xhr.open("PUT", url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
}



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
                location.reload();
            }
        };

        xhr.open("PUT", "/metaphors/edit", true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(payload);
    });
});

$('#delete-modal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var metaid = button.data('metaid'); // Extract info from data-* attributes

    $('#delete-metaphor-button').on('click', function (event) {

        $('#delete-modal').modal('toggle');
    
        var xhr = new XMLHttpRequest();
    
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(xhr.responseText);
                location.reload();
            }
        };
    
        xhr.open("DELETE", "/metaphors/delete/" + metaid, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send();
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

function voteRequest(metaid, userid, vote){
    var xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhr.responseText);
  
        }
    };
  
    xhr.open("PUT", "metaphors/" + vote + "/"+ metaid +"/"+ userid, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
}
