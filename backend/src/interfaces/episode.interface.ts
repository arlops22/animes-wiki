export interface IEpisode {
    id: number;
    title: string;
    releaseDate: Date;
    synopsis: string;
    createdAt: Date;
    updatedAt: Date;
    seasonId: number;
}

export interface IEpisodePayload {
    title: string;
    releaseDate: Date;
    synopsis: string;
    seasonId: number;
}

export interface IEpisodesRepository {
    create(payload: IEpisodePayload): Promise<IEpisode>;
    update(id: number, payload: IEpisodePayload): Promise<IEpisode>;
    delete(id: number): Promise<IEpisode>;
}
