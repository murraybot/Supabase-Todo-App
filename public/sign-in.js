var supabase = supabase.createClient(
  "https://ztigdigwgznkubzkvpwj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0aWdkaWd3Z3pua3Viemt2cHdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY4MDA5NzQsImV4cCI6MjAwMjM3Njk3NH0.YZTujUu3hXc2H2JYSGuj1Sh-Cu0roBkWOeM8S2fatWg"
);
window.userToken = null;

async function signIn() {
  let email = document.forms["signIn"].email.value;
  let pass = document.forms["signIn"].password.value;

  const { data, error } = await supabase.auth.signIn({
    email: email,
    password: pass,
  });
  if (error) {
    console.log(error);
    alert(error.message);
  } else {
    //console.log(data);
    //console.log(supabase.auth.session());
    location.pathname = "/todo";
  }
}
