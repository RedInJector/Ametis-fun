import Footer from 'components/footer/footer'
import * as config from "@/config/config";
import {redirect} from 'next/navigation'
import Me from './me';
import Navbar from "components/nav3/start";
import {ServerUserProviderBuilder} from "components/Auth/ServerUserBuilder";


type Props = {
    searchParams?: {
        logout?: number;
    };
};

export default async function LoginPage(params: Props) {
    if (params.searchParams?.logout == 1)
        redirect('/');


    const privateUser = await ServerUserProviderBuilder()
        .addRoles()
        .addUser()
        .addStats()
        .execute();


    if (privateUser == null)
        redirect(config.authUrl);


    if (privateUser.user.banned)
        if (privateUser.user.unbannable)
            redirect('/me/banned')
        else
            redirect('/me/permabanned')

    if (!privateUser.user.hasPayed)
        redirect('/me/register')


    return (
        <>
            <Navbar/>
            <Me privateUser={privateUser}/>
            <Footer/>
        </>
    )
}
