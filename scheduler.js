const schedule = require('node-schedule');
const book = require('./book');

const mobility = '#item-8 > button';
const tuesdayBootCamp = '#item-10 > button';
const thursdayBootCamp = '#item-8 > button';

const tuesdayBootCampBooker = schedule.scheduleJob({hour: 21, minute: 1, second: 2, dayOfWeek: 5}, function(){
    book.bookTrainingClass(tuesdayBootCamp, "Bootcamp tirsdag");
});
const thursdayBootCampBooker = schedule.scheduleJob({hour: 21, minute: 1, second: 2, dayOfWeek: 5}, function(){
    book.bookTrainingClass(thursdayBootCamp, "Bootcamp torsdag");
});
const tuesdayMobilityBooker = schedule.scheduleJob({hour: 21, minute: 1, second: 2, dayOfWeek: 5}, function(){
    book.bookTrainingClass(mobility, "Mobilitet tirsdag");
});

