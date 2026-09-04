import { IPower } from './power.interface.js';

export interface ICharacterPower {
    level: number;
    power: Partial<IPower>;
}

export interface ICharacter {
    id: number;
    name: string;
    description: string | null;
    lifeStory: string | null;
    photo: string | null;
    animeId: number;
    createdAt: Date;
    updatedAt: Date;
    powers?: ICharacterPower[];
}

export type ICharacterPayload = Omit<ICharacter, 'id' | 'createdAt' | 'updatedAt' | 'powers'> & {
    powers: {
        level: number;
        powerId: number;
    }[];
};

export interface ICharactersRepository {
    create(payload: ICharacterPayload): Promise<Partial<ICharacter> | null>;
    findAll(animeId: number): Promise<ICharacter[]>;
    findById(id: number): Promise<Partial<ICharacter> | null>;
    update(id: number, payload: ICharacterPayload): Promise<Partial<ICharacter> | null>;
    delete(id: number): Promise<ICharacter>;
}
