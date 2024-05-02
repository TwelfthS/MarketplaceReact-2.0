import * as React from 'react'
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import { Navigate, useLocation, useNavigate  } from 'react-router-dom'
import { useForm } from "react-hook-form"

import { signin } from "../reducers/authSlice"
import userService from "../services/user.service"
import { unwrapResult } from '@reduxjs/toolkit'
import { updateCart } from '../reducers/userSlice'

function SignIn() {
  const navigate = useNavigate()
  const location = useLocation()

  const { register, handleSubmit, formState: { errors } } = useForm()
  
  const [loading, setLoading] = useState(false)

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const message = useAppSelector(state => state.message.message)

  const dispatch = useAppDispatch()

  const onSubmit = async (data: {name: string, password: string}) => {
    setLoading(true)
    try {
      const resultAction = await dispatch(signin({username: data.name, password: data.password}))
      unwrapResult(resultAction)
      await dispatch(updateCart())
      if (location.state) {
          try {
            await userService.addCart(location.state)
            navigate('/cart')
          } catch(err) {
            console.log(err)
            navigate('/')
          }
      } else {
          navigate('/')
      }
    } catch(err) {
        console.log(err)
        setLoading(false)
    }
  }

  if (isLoggedIn) {
    return <Navigate to="/" />
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{minHeight: '50vh'}}>
      <form style={{minWidth: '35vh'}} className="mt-3" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="form-group mb-3">
            <label htmlFor="name">Логин</label>
            <input
              type="text"
              className="form-control"
              {...register("name", {required: true})}
            />
            {errors.name && <p>Error!</p>}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              className="form-control"
              {...register("password", {required: true})}
            />
            {errors.password && <p>Error!</p>}
          </div>

          <div className="form-group mb-3">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Войти</span>
            </button>
          </div>
        </div>

        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default SignIn