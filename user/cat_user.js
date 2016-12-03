// max_score is the highest score in the database.
var max_score;

// Login
// When user hit the login button:
$("#login_btn").click(function() {
  var username = document.getElementById("username").value; // Get the username from the form
  var password = document.getElementById("password").value; // Get the password from the form
  $.ajax({
    url: "user/login_ajax.php",
    type: "post",
    data: {"username": username, "password": password},
    success: function(data){
      var jsonData = JSON.parse(data);
      if(jsonData.success){
        $(".Login").hide();
        alert("Login successfully");
        // After user is logged in, show username, logout button and addEvent form.
        document.getElementById("ShowUser").innerHTML = username;
        document.getElementById("logout_btn").style.display = 'block';
        document.getElementById("scorePrompt").style.display = 'block';
        max_score = jsonData.max_score;
        document.getElementById("score").style.display = 'block';
        document.getElementById("sync_btn").style.display = 'block';
        document.getElementById("score").innerHTML = jsonData.max_score;
      } else {
        alert(jsonData.message);
      }
    }
  });
});

// When user hit the register button:
$("#register_btn").click(function() {
  var username = document.getElementById("username").value; // Get the username from the form
  var password = document.getElementById("password").value; // Get the password from the form

  $.ajax({
    url: "user/register_ajax.php",
    type: "post",
    data: {"username": username, "password": password},
    success: function(data){
      var jsonData = JSON.parse(data);
      if(jsonData.success){
        $(".Login").hide();
        alert("Register successfully");
        // After user is logged in, show username, logout button and addEvent form.
        document.getElementById("ShowUser").innerHTML = username;
        document.getElementById("logout_btn").style.display = 'block';
        document.getElementById("scorePrompt").style.display = 'block';
        document.getElementById("score").style.display = 'block';
        document.getElementById("sync_btn").style.display = 'block';
        document.getElementById("score").innerHTML = 0;
        max_score = 0;
      } else {
        alert(jsonData.message);
      }
    }
  });
});

$("#sync_btn").click(function() {
  var username = document.getElementById("username").value; // Get the username from the form
  console.log("Update score");
  //var gameOver = document.getElementById("gameOver").innerHTML;
  //var gameHighest = document.getElementById("score").innerHTML;
  console.log(gameOver);
  console.log(score);
  // If the highest score in the game is higher than the one in the database, update the score in database.
  if (gameOver && (score > max_score)) {
    console.log("in if");
    // $.ajax({
    //   url: "user/updateScore.php",
    //   type: "post",
    //   data: {"username": username, "gameHighest": gameHighest}
    //   // success: function(data){
    //   //   console.log("data");
    //   //   var jsonData = JSON.parse(data);
    //   //   if(jsonData.success){
    //   //     console.log("success");
    //   //   } else {
    //   //     alert(jsonData.message);
    //   //   }
    //   // }
    // });
    $.post("user/updateScore.php", {
                  username: username,
                  gameHighest: score
              }, function () {
                  console.log("update Back");
                  alert("Sync success");
      });
  }

});
