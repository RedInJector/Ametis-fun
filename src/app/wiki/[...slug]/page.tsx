import { allPosts } from "contentlayer/generated";
import {getMDXComponent, useMDXComponent} from "next-contentlayer/hooks";
import s from './page.module.css'
import { notFound } from 'next/navigation'
import Sidebar from "./sidebar";
import Redirect from "components/redirect";
import {MDXComponents} from "mdx/types";
import Image from "next/image";


export const generateStaticParams = async () =>
    allPosts.map((post: any) => ({ slug: post._raw.flattenedPath.split('/') }));


export const generateMetadata = ({ params }: any) => {
    const post = allPosts.find(
        (post: any) => post._raw.flattenedPath === params.slug.join('/')
    );

    return { title: post?.title };
};


const mdxComponents: MDXComponents = {
    grayasd: ({ children }) => <span className="grayyer"> {children} </span>,
    // Add a custom component.
    Scrpt: () => <Redirect></Redirect> ,
}


const PostLayout = ({ params }: { params: { slug: string[] } }) => {
    const post = allPosts.find((post) => (
        post._raw.flattenedPath === params.slug.join('/'))
    );


    let MDXContent;

    if (!post) notFound();


    MDXContent = useMDXComponent(post.body.code)

    return (
        <>
            <main className={s.main}>
                <Sidebar />
                <article>
                    <MDXContent components={mdxComponents} />
                </article>
            </main>
        </>
    );
};

export default PostLayout;
