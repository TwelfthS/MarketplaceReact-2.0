import * as React from 'react'
import userService from "../services/user.service"
import { CartButton } from "./styled"
import { useAppDispatch } from "../hooks"
import { updateCart } from "../reducers/user"
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

    return <div className="d-flex flex-row">
        <CartButton onClick={() => remove(item.id, -1, item.Cart.quantity)}>-</CartButton>
        <p style={{translate: '0 28%'}}>{item.Cart.quantity}</p>
        <CartButton onClick={() => add(item.id, 1)}>+</CartButton>
    </div>
}

export default CartAdder