'use client';
import Image from 'next/image'
import s from './nav.module.css'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';

import AuthButton from './loginButton'

import { usePathname } from "next/navigation";

export default function NavBar() {

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
    <nav className={`${isScrolled ? s.navIsSticky : null} ${s.nav}`}>
      <div className={s.navWrapper}>
        <NavList />
      </div>
    </nav>
  )
}



function NavList() {
  const pathname = usePathname();

  return (
    <>
      <div className={s.left}>
        <Link className={s.logo} href="/" draggable="false"><ServerIcon /></Link>
      </div>
      <div className={s.central}>
        <Link className={pathname == "/" ? s.selectedButton : s.notSelectedButton} href="/" draggable="false">Головна</Link>
        <Link className={pathname == "/rules" ? s.selectedButton : s.notSelectedButton} href="/" draggable="false">Правила</Link>
        <Link className={pathname == "/wiki" ? s.selectedButton : s.notSelectedButton} href="/Wiki" draggable="false">Вікі</Link>
        <Link className={pathname == "/map" ? s.selectedButton : s.notSelectedButton} href="/map" draggable="false">Мапа</Link>
        <Link className={`${s.selectedIcon} ${s.iconButton}`} href="/" draggable="false"><TelegramIcon /></Link>
        <Link className={`${s.selectedIcon} ${s.iconButton}`} href="/" draggable="false"><DiscordIcon /></Link>
      </div>
      <div className={s.right}>

        <AuthButton />
      </div>
    </>
  )
}

function ServerIcon() {
  return (
    <Image
      draggable="false"
      priority
      src="/Ametis-icon.svg"
      width={36}
      height={36}
      alt="Logo"
    />
  );
}


function TelegramIcon() {
  return (
    <Image
      draggable="false"
      priority
      src="/Telegram-icon.svg"
      width={28}
      height={28}
      className={s.dIcon}
      alt="Join our Discord!"
    />
  );
}

function DiscordIcon() {
  return (
    <Image
      draggable="false"
      priority
      src="/discord-icon.svg"
      width={28}
      height={28}
      className={s.dIcon}
      alt="Join our Discord!"
    />
  );
}