"use server";

import { getCart, createCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function incrementProductQuantity(productId: string) {
  // looking to see if we have a cart to get, if null create a anon cart.
  const cart = (await getCart()) ?? (await createCart());

  // we look thorugh our cart we got or created and search our  to see if it has the product by the product id
  const itemInCart = cart.cartItems.find((el) => el.productId === productId);
  console.log("ITEMINCART");
  console.log(itemInCart);

  // if item is in cart, we in crement the value by one
  // check if the item in cart exists
  if (itemInCart) {
    // await prisma get cart item to increment,
    await prisma.cartItem.update({
      where: { id: itemInCart.id },
      data: { quantity: { increment: 1 } },
    });
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId: productId, quantity: 1 },
    });
  }

  revalidatePath("/products/[id]");
}
