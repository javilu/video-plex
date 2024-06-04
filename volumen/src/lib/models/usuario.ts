export default interface Usuario {
    mail: string;
    password: string;
    rol: "user" | "admin";
    active: boolean;
    visible: boolean;
};

export type InfoUser = Omit<Usuario, "password">;
