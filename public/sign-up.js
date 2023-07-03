var supabase = supabase.createClient(
    "https://ztigdigwgznkubzkvpwj.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0aWdkaWd3Z3pua3Viemt2cHdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY4MDA5NzQsImV4cCI6MjAwMjM3Njk3NH0.YZTujUu3hXc2H2JYSGuj1Sh-Cu0roBkWOeM8S2fatWg"
  );
  window.userToken = null;

  async function createUser() {
    let email = document.forms["signUp"].email.value;
    let pass = document.forms["signUp"].password.value;
    let username = document.forms["signUp"].username.value;

    let query = { email: email, password: pass, username: username };

    const headers = { "Content-Type": "application/json" };
    const res = await fetch("/newUser", {
      method: "POST",
      headers,
      body: JSON.stringify(query),
    });
    const json = await res.json();
    if (json.error == "length") {
      let lengths = document.getElementById("length");
      lengths.innerHTML = "All fields must be completed";
    } else if (json.error == "strength") {
      let passw = document.getElementById("pass");
      passw.innerHTML =
        "Password must be 8 characters, upper and lowercase, with a number and special character.";
    } else if (json.data == "yes") {
      location.pathname = "/";
    } else {
      location.reload();
    }
  }