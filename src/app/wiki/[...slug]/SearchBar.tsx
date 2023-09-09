'use client'
import {useEffect, useRef, useState} from "react";
import * as config from "@/config/config";
import s from "components/SearchBar/searchbar.module.css"
import Image from "next/image";
import {MD} from "@/types/MD";
import Link from "next/link";

export default function SearchBar() {
    const [input, setInput] = useState("");
    const [found, setFound] = useState<MD[] | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleInput = (keyword: string) => {
        setInput(keyword);
    };

    const getUserList = async (param: string) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort(); // Cancel the previous request
        }

        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        try {
            const res = await fetch(
                `${config.apiUri}/api/v2/markdown/wiki/search?param=${param}`,
                {
                    method: "GET",
                    cache: "no-cache",
                    signal: abortController.signal, // Pass the new signal to the fetch call
                }
            );
            if (!abortController.signal.aborted) {
                // Check if the request was not cancelled before updating the state
                const data = await res.json() as MD[];
                setFound(data);
            }
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    useEffect(() => {
        if (input.length === 0) {
            setFound(null);
        } else if (input.length >= 3) {
            // Implement debounce to make the call after 0.5 seconds
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
            debounceTimeoutRef.current = setTimeout(() => {
                getUserList(input);
            }, 500);
        }

        return () => {
            // Cleanup function to cancel the fetch request and debounce timeout if the component unmounts
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, [input]);

    return (
        <>
            <div className={s.searchBarContainer}>
                <Image src={"/map/search.svg"} alt={""} width={24} height={24} />
                <input
                    onChange={(e) => handleInput(e.target.value)}
                    value={input}
                    type="text"
                    className={s.searchBar}
                    placeholder="Пошук"
                />
            </div>

            {found ?
                <section className={s.wikiFoundContainer}>
                    {found.map((md) => (
                        <Link  key={md.id} className={s.wikiFoundItem} href={`${config.thisDomain}/wiki/${md.path}`}>
                            <Image
                                height={50}
                                width={50}
                                src={md.imageUrl ?  md.imageUrl : ""}
                                alt={""}
                                className={s.wikiImage}
                            />
                            <div className={s.wikiFoundText}>
                                <div className={s.wikifoundItemTitle}>{md.title}</div>
                                <div className={s.wikifoundItemDescription}>{md.content}</div>
                            </div>
                        </Link>
                    ))
                    }
                    {
                        found.length == 0 ? <>Не знайдено</> : null
                    }
                </section>
            : null}

        </>
    );
}