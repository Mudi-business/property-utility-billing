import React from 'react'
import { Outlet } from 'react-router-dom'

export const MainView:React.FC =()=> {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}
