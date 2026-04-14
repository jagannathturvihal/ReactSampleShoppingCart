import React from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const ShoppingStoreContext = React.createContext({
    items: [],
    onAddToCart: () => { },
    onUpdateCart: () => { },
});

function shoppingCartReducer(state, action) {
    if (action.type === "ADD_ITEM") {
        const updatedItems = [...state.items];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload.id
        );
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload.id);
            updatedItems.push({
                id: action.payload.id,
                name: product.title,
                price: product.price,
                quantity: 1,
            });
        }

        return {
            items: updatedItems,
        };
    }

    if (action.type === "UPDATE_CART_ITEM") {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
        };
    }
    return state;
}

export default function CartContextProvider({ children }) {
    const [shoppingCartState, shoppingCartDispatch] = React.useReducer(
        shoppingCartReducer,
        {
            items: [],
        }
    );

    function handleAddItemToCart(id) {
        shoppingCartDispatch({
            type: "ADD_ITEM",
            payload: {
                id
            }
        });
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatch({
            type: "UPDATE_CART_ITEM",
            payload: {
                productId,
                amount
            }
        });
    }

    const contextValue = {
        items: shoppingCartState.items,
        onAddToCart: handleAddItemToCart,
        onUpdateCart: handleUpdateCartItemQuantity,
    };

    return (
        <ShoppingStoreContext.Provider value={contextValue}>
            {children}
        </ShoppingStoreContext.Provider>
    );
};