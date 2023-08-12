'use client'
import Link from "next/link";
import * as config from "@/config/config";
import s from './page.module.css'
import {groupMD, MD} from "@/types/MD";


export default function Sidebar({mds, currentMD}:{mds:groupMD[], currentMD:MD}) {

    const groupedMDs: Record<string, groupMD[]> = mds.reduce((groups: any, md) => {
        if (!groups[md.groupName]) {
            groups[md.groupName] = [];
        }

        groups[md.groupName].push(md);
        return groups;
    }, {});

    const sortedMDs = Object.keys(groupedMDs).sort((a, b) => b.localeCompare(a));

    const RenderedMDs = () => sortedMDs.map((md) => {

        let isOpened = false;

        if(md == currentMD.groupName)
            isOpened = true


        return (
            <details className={s.details} key={md} open={isOpened}>
                <summary className={s.h2}>{md.slice(2)}</summary>
                <div className={s.par}>
                    <div>
                        <div className={s.verticalLine}></div>
                    </div>
                    <div>
                        {
                            groupedMDs[md].sort((a, b) => a.orderPosition - b.orderPosition).map((md) => (
                                <div className={s.txt} key={md.id}>
                                    <Link className={` ${currentMD.path == md.path ? s.selected : s.link} `}
                                          href={`${config.thisDomain}/wiki/${md.path}`}>
                                        {md.title}
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            </details>
        )
    });




    return (
        <>
            <div className={s.sidebarContainer}>
                <RenderedMDs />
            </div>
        </>
    )
}

// <Link className={`${pathname == '/' ? s.selectedButton : null} ${s.button}`} href="/" draggable="false">Головна</Link>