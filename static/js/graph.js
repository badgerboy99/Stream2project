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

//dimension instances (x-axis)
var numberDim = ndx.dimension(function(d) {
    return d.number;
});

var regionDim  = ndx.dimension(function(d) {
    return d.region;
});

var areaDim  = ndx.dimension(function(d) {
    return d.area;
});

var yearDim = ndx.dimension(function(d) {
    return d.year;
});

//groups (y-axis)
var AbyNum = numberDim.group();

var AbyYear = yearDim.group();

var AbyArea = areaDim.group();

var AbyRegion = regionDim.group();


//charts
var pieChart = dc.pieChart('#pie-chart-one');

var rowChart = dc.rowChart('#row-chart-one');

var lineChart = dc.rowChart('#line-chart-one');

var selectField =   dc.selectMenu('#menu-select');
var selectField2 =  dc.selectMenu('#menu-select2');
var selectField3 =  dc.selectMenu('#menu-select3');
var selectField4 =  dc.selectMenu('#menu-select4');
var selectField5 =  dc.selectMenu('#menu-select5');
var selectField6 =  dc.selectMenu('#menu-select6');
var selectField7 =  dc.selectMenu('#menu-select7');
var selectField8 =  dc.selectMenu('#menu-select8');
var selectField9 =  dc.selectMenu('#menu-select9');
var selectField10 = dc.selectMenu('#menu-select10');

selectField
        .dimension(areaDim)
        .group(AbyArea);

selectField2
        .dimension(areaDim)
        .group(AbyArea);

selectField3
        .dimension(areaDim)
        .group(AbyArea);
selectField4
        .dimension(areaDim)
        .group(AbyArea);
selectField5
        .dimension(areaDim)
        .group(AbyArea);
selectField6
        .dimension(areaDim)
        .group(AbyArea);
selectField7
        .dimension(areaDim)
        .group(AbyArea);
selectField8
        .dimension(areaDim)
        .group(AbyArea);
selectField9
        .dimension(areaDim)
        .group(AbyArea);
selectField10
        .dimension(areaDim)
        .group(AbyArea);

lineChart
	.width(1000).height(800)
	.dimension(numberDim)
	.group(AbyNum)
	.x(d3.time.scale());

pieChart
   .width(290)
   .height(290)
   .innerRadius(60)
   .dimension(numberDim)
   .group(AbyYear);

rowChart
    .width(768)
    .height(480)
    .x(d3.scale.linear().domain)
    .elasticX(true)
    .dimension(yearDim)
    .group(AbyNum);

dc.renderAll();
}


/*var region_filter = regionDim.filter("London");

print_filter("region_filter");

regionDim.filterAll() // clears filter??

var total = totalDim.group().reduceSum(function(d) {return d.number;});

print_filter("total");
*/

