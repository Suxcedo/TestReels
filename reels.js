// reels.js
const supabase = supabase.createClient(
  'https://bojsjxlolzxwvueiuviv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvanNqeGxvbHp4d3Z1ZWl1dml2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4ODM1NTQsImV4cCI6MjA2NzQ1OTU1NH0.kqdHP7uxhBaPUShoYODzeNKHbfj_u7b8rocQ-tvOsGg'
);

// Cloudinary config
const cloudName = 'dzorvvwp8';
const uploadPreset = 'suxcedo_reels_uploads';

// DOM elements
const profilePicEl = document.getElementById('profile-pic');
const usernameEl = document.getElementById('username');
const updateBtn = document.getElementById('update-profile-btn');

let currentUser = null;

// Load and display user profile
async function loadUserProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    window.location.href = 'login.html';
    return;
  }
  currentUser = user;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('username, avatar_url')
    .eq('id', user.id)
    .single();

  if (error || !profile) {
    alert('Failed to load profile');
    return;
  }

  profilePicEl.src = profile.avatar_url || 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  usernameEl.textContent = profile.username;
}

// Upload image to Cloudinary
async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
    method: 'POST',
    body: formData
  });

  const data = await res.json();
  return data.secure_url;
}

// Handle avatar update
updateBtn.addEventListener('click', async () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';

  fileInput.onchange = async () => {
    const file = fileInput.files[0];
    if (!file) return;

    const imageUrl = await uploadToCloudinary(file);
    if (!imageUrl) {
      alert('Upload failed.');
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update({ avatar_url: imageUrl })
      .eq('id', currentUser.id);

    if (error) {
      alert('Failed to update avatar.');
    } else {
      profilePicEl.src = imageUrl;
      alert('Profile picture updated!');
    }
  };

  fileInput.click();
});

loadUserProfile();
