'use client'
import * as config from '@/config/config'
import {useEffect, useRef, useState} from 'react';
import s from './page.module.css'
import {PrivateUser, PUser} from "@/types/PrivateUser";


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

    const [searchFound, setSearchFound] = useState<PrivateUser[] | null>(null)


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

    const setfound = (found: PUser[] | null) => {
        let converted: PrivateUser[] = [];
        if (found != null) {
            found.map(value => {
                let a: PrivateUser = {
                    user: value,
                    statistics: undefined,
                    roles: undefined
                }
                converted.push(a);
            })
            setSearchFound(converted);
        } else
            setSearchFound(null);
    }


    return (
        <>

            <div className={s.tablewrapper}>
                <AdminSerachbar callback={res => setfound(res)}>
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

                            searchFound != null ?
                                searchFound.map(value => <SingleUserRecord key={value.user.id} inpuser={value}/>)
                                :
                                table ?
                                    table.users.map(value => <SingleUserRecord key={value.user.id} inpuser={value}/>)
                                    :
                                    <tr>
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
                </AdminSerachbar>
            </div>

        </>
    )
}

const SingleUserRecord = ({inpuser}: { inpuser: PrivateUser }) => {

    const [user, setUser] = useState<PrivateUser>(inpuser);


    const onBan = () => {
        const updatedUser = {...user}; // Create a shallow copy
        updatedUser.user.banned = true; // Modify the copied object
        setUser(updatedUser);
    }
    const onUnBan = () => {
        const updatedUser = {...user}; // Create a shallow copy
        updatedUser.user.banned = false; // Modify the copied object
        updatedUser.user.unbannable = true;
        setUser(updatedUser);
    }

    const onPermaBan = () => {
        const updatedUser = {...user}; // Create a shallow copy
        updatedUser.user.banned = true; // Modify the copied object
        updatedUser.user.unbannable = false;
        setUser(updatedUser);
    }
    const onAllow = () => {
        const updatedUser = {...user}; // Create a shallow copy
        updatedUser.user.hasPayed = !user.user.hasPayed; // Modify the copied object
        setUser(updatedUser);
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
                            <AllowButton user={user} onAllowCallback={onAllow}/>
                        </div>
                    </td>
                    <td>
                        <div className={s.gap}>
                            {String(user.user.banned)}
                            <BanButton onPermaBanCallback={onPermaBan} onUnbannCallback={onUnBan} onBanCallback={onBan}
                                       user={user}/>
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
})
{
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


import './radix.css'
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {Cross2Icon} from '@radix-ui/react-icons';
import * as c from "@/config/config";
import * as Checkbox from '@radix-ui/react-checkbox';
import {CheckIcon} from '@radix-ui/react-icons';
import AdminSerachbar from "@/app/admin/users/Search";


const BanButton = ({user, onBanCallback, onUnbannCallback, onPermaBanCallback}: {
    user: PrivateUser,
    onBanCallback: () => void,
    onUnbannCallback: () => void
    onPermaBanCallback: () => void
}) =>
{
    const reasonRef = useRef<HTMLInputElement>(null);
    const timeRef = useRef<HTMLInputElement>(null);
    const timetypeRef = useRef<string>("d");
    const [isPermaban, setIsPermaban] = useState(false);
    const [isLoading, setLoading] = useState(false)

    const ban = async () => {
        let test = performance.now();
        setLoading(true)
        const TimeConverter = (time:number, type: string) => {
            switch (type) {
                case "m": return time
                case "h": return time * 60;
                case "d": return time * 60 * 24;
                case "mo": return time * 60 * 24 * 30
                default: return time;
            }
        }


        const reason = reasonRef.current ? reasonRef.current.value : "Забанено адміністратором";
        const time = !timeRef.current ? "0" : TimeConverter(Number(timeRef.current.value), timetypeRef.current);

        const res = await fetch(c.apiUri + '/api/v2/admin/modifyuser/ban', {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: user.user.id,
                reason: reason,
                time: time,
                isPermaban: isPermaban
            })
        })

        setLoading(false)
        if (!res.ok) {
            console.log("Error: " + res.status)
            return
        }

        timetypeRef.current = "d";

        if (isPermaban)
            onPermaBanCallback()
        else
            onBanCallback();

        setIsPermaban(false);
    }

    const unban = async () => {
        setLoading(true)
        const res = await fetch(c.apiUri + '/api/v2/admin/modifyuser/unban', {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                id: user.user.id,
            })
        })
        setLoading(false)
        if (!res.ok) {
            console.log("Error: " + res.status)
            return
        }

        onUnbannCallback();
    }

    return (
        <>
            {isLoading ?
                <div className="Button loading">...</div>
                :
                !user.user.banned ?
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <button className="Button red">Ban</button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay className="DialogOverlay"/>
                            <Dialog.Content className="DialogContent">
                                <Dialog.Title
                                    className="DialogTitle">Забанити {user.user.minecraftName ? user.user.minecraftName : user.user.discordUser.Username}</Dialog.Title>
                                <Dialog.Description className="DialogDescription">
                                    Забанти гравця по причині:
                                </Dialog.Description>
                                <fieldset className="Fieldset">
                                    <label className="Label" htmlFor="c1">
                                        Пермабан?
                                    </label>
                                    <Checkbox.Root onCheckedChange={() => {
                                        setIsPermaban(!isPermaban)
                                    }} className="CheckboxRoot" id="c1">
                                        <Checkbox.Indicator className="CheckboxIndicator">
                                            <CheckIcon/>
                                        </Checkbox.Indicator>
                                    </Checkbox.Root>
                                </fieldset>
                                {isPermaban ? null :
                                <fieldset className="Fieldset">
                                    <label className="Label" htmlFor="time">
                                        Час
                                    </label>
                                    <input type={"number"} ref={timeRef} className="Input" id="time"
                                           defaultValue="7"/>
                                    <Select.Root defaultValue="d" onValueChange={(value) => {timetypeRef.current = value}}>
                                        <Select.Trigger className="SelectTrigger" aria-label="time datadype">
                                            <Select.Value placeholder="adasd"/>
                                            <Select.Icon className="SelectIcon">
                                                <ChevronDownIcon />
                                            </Select.Icon>
                                        </Select.Trigger>
                                        <Select.Portal>
                                            <Select.Content className="SelectContent">
                                                <Select.ScrollUpButton className="SelectScrollButton">
                                                    <ChevronUpIcon />
                                                </Select.ScrollUpButton>
                                                <Select.Viewport className="SelectViewport">
                                                    <Select.Group>
                                                        <Select.Label className="SelectLabel">Тип</Select.Label>
                                                        <SelectItem value="m">хв.</SelectItem>
                                                        <SelectItem value="h">год.</SelectItem>
                                                        <SelectItem value="d">дн.</SelectItem>
                                                        <SelectItem value="mo">міс.</SelectItem>
                                                    </Select.Group>
                                                </Select.Viewport>
                                                <Select.ScrollDownButton className="SelectScrollButton">
                                                    <ChevronDownIcon />
                                                </Select.ScrollDownButton>
                                            </Select.Content>
                                        </Select.Portal>
                                    </Select.Root>

                                </fieldset>
                                }
                                <fieldset className="Fieldset">
                                    <label className="Label" htmlFor="reason">
                                        Причина
                                    </label>
                                    <input ref={reasonRef} className="Input" id="reason"
                                           defaultValue="Забанено адміністратором"/>
                                </fieldset>
                                <div style={{display: 'flex', marginTop: 25, justifyContent: 'flex-end'}}>
                                    <Dialog.Close asChild>
                                        <button onClick={ban} className="Button green">Save changes</button>
                                    </Dialog.Close>
                                </div>
                                <Dialog.Close asChild>
                                    <button className="IconButton" aria-label="Close">
                                        <Cross2Icon/>
                                    </button>
                                </Dialog.Close>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                    :
                    <button onClick={unban} className="Button violet">unBan</button>

            }
        </>
    );
}

