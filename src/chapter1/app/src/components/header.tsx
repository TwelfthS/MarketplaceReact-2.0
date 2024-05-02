import * as React from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import { Link } from "react-router-dom"
import { loggedOut } from "../reducers/authSlice"

function Header() {
    
    const dispatch = useAppDispatch()
    
    const currentUser = useAppSelector((state) => state.auth.user)
    const logOut = React.useCallback(() => {
        dispatch(loggedOut())
    }, [dispatch])
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link to="/" className="nav-link">BestMarketPlace</Link>
                    {!currentUser && <Link to="/signin" className="nav-link">Войти</Link>}
                    {!currentUser && <Link to="/signup" className="nav-link">Зарегистрироваться</Link>}
                    {currentUser && <Link to="/cart" className="nav-link">Корзина</Link>}
                    {currentUser && <Link to="/my-orders" className="nav-link">Мои заказы</Link>}
                    {currentUser && <Link to="/signin" className="nav-link" onClick={logOut}>Выйти</Link>}
                </div>
            </div>
          </div>
        </nav>
    )
}

const header = React.memo(Header)

export default header