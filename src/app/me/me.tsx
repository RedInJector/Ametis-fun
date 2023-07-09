'use client'
import { useUser } from 'components/Auth/UserProvider';
import s from './page.module.css';
import { manrope } from '@/fonts/fonts';
import Spinner from '@/components/Spinner/Spinner';
import ReactSkinview3d from 'react-skinview3d';
import { WalkingAnimation } from "skinview3d";
import { useEffect, useState } from 'react';
import { PlaytimeData, Role, User } from '@/types/types';
import * as config from '@/config/config'

import { Inter } from 'next/font/google'
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

import ReactTooltip from 'react-tooltip';

const inter = Inter({ subsets: ['latin'] })

export default function Me() {
    const user = useUser();
    const [roles, setRoles] = useState<Role[] | null>();

    useEffect(() => {
        const fetchData = async () => {
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

        if (user == null)
            return

        fetchData();
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
                                    skinUrl="https://mc-heads.net/skin/maksutko"
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
                                    <div className={s.profileText}>Був на сервері:</div>
                                    <hr className={s.hr} />
                                    <div className={s.profileText}>Інформація:</div>
                                </div>
                                <div className={s.rightPanel}>
                                    <div className={s.profileTitleText}>Статистика</div>
                                    <hr className={s.hr} />
                                    <div className={`${s.infoHeader} ${s.profileText}`}>
                                        <div>Часу награно: <span className={s.stats}>15 год.</span></div>
                                        <div>За місяць: <span className={s.stats}>156 год. </span></div>
                                        <div>За тиждень: <span className={s.stats}>156 год.</span></div>
                                        <div>За день: <span className={s.stats}>156 год.</span></div>
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
                console.log(Math.round(obj.playtime / 60 / 60 * 10) / 10);
                return {
                    count: obj.playtime == null ? 0 : Math.round(obj.playtime / 60 / 60 * 10) / 10,
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



    let data1 = [
        {date: '2023-07-01', count: 0},
        {date: '2023-07-02', count: 1},
        {date: '2023-07-03', count: 2},
        {date: '2023-07-04', count: 3},
        {date: '2023-07-05', count: 6},
        {date: '2023-07-06', count: 0},
        {date: '2023-07-07', count: 1},
        {date: '2023-07-08', count: 2},
        {date: '2023-07-09', count: 3},
        {date: '2023-07-10', count: 6},
        {date: '2023-07-16', count: 0},
        {date: '2023-07-17', count: 1},
        {date: '2023-07-18', count: 2},
        {date: '2023-07-19', count: 3},
        {date: '2023-07-10', count: 6},
        {date: '2023-08-01', count: 4},
        {date: '2023-08-02', count: 2},
        {date: '2023-08-03', count: 1},
        {date: '2023-08-04', count: 2},
        {date: '2023-08-05', count: 3},
        {date: '2023-08-06', count: 5},
        {date: '2023-08-07', count: 1},
        {date: '2023-08-08', count: 2},
        {date: '2023-08-09', count: 1},
        {date: '2023-08-10', count: 4},
    ]

    const getTooltipDataAttrs = (value:any) => {
        // Temporary hack around null value.date issue
        if (!value || !value.date) {
          return null;
        }
        // Configuration for react-tooltip
        return {
          'data-tip': `${value.date} награв: ${value.count} год.`,
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
                    showMonthLabels
                    
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
                        else if(value.count <= 1)
                            return s.colorScale1;
                        else if(value.count <= 2)
                            return s.colorScale2;
                        else if(value.count <= 3)
                            return s.colorScale3;
                        else if(value.count <= 4)
                            return s.colorScale4;
                        else if(value.count >= 5)
                            return s.colorScale5;



                    } } />
                    
                    </>
                :
                <Spinner />
            }
            
        </>
    )
}