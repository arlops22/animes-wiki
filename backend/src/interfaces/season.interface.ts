export interface ISeason {
    id: number;
    title: string;
    releaseDate: Date;
    createdAt: Date;
    updatedAt: Date;
    animeId: number;
}

export interface ISeasonPayload {
    title: string;
    releaseDate: Date;
    animeId: number;
}

export interface ISeasonsRepository {
    create(payload: ISeasonPayload): Promise<ISeason>;
    findAll(animeId: number): Promise<ISeason[]>;
    findById(id: number): Promise<ISeason | null>;
    update(id: number, payload: ISeasonPayload): Promise<ISeason>;
    delete(id: number): Promise<ISeason>;
}
