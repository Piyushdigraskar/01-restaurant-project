import React from "react";
import { useState } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
    const [items, setItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);


    const addItemToCartHandler = (item) => {
        setItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex((prevItem) => prevItem.id === item.id);
            const updatedItems = [...prevItems];
    
            if (existingItemIndex !== -1) {
                // If the item already exists in the cart, increase its quantity
                updatedItems[existingItemIndex].amount += item.amount;
            } else {
                // If the item is new, add it to the cart
                updatedItems.push({ ...item });
            }
    
            return updatedItems;
        });
    
        setTotalAmount((prevTotalAmount) => {
            return prevTotalAmount + item.price * item.amount;
        });
    };
    
    const removeItemFromCartHandler = (id)=>{
        setItems((prevItems)=>{
            const existingItemIndex = prevItems.findIndex((prevItem) => prevItem.id === id);

            if (existingItemIndex !== -1) {
                // Create a new array without the item to be removed
                const updatedItems = prevItems.filter((_, index) => index !== existingItemIndex);
                
                // Return the updated array
                return updatedItems;
            }
            return prevItems;
        })
        setTotalAmount((prevTotalAmount) => {
            // Find the removed item from the items array
            const removedItem = items.find((item) => item.id === id);
    
            // If the removed item is found
            if (removedItem) {
                // Calculate the price of the removed item based on its amount
                const removedItemPrice = removedItem.price * removedItem.amount;
    
                // Subtract the price of the removed item from the total amount
                return prevTotalAmount - removedItemPrice;
            }
    
            // If the removed item is not found, return the original total amount
            return prevTotalAmount;
        });

    }
    const reduceItemQuantityHandler = (id) => {
        setItems((prevItems) => {
            return prevItems.map((item) => {
                if (item.id === id && item.amount > 1) {
                    // If the item ID matches and the quantity is greater than 1, reduce the quantity
                    return { ...item, amount: item.amount - 1 };
                }
                return item;
            });
        });
    };
    
    
    
    
    
    const cartContext = {
        items:items,
        totalAmount:totalAmount,
        addItem: addItemToCartHandler,
        removeItem:removeItemFromCartHandler,
        removeQuantity:reduceItemQuantityHandler,
    } 

    

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;