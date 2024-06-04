import { deleteCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

const action = async () => {
    "use server";

    deleteCookie("user");
    redirect("/");
};

export default function Logout() {
    return (
        <form action={action}>
            <button type="submit">Logout</button>
        </form>
    );
};
