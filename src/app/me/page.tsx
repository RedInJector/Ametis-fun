
import UserProvider from 'components/Auth/UserProvider';
import NavBar from 'components/navbar2/_nav'
import Footer from 'components/footer/footer'
import { User } from '@/types/types';
import * as config from "@/config/config";
import {cookies}  from 'next/headers'
import { redirect } from 'next/navigation'
import Me from './me';
import {ServerPrivateUserProvider} from "components/Auth/serverUserProvider";

export default async function LoginPage() {


    const privateUser = await ServerPrivateUserProvider(false);
    if(privateUser == null)
        redirect(config.authUrl);

    if(privateUser.user.banned)
        redirect('/me/banned')

    if(!privateUser.user.hasPayed)
        redirect('/me/register')

    return (
        <>
        <UserProvider AuthorizedOnly={true}>
            <NavBar />
            <Me privateUser={privateUser}/>
        </UserProvider>
        <Footer />
        </>
    )
}
