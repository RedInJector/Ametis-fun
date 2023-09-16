'use client'


import {useUser} from "components/Auth/UserProvider";
import s from './page.module.css'
import Link from "next/link";
import {FileTextIcon, PersonIcon} from "@radix-ui/react-icons";
import {UserRoles} from "@/types/PrivateUser";

export default function Page() {
    const user = useUser();

    return (
        <>
            <div className={s.main}>
                <div className={s.grid}>
                    <div className={s.gridChildren}>
                        {user?.user.userRole! >= UserRoles.MODERATOR ?
                            <Link className={`${s.violet} ${s.coolbutton}`} href={"/admin/users"}>
                                <PersonIcon className={s.icon}/>
                                Users
                            </Link>
                            : null
                        }
                        {user?.user.userRole! >= UserRoles.EDITOR ?
                            <Link className={`${s.blue} ${s.coolbutton}`} href={"/admin/markdown"}>
                                <FileTextIcon className={s.icon}/>
                                Pages
                            </Link>
                            : null
                        }
                    </div>
                    <div className={s.gridChildren}></div>
                    <div className={s.gridChildren}>
                    </div>
                </div>
            </div>
        </>
    )
}