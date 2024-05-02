import * as React from 'react'
import { useForm } from "react-hook-form"
import { useAppSelector, useAppDispatch } from '../hooks'
import { Navigate, useNavigate } from 'react-router-dom'

import { signup } from "../reducers/authSlice"
import { unwrapResult } from '@reduxjs/toolkit'
import { setMessage } from '../reducers/messageSlice'

function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  
    const message = useAppSelector(state => state.message.message)
    const dispatch = useAppDispatch()

    const onSubmit = async (data: {name: string, password: string, repeatPassword: string}) => {
        if (data.password === data.repeatPassword) {
          try {
            const resultAction = await dispatch(signup({username: data.name, password: data.password}))
            unwrapResult(resultAction)
            navigate('/')
          } catch(err) {
              console.log(err)
          }
        } else {
            dispatch(setMessage("Пароли не совпадают!"))
        }
    }

    if (isLoggedIn) {
      return <Navigate to="/" />
    }
  
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{minHeight: '50vh'}}>
        <form style={{width: '47vh'}} className="mt-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="name">Логин</label>
              <input
                type="text"
                className="form-control"
                {...register("name", {required: "Is required"})}
              />
              {errors.name && <p>Error!</p>}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                className="form-control"
                {...register("password", {required: "Is required"})}
              />
              {errors.password && <p>Error!</p>}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="repeat-password">Повторите пароль</label>
              <input
                type="password"
                className="form-control"
                {...register("repeatPassword", {required: "Is required"})}
              />
              {errors.repeatPassword && <p>Error!</p>}
            </div>

            <div className="form-group mb-3">
              <button className="btn btn-primary btn-block">Зарегистрироваться</button>
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
  
  export default SignUp