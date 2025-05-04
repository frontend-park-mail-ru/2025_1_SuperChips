export const API_BASE_URL = '/api/v1';
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 МБ
export const VALID_IMAGE_EXTENSIONS = ['jpg', 'png', 'jpeg', 'gif'];
export const USER_SAVED_PINS_BOARD = 'Сохраненные';
export const USER_OWN_PINS_BOARD = 'Созданные вами';
export const VKID_APP_ID = 53455772;

export const WEBSOCKET_URL = process.env.NODE_ENV === 'production'
    ? 'wss://' + 'yourflow.ru' + API_BASE_URL + '/ws'
    : 'wss://' + 'localhost' + API_BASE_URL + '/ws';
