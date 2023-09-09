'use client'
import s from './centeredPanel.module.css'

export default function CenteredPanel({children}:{children:any}){
    return(
        <section className={s.panel} >
            {children}
        </section>
    )
}

export function CenteredUnclosablePanel({children}:{children:any}){
    return(
        <section className={s.unskippable}>
            <div className={`${s.panel}`}>
                {children}
            </div>
        </section>
    )
}