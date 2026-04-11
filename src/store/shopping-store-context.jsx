import React from "react";

export const ShoppingStoreContext = React.createContext({
    items: [],
    onAddToCart: () => {},
    onUpdateCart: () => {},
});