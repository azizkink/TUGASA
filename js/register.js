document.getElementById("btnRegister").addEventListener("click", async function(e) {
  e.preventDefault();
stella
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmpass = document.getElementById("confirmpass").value.trim();

  if (!username || !email || !password || !confirmpass) {
    alert("Semua field harus diisi!");
    return;
  }

  if (password !== confirmpass) {
    alert("Password tidak sama!");
    return;
  }

  try {
    const res = await fetch("http://localhost:7000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Registrasi gagal!");
      return;
    }

    alert("Registrasi berhasil! Silakan login.");
    window.location.href = "login.html";

  } catch (err) {
    console.error(err);
    alert("Gagal menghubungi server!");
  }
});
