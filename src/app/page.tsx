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
  const pageSize = 6;
  const heroItemCount = 1;

  const totalItemCount = await prisma.product.count();

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip: currentPage * pageSize + heroItemCount,
    take: pageSize + heroItemCount,
  });

  let productCards = products.map((product, index) => {
    if (index === 0) {
      return null;
    } else {
      return (
        <ProductCard product={product} className={"card"} key={product.id} />
      );
    }
  });

  return (
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
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
