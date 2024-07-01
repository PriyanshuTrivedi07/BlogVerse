import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../index'

function Footer() {
  return (
    <footer className="relative overflow-hidden py-10 bg-gray-900 text-white border-t-2 border-t-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="grid gap-8 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="w-full p-2">
            <div className="flex h-full flex-col justify-start gap-4">
              <div className="inline-flex items-center">
                <Logo width="70px" />
              </div>
              <div>
                <p className="text-sm text-white">
                  &copy; Copyright 2024-25.<br/> All Rights Reserved by BlogVerse.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full p-2">
            <div className="h-full flex flex-col gap-4">
              <h3 className="tracking-px text-xs font-semibold uppercase text-gray-500">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white hover:text-[#ff585f]"
                    to="/"
                  >
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white hover:text-[#ff585f]"
                    to="/"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white hover:text-[#ff585f]"
                    to="/"
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base font-medium text-white hover:text-[#ff585f]"
                    to="/"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full p-2">
            <div className="h-full flex flex-col gap-4">
              <h3 className="tracking-px text-xs font-semibold uppercase text-gray-500">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white hover:text-[#ff585f]"
                    to="/"
                  >
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white hover:text-[#ff585f]"
                    to="/"
                  >
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white hover:text-[#ff585f]"
                    to="/"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base font-medium text-white hover:text-[#ff585f]"
                    to="/"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full p-2">
            <div className="h-full flex flex-col gap-4">
              <h3 className="tracking-px text-xs font-semibold uppercase text-gray-500">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white hover:text-[#ff585f]"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white hover:text-[#ff585f]"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base font-medium text-white hover:text-[#ff585f]"
                    to="/"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer