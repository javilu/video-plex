"use client";
import { deleteLibro } from "@/app/detail/[id]/deleteLibro";
import Link from "next/link";

export default function BorrarLibroBoton(params: any) {
    return (
        <Link href="/">
            <button
                className="mt-2 mx-4 px-4 py-2 rounded bg-red-800 hover:bg-red-900 text-zinc-300 text-lg transition duration-300"
                onClick={async () => {
                    await deleteLibro(params.id);
                }}
            >
                Borrar libro
            </button>
        </Link>
    );
}
