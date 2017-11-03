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



var ndx = crossfilter(AdoptdataProjects);
console.log(ndx.size());

var regionDim = ndx.dimension(function(d) {
    return d.region;
});

var SW_filter = regionDim.filter("South West");

//print_filter("SW_filter");

regionDim.filterAll(); //clears

//-------experiment 1 year dim-------------------------------------

var yearDim = ndx.dimension(function(d) {
    return d.year;
});



var nbyYear = yearDim.group().reduceSum(dc.pluck("number"));

var hope1 = dc.barChart("#chart-line");

var numberDim = ndx.dimension(function(d) {
    return d.number;
});

var nbyNumber = numberDim.group().reduceSum(dc.pluck("number"));

hope1
    .width(700).height(200)
    //.dimension(yearDim)
    //.group(nbyYear)
    .dimension(regionDim)
    .group(nbyYear)
    .x(d3.scale.linear().domain([0,5000]))
    .xAxis().ticks(10)
    ;

//-------experiment 2 area dim-------------------------------------

var areaDim = ndx.dimension(function(d) {
    return d.area;
});

var nbyArea = areaDim.group().reduceSum(dc.pluck("number"));


var hope2 = dc.rowChart("#chart-line2");

hope2
    .width(700)
    .height(2000)
    .dimension(areaDim)
    .group(nbyArea)
    .xAxis().ticks(10);


// -------- experiment 3 region dim-----------------------------------------


var nbyRegion = regionDim.group().reduceSum(dc.pluck("number"));



var hope3 = dc.rowChart("#chart-line3");

hope3
    .ordinalColors(["#77d741", "#36b237", "#FFAB38", "#58d3c4",
        "#D78778", "#9C84F5", "#F57DE8", "#545CF5", "#6DAED7", "#F55359" ])
    .width(700)
    .height(400)
    .dimension(SW_filter)
    .group(nbyRegion)
    .elasticX(true)
    .xAxis().ticks(20);

// -------- experiment 4  --- bar by year/region -----------------------------------------
/*
var hope4 = dc.barChart("#chart-bar");

hope4
    .ordinalColors(["#77d741", "#36b237", "#c98b40", "#58d3c4",
        "#D78778", "#9C84F5", "#F57DE8", "#545CF5", "#6DAED7", "#F55359" ])
    .width(800)
    .height(400)
    .dimension(yearDim)
    .brushOn(false)
    .group(nbyarea)
    .x(d3.scale.linear().domain([0,20000]));

*/


// -------- experiment 5 region dim PIE by year-----------------------------------------

var hope5 = dc.pieChart("#chart-pie");

hope5
    .ordinalColors(["#77d741", "#36b237", "#c98b40", "#58d3c4",
        "#D78778", "#9C84F5", "#F57DE8", "#545CF5", "#6DAED7", "#F55359" ])
    .width(400)
    .height(400)
    .innerRadius(80)
    .dimension(SW_filter)
    .group(nbyRegion);

dc.renderAll();
}

