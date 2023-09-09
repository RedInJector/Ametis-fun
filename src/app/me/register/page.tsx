import s from './Registrationpanel.module.css';
import RegistrationPanel from './RegistrationPanel';
import Footer from '@/components/footer/footer'
import {redirect} from "next/navigation";
import * as config from "@/config/config";
import Navbar from "components/nav3/start";
import {ServerUserProviderBuilder} from "components/Auth/ServerUserBuilder";

export default async function LoginPage() {
    const user = await ServerUserProviderBuilder()
        .addUser()
        .execute();

    if(user == null)
        redirect(config.authUrl);


    if(user.user.hasPayed)
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
