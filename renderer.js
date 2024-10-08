document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const logoutButton = document.getElementById('logout');
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('userToken');

  
  if (loginForm) {
    loginForm.addEventListener('submit', async function (event) {
      event.preventDefault();

      const username = document.getElementById('username').value;  
      const password = document.getElementById('password').value;  
      const message = document.getElementById('message');

      try {
        const response = await fetch('https://dummyjson.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username, password: password })  
        });

        const data = await response.json();  

        
        //console.log('Login response:', data);

        if (!response.ok) {
          throw new Error('Login failed');
        }

        
        if (data && data.id) {
          localStorage.setItem('userToken', data.token);  
          localStorage.setItem('userId', data.id);  

          message.textContent = "Login successful!";
          message.style.color = "green";

          setTimeout(() => {
            window.location.href = 'dashboard.html';  
          }, 1000);
        } else {
          throw new Error('Login response does not contain user ID');
        }
      } catch (error) {
        message.textContent = "Login failed: " + error.message;
        message.style.color = "red";
      }
    });
  }

 
  if (userId && token && window.location.pathname.includes('dashboard.html')) {
    (async function loadUserData() {
      try {
        const response = await fetch(`https://dummyjson.com/users/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();

      
        document.getElementById('userName').textContent = `${userData.firstName} ${userData.lastName}`;
        document.getElementById('userEmail').textContent = userData.email;
        document.getElementById('userImage').src = userData.image;  
      } catch (error) {
        console.error('Error:', error);
      }
    })();
  }

  
  if (logoutButton) {
    logoutButton.addEventListener('click', function () {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userId');
      window.location.href = 'login.html';
    });
  }


  if (!userId || !token) {
    if (window.location.pathname.includes('dashboard.html')) {
      window.location.href = 'login.html';
    }
  }
});
