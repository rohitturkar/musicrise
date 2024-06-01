import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { ADD_CART_DATA } from "../../Store/cartSlice.ts";
import {
  ADD_WISHLIST_DATA,
  REMOVE_WISHLIST_DATA,
} from "../../Store/wishlistSlice.ts";
import { ADD_SERVER_DATA } from "../../Store/dataSlice.ts";
import type { RootState, AppDispatch } from "../../Store/store";
import { getDatabase, ref, get } from "firebase/database";
import app from "../../firbase.tsx";
// import Filter from "../../utils/Filter.jsx";
export default function Product() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState<ArrayItem[]>([]);

  const productData = useSelector(
    (state: RootState) => state?.productData?.productData
  );
  const cartData = useSelector((state: RootState) => state?.cart?.cartData);
  const wishlistData = useSelector(
    (state: RootState) => state?.wishlist?.wishlistData
  );

  const getData = async () => {
    setLoading(true);
    const db = getDatabase(app);
    const dbref = ref(db, "inventory");
    const snapshot = await get(dbref);

    if (snapshot.exists()) {
      const myData = snapshot.val();

      const tempArray = Object.keys(myData).map((elementId) => {
        return {
          ...myData[elementId],
          id: elementId,
        };
      });

      setLoading(false);
      dispatch(ADD_SERVER_DATA(tempArray));
      setFilteredData(tempArray);
    } else {
      setLoading(false);
      alert("Data is not present, error");
    }
  };
  useEffect(() => {
    getData();
  }, []);

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

  const filterSearch = (value: string) => {
    const filteredData: ArrayItem[] = productData.filter((element) =>
      element.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  return (
    <section className="w-full overflow-y-auto">
      <div className="mx-auto max-w-12xl px-2 py-10 lg:px-10">
        <div className="md:flex md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-xl font-bold">Products</h1>
          </div>

          <div className="w-full md:w-1/3">
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
              type="text"
              placeholder="search here"
              onChange={(event) => filterSearch(event.target.value)}
            />
          </div>
          <div className="mt-6 flex items-center  pt-2 md:mt-0 md:space-x-4  md:pt-0">
            <button
              type="button"
              className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black lg:hidden"
            >
              Category <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            <button
              type="button"
              className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black lg:hidden"
            >
              Color <ChevronDown className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>

        <hr className="my-8" />
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
          {/* <Filter /> */}

          <div className="h-[400px] w-full rounded-lg border-2 border-dashed px-2 lg:col-span-12 lg:h-full">
            <div className="mx-auto grid w-full max-w-6xl items-center space-y-4 px-2 py-5 md:grid-cols-2 md:gap-5 md:space-y-0 lg:grid-cols-3 ">
              {filteredData?.length === 0  && loading ? (
               <>
               {[...Array(6)].map((_, index) => (
                 <div key={index} className="rounded-md border-2 h-full text-left relative">
                 
                   
                   <div className="flex justify-center items-center h-[200px] bg-gray-300 w-full"></div>
                   <div className="text-left flex flex-col gap-2 px-2 mt-2 py-2">
                     <p className="bg-gray-200 w-[50%] px-10 py-2 text-left rounded-md"></p>
                     <p className="bg-gray-200 w-[20%] px-10 py-2 text-left rounded-md"></p>
                   </div>
                   
                   <div className="p-2 mt-5">
                     <div className="py-4 px-20 bg-gray-200 rounded-md"></div>
                   </div>
                 </div>
               ))}
             </>
             
             
              ) : (
                <>
                  {" "}
                  {filteredData.map((element: ArrayItem, index) => (
                    <div
                      key={index}
                      className="rounded-md border-2 h-full  text-left relative    "
                    >
                      <div className="flex justify-center items-center  ">
                        <img
                          src={element?.imageUrl}
                          alt="Laptop"
                          className="w-full h-[240px] rounded-t-md  cursor-pointer object-cover  "
                          onClick={() => navigate(`/product/${element?.id}`)}
                        />
                      </div>
                      <div className="p-4">
                        <h1 className="inline-flex items-center text-lg font-semibold">
                          {element?.name}
                        </h1>
                        <p>{element?.price}</p>

                        <span
                          className={`absolute right-4 top-2 text-xl cursor-pointer ${
                            wishlistData?.some((item) => item.id === element.id)
                              ? "text-amber-500"
                              : "text-black "
                          }  `}
                          onClick={() => {
                            wishlistData?.some((item) => item.id === element.id)
                              ? dispatch(REMOVE_WISHLIST_DATA(element))
                              : dispatch(ADD_WISHLIST_DATA(element));
                          }}
                        >
                          {wishlistData?.some(
                            (item) => item.id === element.id
                          ) ? (
                            <FaHeart className="text-amber-500" />
                          ) : (
                            <AiOutlineHeart className="text-gray-900" />
                          )}
                        </span>
                      </div>
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
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
