import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    details: [], // {productSIze, quantity}
    totalPrice: 0,
};

function updateTotalPrice(state) {
    state.totalPrice = state.details.reduce((prevPrice, currDetail) => {
        return prevPrice + currDetail.quantity * currDetail.importPrice;
    }, 0);
}

export const importSlice = createSlice({
    name: 'import',
    initialState,
    reducers: {
        // payload {productSize, importPrice}
        add: (state, action) => {
            //add
            const indexDetail = state.details.findIndex(
                (detail) => detail.productSize._id === action.payload.productSize._id
            );
            if (indexDetail !== -1) {
                return state;
            } else {
                state.details.push({
                    productSize: action.payload.productSize,
                    importPrice: action.payload.importPrice,
                    quantity: 1,
                });
            }
            updateTotalPrice(state);
        },

        // payload: {_id}
        remove: (state, action) => {
            state.details = state.details.filter(
                (detail) => detail.productSize._id !== action.payload
            );
            updateTotalPrice(state);
        },

        // payload: {_id, quantity}
        updateQuantity: (state, action) => {
            const indexDetail = state.details.findIndex(
                (detail) => detail.productSize._id === action.payload._id
            );
            if (indexDetail !== -1) {
                if (Number(action.payload.quantity) <= 0) {
                    return state;
                }
                state.details[indexDetail].quantity = Number(action.payload.quantity);
            }
            updateTotalPrice(state);
        },
        reset: () => initialState,
    },
});

// Action creators are generated for each case reducer function
const importReducer = importSlice.reducer;
const importActions = importSlice.actions;

export default importReducer;
export { importActions };
