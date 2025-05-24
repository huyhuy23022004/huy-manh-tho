import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Dashboard() {
    const user = useSelector(state => state.user)

  console.log("user dashboard",user)
  return (
    <section className='bg-white'>
    <div className='container mx-auto p-3 grid grid-cols-1 lg:grid-cols-[250px,1fr]'>
      {/**left for menu */}
      <div
        className='py-4 max-h-[calc(100vh-96px)] overflow-y-auto hidden lg:block border-r'
        style={{
          position: 'fixed',
          top: '24px', // Điều chỉnh cho phù hợp với header của bạn
          left: '0',
          width: '250px',
          height: 'calc(100vh - 96px)', // Điều chỉnh cho phù hợp
          overflowY: 'auto',
          borderRight: '1px solid #ccc',
          backgroundColor: 'white',
          zIndex: '10',
        }}
      >
        <UserMenu/>
      </div>

      {/**right for content */}
      <div
        className='bg-white min-h-[75vh]'
        style={{
          marginLeft: '250px', // Tạo khoảng trống bên trái
          paddingTop: '24px', // Tạo khoảng trống phía trên bằng với top của menu
        }}
      >
        <Outlet/>
      </div>
    </div>
  </section>
  )
}
