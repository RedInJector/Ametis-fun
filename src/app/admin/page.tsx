import UserProvider from '@/components/Auth/UserProvider';
import {cookies}  from 'next/headers'
import { redirect } from 'next/navigation'
import * as config from "@/config/config";
import Table from './Table';
import { User } from '@/types/types';

export default async function Page() {
    const cookie = cookies().get('_dt');
    if(cookie == null)
        redirect('/');

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
    if(!user.admin)
        redirect('/');

    return(
        <UserProvider AuthorizedOnly={true}>
            <Table />
        </UserProvider>
    )

}

