import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/cart";
import formatPrice from "@/lib/formatPrice";
import Link from "next/link";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

interface NavbarProps {
  className: string;
}

export default async function Navbar({ className }: NavbarProps) {
  "use server";

  const session = await getServerSession(authOptions);
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
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle mx-1">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
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
          <UserMenuButton session={session} />
        </div>
      </div>
    </div>
  );
}
