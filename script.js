function likeRequest(metaphorId,userID){
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          console.log(xhr.responseText);

      }
  };

  xhr.open("PUT", "metaphors/like/"+metaphorId+"/"+userID, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(payload);
}
alert(5);
module.exports=likeRequest
