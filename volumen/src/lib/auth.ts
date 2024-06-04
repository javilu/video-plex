"use server"

import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { InfoUser } from "./models/usuario";

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

type CookieType = {
    user: InfoUser;
};

type CookieTypeField = keyof CookieType;


async function encrypt<Field extends CookieTypeField>(data: CookieType[Field]) {
    return new SignJWT(data)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodedKey);
};

/**
 * Decrypts the given data using JWT verification.
 * @param data - The data to be decrypted.
 * @returns The decrypted payload.
 */
async function decrypt<Field extends CookieTypeField>(data: string) {
    try {
        const { payload } = await jwtVerify<CookieType[Field]>(data, encodedKey, { algorithms: ["HS256"] });
        return payload;
    } catch (error) {
        console.error("Error decrypting data:", error);
    }
};

/**
 * Stores the session data in a cookie.
 * @param sessionData - The session data to be stored.
 * @param name - The name of the cookie.
 */
export async function store<Field extends CookieTypeField>(name: Field, sessionData: CookieType[Field]) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const session = await encrypt(sessionData);

    cookies().set(name, session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/"
    });
};


export async function retrieve<Field extends CookieTypeField>(name: Field) {
    const cookie = cookies().get(name);
    if (!cookie) return undefined;
    
    try {
        const value = await decrypt<Field>(cookie.value);
        return value;
    } catch (error) {
        console.error("Error parsing cookie value:", error);
        return undefined;
    }
};

/**
 * Deletes a cookie with the specified name.
 * @param name - The name of the cookie to delete.
 */
export async function deleteCookie<Field extends CookieTypeField>(name: Field) {
    cookies().delete(name);
};
