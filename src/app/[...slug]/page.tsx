import {Metadata} from "next";
import * as config from "@/config/config";
import {MD} from "@/types/MD";
import {notFound} from "next/navigation";
import s from "@/app/wiki/[...slug]/page.module.css";
import Footer from "components/footer/footer";
import Navbar from "components/nav3/start";

export async function generateMetadata({params}: { params: { slug: string[] } }): Promise<Metadata> {
    const route = params.slug.join('/');
    const res = await fetch(`${config.apiUri}/api/v2/markdown/get/${route}`, {
        method: 'GET',
        cache: 'no-cache'
    });

    if(!res.ok)
        notFound()

    const md = await res.json() as MD;

    return {
        title: md.title,
    }
}

export default async function Page({params}: { params: { slug: string[] } }) {

    const route = params.slug.join('/');

    const res = await fetch(`${config.apiUri}/api/v2/markdown/get/${route}`, {
        method: 'GET',
        //cache: 'no-cache',
        next: {revalidate: 3600}
    });

    console.log(res)

    if (res.status != 200){
        notFound();
    }

    const md = await res.json() as MD;

    if (md.tags?.some(value => value.tag == "wiki"))
        notFound();


    return (
        <>
            <Navbar/>
            <main className={s.main}>
                <article>
                    {md.renderedContent ?
                        <div dangerouslySetInnerHTML={{__html: md.renderedContent}}/>
                        :
                        <>Not Found</>
                    }
                </article>
            </main>
            <Footer/>
        </>
    )
}