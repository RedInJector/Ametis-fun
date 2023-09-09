import s from './page.module.css'
import Link from "next/link";
import * as config from "@/config/config";
import {notFound} from "next/navigation";
import MdDocumentEditForm from "./Editor";
import {MD} from "@/types/MD";




export default async function Page({ params }: { params: { slug: string[] } }){
    const route = params.slug.join('/');


    const response = await fetch(`${config.apiUri}/api/v2/markdown/getSource?param=${route}`, {
        method: 'GET',
        cache: 'no-store',
    });

    if(!response.ok)
        notFound();

    const data = await response.json() as MD;


    return(
        <main className={s.main}>
            <section className={s.FormWrapper}>
                <Link className={s.EditLink} href={`/admin/markdown`}>Back</Link>
                <h2>Edit {data.path}</h2>
                <Link className={s.EditLink} href={data.tags?.some(value => value.tag == 'wiki') ? `/wiki/${data.path}` : `/${data.path}`}>View Page</Link>
                <MdDocumentEditForm md={data} />
            </section>
        </main>
    )
}