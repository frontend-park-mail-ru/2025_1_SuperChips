class Api {
	constructor(apiBaseUrl, getCsrfToken) {
		this.apiBaseUrl = apiBaseUrl;
		this.getCsrfToken = getCsrfToken;
	}

	/**
	 * Получение данных пользователя
	 * @returns {Promise<any>}
	 */
	async getUserData() {
		const url = `${this.apiBaseUrl}/api/v1/auth/user`;
		const response = await fetch(url, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'X-XSRF-TOKEN': this.getCsrfToken(),
			},
		});

		if (!response.ok) {
			if (response.status === 401) {
				throw new Error('Unauthorized: Invalid or missing credentials');
			}
			const errorData = await response.json().catch(() => ({}));
			throw new Error(errorData.error || 'Failed to fetch user data');
		}

		return await response.json();
	}

	/**
	 * Вход пользователя
	 * @param {string} email
	 * @param {string} password
	 * @returns {Promise<boolean>}
	 */
	async login(email, password) {
		const url = `${this.apiBaseUrl}/api/v1/auth/login`;
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'X-XSRF-TOKEN': this.getCsrfToken(),
			},
			body: JSON.stringify({ email, password }),
		});

		if (!response.ok) {
			if (response.status === 400 || response.status === 403) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.error || 'Authentication failed');
			}
			throw new Error('Internal server error');
		}

		return true;
	}

	/**
	 * Регистрация нового пользователя
	 * @param {Object} userData
	 * @param {string} userData.username
	 * @param {string} userData.password
	 * @param {string} userData.birthday - в формате YYYY-MM-DD
	 * @param {string} userData.email
	 * @returns {Promise<boolean>} - true при успешной регистрации
	 */
	async register({ username, password, birthday, email }) {
		const url = `${this.apiBaseUrl}/api/v1/auth/registration`;
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'X-XSRF-TOKEN': this.getCsrfToken(),
			},
			body: JSON.stringify({ username, password, birthday, email }),
		});

		if (!response.ok) {
			if (response.status === 409) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(`Conflict: ${errorData.error || 'User already exists'}`);
			}
			if (response.status === 400) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(`Validation error: ${errorData.error || 'Invalid data'}`);
			}
			throw new Error('Registration failed');
		}

		return true;
	}

	/**
	 * Выход пользователя
	 * @returns {Promise<boolean>} - true при успешном выходе
	 */
	async logout() {
		const url = `${this.apiBaseUrl}/api/v1/auth/logout`;
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'X-XSRF-TOKEN': this.getCsrfToken(),
			},
		});

		if (!response.ok) {
			if (response.status === 401) {
				throw new Error('Already logged out');
			}
			throw new Error('Logout failed');
		}

		return true;
	}

	/**
	 * Проверяет валидность текущих кук авторизации
	 * @returns {Promise<boolean>} - true если куки валидны
	 */
	async checkAuthStatus() {
		try {
			await this.getUserData();
			return true;
		} catch (error) {
			if (error.message.includes('Unauthorized')) {
				return false;
			}
			throw error;
		}
	}

	/**
	 * Устанавливает куку в браузере
	 * @param {string} name - Название куки
	 * @param {string} value - Значение куки
	 * @param {Object} options - Опции (path, domain, expires, secure, sameSite)
	 */
	static setCookie(name, value, options = {}) {
		const {
			path = '/',
			domain = '',
			expires = '',
			secure = false,
			sameSite = 'Lax',
		} = options;

		let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
		cookie += `; path=${path}`;

		if (domain) cookie += `; domain=${domain}`;
		if (expires) cookie += `; expires=${expires}`;
		if (secure) cookie += '; Secure';
		cookie += `; SameSite=${sameSite}`;

		document.cookie = cookie;
	}

	/**
	 * Получает значение куки по имени
	 * @param {string} name - Название куки
	 * @returns {string|null} - Значение куки или null
	 */
	static getCookie(name) {
		const cookieName = encodeURIComponent(name) + '=';
		const cookies = document.cookie.split(';').map(c => c.trim());

		for (const cookie of cookies) {
			if (cookie.startsWith(cookieName)) {
				return decodeURIComponent(cookie.substring(cookieName.length));
			}
		}
		return null;
	}

	/**
	 * Удаляет куку
	 * @param {string} name - Название куки
	 * @param {Object} options - Опции (path, domain)
	 */
	static deleteCookie(name, options = {}) {
		this.setCookie(name, '', {
			...options,
			expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
		});
	}
}
