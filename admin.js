const supa = supabase.createClient(
  'https://bojsjxlolzxwvueiuviv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvanNqeGxvbHp4d3Z1ZWl1dml2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4ODM1NTQsImV4cCI6MjA2NzQ1OTU1NH0.kqdHP7uxhBaPUShoYODzeNKHbfj_u7b8rocQ-tvOsGg'
);

document.addEventListener("DOMContentLoaded", async () => {
  const { data: { user } } = await supa.auth.getUser();

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // Get profile info
  const { data: profile, error } = await supa
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error || !profile || profile.role !== 'admin') {
    alert("You are not authorized to access this page.");
    window.location.href = "login.html";
    return;
  }

  // Show admin info
  document.getElementById("admin-username").innerText = `Username: ${profile.username}`;
  
  if (profile.avatar_url) {
    const avatar = document.getElementById("admin-avatar");
    avatar.src = profile.avatar_url;
    avatar.style.display = "block";
  }
});

// Logout button
function logout() {
  supa.auth.signOut().then(() => {
    window.location.href = "login.html";
  });
}
