"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { login } from "@/app/actions/authentication";

export default function Login() {
    const [state, action] = useFormState(login, undefined);

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-300">
            <form className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 w-full max-w-md" action={action}>
                <h2 className="text-2xl font-bold mb-6 text-center text-indigo-800">Iniciar sesión</h2>
                <div className="mb-4">
                    <label className="block text-indigo-800 text-sm font-bold mb-2" htmlFor="email">
                        Correo
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-indigo-800 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        id="email"
                        name="email"
                        required
                    />
                    {state?.errors?.email && <p className="text-red-600 font-bold">{state.errors.email}</p>}
                </div>
                <div className="mb-6">
                    <label className="block text-indigo-800 text-sm font-bold mb-2" htmlFor="password">
                        Contraseña
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-indigo-800 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        id="password"
                        name="password"
                        required
                    />
                    {state?.errors?.password && <p className="text-red-600 font-bold">{state.errors.password}</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-indigo-800 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                        type="submit"
                    >
                        Iniciar sesión
                    </button>
                    <Link href="/reset-password" className="inline-block align-baseline font-bold text-sm text-indigo-800 hover:text-indigo-900">
                        ¿Has olvidado la contraseña?
                    </Link>
                </div>
            </form>
        </div>
    );
};
