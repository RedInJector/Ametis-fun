import s from "./page.module.css";
import React from "react";
import {PrivateUser} from "@/types/PrivateUser";
import PanelBotToTopAnimation from "components/Animations/PanelBotToTop";


export default function Panel({user}:{user:PrivateUser}){

    return(
            <PanelBotToTopAnimation>
                <div className={s.container}>


                        <img
                            src={"https://rubezhnoe.com/images/photos/medium/article17367.jpg"}
                            alt={""}
                            className={s.imgRectangular}
                            />

                </div>
            </PanelBotToTopAnimation>
    )
}