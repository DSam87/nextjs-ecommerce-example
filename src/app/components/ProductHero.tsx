import Image from "next/image";
import formatPrice from "@/lib/formatPrice";
import { Product } from "@prisma/client";
import PriceTag from "./PriceTag";
import Link from "next/link";

interface ProductHeroProps {
  product: Product;
  className?: string;
}

function ProductHero({ product }: ProductHeroProps) {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    <Link
      className="inline-block hover:drop-shadow-lg drop-shadow-md transition-all "
      href={"/products/" + product.id}
    >
      <div className="hero min-h-[50%] w-[full] rounded-lg bg-base-100">
        <div className="hero-content flex-col lg:flex-row justify-center items-center text">
          <figure className="w-full ">
            <Image
              src={product.imageUrl}
              className="rounded-lg shadow-2xl w-full"
              alt="img"
              width={800}
              height={400}
              priority={true}
            />
          </figure>
          <div>
            <div>
              <h1 className="text-5xl font-bold">{product.name}</h1>
              <p className="py-6">{product.description}</p>
            </div>
            <div className="flex flex-col justify-end align-end items-end mt-5 mb-2">
              {isNew ? <div className="badge">New</div> : null}
              <PriceTag className="py-4 px-3 font-bold" price={product.price} />
            </div>
            <div className="flex">
              <button className="btn btn-primary self ml-auto uppercase">
                Check It Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductHero;
