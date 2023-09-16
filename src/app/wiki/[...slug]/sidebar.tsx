'use client'
import Link from "next/link";
import * as config from "@/config/config";
import s from './page.module.css'
import {groupMD, MD} from "@/types/MD";


export default function Sidebar({mds, currentMD}: { mds: groupMD[], currentMD: MD }) {

    const groupedMDs: Record<string, groupMD[]> = mds.reduce((groups: any, md) => {
        if (!groups[md.groupName]) {
            groups[md.groupName] = [];
        }

        groups[md.groupName].push(md);
        return groups;
    }, {});

    const sortedMDs = Object.keys(groupedMDs).sort((a, b) => a.localeCompare(b));

    const RenderedMDs2 = () => sortedMDs.map((md) => {
        return (
            <Accordion.Item className="AccordionItem" value={md}>
                <AccordionTrigger>{md.slice(2)}</AccordionTrigger>
                <AccordionContent>
                    <div className={s.par}>
                        <div>
                            <div className={s.verticalLine}></div>
                        </div>
                        <div>
                            {
                                groupedMDs[md].sort((a, b) => a.orderPosition - b.orderPosition).map((md) => (
                                    <p className={s.txt} key={md.id}>
                                        <Link className={` ${currentMD.path == md.path ? s.selected : s.link} `}
                                              href={`${config.thisDomain}/wiki/${md.path}`}>
                                            {md.title}
                                        </Link>
                                    </p>
                                ))}
                        </div>
                    </div>
                </AccordionContent>
            </Accordion.Item>
        )
    });


    return (
        <>
            <div className={s.sidebarContainer}>
                <Accordion.Root className="reset AccordionRoot" type="single" defaultValue={currentMD.groupName}
                                collapsible >
                    <RenderedMDs2/>
                </Accordion.Root>
            </div>
        </>
    )
}


import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import {ChevronDownIcon} from '@radix-ui/react-icons';
import './accordion.css'


const AccordionTrigger = React.forwardRef(({children, className, ...props}: {
    children: any,
    className?: any
}, forwardedRef: any) => (
    <Accordion.Header className="AccordionHeader">
        <Accordion.Trigger
            className={classNames('AccordionTrigger', className)}
            {...props}
            ref={forwardedRef}
        >
            <ChevronDownIcon className="AccordionChevron" aria-hidden/>
            {children}
        </Accordion.Trigger>
    </Accordion.Header>
));

const AccordionContent = React.forwardRef(({children, className, ...props}: {
    children: any,
    className?: any
}, forwardedRef: any) => (
    <Accordion.Content
        className={classNames('AccordionContent', className)}
        {...props}
        ref={forwardedRef}
    >
        <div className="AccordionContentText">{children}</div>
    </Accordion.Content>
));



