/*imports*/
const got = require('got');
const cheerio = require('cheerio');
const jsonFrame = require('jsonframe-cheerio');
const jsonFile = require('jsonfile');
const csvWriterCreator = require('csv-writer');

export const doScrapeSequence = async(urls, frame, options) => {
    for (const url of urls) {
        console.log(`Calling: ${url}`);
        await doScrape(url, frame, options);
    }
};

export const doScrape = async(url, frame, options) => {
    return await scrape(
        url,
        frame
    )
        .then(result => result.companies)
        .then(companies => {
            writeJsonFile(companies, options.jsonPath, options.jsonParams || {});
            writeCsvFile(companies, options.csvParams);
        })
        .catch(console.error);
};

const scrape = (url, frame) => {
    console.log(url);
    return got(url)
        .then(result => {
            const $ = cheerio.load(result.body);
            jsonFrame($); // initializes the plugin
            return $('body').scrape(frame, {string: false});
        })
        .catch(console.error);
};

export const writeJsonFile = (json, file, options = {}) => {
    jsonFile.writeFile(file, json, options)
        .then(res => {
            console.log('...Json-File complete')
        })
        .catch(error => console.error(error));
};

export const writeCsvFile = (json, params) => {
    const csvWriter = csvWriterCreator.createObjectCsvWriter(params);
    csvWriter.writeRecords(json)
        .then(() => {
            console.log('...CSV-File complete');
        });
};