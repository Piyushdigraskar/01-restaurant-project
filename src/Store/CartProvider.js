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
                updatedItems[existingItemIndex].amount += 1;
            } else {
                // If the item is new, add it to the cart
                updatedItems.push({ ...item });
            }
    
            return updatedItems;
        });
    
        setTotalAmount((prevTotalAmount) => {

            const addedItem = items.find((prevItem) => prevItem.id === item.id);
            if(!addedItem){
                return prevTotalAmount + item.price*item.amount;
            }
            return prevTotalAmount + item.price;
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
            // Map through the items and reduce the quantity of the item with the given id
            const updatedItems = prevItems.map((item) => {
                if (item.id === id) {
                    // If the item ID matches, reduce the quantity
                    return { ...item, amount: item.amount - 1 };
                }
                return item;
            }).filter(item => item.amount > 0); // Filter out items with quantity zero
    
            return updatedItems;
        });
    
        setTotalAmount((prevTotalAmount) => {
            // Find the item whose quantity is reduced
            const reducedItem = items.find((item) => item.id === id);
    
            // If the reduced item is found
            if (reducedItem) {
                // Calculate the reduction in price based on the reduced quantity
                const reducedItemPrice = reducedItem.price;
    
                // Subtract the reduced price from the total amount
                const newTotalAmount = prevTotalAmount - reducedItemPrice;
    
                // Ensure total amount doesn't go below zero
                return Math.max(0, newTotalAmount);
            }
    
            // If the reduced item is not found, return the original total amount
            return prevTotalAmount;
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