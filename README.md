

# My News Aggregator API

### Description:

This News Aggregator API implement some useful design patterns that helps to increase maintainability by reducing the coupled, whitch provides a good code structure. Therefore we start to talk about design patterns.


## Patterns that NestJS use
* **Singleton:**  is used by NestJS making every of its components a singleton across the module. Even modules are *singletons* by default, with the purpose that you can share the same instance of any provider between multiple modules effortlessly, so you don't need to create a new instance in runtime every time another component need a particular service.

* **Dependency Injection:** Nestjs provides it out of the box, in order to enables you to replace *dependencies* without changing the class that uses them. So this might reduce the risk that you have to change a class just because one of its *dependencies* changed. To get this approach Nest delegate instantiation of dependencies to a IoC container, everytime you create a new component (provider) on your aplication, you make a registration process associating the token **nameService** with the class **nameService**. So when the Nest IoC container instantiates a Class (Let's call it **Component A**), it first looks for any dependencies. When it finds the dependency, it performs a lookup on the dependency token, which returns its respective class (let's call it **Component B**). Then Nest will then either create an instance of **Component B**, cache it, and return it, or if one is already cached, return the existing instance of **Component B**.

* **Decorator:** The pattern is used heavily in the framework in order to attach new features and behaviors to already defined classes and methods. NestJS implement decorators using generics  `createParamDecorator<T>((data, ctx) => ...)`. That means you can explicitly enforce type safety, the expression returns a function and can take a target, name and property descriptor as arguments.

* **Strategy:** NestJS has a library 'Passport' easily to integrate with, it works using the Strategy design pattern, separeting all its different implementation on strategies, so you can isolate the implementation details of an algorithm from the code that uses it.

* **Repository:** Typeorm is database integration library that fits perfectly in NestJS, supports the *repository design pattern*, so each entity has its own repository. In simple words it deals with creating a set of data access services encapsulating CRUD operations. The implemented repositories are available out-of-the-box and can be obtained from the database connection.

## Possible design patterns for My News Aggregator API

### Creationals 
* Based on the features of our API, we can reduce the coupling of creating objects in ourReadItLaterService by applying the **Factory method**, Even we are working with simple data structure for Articles and Recommendations, they might easy increment and modify their estructure, and turn complex to hande the changes.
 
* But for the moment the main problem that can be foreseen is the creation of the queryParameters' url for each News API.
With that in mind, we observe that for the three News API, we are having 3 different formats of queryParams spected but all of then are builded using almost the same number of steps. Creational design pattern **Builder** looks like a posible solution that match with our problem.

* **Abstract Factory** is not considered because we don't have related families of classes.

### Behaviorals
* We have commond services that handle request and responses for News APIs, we can easy get tempted with the idea of ​​apply **Strategy** pattern in order to set every varian of our services as an *Strategy*, but if we go deep in our code, We can check that all our Services have commond functions to carry out the work. Soon or later we could get into the needs of add a new News Aggregator. Applying **Templete method** Pattern we could easy provide a structure and the needs steps that the new News Service will follow!

## Design Antipattern
Is the application of a solution that instead of meeting a solution, it creates a problems. Is important to have knowledge about antipatterns because as far as we know them, we can easily identify them, even remove them from our programs before they reach the production environment.

There are three classifications of anti patterns:
* **Software Development AntiPatterns**, which are based on the dramatically task of refactoring the initial software structure and designs planed in order to skip wrong considerations made on early software life cycle. efactoring approaches. This development antipatterns use various formal and informal refactoring approaches.
> The structure changes because programmers learn constraints and approaches that alter the context of the coded solutions.

* **Software Architecture AntiPatterns**, remarks the importance of software architecture as essential therefore its required a whole view point of the system, so its antipatterns involves the common problems and mistakes in the creation, implementation, and management of architecture.

* **Project Management AntiPatterns**, it focuses on effective communication and interpersonal relationships among those involved in development, under the guidance of those responsible for improving the team work environment. Provides a guide to common bad experiences that allow you to improve your decision making.

## Dependency injection in Typescript

