'use client'
import * as config from '@/config/config'
import { User } from '@/types/types'
import { useEffect, useState } from 'react';
import s from './page.module.css'


export default function Table(){

    return(
        <main className={s.main}>
            <Table1 />
        </main>
    )
    
}


function Table1(){
    const [table, setTable] = useState<User[] | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${config.apiUri}/api/v1/admin/players`, {
                method: 'GET',
                cache: 'no-store',
                credentials: 'include',
            });

            const data = await response.json() as User[];
            
            setTable(data);
        };

        fetchData();
    }, [])



    const Userstable = () =>{
        return(
            <>
            {
                table === null ?  null :
                table.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.discordUser.publicUsername} / {user.discordUser.discordId}</td>
                        <td>
                            {user.minecraftName ? (
                                <>
                                    {user.minecraftName}
                                </>
                            ) : (
                               <p className={s.noplayer}>No Minecraft Player</p>
                            )}
                        </td>
                        
                        <td>{String(user.hasPayed)}</td>
                        <td>{String(user.banned)}</td>
                    </tr>
                ))
            }
            </>
        )
        
    }

    return (
        <>

                <div className={s.tablewrapper}>
                    <table className={s.fltable}>
                        <thead>
                            <tr>
                                <th>User id</th>
                                <th>discord (name / id)</th>
                                <th>minecraft name</th>
                                <th>Has Payed</th>
                                <th>is banned</th>
                            </tr>
                        </thead>
                        <tbody>       
                            <Userstable />

                        </tbody>
                    </table>
                </div>

        </>
    )
}