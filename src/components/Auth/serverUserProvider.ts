import {User} from "@/types/types";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import * as config from "@/config/config";
import {PrivateUser, PUser} from "@/types/PrivateUser";


export default async function ServerUserProvider(required:boolean):Promise<User | null>{
    const cookie = cookies().get('_dt');

    if(cookie == null)
        return null;

    const headers = new Headers();
    headers.append('Cookie', `_dt=${cookie.value}`);

    const response = await fetch(`${config.apiUri}/api/v1/getuserdata2`, {
        method: 'GET',
        cache: 'no-store',
        headers: headers,
    });

    if(!response.ok)
        if(!required)
            return null;
        else
            redirect("/");

    let user = await response.json() as User;


    return user;
}

export async function ServerPUserProvider(required:boolean):Promise<PUser | null>{
    const cookie = cookies().get('_dt');

    if(cookie == null)
        return null;

    const headers = new Headers();
    headers.append('Cookie', `_dt=${cookie.value}`);

    const response = await fetch(`${config.apiUri}/api/v2/me`, {
        method: 'GET',
        cache: 'no-store',
        headers: headers,
    });

    if(!response.ok)
        if(!required)
            return null;
        else
            redirect("/");

    return await response.json() as PUser;
}

export async function ServerPrivateUserProvider(required:boolean):Promise<PrivateUser | null>{
    const cookie = cookies().get('_dt');

    if(cookie == null)
        return null;

    const headers = new Headers();
    headers.append('Cookie', `_dt=${cookie.value}`);

    const response = await fetch(`${config.apiUri}/api/v2/me?type=all`, {
        method: 'GET',
        cache: 'no-store',
        headers: headers,
    });

    if(!response.ok)
        if(!required)
            return null;
        else
            redirect("/");

    return await response.json() as PrivateUser;
}

