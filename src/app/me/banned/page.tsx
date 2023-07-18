import { User } from '@/types/types';
import { redirect } from 'next/navigation'
import UserProvider from "components/Auth/UserProvider";
import Navbar from "components/navbar2/_nav";
import Footer from "components/footer/footer";
import s from "./page.module.css";
import React from "react";
import ServerUserProvider from "components/Auth/serverUserProvider";
import * as c from '@/config/config'
import Panel from "./banned";


export default async function Page(){
    const user = await ServerUserProvider();
    if(user == null)
        redirect(c.authUrl)

    if(!user.banned)
        redirect('/me')

    return(
        <>
            <UserProvider AuthorizedOnly={true}>
                <Navbar />
            </UserProvider>
            <main className={s.main}>
            <Panel user={user}/>
            </main>
            <Footer />
        </>
    )
}

/*
function Panel({user}:{user:User}){
    const convertToPaddedString = (num: number, length: number): string => {
        const numString = num.toString();
        return numString.padStart(length, '0');
    }

    return(

        <section className={s.section}>
            <div className={s.container}>
                <div className={s.Title}>Ви забанені на сервері</div>
                <div className={s.playerBanner}>
                    <Image
                        draggable="false"
                        src={apiUri + "/api/v1/p/head/" + user.minecraftName}
                        width={100}
                        height={100}
                        className={s.AvatarIcon}
                        alt="Player Icon"
                    />
                    <div>
                        <div>{user.minecraftName ? user.minecraftName : user.discordUser.publicUsername}#
                            {convertToPaddedString(user.id, 5)}</div>
                    </div>
                </div>
                <div>
                    <div>Вартість розбану:</div>
                    <div className={s.amount}>100₴</div>
                </div>
                <div className={s.annotationsContainer}>
                    <div className={s.annottation}>*Зі списку Ціль виберіть “Розбан на сервері”</div>
                    <div className={s.annottation}>*В полі Ім’я вводьте ваш Minecraft Нікнейм</div>
                </div>
                <div className={s.PaybuttonContainer}>
                    <a className={s.PayButton} href='/'>
                        <div className={s.PayButtonInside}>
                            <Image
                                draggable="false"
                                priority
                                src="/login/card.svg"
                                width={20}
                                height={20}
                                className={s.buttonPayicon}
                                alt="Logo"
                            />
                            Оплатити
                        </div>
                    </a>
                </div>
            </div>
            <Logout>
                aasd
            </Logout>
        </section>


    )
}

 */