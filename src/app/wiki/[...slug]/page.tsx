import * as config from "@/config/config";
import {notFound} from "next/navigation";
import s from './page.module.css'
import {Metadata, ResolvingMetadata} from 'next'
import {groupMD, MD} from "@/types/MD";
import SearchBar from "@/app/wiki/[...slug]/SearchBar";
import Sidebar from "@/app/wiki/[...slug]/sidebar";


export async function generateMetadata({params}: { params: { slug: string[] } }): Promise<Metadata> {
    const route = params.slug.join('/');
    const res = await fetch(`${config.apiUri}/api/v2/markdown/get/${route}`, {
        method: 'GET',
        cache: 'no-cache'
    });

    const md = await res.json() as MD;

    return {
        title: md.title,
    }
}

export default async function Page({params}: { params: { slug: string[] } }) {

    const route = params.slug.join('/');


    console.log(route);

    const res = await fetch(`${config.apiUri}/api/v2/markdown/get/${route}`, {
        method: 'GET',
        cache: 'no-cache',
        next: { revalidate: 3600 }
    });

    if (!res.ok)
        notFound();

    const md = await res.json() as MD;

    if(!md.wiki)
        notFound();


    const getwikiList = await fetch(`${config.apiUri}/api/v2/markdown/wiki/getgroupes`, {
        method: 'GET',
        next: { revalidate: 3600 }
    });


    let wikiList = null;
    if (getwikiList.ok)
        wikiList = await getwikiList.json() as groupMD[];


    return (
        <main className={s.main}>
            <SearchBar/>
            {wikiList ?
                <Sidebar mds={wikiList} currentMD={md}/>
                :
                null
            }
            <article>
                {md.renderedContent ?
                    <div dangerouslySetInnerHTML={{__html: md.renderedContent}}/>
                    :
                    <>Not Found</>
                }
            </article>
        </main>
    )
}