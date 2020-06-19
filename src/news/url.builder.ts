import { ParamsNewsDto} from './dto/news.dto';

export interface Builder {
    setQ(subquery: string): void;
    setOnContent(subquery: string): void;
    setOnSection(subquery: string): void;
    setOnPage(subquery: string):void;
    setKey(subquery: string, key: string | undefined):void;
}

export class TGQueryBuilder implements Builder {
    private params: ParamsNewsDto;
    private query: string = ''
    constructor(params: ParamsNewsDto) {
        this.params = params;
        this.query+='';
    }


    public setQ(subquery: string): void {
        this.query += this.params.hasOwnProperty('q') ? subquery + this.params.q : '';
    }

    public setOnContent(subquery: string): void {
        if (this.params.hasOwnProperty('oncontent')) {
            this.query +=
                this.query.length > 3
                    ? ' AND ' + this.params.oncontent + subquery
                    : 'q=' + this.params.oncontent + subquery;
          }
    }

    public setOnSection(subquery: string): void {
        if (this.params.hasOwnProperty('onsection')) {
            this.query +=
              this.query.length > 3
                ? '&'+subquery + this.params.onsection
                : subquery + this.params.onsection;
          }
    }

    public setOnPage(subquery: string): void {
        if (this.params.hasOwnProperty('onpage'))
            this.query +=
                this.query.length > 3 ? '&'+ subquery + this.params.onpage : subquery + this.params.onpage;

    }

    public setKey(subquery: string, key : string | undefined ): void {
            this.query += subquery + key;

    }

    public getQueryParams(): string {
        return this.query;
    }
    
}

export class BuilderDirector {
    private builder: Builder;

    public setBuilder(builder: Builder): void {
        this.builder = builder;
    }

    public buildTGQuery(): void {
        this.builder.setQ('q=');
        this.builder.setOnContent('&query-fields=body');
        this.builder.setOnSection('section=');
        this.builder.setOnPage('page=');
        this.builder.setKey('&api-key=',process.env.TG_KEY);
    }
}

export const clientCodeTG = (director: BuilderDirector, params : ParamsNewsDto):string => {
    const builder = new TGQueryBuilder(params);
    director.setBuilder(builder);
    director.buildTGQuery()
    return builder.getQueryParams();
}