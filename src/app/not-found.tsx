import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex w-full h-[500px] flex-col justify-center align-middle items-center overflow-hidden">
      <h2 className="text-xl">404 Page not found</h2>
      <p>Sorry, that page doesnt exist.</p>
      <Link className="btn" href="/">
        Back Home
      </Link>
    </div>
  );
}
