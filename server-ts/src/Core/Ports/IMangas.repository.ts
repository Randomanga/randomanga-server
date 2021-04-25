import { IMangaModel } from 'Data/Models/Manga.model';
import { IUserModel } from './../../Data/Models/User.model';

export interface IMangaRepository {
  findOneManga(id: number): Promise<IMangaModel | null>;
  findRelated(id: number | string): Promise<IMangaModel[]>;
  likeManga(id: number, userID: IUserModel['_id']): Promise<void>;
  dislikeManga(id: number, userID: IUserModel['_id']): Promise<void>;
  getLikeStatus(
    id: number | string,
    userID: IUserModel['_id']
  ): Promise<boolean>;
  getDaily(
    user?: any
  ): Promise<IMangaModel & { likes_count: number; liked: boolean }>;
}