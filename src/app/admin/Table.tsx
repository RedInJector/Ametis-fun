'use client'
import * as config from '@/config/config'
import {useEffect, useState} from 'react';
import s from './page.module.css'
import {PrivateUser} from "@/types/PrivateUser";
import CenteredPanel, {CenteredUnclosablePanel} from "components/PopUp/CenteredPanel";
import ModifiebleUser from "@/types/ModifiebleUser";


export default function Table() {

    return (
        <Table1/>
    )

}


interface UserPage {
    users: PrivateUser[];
    currentPage: number;
    maxPage: number;
}


function Table1() {
    const [table, setTable] = useState<UserPage | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [maxPage, setMaxPage] = useState(0);
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
        fetchData(0);
    }, [])

    const fetchData = async (page: number) => {
        const response = await fetch(`${config.apiUri}/api/v2/admin/players?page=${page}`, {
            method: 'GET',
            cache: 'no-store',
            credentials: 'include',
        });

        if (!response.ok)
            return (<div>Error</div>)


        const data = await response.json() as UserPage;

        setMaxPage(data.maxPage - 1);
        setCurrentPage(data.currentPage);
        setTable(data);
        setLoading(false)
    };

    const FetchPage = (page: number) => {
        setLoading(true);
        fetchData(page)
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
                    {isLoading ? <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr> :
                        table ?
                            table.users.map(value => <SingleUserRecord key={value.user.id} inpuser={value}/>)
                            : <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                    }
                    </tbody>
                </table>
                <div className={s.PagesNumbersContainer}>
                    Page:
                    <GenerateClickablePageNumbers
                        currentPage={currentPage}
                        func={FetchPage}
                        maxPage={maxPage}
                        range={3}
                    />
                </div>
            </div>
        </>
    )
}

const SingleUserRecord = ({inpuser}: { inpuser: PrivateUser }) => {

    const [user, setUser] = useState<PrivateUser>(inpuser);
    const [banPopup, setBanPopup] = useState(false);
    const [permaBanPopup, setPermaBanPopup] = useState(false);
    const [banReason, setBanReason] = useState("banned by admin");

    const MUser = new ModifiebleUser(inpuser);


    const OpenBanPopup = () => {
        setBanPopup(true);
    }
    const OpenPermaBanPopup = () => {
        setPermaBanPopup(true);
    }

    const BanPopUpClick = () => {
        if (banReason.length < 5)
            return;

        MUser.setBan(true)
            .setBanReason(banReason)
            .update().then(r => { if (!r) console.log('error') });


        setBanPopup(false)
        setBanReason("")

        setUser(MUser.getUser)
    }
    const PermaBanPopUpClick = () => {
        if (banReason.length < 5)
            return;

        MUser.setBan(true)
            .setUnbannable(false)
            .setBanReason(banReason)
            .update()
            .then(r => { if (!r) console.log('error') });

        setPermaBanPopup(false)
        setBanReason("")

        setUser(MUser.getUser)
    }

    const unban = () =>{
        MUser.setUnbannable(true)
            .setBan(false)
            .update()
            .then(r => { if (!r) console.log('error') });

        setUser(MUser.getUser)
    }

    const cancel = () => {
        setBanReason("banned by admin")
        setPermaBanPopup(false)
        setBanPopup(false);
    }

    const handleBanReasonChange = (reason: string) => {
        setBanReason(reason)
    }

     const setHasPayed = (status: boolean) =>{
        MUser.setHasPayed(status)
            .update()
            .then(r => { if (!r) console.log('error') });

        setUser(MUser.getUser)
     }

    return (
        <>
            {user ?
                <tr key={user.user.id}>
                    <td>{user.user.id}</td>
                    <td>{user.user.discordUser.Username} / {user.user.discordUser.discordId}</td>
                    <td>
                        {user.user.minecraftName ? (
                            <>
                                {user.user.minecraftName}
                            </>
                        ) : (
                            <p className={s.noplayer}>No Minecraft Player</p>
                        )}
                    </td>

                    <td>
                        <div className={s.gap}>
                            {String(user.user.hasPayed)}
                            {!user.user.hasPayed ?
                                <button className={s.UnBanButton} onClick={() => {setHasPayed(true)}}>
                                    allow
                                </button>
                                :
                                <button className={s.BanButton} onClick={() => setHasPayed(false)}>
                                    disallow
                                </button>
                            }
                        </div>
                    </td>
                    <td>
                        <div className={s.gap}>
                            {String(user.user.banned)}
                            {user.user.banned ?
                                <button className={s.UnBanButton} onClick={() => {unban()}}>
                                    unban
                                </button>
                                :
                                <button className={s.BanButton} onClick={OpenBanPopup}>
                                    ban
                                </button>
                            }
                            {!user.user.unbannable ?
                                <button className={s.UnBanButton} onClick={() => {unban()}}>
                                    unPermaban
                                </button>
                                :
                                <button className={s.BanButton} onClick={OpenPermaBanPopup}>
                                    Permaban
                                </button>
                            }
                            {
                                banPopup &&
                                <CenteredUnclosablePanel>
                                    <div className={s.popup}>
                                        <textarea
                                            onChange={(e) => handleBanReasonChange(e.target.value)}
                                            value={banReason}

                                            className={s.BanReasonInput}
                                            placeholder="причина"
                                        />
                                        <button onClick={BanPopUpClick}>Ok</button>
                                        <button onClick={cancel}>cancel</button>
                                    </div>
                                </CenteredUnclosablePanel>
                            }
                            {
                                permaBanPopup &&
                                <CenteredUnclosablePanel>
                                    <div className={s.popup}>
                                        <textarea
                                            onChange={(e) => handleBanReasonChange(e.target.value)}
                                            value={banReason}

                                            className={s.BanReasonInput}
                                            placeholder="причина"
                                        />
                                        <button onClick={PermaBanPopUpClick}>Ok</button>
                                        <button onClick={cancel}>cancel</button>
                                    </div>
                                </CenteredUnclosablePanel>
                            }
                        </div>
                    </td>
                </tr>
                : null
            }
        </>
    )

}

function GenerateClickablePageNumbers({currentPage, maxPage, range, func}: {
    currentPage: number,
    maxPage: number,
    range: number,
    func: any
}) {
    const clickableNumbers: number[] = [];

    // Generate numbers to the left of the current page
    for (let i = Math.max(currentPage - range, 0); i < currentPage; i++) {
        clickableNumbers.push(i);
    }

    // Add the current page
    clickableNumbers.push(currentPage);

    // Generate numbers to the right of the current page
    for (let i = currentPage + 1; i <= Math.min(currentPage + range, maxPage); i++) {
        clickableNumbers.push(i);
    }

    return (
        <>
            {clickableNumbers.map(value => <span key={value} className={value == currentPage ? `` : `${s.link}`}
                                                 onClick={() => func(value)}>{value}</span>)}
        </>
    );
}