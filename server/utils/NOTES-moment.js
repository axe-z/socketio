const moment = require('moment');
//nodemon server/utils/NOTES-moment.js
//SITE WEB
// https://momentjs.com

//JUSTE METTRE CA POUR LE FR !!
moment.locale('fr-ca');  //set la langue

let date = moment() //un instance

console.log(date.format('MMM-D-YYYY')) //août-29-2017
console.log(date.format('LLL'))   //29 août 2017 12:53
console.log(moment().calendar())  //Aujourd’hui à 12:54
console.log(date.format('H:mm a')) //11:59 pm
console.log(date.format('LLL a')) //29 août 2017 13:23 pm
// console.log(date.endOf('year').fromNow()) //dans 4 mois
//console.log(date.format('MMM-D-YYYY')) //ca funck les autre, lui d avant.

const timestampTest =  ;
console.log(timestampTest) //1504052359351

/*
shortcut :
moment.locale();         // fr-ca
moment().format('LT');   // 12:45
moment().format('LTS');  // 12:45:44
moment().format('L');    // 2017-08-29
moment().format('l');    // 2017-8-29
moment().format('LL');   // 29 août 2017
moment().format('ll');   // 29 août 2017
moment().format('LLL');  // 29 août 2017 12:45
moment().format('lll');  // 29 août 2017 12:45
moment().format('LLLL'); // mardi 29 août 2017 12:45
moment().format('llll');  // mar. 29 août 2017 12:46
*/

/*
precis:
moment().format('MMMM Do YYYY, h:mm:ss a'); // août 29e 2017, 12:56:05 pm
moment().format('dddd');                    // mardi
moment().format("MMM Do YY");               // août 29e 17
moment().format('YYYY [escaped] YYYY');     // 2017 escaped 2017
moment().format();
*/

/*
Temps relatifs:
moment("20111031", "YYYYMMDD").fromNow(); // il y a 6 ans
moment("20120620", "YYYYMMDD").fromNow(); // il y a 5 ans
moment().startOf('day').fromNow();        // il y a 13 heures
moment().endOf('day').fromNow();          // dans 11 heures
moment().startOf('hour').fromNow();      //ya une heure
*/

/*
calendar time :
moment().subtract(10, 'days').calendar(); // 2017-08-19
moment().subtract(6, 'days').calendar();  // mercredi dernier à 12:51
moment().subtract(3, 'days').calendar();  // samedi dernier à 12:51
moment().subtract(1, 'days').calendar();  // Hier à 12:51
moment().calendar();                      // Aujourd’hui à 12:51
moment().add(1, 'days').calendar();       // Demain à 12:51
moment().add(3, 'days').calendar();       // vendredi à 12:51
moment().add(10, 'days').calendar();
*/

/*
Different code de formatage :

Month
M	1 2 ... 11 12
Mo	   1st 2nd ... 11th 12th
MM	    01 02 ... 11 12
MMM   	Jan Feb ... Nov Dec
MMMM    	January February ... November December
Quarter
Q	1 2 3 4
Qo    	1st 2nd 3rd 4th
Day    of Month
D	      1 2 ... 30 31
Do    	1st 2nd ... 30th 31st
DD    	01 02 ... 30 31
Day    of Year
DDD	    1 2 ... 364 365
DDDo    	1st 2nd ... 364th 365th
DDDD    	001 002 ... 364 365
Day    of Week
d	      0 1 ... 5 6
do    	0th 1st ... 5th 6th
dd    	Su Mo ... Fr Sa
ddd   	Sun Mon ... Fri Sat
dddd    	Sunday Monday ... Friday Saturday
Day    of Week (Locale)	e	0 1 ... 5 6
Day    of Week (ISO)	E	1 2 ... 6 7
Week     of Year
w	    1 2 ... 52 53
wo    	1st 2nd ... 52nd 53rd
ww    	01 02 ... 52 53
Week     of Year (ISO)
W	      1 2 ... 52 53
Wo    	1st 2nd ... 52nd 53rd
WW    	01 02 ... 52 53
Year
YY	     70 71 ... 29 30
YYYY    	1970 1971 ... 2029 2030
Y   	   1970 1971 ... 9999 +10000 +10001
Note    : This complies with the ISO 8601 standard for dates past the year 9999
Week     Year	gg	70 71 ... 29 30
gggg    	1970 1971 ... 2029 2030
Week     Year (ISO)	GG	70 71 ... 29 30
GGGG    	1970 1971 ... 2029 2030
AM        /PM	A	AM PM
a       	am pm
//heures
H        		0 1 ... 22 23
HH        	00 01 ... 22 23
h       	1 2 ... 11 12
hh        	01 02 ... 11 12
k       	1 2 ... 23 24
kk        	01 02 ... 23 24
//minutes
m        		0 1 ... 58 59
mm        	00 01 ... 58 59
//secondes
s	        	0 1 ... 58 59
ss        	00 01 ... 58 59
Fractional
Second	S	0 1 ... 8 9
SS        	00 01 ... 98 99
SSS       	000 001 ... 998 999
SSSS         ... SSSSSSSSS	000[0..] 001[0..] ... 998[0..] 999[0..]
Time         Zone	z or zz	EST CST ... MST PST
Note        : as of 1.6.0, the z/zz format tokens have been deprecated from plain moment objects. Read more about       it here. However, they do work if you are using a specific time zone with the moment-timezone addon.
Z       	-07:00 -06:00 ... +06:00 +07:00
ZZ        	-0700 -0600 ... +0600 +0700
Unix         Timestamp	X	1360013296
Unix         Millisecond Timestamp	x	1360013296123
*/
