import React from "react";
import classes from './MealItemForm.module.css'
import Input from "../../UI/Input";
import CartContext from "../../../Store/cart-context";
import { useContext } from "react";

const MealItemForm = (props)=>{
    const cartctx = useContext(CartContext);

    const submitHandler = (event)=>{
        event.preventDefault();

        const enteredAmount = parseInt(event.target.amount.value);
        if (enteredAmount <= 0 || enteredAmount > 5) {
            return;
        }

        cartctx.addItem({
            id:props.id,
            name:props.name,
            price:props.price,
            amount:enteredAmount
        })

    }


    return <form className={classes.form} onSubmit={submitHandler}>
        <Input label="Amount" input={{
            id:"amount",
            type:'number',
            min:'1',
            max:'5',
            step:'1',
            defaultValue:'1'
        }}></Input>
        <button >+ Add</button>

    </form>
}

export default MealItemForm;