import s from './page.module.css'
import {ServerPUserProvider} from "components/Auth/serverUserProvider";
import {notFound} from "next/navigation";


export default async function layout({children,}: { children: React.ReactNode}){
    const user = await ServerPUserProvider(false);

    if(user == null)
        notFound();

    if(!user.admin)
        notFound();



    return(
        <div className={s.main2}>
            {children}
        </div>
    )
}