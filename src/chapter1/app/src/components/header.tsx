import * as React from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import { Link } from "react-router-dom"
import { loggedOut } from "../reducers/authSlice"
import { useTelegram } from '../hooks/useTelegram'

function Header() {

    const {onClose} = useTelegram()
    
    const dispatch = useAppDispatch()
    
    const currentUser = useAppSelector((state) => state.auth.user)
    const logOut = React.useCallback(() => {
        dispatch(loggedOut())
    }, [dispatch])
    return (
        <nav className="navigation">
                    <Link to="/" className='nav-text'>BestMarketPlace</Link>
                    {!currentUser && <Link to="/signin" className='nav-text'>Войти</Link>}
                    {!currentUser && <Link to="/signup" className='nav-text'>Зарегистрироваться</Link>}
                    {currentUser && <Link to="/cart" className='nav-text'>Корзина</Link>}
                    {currentUser && <Link to="/my-orders" className='nav-text'>Мои заказы</Link>}
                    {currentUser && <Link to="/signin" className='nav-text' onClick={logOut}>Выйти</Link>}
        </nav>
    )
}

const header = React.memo(Header)

export default header