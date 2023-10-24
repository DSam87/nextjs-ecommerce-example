"use client";

import Image from "next/image";
import cartSvg from "../../../../public/shopping-cart.svg";
import { useTransition, useState } from "react";
import { ReactNode, cache } from "react";
import { redirect } from "next/navigation";

interface AddToCartButtonProps {
  productId: string;
  initialProductQuantityValue: number;

  incrementProductQuantity: (
    productId: string,
    setProductValue: number,
  ) => Promise<void>;
}

function createOptions(): Array<ReactNode> {
  let optionsArray = [];
  for (let i = 0; i <= 99; i++) {
    optionsArray.push(
      <option value={i} key={i}>
        {i}
      </option>,
    );
  }
  return optionsArray;
}

function AddToCartButton({
  productId,
  incrementProductQuantity,
  initialProductQuantityValue,
}: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  const [currentValue, setCurrentValue] = useState(
    initialProductQuantityValue ? initialProductQuantityValue : 1,
  );

  const notInCart = initialProductQuantityValue === 0;

  console.log("PRODUCT VALUES!!!!");
  console.log(initialProductQuantityValue);
  console.log(currentValue);

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-row justify-center items-center">
          {initialProductQuantityValue ? (
            <a href={"/cart"} className="italic underline">
              Already In Cart
            </a>
          ) : null}
        </div>
        <div className="flex flex-row justify-center items-center">
          <p>Quantity: </p>
          <select
            onChange={(e) => {
              setCurrentValue(Number(e.target.value));
            }}
            name="quantity"
            id="quantity"
            defaultValue={
              initialProductQuantityValue ? initialProductQuantityValue : 1
            }
          >
            {createOptions()}
          </select>
        </div>
      </div>
      <button
        className="btn btn-primary w-full "
        onClick={() => {
          if (initialProductQuantityValue !== currentValue) {
            setSuccess(false);
            startTransition(async () => {
              await incrementProductQuantity(productId, currentValue);
              setSuccess(true);
            });
          }
        }}
        disabled={isPending}
      >
        {/* {currentValue > 1
          ? currentValue === initialProductQuantityValue
            ? "Already In Cart"
            : "Update Cart"
          : "Add to Cart"} */}
        {/* {currentValue === initialProductQuantityValue
          ? "Item in Cart"
          : currentValue === 0 && initialProductQuantityValue !== 0
          ? "Remove Item"
          : currentValue != initialProductQuantityValue
          ? "Updated Cart"
          : "Add to Cart"} */}
        {notInCart && "Add to Cart"}
        {currentValue === initialProductQuantityValue &&
          !notInCart &&
          "Product in Cart"}
        {currentValue === 0 && !notInCart && "Remove from Cart"}
        {currentValue !== initialProductQuantityValue &&
          !notInCart &&
          currentValue !== 0 &&
          "Update Quantity"}
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
        <span className="text-success">
          {currentValue > 1 ? "Updated Cart" : "Added to Cart"}
        </span>
      )}
    </>
  );
}

export default AddToCartButton;