First of all a dependency is **component B** *(can be a class, a function, an interface, a method or even a field)*, that serve as a resource needed for **component A** to work. For this examples we are going to use '*InversifyJS*'
 that provide us a IoC container for TypeScript. 


The idea with dependency injection is that the **component A** should not have the responsibility to create its dependencies. Therefore **component A** is not allowed to use `new` in order to instantiate a **component B** object. 

Dependency injection suggest that dependencies should be passed already initialized over to the constructor. 
*Example: Initials is dependent of Charmander class*
```javascript
class Initials implements {
    private _fireInitial: Charmander;

    public constructor(charmander : Charmander) {
        this._fireInitial = charmander;
    }
```

To reach this approach we use a Dependency Injection container better know as IoC container, is a framework for implementing automatic dependency injection.  
This IoC container provibe an interface to retrieve  an instance of each component with all its dependecies meet.

>**InversifyJS Doc:** The classes are implementations of the interfaces that we just declared. All the classes must be annotated with the  `@injectable`  decorator.

*Example:*
```javascript
export interface Pokemon {
    quickAttack(): string;
    chargedAttack(): string;
}

@injectable()
class Charmander implements Pokemon {
    private quick_attack : 
    private charged_attack : 
    
    public constructor( 
	    default : { 
		    quick_attack: Scratch , 
			charged_attack: Ember 
		 }) 
	{
	    this.quick_attack = default.quick_attack;
        this.charged_attack = default.charged_attack;
    }
    public quickAttack() { return this.quick_attack.attack(); }
    public chargedAttack() { return this.charged_attack.attack(); }
}
```

InversifyJS need to use the type as identifiers at runtime. We use symbols as identifiers but you can also use classes and or string literals.
*Example:*
```javascript
const TYPES = {
    Pokemon: Symbol.for("Pokemon"),
};
export { TYPES };
```

Everytime you create a new component on your aplication, you register it in the container, that way the IoC container knows exactly how each componen is initialize. 

*Example:*
```javascript
const myContainer = new Container();
myContainer.bind<Pokemon>(TYPES.Pokemon).to(Charmander);
export { myContainer };
```

Finally we can resolve dependencies using our IoC Container.
```javascript
import { myContainer, TYPES, Pokemon } "./example";

const charmander = myContainer.get<Pokemon>(TYPES.Pokemon);

```


## Patterns used

**Template Method:** is used in order to solving a **GOD Class antipattern**, allowing to separate services by the News Aggregator APIs to request and defines a common number of steps to accomplish to carry out the work.
*Abstract class with common steps:*
```javascript
export  abstract  class  AbstractClass {
	public  async  templateMethod(params: ParamsNewsDto): Promise<NewsDto[]> {
		const  queryParams = this.createRequest(params);
		const  apiResponse = await  this.consume(queryParams);
		const  articles = this.parseNews(apiResponse);
		return  articles;
	}

	protected  abstract  createRequest(params : ParamsNewsDto): string;
	protected  abstract  async  consume(queryParams : string): Promise<AxiosResponse>;
	protected  abstract  parseNews(apiResponse: AxiosResponse): NewsDto[];
}
```

Each service implement **createRequest**, **consume** and **parseNews** methods, and a **clientCode** function is created to decouple the *template method* of the Client

*clientCode function:*
```javascript
export  const  clientCode = async (abstractClass: AbstractClass,params: ParamsNewsDto): Promise<NewsDto[]> => {
	return  await  abstractClass.templateMethod(params);
}
```

*example of a call in the controller:*
```javascript
export  class  NewsController {
	constructor( private  readonly  guardianService: GuardianService,) {}
	
	@UseGuards(JwtAuthGuard)
	@Get()
	async  getNews(@Query() query: ParamsNewsDto) {
		let  result: NewsDto[] = await  clientCode(this.guardianService,query);
		return  result;
	}
}
```

