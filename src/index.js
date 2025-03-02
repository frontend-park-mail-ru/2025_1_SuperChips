const root = document.getElementById('root');
const page = renderLogin();
root.appendChild(page);


const config = {
    menu: {
        'feed': {
            href: '/feed',
            text: 'Лента',
            render: renderFeed
        },
        'login': {
            href: '/login',
            text: 'Авторизация',
            render: renderLogin
        },
        'signup': {
            href: '/signup',
            text: 'Регистрация',
            render: renderSignup
        }
    }
};

const appState = {
    activePageLink: null,
};


function renderLogin() {
    const page = document.createElement('div');
    page.classList.add('login-page');
    renderBackground(page);

    const container = document.createElement('div');
    container.classList.add('login-container');
    page.appendChild(container);

    const loginBox = document.createElement('form');
    loginBox.classList.add('login-box-1');
    loginBox.innerHTML += `
    <h1 class="header">Вход</h1>
    <label class="subheader">Добро пожаловать в flow!</label>
    `
    container.appendChild(loginBox);

    const loginForm = document.createElement('form');
    loginForm.classList.add('login-form');
    loginBox.appendChild(loginForm)

    const inputs = [
        {type: 'email', id: 'email', inputLabel: 'Email', errorMessage: 'Неправильный формат почты'},
        {type: 'password', id: 'password', inputLabel: 'Пароль', errorMessage: 'Неправильный пароль или почта'}
    ];

    inputs.forEach((item) => {
        const input = createInput(item);
        loginForm.appendChild(input);
    })

    const submitBtn = document.createElement('button');
    submitBtn.classList.add('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Вход';
    loginForm.appendChild(submitBtn);

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if (validateEmail(email) && validatePassword(password)) {
            goToPage('feed');
        }
    });

    const redirect = document.createElement('div');
    redirect.classList.add('login-redirect');
    redirect.textContent = 'Еще нет аккаунта?'
    loginForm.appendChild(redirect)

    const redirectBtn = document.createElement('a');
    redirectBtn.classList.add('label', 'bold', 'redirect');
    redirect.appendChild(redirectBtn);
    redirectBtn.text = ' Регистрация';

    redirectBtn.addEventListener('click', (event) => {
       event.preventDefault();
       goToPage('signup');
    });

    return page
}

function renderSignup() {
    const page = document.createElement('div');
    page.classList.add('signup-page')
    renderBackground(page);

    const container = document.createElement('div');
    container.classList.add('signup-container');
    page.appendChild(container);

    const signupBox = document.createElement('div');
    signupBox.classList.add('signup-box-1');
    container.appendChild(signupBox);

    signupBox.innerHTML += `
    <h1 class="header">Регистрация</h1>
    <label class="subheader">Еще пару шагов и Вы с flow!</label>
    `

    const signupForm = document.createElement('div');
    signupForm.classList.add('signup-form');
    signupBox.appendChild(signupForm);

    const inputs = [
        {type: 'email', id: 'email', inputLabel: 'Email', errorMessage: 'Неправильный формат почты'},
        {type: 'text', id: 'nickname', inputLabel: 'Имя пользователя', errorMessage: 'Это имя уже занято'},
        {type: 'date', id: 'birthday', inputLabel: 'Дата рождения', errorMessage: 'Неправильный формат даты'},
        {type: 'password', id: 'password', inputLabel: 'Пароль', errorMessage: 'Пароль должен быть длиной не менее 8 символов'},
        {type: 'password', id: 'password-confirm', inputLabel: 'Пароль еще раз', errorMessage: 'Пароли не совпадают'},
    ];

    inputs.forEach((item) => {
        const input = createInput(item);
        signupForm.appendChild(input);
    });

    const passwordConfirm = signupForm.querySelector('#password-confirm');
    passwordConfirm.addEventListener('change', () => {
        const passwordValue = signupForm.querySelector('#password').value;
        const value = passwordConfirm.value;

        const container = signupForm.querySelector('#password-confirm-container');
        const image = container.querySelector('img');
        // const message = container.querySelector('#password-confirm-error');

        alert(image);
        alert(message);
        if (passwordValue === value) {

        }
    });

    const submitBtn = document.createElement('button');
    submitBtn.classList.add('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Регистрация';
    signupForm.appendChild(submitBtn);

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const inputData = {
            email: document.getElementById('email').value,
            nickname: document.getElementById('nickname').value,
            birthday: document.getElementById('birthday').value,
            password: document.getElementById('password').value,
            passwordConfirm: document.getElementById('password-confirm').value
        };

        for (let key in inputData) {
            console.log(inputData[key]);
        }

        const pass = validateSignup(inputData);
        if (Object.values(pass).every(item => item)) {
            goToPage('feed');
        } else {
            alert('validation not passed')
        }
    });

    const redirect = document.createElement('div');
    redirect.classList.add('signup-redirect');
    redirect.textContent = 'Уже есть аккаунт?'
    signupForm.appendChild(redirect)

    const redirectBtn = document.createElement('a');
    redirectBtn.classList.add('label', 'bold', 'redirect');
    redirect.appendChild(redirectBtn);
    redirectBtn.text = ' Войти';

    redirectBtn.addEventListener('click', (event) => {
        event.preventDefault();
        goToPage('login');
    });

    return page;
}

