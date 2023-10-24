import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import PriceTag from "@/app/components/PriceTag";
import { Metadata } from "next";
import { ReactNode, cache } from "react";
import AddToCartButton from "./AddToCartButton";
import { incrementProductQuantity } from "./actions";
import { getCart } from "@/lib/db/cart";

interface ProductPageProps {
  params: {
    id: string;
  };
}

async function getProductQuantityFromCart(productId: string): Promise<number> {
  const cart = await getCart();
  const cartItem = cart?.cartItems.find(
    (cartItem) => cartItem.productId == productId,
  );
  if (!cartItem) return 0;
  return Number(cartItem.quantity);
}

const getProduct = cache(async (id: string) => {
  const userId = id;
  const product = await prisma.product.findUnique({ where: { id: userId } });
  if (!product) notFound();

  return product;
});

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const productId = id;
  console.log(productId);
  const product = await getProduct(productId);

  return {
    title: product.name + "example-website",
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}

async function ProductPage({ params: { id } }: ProductPageProps) {
  const product = await getProduct(id);
  const productQuantity = await getProductQuantityFromCart(id);

  return (
    <div className="flex justify-center items-center align-middle p-4 max-h-[500px] w-full ">
      <div className="flex flex-col lg:flex-row gap-5 bg-slate-100 p-5 rounded-xl drop-shadow-md hover:drop-shadow-lg transition-all">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={400}
          className="rounded-lg max-h-[500px] w-auto"
          priority={true}
        />

        <div className="flex flex-col flex-1">
          <h1 className="text-5xl font-bold mt-5">{product.name}</h1>
          <PriceTag price={product.price} className="mt-4" />
          <p className="py-6">{product.description}</p>

          <div className="flex gap-2 items-center justify-end h-full flex-col mt-auto">
            <AddToCartButton
              productId={id}
              incrementProductQuantity={incrementProductQuantity}
              initialProductQuantityValue={productQuantity}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
