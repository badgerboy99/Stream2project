queue()
    .defer(d3.json, "/Adoptdata/projects")
    .await(makeGraphs);

function makeGraphs(error, AdoptdataProjects) {
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

function print_filter(filter){
	var f=eval(filter);
	if (typeof(f.length) != "undefined") {}else{}
	if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
	if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
	console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
}

/*
SHORT SAMPLE FROM ADOPTDATA
area	    region	    year	number
Darlington	North East	2013	210
Darlington	North East	2014	190
Darlington	North East	2015	200
Darlington	North East	2016	205
Darlington	North East	2017	220
Durham  	    North East	2013	630
Durham  	    North East	2014	605
Durham  	    North East	2015	615
Durham  	    North East	2016	675
Durham  	    North East	2017	815
Gateshead	North East	2013	390
Gateshead	North East	2014	355
Gateshead	North East	2015	335
Gateshead	North East	2016	345
Gateshead	North East	2017	380
** there are many other regions in England in the data (NW, Midlands, SE, SW etc
 */


var ndx = crossfilter(AdoptdataProjects);
//console.log(ndx.size());
//var all = ndx.groupAll();

//---dimensions -------------------------------------------

var areaDim = ndx.dimension(function(d) {
    return d.area;
});
var regionDim = ndx.dimension(function(d) {
    return d.region;
});
var yearDim = ndx.dimension(function(d) {
    return d.year;
});
var numberDim = ndx.dimension(function(d) {
    return d.number;
});

//---groups  -------------------------------------------

var nbyArea = areaDim.group();
var nbyRegion = regionDim.group();
var nbyYear = yearDim.group();
var nbyNumber = numberDim.group().reduceSum(dc.pluck("number"));
var nbyNumber2 = numberDim.group();

//---linking to the DOM  -------------------------------------------

var chart1 = dc.barChart("#chart-bar");
var chart2 = dc.rowChart("#chart-line2"); //change id name later
var chart3 = dc.pieChart("#chart-pie"); //change id name later


//---graphs  -------------------------------------------

chart1
    /*.width(700).height(100)
    .dimension(regionDim)
    .group(nbyNumber)
    .xAxis().ticks(10)
    ;*/
    .width(700).height(300)
    .dimension(regionDim)
    .group(nbyNumber)
    .x(d3.scale.linear()
    .domain([0, 2000]))
    ;
/*chart2
        .width(600)
        .height(300)
        .dimension(numberDim)
        .group(nbyYear)
        .x(d3.scale.linear().domain([0,2000]))
        ;

    /*.width(700).height(400)
    .dimension(yearDim)
    .group(nbyYear)
    .x(d3.scale.linear().domain([0,1400]))
    .xAxis().ticks(10)
    ;*/

/*
chart3
    .ordinalColors(["#77d741", "#36b237", "#c98b40", "#58d3c4",
        "#D78778", "#9C84F5", "#F57DE8", "#545CF5", "#6DAED7", "#F55359" ])
    .width(400)
    .height(400)
    .innerRadius(80)
    .dimension(numberDim)
    .group(nbyRegion);
*/
dc.renderAll();
}
