// Login
// When user hit the login button:
$("#login_btn").click(function() {
	var username = document.getElementById("username").value; // Get the username from the form
	var password = document.getElementById("password").value; // Get the password from the form

  $.ajax({
    url: "login_ajax.php",
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
      url: "register_ajax.php",
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
  			} else {
  				alert(jsonData.message);
  			}
     }
   });
 });
