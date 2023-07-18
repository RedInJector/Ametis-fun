import {User} from "@/types/types";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import * as config from "@/config/config";


export default async function ServerUserProvider():Promise<User | null>{
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
        redirect('/');

    let user = await response.json() as User;


    return user;
}