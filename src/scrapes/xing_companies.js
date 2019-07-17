import {doScrapeSequence, getEndTime} from "../utils/scraper";

const url = 'https://www.xing.com/companies/industries/90000-internet-und-informationstechnologie?page=';
const frame = {
    companies: {
        _s: ".company-item-content",
        _d: [{
            name: "a @ title",
            link: "a @ href",
        }]
    }
};
const pathToJsonFile = 'output/companies.json';
const jsonParams = {flag: 'a'};
const pathToCsvFile = 'output/companies.csv';
const csvParams = {
    path: pathToCsvFile,
    header: [
        {id: 'name', title: 'name'},
        {id: 'link', title: 'link'}
    ],
    fieldDelimiter: ';',
    append: true
};

let urls = [];
for (let i = 1; i < 100; i++) {
    urls.push(url + i);
}

doScrapeSequence(
    urls,
    frame,
    {
        jsonPath: pathToJsonFile,
        jsonParams: jsonParams,
        csvParams: csvParams
    }
);
