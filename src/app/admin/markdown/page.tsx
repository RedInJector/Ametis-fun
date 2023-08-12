
import s from './page.module.css'
import Link from "next/link";
import * as config from "@/config/config";
import {notFound} from "next/navigation";
import {MD} from "@/types/MD";





export default async function Page(){

    const response = await fetch(`${config.apiUri}/api/v2/markdown/getAll`, {
        method: 'GET',
        cache: 'no-store',
    });

    if(!response.ok)
        notFound();

    const data = await response.json() as MD[];



    return(
        <main className={s.main}>
            { data.map((md) => (
                <div className={s.Page}>
                    <Link href={md.wiki ? `/wiki/${md.path}` : `/${md.path}`}>{md.path}</Link>
                    <Link className={s.EditLink} href={`/admin/markdown/edit/${md.path}`}>[Edit]</Link>
                </div>
            ))}

            <Link className={s.EditLink} href={"/admin/markdown/add"}>[New]</Link>
        </main>
    )
}