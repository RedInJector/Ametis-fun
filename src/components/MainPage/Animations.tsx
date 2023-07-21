'use client'
import { motion } from "framer-motion"
import s from "@/app/page.module.css";



export function NavAnimation({children}:{children:any}){
    return(
        <motion.nav initial={{ y: -60 }} animate={{ y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
            {children}
        </motion.nav>
    )
}


export function BackgrundImageLeftAnimation({children}:{children:any}){
    return(
        <motion.div initial={{ x: -100, opacity: 0, }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, type: 'spring', damping: 13 }}>
            {children}
        </motion.div>
    )
}

export function BackgrundImageRightAnimation({children}:{children:any}){
    return(
        <motion.div initial={{ x: 100, opacity: 0, }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, type: 'spring', damping: 13 }}>
            {children}
        </motion.div>
    )
}

export function BackgrundGlowLeftAnimation({children}:{children:any}){
    return(
        <motion.div initial={{ x: -200, rotate: 30, opacity: 0 }} animate={{ x: 0, rotate: 0, opacity: 1 }} transition={{ duration: 2 }}>
            {children}
        </motion.div>
    )
}

export function BackgrundGlowRightAnimation({children}:{children:any}){
    return(
        <motion.div initial={{ x: 500, rotate: 30, opacity: 0 }} animate={{ x: 0, rotate: 0, opacity: 1 }} transition={{ duration: 3 }}>
            {children}
        </motion.div>
    )
}


export function TitleAnimation({children}:{children:any}){
    return(
        <motion.div className={s.s1Part} initial={{y: 200, opacity: 0,}} animate={{y: 0, opacity: 1}}
                    transition={{type: 'spring', damping: 12}}>
            {children}
        </motion.div>
    )
}

export function GridElementAnimation({children, number}:{children:any, number:number}){
    return(
        <motion.div initial={{opacity: 0, y: 50,}} whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.15}} transition={{delay: 0.05 * number, duration: 0.4}}>
            {children}
        </motion.div>
    )
}

export function GlowDownAnimation({children}:{children:any}){
    return(
        <motion.div className={s.s4Background} initial={{y: -200, opacity: 0,}} animate={{y: 0, opacity: 1}}
                    transition={{delay: 0.6, type: 'spring', damping: 15}}>
            {children}
        </motion.div>
    )
}
export function TextDownAnimation({children}:{children:any}){
    return(
        <motion.div className={s.s2Top} initial={{y: -200, opacity: 0,}} animate={{y: 0, opacity: 1}}
                    transition={{delay: 0.6, type: 'spring', damping: 11}}>
            {children}
        </motion.div>
    )
}

export function SectionAnimation({children}: any) {
    const anim = {
        initial: {opacity: 0},
        whileInView: {opacity: 1},
        viewport: {once: true, amount: 0.3},
        transition: {duration: 1}
    }
    return (
        <motion.div initial={anim.initial} whileInView={anim.whileInView} viewport={anim.viewport}
                    transition={anim.transition}>
            {children}
        </motion.div>
    )
}
