import Image from 'next/image'
import s from './page.module.css'
import Link from 'next/link'
import Section3 from 'components/MainPage/Section3'

import UPGLOW from 'public/Upper Glow.png'
import BOTGLOW from 'public/Bottom Glow.png'
import S4UPGLOW from 'public/s4UpperGlow.png'
import S4BOTGLOW from 'public/s4BottomGlow.png'
import Footer from '@/components/footer/footer'
import * as config from '@/config/config'
import {
    BackgrundGlowLeftAnimation,
    BackgrundGlowRightAnimation,
    BackgrundImageLeftAnimation, BackgrundImageRightAnimation, GlowDownAnimation, GridElementAnimation,
    NavAnimation, SectionAnimation, TextDownAnimation, TitleAnimation
} from "components/MainPage/Animations";
import Navbar from "components/nav3/start";
import {ServerUserProviderBuilder} from "components/Auth/ServerUserBuilder";




export default function Home() {

    return (
        <>
                <NavAnimation>
                    <Navbar/>
                </NavAnimation>

                <main className={s.main}>
                    <Section1/>
                    <Section2/>
                    <SectionAnimation>
                        <Section3/>
                    </SectionAnimation>
                    <SectionAnimation>
                        <Section4/>
                    </SectionAnimation>
                </main>

            <Footer/>

        </>
    )
}

const Section1 = async () => {
    const user = await ServerUserProviderBuilder()
        .addUser()
        .execute();

    return (
        <section className={`${s.s1container}`}>
            <div className={s.backgroundImages} draggable="false">
                <div className={s.zindex}></div>
                <BackgrundGlowLeftAnimation>
                    <Image
                        src={UPGLOW}
                        alt=""
                        className={`${s.s1BackgroundImage} ${s.s1circle11}`}
                    />
                </BackgrundGlowLeftAnimation>

                <BackgrundGlowRightAnimation>
                    <Image
                        src={BOTGLOW}
                        alt=""
                        className={`${s.s1BackgroundImage} ${s.s1circle22}`}
                    />
                </BackgrundGlowRightAnimation>

            </div>

            <div className={s.backgroundImages} draggable="false">
                <BackgrundImageLeftAnimation>
                    <Image
                        priority
                        src='/LEFTPERSONA.png'
                        alt=""
                        width={700}
                        height={0}
                        className={`${s.s1BackgroundImage} ${s.s1Image1}`}
                    />
                </BackgrundImageLeftAnimation>
                <BackgrundImageRightAnimation>
                    <Image
                        priority
                        src='/RIGHTPERSONA.png'
                        alt=""
                        width={780}
                        height={0}
                        className={`${s.s1BackgroundImage} ${s.s1Image2}`}
                    />
                </BackgrundImageRightAnimation>
            </div>

            <TitleAnimation>
                <div className={`${s.s1Title}`}>
                    Україномовний сервер
                    з елементами
                    <span className={s.s1PurpuleText}> Role-play</span>
                </div>
                <div className={`${s.s1text}`}>
                    Простір для вираження власної творчості та розвитку своїх
                    здібностей в будівництві, й соціальній взаємодії з іншими гравцями.
                </div>
                <div className={s.ip}>
                    {user != null ?
                        user.user.hasPayed ? <><span>IP:</span> {config.serverip}</>
                            : null
                        :
                        null
                    }
                </div>
                <MainButtons/>
                <div className={s.s1subButtonText}>
                    1.20.1 · Minecraft: Java Edition · Ліцензія не обов’язкова
                </div>
            </TitleAnimation>
        </section>
    );
}

