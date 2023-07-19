'use client'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const ToastProcvider = () => {
  return (
    <ToastContainer
    autoClose = {2000} // 2초 후 사라짐
    />
  )
}

export default ToastProcvider