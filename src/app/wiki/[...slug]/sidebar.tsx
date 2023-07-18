'use client'
import Link from "next/link";
import {allPosts, Post} from "contentlayer/generated";
import s from './page.module.css'
import {usePathname} from "next/navigation";


export default function Sidebar() {
    const pathname = usePathname();


    const groupedPosts: Record<string, Post[]> = allPosts.reduce((groups: any, page) => {
        if (!groups[page.group]) {
            groups[page.group] = [];
        }

        groups[page.group].push(page);
        return groups;
    }, {});

    const sortedgroups = Object.keys(groupedPosts).sort((b, a) => b.localeCompare(a));


    const renderedGroups = sortedgroups.map((group) => (
        <details className={s.details} key={group}>
            <summary className={s.h2}>{group.slice(2)}</summary>
            <div className={s.par}>
                <div>
                    <div className={s.verticalLine}></div>
                </div>
                <div>
                    {
                        groupedPosts[group].sort((a, b) => a.orderPosition - b.orderPosition).map((post) => (
                            <div className={s.txt} key={post._id}>
                                <Link className={` ${pathname == post.url ? s.selected : s.link} `} href={post.url}>
                                    {post.title}
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </details>
    ));


    const RenderedGroups2 = () => {
        const containsStringFromArray = (path:any, group: any):boolean =>
            groupedPosts[group].some((post) => {
                return post.url.includes(path)
            });


        return (
            <div className={s.wrapper}>
                {
                sortedgroups.map((group) => (
                    <details key={group} open={containsStringFromArray(pathname, group)} className={s.details} >
                        <summary className={s.h2}>{group.slice(2)}</summary>
                        <div className={s.par}>
                            <div>
                                <div className={s.verticalLine}></div>
                            </div>
                            <div>
                                {
                                    groupedPosts[group].sort((a, b) => a.orderPosition - b.orderPosition).map((post) => (
                                        <div className={s.txt} key={post._id}>
                                            <Link className={` ${pathname == post.url ? s.selected : s.link} `}
                                                  href={post.url}>
                                                {post.title}
                                            </Link>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </details>
                ))
                }
            </div>
        )
    }

    return (
        <>
            <div className={s.sidebarContainer}>
                <RenderedGroups2 />
            </div>
        </>
    )
}

// <Link className={`${pathname == '/' ? s.selectedButton : null} ${s.button}`} href="/" draggable="false">Головна</Link>