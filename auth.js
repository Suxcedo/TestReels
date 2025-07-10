const supa = supabase.createClient(
  'https://bojsjxlolzxwvueiuviv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvanNqeGxvbHp4d3Z1ZWl1dml2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4ODM1NTQsImV4cCI6MjA2NzQ1OTU1NH0.kqdHP7uxhBaPUShoYODzeNKHbfj_u7b8rocQ-tvOsGg' // replace with your anon key
);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");
  const signupBox = document.getElementById("signup-box");
  const confirmBox = document.getElementById("confirmation-box");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value;
    const username = form.username.value.trim();

    if (!username) {
      alert("Please enter a username.");
      return;
    }

    const { error } = await supa.auth.signUp({
      email,
      password
    });

    if (error) {
      alert("Signup failed: " + error.message);
      return;
    }

    // ✅ Don't insert profile yet — user must confirm email first
    signupBox.style.display = "none";
    confirmBox.style.display = "block";
  });
});
