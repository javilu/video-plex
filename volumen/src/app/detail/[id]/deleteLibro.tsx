"use server";
import Libro from "@/lib/models/libro";
import getDb from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function deleteLibro(id: string) {
    try {
        const db = await getDb();
        await db
            .collection<Libro>("products")
            .deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
        console.error("Error al eliminar el libro:", error);
    }
}
