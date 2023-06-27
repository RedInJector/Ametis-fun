'use client';
import s from './_nav.module.css';
import sm from './_navMobile.module.css'
import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { useUser } from 'components/Auth/UserProvider'
import { usePathname } from "next/navigation";
import useWindowDimensions from 'components/hooks/useWindowDimension';

import { inter } from '@/fonts/fonts'

import DSIcon from 'public/nav/discord-icon.svg'
import TGIcon from 'public/nav/Telegram-icon.svg'
import Logo from 'public/Ametis-icon.svg'
import Auth from 'public/nav/Frame.svg'

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
                <Image
                    priority
                    src={Logo}
                    alt=""
                    className={s.Image}
                />
                <div className={`${s.Center} ${s.HorizontalCenter}`}>
                    <NavList />
                </div>
                <AuthButton />
            </div>
        </nav>

    )
}

function AuthButton() {
    return (
        <div className={`${inter.className} ${s.authButton} ${s.Center} `}>
            <Image
                src={Auth}
                alt=""
            />
            Авторизація
        </div>
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
            <Link className={`${s.iconButton}`} href="/" draggable="false"><Image priority src={DSIcon} alt={""} /></Link>
            <Link className={`${s.iconButton}`} href="/" draggable="false"><Image priority src={TGIcon} alt={""} /></Link>
        </>
    )
}
//<Link className={pathname == "/" ? s.selectedButton : s.notSelectedButton} href="/" draggable="false">Головна</Link>


function NavMobile() {
    return (
        <nav className={s.navMobile}>

        </nav>
    )
}