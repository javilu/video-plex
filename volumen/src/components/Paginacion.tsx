"use client";
import React, { useState, useEffect } from "react";
import ListaDeLibros from "./ListaDeLibros";
import { getLibros } from "@/app/getLibros";
import { WithId } from "mongodb";
import Libro from "@/lib/models/libro";

export const Paginacion = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [libros, setLibros] = useState<WithId<Libro>[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const librosPerPage = 10;

    useEffect(() => {
        const fetchLibros = async () => {
            const { libros: fetchedLibros, totalLibros } = await getLibros(
                currentPage,
                librosPerPage
            );
            setLibros(fetchedLibros);
            setTotalPages(Math.ceil(totalLibros / librosPerPage));
        };
        fetchLibros();
    }, [currentPage]);

    return (
        <>
            <ListaDeLibros libros={libros} />
            <div className="flex flex-col items-center justify-center mb-4">
                <div className="flex flex-row items-center justify-center mb-4">
                    <button
                        className="bg-indigo-300 text-black py-2 px-4 mx-2 rounded hover:bg-indigo-400 transition duration-300"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <div className="flex flex-row items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-chevron-left h-4 w-4"
                            >
                                <path d="m15 18-6-6 6-6"></path>
                            </svg>
                            <span>Anterior</span>
                        </div>
                    </button>
                    <button
                        className="bg-indigo-300 text-black py-2 px-4 mx-2 rounded hover:bg-indigo-400 transition duration-300"
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        <div className="flex flex-row items-center">
                            <span>Siguiente</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-chevron-right h-4 w-4"
                            >
                                <path d="m9 18 6-6-6-6"></path>
                            </svg>
                        </div>
                    </button>
                </div>
                <span>
                    Página {currentPage} de {totalPages}
                </span>
            </div>
        </>
    );
};
