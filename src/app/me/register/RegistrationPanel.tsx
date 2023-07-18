'use client'
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useUser } from '@/components/Auth/UserProvider';
import s from './Registrationpanel.module.css';
import { useRouter } from 'next/navigation'
import * as config from "@/config/config";
import Image from 'next/image'
import { User } from '@/types/types';
import Spinner from '@/components/Spinner/Spinner'

import { motion } from "framer-motion"

export default function RegistrationPanel({user}:{user:User}) {

    return (
        <>   
            <motion.div initial= {{ y: 70, opacity:0}} animate={{y: 0, opacity:1 }}  transition={{ delay: 0.3, type: 'spring',  damping: 13}}>
                <Panel user={user} />
            </motion.div>
        </>
    )
}

interface Props {
    children: React.ReactNode;
  }

const Panel = ({ user }: { user: User }) => {
    const [step, setStep] = useState(0);
    const router = useRouter()

    let params: string;
    params = 'dsid=' + user.discordUser.discordId;

    useEffect(() => {
        if (user.hasPayed) {
            router.push('/');
        }
        if (user.minecraftName != null) {
            setStep(2);
            return;
        }

        const uri = config.ws() + config.apiUrl + '/api/v1/guild-socket?' + params;
        const socket = new WebSocket(uri);

        socket.onmessage = (event) => {
            setStep(1);
        };

        return () => {
            socket.close();
        };

    }, []);

    const handleFormSubmit = async (name: string) => {
        const res = await fetch(`${config.apiUri}/api/v1/submit-minecraft-name`, {
            method: 'POST',
            cache: 'no-store',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                { name: name }
            )
        })
        if(res.status == 406) {
            router.refresh();
            return;
        }

        if (res.status != 200)
            console.error('An unknown error occurred ');

        user.minecraftName = name;
        
        //setSavedPlayerName(name);
        setStep(2);
    }

    return (
        <section className={` ${s.section}`}>
            <Image
                draggable="false"
                priority
                src="/BigAuthorize.svg"
                width={224}
                height={41}
                className={s.BigAuthorize}
                alt="Logo"
            />
            <div className={s.container}>
                {step == 0 && (
                    <Krok1 />
                )}
                {step == 1 && (
                        <Krok2 onSubmit={handleFormSubmit} />
                )}
                {step == 2 && (
                        <Krok3 user={user} />
                )}
            </div>
        </section>
    )
}
/*

*/




const Krok1 = () => {
    const GuildURL = "https://discord.gg/AxAKTZsZPu";
    const GuildLogoUrl = "https://cdn.discordapp.com/avatars/445248333733298178/7dbe24db6e095fce0b53500478c89583?size=1024"
    const GuildLogo = () => {
        return (
            <Image
                draggable="false"
                priority
                src={GuildLogoUrl}
                width={500}
                height={500}
                className={s.DSserverLogo}
                alt="Logo"
            />
        );
    }
    const ChainIcon = () => {
        return (
            <Image
                draggable="false"
                priority
                src="/ChainLink.svg"
                width={24}
                height={24}
                className={s.ChainIcon}
                alt="Logo"
            />
        );
    }

    return (
        <>
            <div className={s.step}>
                <div className={`${s.stepHeader}`}>
                    Перший крок: Приєднатись на Discord сервер
                </div>
                <div className={s.stepContent}>
                    Ви зобов’язані приєднатись до нашого Discord сервера, оскільки це не від’ємна частина ігрового процесу та він потрібний для синхронізації вашого акаунту
                </div>
                <a target="_blank" href={GuildURL} className={s.k1DsUrl}>
                    <div className={s.k1left}>
                        <GuildLogo />
                        <div className={s.k1LinkText}>
                            <div className={s.k1DStopText}>
                                Вас запрошено
                            </div>
                            <div className={`${s.k1DSbottomText}`}>
                                Ametis - Discord
                            </div>
                        </div>
                    </div>
                    <div className={s.k1right}>
                        <ChainIcon />
                    </div>
                </a>
            </div>
            <hr className={s.hr} />
            <div className={`${s.stepOff}`}>
                Другий крок: Прив’язати Minecraft акаунт
            </div>
            <hr className={s.hr} />
            <div className={`${s.stepOff}`}>
                Третій крок: Оплатити прохідку
            </div>
        </>
    )
}

interface FormProps {
    onSubmit: (name: string) => void;
}

const Krok2 = ({ onSubmit }: FormProps) => {
    return (
        <>
            <div className={` ${s.stepOff}`}>
                Перший крок: Приєднатись на Discord сервер
            </div>
            <hr className={s.hr} />
            <div className={s.step}>
                <div className={`${s.stepHeader}`}>
                    Другий крок: Прив’язати Minecraft акаунт
                </div>
                <div className={s.stepContent}>
                    Уведіть ваш Нікнейм Minecraft
                </div>
                <Form onSubmit={onSubmit} />

            </div>
            <hr className={s.hr} />
            <div className={` ${s.stepOff}`}>
                Третій крок: Оплатити прохідку
            </div>
        </>
    )
}

