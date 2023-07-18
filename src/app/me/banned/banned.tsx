'use client'
import Image from "next/image";
import s from "./page.module.css";
import React from "react";
import {User} from "@/types/types";
import {apiUri} from "@/config/config";
import {motion} from "framer-motion";


export default function Panel({user}:{user:User}){
    const convertToPaddedString = (num: number, length: number): string => {
        const numString = num.toString();
        return numString.padStart(length, '0');
    }
    const anim = {
        initial:{ y: 30,  opacity: 0 },
        animate:{ y:0, opacity: 1 },
        transition:{ type: 'spring', damping: 13, }
    }
    return(

            <motion.section className={s.section} initial={anim.initial} animate={anim.animate}  transition={anim.transition}>
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
            </motion.section>


    )
}