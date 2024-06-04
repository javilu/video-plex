"use client";
import React from "react";
import { WithId } from "mongodb";
import Libro from "@/lib/models/libro";

interface EditarLibroProps {
    libro: WithId<Libro>;
    onSubmit: (formData: FormData) => void;
}

export default function EditarLibro({
    libro,
    onSubmit,
}: EditarLibroProps): JSX.Element {
    const handleISBNInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.slice(0, 13);
        event.target.value = value.replace(/[^0-9]/g, "");
    };

    const handlePriceInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(",", ".");
        if (/^\d*(\.\d{0,2})?$/.test(value)) {
            event.target.value = value;
        } else {
            event.target.value = libro.price.toString();
        }
    };

    const publicationDate = libro.publication
        ? new Date(libro.publication)
        : null;
    const publicationValue =
        publicationDate instanceof Date && !isNaN(publicationDate.getTime())
            ? publicationDate.toISOString().split("T")[0]
            : "";
    const today = new Date().toISOString().split("T")[0];

    return (
        <div>
            <h1 className="text-4xl text-indigo-800 font-bold">Editar libro</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(new FormData(e.target as HTMLFormElement));
                }}
                className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md"
                encType="multipart/form-data"
            >
                <input type="hidden" name="id" value={libro._id.toString()} />
                <div className="grid grid-cols-3 gap-6">
                    {/* Nombre del libro */}
                    <div className="mb-6 col-span-3 sm:col-span-1">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-indigo-800"
                        >
                            Nombre del libro
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            defaultValue={libro.name}
                            required
                            className="w-full p-3 border border-gray-300 rounded mt-1"
                        />
                    </div>

                    {/* Autor */}
                    <div className="mb-6 col-span-3 sm:col-span-1">
                        <label
                            htmlFor="author"
                            className="block text-sm font-medium text-indigo-800"
                        >
                            Autor
                        </label>
                        <input
                            type="text"
                            name="author"
                            id="author"
                            defaultValue={libro.author}
                            required
                            className="w-full p-3 border border-gray-300 rounded mt-1"
                        />
                    </div>

                    {/* Precio */}
                    <div className="mb-6 col-span-3 sm:col-span-1">
                        <label
                            htmlFor="price"
                            className="block text-sm font-medium text-indigo-800"
                        >
                            Precio
                        </label>
                        <input
                            type="text"
                            name="price"
                            id="price"
                            defaultValue={libro.price.toString()}
                            required
                            className="w-full p-3 border border-gray-300 rounded mt-1"
                            onChange={handlePriceInput}
                        />
                    </div>

                    {/* Descripción */}
                    <div className="mb-6 col-span-3">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-indigo-800"
                        >
                            Descripción
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            defaultValue={libro.description}
                            required
                            className="w-full h-32 p-3 border border-gray-300 rounded mt-1"
                        ></textarea>
                    </div>

                    {/* Imagen del libro */}
                    <div className="mb-6 col-span-3 md:col-span-2">
                        <label
                            htmlFor="image"
                            className="block text-sm font-medium text-indigo-800"
                        >
                            Imagen del libro
                        </label>
                        {libro.image && (
                            <img
                                src={`/img/${libro.image}`}
                                alt="Imagen del libro"
                                className="mb-4 w-full object-contain h-48"
                            />
                        )}
                        {libro.image && (
                            <input
                                type="hidden"
                                name="image_name"
                                value={libro.image}
                            />
                        )}
                        <input
                            type="file"
                            name="image"
                            id="image"
                            required={!libro.image}
                            className="w-full p-3 border border-gray-300 rounded mt-1"
                            accept="image/*"
                        />
                    </div>

                    {/* Fecha de publicación */}
                    <div className="mb-6 col-span-3 md:col-span-1">
                        <label
                            htmlFor="publication"
                            className="block text-sm font-medium text-indigo-800"
                        >
                            Fecha de publicación
                        </label>
                        <input
                            type="date"
                            name="publication"
                            id="publication"
                            defaultValue={publicationValue}
                            max={today}
                            required
                            className="w-full p-3 border border-gray-300 rounded mt-1"
                        />
                    </div>

                    {/* Categorías */}
                    <div className="mb-6 col-span-3 sm:col-span-1">
                        <label
                            htmlFor="categories"
                            className="block text-sm font-medium text-indigo-800"
                        >
                            Categorías
                        </label>
                        <input
                            type="text"
                            name="categories"
                            id="categories"
                            defaultValue={libro.categories.join(", ")}
                            required
                            className="w-full p-3 border border-gray-300 rounded mt-1"
                        />
                    </div>

                    {/* Stock */}
                    <div className="mb-6 col-span-3 sm:col-span-1">
                        <label
                            htmlFor="stock"
                            className="block text-sm font-medium text-indigo-800"
                        >
                            Stock
                        </label>
                        <input
                            type="number"
                            name="stock"
                            id="stock"
                            min="0"
                            defaultValue={libro.stock}
                            required
                            className="w-full p-3 border border-gray-300 rounded mt-1"
                        />
                    </div>

                    {/* Editorial */}
                    <div className="mb-6 col-span-3 sm:col-span-1">
                        <label
                            htmlFor="editorial"
                            className="block text-sm font-medium text-indigo-800"
                        >
                            Editorial
                        </label>
                        <input
                            type="text"
                            name="editorial"
                            id="editorial"
                            defaultValue={libro.editorial}
                            required
                            className="w-full p-3 border border-gray-300 rounded mt-1"
                        />
                    </div>

                    {/* ISBN */}
                    <div className="mb-6 col-span-3 sm:col-span-1">
                        <label
                            htmlFor="isbn"
                            className="block text-sm font-medium text-indigo-800"
                        >
                            ISBN
                        </label>

                        <input
                            type="number"
                            name="isbn"
                            id="isbn"
                            min="0"
                            defaultValue={libro.isbn}
                            required
                            className="w-full p-3 border border-gray-300 rounded mt-1"
                            onInput={handleISBNInput}
                        />
                    </div>

                    {/* Idioma */}
                    <div className="mb-6 col-span-3 sm:col-span-1">
                        <label
                            htmlFor="language"
                            className="block text-sm font-medium text-indigo-800"
                        >
                            Idioma
                        </label>
                        <input
                            type="text"
                            name="language"
                            id="language"
                            defaultValue={libro.language}
                            required
                            className="w-full p-3 border border-gray-300 rounded mt-1"
                        />
                    </div>

                    {/* Número de páginas */}
                    <div className="mb-6 col-span-3 sm:col-span-1">
                        <label
                            htmlFor="pages"
                            className="block text-sm font-medium text-indigo-800"
                        >
                            Número de páginas
                        </label>
                        <input
                            type="number"
                            name="pages"
                            id="pages"
                            min="1"
                            defaultValue={libro.pages}
                            required
                            className="w-full p-3 border border-gray-300 rounded mt-1"
                        />
                    </div>

                    {/* Opinión */}
                    <div className="mb-6 col-span-3">
                        <label
                            htmlFor="opinion"
                            className="block text-sm font-medium text-indigo-800"
                        >
                            Opinión
                        </label>
                        <textarea
                            name="opinion"
                            id="opinion"
                            defaultValue={libro.opinion}
                            required
                            className="w-full h-32 p-3 border border-gray-300 rounded mt-1"
                        ></textarea>
                    </div>
                </div>
                <button
                    type="submit"
                    className="justify-center bg-indigo-800 hover:bg-indigo-900 text-zinc-300 font-bold py-3 px-4 rounded mt-6 transition duration-300"
                >
                    Actualizar Libro
                </button>
            </form>
        </div>
    );
}
