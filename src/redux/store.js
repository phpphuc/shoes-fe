import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './slices/orderSlice';
import accountReducer from './slices/accountSlide';
import importReducer from './slices/importSlice';
import themeReducer from './slices/themeSlice';

const localStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    // Save to localStorage
    const state = store.getState();
    localStorage.setItem('oop_account', JSON.stringify(state.account));
    localStorage.setItem('darkMode', JSON.stringify(state.theme.darkMode));

    return result;
};

const reHydrateStore = () => {
    if (localStorage.getItem('oop_account') !== null) {
        return {
            order: {
                customer: {
                    name: '',
                    phone: '',
                    address: '',
                },
                details: [],
                totalPrice: 0,
            },
            account: JSON.parse(localStorage.getItem('oop_account')),
            theme: {
                darkMode: JSON.parse(localStorage.getItem('darkMode')) || false, // Phục hồi darkMode từ localStorage
            },
        };
    } else {
        return {
            order: {
                customer: {
                    name: '',
                    phone: '',
                    address: '',
                },
                details: [],
                totalPrice: 0,
            },
            account: null,
        };
    }
};

export const store = configureStore({
    reducer: { order: orderReducer, account: accountReducer, import: importReducer, theme: themeReducer },
    preloadedState: reHydrateStore(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});
