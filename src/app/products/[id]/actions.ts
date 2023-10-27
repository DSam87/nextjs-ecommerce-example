"use server";

import { getCart, createCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function incrementProductQuantity(
  productId: string,
  setProductValue: number,
) {
  let cart = (await getCart()) ?? (await createCart());

  const itemInCart = cart.cartItems.find((el) => el.productId === productId);
  console.log("cartcartcartcartcartcart");
  console.log(cart);

  if (itemInCart && setProductValue === 0) {
    console.log("DELETE ITEM");
    await prisma.cartItem.delete({ where: { id: itemInCart.id } });
    revalidatePath("/products/[id]");
    return;
  }

  if (itemInCart) {
    console.log("INSIDE INCART");
    await prisma.cartItem.update({
      where: { id: itemInCart.id },
      data: { quantity: setProductValue },
    });
  } else {
    console.log("INSIDE CREATECART");

    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: productId,
        quantity: setProductValue,
      },
    });
  }

  revalidatePath("/products/[id]");
}