const AllowButton = ({user, onAllowCallback}: { user: PrivateUser, onAllowCallback: () => void }) => {
    const [isLoading, setLoading] = useState(false)

    const allow = async (status: boolean) => {
        setLoading(true)
        const res = await fetch(c.apiUri + '/api/v2/admin/modifyuser/allowonserver', {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: user.user.id,
                status: status
            })
        })
        setLoading(false);

        if (!res.ok) {
            console.log("Error: " + res.status)
            return
        }

        onAllowCallback();
    }


    return (
        <>
            {isLoading ?
                <div className="Button loading">...</div>
                :
                <div>
                    {
                        user.user.hasPayed ?
                            <button onClick={() => allow(false)} className="Button red">disAllow</button>
                            :
                            <button onClick={() => allow(true)} className="Button violet">Allow</button>
                    }
                </div>

            }
        </>
    )
}





import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import classnames from 'classnames';



const SelectItem = React.forwardRef(({value, children, className, ...props}: {
    children: any,
    className?: any,
    value: string
}, forwardedRef: any) => (
        <Select.Item value={value} className={classnames('SelectItem', className)} {...props} ref={forwardedRef}>
            <Select.ItemText>{children}</Select.ItemText>
            <Select.ItemIndicator className="SelectItemIndicator">
                <CheckIcon />
            </Select.ItemIndicator>
        </Select.Item>
));
