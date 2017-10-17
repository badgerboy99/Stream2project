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
//Create a Crossfilter instance
    var ndx = crossfilter(AdoptdataProjects);

//Define Dimensions   one for each column header???
    var areaDim = ndx.dimension(function (d) {
        return d["area"];
    });
    var numberDim = ndx.dimension(function (d) {
        return d["number"];
    });
    var regionDim = ndx.dimension(function (d) {
        return d["region"];
    });
    var yearDim = ndx.dimension(function (d) {
        return d["year"];

//Calculate metrics
    var numbyarea = areaDim.group();
    var numberr = numberDim.group();

    var all = ndx.groupAll();

//Charts
    var firstChart = dc.lineChart("#firstchart");

    var selectField = dc.selectMenu('#menu-select');


        firstChart
        .ordinalColors(["#C96A23"])
        .width(1200)
        .height(300)
        .margins({top: 30, right: 50, bottom: 30, left: 50})
        .dimension(areaDim)
        .group(numberr)
        .renderArea(true)
        .transitionDuration(500)
        .elasticY(true)
        .xAxisLabel("Area")
        .yAxis().ticks(6);

        selectField
        .dimension(areaDim)
        .group(stateGroup);

dc.renderAll();
}
*/
var ndx = crossfilter(AdoptdataProjects);

//dimension instance
var totalDim = ndx.dimension(function(d) { return d.number; });
/*
var total_90 = totalDim.filter(90);

print_filter("total_90");
*/

var regionDim  = ndx.dimension(function(d) {return d.region;});

var region_filter = regionDim.filter("London");

print_filter("region_filter");

regionDim.filterAll() // clears filter??

var total = totalDim.group().reduceSum(function(d) {return d.number;});

print_filter("total");

}