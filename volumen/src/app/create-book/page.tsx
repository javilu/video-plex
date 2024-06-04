import CrearLibro from "@/components/CrearLibro";
import getDb from "@/lib/mongodb";
import { Decimal128 } from "mongodb";
import { redirect } from "next/navigation";
import fs from "fs/promises";
import path from "path";

async function createLibro(formData: FormData) {
    "use server";
    const db = await getDb();

    const stock = formData.get("stock");
    const price = formData.get("price");
    const isbn = formData.get("isbn");
    const pages = formData.get("pages");

    const imageFile = formData.get("image") as File | null;
    let imageName;
    if (imageFile && imageFile.size > 0) {
        imageName = imageFile.name;
        const imagePath = path.join("public/img", imageName);
        const arrayBuffer = await imageFile.arrayBuffer();
        await fs.writeFile(imagePath, Buffer.from(arrayBuffer));
    }

    const data = {
        name: formData.get("name")?.toString(),
        stock: stock ? +stock : undefined,
        price:
            price && typeof price === "string"
                ? new Decimal128(price)
                : undefined,
        description: formData.get("description")?.toString(),
        author: formData.get("author")?.toString(),
        image: imageName,
        categories: formData.get("categories")?.toString().split(", "),
        editorial: formData.get("editorial")?.toString(),
        isbn: isbn ? +isbn : undefined,
        language: formData.get("language")?.toString(),
        pages: pages ? +pages : undefined,
        publication: new Date(
            formData.get("publication")?.toString() ?? new Date()
        ),
        opinion: formData.get("opinion")?.toString(),
    };

    await db.collection("products").insertOne(data);
    redirect("./");
}

export default function Page() {
    return (
        <div className="bg-zinc-300 text-black py-10 flex items-center justify-center min-h-screen">
            <CrearLibro onSubmit={createLibro} />
        </div>
    );
}
