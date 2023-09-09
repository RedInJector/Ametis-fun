'use client'
import {PublicUser} from "@/types/publicUser";
import Link from "next/link";
import Image from "next/image";
import * as c from '@/config/config'
import s from './page.module.css'
import ConvertToTag from "@/Helpers/ConvertToTag";
import {ConvertSecondsToTime} from "@/Helpers/SecondsConverter";
import IsOnline from "components/UserPage/IsOnline";


export default function PlayerBanner({publicUser, className}: { publicUser: PublicUser, className?: any }) {
    return (
        <Link className={`${className} ${s.PlayerbannerContainer}`} href={`/p/${publicUser.user.minecraftName}`}>
            <div className={s.BannerTop}>
                <Image
                    src={`${c.apiUri}/api/v2/p/${publicUser.user.minecraftName}/head.png`}
                    alt={""}
                    width={50}
                    quality={100}
                    height={50}
                />
                <div className={s.playerName}>
                    {publicUser.user.minecraftName}#{ConvertToTag(publicUser.user.id, 5)}
                    <br/>
                    <div className={s.lastOnline}>
                        Був на сервері: <IsOnline name={publicUser.user.minecraftName}/>
                    </div>
                </div>
            </div>

            <div className={s.roleWrapper}>{publicUser.roles?.map((role) => (
                <div key={role.name} className={s.RoleContainer}>
                        <span
                            style={{backgroundColor: `rgb(${role.R},${role.G},${role.B})`}}
                            className={s.dot}
                        ></span>
                    {role.name}
                </div>
            ))}</div>

        </Link>
    )
}

/*
function IsOnline({time}:{time?:number}){



    if(time == -1){
        return (
            <>
                Ніколи
            </>
        )
    }

    if(time == 0)
        return (
            <>
                Онлайн
            </>
        )


    return(
        <>
            {ConvertSecondsToTime(time)} тому
        </>
    )

*/