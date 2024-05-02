import * as React from 'react'
import { useEffect, useState } from "react"
import userService from "../services/user.service"
import { useNavigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from '../hooks'

import { setMessage } from "../reducers/messageSlice"
import { AddButton, CardImg, CardsDiv, ImgDiv, LinkCard, ProductCard, Search, SearchDiv, Sorter } from "./styled"
import { updateCart } from "../reducers/userSlice"
import CartAdder from "./cart-adder"
import { Item } from '../types'
import { AxiosError } from 'axios'


function Products() {
    const [data, setData] = useState<Item[]>([])
    const [search, setSearch] = useState("")
    const [sortType, setSortType] = useState("aphabet")
    const [sortReverse, setSortReverse] = useState(false)
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const message = useAppSelector((state) => state.message.message)
    const cart = useAppSelector((state) => state.user.data)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    useEffect(() => {
        userService.GetProducts().then((data) => {
            if (data && data.length > 0) {
                setData(data.sort((a: Item, b: Item) => a.name.localeCompare(b.name, 'en')))
            }
        }).catch((err) => {
            if (err instanceof AxiosError) {
                dispatch(setMessage(err))
            } else {
                console.log(err)
            }
        })
    }, [dispatch])
    const addCart = async (itemId: number) => {
        if (isLoggedIn) {
            try {
                await userService.addCart(itemId)
                dispatch(updateCart())
            } catch(err) {
                dispatch(setMessage(err))
            }
        } else {
            navigate('/signin', {state: itemId})
        }
    }
    const changeSeacrh = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value.toLowerCase())
    }

    const sortProducts = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
            if (sortType === "alphabet") {
                setData(data => [...data].sort((a, b) => a.name.localeCompare(b.name, 'en')))
            } else if (sortType === "date") {
                setData(data => [...data].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))
            } else if (sortType === "price") {
                setData(data => [...data].sort((a, b) => a.price - b.price))
            }
            if (sortReverse) {
                setData(data => [...data].reverse())
            }

    }, [sortType, sortReverse])

    return (
        <div>
            <div className="d-flex flex-row flex-wrap">
                <SearchDiv>
                    <Search id="search" onChange={changeSeacrh}></Search>
                    <label htmlFor="search">Поиск</label>
                </SearchDiv>
                <Sorter onChange={sortProducts}>
                    <option value="alphabet">По алфавиту (Возр.)</option>
                    <option value="alphabetD">По алфавиту (Уб.)</option>
                    <option value="date">По дате (Возр.)</option>
                    <option value="dateD">По дате (Уб.)</option>
                    <option value="price">По цене (Возр.)</option>
                    <option value="priceD">По цене (Уб.)</option>
                </Sorter>
            </div>
            <CardsDiv>

                {data.map((item) => {
                    if (item.name.toLowerCase().includes(search)) {
                        return <ProductCard key={item.id}>
                            <ImgDiv>
                                <CardImg src={item.image}></CardImg>
                            </ImgDiv>
                            <div className="card-body">
                                <LinkCard to={"/products/" + item.id}>{item.name}</LinkCard>
                                <p>{item.description}</p>
                                <p>{item.price} руб</p>
                                {cart.map(cartItem => {
                                    if (cartItem.id === item.id) {
                                        return <CartAdder key={cartItem.id} item={cartItem} cart={false}/>
                                    }
                                    return ''
                                })}
                                {!cart.map(item => item.id).includes(item.id) && <AddButton onClick={() => addCart(item.id)}>Добавить в корзину</AddButton>}
                            </div>
                        </ProductCard>
                    }
                    return ''
                })}
                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                        {message}
                        </div>
                    </div>
                )}
            </CardsDiv>
        </div>
    )
}

export default Products