export const MOV_API_URL = "https://api.nomoreparties.co";

// Время в минутах, меньше которого фильм считаем короткометражным
export const SHORT_MOVIE = 40;

// Количество создаваемых и добавляемых карточек в зависимости от ширины
export const CARDS_RENDER_SETTINGS = {
    base: {
        width: 991,
        cards: {
            total: 12,
            more: 3,
        },
    },
    desktop: {
        width: 768,
        cards: {
            total: 8,
            more: 2,
        },
    },
    tablet: {
        width: 321,
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