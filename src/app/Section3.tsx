import s from './page.module.css'
import { inter, manrope } from '@/fonts/fonts';

import Carousel from './Carusel';


export default function Section3() {


  return (
    <section className={`${s.s3container} ${inter.className}`}>
      <div className={`${manrope.className} ${s.s3Title}`}>
        Інші особливості сервера
      </div>
      <Carousel />
    </section>
  )
}