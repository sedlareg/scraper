import {doScrape} from "../utils/scraper";

const url = 'https://www.eramon.de/en/';
const frame = {
    companies: {
        _s: "#navbar-collapse-1 li",
        _d: [{
            name: "a",
            link: "a @ href",
        }]
    }
};
const pathToJsonFile = 'output/example.json';
const pathToCsvFile = 'output/example.csv';
const csvParams = {
    path: pathToCsvFile,
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
        csvParams: csvParams
    }
)
    .then(console.log('Finished'))
    .catch(console.error);