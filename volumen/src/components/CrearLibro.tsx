"use client";
import { useState } from "react";

interface CrearLibroProps {
    onSubmit: (formData: FormData) => void;
}

interface FormErrors {
    price?: string;
}

export default function CrearLibro({ onSubmit }: CrearLibroProps): JSX.Element {
    const [errors, setErrors] = useState<FormErrors>({});

    const handleISBNInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.slice(0, 13);
        event.target.value = value.replace(/[^0-9]/g, "");
    };

    const handlePriceInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(",", ".");
        if (!/^\d*\.?\d{0,2}$/.test(value)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                price: "El precio debe ser un número con hasta dos decimales.",
            }));
            event.preventDefault();
            return;
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, price: undefined }));
        }
        event.target.value = value;
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <div>
            <h1 className="text-4xl text-indigo-800 font-bold">Crear libro</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(new FormData(e.target as HTMLFormElement));
                }}
                className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md"
                encType="multipart/form-data"
            >
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
                            required
                            className="w-full p-3 border border-gray-300 rounded mt-1"
                            onChange={handlePriceInput}
                        />
                        {errors.price && (
                            <p className="text-red-500 text-xs">
                                {errors.price}
                            </p>
                        )}
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
                        <input
                            type="file"
                            name="image"
                            id="image"
                            required
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
                            required
                            className="w-full h-32 p-3 border border-gray-300 rounded mt-1"
                        ></textarea>
                    </div>
                </div>
                <button
                    type="submit"
                    className="justify-center bg-indigo-800 hover:bg-indigo-900 text-zinc-300 font-bold py-3 px-4 rounded mt-6 transition duration-300"
                >
                    Crear libro
                </button>
            </form>
        </div>
    );
}
