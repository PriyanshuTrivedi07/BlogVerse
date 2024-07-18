import React, { useEffect, useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import authService from '../../appwrite/auth'


function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null)

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true,
      className: 'hover:text-[#ff585f]'
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      className: 'bg-gray-600 hover:bg-gray-700'
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
      className: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
      className: 'hover:text-[#ff585f]'
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
      className: 'hover:text-[#ff585f]'
    },
  ]

  useEffect(() => {
    if (userData) {
      const avatarUrl = authService.getInitialAvatar(userData.name)
      setAvatarUrl(avatarUrl)
    }
  }, [userData])

  return (
    <header className='sticky top-0 z-50'>
      <nav className="bg-gray-900 text-white shadow-md">
        {/* Navbar menu for large screen */}
        <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between min-h-16">
            {/* LOGO */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/" className='flex items-center justify-center gap-1'>
                  <Logo width='32px' />
                  <div>
                    <h1 className='text-2xl font-bold'>BlogVerse</h1>
                    <p className='text-xs text-blue-500'>Haven for Thoughtful writing</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Nav Links */}
            <div className='flex gap-2'>
              <div className='flex gap-2'>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <ul className='flex gap-2 items-center justify-center ml-auto'>
                      {navItems.map((item) =>
                        item.active ? (
                          <li key={item.name}>
                            <button
                              className={`px-4 py-2 rounded-md text-base duration-150 font-medium ${item.className}`}
                              onClick={() => navigate(item.slug)}
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
                  </div>
                </div>

                {authStatus &&
                  <div className='flex gap-2 items-center justify-center'>
                    <img className='w-10 h-10 rounded-full' src={avatarUrl} alt="user-avatar" />
                  </div>
                }
              </div>

              {/* Responsive Ham-burger Menu */}
              <div className="flex md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Drop down menu for Small Screen */}
        <div className={`md:hidden transition-all duration-300 ease-in-out transform ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <ul className='flex flex-col gap-2 ml-auto'>
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${item.className}`}
                      onClick={() => {
                        navigate(item.slug)
                        setIsOpen(false)
                      }}
                    >{item.name}</button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <>
                  <li>
                    {/* TODO: add a onclick in logout button to setIsOpen to false */}
                    <LogoutBtn />
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

      </nav>
    </header>
  )
}

export default Header