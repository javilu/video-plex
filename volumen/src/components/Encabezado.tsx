import Link from "next/link";
import Image from "next/image";
import { InfoUser } from "@/lib/models/usuario";
import Logout from "@/components/Logout";
import Buscador from "@/components/Buscador";
        
export default function Encabezado(props: { user: InfoUser | undefined }) {
    return (
        <header className="flex items-center justify-between px-4 py-2 bg-gray-200 text-gray-800">
            <div>
                <Link href="/">
                    <h1 className="flex flex-row items-center text-2xl font-bold">
                        Librería
                        <Image
                            src="/home.svg"
                            alt="Logo"
                            width={65}
                            height={65}
                            className="ml-2"
                        />
                    </h1>
                </Link>
            </div>
            <div className="flex items-center w-1/2">
                <Buscador />
            </div>
            <nav>
                {props.user && (
                    <>
                        {props.user.rol === "admin" && <Link href="/dashboard" className="mr-4">
                            Dashboard
                        </Link>}
                        <Logout />
                    </>
                )}
                {!props.user && (
                    <>
                        <Link href="/login" className="mr-4">
                            Iniciar sesión
                        </Link>
                        <Link href="/register">Crear cuenta</Link>
                    </>
                )}
            </nav>
        </header>
    );
}
