"use client"
import s from './page.module.css'
import Image from 'next/image'
import { inter, manrope } from '@/fonts/fonts';
import React, { Children, useState } from "react";
import { motion, useAnimationControls } from "framer-motion"

import useWindowDimensions from 'components/hooks/useWindowDimension';


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
  const { width } = useWindowDimensions();

  const data = [page1(), page2(), page3(), page4(), page5()];

  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [previouseIdx, setPreviouseIdx] = useState(-1);
  //const [scope, animate] = useAnimate()
  const controls1 = useAnimationControls();
  const controls2 = useAnimationControls();

  const compleateAnimation = () => {
    setIsAnimating(false);
  }

  const animate = (Left: boolean) => {
    //animate(scope.current, { opacity: 1 }, { duration: 1000 })
    let direction: number;
    if (Left) {
      direction = 1;
    } else {
      direction = -1;
    }

    //setIsAnimating(true);
    controls1.set({

      opacity: 0
    })
    controls1.start({

      opacity: 1,
      transition: { ease: "easeIn", duration: 0.3 },
    })
    controls2.set({

    })
    controls2.start({


    })
  };

  const setCurrent = (index: number) => {
    if (index == currentIdx)
      return;
    const indexnow = index;
    const indexBefore = currentIdx;
    setPreviouseIdx(currentIdx);
    setCurrentIdx(index);

    if (indexnow > indexBefore)
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

  const SmallNavButton = ({ index, text }: { index: number, text: string }) => {
    return (
      <button disabled={isAnimating} className={`${currentIdx == index ? s.s3navSelectedButton : null} ${s.s3navButton}`} onClick={() => setCurrent(index)}>{text}</button>
    )
  }

  return (
    <div>
      <nav className={s.s3NavBar} >
        <button disabled={isAnimating} className={s.s3navButton} onClick={() => Previouse()}>
          <ArrowLeft />
        </button>
        {width > 800 ? <>
          <SmallNavButton index={0} text="Ресурспак" />
          <SmallNavButton index={1} text="Емоції" />
          <SmallNavButton index={2} text="Система лобі" />
          <SmallNavButton index={3} text="Спільноти" />
          <SmallNavButton index={4} text="Чат" />
        </>
          :
          null}
        <button disabled={isAnimating} className={s.s3navButton} onClick={() => Next()}>
          <ArrowRight />
        </button>
      </nav>

      <div className={s.s3CaroucelWrapper}>
        <div className={s.animationDiv}>

          {previouseIdx != -1 && (
           
            data[previouseIdx]
          )}


        </div>

        <motion.div animate={controls1} className={s.animationDiv} onAnimationComplete={compleateAnimation}>
          {data[currentIdx]}
        </motion.div>
      </div>
    </div>
  );
};



function Page({ title, p1, p2, url }: { title: string, p1: string, p2: string, url: string }) {
  return(
  <div className={s.s3Caroucel} style={{ backgroundImage: `url(${url})` }}>
    <div className={s.s3page}>
      <div className={`${manrope.className} ${s.s3pageTitle}`}>
        {title}
      </div>
      <div className={s.s3pageText}>
        {p1}
      </div>
      <div className={s.s3pageText}>
        {p2}
      </div>
    </div>
  </div>
  )
}


const page1 = () => {
  return (
    <Page 
      title="Власний ресурспак"
      p1="Ми знаємо як важливо мати на Role-Play серверах власний ресурспак"
      p2="Саме тому ми створили такий та активно його підримуємо, впершу чергу базуючись на ваших побажаннях та ідеях"
      url="/mainpagepictures/panel/1.png"
    />
  )
}
const page2 = () => {
  return (
    <Page 
      title="Власний пак Емоцій"
      p1="Виражайте ваші емоції, враження та дії краще використовуючи наш пак емоцій"
      p2="Один з єдиничних випадків україномовних паків емоцій, зроблей українцями для гравців нашого сервера"
      url="/mainpagepictures/panel/2.png"
    />
  )
}

const page3 = () => {
  return (
    <Page 
      title="Система лобі"
      p1="Дає можливість високої продуктивності сервера та стабільний ТПС "
      p2="Не звичайна система сервера з розділенням сервера на світ побудов та світ ферм робить наш проєкт менш лагучим та більш ефективним"
      url=""
    />
  )
}
const page4 = () => {
  return (
    <Page 
      title="Спільноти"
      p1="Одна з крутих можливостей об’єднюватись та втілювати ваші проєкти в реальність"
      p2="Використовуючи плагін Parties ми створити круту систему прокачування ваших спільнот при побудові проєктів, міст тощо"
      url=""
    />
  )
}

const page5 = () => {
  return (
    <Page 
      title="Чат"
      p1="Оновлений, налаштовуємий та не звичайни чат для вашого спілнування"
      p2="Ви можете мутити та заглушувати гравців та вони не зможуть вам писати, вимикати чи вмикати певні канали в чаті"
      url=""
    />
  )
}


const ArrowLeft = () => {
  return (
    <Image
      src="/ArrowL.svg"
      width={100}
      height={100}
      alt="Arrow left"
      className={s.arrow}
    />
  )
}

const ArrowRight = () => {
  return (
    <Image
      src="/ArrowR.svg"
      width={100}
      height={100}
      alt="Arrow right"
      className={s.arrow}
    />
  )
}