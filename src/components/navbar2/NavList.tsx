'use client'
import {usePathname} from "next/navigation";
import Link from "next/link";
import s from "components/navbar2/_nav.module.css";
import * as config from "@/config/config";
import Image from "next/image";
import DSIcon from 'public/nav/discord-icon.svg'
import TGIcon from 'public/nav/Telegram-icon.svg'
import React from "react";

export function NavList() {
    const pathname = usePathname();
    return (
        <>
            <Link className={`${pathname == '/' ? s.selectedButton : null} ${s.button}`} href="/" draggable="false">Головна</Link>
            <Link className={`${pathname == '/wiki/first_time_on_server/rules' ? s.selectedButton : null} ${s.button}`} href="/wiki/first_time_on_server/rules" draggable="false">Правила</Link>
            <Link className={`${pathname == '/wiki' ? s.selectedButton : null} ${s.button}`} href="/wiki" draggable="false">Вікі</Link>
            <Link className={`${pathname == '/map' ? s.selectedButton : null} ${s.button}`} href="/map" draggable="false">Мапа</Link>
            <Link className={`${s.iconButton}`} href={config.discordUrl} draggable="false"><Image priority src={DSIcon} alt={""} /></Link>
            <Link className={`${s.iconButton}`} href={config.telegramUrl} draggable="false"><Image priority src={TGIcon} alt={""} /></Link>
        </>
    )
}