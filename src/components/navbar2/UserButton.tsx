'use client'
import s from './_nav.module.css';
import { inter } from '@/fonts/fonts'
import Image from 'next/image'
import { useAuth, useUser } from 'components/Auth/UserProvider'
import Auth from 'public/nav/Frame.svg'
import { apiUri, authUrl } from '@/config/config'
import { useEffect, useState } from 'react';
import { motion } from "framer-motion"
import Link from 'next/link';

export default function UserButton() {
    const user = useUser();
    const [isOpened, setOpened] = useState(false);

    const handleclick = () => {
        setOpened(!isOpened);
    }
    useEffect(() => {
        const onScroll = () => setOpened(false);
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <div className={s.userbuttonContainer}>
                {user == null ?
                    <a href={authUrl} className={`${inter.className} ${s.authButton} ${s.Center} `}>
                        <Image src={Auth} alt="" />
                        Авторизація
                    </a>
                    :
                    <div className={s.avatarContainer} onClick={handleclick}>
                        <AvatarImage />
                        <Image
                            src="/nav/downarrow.svg"
                            alt=""
                            width={24}
                            height={24}
                        />

                    </div>
                }
                {!isOpened ?
                    null
                    :
                    <motion.div initial= {{opacity: 0}} animate={{ opacity: 100 }} transition={{ duration: 0.2}}>
                        <Panel />
                    </motion.div>

                }
            </div>
        </>
    )
}

function Panel() {
    const auth = useAuth();
    const user = auth.user;

    if (user === null)
        return (<></>)

    const convertToPaddedString = (num: number, length: number): string => {
        const numString = num.toString();
        return numString.padStart(length, '0');
    }

    const handleLogout = () =>{
        auth.logout();
    }
    
    return (
        <div className={s.OpenedPanel}>
            <div className={s.PanelTop}>
                <AvatarImage />
                <div className={s.PanelTopRight}>
                    {user.minecraftPlayer == null ?
                        <div>{user.discordUser.publicUsername}
                        #{convertToPaddedString(user.id, 5)}</div>
                        :
                        <div>
                            {user.minecraftPlayer.playerName}
                            #{convertToPaddedString(user.id, 5)}
                        </div>
                    }
                    <Link href='/me' className={s.buybutton}>
                        <Image
                            src="/nav/Basket.svg"
                            width={20}
                            height={20}
                            alt=""
                        />
                        Придбати прохідку
                    </Link>
                </div>
            </div>
            <div className={s.PanelBottom} onClick={handleLogout}>
                <Image
                    src="/nav/logout.svg"
                    width={20}
                    height={20}
                    alt=""
                    className={s.logoutimage}
                />
                Вийти з акаунта
            </div>
        </div>
    )
}

function AvatarImage() {
    const user = useUser();
    if (user === null)
        return (<></>)

    if(user.minecraftPlayer != null)
        return (
            <Image
                src={apiUri + "/api/v1/player/head/" + user.minecraftPlayer?.playerName}
                width={100}
                height={100}
                alt=""
                className={s.avatarimage}
            />
        )
    
    return(
        <Image
        src={"https://mc-heads.net/avatar/MHF_Steve/100"}
        width={100}
        height={100}
        alt=""
        className={s.avatarimage}
    />
    )

}