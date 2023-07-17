export const MOV_API_URL = "https://api.nomoreparties.co";

// Время в минутах, меньше которого фильм считаем короткометражным
export const SHORT_MOVIE = 40;
 
// REGEX Ограничиваем ввод буквами, дефисом, и пробелом
export const USER_NAME_REGEX = "^[A-Za-zА-Яа-яЁё\\-\\s]+$";

// Количество создаваемых и добавляемых карточек в зависимости от ширины
export const CARDS_RENDER_SETTINGS = {
    base: {
        width: 1280,
        cards: {
            total: 12,
            more: 3,
        },
    },
    desktop: {
        width: 991,
        cards: {
            total: 12,
            more: 2,
        },
    },
    tablet: {
        width: 768,
        cards: {
            total: 8,
            more: 2,
        },
    },
    mobile: {
        width: 320,
        cards: {
            total: 5,
            more: 2,
        },
    },
};