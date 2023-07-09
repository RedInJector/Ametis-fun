import s from './section3.module.css';
import { inter, manrope } from '@/fonts/fonts';
import Image from 'next/image'
import Link from 'next/link';


interface Props {
    children: React.ReactNode;
}
interface Props2 {
    children: React.ReactNode;
    url: string;
}

function Page({ children, url }: Props2) {
    return (
        <div className={s.s3Caroucel} style={{ backgroundImage: `url(${url})` }}>
            <div className={s.s3page}>
                {children}
            </div>
        </div>
    )
}

function Title({ children }: Props) {
    return (
        <div className={`${manrope.className} ${s.s3pageTitle}`}>
            {children}
        </div>
    )
}
function Paragraph({ children }: Props) {
    return (
        <div className={s.s3pageText}>
            {children}
        </div>
    )
}
function BottomButton({text, href}:{text:string, href:string}) {
    return (
        <>
            <div>
                <Link href={href} className={s.BottomButton}>
                    <Image
                        src="/Search.svg"
                        alt=""
                        width={20}
                        height={20}
                    />
                    {text}
                </Link>
            </div>
        </>
    )
}

const page1 = {
    label: "Ресурспак",
    content:(
    <Page url="/mainpagepictures/panel/2.png">
        <Title>Власний ресурспак</Title>
        <Paragraph>Ми знаємо як важливо мати на Role-Play серверах власний ресурспак</Paragraph>
        <Paragraph>Саме тому ми створили такий та активно його підримуємо, впершу чергу базуючись на ваших побажаннях та ідеях</Paragraph>
        <BottomButton text='Детальніше про ресурспак' href='/'></BottomButton>
    </Page>
)}

const page2 = {
    label: "Емоції",
    content:(
    <Page url="/mainpagepictures/panel/1.png">
        <Title>Власний пак Емоцій</Title>
        <Paragraph>Виражайте ваші емоції, враження та дії краще використовуючи наш пак емоцій</Paragraph>
        <Paragraph>Один з єдиничних випадків україномовних паків емоцій, зроблей українцями для гравців нашого сервера</Paragraph>
        <BottomButton text='Детальніше про емоції' href='/'></BottomButton>
    </Page>
)}


const page3 = {
    label: "Система лобі",
    content:(
    <Page url="/mainpagepictures/panel/1.png">
        <Title>Система лобі</Title>
        <Paragraph>Дає можливість високої продуктивності сервера та стабільний ТПС</Paragraph>
        <Paragraph>Не звичайна система сервера з розділенням сервера на світ побудов та світ ферм робить наш проєкт менш лагучим та більш ефективним</Paragraph>
        <BottomButton text='Детальніше про систему лобі' href='/'></BottomButton>
    </Page>
)}

const page4 = {
    label: "Спільноти",
    content:(
    <Page url="/mainpagepictures/panel/1.png">
        <Title>Спільноти</Title>
        <Paragraph>Одна з крутих можливостей об’єднюватись та втілювати ваші проєкти в реальність</Paragraph>
        <Paragraph>Використовуючи плагін Parties ми створити круту систему прокачування ваших спільнот при побудові проєктів, міст тощо</Paragraph>
        <BottomButton text='Детальніше про спільноти' href='/'></BottomButton>
    </Page>
)}


const page5 = {
    label: "Чат",
    content: (
    <Page url="/mainpagepictures/panel/1.png">
        <Title>Чат</Title>
        <Paragraph>Оновлений, налаштовуємий та не звичайни чат для вашого спілнування</Paragraph>
        <Paragraph>Ви можете мутити та заглушувати гравців та вони не зможуть вам писати, вимикати чи вмикати певні канали в чаті</Paragraph>
        <BottomButton text='Детальніше про систему чату' href='/'></BottomButton>
    </Page>
)}

export const pages = [page1, page2, page3, page4, page5]