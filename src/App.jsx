
import { Outlet } from 'react-router-dom'
import './App.css'
import Nav from './shared/Nav'
import Footer from './shared/Footer'

function App() {
  

  return (
    <>
      <Nav></Nav>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}

export default App
