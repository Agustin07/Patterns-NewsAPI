import { ParamsNewsDto, NewsDto } from './dto/news.dto';
import { AbstractClass } from './abstract.service';

export const clientCode = async (abstractClass: AbstractClass,params: ParamsNewsDto): Promise<NewsDto[]> => {
    return await abstractClass.templateMethod(params);
  }
  