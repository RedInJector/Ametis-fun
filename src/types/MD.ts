export interface MD{
    id: number;
    path: string;
    content?: string;
    title: string;
    renderedContent?: string;
    imageUrl?: string;
    orderPosition?: string;
    groupName?: string;
    wiki: boolean;
    tags: MDType;
}

export interface MDType {
    id: number;
    tag: string
}


export interface groupMD {
    id: number;
    path: string;
    title: string;
    imageUrl: string;
    orderPosition: number;
    groupName: string;
    wiki: boolean;
}