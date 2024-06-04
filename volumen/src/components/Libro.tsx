import Link from "next/link";
import LibroModel from "@/lib/models/libro";
import { WithId } from "mongodb";

export default function Libro(props: { libro: WithId<LibroModel> }) {
    return (
        <li className="bg-indigo-300 flex flex-col w-52 rounded-xl overflow-hidden">
            <div>
                <Link href={`/detail/${props.libro._id}`}>
                    <img
                        src={`/img/${props.libro.image}`}
                        alt={props.libro.name}
                        className="w-full h-80 object-cover flex-grow drop-shadow-2xl"
                    />
                </Link>
                <br />
            </div>
            <div className="px-3 pb-3">
                <div className="flex justify-between">
                    <p>
                        <b>{props.libro.name}</b>
                    </p>
                    <p className="text-xl text-indigo-800">
                        <b>{props.libro.price.toString()}€</b>
                    </p>
                </div>
                <p className="text-zinc-600">{props.libro.author}</p>
                <div className="flex">
                    <button className="rounded px-3 py-0.5 bg-indigo-800 hover:bg-indigo-900 text-zinc-300 transition duration-300">
                        Añadir
                    </button>
                </div>
            </div>
        </li>
    );
}