const MainButtons = async () => {
    const user = await ServerUserProviderBuilder()
        .addUser()
        .execute();

    return (
        <div className={s.s1Buttons}>
            <Link href='/me' className={s.s1Button}>
                <div className={s.s1ButtonTextContainer}>
                    <ButtonIcon file="/gamepad-icon.svg"/>
                    {user != null ?
                        user.user.hasPayed ?
                            <>Мій Профіль</>
                            :
                            <>Придбати доступ на сервер</>
                        :
                        <>Придбати доступ на сервер</>
                    }
                </div>
            </Link>
            <Link href='/wiki/first_time_on_server/Idea' className={`${s.s1ButtonInfo} ${s.s1Button}`}>
                <div className={s.s1ButtonTextContainer}>
                    <ButtonIcon file="/info-icon.svg"/>
                    Про сервер
                </div>
            </Link>
        </div>
    )
}
const Section2 = () => {
    return (
        <section className={`${s.s2container}`}>
            <GlowDownAnimation>
                <div className={`${s.s1BackgroundImage} ${s.s2Circle} ${s.s2Circle1}`}></div>
                <div className={`${s.s1BackgroundImage} ${s.s2Circle} ${s.s2Circle2}`}></div>
            </GlowDownAnimation>

            <TextDownAnimation>
                <div className={`${s.s2Title}`}>Сервер — це спільнота людей</div>
                <div className={s.s2Text}>Гравці заходять на сервер щоб спілкуватися, знайти нову компанію, друзів та
                    знайомих
                </div>
            </TextDownAnimation>

            <div className={s.s2Grid}>
                <S2GridElement
                    number={1}
                    file="/mainpagepictures/2.png"
                    title="Виживайте"
                    text="Що може бути краще ніж ванільне виживання з друзями, та іншими гравцями!"
                />
                <S2GridElement
                    number={2}
                    file="/mainpagepictures/1.png"
                    title="Пропонуйте, та критикуйте"
                    text="Ваша думка є важливою для нас. Ми відповідаємо на кожні пропозиції гравців, що до сервера"
                />
                <S2GridElement
                    number={3}
                    file="/mainpagepictures/3.png"
                    title="Створюйте власні спільноти"
                    text="Об'єднуйтесь, створюючи власні спільноти, які розділяють спільні цілі та ідеї"
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
                    text="Купуйте за діаманти, або через онлайн банк, створюйте цікаві бізнес ідеї, та заробляйте"
                />
                <S2GridElement
                    number={6}
                    file="/mainpagepictures/6.png"
                    title="Беріть владу у свої руки"
                    text="Кожен гравець може обратися на керівну посаду, та прикласти руку до розвитку серверу"
                />

            </div>
        </section>
    );
}
const Section4 = () => {
    return (
        <section className={s.s4container}>

            <div className={s.s4Background} draggable="false">
                <div className={s.zindex}>
                    <Image
                        src={S4UPGLOW}
                        quality={50}
                        alt=""
                        className={`${s.s1BackgroundImage} ${s.s4Circle1}`}
                    />
                    <Image

                        src={S4BOTGLOW}
                        alt=""
                        quality={50}
                        className={`${s.s1BackgroundImage} ${s.s4Circle2}`}
                    />
                </div>
            </div>

            <div className={s.s4Wrapper}>
                <div className={s.s4Plate}>
                    <div className={`${s.s4Title}`}>
                        <ButtonIcon file="/Card-icon.svg"/>
                        Придбай доступ на сервер прямо зараз!
                    </div>
                    <div className={s.s4text}>
                        <div className={s.s4subtitle}>
                            Україномовний сервер з елементами Role-Play
                        </div>
                        Виживай, будуй міста, знаходь друзів та відігравай RP у світі, де відсутні привати, привілеї та
                        зайві плагіни
                    </div>
                    <MainButtons/>
                </div>
            </div>

        </section>
    )
}

function S2GridElement({file, title, text, number}: { file: string, title: string, text: string, number: number }) {
    return (
        <GridElementAnimation number={number}>
            <GridImage file={file}/>
            <div className={` ${s.s2GridTitle}`}>
                {title}
            </div>
            <div className={s.s2GridText}>
                {text}
            </div>
        </GridElementAnimation>
    )
}


function GridImage({file}: { file: string }) {
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

function ButtonIcon({file}: { file: string }) {
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
