import Image from "next/image";
import anonJpg from "../../../public/anon.jpg";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/cart";
import formatPrice from "@/lib/formatPrice";
import Link from "next/link";

interface NavbarProps {
  className: string;
}

async function searchProducts(formData: FormData) {
  "use server";

  const searchQuery = formData.get("search")?.toString();

  if (searchQuery) {
    redirect(`/search?query=${searchQuery}`);
  }
}

export default async function Navbar({ className }: NavbarProps) {
  "use server";
  const cart = await getCart();

  return (
    <div className={`bg-red-600 `}>
      <div className={`navbar ${className}`}>
        <div className="flex-1">
          <Link
            className="btn btn-ghost normal-case text-3xl text-white "
            href={"/"}
          >
            Ecommerce Website
          </Link>
        </div>
        <div className="flex-none">
          <form className="form-control mx-1" action={searchProducts}>
            <input
              type="text"
              name="search"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </form>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle mx-1">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cart?.size ? cart.size : 0}
                </span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg ">
                  {cart?.cartItems.length} Items
                </span>
                <span className="text-sm  text-emerald-700">
                  Subtotal: {cart?.subtotal ? formatPrice(cart.subtotal) : ""}
                </span>
                <div className="card-actions">
                  <a className="btn btn-primary btn-block" href={`/cart`}>
                    View cart
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  src={anonJpg}
                  width={150}
                  height={150}
                  alt="user image"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
