import * as config from "@/config/config";
import {ConvertSecondsToTime} from "@/Helpers/SecondsConverter";

export default async function IsOnline({name}:{name:string | null}){
    if(name == null)
        return (<>Error. How do you even did that?</>)

    const response = await fetch(`${config.apiUri}/api/v2/p/${name}/isonline`, {
        method: 'GET',
        //next: {revalidate: 120}
    });

    const time= Number(await response.text());

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

}