import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import PriceTag from "@/app/components/PriceTag";

interface ProductPageProps {
  params: {
    id: string;
  };
}

async function ProductPage({ params: { id } }: ProductPageProps) {
  // get the params id
  const productId = id;
  // use prisum to query for the object by the id field
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) notFound();

  console.log(product);

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={800}
        height={400}
        className="rounded-lg block"
        priority={true}
      />

      <div className="flex flex-col ">
        <h1 className="text-5xl font-bold mt-5">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
        <button className="btn btn-primary w-full block  ml-auto uppercase">
          Check It Out
        </button>
      </div>
    </div>
  );
}

export default ProductPage;
