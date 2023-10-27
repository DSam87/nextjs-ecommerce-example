import Image from "next/image";
import { prisma } from "../lib/db/prisma";
import ProductCard from "./components/ProductCart";
import Link from "next/link";
import ProductHero from "./components/ProductHero";
import Pagination from "./components/Pagination";

interface HomeProp {
  searchParams: {
    page: string;
  };
}

export default async function Home({ searchParams: { page = "1" } }: HomeProp) {
  const currentPage = parseInt(page);
  const pageSize = 3;
  const heroItemCount = 1;

  const totalItemCount = await prisma.product.count();

  let totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize) - 1;
  if (totalPages <= 0) totalPages = 1;

  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip: page !== "1" ? currentPage * pageSize + heroItemCount : 0,
    take: pageSize + heroItemCount,
  });

  console.log("THE PRODUCTS");
  console.log(products);

  let productCards = products.map((product, index) => {
    if (index === 0) {
      return null;
    } else {
      return (
        <ProductCard product={product} className={"card"} key={product.id} />
      );
    }
  });

  return productCards.length ? (
    <div className="p-4 flex flex-col justify-center items-center">
      {
        <ProductHero
          product={products[0]}
          className={"hero "}
          key={products[0].id}
        />
      }
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {productCards.slice(1)}
      </div>
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"></div>
      {totalPages > 0 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  ) : (
    <h1 className="text-center items-center align-middle text-2xl mb-4 uppercase text-gray-800 mt-10">
      End Of Shopping List.
    </h1>
  );
}
