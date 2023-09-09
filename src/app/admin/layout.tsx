import s from './page.module.css'
import {notFound} from "next/navigation";
import {ServerUserProviderBuilder} from "components/Auth/ServerUserBuilder";


export default async function layout({children,}: { children: React.ReactNode}){
    const user = await ServerUserProviderBuilder()
        .addUser()
        .execute();

    if(user == null)
        notFound();

    if(!user.user.admin)
        notFound();



    return(
        <div className={s.main2}>
            {children}
        </div>
    )
}