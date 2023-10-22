"use client";

import Image from "next/image";
import cartSvg from "../../../../public/shopping-cart.svg";

interface AddToCartButtonProps {
  productId: string;
}

function AddToCartButton({ productId }: AddToCartButtonProps) {
  return (
    <div className="flex gap-2 items-center justify-center h-full">
      <button className="btn btn-primary w-full mt-auto" onClick={() => {}}>
        Add To Cart
        {
          <Image
            className=""
            src={cartSvg}
            alt="cart"
            width={30}
            height={30}
          ></Image>
        }
      </button>
    </div>
  );
}

export default AddToCartButton;
