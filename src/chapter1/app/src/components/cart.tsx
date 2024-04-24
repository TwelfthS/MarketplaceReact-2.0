import * as React from 'react'
import userService from "../services/user.service"
import { Navigate, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { CardImg, CardsDiv, ImgDiv, LinkCard, ProductCard, RemoveAllButton, StyledButton } from "./styled"
import CartAdder from "./cart-adder"
import { updateCart } from "../actions/user"
import { setError } from "../actions/errors"


function Cart() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const message = useSelector((state) => state.message.message)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const data = useSelector(state => state.user.data)

    const removeAll = (itemId) => {
        userService.addItem(itemId, 'removeAll').then(() => {
            dispatch(updateCart())
        }).catch((err) => {
            dispatch(setError(err))
        })
    }

    const createOrder = () => {
        userService.createOrder(data).then(() => {
            dispatch(updateCart())
            navigate('/my-orders')
        }).catch((err) => {
            dispatch(setError(err))
        })
    }

    if (!isLoggedIn) {
        return <Navigate to='/' />
    }

    if (!data || data.length === 0) {
        return <div className="m-5">
            <p>Корзина пуста</p>
            <StyledButton onClick={() => navigate('/')}>За покупками</StyledButton>
        </div>
    }

    return (
        <div className="d-flex justify-content-between flex-row">
            <CardsDiv>
                {data.map((item) => {
                    return <ProductCard key={item.id}>
                        <ImgDiv>
                            <CardImg src={item.image}></CardImg>
                        </ImgDiv>
                        <div className="card-body">
                            <LinkCard to={"/products/" + item.id}>{item.name}</LinkCard>
                            <p className="card-text">{item.description}</p>
                            <p className="card-text">{item.price} руб</p>
                            <CartAdder item={item} cart={true}/>
                            <RemoveAllButton onClick={() => removeAll(item.id)}>X</RemoveAllButton>
                        </div>
                    </ProductCard>
                })}
                
                
            </CardsDiv>
            <div style={{margin: '50px 10%', fontSize: '30px'}}>
                <p>Всего товаров: {data.reduce((sum, item) => sum + item.Cart.quantity, 0)}</p>
                <p>Итоговая цена: {data.reduce((sum, item) => sum + item.price * item.Cart.quantity, 0)}</p>
                {data.length > 0 && <StyledButton onClick={createOrder}>Купить</StyledButton>}
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