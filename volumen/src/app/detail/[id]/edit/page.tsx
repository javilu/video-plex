import EditarLibro from "@/components/EditarLibro";
import getDb from "@/lib/mongodb";
import { Decimal128, ObjectId } from "mongodb";
import Libro from "@/lib/models/libro";
import { redirect } from "next/navigation";
import fs from "fs/promises";
import path from "path";

// Server Action para cargar los datos del libro
async function loadLibro(id: string) {
    "use server";
    const db = await getDb();
    const libro = await db
        .collection<Libro>("products")
        .findOne({ _id: new ObjectId(id) });

    if (!libro) {
        return null;
    }

    // Convierte el libro a un objeto plano adecuado para los componentes cliente
    const libroCliente = {
        ...libro,
        _id: libro._id.toString(), // Convierte ObjectId a string
        price: libro.price ? libro.price.toString() : undefined, // Convierte Decimal128 a string si existe
        publication: libro.publication
            ? new Date(libro.publication).toISOString()
            : undefined,
    };

    return JSON.parse(JSON.stringify(libroCliente));
}

async function updateLibro(formData: FormData) {
    "use server";
    const db = await getDb();
    const stock = formData.get("stock");
    const price = formData.get("price");
    const isbn = formData.get("isbn");
    const pages = formData.get("pages");

    // Extrae el archivo de imagen del formulario, si existe
    const imageFile = formData.get("image") as File | null;

    let imageName;
    if (imageFile && imageFile.size > 0) {
        // Procesa y guarda el archivo
        imageName = imageFile.name;
        const imagePath = path.join("public/img", imageName);
        const arrayBuffer = await imageFile.arrayBuffer();
        await fs.writeFile(imagePath, Buffer.from(arrayBuffer));
    } else {
        // Conserva el nombre de la imagen existente
        imageName = formData.get("image_name")?.toString();
    }

    // Prepara los datos para actualizar, incluyendo la imagen solo si se ha definido
    const data: Partial<Libro> = {
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

    // Actualiza la base de datos
    await db
        .collection<Libro>("products")
        .updateOne(
            { _id: new ObjectId(formData.get("id")?.toString()) },
            { $set: data }
        );
    redirect("./");
}

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const libro = await loadLibro(id);

    if (!libro) {
        redirect("/not-found");
    }

    return (
        <div className="bg-zinc-300 text-black py-10 flex items-center justify-center min-h-screen">
            <EditarLibro libro={libro} onSubmit={updateLibro} />
        </div>
    );
}
