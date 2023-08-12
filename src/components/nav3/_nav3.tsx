'use client';
import s from './_nav.module.css';
import sm from './_navMobile.module.css'
import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { usePathname } from "next/navigation";

import DSIcon from 'public/nav/discord-icon.svg'
import TGIcon from 'public/nav/Telegram-icon.svg'
import Logo from 'public/Ametis-icon.svg'

import UserButton from './UserButton';

import * as config from "@/config/config";
import {PUser} from "@/types/PrivateUser";


let NavBarlist: paths[];
interface paths{
    pathname: string,
        text: string
}

export default function Navbar3({user, NavBarList}:{user:PUser | null, NavBarList: paths[]}) {
    NavBarlist = NavBarList;
    return (
        <>
            <nav className={s.DeskQ}><NavDesktop user={user}/></nav>
            <nav className={s.MobileQ}><NavMobile user={user} /></nav>
        </>

    )
}

function NavDesktop({ user }: { user: PUser | null}) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 0;
            setIsScrolled(scrolled);
        };

        handleScroll();

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
                <UserButton user={user}/>
            </div>
        </nav>

    )
}


function NavList() {
    const pathname = usePathname();
    return (
        <>
            {NavBarlist.map(value => {
                return (
                    <Link
                        key={value.pathname}
                        className=
                            {`${pathname == value.pathname ?
                                s.selectedButton : null} 
                                  ${s.button}`
                            }
                        href={value.pathname}
                        draggable="false">
                        {value.text}
                    </Link>
                )
            })}
            <Link className={`${s.iconButton}`} href={config.discordUrl} draggable="false"><Image priority src={DSIcon} alt={""} /></Link>
            <Link className={`${s.iconButton}`} href={config.telegramUrl} draggable="false"><Image priority src={TGIcon} alt={""} /></Link>
        </>
    )
}
//<Link className={pathname == "/" ? s.selectedButton : s.notSelectedButton} href="/" draggable="false">Головна</Link>


function NavMobile({ user }: { user: PUser | null}) {
    const [isOpened, setOpened] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 0;
            setIsScrolled(scrolled);
        };

        handleScroll();

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
            <NavMobileOpened user={user} className={`${sm.opened} ${isOpened ? sm.navOpened : sm.navClosed}`} clickHandler={clickhandler} />
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

function NavMobileOpened({ clickHandler, className, user }: { clickHandler: any, className: any, user:PUser | null }) {
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

                {NavBarlist.map(value => {
                    return (
                        <Link
                            key={value.pathname}
                            onClick={clickHandler}
                            className=
                                {`${pathname == value.pathname ?
                                    sm.selectedButton : null} 
                                  ${sm.button}`
                                }
                            href={value.pathname}
                            draggable="false">
                            {value.text}
                        </Link>
                    )
                })}
                <UserButton user={user}/>
            </nav>
        </>
    )
}