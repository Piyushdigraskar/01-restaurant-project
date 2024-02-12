import React from "react";
import { useState } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
    const [items, setItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

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
    

    const addItemToCartHandler = (item)=>{
        setItems((prevItems)=>{
            const existingItemsIndex = prevItems.findIndex((prevItem) => prevItem.id === item.id);
            const updatedItems = [...prevItems];

            if(existingItemsIndex !== -1){
                updatedItems[existingItemsIndex].amount += item.amount;
            }
            else{
                updatedItems.push(item);
            }
            return updatedItems;
        })
        setTotalAmount((prevTotalAmount) => {
            // Find the added item from the items array
            const addedItem = items.find((cartItem) => cartItem.id === item.id);
    
            // Calculate the price of the added item based on its amount
            if(addedItem){
                const addedItemPrice = addedItem.price * addedItem.amount;
                return prevTotalAmount + addedItemPrice;
            }
            else{
                return prevTotalAmount;
            }
    
            // Return the previous total amount plus the price of the added item
            
        });
    };
    const cartContext = {
        items:items,
        totalAmount:totalAmount,
        addItem: addItemToCartHandler,
        removeItem:removeItemFromCartHandler
    } 

    

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;