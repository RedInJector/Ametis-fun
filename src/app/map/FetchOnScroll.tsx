'use client'
import * as config from "@/config/config";
import s from './page.module.css'
import {useEffect, useRef, useState} from "react";
import {PublicUser} from "@/types/publicUser";
import PlayerBanner from "@/app/p/PlayerBanner";
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from "components/Spinner/Spinner";


export default function FetchOnScroll(){
    const [items, setItems] = useState<PublicUser[]>([]);
    const [page, setPage] = useState(0);
    const [isEnd, setEnd] = useState(false)

    const fetchData = async () => {

        try {
            const response = await fetch(`${config.apiUri}/api/v2/p/all?page=${page}&amount=21`, {cache: "no-cache"});
            if(!response.ok)
                setEnd(true)

            const data = await response.json() as PublicUser[];

            if(data.length === 0)
                setEnd(true)
            
            setItems(prevItems => [...prevItems, ...data]);
            setPage(prevPage => prevPage + 1);
        }catch (error) {
            setEnd(true);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <div className={`${s.width100} ${s.scrollableDiv}`} id="scrollableDiv" >
            <InfiniteScroll
                dataLength={items.length}
                next={fetchData}
                hasMore={!isEnd} // Replace with a condition based on your data source
                loader={<Spinner/>}
                endMessage={""}
                scrollableTarget="scrollableDiv"

                className={s.BannersWrapper}
                style={{width: "100%"}}
            >
                {items.map(item => (
                    <div key={item.user.id}>
                        <PlayerBanner  className={s.gridChildren} publicUser={item}/>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    )
}