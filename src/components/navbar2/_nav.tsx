'use client';
import s from './_nav.module.css';
import sm from './_navMobile.module.css'
import Image from 'next/image'
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Link from 'next/link'
import { usePathname } from "next/navigation";
import useWindowDimensions from 'components/hooks/useWindowDimension';

import DSIcon from 'public/nav/discord-icon.svg'
import TGIcon from 'public/nav/Telegram-icon.svg'
import Logo from 'public/Ametis-icon.svg'

import UserButton from './UserButton';

import * as config from "@/config/config";


export default function Navbar() {
    const { width } = useWindowDimensions();
    return (
        <>

            {
                width ?
                    width <= 800 ?
                        <NavMobile /> : <NavDesktop />
                    :
                    null
            }
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
        <nav className={`${isScrolled ? s.navDesktopSticky : null} ${s.navDesktop}`}>
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
            <Link className={`${pathname == '/wiki/first_time_on_server/rules' ? s.selectedButton : null} ${s.button}`} href="/wiki/first_time_on_server/rules" draggable="false">Правила</Link>
            <Link className={`${pathname == '/wiki' ? s.selectedButton : null} ${s.button}`} href="/wiki" draggable="false">Вікі</Link>
            <Link className={`${pathname == '/map' ? s.selectedButton : null} ${s.button}`} href="/map" draggable="false">Мапа</Link>
            <Link className={`${s.iconButton}`} href={config.discordUrl} draggable="false"><Image priority src={DSIcon} alt={""} /></Link>
            <Link className={`${s.iconButton}`} href={config.telegramUrl} draggable="false"><Image priority src={TGIcon} alt={""} /></Link>
        </>
    )
}
//<Link className={pathname == "/" ? s.selectedButton : s.notSelectedButton} href="/" draggable="false">Головна</Link>


function NavMobile() {
    const [isOpened, setOpened] = useState(false);
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

    const clickhandler = () => {
        setOpened(!isOpened);
    }

    return (
        <>
            <NavMobileClosed className={`${sm.navMobile} ${ isScrolled ? sm.sticky : null}`} clickHandler={clickhandler} />
            <NavMobileOpened className={`${sm.opened} ${isOpened ? sm.navOpened : sm.navClosed}`} clickHandler={clickhandler} />
        </>
    )
}

function NavMobileClosed({ clickHandler, className }: { clickHandler: any, className: any }) {
    return (
        <nav className={className}>
            <Image
                priority
                src="/nav/Hamburger_icon.svg"
                width={100}
                height={100}
                alt=""
                className={`${sm.Image} ${sm.topbutton}`}
                onClick={clickHandler}
            />
        </nav>
    )
}

function NavMobileOpened({ clickHandler, className }: { clickHandler: any, className: any }) {
    const pathname = usePathname();
    return (
        <>
            <nav className={className}>
                <div className={sm.top}>
                    <Image
                        priority
                        src="/nav/Cancel.svg"
                        width={100}
                        height={100}
                        alt=""
                        className={`${sm.Image2} ${sm.topbutton}`}
                        onClick={clickHandler}
                    />
                </div>

                <Link className={`${pathname == '/' ? sm.selectedButton : null} ${sm.button}`} href="/" draggable="false">Головна</Link>
                <Link className={`${pathname == '/wiki/first_time_on_server/rules' ? sm.selectedButton : null} ${sm.button}`} href="/wiki/first_time_on_server/rules" draggable="false">Правила</Link>
                <Link className={`${pathname == '/wiki' ? sm.selectedButton : null} ${sm.button}`} href="/wiki" draggable="false">Вікі</Link>
                <Link className={`${pathname == '/map' ? sm.selectedButton : null} ${sm.button}`} href="/map" draggable="false">Мапа</Link>
                <UserButton />
            </nav>
        </>
    )
}