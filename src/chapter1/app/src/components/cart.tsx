import * as React from 'react'
import userService from "../services/user.service"
import { Navigate, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks"
import '../style.scss'
import CartAdder from "./cart-adder"
import { updateCart } from "../reducers/userSlice"
import { setMessage } from "../reducers/messageSlice"
import { AxiosError } from 'axios'
import { Link } from 'react-router-dom'


function Cart() {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const message = useAppSelector((state) => state.message.message)

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const data = useAppSelector(state => state.user.data)

    const removeAll = (itemId: number) => {
        userService.addItem(itemId, 'removeAll').then(() => {
            dispatch(updateCart())
        }).catch((err) => {
            if (err instanceof AxiosError) {
                dispatch(setMessage(err))
            } else {
                console.log(err)
            }
        })
    }

    const createOrder = () => {
        userService.createOrder(data).then(() => {
            dispatch(updateCart())
            navigate('/my-orders')
        }).catch((err) => {
            dispatch(setMessage(err))
        })
    }

    if (!isLoggedIn) {
        return <Navigate to='/' />
    }

    if (!data || data.length === 0) {
        return <div className="m-5">
            <p>Корзина пуста</p>
            <button className='styled-button' onClick={() => navigate('/')}>За покупками</button>
        </div>
    }

    return (
        <div className="d-flex justify-content-between flex-row">
            <div className='cards-block'>
                {data.map((item) => {
                    return <div className='product-card' key={item.id}>
                        <Link className='product-img-link' to={"/products/" + item.id}>
                            <img src={item.image}></img>
                        </Link>
                        <div className="card-body">
                            <h3>{item.name}</h3>
                            <p className="card-text">{item.description}</p>
                            <p className="card-text">{item.price} руб</p>
                            <CartAdder item={item} cart={true}/>
                            <button className='remove-all-button' onClick={() => removeAll(item.id)}>X</button>
                        </div>
                    </div>
                })}
                
                
            </div>
            <div className='cart-total'>
                <p>Всего товаров: {data.reduce((sum, item) => sum + item.Cart.quantity, 0)}</p>
                <p>Итоговая цена: {data.reduce((sum, item) => sum + item.price * item.Cart.quantity, 0)}</p>
                {data.length > 0 && <button className='styled-button' onClick={createOrder}>Купить</button>}
            </div>
            {message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                    {message}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart