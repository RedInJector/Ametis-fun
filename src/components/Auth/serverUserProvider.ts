import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import * as config from "@/config/config";
import {PrivateUser, UserRoles,} from "@/types/PrivateUser";

export async function ServerUserOnlyProvider(required:boolean):Promise<PrivateUser | null>{
    const cookie = cookies().get('_dt');

    if(cookie == null)
        return null;

    const headers = new Headers();
    headers.append('Cookie', `_dt=${cookie.value}`);

    const response = await fetch(`${config.apiUri}/api/v2/me?type=user-only`, {
        method: 'GET',
        cache: 'no-store',
        headers: headers,
    });




    if(!response.ok)
        if(!required)
            return null;
        else
            redirect("/");


    const u = await response.json();

    return u as PrivateUser;
}

export async function ServerUserAllProvider(required:boolean):Promise<PrivateUser | null>{
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

    const u = await response.json();


    return u as PrivateUser;
}

