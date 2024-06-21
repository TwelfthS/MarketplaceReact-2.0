import * as React from 'react'
import { useEffect, useState } from "react"
import userService from "../services/user.service"
import { Navigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from '../hooks'
import '../style.scss'
import { setMessage } from "../reducers/messageSlice"
import { Order } from '../types'
import { AxiosError } from 'axios'
import { Link } from 'react-router-dom'


function MyOrders() {
    const [data, setData] = useState<Order[]>([])
    const [sortType, setSortType] = useState("date")
    const [sortReverse, setSortReverse] = useState(false)
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    useEffect(() => {
        userService.getMyOrders().then((data) => {
            setData(data)
            if (data && data.length > 0) {
                setData(data => [...data].sort((a: Order, b: Order) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))
            }
        }).catch((err) => {
            if (err instanceof AxiosError) {
                dispatch(setMessage(err))
            } else {
                console.log(err)
            }
        })
    }, [dispatch])
    if (!isLoggedIn) {
        <Navigate to='/' />
    }
    const sortOrders = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let str = e.target.value
        if (str.includes('D')) {
            setSortReverse(true)
            str = str.slice(0, -1)
        } else {
            setSortReverse(false)
        }
        setSortType(str)
    }
    useEffect(() => {
        if (sortType === "date") {
            setData(data => [...data].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))
        } else if (sortType === "cost") {
            setData(data => [...data].sort((a, b) => a.cost - b.cost))
        }
        if (sortReverse) {
            setData(data => [...data].reverse())
        }
    }, [sortType, sortReverse])
    if (data.length === 0) {
        return <div className='MarginedDiv'>
            <p>Ещё нет заказов</p>
        </div>
    }
    return (
        <div>
            <select onChange={sortOrders} className="sorter m-5">
                <option value="date">По дате (Возр.)</option>
                <option value="dateD">По дате (Уб.)</option>
                <option value="cost">По цене (Возр.)</option>
                <option value="costD">По цене (Уб.)</option>
            </select>
            <div className='cards-block'>
                {data.map((order) => {
                    return <div className='order-card' key={order.id}>
                        <div className='order-title'>
                            <h3>Заказ #{order.id}</h3>
                            <p>Дата заказа: {order.date}</p>
                        </div>
                        <div className="d-flex flex-row justify-content-evenly order-items">
                            {order.orderedItem.map((item) => {
                                return <div className='order-product'>
                                    <Link className='product-img-link' to={"/products/" + item.id}>
                                        <img alt={item.name} src={item.image} />
                                    </Link>
                                    <p>Кол-во: {item.OrderItem.quantity}</p>
                                </div>
                            })}
                        </div>
                        <div className='order-price'>
                            <p>Цена: {order.cost} руб</p>
                            <p>Всего: {order.orderedItem.reduce((sum, item) => sum + item.OrderItem.quantity, 0)}</p>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default MyOrders