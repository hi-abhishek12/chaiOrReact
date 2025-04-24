import React from 'react'
import { Link } from 'react-router-dom' 
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Container , LogoutBtn , Logo} from '../index'


function Header() {
const navigate = useNavigate()

    const authStatus = useSelector((state) => 
      state.auth.status
    )

    const navItems = [
      {
        name : 'Home',
        slug : '/',
        active : true
      },
      {
        name: "Login",
        slug: "/login",
        active: !authStatus,
    },
    {
        name: "Signup",
        slug: "/signup",
        active: !authStatus,
    },
    {
        name: "All Posts",
        slug: "/all-posts",
        active: authStatus,
    },
    {
        name: "Add Post",
        slug: "/add-post",
        active: authStatus,
    },

    ]

  return (
    <header className="bg-gray-900 shadow-md py-4 text-gray-200">
    <Container>
      <nav className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <Logo width="100px" />
          </Link>
        </div>

        <ul className="flex items-center space-x-4">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className="inline-block px-5 py-2 rounded-full bg-gray-800 hover:bg-white hover:text-gray-900 transition duration-200"
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}

          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
    </Container>
  </header>
  )
}

export default Header