**Builder:**
*Previous code:*
```javascript
createRequest(params: ParamsNewsDto) {
	let  url = '';
	url += params.hasOwnProperty('q') ? 'q=' + params.q : '';
	if (params.hasOwnProperty('oncontent')) {...}
	if (params.hasOwnProperty('onsection')) {...}
	if (params.hasOwnProperty('fromdate')) {...}
	if (params.hasOwnProperty('todate')) {...}
}
```
* In the previous code we can see that the creation of the queryParameters' url for each News API requires laborious step-by-step construction. For every news service, the request creation is builded using almost the same number of steps. **Builder Pattern** match with our intent of create different representations of our Request using the same construction code, at the same maintainable increases, so we can easely made changes on a *concrete builder* or in the construction steps.


## Removed Antipattens

* **GOD Class:** A first it seem one service could be enough for handle request on two News Aggregator APIs, then when you have to add a new News Aggregator API thinks comes pretty difficult and also if you want to change something for your previous services the panorama gets dark! So, separeting every services by their respectives functions for a single News API clarify any maintenance attempt.

* **Spaghetti Code:** In order to add new features like adding articles or submitting recommendations, the two previous modules looked very messy and even if create one service for those features could be the easiest ways, the final decition was refactor the project structure taking the useful parts of code and separate it all in fourt modules by their own bussines logic every one of then.



# API description

## Modules

**News Module :** 
- Handle searches on NewsAPI, The Guardian and The New York Times' APIs.

**Auth Module :** 
- Handle login authentication and the authorization using JWT token for every endpoint of the API.

**Users Module :** 
- Handle the creation of an user account.

**ReadItLate Module:** 

- Handle saving and getting users' articles.
- Allows recommend article to another user, also users get the recommendations received.

### Sources:

-  [The Guardian API](https://open-platform.theguardian.com/)

-  [The New York Times API](https://developer.nytimes.com/)

-  [News API](https://newsapi.org/)

### Requirements:

| | VERSION |
|----------------|---------------|
|Node| ^12.16.3 |
|Typescript | ^3.7.4 |
|Nestjs | ^7.0.0 |
|@nestjs/config| ^0.5.0|
|psql (PostgreSQL)| ^9.4.4|

## Creating the database
Run the DBscript.sql file will create **"newsdb"**

```
\i DBscript.sql
```

>*important: an Admin user will be created! test login with it!*
>```
> {
>   "email": "admin@admin.com",
>   "password": "admin"
> }
>```

## Endpoints description

| **Endpoint** | **Description** |**AuthKey**| 
|--|--|--|
| POST `/users` | Create user account | No required |
| GET `/users` | Get all users registered | No required |
| POST `/login` | Authenticate user and retrieve an auth  key | No required |
| GET `/news` | Search news on NewsAPI, The Guardian and The New York Times' APIs. | Required |
| POST `/articles` | Save and article in the user account | Required |
|GET `/articles`| Retrieve the articles of the user |Required|
|POST `/recommendations`| Send a recommendation to another user |Required|
|GET `/recommendations`| Get the recommendations received|Required|

>Try to login using admin account created by default in the DBscript! 
>
>![check postman's tests!](https://i.ibb.co/Jn3zRTz/loginpostman.png)


## Postman tests' documentation

**You can check endpoints' tests here:**

-  [My news Aggregator tests on Postman](https://documenter.getpostman.com/view/11476851/SzzgAzEB?version=latest)

## How to query news

### Endpoints URL:

```
http://localhost:3000/news
```

### Query parameters:

| PARAMETER | DESCRIPTION | EXAMPLE |
|----------------|---------------|-----------|
| api | Define the api in which you want to search for news or if you want to search using all. *options:*  `nyt`  `tg`  `news`  `all`| `api=nyt` |
| q | Request content containing this free text. Supports AND, OR and NOT operators.| `q=pizza` |
| oncontent | This query will look for matches in the body of the articles | `content=pineapple` |
| onsecton | Return only content in the sections | `onsecton=food` |
| fromdate | Return only content published on or after that date | `fromdate=2020-05-18` |
| todate | Return only content published on or before that date | `todate=2020-06-12` |
| onpage | Return only the result set from a particular page, must be a number | `onpage=1` |

**Examples :**

```
http://localhost:3000/news?api=nyt&q=pizza&oncontent=pineapple&onsection=food&fromdate=2020-05-18&todate=2020-06-12
```
Search only on The Guardians source
```
http://localhost:3000/news?q=music&api=tg
```
