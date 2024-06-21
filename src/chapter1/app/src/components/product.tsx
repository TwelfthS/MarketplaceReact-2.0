import * as React from 'react'
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import userService from "../services/user.service"

import '../style.scss'
import { useAppSelector, useAppDispatch } from '../hooks'
import { setMessage } from "../reducers/messageSlice"
import { updateCart } from "../reducers/userSlice"
import { Item } from '../types'
import { AxiosError } from 'axios'

function Product() {
    const params = useParams()
    const itemId = params.itemId || '-1'
    const [data, setData] = useState<Item | null>(null)
    const [date, setDate] = useState('')
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const message = useAppSelector((state) => state.message.message)
    const cart = useAppSelector((state) => state.user.data)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        userService.GetProduct(parseInt(itemId))
            .then((data) => {
                if (data) {
                    setData(data)
                    if (data.createdAt) {
                        setDate(new Date(data.createdAt).toLocaleString('ru', { dateStyle: 'short', timeStyle: 'short' }))
                    }
                }
            })
            .catch((err) => {
                if (err instanceof AxiosError) {
                    dispatch(setMessage(err))
                } else {
                    console.log(err)
                }
            })
    }, [itemId, dispatch])
    const addCart = async (itemId: number) => {
        if (isLoggedIn) {
            try {
                await userService.addCart(itemId)
                dispatch(updateCart())
                navigate('/cart')
            } catch(err) {
                dispatch(setMessage(err))
            }
        } else {
            navigate('/signin', {state: itemId})
        }
    }
    if (!data) {
        return <p>Item not found</p>
    }
    return (
        <div className='d-flex flex-row flex-wrap'>
            <div className='product-image-wrapper'>
                <img alt={data.name} src={data.image}/>
            </div>
            <div className='product-desc'>
                <h1>{data.name}</h1>
                <p>Описание: {data.description}</p>
                <p>Опубликовано: {date}</p>
            </div>
            <div className='product-desc'>
                <p>Цена: {data.price}</p>
                {!cart.map(item => item.id).includes(parseInt(itemId)) && <button className='styled-button' onClick={() => addCart(parseInt(itemId))}>В корзину</button>}
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


export default Product