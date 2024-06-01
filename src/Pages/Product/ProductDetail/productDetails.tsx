import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ADD_CART_DATA } from "../../../Store/cartSlice.ts";
import { ADD_WISHLIST_DATA,REMOVE_WISHLIST_DATA } from "../../../Store/wishlistSlice.ts";
import type { RootState, AppDispatch } from "../../../Store/store.ts";
3

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch:AppDispatch=useDispatch()
  const productData = useSelector(
    (state: RootState) => state?.productData?.productData
  );

  const navigate = useNavigate();
  const cartData = useSelector((state:RootState) => state?.cart?.cartData);
  const wishlistData = useSelector((state:RootState) => state?.wishlist?.wishlistData);


  
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
  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 py-24">
        {productData
          .filter((element:ArrayItem) => element.id === productId)
          .map((element:ArrayItem) => (
            <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
              <img
                alt="Nike Air Max 21A"
                className="h-70 w-full rounded object-cover lg:h-96 lg:w-1/2"
                src={element.imageUrl}
              />
              <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
                <h1 className="my-4 text-3xl font-semibold text-black text-left">
                  {element.name}
                </h1>
                <h2 className="text-sm font-semibold tracking-widest text-gray-500 text-left">
                  {element.department}
                </h2>

                <p className="leading-relaxed text-left">
                  {element.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="title-font text-xl font-bold text-gray-900 mt-7">
                    Price: {element.price}
                  </span>

                
                </div>
                <div className='flex  gap-2 items-center mt-5'>
               
                    <button
                      type="button"
                      className={`rounded-md ${cartData?.some((item) => item.id === element.id)?'bg-black':'bg-[#96C291]'} bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm `}


                      onClick={() => cartData?.some((item) => item.id === element.id) ? navigate('/cart'):dispatch(ADD_CART_DATA(element)) }
                    >
                      {cartData?.some((item) => item.id === element.id)?'Go to cart':'Add to Cart'}
                    </button>
                 
                    <button
                      type="button"
                      className={`rounded-md ${wishlistData?.some((item) => item.id === element.id)?'bg-black':'bg-[#96C291]'} bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm `}


                      onClick={() => wishlistData?.some((item) => item.id === element.id) ? dispatch(REMOVE_WISHLIST_DATA(element)):dispatch(ADD_WISHLIST_DATA(element)) }
                    >
                      {wishlistData?.some((item) => item.id === element.id)?'Remove From Wishlist':'Add to Wishlist'}
                    </button>
                 
                 


                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default ProductDetails;
