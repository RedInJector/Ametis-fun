"use client"
import s from './page.module.css'
import Image from 'next/image'
import {inter, manrope} from '@/fonts/fonts';
import React, { Children, useState } from "react";
import { motion, useAnimationControls } from "framer-motion"

export default function Section3() {


  return (
    <section className={`${s.s3container} ${inter.className}`}>
      <div className={`${manrope.className} ${s.s3Title}`}>
        Інші особливості сервера
      </div>
      <S3Nav />
    </section>
  )
}

const S3Nav = () => {
  const [data, setData] = useState([page1(), page2(), page3()]);

  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [previouseIdx, setPreviouseIdx] = useState(-1);
  //const [scope, animate] = useAnimate()
  const controls1 = useAnimationControls();
  const controls2 = useAnimationControls();

  const compleateAnimation = () => {
    setIsAnimating(false);
  }

  const animate = (Left:boolean) => {
    //animate(scope.current, { opacity: 1 }, { duration: 1000 })
    let direction:number;
    if(Left){
      direction = 1;
    }else{
      direction = -1;
    }

    setIsAnimating(true);
    controls1.set({
      x: direction * window.screen.width,
      opacity: 0
    })
    controls1.start({
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    })
    controls2.set({
      x: 0,
      opacity: 1
    })
    controls2.start({
      x: direction * -window.screen.width,
      opacity: 0,
      transition: { duration: 0.3 },
    })
  };

  const setCurrent = (index: number) => {
    if(index == currentIdx)
      return;
    const indexnow = index;
    const indexBefore = currentIdx;
    setPreviouseIdx(currentIdx);
    setCurrentIdx(index);

    if(indexnow > indexBefore)
      animate(true);
    else
      animate(false);
  }

  const Next = () => {
    const maxindex = data.length - 1;
    if (currentIdx + 1 <= maxindex) {
      setPreviouseIdx(currentIdx);
      setCurrentIdx(currentIdx + 1);

    } else {
      setPreviouseIdx(maxindex);
      setCurrentIdx(0);
    }
    animate(true);
  }
  const Previouse = () => {
    const maxindex = data.length - 1;
    if (currentIdx != 0) {
      setPreviouseIdx(currentIdx);
      setCurrentIdx(currentIdx - 1);
    } else {
      setPreviouseIdx(0);
      setCurrentIdx(maxindex);
    }
    animate(false);
  }

  const SmallNavButton = ({index,text}:{index:number, text:string}) =>{
    return(
      <button disabled={isAnimating} className={`${currentIdx == index ? s.s3navSelectedButton : null} ${s.s3navButton}`} onClick={() => setCurrent(index)}>{text}</button>
    )
  }

  return (
    <div>
      <div className={s.s3NavBar} >
        <button disabled={isAnimating} className={s.s3navButton} onClick={() => Previouse()}>
          <ArrowLeft />
        </button>
        <SmallNavButton index={0} text="Ресурспак" />
        <SmallNavButton index={1} text="Емоції" />
        <SmallNavButton index={2} text="Система лобі" />
        <button disabled={isAnimating} className={s.s3navButton} onClick={() => Next()}>
          <ArrowRight />
        </button>
      </div>

      <div className={s.s3CaroucelWrapper}>
        <motion.div animate={controls2} className={s.animationDiv} onAnimationComplete={compleateAnimation}>
          <div className={s.s3Caroucel}>
            {previouseIdx !== -1 && (
              data[previouseIdx]
            )}
          </div>
        </motion.div>

        <motion.div animate={controls1} className={s.animationDiv}>
          <div className={s.s3Caroucel}>
            {data[currentIdx]}
          </div>
        </motion.div>
      </div>
    </div>
  );
};




const page1 = () => {
  return (
    <div>
      Page1
    </div>
  )
}
const page2 = () => {
  return (
    <div>
      Page2
    </div>
  )
}

const page3 = () => {
  return (
    <div>
      Page3
    </div>
  )
}


const ArrowLeft = () => {
  return (
    <Image
      src="/ArrowL.svg"
      width={17}
      height={16}
      alt="Arrow left"
    />
  )
}

const ArrowRight = () => {
  return (
    <Image
      src="/ArrowR.svg"
      width={17}
      height={16}
      alt="Arrow left"
    />
  )
}