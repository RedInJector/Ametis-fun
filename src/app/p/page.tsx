import * as config from "@/config/config";
import {notFound} from "next/navigation";
import {PublicUser, User} from "@/types/publicUser";
import PlayerBanner from "@/app/p/PlayerBanner";
import s from './page.module.css'


export default async function Page(){

    const response = await fetch(`${config.apiUri}/api/v2/p/all?page=0`, {
        method: 'GET',
        cache: 'no-cache'
    });

    if(!response.ok)
        notFound();

    const users = await response.json() as PublicUser[]

    return(
        <main className={s.main}>
            {users.map((user) => (
                <PlayerBanner publicUser={user}></PlayerBanner>
            ))}
        </main>
    )
}