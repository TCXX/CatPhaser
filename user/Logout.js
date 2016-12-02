$("#logout_btn").click(function() {
	var username = document.getElementById("username").value; // Get the username from the form
	var password = document.getElementById("password").value; // Get the password from the form

	$.ajax({
		url: "user/Logout.php",
		type: "post",
		data: {"username": username, "password": password},
		success: function(data){
			var jsonData = JSON.parse(data)
			console.log(jsonData.success);
			if(jsonData.success){
				alert("Logout successfully");
				// After the user is logged out, hide logout button and score and display login block again.
				document.getElementById("logout_btn").style.display = 'none';
				document.getElementById("Login").style.display = 'block';
				document.getElementById("scorePrompt").style.display = 'none';
				document.getElementById("score").style.display = 'none';
				document.getElementById("ShowUser").innerHTML = "";

			}
		}
	});
});
