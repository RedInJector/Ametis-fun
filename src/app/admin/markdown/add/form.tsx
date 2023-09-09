'use client'
import * as config from "@/config/config";
import s from './page.module.css'
import {MD, MDTag} from "@/types/MD";

import React, {useState} from "react";
import MDRenderer from "components/MDRenderer/MDRenderer";
import Editor from "react-simple-code-editor";
import {highlight, languages} from "prismjs";
import 'prismjs/themes/prism-funky.css';

import 'prismjs/components/prism-markdown';
import {useRouter} from "next/navigation";

interface Tag {
    id: number;
    text: string;
}

export default function MdDocumentForm() {
    const [path, setPath] = useState('');
    const [Title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isWiki, setisWiki] = useState(false);
    const [content, setContent] = useState('');

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const convertTagsToMDTags = (tags: Tag[]): MDTag[] => {
            return tags.map(tag => ({
                tag: tag.text
            }));
        };
        const mdTags: MDTag[] = convertTagsToMDTags(tags);

        // Data to be sent in the POST request
        const data = {
            path: path,
            content: content,
            title: Title,
            imageUrl: imageUrl,
            tags: mdTags,
        } as MD;


        // Replace 'YOUR_POST_ENDPOINT' with the actual endpoint to which you want to send the POST request
        fetch(`${config.apiUri}/api/v2/markdown/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
            .then(result => {
                // Handle the response from the server here if needed
                if(result.ok)
                    router.push(`/admin/markdown/edit/${path}`)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };


    const [tags, setTags] = useState<Tag[]>([]);
    const [newTag, setNewTag] = useState<string>('');

    const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTag(event.target.value);
    };

    const handleTagAdd = () => {
        if (newTag.trim() !== '') {
            const tag: Tag = {
                id: Date.now(),
                text: newTag.trim(),
            };

            setTags([...tags, tag]);
            setNewTag('');
        }
    };

    const handleTagEdit = (tagId: number, newText: string) => {
        const updatedTags = tags.map(tag =>
            tag.id === tagId ? {...tag, text: newText} : tag
        );
        setTags(updatedTags);
    };

    const handleTagDelete = (tagId: number) => {
        const updatedTags = tags.filter(tag => tag.id !== tagId);
        setTags(updatedTags);
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
                        <label htmlFor="tags">Tags: </label>
                        <div id="tags">
                            <input
                                type="text"
                                value={newTag}
                                onChange={handleTagChange}
                                placeholder="Enter a new tag"
                            />
                            <button type="button" onClick={handleTagAdd}>Add Tag</button>
                        </div>
                        <div className={s.tagInputwrapper}>
                            {tags.map(tag => (
                                <div key={tag.id}>
                                    <input
                                        type="text"
                                        value={tag.text}
                                        onChange={event => handleTagEdit(tag.id, event.target.value)}
                                    />
                                    <button type="button" onClick={() => handleTagDelete(tag.id)}>Delete</button>
                                </div>
                            ))}
                        </div>
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
