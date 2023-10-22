import { prisma } from "./prisma";
import { cookies } from "next/headers";

export async function createCart() {
  const newCart = prisma.cart.create({
    data: {},
  });

  cookies().set("cartId", (await newCart).id);
}
