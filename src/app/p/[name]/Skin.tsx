'use client'
import * as config from "@/config/config";
import s from "@/app/p/[name]/page.module.css";
import {WalkingAnimation} from "skinview3d";
import ReactSkinview3d from "react-skinview3d";

export default function Skin({url}:{url:string}){
    return(
        <ReactSkinview3d
            skinUrl={url}
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
    )
}