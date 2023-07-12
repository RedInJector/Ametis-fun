'use client'
import { useUser } from 'components/Auth/UserProvider';
import s from './page.module.css';
import { manrope } from '@/fonts/fonts';
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
import { stringify } from 'querystring';

const inter = Inter({ subsets: ['latin'] })

export default function Me() {
    const user = useUser();
    const [roles, setRoles] = useState<Role[] | null>();
    const [playTime, setPlayTime] = useState<Playtime>();
    const [lastOnline, setLastOnline] = useState<string>("0")

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
                setLastOnline("Зараз")
            
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

    return (
        <main className={s.main}>
            <div className={s.sectionWrapper}>
                {user ?
                    <section className={s.section}>
                        <div className={`${manrope.className} ${s.Header}`}>
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
                            <div className={`${manrope.className} ${s.right}`}>
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
                                    <div className={s.profileText}>Був на сервері: {lastOnline} тому</div>
                                    <hr className={s.hr} />
                                    <div className={s.profileText}>Інформація:</div>
                                </div>
                                <div className={s.rightPanel}>
                                    <div className={s.profileTitleText}>Статистика</div>
                                    <hr className={s.hr} />
                                    <div className={`${s.infoHeader} ${s.profileText}`}>
                                        <div>Часу награно: <span className={s.stats}>{convertSecondsToTime(playTime?.allTimeSeconds)}</span></div>
                                        <div>За місяць: <span className={s.stats}>{convertSecondsToTime(playTime?.lastMonthSeconds)}</span></div>
                                        <div>За тиждень: <span className={s.stats}>{convertSecondsToTime(playTime?.lastWeekSeconds)}</span></div>
                                        <div>За день: <span className={s.stats}>{convertSecondsToTime(playTime?.lastDaySeconds)}</span></div>
                                    </div>
                                    <hr className={s.hr} />
                                    <div className={s.HeatmapWrapper}>
                                        <div className={`${s.Heatmap}`}>
                                            <Calendar />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    :
                    <Spinner />
                }
            </div>
        </main>
    )
}


function Calendar() {
    const user = useUser();

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
            var mappedArray = data.map(function (obj) {
                return {
                    count: obj.playtime == null ? 0 : obj.playtime,
                    date: obj.date,
                    level: 1
                };
            });

            setData(mappedArray);
        };
        if (user == null)
            return

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
                <ReactTooltip />
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
    if(seconds === undefined)
        return "0";

    if (seconds < 60) {
      return seconds + " хв.";
    } else {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
  
      if (hours > 0) {
        return hours + " год. " + minutes + " хв.";
      } else {
        return minutes + " хв.";
      }
    }
  }