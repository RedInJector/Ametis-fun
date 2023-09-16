
import s from './page.module.css'
import Link from "next/link";
import * as config from "@/config/config";
import {notFound} from "next/navigation";
import {MD} from "@/types/MD";
import DeleteDoc from "@/app/admin/markdown/deleteDoc";
import {cookies} from "next/headers";
import ToMain from "@/app/admin/ToMain";





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
            <div>
                <ToMain/>
            </div>
            { data.map((md) => (
                <div className={s.Page}>
                    <Link href={md.tags?.some(value => value.tag == 'wiki') ? `/wiki/${md.path}` : `/${md.path}`}>
                        <h3>{md.title}: </h3>
                        <span>{md.path}</span>

                    </Link>
                    <div className={s.PageBot}>
                        <div>
                            <span>Tags: </span>
                            {md.tags?.map((md) => (
                                <span>
                                    "{md.tag}"
                                </span>
                            ))}
                        </div>
                        <div className={s.Links}>
                            <Link className={s.link} href={`/admin/markdown/edit/${md.path}`}>[Edit]</Link>
                            <DeleteDoc className={s.link} href={`${config.apiUri}/api/v2/markdown/remove?param=${md.path}`}>
                                [Delete]
                            </DeleteDoc>
                        </div>
                    </div>
                </div>
            ))}

            <Link className={s.link} href={"/admin/markdown/add"}>[New]</Link>
        </main>
    )
}