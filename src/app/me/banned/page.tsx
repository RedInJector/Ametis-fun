import { redirect } from 'next/navigation'
import Navbar from "components/deprecated/navbar2/_nav";
import Footer from "components/footer/footer";
import s from "./page.module.css";
import React from "react";
import {ServerPUserProvider} from "components/Auth/serverUserProvider";
import * as c from '@/config/config'
import Panel from "./banned";


export default async function Page(){
    const user = await ServerPUserProvider(false);

    if(user == null)
        redirect(c.authUrl)

    if(!user.banned)
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