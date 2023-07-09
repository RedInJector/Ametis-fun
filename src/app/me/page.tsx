
import UserProvider from 'components/Auth/UserProvider';
import NavBar from 'components/navbar2/_nav'
import Footer from 'components/footer/footer'
import { User } from '@/types/types';
import * as config from "@/config/config";
import {cookies}  from 'next/headers'
import { redirect } from 'next/navigation'
import Me from './me';

export default async function LoginPage() {

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
    if(!user.hasPayed)
        redirect('/me/register')

    return (
        <>
        <UserProvider AuthorizedOnly={true}>
            <NavBar />
            <Me />
        </UserProvider>
        <Footer />
        </>
    )
}
