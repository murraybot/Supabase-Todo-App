var supabase = supabase.createClient(
    "https://ztigdigwgznkubzkvpwj.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0aWdkaWd3Z3pua3Viemt2cHdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY4MDA5NzQsImV4cCI6MjAwMjM3Njk3NH0.YZTujUu3hXc2H2JYSGuj1Sh-Cu0roBkWOeM8S2fatWg"
  );
  window.userToken = null;

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      //location.pathname = "/sign-in";
      console.log(localStorage);
      localStorage.clear();
    }
  }
  signOut();
  setTimeout(() => {
    location.pathname = "/sign-in";
  }, 600);