import { prisma } from "./prisma";
import { cookies } from "next/headers";
import { Cart, CartItem, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { cartItems: { include: { product: true } } };
}>;

export interface ShoppingCart extends CartWithProducts {
  size: number;
  subtotal: number;
}

export async function reEvalCart(): Promise<ShoppingCart | null> {
  const session = await getServerSession(authOptions);

  let cart: CartWithProducts | null = null;

  if (session) {
    cart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
      include: { cartItems: { include: { product: true } } },
    });
  } else {
    const localCartId = cookies().get("localCartId")?.value;
    cart = localCartId
      ? await prisma.cart.findUnique({
          where: { id: localCartId },
          include: { cartItems: { include: { product: true } } },
        })
      : null;
  }

  if (!cart) {
    return null;
  }

  return {
    ...cart,
    size: cart.cartItems.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    ),
  };
}

export async function getCart(): Promise<ShoppingCart | null> {
  const session = await getServerSession(authOptions);

  let cart: CartWithProducts | null = null;

  if (session) {
    cart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
      include: { cartItems: { include: { product: true } } },
    });
  } else {
    const localCartId = cookies().get("localCartId")?.value;
    console.log("localcartid");
    console.log(localCartId);
    cart = localCartId
      ? await prisma.cart.findUnique({
          where: { id: localCartId },
          include: { cartItems: { include: { product: true } } },
        })
      : null;
  }

  if (!cart) {
    return null;
  }

  return {
    ...cart,
    size: cart.cartItems.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    ),
  };
}

export async function createCart(): Promise<ShoppingCart> {
  const session = await getServerSession(authOptions);

  let newCart: Cart;

  if (session) {
    newCart = await prisma.cart.create({
      data: { userId: session?.user?.id },
    });
  } else {
    newCart = await prisma.cart.create({
      data: {},
    });

    cookies().set("localCartId", newCart.id, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });
  }

  return { ...newCart, cartItems: [], size: 0, subtotal: 0 };
}
