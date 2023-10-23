import { prisma } from "./prisma";
import { cookies } from "next/headers";
import { Cart, Prisma } from "@prisma/client";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { cartItems: { include: { product: true } } };
}>;

export interface ShoppingCart extends CartWithProducts {
  size: number;
  subtotal: number;
}

export async function getCart(): Promise<ShoppingCart | null> {
  const localCartId = cookies().get("localCartId")?.value;
  console.log("localcartid");
  console.log(localCartId);
  const cart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { cartItems: { include: { product: true } } },
      })
    : null;

  if (!cart) {
    return null;
  }

  return {
    ...cart,
    size: cart.cartItems.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.cartItems.reduce((acc, item) => acc + item.product.price, 0),
  };
}

export async function createCart(): Promise<ShoppingCart> {
  const newCart = await prisma.cart.create({
    data: {},
  });

  cookies().set("localCartId", newCart.id, {
    secure: true,
    httpOnly: true,
    sameSite: true,
  });

  return { ...newCart, cartItems: [], size: 0, subtotal: 0 };
}
