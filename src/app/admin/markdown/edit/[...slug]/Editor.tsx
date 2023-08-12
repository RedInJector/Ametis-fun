'use client'
import * as config from "@/config/config";
import s from './page.module.css'

import {useEffect, useRef, useState} from "react";
import {MD} from "@/types/MD";
import {useRouter, useSearchParams} from "next/navigation";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs"
import 'prismjs/themes/prism-funky.css';

import 'prismjs/components/prism-markdown';
import MDRenderer from "components/MDRenderer/MDRenderer";
import {router} from "next/client";





export default function MdDocumentEditForm({md}:{md:MD}){
    const searchParams = useSearchParams()

    const [path, setPath] = useState(md.path);
    const [content, setContent] = useState(md.content);

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            path: path,
            content: content
        };

        // Replace 'YOUR_POST_ENDPOINT' with the actual endpoint to which you want to send the POST request
        fetch(`${config.apiUri}/api/v2/markdown/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                // Handle the response from the server here if needed
                console.log('Response:', result);
                //router.push(`/mdtest/${md.path}`);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={s.workArea}>
                    <div className={s.EditorWrapper}>
                        <Editor
                            value={content ? content : "null"}
                            onValueChange={code => setContent(code)}
                            highlight={code => highlight(code, languages.md, 'md')}
                            padding={10}
                            className={s.previev}
                        />
                    </div>
                    <div className={s.EditorWrapper}>
                        <MDRenderer mdContent={content ? content : "null"}/>
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}