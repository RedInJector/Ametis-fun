'use client'
import * as config from "@/config/config";
import s from './page.module.css'
import {MD} from "@/types/MD";


import {useState} from "react";
import MDRenderer from "components/MDRenderer/MDRenderer";
import Editor from "react-simple-code-editor";
import {highlight, languages} from "prismjs";
import 'prismjs/themes/prism-funky.css';

import 'prismjs/components/prism-markdown';
import {useRouter} from "next/navigation";

export default function MdDocumentForm() {
    const [path, setPath] = useState('');
    const [Title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isWiki, setisWiki] = useState(false);
    const [content, setContent] = useState('');

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Data to be sent in the POST request
        const data = {
            path: path,
            content: content,
            title: Title,
            imageUrl: imageUrl,
            wiki: isWiki,
        } as MD;


        // Replace 'YOUR_POST_ENDPOINT' with the actual endpoint to which you want to send the POST request
        fetch(`${config.apiUri}/api/v2/markdown/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(result => {
                // Handle the response from the server here if needed
                router.push("/admin/markdown")
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <section className={s.FormWrapper}>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <label htmlFor="path">Path: </label>
                        <input
                            type="text"
                            id="path"
                            value={path}
                            onChange={(e) => setPath(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="title">Title: </label>
                        <input
                            type="text"
                            id="title"
                            value={Title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="image">ImageUrl: </label>
                        <input
                            type="text"
                            id="image"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </div>
                    <div>
                    <label htmlFor="iswiki"> is Wiki page?? </label>
                        <input
                            type="checkbox"
                            id="iswiki"
                            checked={isWiki}
                            onChange={(e) => setisWiki(e.target.checked)}
                        />
                    </div>
                </div>
                <div className={s.workArea}>
                    <div className={s.EditorWrapper}>
                        <Editor
                            value={content}
                            onValueChange={code => setContent(code)}
                            highlight={code => highlight(code, languages.md, 'md')}
                            padding={10}
                            className={s.previev}
                        />
                    </div>
                    <div className={s.EditorWrapper}>
                        <MDRenderer mdContent={content}/>
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </section>
    );
}