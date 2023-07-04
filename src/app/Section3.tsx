"use client"
import s from './page.module.css'
import Image from 'next/image'
import { inter, manrope } from '@/fonts/fonts';
import React, { useState } from "react";
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

  const controls1 = useAnimationControls();

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
  interface Props {
    index: number;
    children: React.ReactNode;
  }
  const SmallNavButton = ({ index, children }:Props) => {
    return (
      <button disabled={isAnimating} className={`${currentIdx == index ? s.s3navSelectedButton : null} ${s.s3navButton}`} onClick={() => setCurrent(index)}>{children}</button>
    )
  }

  return (
    <div>
      <nav className={s.s3NavBar} >
        <button disabled={isAnimating} className={s.s3navButton} onClick={() => Previouse()}>
          <ArrowLeft />
        </button>
        {width > 800 ? <>
          <SmallNavButton index={0}>Ресурспак</SmallNavButton>
          <SmallNavButton index={1}>Емоції</SmallNavButton>
          <SmallNavButton index={2}>Система лобі</SmallNavButton>
          <SmallNavButton index={3}>Спільноти</SmallNavButton>
          <SmallNavButton index={4}>Чат</SmallNavButton>
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

interface Props {
  children: React.ReactNode;
}
interface Props2 {
  children: React.ReactNode;
  url: string;
}


function Page({ children, url }:Props2){
  return(
    <div className={s.s3Caroucel} style={{ backgroundImage: `url(${url})` }}>
      <div className={s.s3page}>
        {children}
      </div>
    </div>
  )
}

function Title({ children }:Props) {
  return (
    <div className={`${manrope.className} ${s.s3pageTitle}`}>
      {children}
    </div>
  )
}
function Paragraph({ children }:Props){
  return(
    <div className={s.s3pageText}>
        {children}
    </div>
  )
}


const page1 = () => {
  return (
    <Page url="/mainpagepictures/panel/1.png">
      <Title>Власний ресурспак</Title>
      <Paragraph>Ми знаємо як важливо мати на Role-Play серверах власний ресурспак</Paragraph>
      <Paragraph>Саме тому ми створили такий та активно його підримуємо, впершу чергу базуючись на ваших побажаннях та ідеях</Paragraph>
    </Page>
  )
}
const page2 = () => {
  return (
    <Page url="/mainpagepictures/panel/2.png">
      <Title>Власний пак Емоцій</Title>
      <Paragraph>Виражайте ваші емоції, враження та дії краще використовуючи наш пак емоцій</Paragraph>
      <Paragraph>Один з єдиничних випадків україномовних паків емоцій, зроблей українцями для гравців нашого сервера</Paragraph>
    </Page>
  )
}

const page3 = () => {
  return (
    <Page url="">
      <Title>Система лобі</Title>
      <Paragraph>Дає можливість високої продуктивності сервера та стабільний ТПС</Paragraph>
      <Paragraph>Не звичайна система сервера з розділенням сервера на світ побудов та світ ферм робить наш проєкт менш лагучим та більш ефективним</Paragraph>
    </Page>
  )
}
const page4 = () => {
  return (
    <Page url="">
      <Title>Спільноти</Title>
      <Paragraph>Одна з крутих можливостей об’єднюватись та втілювати ваші проєкти в реальність</Paragraph>
      <Paragraph>Використовуючи плагін Parties ми створити круту систему прокачування ваших спільнот при побудові проєктів, міст тощо</Paragraph>
    </Page>
  )
}

const page5 = () => {
  return (
    <Page url="">
      <Title>Чат</Title>
      <Paragraph>Оновлений, налаштовуємий та не звичайни чат для вашого спілнування</Paragraph>
      <Paragraph>Ви можете мутити та заглушувати гравців та вони не зможуть вам писати, вимикати чи вмикати певні канали в чаті</Paragraph>
    </Page>
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