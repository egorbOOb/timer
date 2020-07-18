'use strict';


import 'nodelist-foreach-polyfill';
import "@babel/polyfill";
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'fetch-polyfill';
var Promise = require('es6-promise').Promise;



import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import doScroll from './modules/doScroll';
import tabs from './modules/tabs';
import addDotes from './modules/addDotes';
import slider from './modules/slider';
import switchPicture from './modules/switchPicture';
import validCalc from './modules/validCalc';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

//Timer V
countTimer('19 july 2020');

// Меню V
toggleMenu();

//popup V
togglePopUp();

// Scroll V
doScroll();

// Tabs V
tabs();

//addDotes V
addDotes();

// Slider V
slider();

//switchPicture V
switchPicture();

//doValid V
validCalc();

// Calc V
calc();

//send-form
sendForm();