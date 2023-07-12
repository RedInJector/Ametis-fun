import { User } from '@/types/types';
import * as config from "@/config/config";
import {cookies}  from 'next/headers'
import { redirect } from 'next/navigation'


export default async function Page(){
    const cookie = cookies().get('_dt');
    if(cookie == null)
        redirect(config.authUrl);

    const headers = new Headers();
    headers.append('Cookie', `_dt=${cookie.value}`);

    const response = await fetch(`${config.apiUri}/api/v1/getuserdata2`, {
        method: 'GET',
        cache: 'no-store',
        headers: headers,
    });

    if(!response.ok)
        redirect('/');

    const user = await response.json() as User;
    if(!user.banned)
        redirect('/me')

    return(
        <>
            you were banned
        </>
    )
}