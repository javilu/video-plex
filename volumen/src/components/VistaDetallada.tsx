import LibroDetallado from "@/components/LibroDetallado";
import AnnadirLibro from "@/components/AnnadirLibro";
import FichaTecnica from "@/components/FichaTecnica";
import ListaDeLibros from "@/components/ListaDeLibros";
import { WithId } from "mongodb";
import Link from "next/link";
import Libro from "@/lib/models/libro";

export default function VistaDetallada(props: {
    id: string;
    libro: WithId<Libro>;
    librosAutor: WithId<Libro>[];
}) {
    return (
        <div className="bg-zinc-300 text-black py-10 px-20 max-[768px]:px-0 ">
            <div className="flex flex-col lg:flex-row">
                {props.libro && <LibroDetallado libro={props.libro} />}
                {props.libro && <AnnadirLibro libro={props.libro} />}
            </div>
            <div className="flex justify-center">
                {props.libro && <FichaTecnica libro={props.libro} />}
            </div>
            <div className="flex justify-center">
                <h2 className="text-xl">
                    <b>Otros libros del autor</b>
                </h2>
            </div>
            <div>
                {props.librosAutor && (
                    <ListaDeLibros libros={props.librosAutor} />
                )}
            </div>
        </div>
    );
}
