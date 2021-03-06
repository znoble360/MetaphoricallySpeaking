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
    if (searchString.replace(/ /g, "") == "")
    {
        emptyStringMsg();
        return;
    }
    $('#search-string').val("");

    window.location.href = "/search/search?searchString=" + searchString + "&sort=Most+Liked";
});

function emptyStringMsg()
{
    var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(xhr.responseText);
                location.reload();
            }
        };

        xhr.open("GET", "/empty-string", true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send();
}

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

$('#report-modal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal

    var metaid = button.data('metaid');
    var authorid = button.data('authorid');

    $('#report-metaphor-button').on('click', function (event) {

        var selection = $('input[name="report-radio"]:checked');

        if (selection.val() == null)
        {
            return;
        }

        const body = "issue=" + selection.val() + "&metaid=" + metaid + "&authorid=" + authorid;
        const payload = body.replace(/ /g, "+");

        $('#report-modal').modal('toggle');
    
        var xhr = new XMLHttpRequest();
    
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(xhr.responseText);
                selection.prop('checked', false);
                location.reload();
            }
        };
    
        xhr.open("POST", "/metaphors/report", true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(payload);
    });
    
});

function loginMessage()
{
    var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(xhr.responseText);
                location.reload();
            }
        };

        xhr.open("GET", "/please-log-in", true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send();
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

$('#settings-modal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal

    // Extract info from data-* attributes
    var name = button.data('name');
    var username = button.data('username');
    var email = button.data('email');

    var modal = $(this);

    var nameField = modal.find('#name-field');
    var usernameField = modal.find('#username-field');
    var emailField = modal.find('#email-field');

    var saveBtn = modal.find('#save-settings-button');
    var cancelBtn = modal.find('#cancel-edit-button');
    var closeBtn = modal.find('#close-settings-button');
    var editBtn = modal.find('#edit-settings-button');
    var XBtn = modal.find('#x-settings-button');

    saveBtn.hide();
    cancelBtn.hide();

    nameField.val(name);
    usernameField.val(username);
    emailField.val(email);

    closeBtn.on('click', function(event) {
        location.reload();
    });

    XBtn.on('click', function(event) {
        if (saveBtn.is(":visible")) {
            saveBtn.hide();
        }
        if (cancelBtn.is(":visible")) {
            cancelBtn.hide();
        }
        if (editBtn.is(":hidden")) {
            editBtn.show();
        }
        if (closeBtn.is(":hidden")) {
            closeBtn.show();
        }
        if (!nameField.attr('disabled')) {
            nameField.attr({'disabled': 'disabled'});
        }
        if (!usernameField.attr('disabled')) {
            usernameField.attr({'disabled': 'disabled'});
        }
        if (!emailField.attr('disabled')) {
            emailField.attr({'disabled': 'disabled'});
        }

        $('#settings-warning-text').html("");
        $('#settings-success-text').html("");

        modal.modal('toggle');

        location.reload();
    });

    editBtn.on('click', function (event) {
        nameField.removeAttr('disabled');
        usernameField.removeAttr('disabled');
        emailField.removeAttr('disabled');

        editBtn.hide();
        closeBtn.hide();
        saveBtn.show();
        cancelBtn.show();

        saveBtn.on('click', function(event) {
            console.log("name: " + nameField.val());
            console.log("username: " + usernameField.val());
            console.log("email: " + emailField.val());

            const body = "name=" + nameField.val() + "&username=" + usernameField.val() + "&email=" + emailField.val();
            const payload = body.replace(/ /g, "+");

            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var response = JSON.parse(xhr.response);
                    if (!response.success) {
                        $('#settings-success-text').html("");
                        if (response.error != "Error")
                            $('#settings-warning-text').html(response.error + ' already in use');
                        else
                            $('#settings-warning-text').html(response.error);
                    } else {
                        $('#settings-warning-text').html("");
                        $('#settings-success-text').html("Changes saved");

                        nameField.attr({'disabled': 'disabled'});
                        usernameField.attr({'disabled': 'disabled'});
                        emailField.attr({'disabled': 'disabled'});


                        saveBtn.hide();
                        cancelBtn.hide();
                        closeBtn.show();
                        editBtn.show();
                    }
                }
            }

            xhr.open("PUT", "/users/edit", true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(payload);
        });

        cancelBtn.on('click', function(event) {
            saveBtn.hide();
            cancelBtn.hide();
            closeBtn.show();
            editBtn.show();

            nameField.val(name);
            usernameField.val(username);
            emailField.val(email);

            nameField.attr({'disabled': 'disabled'});
            usernameField.attr({'disabled': 'disabled'});
            emailField.attr({'disabled': 'disabled'});

            $('#settings-warning-text').html("");
            $('#settings-success-text').html("");
        });

        
    
        
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
  
    xhr.open("PUT", "/metaphors/" + vote + "/"+ metaid +"/"+ userid, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
}

$('.user-page-button').on('click', (event) => {
    var button = $(event.target);
    var author = button.data('author');

    window.location.href = "/user/" + author;
});