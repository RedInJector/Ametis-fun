import Link from "next/link";
import s from "./page.module.css";
import Image from "next/image";
import * as config from "@/config/config";
import {groupMD} from "@/types/MD";
import {notFound} from "next/navigation";




async function page() {

    // TODO: revalidate
    const getwikiList = await fetch(`${config.apiUri}/api/v2/markdown/wiki/getgroupes`, {
        method: 'GET',
        next: { revalidate: 3 }
    });


    if (!getwikiList.ok)
        notFound();

    const mds = await getwikiList.json() as groupMD[];



    const groupedMDs: Record<string, groupMD[]> = mds.reduce((groups: any, md) => {
        if (!groups[md.groupName]) {
            groups[md.groupName] = [];
        }

        groups[md.groupName].push(md);
        return groups;
    }, {});

    const sortedMDs = Object.keys(groupedMDs).sort((b, a) => b.localeCompare(a));

    const RenderedGroups = () => sortedMDs.map((md) => (
            <>
                <div>
                    <div className={s.groupWrapper}>
                    <div className={s.groupTitle}>
                        {md.slice(2)}
                    </div>
                        <div className={s.groups}>
                        {
                            groupedMDs[md].sort((a, b) => a.orderPosition - b.orderPosition).map((md) => (
                                <Link href={`${config.thisDomain}/wiki/${md.path}`} className={s.post} key={md.id}>
                                    <Image
                                        src={md.imageUrl}
                                        className={s.postimage}
                                        quality={100}
                                        width={250}
                                        height={250}
                                        alt="" />
                                    <p className={s.textbackground}>
                                        {md.title}
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
