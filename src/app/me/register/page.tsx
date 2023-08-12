import s from './Registrationpanel.module.css';
import RegistrationPanel from './RegistrationPanel';
import Footer from '@/components/footer/footer'
import {redirect} from "next/navigation";
import * as config from "@/config/config";
import {ServerPUserProvider} from "components/Auth/serverUserProvider";
import Navbar from "components/nav3/start";

export default async function LoginPage() {
    const user = await ServerPUserProvider(false);
    if(user == null)
        redirect(config.authUrl);

    if(user.banned)
        redirect('/me/banned')

    if(user.hasPayed)
        redirect('/me')


    return (
        <>
            <Navbar/>
            <main className={s.main}>
                <RegistrationPanel user={user} />
            </main>
            <Footer />
        </>
    )
}
