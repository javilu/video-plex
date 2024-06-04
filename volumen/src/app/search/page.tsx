import ListaDeLibros from "@/components/ListaDeLibros";
import Libro from "@/lib/models/libro";
import getDb from "@/lib/mongodb";

async function getLibros(busqueda: string) {
    const db = await getDb();
    const libros = await db
        .collection<Libro>("products")
        .find({
            $or: [
                { name: { $regex: busqueda, $options: "i" } },
                { author: { $regex: busqueda, $options: "i" } },
                { categories: { $regex: busqueda, $options: "i" } },
            ],
        })
        .sort({ publication: -1 })
        .toArray();

    return libros;
}

const Page = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string };
}) => {
    const libros = await getLibros(searchParams.busqueda);
    return (
        <div className="bg-zinc-300 text-black min-h-screen">
            <ListaDeLibros libros={libros} />
        </div>
    );
};

export default Page;
