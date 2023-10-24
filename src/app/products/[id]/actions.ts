"use server";

import { getCart, createCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function incrementProductQuantity(
  productId: string,
  setProductValue: number,
) {
  // looking to see if we have a cart to get, if null create a anon cart.
  let cart = (await getCart()) ?? (await createCart());

  // we look thorugh our cart we got or created and search our  to see if it has the product by the product id
  const itemInCart = cart.cartItems.find((el) => el.productId === productId);
  console.log("cartcartcartcartcartcart");
  console.log(cart);

  // check the itemInCart to see if it quantity was updated to 0
  // // if auantity updated to 0, delete item from cartitems
  if (itemInCart && setProductValue === 0) {
    console.log("DELETE ITEM");
    await prisma.cartItem.delete({ where: { id: itemInCart.id } });
    revalidatePath("/products/[id]");
    return;
  }

  // check that the item is in cart

  // if item is in cart, we in crement the value by one
  // check if the item in cart exists

  if (itemInCart) {
    console.log("INSIDE INCART");
    // await prisma get cart item to increment,
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
