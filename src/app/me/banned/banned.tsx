'use client'
import {useUser} from "components/Auth/UserProvider";
import Image from "next/image";
import s from "@/app/me/register/Registrationpanel.module.css";
import React from "react";
import {inter} from "@/fonts/fonts";
import Spinner from "components/Spinner/Spinner";
import {User} from "@/types/types";



export default function Banned(){
    const user = useUser()

    return(
        <>
            {user ? <Panel user={user} /> : <Spinner />}
        </>
    )

}


function Panel({user}:{user:User}){
    return(
        <main>
            <section className={`${inter.className} ${s.section}`}>
                <Image
                    draggable="false"
                    priority
                    src="/BigAuthorize.svg"
                    width={224}
                    height={41}
                    className={s.BigAuthorize}
                    alt="Logo"
                />
                <div className={s.container}>
                    <div className={s.Title}>Ви забанені на сервері</div>
                    <Image
                        draggable="false"
                        src={`https://mc-heads.net/avatar/${user?.minecraftName}`}
                        width={100}
                        height={100}
                        className={s.AvatarIcon}
                        alt="Player Icon"
                    />
                </div>
            </section>

        </main>
    )
}