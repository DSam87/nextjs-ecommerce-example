import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import PriceTag from "@/app/components/PriceTag";
import { Metadata } from "next";
import { cache } from "react";
import AddToCartButton from "./AddToCartButton";

interface ProductPageProps {
  params: {
    id: string;
  };
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
  // use prisum to query for the object by the id field
  const product = await getProduct(id);

  return (
    <div className="flex justify-center items-center align-middle h-screen p-4">
      <div className="flex flex-col lg:flex-row gap-5 bg-slate-100 p-5 rounded-xl drop-shadow-md hover:drop-shadow-lg transition-all">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={400}
          className="rounded-lg block"
          priority={true}
        />

        <div className="flex flex-col">
          <h1 className="text-5xl font-bold mt-5">{product.name}</h1>
          <PriceTag price={product.price} className="mt-4" />
          <p className="py-6">{product.description}</p>
          <AddToCartButton productId={id} />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
