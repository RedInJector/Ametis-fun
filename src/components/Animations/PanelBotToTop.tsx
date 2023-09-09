'use client'
import s from "./page.module.css";
import React from "react";
import {motion} from "framer-motion";


export default function PanelBotToTopAnimation({children}:{children:any}){
    const convertToPaddedString = (num: number, length: number): string => {
        const numString = num.toString();
        return numString.padStart(length, '0');
    }
    const anim = {
        initial:{ y: 30,  opacity: 0 },
        animate:{ y:0, opacity: 1 },
        transition:{ type: 'spring', damping: 13, }
    }
    return(

        <motion.section className={s.section} initial={anim.initial} animate={anim.animate} transition={anim.transition}>
            {children}
        </motion.section>


    )
}