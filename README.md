# Simple Scraper

## Install NodeModules

**Dependencies**
```$bash
npm i
```

**Install babel-cli globally for babel-node**
```$xslt
npm i -g --save babel-cli
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