const Form = ({ onSubmit }: FormProps) => {
    const [inputValue, setInputValue] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [isSubmited, setSubmited] = useState(false);
    const [currentName, setCurrentName] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        setIsValidating(true);
    };
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setSubmited(true);
        onSubmit(inputValue);
    };
    const isStringValid = (str: string): boolean => {
        const regex = /^[a-zA-Z0-9_]{3,16}$/;
        return regex.test(str);
    }
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (!isStringValid(inputValue)) {
            setIsValid(false);
            return;
        }

        if (isValidating) {
            timeoutId = setTimeout(async () => {
                const res = await fetch(`${config.apiUri}/api/v1/check-minecraft-name?name=` + inputValue, {
                    method: 'GET',
                    cache: 'no-store',
                    credentials: 'include'
                })
                setCurrentName(inputValue);
                if (res.status != 200) {
                    setIsValid(false);
                    setIsValidating(false);
                    return
                }


                setIsValid(true);
                setIsValidating(false);
            }, 1000);
        }

        return () => clearTimeout(timeoutId);
    }, [isValidating, inputValue]);

    const Avalibility = ({ avalible }: { avalible: boolean }) => {
        return (
            <Image
                draggable="false"
                src={avalible ? "/login/Ok.svg" : "/login/cross.svg"}
                width={36}
                height={36}
                alt="Player Icon"
                className={s.Avalibility}
                title={isValid ? "Ok" : "not Ok"}
            />
        )
    }
    return (
        <form className={s.form} onSubmit={handleSubmit}>
            <input className={s.formTextBox} maxLength={20} disabled={isSubmited} type="text" value={inputValue} onChange={handleChange} />
            <div className={s.formsmalltext}>Можна зайти з піратки, ліцензія не потрібна.</div>
            {currentName ? (
                <div className={s.bannerContainer}>
                    <div className={s.PlayerBanner}>
                        <Avatar name={currentName} />
                        <span className={s.bannerText}>{currentName}</span>
                    </div>
                    <div className={s.bannerRight}>
                        <Avalibility avalible={isValid} />
                    </div>
                </div>
            ) : null
            }

            { isValid ? 
            <button className={s.formButton} disabled={!isValid || isValidating || isSubmited} type="submit" >Зберегти</button>
            :
            null
        
        }
            
        </form>
    );
};
const Avatar = ({ name }: { name: string }) => {
    return (
        <Image
            draggable="false"
            src={`https://mc-heads.net/avatar/${name}`}
            width={100}
            height={100}
            className={s.AvatarIcon}
            alt="Player Icon"
        />
    )
}
const Krok3 = ({ user }: { user: User }) => {
    if (user.minecraftName == null)
       return(<></>);


    const convertToPaddedString = (num: number, length: number): string => {
        const numString = num.toString();
        return numString.padStart(length, '0');
    }
    const router = useRouter()

    let params: string;
    params = 'userid=' + user.id;

    useEffect(() => {
        const uri = config.ws() + config.apiUrl + '/api/v1/payment-socket?' + params;
        const socket = new WebSocket(uri);

        socket.onmessage = (event) => {
            router.push('/')
        };

        return () => {
            socket.close();
        };

    }, []);

    return (
        <>
            <div className={` ${s.stepOff}`}>
                Перший крок: Приєднатись на Discord сервер
            </div>
            <hr className={s.hr} />
            <div className={` ${s.stepOff}`}>
                Другий крок: Прив’язати Minecraft акаунт
            </div>
            <hr className={s.hr} />
            <div className={s.step}>
                <div className={` ${s.stepHeader}`}>
                    Третій крок: Оплатити прохідку
                </div>

                <div className={`${s.PlayerBanner} ${s.k3Banner}`}>
                    <Avatar name={user.minecraftName} />
                    <div className={s.bannerText}>
                        <div>{user.minecraftName}</div>
                        <div className={s.idtext}>#{convertToPaddedString(user.id, 5)}</div>
                    </div>
                </div>

                <div className={s.k3stepText}>
                    Вартість прохідки:
                </div>
                <div className={`${s.k3money}`}>
                    35.99₴
                </div>
                <div className={s.k3startext}>
                    *В полі Ім’я вводьте ваш Minecraft Нікнейм
                </div>
                <div className={s.PaybuttonContainer}>
                    <a className={s.PayButton} href={config.donatelloURL}>
                        <div className={s.PayButtonInside}>
                            <Image
                                draggable="false"
                                priority
                                src="/login/card.svg"
                                width={20}
                                height={20}
                                className={s.buttonPayicon}
                                alt="Logo"
                            />
                            Оплатити
                        </div>
                    </a>
                </div>
            </div>
        </>
    )
}