import s from './page.module.css'

import Carousel from './Carusel';


export default function Section3() {


  return (
    <section className={`${s.s3container} `}>
      <div className={`${s.s3Title}`}>
        Інші особливості сервера
      </div>
      <Carousel />
    </section>
  )
}