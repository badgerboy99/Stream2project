# Stream2project

## Overview

This site features an interactive dashboard enabling users to filter data by region, area and year. 

This project forms my 'Stream 2' back-end project on my Code Institute Full Stack Web Development course.

It is deployed on Heroku at (https://shrouded-savannah-58227.herokuapp.com/)

I chose to use data relating to adoptions in England as the topic is one that means a lot to me (as an adoptive father). I have also included a Twitter timeline from two of the UK's highest profile organisations that support adoption (Adoption UK and Coram), mainly to give the site some life beyond a fairly dry statistical analysis.


The data has been compiled manually from several databases published by [gov.co.uk](https://www.gov.uk/government/collections/statistics-looked-after-children) and converted to a CSV file. This was subsequently uploaded to MongoDB.


## Note
This project is designed to demonstrate my use of various technologies (see list below), and as such, I have not concentrated on the accuracy of the results returned from the data.
(The data comes from a reliable government source, but the totals generated do not represent the actual numbers of adopted children, as they are cumulative totals. To explain further, the total for all regions and years is 349,490 children, but  this sum does not show the difference or increase from one year to the next.) 
I may improve this aspect of my project at some point in the future.

## Features
A Twitter timeline widget


## Tech Used
- [Flask](http://flask.pocoo.org/)
	- I have used Flask as the framework for this project, written in Python. It retrieves the data from the database and returns it to the browser.
- [MongoDB](https://www.mongodb.com/)  
	- The project data is served by this document noSQL database system

The following libraries are utilised:
- [Bootstrap](http://getbootstrap.com/)
    - I have used Bootstrap to give this project a simple, responsive layout
- [D3.js](https://d3js.org/) 
	- A JavaScript based visualization engine, which will render interactive charts and graphs based on the data.
- DC.js
	- A charting library built on top of D3.js, which makes plotting the charts a lot easier.
- Crossfilter 
	- A JavaScript library for slicing and dicing row-based data – it allows the graphs to be interactive
- Queue.js
    - An asynchronous helper library for JavaScript.
- Keen.js