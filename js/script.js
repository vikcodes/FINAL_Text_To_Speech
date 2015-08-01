(function(window, document, undefined) {
  $(document).ready(function(){
  setTimeout(function(){
        $('body').addClass('loaded');
    }, 1650);
});

 Parse.initialize("PsO5rkxMEaRvzzig7IKiQgfpQVRNdQFpPYO9Ipg0", "y5TnJxnaphDQ51Ezzq5mXd8nCqRQ3MQdTUxIMLRm");   
 

var title = $("#title").val();
var text = $("#text").val();
var email = $("#email").val();


  // Set an event listener on the Choose File field.
  $('#fileselect').bind("change", function(e) {
    var files = e.target.files || e.dataTransfer.files;
    // Our file var now holds the selected file
    file = files[0];
    
  });

  $('#pdf-button').click(function() {
  var title = $("#title").val();
  var text = $("#text").val();
  var email = $("#email").val();


  
    if(text !== "" && title !== "" && email !== "") {
        
        var Note = Parse.Object.extend("Note");
        var User = Parse.Object.extend("User");
        var query = new Parse.Query(User);
        query.equalTo("email", email);
        console.log(email);
        query.find({
          success: function(foundUser) {
            foundUser = foundUser[0];
            console.log(text);
            console.log(title);   
            var note = new Note();
            note.set("title", title);
            note.set("user", foundUser);
            note.set("content", text);
            note.save(null, {
              success: function(note){
                alert("Uploaded successfully!");
              },
              error: function(note){
                alert("Uploaded successfully :D");
              }
            });
      }
  });

      } else if(typeof(file)!= undefined ){
            var serverUrl = 'https://api.parse.com/1/files/' + file.name;
            var title = $("#title").val();
            var email = $("#email").val();
    $.ajax({
      type: "POST",
      beforeSend: function(request) {

        request.setRequestHeader("X-Parse-Application-Id", 'PsO5rkxMEaRvzzig7IKiQgfpQVRNdQFpPYO9Ipg0');
        request.setRequestHeader("X-Parse-REST-API-Key", 'sy6i4A35OudquyONjSeGkkXNPOtAyUK0YEpuEgeD');
        request.setRequestHeader("Content-Type", file.type);
      },
      url: serverUrl,
      data: file,
      processData: false,
      contentType: false,
      dataType: 'json',
      success: function(data) {
        var url = data.url
        var json_data = jQuery.getJSON(url, data)
        var Note = Parse.Object.extend("Note");
        var User = Parse.Object.extend("User");
        var query = new Parse.Query(User);
        query.equalTo("email", email);

        query.find({
          success: function(foundUser) {
            foundUser = foundUser[0];
            console.log(text);
            console.log(title);   
            var note = new Note();
            note.set("title", title);
            note.set("url", url);
            note.set("user", foundUser);
            var testUrl = "https://api.idolondemand.com/1/api/sync/ocrdocument/v1?url=" + url + "&apikey=cbf70b7c-5556-4234-b5ac-54f18d61fb25";

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET",  testUrl);
            var ocr = null;
            $.getJSON(testUrl, function(data) {
                ocr = JSON.stringify(data);
                note.set("content", ocr);
                note.save(null, {
                    success: function(note){
                      alert("sucess");
                    },
                  error: function(note){
                    alert("fail");
                  }
                });
                console.log(JSON.stringify(data));
            });

            

           
      }
  });
      },
      error: function(data) {
        var obj = jQuery.parseJSON(data);
        alert(obj.error);
      }
    });

        } else {
        alert("Please fill in all fields");
      }
  });



})(this, this.document);