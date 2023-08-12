'use client'

import * as config from "@/config/config";
import {PublicUser, User} from "@/types/publicUser";
import PlayerBanner from "@/app/p/PlayerBanner";
import s from './page.module.css'
import BottomSlider from "@/app/map/BottomSlider";
import * as c from "@/config/config";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import Image from "next/image";


export default function SearchBar({children}: {  children?: any }) {
    const [input, setInput] = useState('');
    const [found, setFound] = useState<null | PublicUser[]>();
    const abortControllerRef = useRef<AbortController | null>(null);

    const handleInput = (keyword: string) => {
        setInput(keyword)
    }

    const getUserList = async (name: string) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort(); // Cancel the previous request
        }

        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        try {
            const res = await fetch(`${config.apiUri}/api/v2/p/find?name=${name}`, {
                method: 'GET',
                cache: 'no-cache',
                signal: abortController.signal // Pass the new signal to the fetch call
            });
            console.log(res)
            if (!abortController.signal.aborted) {
                // Check if the request was not cancelled before updating the state
                setFound(await res.json());
            }


            //setFound(await res.json() as PublicUser[]);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    useEffect(() => {
        if (input.length === 0) {
            setFound(null);
        } else {
            getUserList(input);
        }

        return () => {
            // Cleanup function to cancel the fetch request if the component unmounts
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [input])


    return (
        <>
            <div className={s.searchBarContainer}>
                <Image
                    src={"/map/search.svg"}
                    alt={""}
                    width={24}
                    height={24}
                />
                <input onChange={(e) => handleInput(e.target.value)} value={input}
                       type="text"
                       className={s.searchBar}
                       placeholder="Пошук гравців"/>
            </div>

            {found ?             <section className={s.BannerWrapper}>
                    {found.map((user) => (
                        <PlayerBanner key={user.user.id} publicUser={user}/>
                    ))}
                </section> :
                children
            }
        </>
    )
}