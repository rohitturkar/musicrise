import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BiWinkSmile } from 'react-icons/bi';
import toast from 'react-hot-toast';
import { RootState } from '../../Store/store';

interface Coupon {
  coupenName: string;
  value: number;
}

const CoupenValues: Coupon[] = [
  {
    coupenName: 'Diwali300',
    value: 300,
  },
  {
    coupenName: 'Holi200',
    value: 200,
  },
];

const Checkout: React.FC = () => {
  const [coupenData, setCoupenData] = useState<number>(0);
  const [coupen, setCoupen] = useState<string>('');
  const cartData = useSelector((state: RootState) => state?.cart?.cartData);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (coupen !== '' && coupen !== '0') {
      const currentCoupen = CoupenValues.find((element) => element.coupenName === coupen);
      if (currentCoupen) {
        setCoupenData(currentCoupen.value);
        toast.success('Coupon added', {
          icon: '😉',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      } else {
        setCoupenData(0);
        toast.error("This coupon doesn't work. Please enter a valid coupon.");
      }
    } else {
      setCoupenData(0);
      toast.error("This doesn't work. Please enter a valid coupon.");
    }
  };

  return (
    <>
      {cartData.length > 0 ? (
        <div className="mx-auto my-4 max-w-4xl md:my-6">
          <div className="overflow-hidden rounded-xl shadow">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product List */}
              <div className="bg-gray-100 px-5 py-6 md:px-8">
                <div className="flow-root">
                  <ul className="-my-7 divide-y divide-gray-200">
                    {cartData.map((element) => (
                      <li key={element.id} className="flex items-stretch justify-between space-x-5 py-7">
                        <div className="flex flex-1 items-stretch">
                          <div className="flex-shrink-0">
                            <img
                              className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-contain cursor-pointer"
                              src={element?.imageUrl}
                              alt={element.imageUrl}
                              onClick={() => navigate(`/product/${element.id}`)}
                            />
                          </div>
                          <div className="ml-5 flex flex-col justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-bold">{element.name}</p>
                              <p className="mt-1.5 text-sm font-medium text-gray-500 text-left">{element.department}</p>
                            </div>
                            <p className="mt-4 text-sm text-gray-500 font-medium text-left">Quantity 1</p>
                          </div>
                        </div>
                        <div className="ml-auto flex flex-col items-end justify-between">
                          <p className="text-right text-sm font-bold text-gray-900">{element.price}</p>
                          <button
                            type="button"
                            className="-m-2 inline-flex rounded p-2 text-gray-400 transition-all duration-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                          >
                            <span className="sr-only">Remove</span>
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <hr className="mt-6 border-gray-200" />
                <p className="mt-4 text-sm text-gray-500 font-medium text-left">
                  <span className="text-96C291 font-large">Holi200</span> for 200/- Off
                </p>
                <p className="mt-4 text-sm text-gray-500 font-medium text-left ">
                  <span className="text-96C291 font-large">Diwali300</span> for 300/- Off
                </p>
                <form action="#" className="mt-6" onSubmit={handleSubmit}>
                  <div className="sm:flex sm:space-x-2.5 md:flex-col md:space-x-0 lg:flex-row lg:space-x-2.5">
                    <div className="flex-grow">
                      <input
                        className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Enter your Coupon here"
                        onChange={(event) => setCoupen(event.target.value)}
                      />
                    </div>
                    <div className="mt-4 sm:mt-0 md:mt-4 lg:mt-0">
                      <button
                        type="submit"
                        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        Apply Coupon
                      </button>
                    </div>
                  </div>
                </form>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center justify-between text-gray-600">
                    <p className="text-sm font-medium">Subtotal</p>
                    <p className="text-sm font-medium">{cartData.reduce((acc, curr) => acc + curr.price, 0)}</p>
                  </li>
                  <li className="flex items-center justify-between text-gray-900">
                    <p className="text-sm font-medium">Coupon Discount</p>
                    <p className="text-sm font-bold">{coupenData}</p>
                  </li>
                  <li className="flex items-center justify-between text-gray-900">
                    <p className="text-sm font-medium">Total</p>
                    <p className="text-sm font-bold">
                      {cartData.reduce((acc, curr) => acc + curr.price, 0) - coupenData}
                    </p>
                  </li>
                </ul>
              </div>
              {/* Contact Info */}
              <div className="px-5 py-6 text-gray-900 md:px-8">
                <div className="flow-root">
                  <div className="-my-6 divide-y divide-gray-200">
                    <div className="py-6">
                      <form>
                        <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
                          <div>
                          <h3 id="contact-info-heading" className="text-lg font-semibold text-gray-900">
                            Contact Information
                          </h3>
                          <div className="mt-4 w-full">
                            <label
                              htmlFor="name"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Full Name
                            </label>
                            <input
                              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              type="text"
                              placeholder="Enter your name"
                              id="name"
                            />
                          </div>
                        </div>
                        <hr className="my-8" />
                        <div className="mt-10">
                          <h3 className="text-lg font-semibold text-gray-900">Shipping address</h3>
                          <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="address"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Address
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="address"
                                  name="address"
                                  autoComplete="street-address"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium text-gray-700"
                              >
                                City
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="city"
                                  name="city"
                                  autoComplete="address-level2"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="region"
                                className="block text-sm font-medium text-gray-700"
                              >
                                State / Province
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="region"
                                  name="region"
                                  autoComplete="address-level1"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="postal-code"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Postal code
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="postal-code"
                                  name="postal-code"
                                  autoComplete="postal-code"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr className="my-8" />
                        <div className="mt-10">
                          <h3 className="text-lg font-semibold text-gray-900">Billing information</h3>
                          <div className="mt-6 flex items-center">
                            <input
                              id="same-as-shipping"
                              name="same-as-shipping"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                            />
                            <div className="ml-2">
                              <label
                                htmlFor="same-as-shipping"
                                className="text-sm font-medium text-gray-900"
                              >
                                Same as shipping information
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                          <button
                            type="button"
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                          >
                            Make payment
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex justify-center items-center flex-col gap-y-12 w-screen h-96">
        <h1>
          Do some Shopping and then Come here <BiWinkSmile size={36} className="inline-block text-amber-500" />
        </h1>
        <button
          type="button"
          className="rounded-md bg-button-bg px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-button-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={() => navigate('/product')}
        >
          Shop now
        </button>
      </div>
    )}
  </>
);
};

export default Checkout;
