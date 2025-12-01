document.getElementById("btnLogin").addEventListener("click", async function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value.trim();

  if (!email || !password) {
    alert("Email dan password harus diisi!");
    return;
  }

  try {
    const res = await fetch("http://localhost:7000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Email atau password salah!");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.user.role);

    if (data.user.role === "tu") {
      window.location.href = "home.html";
    } else if (data.user.role === "kepsek") {
      window.location.href = "kepsek-home.html";
    } else {
      window.location.href = "user-home.html";
    }

  } catch (err) {
    console.error(err);
    alert("Gagal menghubungi server!");
  }
});
