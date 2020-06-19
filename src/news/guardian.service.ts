import { Injectable, HttpException } from '@nestjs/common';
import { ParamsNewsDto, NewsDto } from './dto/news.dto';
import { HttpService } from '@nestjs/common';
import {AxiosResponse} from 'Axios';
import { AbstractClass } from './abstract.service';
import {BuilderDirector, clientCodeTG } from './url.builder';

@Injectable()
class GuardianService extends AbstractClass {
  constructor(private httpService: HttpService) {
    super()
  }

  async consume(query: string) {
    return await this.httpService
      .get('https://content.guardianapis.com/search?' + query)
      .toPromise().catch((e) => {
      throw new HttpException(
        {
          status: e.response.status,
          error: 'THE GUARDIAN API: ' + e.response.data.response.message,
        },
        e.response.status,
      );
    }).then((r)=>{return r});
  }

  parseNews(results: AxiosResponse) {
    const articles = results.data.response.results;
    const list = articles.map(( item:any ) => {
      const { webTitle, webUrl, webPublicationDate, sectionName } = item;
      return new NewsDto(
        webTitle,
        webUrl,
        webPublicationDate,
        sectionName,
        'The Guardian',
      );
    });
    return list;
  }

  createRequest(params: ParamsNewsDto) {
    const director = new BuilderDirector();
    const url2 = clientCodeTG(director,params);
    

    let url = '';
    url += params.hasOwnProperty('q') ? 'q=' + params.q : '';

    if (params.hasOwnProperty('oncontent')) {
      url +=
        url.length > 3
          ? ' AND ' + params.oncontent + '&query-fields=body'
          : 'q=' + params.oncontent + '&query-fields=body';
    }

    if (params.hasOwnProperty('onsection')) {
      url +=
        url.length > 3
          ? '&section=' + params.onsection
          : 'section=' + params.onsection;
    }

    if (params.hasOwnProperty('fromdate')) {
      url +=
        url.length > 3
          ? '&from-date=' + params.fromdate
          : 'from-date=' + params.fromdate;
    }

    if (params.hasOwnProperty('todate')) {
      url +=
        url.length > 3
          ? '&to-date=' + params.todate
          : 'to-date=' + params.todate;
    }

    if (params.hasOwnProperty('onpage'))
      url +=
        url.length > 3 ? '&page=' + params.onpage : 'page=' + params.onpage;

    url += '&api-key=' + process.env.TG_KEY;
    console.log(url);
    console.log(url2);
    return url
  }
}

export default GuardianService;
