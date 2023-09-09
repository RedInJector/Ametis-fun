'use client'
import * as config from "@/config/config";
import {ConvertSecondsToTime} from "@/Helpers/SecondsConverter";
import {useEffect, useState} from "react";

export default function IsOnline({name}:{name:string | null}){
    const [lastOnline, setlastOnline] = useState(0);

    if(name == null)
        return (<>Error. How do you even did that?</>)

    useEffect(() => {
        const fetchOnline = async () => {
            const response = await fetch(`${config.apiUri}/api/v2/p/${name}/isonline`, {
                method: 'GET',
                //next: {revalidate: 120}
            });

            const time= Number(await response.text());
            setlastOnline(time)

        }

        fetchOnline();

    }, [])


    if(lastOnline == -1){
        return (
            <>
                Ніколи
            </>
        )
    }

    if(lastOnline == 0)
        return (
            <>
                Онлайн
            </>
        )


    return(
        <>
            {ConvertSecondsToTime(lastOnline)} тому
        </>
    )

}