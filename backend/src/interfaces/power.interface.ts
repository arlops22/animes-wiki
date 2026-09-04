export interface IPower {
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    animeId: number;
}

export type IPowerPayload = Omit<IPower, 'id' | 'createdAt' | 'updatedAt'>;

export interface IPowersRepository {
    create(payload: IPowerPayload): Promise<IPower>;
    findAll(animeId: number): Promise<Omit<IPower, 'animeId'>[]>;
    findByIds(ids: number[]): Promise<IPower[]>;
    update(id: number, payload: IPowerPayload): Promise<IPower>;
    delete(id: number): Promise<IPower>;
}
