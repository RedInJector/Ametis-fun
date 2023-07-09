'use client'
import s from './section3.module.css';
import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react';
import { pages } from './Section3pages';
import { inter, manrope } from '@/fonts/fonts';




export default function Carousel() {
  const [selectedTab, setSelectedTab] = useState(pages[0]);

  return (
    <>
      <nav className={s.nav}>
        <ul className={s.ul}>
          {pages.map((item) => (
            <li
              key={item.label}
              className={`${item === selectedTab ? s.selected : ""} ${s.button} ${inter.className}`}
              onClick={() => setSelectedTab(item)}
            >
              {`${item.label}`}
              {item === selectedTab ? (
                <motion.div className="underline" layoutId="underline" />
              ) : null}
            </li>
          ))}
        </ul>
      </nav>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={selectedTab ? selectedTab.label : "empty"}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {selectedTab ? selectedTab.content : "😋"}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
