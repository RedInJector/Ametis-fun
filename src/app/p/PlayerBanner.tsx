import {PublicUser} from "@/types/publicUser";
import Link from "next/link";
import Image from "next/image";
import * as c from '@/config/config'
import s from './page.module.css'
import ConvertToTag from "@/Helpers/ConvertToTag";


export default function PlayerBanner({publicUser}:{publicUser: PublicUser}){
    return(
        <Link className={s.PlayerbannerContainer} href={`/p/${publicUser.user.minecraftName}`}>
            <Image
                src={`${c.apiUri}/api/v2/p/${publicUser.user.minecraftName}/head.png`}
                alt={""}
                width={50}
                quality={100}
                height={50}
            />
            <div>
                <div className={s.playerName}>{publicUser.user.minecraftName}#{ConvertToTag(publicUser.user.id, 5)}</div>
                <div className={s.roleWrapper}>{publicUser.roles?.map((role) => (
                        <div className={s.RoleContainer}>
                            <span
                                style={{ backgroundColor: `rgb(${role.R},${role.G},${role.B})` }}
                                className={s.dot}
                            ></span>
                            {role.name}
                        </div>
                ))}</div>
            </div>


        </Link>
    )
}