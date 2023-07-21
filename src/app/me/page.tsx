
import UserProvider from 'components/Auth/UserProvider';
import NavBar from 'components/navbar2/_nav'
import Footer from 'components/footer/footer'
import { User } from '@/types/types';
import * as config from "@/config/config";
import {cookies}  from 'next/headers'
import { redirect } from 'next/navigation'
import Me from './me';
import ServerUserProvider from "components/Auth/serverUserProvider";

export default async function LoginPage() {


    const user = await ServerUserProvider(false);
    if(user === null)
        redirect(config.authUrl);

    if(user.banned)
        redirect('/me/banned')

    if(!user.hasPayed)
        redirect('/me/register')

    return (
        <>
        <UserProvider AuthorizedOnly={true}>
            <NavBar />
            <Me user={user}/>
        </UserProvider>
        <Footer />
        </>
    )
}
