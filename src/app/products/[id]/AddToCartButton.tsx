"use client";

import Image from "next/image";
import cartSvg from "../../../../public/shopping-cart.svg";
import { useTransition, useState } from "react";

interface AddToCartButtonProps {
  productId: string;
  incrementProductQuantity: (productId: string) => Promise<void>;
}

function AddToCartButton({
  productId,
  incrementProductQuantity,
}: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex gap-2 items-center justify-center h-full flex-col">
      <button
        className="btn btn-primary w-full mt-auto"
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await incrementProductQuantity(productId);
            setSuccess(true);
          });
        }}
        disabled={isPending}
      >
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
      {isPending && <span className="loading loading-spinner loading-md" />}
      {!isPending && success && (
        <span className="text-success">Added to Cart</span>
      )}
    </div>
  );
}

export default AddToCartButton;
