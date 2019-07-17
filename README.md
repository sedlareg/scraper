# Simple Scraper

## Dependencies
- @babel/cli [[homepage]][10] [[github]][11]
- @babel/core [[homepage]][10] [[github]][12]
- @babel/node [[homepage]][10] [[github]][13]
- @babel/preset-env [[homepage]][10] [[github]][14]

- cheerio [[homepage]][50] [[github]][51]
- csv-writer [[homepage]][60] [[github]][61]
- got [[homepage]][70] [[github]][71]
- jsonfile [[homepage]][80] [[github]][81]
- jsonframe-cheerio [[homepage]][90] [[github]][91]

- node [[homepage]][110]
- npm [[homepage]][120]

[10]: https://babeljs.io/
[11]: https://github.com/babel/babel/tree/master/packages/babel-cli
[12]: https://github.com/babel/babel/tree/master/packages/babel-core
[13]: https://github.com/babel/babel/tree/master/packages/babel-node
[14]: https://github.com/babel/babel/tree/master/packages/babel-preset-env
[50]: https://github.com/cheeriojs/cheerio#readme
[51]: https://github.com/cheeriojs/cheerio
[60]: https://github.com/ryu1kn/csv-writer#readme
[61]: https://github.com/ryu1kn/csv-writer
[70]: https://github.com/sindresorhus/got#readme
[71]: https://github.com/sindresorhus/got
[80]: https://github.com/jprichardson/node-jsonfile#readme
[81]: https://github.com/jprichardson/node-jsonfile
[90]: https://github.com/gahabeen/jsonframe-cheerio#readme
[91]: https://github.com/gahabeen/jsonframe-cheerio

[110]: https://nodejs.org/en/
[120]: https://www.npmjs.com/

## Install NodeModules

**Dependencies**
```$bash
npm i
```

**Install babel-cli globally for babel-node**
```$xslt
npm i -g --save @babel/cli
```

## Write Scraper-File
```$xslt
touch src/scrapes/<yourfile>.js
```

See [example file]('./src/scrapes/example.js')

#### Single Scrape
In this example we want to scrape content from a single page
```$xslt
//This are imports for scraper
import {doScrape} from "../utils/scraper";

// Define url you want to scrape
const url = 'https://www.eramon.de/en/';

// Define search filter
const frame = {
    companies: {
        _s: "#navbar-collapse-1 li",
        _d: [{
            name: "a",
            link: "a @ href",
        }]
    }
};

// Define outpath for json and csv
const pathToJsonFile = 'output/example.json';
const pathToCsvFile = 'output/example.csv';

// Define params for json
const jsonParams = {};

// Define params for csv
const csvParams = {
    path: pathToCsvFile,
    // csv header mapping
    header: [
        {id: 'name', title: 'name'},
        {id: 'link', title: 'link'}
    ],
    fieldDelimiter: ';'
};

doScrape(
    url,
    frame,
    {
        jsonPath: pathToJsonFile,
        jsonParams: jsonParams,
        csvParams: csvParams
    }
)
    .then(console.log('Finished'))
    .catch(console.error);
```

#### Sequential Scrape
In this example we want to scrape the information from multiple urls, e.g. paginated content.
The method 'doScrapeSequence' uses async, await to call each single page and append the result to the file
Notice that we use the appropriate settings to append the result to the file within a single url call.
```
import {doScrapeSequence} from "../utils/scraper";

const url = 'https://www.xing.com/companies/industries/90000-internet-und-informationstechnologie?page=';
const frame = {<your search definition here>};
...

// Here we create the urls
let urls = [];
for (let i = 1; i < 42; i++) {
    urls.push(url + i);
}

const pathToJsonFile = 'output/companies.json';
const jsonParams = {flag: 'a'};
const pathToCsvFile = 'output/companies.csv';
const csvParams = {
    path: pathToCsvFile,
    ...
    append: true
};

doScrapeSequence(
    urls,
    frame,
    {
        jsonPath: pathToJsonFile,
        jsonParams: jsonParams,
        csvParams: csvParams
    }
)
    .then(console.log('Finished'))
    .catch(console.error);
```