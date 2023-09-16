'use client'

import * as config from "@/config/config";
import s from "components/SearchBar/searchbar.module.css"
import { useEffect, useRef, useState} from "react";
import Image from "next/image";
import {PUser} from "@/types/PrivateUser";


export default function AdminSerachbar({children, callback}: {  children?: any, callback:(res:PUser[] | null) => void }){
    const [input, setInput] = useState('');
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
            const res = await fetch(`${config.apiUri}/api/v2/admin/searchByName?name=${name}&page=0`, {
                method: 'GET',
                cache: 'no-cache',
                credentials: 'include',
                signal: abortController.signal // Pass the new signal to the fetch call
            });
            if (!abortController.signal.aborted) {
                // Check if the request was not cancelled before updating the state
                const a = await res.json() as PUser[];
                callback(a);
                //setFound(a);
            }

            //setFound(await res.json() as PublicUser[]);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    useEffect(() => {
        if (input.length < 2) {
            callback(null);
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
            {children}
        </>
    )
}