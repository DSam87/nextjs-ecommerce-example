import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import FormSubmitButton from "../components/FormSubmitButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "Add Product - Ecommerce Example Website",
};

async function addProduct(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw new Error("Missing reqkuired fields!");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/");
}

async function AddProductPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Product Name"
          type="text"
          className="mb-3 w-full input input-bordered"
        />
        <textarea
          required
          name="description"
          placeholder="Description of Product"
          id=""
          className="textarea-bordered textarea mb-3 w-full"
        ></textarea>
        <input
          required
          placeholder="Image-url"
          name="imageUrl"
          type="url"
          className="input input-bordered mb-3 w-full"
        />
        <input
          required
          name="price"
          placeholder="Product Price: 11.99"
          type="number"
          className="mb-3 w-full input input-bordered"
        />
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  );
}

export default AddProductPage;
