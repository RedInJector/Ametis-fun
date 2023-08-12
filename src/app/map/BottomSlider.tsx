'use client'

import * as config from "@/config/config";
import s from './page.module.css'
import {useState} from "react";
import Image from "next/image";

import {motion, AnimatePresence} from "framer-motion";


export default function BottomSlider({children}:{children?:any}){
    const [isOpen, setIsOpen] = useState(false);


    const ArrowVariants = {
        open: { y: "-60vh", rotate: 180, size: 110 },
        closed: {y: 0, rotate: 0 }
    }

    const SectionVariants = {
        open: { y: 0 },
        closed: {y: "60vh" }
    }


    const handleClick = () =>{
        setIsOpen(!isOpen)
    }


    return(
        <section className={s.SliderContainer}>

                <motion.div
                    animate={isOpen ? "open" : "closed"}
                    variants={ArrowVariants}
                    transition={{ duration: 0.5, ease: "easeInOut" }}

                    onClick={handleClick} className={s.arrowImage}
                >
                <Image
                    src='/map/arrow.svg'
                    className={s.rotateimg180}
                    width={100}
                    height={100}
                    alt=""
                />
                </motion.div>


            <motion.section
                initial={{y: "60vh"}}
                animate={isOpen ? "open" : "closed"}
                variants={SectionVariants}
                transition={{ duration: 0.5, ease: "easeInOut" }}

                className={s.BottomSlider}
            >
                <div className={s.BottomSliderChildrenContainer}>
                    {children}
                </div>
            </motion.section>
        </section>
    )
}