function renderFeed() {
    const page = document.createElement('div');
    page.classList.add('index-container');

    const navbar = createNavbar();
    page.appendChild(navbar);

    const sidebar = createSidebar();
    page.appendChild(sidebar);

    const feed = document.createElement('div');
    feed.classList.add('feed');
    feed.id = 'masonry-container';
    page.appendChild(feed);

    const logout = page.querySelector('#logout');
    logout.addEventListener('click', (event) => {
        event.preventDefault();

        goToPage('login');
    });


    const classes = ['skeleton-1', 'skeleton-2', 'skeleton-3'];
    function randInt(min, max) {
        return Math.floor(Math.random() * (max-min+1))
    }

    for (let i=0; i<100; i++) {
        const elem = document.createElement('div');
        const rand = classes[randInt(0, classes.length - 1)];
        elem.classList.add(rand);

        feed.appendChild(elem);
    }

    return page;
}


function createInput({type, id, inputLabel, errorMessage}) {
    const inputContainer = document.createElement('div');
    inputContainer.innerHTML = `
        <label for=${id}>${inputLabel}</label>
        <div class='input-container' id="${id}-container">
            <input type=${type} class='input-container__field' id=${id}>
            <img src='/public/icons/error-icon.svg' class='input-container__error hidden' aria-hidden='true' alt=''>
        </div>
        <p class='error-message error-label hidden' id=${id}-error>${errorMessage}</p>
    `;

    const inputField = inputContainer.querySelector('input');
    inputField.addEventListener('change', () => {

        const inputData = inputField.value;
        let valid = true;

        switch (id) {
            case 'email':
                valid = validateEmail(inputData);
                break;
            case 'nickname':
                valid = validateNickname(inputData);
                break;
            case 'date':
                valid = validateBirthday(inputData);
                break;
            case 'password':
                valid = validatePassword(inputData);
                break;
            default:
                break;
        }

        const icon = inputContainer.querySelector('img');
        const message = inputContainer.querySelector('p');
        if (!valid && inputData !== '') {
            icon.classList.remove('hidden');
            message.classList.remove('hidden');
            return;
        }

        if (!icon.classList.contains('hidden')) {
            icon.classList.add('hidden');
        }
        if (!message.classList.contains('hidden')) {
            message.classList.add('hidden');
        }
    });

    return inputContainer;
}

function createSidebarButton({id, source, alt}) {
    const button = document.createElement('a');
    button.id = id;
    button.classList.add('sidebar-button');

    const image = document.createElement('img');
    image.src = source;
    image.alt = alt;

    button.appendChild(image);

    return button;
}

function createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');
    sidebar.id = 'sidebar';

    const sidebarButtons = document.createElement('div');
    sidebarButtons.classList.add('sidebar__button-container');
    sidebar.appendChild(sidebarButtons);

    const buttons = [
        {id: 'newPin', source: '/public/icons/new-pin-icon.svg', alt: 'add new pin'},
        {id: 'chats', source: '/public/icons/chat-icon.svg', alt: 'chats'},
        {id: 'logout', source: '/public/icons/log-out.svg', alt: 'logout'}
    ];

    buttons.forEach((item) => {
        const button = createSidebarButton(item);
        sidebarButtons.appendChild(button);
    });

    return sidebar;
}

function createNavbar() {
    const navbar = document.createElement('div');
    navbar.classList.add('navbar');
    navbar.innerHTML += `
    <img src="/public/icons/logo-small.svg" class="navbar-logo" alt="site logo">
    <input type='text' class='search-form' placeholder='Text for search...' id='search'>
    <img src="/public/img/pfp1.jpg" class="profile-picture" alt="profile picture">
    `;

    return navbar
}

function renderBackground(page) {
    const logo = document.createElement('img');
    logo.src = '/public/img/logo.png';
    logo.classList.add('login-page__logo');
    logo.alt = 'site logo';

    const backgroundVector = document.createElement('img');
    backgroundVector.src = '/public/img/line-1.png';
    backgroundVector.classList.add('background-vector');
    backgroundVector.ariaHidden = 'true';

    page.appendChild(logo);
    page.appendChild(backgroundVector);
}


function validateSignup({email, nickname, birthday, password, passwordConfirm}) {
    const result = {
        email: true,
        nickname: true,
        birthday: true,
        password: true,
        passwordConfirm: true
    }

    if (!validateEmail(email)) {
        result.email = false;
    }

    if (!validateNickname(nickname)) {
        result.nickname = false;
    }

    if (!validateBirthday(birthday)) {
        result.birthday = false;
    }

    if (!validatePassword(password)) {
        result.password = false;
    }

    if (password !== passwordConfirm) {
        result.passwordConfirm = false;
    }

    return result;
}

const validatePassword = (password) => {
    const regex = /^[a-zA-Z0-9_]+$/;

    return (password.length >= 8) && regex.test(password);
}

const validateBirthday = (birthday) => {
    const today = new Date();
    const date = new Date(birthday);

    return !(birthday === '' || date.getTime() > today.getTime() || date.getFullYear() <= 1900);
}

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return email && emailRegex.test(email);
}

const validateNickname = (nickname) => {
    return nickname !== '';
}



function goToPage(page) {
    root.innerHTML = '';

    appState.activePageLink = page;

    const element = config.menu[page].render();

    root.appendChild(element);
    if (page === 'feed') {
        const container = element.querySelector('#masonry-container');
        const msn = new Masonry(container, {
            itemSelector: '.skeleton-1, .skeleton-2, .skeleton-3',
            columnWidth: '.skeleton-1',
            percentPosition: true,
            gutter: 32,
            transitionDuration: '0.3s'
        });
        root.addEventListener('DOMContentLoaded', () => {msn});
    }
}
