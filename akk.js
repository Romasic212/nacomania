document.addEventListener('DOMContentLoaded', function() {

    const loginForm = document.getElementById('loginForm');
    const loginFormInner = document.getElementById('loginFormInner');
    const registerForm = document.getElementById('registerForm');
    const registerFormInner = document.getElementById('registerFormInner');
    const loginErrorMessage = document.getElementById('loginErrorMessage');
    const registerErrorMessage = document.getElementById('registerErrorMessage');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const loggedInUsernameSpan = document.getElementById('loggedInUsername');
    const logoutButton = document.getElementById('logoutButton');
    const showRegisterFormLink = document.getElementById('showRegisterForm');
    const showLoginFormLink = document.getElementById('showLoginForm');

    // ----------------------------------------------------------------
    // Local Storage Functions
    // ----------------------------------------------------------------

    function saveUserData(username, password) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        updateHeader();
    }

    function getUserData() {
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        return {
            username,
            password
        };
    }

    function clearUserData() {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        updateHeader();
    }

    // ----------------------------------------------------------------
    // UI Functions
    // ----------------------------------------------------------------

    function showWelcomeMessage(username) {
        loginForm.classList.add('hidden');
        registerForm.classList.add('hidden');
        welcomeMessage.classList.remove('hidden');
        loggedInUsernameSpan.textContent = username;
    }

    function showLoginForm() {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        welcomeMessage.classList.add('hidden');
    }

    // ----------------------------------------------------------------
    // Event Listener Functions
    // ----------------------------------------------------------------

    logoutButton.addEventListener('click', function() {
        clearUserData();
        showLoginForm();
        window.location.href = './index.html'
    });

    loginFormInner.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('usernameLogin').value;
        const password = document.getElementById('passwordLogin').value;
        const storedUserData = getUserData();

        if (storedUserData && storedUserData.username === username && storedUserData.password === password) {
            loginErrorMessage.textContent = '';
            loginErrorMessage.classList.remove('error-message');
            showWelcomeMessage(username);
            window.location.href = './index.html'
        } else {
            loginErrorMessage.classList.add('error-message');
            loginErrorMessage.textContent = 'Неправильное имя пользователя или пароль.';
        }
    });

    registerFormInner.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('usernameRegister').value;
        const password = document.getElementById('passwordRegister').value;
        if (getUserData() && getUserData().username === username) {

            registerErrorMessage.classList.add('error-message');
            registerErrorMessage.textContent = 'Это имя пользователя уже занято. Пожалуйста, выберите другое.';
        } else {
            saveUserData(username, password);
            registerErrorMessage.textContent = '';
            registerErrorMessage.classList.remove('error-message');
            window.location.href = './index.html'
            showWelcomeMessage(username);
        }
    });

    showRegisterFormLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });

    showLoginFormLink.addEventListener('click', function(event) {
        event.preventDefault();
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    // ----------------------------------------------------------------
    // Initialization
    // ----------------------------------------------------------------

    // Initial check on page load to show forms or welcome message
    const storedUserData = getUserData();
    if (storedUserData && storedUserData.username && storedUserData.password) {
        showWelcomeMessage(storedUserData.username);
    } else {
        showLoginForm();
    }

    // ----------------------------------------------------------------
    // Additional UI Functions (Updated)
    // ----------------------------------------------------------------

    function updateHeader() {
        const navItems = document.querySelector('.nav-items');
        const userData = getUserData();
        const userProfile = document.getElementById('userProfile');
    
        // Clear previous content
        userProfile.innerHTML = '';
    
        // If user is logged in
        if (userData && userData.username) {
            const userProfileElement = document.createElement('div');
            userProfileElement.classList.add('user-profile-element');
            const userIcon = document.createElement('i');
            userIcon.classList.add('fas', 'fa-user-circle');
    
            const usernameProfileSpan = document.createElement('span');
            usernameProfileSpan.textContent = ` ${userData.username}`;
    
            userProfileElement.appendChild(userIcon);
            userProfileElement.appendChild(usernameProfileSpan);
    
            // Create the logout link with an icon
            const logoutLink = document.createElement('a');
            logoutLink.href = "#";
            logoutLink.innerHTML = '<i class="fas fa-sign-out-alt"></i>'; // Use a Font Awesome icon
            logoutLink.title = "Выйти"; // Add a tooltip for accessibility
            logoutLink.style.marginLeft = '10px'; // Add some spacing
    
            logoutLink.addEventListener('click', function(event) {
                event.preventDefault();
                clearUserData(); // Clear local storage
                updateHeader(); // Update the display
                window.location.href = './index.html'; // Redirect
            });
    
            userProfileElement.appendChild(logoutLink);
            userProfile.appendChild(userProfileElement);
    
    
            const accountLink = navItems.querySelector('.account-link');
            if (accountLink) { //remove accountLink
                accountLink.remove();
            }
            const akkPageLink = document.querySelector('a[href="akk.html"]');
            if (akkPageLink) {
                akkPageLink.style.display = "none";
            }
    
        } else {
            const loginLink = document.createElement('a');
            loginLink.href = "akk.html";
            loginLink.textContent = "Войти";
            userProfile.appendChild(loginLink);
    
            const akkPageLink = document.querySelector('a[href="akk.html"]');
            if (akkPageLink) {
                akkPageLink.style.display = "block";
            }
            const accountLink = navItems.querySelector('.account-link');
            if (accountLink) {
    
                accountLink.remove();
            }
        }
    }
    // Call updateHeader on page load
    updateHeader();
});