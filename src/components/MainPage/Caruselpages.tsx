'use client'
import s from '../../app/section3.module.css';
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
        <div className={s.s3Caroucel} style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover' }}>
            <div className={s.s3page}>
                {children}
            </div>
        </div>
    )
}

function Title({ children }: Props) {
    return (
        <div className={`${s.s3pageTitle}`}>
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
    <Page url="/mainpagepictures/panel/1.png">
        <Title>Власний ресурспак</Title>
        <Paragraph>Ми знаємо як важливо мати на Role-Play серверах власний ресурспак</Paragraph>
        <Paragraph>Саме тому ми створили такий та активно його підримуємо, впершу чергу базуючись на ваших побажаннях та ідеях</Paragraph>
        <BottomButton text='Детальніше про ресурспак' href='/wiki/commands_and_mechanics/resource_pack'></BottomButton>
    </Page>
)}

const page2 = {
    label: "Емоції",
    content:(
    <Page url="/mainpagepictures/panel/2.png">
        <Title>Власний пак Емоцій</Title>
        <Paragraph>Виражайте ваші емоції, враження та дії краще використовуючи наш пак емоцій</Paragraph>
        <Paragraph>Один з рідкісних випадків україномовних паків емоцій, зроблений українцями для гравців нашого сервера.</Paragraph>
        <BottomButton text='Детальніше про емоції' href='/wiki/commands_and_mechanics/emotions'></BottomButton>
    </Page>
)}


const page3 = {
    label: "Система лобі",
    content:(
    <Page url="/mainpagepictures/panel/3.png">
        <Title>Система лобі</Title>
        <Paragraph>Дає можливість високої продуктивності сервера та стабільний ТПС </Paragraph>
        <Paragraph>Ефективна система з розділенням сервера на світ побудов та світ ферм, що робить наш проєкт менш лагучим та більш продуктивним.</Paragraph>
        <BottomButton text='Детальніше про систему лобі' href='/wiki/commands_and_mechanics/lobby_system'></BottomButton>
    </Page>
)}

const page4 = {
    label: "Спільноти",
    content:(
    <Page url="/mainpagepictures/panel/4.png">
        <Title>Спільноти</Title>
        <Paragraph>Одна з крутих можливостей об’єднюватись та втілювати ваші проєкти в реальність</Paragraph>
        <Paragraph>Використовуючи плагін Parties ми створили круту систему поліпшення ваших спільнот при побудові проєктів, міст тощо.</Paragraph>
        <BottomButton text='Детальніше про спільноти' href='/wiki/commands_and_mechanics/communities'></BottomButton>
    </Page>
)}


const page5 = {
    label: "Банк",
    content: (
    <Page url="/mainpagepictures/panel/5.png">
        <Title>Банк</Title>
        <Paragraph>На сервері існує система банкінгу, котра працює через дискорд</Paragraph>
        <Paragraph>Будь-який гравець може відкрити баланс, переказувати гроші, знімати гроші з балансу тощо</Paragraph>
        <BottomButton text='Детальніше про банк' href='/wiki/commands_and_mechanics/bank'></BottomButton>
    </Page>
)}

export const pages = [page1, page2, page3, page4, page5]