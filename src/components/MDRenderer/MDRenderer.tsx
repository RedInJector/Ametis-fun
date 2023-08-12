'use client'

import s from "@/app/admin/markdown/edit/[...slug]/page.module.css";
import {useEffect, useRef, useState} from "react";
import * as config from "@/config/config";






export default function MDRenderer({mdContent}:{mdContent:string}){
    const timerRef = useRef<number | null>(null);
    const [renderedContent, setRenderedContent] = useState<any>()

    useEffect(() => {

        // Clear any existing timer
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        const data = {
            content: mdContent
        };

        // Set a new timer to trigger the post request after the specified delay
        timerRef.current = window.setTimeout(() => {
            fetch(`${config.apiUri}/api/v2/markdown/render`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.text())
                .then(result => {
                    setRenderedContent(result)
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }, 500);

        // Clear the timer on unmount
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [mdContent]);


    return(
        <article dangerouslySetInnerHTML={{ __html: renderedContent }} />
    )
}