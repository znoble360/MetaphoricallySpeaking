function logout()
{
    window.location.href = "/users/logout";
}

function postMetaphor()
{
    const text = $("#text").val();
    const explanation = $("#explanation").val();

    console.log("text: " + text + "\nexplanation: " + explanation);
}