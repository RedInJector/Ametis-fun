import s from './page.module.css'
import {notFound} from "next/navigation";
import {ServerUserProviderBuilder} from "components/Auth/ServerUserBuilder";
import UserProvider from "components/Auth/UserProvider";
import {UserRoles} from "@/types/PrivateUser";


export default async function layout({children,}: { children: React.ReactNode}){
    const user = await ServerUserProviderBuilder()
        .addUser()
        .execute();

    if(user == null)
        notFound();

    console.log(user.user.userRole < UserRoles.PLAYER)
    if(!user.user.admin)
        notFound();



    return(
        <div className={s.layout}>
            <UserProvider PrivateUser={user}>
                {children}
            </UserProvider>
        </div>
    )
}