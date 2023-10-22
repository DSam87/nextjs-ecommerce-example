import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import formatPrice from "@/lib/formatPrice";
import PriceTag from "./PriceTag";

interface ProductCard {
  product: Product;
  className: string;
}

function ProductCard({ product }: ProductCard) {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    <Link className="inline-block" href={"/products/" + product.id}>
      <div className="card w-full bg-base-100 hover:shadow-lg shadow-md transition-all ">
        <figure>
          <Image
            src={product.imageUrl}
            width={800}
            height={400}
            alt={product.name}
            className="h-48 object-cover"
          />
        </figure>
        <div className="card-body flex flex-row">
          <div className="flex flex-col  justify-between items-start w-full">
            <div className="flex flex-row justify-center align-middle items-center gap-3">
              <h2 className="card-title">{product.name}</h2>
            </div>
            <p>{product.description}</p>
          </div>
          <div>
            <div className="flex flex-col justify-end items-end ">
              {isNew ? (
                <div className="inline badge badge-accent my-1 ">
                  <p>New</p>
                </div>
              ) : null}
              <PriceTag
                className="py-4 px-3 font-bold w-full"
                price={product.price}
              />
            </div>
            <div className="flex-1 card-actions justify-end py-1 w-full md:py-4  ">
              <button className=" flex-1 btn btn-primary self ml-auto uppercase">
                Check It Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
