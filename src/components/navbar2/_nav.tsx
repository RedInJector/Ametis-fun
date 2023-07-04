'use client';
import s from './_nav.module.css';
import sm from './_navMobile.module.css'
import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { usePathname } from "next/navigation";
import useWindowDimensions from 'components/hooks/useWindowDimension';

import { inter } from '@/fonts/fonts'

import DSIcon from 'public/nav/discord-icon.svg'
import TGIcon from 'public/nav/Telegram-icon.svg'
import Logo from 'public/Ametis-icon.svg'

import UserButton from './UserButton';

import * as config from "@/config/config";

export default function Navbar() {
    const { width } = useWindowDimensions();
    return (
        <>
            {width > 800 ? <NavDesktop /> : <NavMobile /> }
        </>

    )
}

function NavDesktop() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 0;
            setIsScrolled(scrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`${isScrolled ? s.navDesktopSticky : null} ${inter.className} ${s.navDesktop}`}>
            <div className={s.navDesktopWrapper}>
                <Link href="/">
                    <Image
                        priority
                        src={Logo}
                        alt=""
                        className={s.Image}
                    />
                </Link>
                <div className={`${s.Center} ${s.HorizontalCenter}`}>
                    <NavList />
                </div>
                <UserButton />
            </div>
        </nav>

    )
}


function NavList() {
    const pathname = usePathname();
    return (
        <>
            <Link className={`${pathname == '/' ? s.selectedButton : null} ${s.button}`} href="/" draggable="false">Головна</Link>
            <Link className={`${pathname == '/rules' ? s.selectedButton : null} ${s.button}`} href="/" draggable="false">Правила</Link>
            <Link className={`${pathname == '/wiki' ? s.selectedButton : null} ${s.button}`} href="/" draggable="false">Вікі</Link>
            <Link className={`${pathname == '/map' ? s.selectedButton : null} ${s.button}`} href="/" draggable="false">Мапа</Link>
            <Link className={`${s.iconButton}`} href={config.discordUrl} draggable="false"><Image priority src={DSIcon} alt={""} /></Link>
            <Link className={`${s.iconButton}`} href={config.telegramUrl} draggable="false"><Image priority src={TGIcon} alt={""} /></Link>
        </>
    )
}
//<Link className={pathname == "/" ? s.selectedButton : s.notSelectedButton} href="/" draggable="false">Головна</Link>


function NavMobile() {
    const [isOpened, setOpened] = useState(false);
    return (
        <nav className={s.navMobile}>
            {isOpened ? <NavMobileOpened /> : null}
            
        </nav>
    )
}

function NavMobileOpened(){
    const pathname = usePathname();
    return(
        <>
            <div className={sm.opened}>
                <div className={sm.top}>

                </div>
                
                <Link className={`${pathname == '/' ? sm.selectedButton : null} ${sm.button}`} href="/" draggable="false">Головна</Link>
                <Link className={`${pathname == '/rules' ? sm.selectedButton : null} ${sm.button}`} href="/" draggable="false">Правила</Link>
                <Link className={`${pathname == '/wiki' ? sm.selectedButton : null} ${sm.button}`} href="/" draggable="false">Вікі</Link>
                <Link className={`${pathname == '/map' ? sm.selectedButton : null} ${sm.button}`} href="/" draggable="false">Мапа</Link>
                <UserButton />
            </div>
        </>
    )
}