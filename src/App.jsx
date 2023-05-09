//import React, { Component } from 'react'
import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './views/Home'
import Signup from './views/Signup'
import Login from './views/Login'
import Todo from './views/Todo'
import Products from './views/Products'
import SingleProduct from './views/SingleProduct'
import Cart from './views/Cart'

import { Routes, Route, useNavigate } from 'react-router-dom';

const getUserFromLocalStorage = () => {
  const found = localStorage.getItem('user_flask_e-commerce')
  if (found) {
    return JSON.parse(found)
  }
  return {}
}

export default function App () {
  const [user, setUser] = useState(getUserFromLocalStorage)
  const navigate = useNavigate()

  const logMeIn = (user) => {
    setUser(user)

    localStorage.setItem('user_flask_e-commerce', JSON.stringify(user))
  }

  const logMeOut = () => {
    setUser({})
    localStorage.removeItem('user_flask_e-commerce')
    navigate('/login')
  }

  return (
      <div>
         <Navbar user={user} logMeOut = {logMeOut}/>
         <Routes>
             <Route path="/signup" element={<Signup />}/>
             <Route path="/" element={<Home/>}/>
             <Route path='/login' element={<Login logMeIn = {logMeIn} />}/>
             <Route path='/to-do' element={<Todo/>}/>
             <Route path='/products' element={<Products user={user}/>}/>
             <Route path='/products/:productId' element={<SingleProduct user={user}/>}/>
             <Route path='/cart' element={<Cart user={user}/>}/>
         </Routes>
      </div>

  )


}




// export default class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//         user:{}
//     }
// }
  
//   switchUser = () => {
//     if (this.state.user.username === 'sho') {
//       this.setState({user: {username:'sarah'}})
//     } else {
//       this.setState({user: {username:'sho'}})
//     }
//   }

//   logMeIn = (user) => {
//     this.setState ({user:user})
//   }

//   logMeOut = () => {
//     this.setState({user: {}}) //logs the user out, sets the state of the user back to {}
//   }

//   render() {
//     return (
//       <div>
//         <Navbar user={this.state.user} switchUser={this.switchUser} logMeOut = {this.logMeOut}/>
//         <Routes>
//             <Route path="/signup" element={<Signup/>}/>
//             <Route path="/" element={<Home/>}/>
//             <Route path='/login' element={<Login logMeIn = {this.logMeIn} />}/>
//             <Route path='/to-do' element={<Todo/>}/>
//             <Route path='/products' element={<Products user={user}/>}/>
//         </Routes>
//       </div>
//     )
//   }
// }
