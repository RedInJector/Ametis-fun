'use client'
import React, {useEffect, useState} from "react";
import sm from "components/navbar2/_navMobile.module.css";
import Image from "next/image";
import {usePathname} from "next/navigation";
import Link from "next/link";
import UserButton from "components/navbar2/UserButton";


export function NavMobile() {
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
        <div className={className}>
            <Image
                priority
                src="/nav/Hamburger_icon.svg"
                width={100}
                height={100}
                alt=""
                className={`${sm.Image} ${sm.topbutton}`}
                onClick={clickHandler}
            />
        </div>
    )
}

function NavMobileOpened({ clickHandler, className }: { clickHandler: any, className: any }) {
    const pathname = usePathname();
    return (
        <>
            <div className={className}>
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

                <Link onClick={clickHandler} className={`${pathname == '/' ? sm.selectedButton : null} ${sm.button}`} href="/" draggable="false">Головна</Link>
                <Link onClick={clickHandler} className={`${pathname == '/wiki/first_time_on_server/rules' ? sm.selectedButton : null} ${sm.button}`} href="/wiki/first_time_on_server/rules" draggable="false">Правила</Link>
                <Link onClick={clickHandler} className={`${pathname == '/wiki' ? sm.selectedButton : null} ${sm.button}`} href="/wiki" draggable="false">Вікі</Link>
                <Link onClick={clickHandler} className={`${pathname == '/map' ? sm.selectedButton : null} ${sm.button}`} href="/map" draggable="false">Мапа</Link>
                <UserButton />
            </div>
        </>
    )
}