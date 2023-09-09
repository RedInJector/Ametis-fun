import s from './page.module.css';
import * as config from '@/config/config'

import { Inter } from 'next/font/google'
import '@/libs/react-calendar-heatmap/dist/styles.css';

import Image from "next/image";
import {ConvertSecondsToTime} from "@/Helpers/SecondsConverter";
import {PublicUser} from "@/types/publicUser";
import {Calendar} from "components/UserPage/Calendar";
import Skin from "components/UserPage/Skin";
import CopyComponent from "components/UserPage/CopyComponent";
import IsOnline from "components/UserPage/IsOnline";

const inter = Inter({ subsets: ['latin'] })

export default function UserPage({publicUser}:{publicUser:PublicUser}) {

    const convertToPaddedString = (num: number, length: number): string => {
        const numString = num.toString();
        return numString.padStart(length, '0');
    }

    return (
        <main className={s.main}>
            <div className={s.sectionWrapper}>
                <section className={s.section}>
                    <div className={`${s.Header}`}>
                        {publicUser.user.minecraftName}#{convertToPaddedString(publicUser.user.id, 5)}
                    </div>
                    <hr className={s.hr} />
                    <div className={s.mainpanelwrapper}>
                        <div className={s.left}>
                            <Skin url={`${config.apiUri}/api/v2/p/${publicUser.user.minecraftName}/skin.png`} />
                        </div>
                        <div className={`${s.right}`}>
                            <div className={s.rightPanel}>
                                <div className={s.profileTitleText}>Профіль</div>
                                <hr className={s.hr} />
                                <div className={`${inter.className} ${s.profileText} ${s.rolebox}`}>Ролі:
                                    {
                                        publicUser.roles?.map((role, index) => (
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
                                <div className={s.profileText}>Був на сервері: <IsOnline name={publicUser.user.minecraftName}/></div>
                                <hr className={s.hr} />
                                <div className={`${inter.className} ${s.profileText} ${s.rolebox}`}>Інформація:
                                    <CopyComponent textToCopy={publicUser.user.discordUser.Username}>
                                        <div  className={s.role}>
                                            <Image
                                                src={'/discord-icon.svg'}
                                                width={20}
                                                height={20}
                                                alt={""} />
                                            {publicUser.user.discordUser.Username}
                                        </div>
                                    </CopyComponent>
                                </div>
                            </div>
                            <div className={s.rightPanel}>
                                <div className={s.profileTitleText}>Статистика</div>
                                <hr className={s.hr} />
                                <div className={`${s.profileText}`}>Часу награно: <span className={`${s.profileText}  ${s.stats}`}>{ConvertSecondsToTime(publicUser.statistics?.time_all)}</span></div>
                                <div className={`${s.infoHeader} ${s.profileText}`}>


                                    <div>За місяць: <span className={s.stats}>{ConvertSecondsToTime(publicUser.statistics?.time_month)}</span></div>
                                    <div>За тиждень: <span className={s.stats}>{ConvertSecondsToTime(publicUser.statistics?.time_week)}</span></div>
                                    <div>За день: <span className={s.stats}>{ConvertSecondsToTime(publicUser.statistics?.time_day)}</span></div>
                                </div>
                                <hr className={s.hr} />
                                <div className={s.HeatmapWrapper}>
                                    <div className={`${s.Heatmap}`}>
                                        <Calendar data={publicUser.statistics?.heatmap_data}/>
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
