document.getElementById('registrationForm').addEventListener('submit', function (event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const message = document.getElementById('message');

  if (password !== confirmPassword) {
    message.textContent = "Passwords do not match!";
    message.style.color = "red";
  } else {
    message.textContent = "Registration successful!";
    message.style.color = "green";

    // Затримка для показу повідомлення і перенаправлення
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1000);  // Перенаправлення через 1 секунду
  }
});