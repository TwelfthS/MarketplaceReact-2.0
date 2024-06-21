import * as React from 'react'
import userService from "../services/user.service"
import '../style.scss'
import { useAppDispatch } from "../hooks"
import { updateCart } from "../reducers/userSlice"
import { ItemCart as Item } from "../types"


const CartAdder = ({item, cart}: {item: Item, cart: boolean}) => {
    const dispatch = useAppDispatch()

    const add = (itemId: number, change: number | string) => {
        userService.addItem(itemId, change).then(() => {
            dispatch(updateCart())
        }).catch((err) => {
            console.log(err)
        })
    }

    const remove = (itemId: number, change: number | string, currentQuantity: number) => {
        if (currentQuantity > 1) {
            userService.addItem(itemId, change).then(() => {
                dispatch(updateCart())
            }).catch((err) => {
                console.log(err)
            })
        } else if (!cart) {
            userService.addItem(itemId, 'removeAll').then((response) => {
                dispatch(updateCart())
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    return <div className="cart-adder">
        <button onClick={() => remove(item.id, -1, item.Cart.quantity)}>-</button>
        <p>{item.Cart.quantity}</p>
        <button onClick={() => add(item.id, 1)}>+</button>
    </div>
}

export default CartAdder