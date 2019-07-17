/*imports*/
const got = require('got');
const cheerio = require('cheerio');
const jsonFrame = require('jsonframe-cheerio');
const jsonFile = require('jsonfile');
const csvWriterCreator = require('csv-writer');
let end = 0;

export const doScrapeSequence = async(urls, frame, options) => {
    const start = setNewStartTime();
    console.log('--------------------------------------');
    console.log('STARTING SEQUENCE SCRAPE');
    for (const url of urls) {
        console.log(`\nCalling: ${url}`);
        await doScrape(url, frame, options);
        await setNewEndTime(Math.floor(Date.now() / 1000) - start);
    }

    outputEndTime();
    console.log('--------------------------------------');
};

export const doScrape = async(url, frame, options, outputTime = false) => {
    const start = outputTime ? setNewStartTime() : 0;

    if (outputTime) {
        console.log('--------------------------------------');
    }
    console.log('STARTING SINGLE SCRAPE');
    const result = await scrape(url, frame);
    await writeJsonFile(result.companies, options.jsonPath, options.jsonParams || {});
    await writeCsvFile(result.companies, options.csvParams);

    if (outputTime) {
        await setNewEndTime(Math.floor(Date.now() / 1000) - start);
        outputEndTime();
        console.log('--------------------------------------');
    }
};

export const getEndTime = () => end;

const setNewStartTime = () => Math.floor(Date.now() / 1000);
const setNewEndTime = (time) => end = time;
const outputEndTime = () => console.log(`\nFinished in: ${getEndTime()} seconds`);

const scrape = async(url, frame) => {
    const result = await got(url);
    const $ = cheerio.load(result.body);
    jsonFrame($); // initializes the plugin

    return await $('body').scrape(frame, {string: false});
};

const writeJsonFile = async(json, file, options = {}) => {
    await jsonFile.writeFile(file, json, options);

    return console.log('...Json-File complete')
};

const writeCsvFile = async(json, params) => {
    const csvWriter = csvWriterCreator.createObjectCsvWriter(params);
    await csvWriter.writeRecords(json);

    return console.log('...CSV-File complete');
};