import { ParamsNewsDto, NewsDto } from "./dto/news.dto";
import {AxiosResponse} from 'Axios';

export abstract class AbstractClass {

    public async templateMethod(params: ParamsNewsDto): Promise<NewsDto[]> {
      const queryParams = this.createRequest(params);
      const apiResponse = await this.consume(queryParams);
      const articles = this.parseNews(apiResponse);
      return articles;
  }

    protected abstract createRequest(params : ParamsNewsDto): string;
    protected abstract async consume(queryParams : string): Promise<AxiosResponse>;
    protected abstract parseNews(apiResponse: AxiosResponse): NewsDto[];
}

