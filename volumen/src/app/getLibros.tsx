"use server";
import Libro from "@/lib/models/libro";
import getDb from "@/lib/mongodb";

export async function getLibros(page: number = 1, librosPerPage: number = 10) {
    const db = await getDb();
    const totalLibros = await db.collection<Libro>("products").countDocuments(); // Total de libros
    const skip = (page - 1) * librosPerPage;
    const libros = await db
        .collection<Libro>("products")
        .find({})
        .sort({ publication: -1 })
        .skip(skip)
        .limit(librosPerPage)
        .toArray();

    const librosSerializables = libros.map((libro) => ({
        ...libro,
        _id: libro._id.toString(),
        price: libro.price.toString(),
        publication: libro.publication.toISOString(),
    }));

    return { libros: librosSerializables, totalLibros };
}
