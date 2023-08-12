
import Footer from 'components/footer/footer'
import * as config from "@/config/config";
import { redirect } from 'next/navigation'
import Me from './me';
import {ServerPrivateUserProvider} from "components/Auth/serverUserProvider";
import Navbar from "components/nav3/start";

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
        <Navbar/>
        <Me privateUser={privateUser}/>
        <Footer />
        </>
    )
}
