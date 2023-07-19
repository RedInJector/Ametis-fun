import Link from "next/link";
import { allPosts, Post } from "contentlayer/generated";
import s from "./page.module.css";
import Image from "next/image";




function page() {
    const groupedPosts: Record<string, Post[]> = allPosts.reduce((groups: any, page) => {
        if (!groups[page.group]) {
            groups[page.group] = [];
        }

        groups[page.group].push(page);
        return groups;
    }, {});

    const sortedgroups = Object.keys(groupedPosts).sort((b, a) => b.localeCompare(a));

    const RenderedGroups = () => sortedgroups.map((group) => (
            <>
                <div>
                    <div className={s.groupWrapper}>
                    <div className={s.groupTitle}>
                        {group.slice(2)}
                    </div>
                        <div className={s.groups}>
                        {
                            groupedPosts[group].sort((a, b) => a.orderPosition - b.orderPosition).map((post) => (
                                <Link href={post.url} className={s.post} key={post._id}>
                                    <Image
                                        src={post.titleimage}
                                        className={s.postimage}
                                        quality={100}
                                        width={250}
                                        height={250}
                                        alt="" />
                                    <p className={s.textbackground}>
                                        {post.title}
                                    </p>
                                </Link>
                            ))}

                        </div>

                    </div>

                </div>
                <div className={s.hr} />
            </>
    ));

    return (
        <main className={s.main}>
            <div className={s.wrapper}>
                <RenderedGroups />
            </div>
        </main>
    );
}

export default page;
