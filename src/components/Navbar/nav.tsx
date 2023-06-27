'use client';
import Image from 'next/image'
import s from './nav.module.css'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import * as config from '@/config/config';


import { useUser } from '@/components/Auth/UserProvider'

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
    <>
    <nav className={`${isScrolled ? s.navIsSticky : null} ${s.nav}`}>
        <Desktop />
    </nav>
    <nav className={s.navMobile}>
      <Mobile />
    </nav>
    </>
  )
}

function Mobile() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleMobileMenuToggle = () => { 
    setIsMobileMenuOpen(!isMobileMenuOpen); 
    if (isMobileMenuOpen) {
      document.body.classList.add("overflow-y-hidden")
    } else {
      document.body.classList.remove("overflow-y-hidden")
    }
  };

  return (
    <>
      {isMobileMenuOpen ?
        <MobileOpened handleMobileMenuToggle={handleMobileMenuToggle} />
        :
        <MobileClosed handleMobileMenuToggle={handleMobileMenuToggle} />
      }
    </>
  )
}

function MobileOpened({ handleMobileMenuToggle }: { handleMobileMenuToggle: any }) {
  return (
    <div className={s.MobileOpened}>
      <button className={s.ToggleButton} onClick={handleMobileMenuToggle}>
        <Image
          src='/nav/Cancel.svg'
          width={36}
          height={36}
          alt='Cancel Button'
          className={s.CancelImage}
        />
      </button>
      <div className={s.MobileLinksWrapper}>
        <NavList />
        <AuthButton />
      </div>
    </div>
  )
}

function AuthButton() {
  const user = useUser();
  return (
    <div className={s.AuthButtonWrapper}>
      {
        user.user === null ? <a className={`${s.selectedIcon} ${s.AuthorButton}`} href={config.authUrl} draggable="false">
          <AuthIcon />
          Авторизація
        </a> :
          <div className={s.avatarWrapper}>
            <Image
              priority
              src={`https://cdn.discordapp.com/avatars/${user.user.discordUser.discordId}/${user.user.discordUser.avatarUrl}`}
              width="300"
              height="300"
              className={s.Avatar}
              alt=""
              onClick={user.logout}
              draggable="false"
            />
          </div>
      }
    </div>
  );
}

function AuthIcon() {
  return (
    <Image
      draggable="false"
      priority
      src="/nav/Frame.svg"
      width={30}
      height={30}
      className={`${s.authorzIcon}`}
      alt="Join our Discord!"
    />
  );
}


function MobileClosed({ handleMobileMenuToggle }: { handleMobileMenuToggle: any }) {
  return (
    <button className={s.ToggleButton} onClick={handleMobileMenuToggle}>
      <Image
        src='/nav/Hamburger_icon.svg'
        width={36}
        height={36}
        alt='Burger Button'
        className={s.burgerimage}
      />
    </button>
  )
}


function Desktop() {
  return (

    <div className={s.navWrapper}>
      <div className={s.left}>
        <Link className={s.logo} href="/" draggable="false"><ServerIcon /></Link>
      </div>
      <div className={s.central}>
        <NavList />
      </div>
      <div className={s.right}>
        <AuthButton />
      </div>
    </div>

  )
}


function NavList() {
  const pathname = usePathname();
  return (
    <>
      <Link className={pathname == "/" ? s.selectedButton : s.notSelectedButton} href="/" draggable="false">Головна</Link>
      <Link className={pathname == "/rules" ? s.selectedButton : s.notSelectedButton} href="/" draggable="false">Правила</Link>
      <Link className={pathname == "/wiki" ? s.selectedButton : s.notSelectedButton} href="/" draggable="false">Вікі</Link>
      <Link className={pathname == "/map" ? s.selectedButton : s.notSelectedButton} href="/" draggable="false">Мапа</Link>
      <Link className={`${s.selectedIcon} ${s.iconButton}`} href="/" draggable="false"><TelegramIcon /></Link>
      <Link className={`${s.selectedIcon} ${s.iconButton}`} href="/" draggable="false"><DiscordIcon /></Link>
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

function useWindowSize() {
  throw new Error('Function not implemented.');
}
