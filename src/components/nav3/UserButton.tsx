'use client'
import s from './_nav.module.css';
import * as config from '@/config/config'
import Image from 'next/image'
import Auth from 'public/nav/Frame.svg'
import { apiUri, authUrl } from '@/config/config'
import { useState } from 'react';
import { motion } from "framer-motion"
import Link from 'next/link';
import {PUser} from "@/types/PrivateUser";
import LogoutComponent, {Logout} from "components/Auth/logout";


let usr: PUser | null;

export default function UserButton({ user }: { user: PUser | null }) {
    usr = user;
    const [isOpened, setOpened] = useState(false);

    const handleClick = () => {
        setOpened(!isOpened);
    }
    const setOpenedState = () => {
        setOpened(false);
    }

    return (
        <div className={s.userbuttonContainer}>
            <div className={s.desktopVisible}>
                {
                    user === null ? <AuthButton/> : (
                        <div className={s.avatarContainer} onClick={handleClick}>
                            <AvatarImage/>
                            <Image
                                src="/nav/downarrow.svg"
                                alt=""
                                width={24}
                                height={24}
                            />
                        </div>
                    )
                }
            </div>
            <div className={s.mobileVisible}>
                {
                    user === null ? <AuthButton/> : <Panel/>
                }
            </div>

            {isOpened && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                    <Panel setOpened={setOpenedState} />
                </motion.div>
            )}
        </div>
    );
}

function AuthButton() {
    return (
        <a href={authUrl} className={` ${s.authButton} ${s.Center} `}>
            <Image src={Auth} alt="" className={s.svg1}  />
            Авторизація
        </a>
    )
}

function Panel({setOpened}:{setOpened?: () => void}) {
    //const auth = useAuth();


    
    return (
        <div className={s.OpenedPanel}>
            <div>
            <div className={s.PanelTop}>

                <AvatarImage/>

                <div className={s.PanelTopRight}>
                    <Name />
                    {usr?.hasPayed ?
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
            <LogoutComponent onClick={setOpened} className={s.PanelBottom} >
                <Image
                    src="/nav/logout.svg"
                    width={20}
                    height={20}
                    alt=""
                    className={s.logoutimage}
                />
                Вийти з акаунта
            </LogoutComponent>
            </div>
        </div>
    )
}
function Name() {
    const convertToPaddedString = (num: number, length: number): string => {
        const numString = num.toString();
        return numString.padStart(length, '0');
    }

    if(usr == null)
        return (<></>);

    return (
        <>
            {usr.minecraftName == null ?
                <Link href='/me' className={s.userlink}>{usr.discordUser.Username}
                    #{convertToPaddedString(usr.id, 5)}</Link>
                :
                <div>
                    <Link href="/me" className={s.userlink}>{usr.minecraftName}#{convertToPaddedString(usr.id, 5)}</Link>
                </div>
            }
        </>
    )
}


function AvatarImage() {
    ///const user = useUser();
    if (usr === null)
        return (<></>)


    if(usr?.minecraftName != null)
        return (
            <img className={s.avatarimage} src={`${apiUri}/api/v2/p/${usr?.minecraftName}/head.png`}></img>
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

