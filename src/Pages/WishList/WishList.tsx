import React from "react";

import { AiTwotoneHeart, AiOutlineHeart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../Store/store";
import { ADD_CART_DATA } from "../../Store/cartSlice";
import { ADD_WISHLIST_DATA,REMOVE_WISHLIST_DATA } from "../../Store/wishlistSlice";

interface ArrayItem {
  delivered: string;  
  department: string;
  description: string;
  imageUrl: string;
  name: string;
  price: number;
  stock: number;
  supplier: string;
  id: string;
}

const WishList = () => {
  
  const wishlistData = useSelector((state: RootState) => state?.wishlist?.wishlistData);
  const cartData = useSelector((state: RootState) => state?.cart?.cartData);
  const navigate = useNavigate();
  const dispatch=useDispatch()

 
  return (
    <>
      {wishlistData.length > 0 ? (
        <>
          <h2 className="text-3xl font-bold py-10 text-light-black">
            My WishList
          </h2>

          <div className="mx-auto grid w-full max-w-6xl items-center justify-center md:grid-cols-2 md:gap-8 md:space-y-0 lg:grid-cols-3  py-4 ">
            {wishlistData.map((element:ArrayItem) => (
              <div key={element.id} className="border rounded-lg">
                <div className="flex flex-col justify-center  gap-4 ">
                  <div className="relative ">
                    <img
                      src={element.imageUrl}
                      alt="Laptop"
                      className="w-full h-[250px]  object-cover rounded-t-md cursor-pointer  "
                      onClick={() => navigate(`/product/${element.id}`)}
                    />
                   <span
                        className={`absolute right-4 top-2 text-xl cursor-pointer ${wishlistData?.some((item) => item.id === element.id)?'text-amber-500':'text-black '}  `}
                        onClick={() => {
                          wishlistData?.some((item) => item.id === element.id)
                            ? dispatch(REMOVE_WISHLIST_DATA(element))
                            : dispatch(ADD_WISHLIST_DATA(element));
                        }}
                      >
                        {wishlistData?.some(
                          (item) => item.id=== element.id
                        ) ? (
                         <FaHeart className='text-amber-500' />
                        ) : (
                          <AiOutlineHeart className='text-gray-900' />
                        )}
                      </span>
            
                  </div>

                  <div className="flex flex-col gap-4 p-2 text-left ">
                    <h1 className="text-lg font-semibold">
                      {element.name}
                    </h1>
                    <p className="py-1 text-sm font-semibold">
                      {" "}
                      Rs {element.price} /-
                    </p>

                   
                    <div className="flex gap-2 items-center p-2">
                    <button
                      type="button"
                      className={`rounded-md ${
                        cartData?.some((item) => item.id === element.id)
                          ? "bg-black"
                          : "bg-[#96C291]"
                      }  w-full rounded-md  bg-[#222] p-2 text-md font-semibold text-white shadow-sm  `}
                      onClick={() =>
                        cartData?.some((item) => item.id === element.id)
                          ? navigate("/cart")
                          : dispatch(ADD_CART_DATA(element))
                      }
                    >
                      {cartData?.some((item) => item.id === element.id)
                        ? "Go to Cart"
                        : "Add to Cart"}
                    </button>
                  </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center flex-col gap-y-12 w-screen h-96">
          <h1>Add Favorites here</h1>
          <button
            type="button"
            className="rounded-md bg-button-bg px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-button-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={() => navigate("/product")}
          >
            Shop now
          </button>
        </div>
      )}
    </>
  );
};

export default WishList;
