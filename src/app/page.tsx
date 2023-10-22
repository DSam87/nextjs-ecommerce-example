import Image from "next/image";
import { prisma } from "../lib/db/prisma";
import ProductCard from "./components/ProductCart";
import Link from "next/link";
import ProductHero from "./components/ProductHero";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  // function getHeroCard(productCardsArray) {}

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
    <div className="p-4">
      <ProductHero
        product={products[0]}
        className={"hero"}
        key={products[0].id}
      />
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {productCards.slice(1)}
      </div>
    </div>
  );
}
