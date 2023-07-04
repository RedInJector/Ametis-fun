
'use client'
import Image from 'next/image'
import s from './page.module.css'
import Link from 'next/link'
import { inter, manrope } from '@/fonts/fonts';
import Section3 from './Section3'
import UserProvider from '@/components/Auth/UserProvider';
import NavBar from '@/components/navbar2/_nav'
import UPGLOW from 'public/Upper Glow.png'
import BOTGLOW from 'public/Bottom Glow.png'



export default function Home() {

  return (
    <>

      <UserProvider AuthorizedOnly={false}>
        <NavBar />
      </UserProvider>

      <main className={s.main}>
        <Section1 />

        <Section2 />


        <Section3 />

        <Section4 />

      </main>
    </>
  )
}

function Section1() {

  return (
    <section className={`${s.s1container} ${inter.className}`}>
      <div className={s.backgroundImages} draggable="false">
        <div className={s.zindex}>
          <Image
            src={UPGLOW}
            alt=""
            className={`${s.s1BackgroundImage} ${s.s1circle11}`}
          />


          <Image
            src={BOTGLOW}
            alt=""
            className={`${s.s1BackgroundImage} ${s.s1circle22}`}
          />
        </div>
        <div className={s.backgroundImages} draggable="false">

          <Image
            src='/LEFTPERSONA.png'
            alt=""
            width={700}
            height={0}
            className={`${s.s1BackgroundImage} ${s.s1Image1}`}
          />

          <Image
            src='/RIGHTPERSONA.png'
            alt=""
            width={780}
            height={0}
            className={`${s.s1BackgroundImage} ${s.s1Image2}`}
          />
        </div>
      </div>
      <div className={s.s1Part}>
        <div className={`${s.s1Title} ${manrope.className}`}>
          Україномовний сервер
          з елементами
          <span className={s.s1PurpuleText}> Role-play</span>
        </div>
        <div className={`${s.s1text} ${inter.className}`}>
          Простір для вираження власної творчості та розвитку своїх
          здібностей в будівництві, й соціальній взаємодії з іншими гравцями.
        </div>
        <MainButtons />
        <div className={s.s1subButtonText}>
          1.20.1 · Minecraft: Java Edition · Ліцензія не обов’язкова
        </div>
      </div>
    </section>
  );
}

function MainButtons (){
  return (
    <div className={s.s1Buttons}>
      <a className={s.s1Button} >
        <div className={s.s1ButtonTextContainer}>
          <ButtonIcon file="/gamepad-icon.svg" />
          Придбати доступ на сервер
        </div>
      </a>
      <Link href='/' className={`${s.s1ButtonInfo} ${s.s1Button}`}>
        <div className={s.s1ButtonTextContainer}>
          <ButtonIcon file="/info-icon.svg" />
          Про сервер
        </div>
      </Link>
    </div>
  )
}
function Section2() {
  return (
    <section className={`${s.s2container} ${inter.className}`} >
      <div className={s.s4Background}>
        <div className={`${s.s1BackgroundImage} ${s.s2Circle} ${s.s2Circle1}`}></div>
        <div className={`${s.s1BackgroundImage} ${s.s2Circle} ${s.s2Circle2}`}></div>
      </div>

      <div className={s.s2Top}>
        <div className={`${manrope.className} ${s.s2Title}`}>Сервер — це спільнота людей</div>
        <div className={s.s2Text}>Гравці заходять на сервер щоб спілкуватися, знайти нову компанію, друзів та знайомих</div>
      </div>

      <div className={s.s2Grid}>
        <S2GridElement
          number={1}
          file="/mainpagepictures/2.png"
          title="Виживайте"
          text="Основа сервера - звичайне, ванільне виживання з іншими гравцями"
        />
        <S2GridElement
          number={2}
          file="/mainpagepictures/1.png"
          title="Придумуйте власні правила "
          text="Гра на сервері будується на стосунках між гравцями, отож будь-хто може змінити чи регулювати правила та закони"
        />
        <S2GridElement
          number={3}
          file="/mainpagepictures/3.png"
          title="Створюйте власні спільноти"
          text="На сервері є можливість створювати власні спільноти людей для власних проєктів"
        />
        <S2GridElement
          number={4}
          file="/mainpagepictures/4.png"
          title="Будьте ким хочете"
          text="Втілюйте свої фантазії, та відігруйте персонажів котрих забажаєте"
        />
        <S2GridElement
          number={5}
          file="/mainpagepictures/5.png"
          title="Торгуйте"
          text="Працюйте, добувайте ресурси, відкрийте
          власний бізнес і продавайте речі на ринку"
        />
        <S2GridElement
          number={6}
          file="/mainpagepictures/6.png"
          title="Беріть участь або створюйте свої події"
          text="Беріть участь в міні-іграх, торгуйтесь на ринку, приєднуйтесь до зборів ресурсів, або побудови проєктів"
        />

      </div>
    </section>
  );
}
function Section4() {
  return (
    <section className={s.s4container}>
      <div className={s.s4Background}>
        <div className={`${s.s1BackgroundImage} ${s.s4Circle} ${s.s4Circle2}`}></div>
        <div className={`${s.s1BackgroundImage} ${s.s4Circle} ${s.s4Circle1}`}></div>
        <div className={`${s.s1BackgroundImage} ${s.s4Circle} ${s.s4Circle3}`}></div>
        <div className={`${s.s1BackgroundImage} ${s.s4Circle} ${s.s4Circle4}`}></div>
      </div>

      <div className={s.s4Wrapper}>
        <div className={s.s4Plate}>
          <div className={`${manrope.className} ${s.s4Title}`}>
            <ButtonIcon file="/Card-icon.svg" />
            Придбай доступ на сервер прямо зараз!
          </div>
          <div className={s.s4text}>
            <div className={s.s4subtitle}>
              Україномовний сервер з елементами Role-Play
            </div>
            Виживай, будуй міста, знаходь друзів та відігравай RP у світі, де відсутні привати, привілеї та зайві плагіни
          </div>
          <MainButtons />
        </div>
      </div>

    </section>
  )
}
function S2GridElement({ file, title, text, number }: { file: string, title: string, text: string, number: number }) {
  return (
    <div>
      <GridImage file={file} />
      <div className={`${manrope.className} ${s.s2GridTitle}`}>
        {title}
      </div>
      <div className={s.s2GridText}>
        {text}
      </div>
    </div >
  )
}


function GridImage({ file }: { file: string }) {
  return (
    <Image
      priority
      src={file}
      width={800}
      height={460}
      quality={80}
      alt="Image"
      className={s.s2GridImageimg}
    />
  );
}

function ButtonIcon({ file }: { file: string }) {
  return (
    <Image
      priority
      src={file}
      width={30}
      height={30}
      alt="icon"
      className={s.MainButtonIcon}
    />
  )
}