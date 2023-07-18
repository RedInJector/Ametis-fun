'use client'
import s from './section3.module.css';
import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react';
import { pages } from './Caruselpages';



export default function Carousel() {
  const [selectedTab, setSelectedTab] = useState(pages[0]);

  return (
    <>
      <nav className={s.nav}>
        <ul className={s.ul}>
          {pages.map((item) => (
            <li
              key={item.label}
              className={`${item === selectedTab ? s.selected : ""} ${s.button}`}
              onClick={() => setSelectedTab(item)}
            >
              {`${item.label}`}

            </li>
          ))}
        </ul>
      </nav>
        <Slides slide={selectedTab}/>

    </>
  )
}

function Slides({slide}:{slide:any}){
    return(
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={slide ? slide.label : "empty"}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                {slide ? slide.content : "😋"}
            </motion.div>
        </AnimatePresence>
    )
}
