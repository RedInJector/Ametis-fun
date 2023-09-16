'use client'
import Table from './Table';
import s from './page.module.css'
import ToMain from "@/app/admin/ToMain";
import {useUser} from "components/Auth/UserProvider";
import {UserRoles} from "@/types/PrivateUser";
import {notFound} from "next/navigation";

export default function Page() {
    const user = useUser();
    if(user?.user.userRole! < UserRoles.MODERATOR)
        notFound();
    
    return(
        <main className={s.main}>
            <ToMain/>
            <Table />
        </main>
    )



}

