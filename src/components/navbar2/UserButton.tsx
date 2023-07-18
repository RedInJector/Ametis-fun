'use client'
import s from './_nav.module.css';
import * as config from '@/config/config'
import Image from 'next/image'
import { useAuth, useUser } from 'components/Auth/UserProvider'
import Auth from 'public/nav/Frame.svg'
import { apiUri, authUrl } from '@/config/config'
import { useEffect, useState } from 'react';
import { motion } from "framer-motion"
import Link from 'next/link';
import useWindowDimensions from 'components/hooks/useWindowDimension';
import { User } from '@/types/types';

export default function UserButton() {
    const { width } = useWindowDimensions();
    const user = useUser();
    const [isOpened, setOpened] = useState(false);

    const handleclick = () => {
        setOpened(!isOpened);
    }
    useEffect(() => {


        const onScroll = () => {
            if(width < 800)
                return;

            setOpened(false)
        };

        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [width]);

    return (
        <>
            {width > 800 ? 
            <div className={s.userbuttonContainer}>
                {user == null ?
                    <a href={authUrl} className={`${s.authButton} ${s.Center} `}>
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
            :
            user == null ?
                <AuthButton />
                :
                <Panel />
            }
        </>
    )
}

function AuthButton() {
    return (
        <a href={authUrl} className={` ${s.authButton} ${s.Center} `}>
            <Image src={Auth} alt="" className={s.svg1}  />
            Авторизація
        </a>
    )
}

function Panel() {
    const auth = useAuth();
    const user = auth.user;

    if (user === null)
        return (<></>)



    const handleLogout = () =>{
        auth.logout();
    }
    
    return (
        <div className={s.OpenedPanel}>
            <div>
            <div className={s.PanelTop}>

                <AvatarImage />

                <div className={s.PanelTopRight}>
                    <Name user={user} />
                    {user.hasPayed ? 
                    <div className={s.ipbutton}>ip: <span className={s.ip}>{config.serverip}</span></div>
                    :
                    <Link href='/me' className={s.buybutton}>
                        <Image
                            src="/nav/Basket.svg"
                            width={20}
                            height={20}
                            alt=""
                        />
                        Придбати прохідку
                    </Link>
}
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
        </div>
    )
}
function Name({ user }: { user: User }) {
    const convertToPaddedString = (num: number, length: number): string => {
        const numString = num.toString();
        return numString.padStart(length, '0');
    }

    return (
        <>
            {user.minecraftName == null ?
                <Link href='/me' className={s.userlink}>{user.discordUser.publicUsername}
                    #{convertToPaddedString(user.id, 5)}</Link>
                :
                <div>
                    <Link href="/me" className={s.userlink}>{user.minecraftName}#{convertToPaddedString(user.id, 5)}</Link>
                </div>
            }
        </>
    )
}


function AvatarImage() {
    const user = useUser();
    if (user === null)
        return (<></>)

    if(user.minecraftName != null)
        return (
            <img className={s.avatarimage} src={apiUri + "/api/v1/p/head/" + user.minecraftName}></img>
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