import { redirect } from 'next/navigation'
import Navbar from "components/deprecated/navbar2/_nav";
import Footer from "components/footer/footer";
import s from "./page.module.css";
import React from "react";
import * as c from '@/config/config'
import Panel from "./permabanned";
import {ServerUserProviderBuilder} from "components/Auth/ServerUserBuilder";


export default async function Page(){
    const user = await ServerUserProviderBuilder()
        .addUser()
        .execute();

    if(user == null)
        redirect(c.authUrl)

    if(user.user.unbannable)
        redirect('/me')

    return(
        <>
            <Navbar/>
            <main className={s.main}>
                <Panel user={user}/>
            </main>
            <Footer />
        </>
    )
}