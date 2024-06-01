"use client";

import React from "react";
import { Menu, X } from "lucide-react";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const cartData = useSelector((state:RootState) => state?.cart?.cartData);
  const wishlistData = useSelector((state:RootState) => state?.wishlist?.wishlistData);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative bg-white border px-1 py-2 rounded-md shadow-md m-4  ">
      <div className="mx-auto flex max-w-7xl items-center justify-between  py-5 ">
        <div className="inline-flex items-center space-x-2">
          <NavLink to="/" className="font-bold  text-light-black lg:text-2xl">
            {" "}
            Musicrise
          </NavLink>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            <li>
              <NavLink
                to="/product"
                className="text-2xl font-semibold text-gray-800 hover:text-gray-900 "
              >
                Shop
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            <NavLink
              to="/wishlist"
              className="text-md font-semibold text-gray-800 hover:text-gray-900 "
            >
              <span className="relative">
                <AiOutlineHeart className="text-2xl " />
                <span className="absolute h-5 w-5 -right-3 -top-3 bg-orange-100 text-sm rounded-full">
                  {wishlistData.length}
                </span>
              </span>
            </NavLink>
            <NavLink
              to="/cart"
              className="text-md font-semibold text-gray-800 hover:text-gray-900 cursor-pointer"
            >
              <span className="relative">
                <AiOutlineShoppingCart className="text-2xl " />
                <span className="absolute h-5 w-5 -right-3 -top-3 bg-orange-100 text-sm rounded-full cursor-pointer">
                  {cartData.length}
                </span>
              </span>
            </NavLink>

            <NavLink
              to="/profile"
              className="text-md font-semibold text-gray-800 hover:text-gray-900 cursor-pointer "
            >
              <BsFillPersonFill className="text-2xl " />
            </NavLink>
          </ul>
        </div>

        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>

        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span className="font-bold  text-light-black lg:text-2xl">
                      Musicrise
                    </span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 bg-white hover:bg-white-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                  
                      <div >
                        
                          <NavLink
                            to="/product"
                            className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50 "
                          >
                            Shop
                          </NavLink>
                        
                      </div>
                 
                  </nav>

                  <div>
                    <ul className="flex flex-row mt-6  space-x-8">
                      <NavLink
                        to="/wishlist"
                        className="text-md font-semibold text-gray-800 hover:text-gray-900 "
                      >
                        <span className="relative">
                          <AiOutlineHeart className="text-2xl " />
                          <span className="absolute h-5 w-5 -right-3 -top-3 bg-orange-100 text-sm rounded-full">
                            {wishlistData.length}
                          </span>
                        </span>
                      </NavLink>
                      <NavLink
                        to="/cart"
                        className="text-md font-semibold text-gray-800 hover:text-gray-900 cursor-pointer"
                      >
                        <span className="relative">
                          <AiOutlineShoppingCart className="text-2xl " />
                          <span className="absolute h-5 w-5 -right-3 -top-3 bg-orange-100 text-sm rounded-full cursor-pointer">
                            {cartData.length}
                          </span>
                        </span>
                      </NavLink>
                    </ul>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
