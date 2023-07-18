import s from './Registrationpanel.module.css';
import RegistrationPanel from './RegistrationPanel';
import UserProvider from '@/components/Auth/UserProvider';
import NavBar from '@/components/navbar2/_nav'
import Footer from '@/components/footer/footer'
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import * as config from "@/config/config";
import {User} from "@/types/types";
import ServerUserProvider from "components/Auth/serverUserProvider";

export default async function LoginPage() {
    const user = await ServerUserProvider();
    if(user == null)
        redirect(config.authUrl);

    if(user.banned)
        redirect('/me/banned')

    if(user.hasPayed)
        redirect('/me')


    return (
        <>
        <UserProvider AuthorizedOnly={true}>
            <NavBar />
            <main className={s.main}>
                <RegistrationPanel user={user} />
            </main>
        </UserProvider>
        <Footer />
        </>
    )
}
