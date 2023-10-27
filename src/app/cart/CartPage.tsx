import { getCart } from "@/lib/db/cart";
import Image from "next/image";
import { ReactElement } from "react";
import formatPrice from "@/lib/formatPrice";
import Link from "next/link";

export default async function CartPage() {
  const cart = await getCart();
  console.log("cart in cartPage");
  console.dir(cart, { depth: Infinity });

  let content: ReactElement | Array<ReactElement>;

  if (!cart?.cartItems.length) {
    content = (
      <div>
        <p>No cart items</p>
      </div>
    );
  } else {
    content = cart.cartItems.map((item) => {
      return (
        <tr
          key={item.product.id}
          className="relative hover:bg-gray-100 transition-all "
        >
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-[50%] h-[50%]">
                  <Image
                    width={100}
                    height={100}
                    src={item.product.imageUrl}
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">{item.product.name}</div>
              </div>
            </div>
          </td>
          <td className="hidden">
            {/* Make sure to create a reus-component for ratings */}
            <div className="rating scale-75 ">
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
            </div>
          </td>
          <td>{formatPrice(item.product.price)}</td>
          <td>
            <Link
              href={`/products/${item.product.id}`}
              className="absolute w-full h-full left-0 top-0"
            ></Link>
          </td>
          <td className="text-center">{item.quantity}</td>
        </tr>
      );
    });
  }

  return (
    <div className="flex flex-col flex-1 ">
      <h1 className="text-center items-center align-middle text-2xl mb-4 uppercase text-gray-800 mt-10">
        Shopping Cart
      </h1>
      <div className="cart-item-container">
        <div className="overflow-x-auto">
          {cart?.cartItems.length ? (
            <table className="table w-auto  max-w-full lg:w-[800px]">
              {/* head */}
              <thead>
                <tr>
                  <th>Product</th>
                  <th>User Rating</th>
                  <th>Cost</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {content}
              </tbody>
              {/* foot */}
              <tfoot>
                <tr>
                  <th>Sub total</th>
                </tr>
              </tfoot>
            </table>
          ) : (
            <>
              <p className="text-center text-3xl mt-10">Shopping Cart Empty</p>
              <p className="text-center text-lg">
                Add an item and start shopping
              </p>
            </>
          )}

          {cart?.subtotal == 0 ? null : (
            <div className="flex flex-col justify-end items-end align-middle gap-2 mb-10">
              {!cart?.subtotal ? null : (
                <div className="flex flex-row justify-center align-middle items-center gap-2">
                  <h2 className="font-bold">Total:</h2>
                  <h2>{formatPrice(cart?.subtotal ? cart.subtotal : 0)}</h2>
                </div>
              )}

              <button className="btn btn-primary mt-1  text-white">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
