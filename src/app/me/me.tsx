'use client'
import s from './page.module.css';
import Spinner from '@/components/Spinner/Spinner';
import ReactSkinview3d from 'react-skinview3d';
import { WalkingAnimation } from "skinview3d";
import { useEffect, useState } from 'react';
import { Playtime, PlaytimeData, Role, User } from '@/types/types';
import * as config from '@/config/config'

import { Inter } from 'next/font/google'
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

import ReactTooltip from 'react-tooltip';
import Image from "next/image";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const inter = Inter({ subsets: ['latin'] })

export default function Me({user}:{user:User}) {
    const [roles, setRoles] = useState<Role[] | null>();
    const [playTime, setPlayTime] = useState<Playtime>();
    const [lastOnline, setLastOnline] = useState<string>("0")
    const [showTooltip, setShowTooltip] = useState(false);

    const handleClick = () => {
        if(showTooltip)
            return
        setShowTooltip(true);
        setTimeout(() => {
            setShowTooltip(false);
        }, 2000);
    };

    useEffect(() => {
        const fetchData1 = async () => {
            const response = await fetch(`${config.apiUri}/api/v1/p/roles/` + user?.minecraftName, {
                method: 'GET',
                cache: 'no-store',
            });
            if (!response.ok) {
                return
            }

            const data = await response.json() as Role[];

            setRoles(data);
        };

        const fetchData2 = async () => {
            const response = await fetch(`${config.apiUri}/api/v1/p/allplaytime/` + user?.minecraftName, {
                method: 'GET',
                cache: 'no-store',
            });
            if (!response.ok) {
                return
            }

            const data = await response.json() as Playtime;

            setPlayTime(data);
        }
        const fetchData3 = async () => {
            const response = await fetch(`${config.apiUri}/api/v1/p/isonline/` + user?.minecraftName, {
                method: 'GET',
                cache: 'no-store',
            });
            if (!response.ok) {
                return
            }

            const data = await response.text();

            if(data == 'Now')
                setLastOnline("Онлайн")

            else if(data == "null")
                setLastOnline("Ніколи")

            else
                setLastOnline(convertSecondsToTime(parseInt(data)));
        }


        if (user == null)
            return

        fetchData1();
        fetchData2();
        fetchData3();
    }, [user])


    const convertToPaddedString = (num: number, length: number): string => {
        const numString = num.toString();
        return numString.padStart(length, '0');
    }

    const copied = () =>{

    }

    return (
        <main className={s.main}>
            <div className={s.sectionWrapper}>
                <section className={s.section}>
                    <div className={`${s.Header}`}>
                        {user?.minecraftName}#{convertToPaddedString(user.id, 5)}
                    </div>
                    <hr className={s.hr} />
                    <div className={s.mainpanelwrapper}>
                        <div className={s.left}>
                            <ReactSkinview3d
                                skinUrl={config.apiUri +"/api/v1/p/skin/" + user.minecraftName}
                                height="400"
                                width="275"
                                className={s.viewer}
                                onReady={({
                                    viewer
                                }) => {

                                    viewer.animation = new WalkingAnimation();
                                    viewer.animation.speed = 0.8;

                                    viewer.animation.progress = 0.5;
                                    //viewer.animation.paused = true;
                                    // Enabled auto rotate

                                    viewer.controls.enableRotate = true;
                                    viewer.controls.enableZoom = false;

                                    //viewer.camera.rotateX(0.2);
                                    viewer.camera.translateY(5);
                                    viewer.camera.translateX(-15);

                                    viewer.fov = 50;
                                    viewer.zoom = 0.9;
                                }}
                            />
                        </div>
                        <div className={`${s.right}`}>
                            <div className={s.rightPanel}>
                                <div className={s.profileTitleText}>Профіль</div>
                                <hr className={s.hr} />
                                <div className={`${inter.className} ${s.profileText} ${s.rolebox}`}>Ролі:
                                    {
                                        roles?.map((role, index) => (
                                            <div key={index} className={s.role}>
                                                <span
                                                    style={{ backgroundColor: `rgb(${role.R},${role.G},${role.B})` }}
                                                    className={s.dot}
                                                ></span>
                                                {role.name}
                                            </div>
                                        ))
                                    }

                                </div>
                                <hr className={s.hr} />
                                <div className={s.profileText}>Був на сервері: {lastOnline} {lastOnline != 'Ніколи' && lastOnline != "Онлайн" ? "тому" : "" }</div>
                                <hr className={s.hr} />
                                <div onClick={handleClick}  className={`${inter.className} ${s.profileText} ${s.rolebox} ${s.clickable}`}>Інформація:
                                    <CopyToClipboard text={user.discordUser.publicUsername}>
                                    <div  className={s.role}>
                                        <Image
                                            src={'/discord-icon.svg'}
                                            width={20}
                                            height={20}
                                            alt={""} />
                                        {user.discordUser.publicUsername}

                                    </div>
                                    </CopyToClipboard>
                                    {showTooltip ? "Скопійовано!" : null}
                                </div>
                            </div>
                            <div className={s.rightPanel}>
                                <div className={s.profileTitleText}>Статистика</div>
                                <hr className={s.hr} />
                                <div className={`${s.profileText}`}>Часу награно: <span className={`${s.profileText}  ${s.stats}`}>{convertSecondsToTime(playTime?.allTimeSeconds)}</span></div>
                                <div className={`${s.infoHeader} ${s.profileText}`}>


                                    <div>За місяць: <span className={s.stats}>{convertSecondsToTime(playTime?.lastMonthSeconds)}</span></div>
                                    <div>За тиждень: <span className={s.stats}>{convertSecondsToTime(playTime?.lastWeekSeconds)}</span></div>
                                    <div>За день: <span className={s.stats}>{convertSecondsToTime(playTime?.lastDaySeconds)}</span></div>
                                </div>
                                <hr className={s.hr} />
                                <div className={s.HeatmapWrapper}>
                                    <div className={`${s.Heatmap}`}>
                                        <Calendar user={user}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}


function Calendar({user}:{user:User}) {
    const [data, setData] = useState<any[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${config.apiUri}/api/v1/p/playtime/` + user?.minecraftName, {
                method: 'GET',
                cache: 'no-store',
            });
            if (!response.ok) {
                return
            }

            const data = await response.json() as PlaytimeData[];
            if(data == null) {
                setData([])
                return
            }
            var mappedArray = data.map(function (obj) {
                return {
                    count: obj.playtime == null ? 0 : obj.playtime,
                    date: obj.date,
                    level: 1
                };
            });

            setData(mappedArray);
        };

        fetchData();
    }, [])


    const getTooltipDataAttrs = (value:any) => {
        // Temporary hack around null value.date issue
        if (!value || !value.date) {
          return null;
        }
        // Configuration for react-tooltip
        return {
          'data-tip': `${value.date} награв: ${convertSecondsToTime(value.count)}`,
        };
      };
    
    
    return (
        <>
            {data ?
                <>
                <ReactTooltip  className={s.tooltip} />
                <CalendarHeatmap
                    startDate={new Date('2023-07-01')}
                    endDate={new Date('2023-12-31')}
                    showMonthLabels = {false}
                    showWeekdayLabels = {false}
                    showOutOfRangeDays  
                    tooltipDataAttrs={getTooltipDataAttrs}     
                          
                    weekdayLabels={['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']}
                    monthLabels={['січ', 'лют', 'бер', 'кві', 'тра', 'чер', 'лип', 'сер', 'вер', 'жов', 'лис', 'гру']}
                    values={data}
                    classForValue={(value) => {
                        if (!value) {
                            return s.colorScale0;
                        }

                        if(value.count == 0)
                            return s.colorScale0;
                        else if(value.count <= 3600)
                            return s.colorScale1;
                        else if(value.count <= 3600*2)
                            return s.colorScale2;
                        else if(value.count <= 3600*3)
                            return s.colorScale3;
                        else if(value.count <= 3600*4)
                            return s.colorScale4;
                        else if(value.count >= 3600*5)
                            return s.colorScale5;

                    } } />
                    
                    </>
                :
                <Spinner />
            }
            
        </>
    )
}


function convertSecondsToTime(seconds: number | undefined) {
    const minutesInDay = 1440;


    if (seconds === undefined)
        return "0";

    if (seconds == -1)
        return "Ніколи";


    const days = Math.floor(seconds / 86400);
    seconds -= days * 86400;

    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;

    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    const timeComponents = [];

    if (days > 0) {
        timeComponents.push(`${days} дн.  `);
    }
    if (hours > 0) {
        timeComponents.push(`${hours} год.  `);
    }
    if (minutes > 0) {
        timeComponents.push(`${minutes} хв.  `);
    }
    if (seconds > 0 && hours == 0) {
        timeComponents.push(`${seconds} сек.  `);
    }

    const timeString = timeComponents.join(" ");

    return timeString;

}