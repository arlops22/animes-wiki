export interface IAnime {
    id: number;
    name: string;
    author: string | null;
    summary: string | null;
    thumbnail: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface IAnimePayload {
    name: string;
    author?: string | null;
    summary?: string | null;
    thumbnail?: string;
}

export interface IAnimeFilter {
    name?: string;
    page?: number;
    pageSize?: number;
}

export interface IAnimeList {
    animes: IAnime[];
    count: number;
    page: number;
    totalPages: number;
}

export interface IAnimesRepository {
    create(payload: IAnimePayload): Promise<IAnime>;
    findAll(filter: IAnimeFilter): Promise<IAnimeList>;
    findById(id: number): Promise<IAnime | null>;
    update(id: number, payload: IAnimePayload): Promise<IAnime>;
    delete(id: number): Promise<IAnime>;
}
