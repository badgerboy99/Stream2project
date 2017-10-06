function print_filter(filter){
	var f=eval(filter);
	if (typeof(f.length) != "undefined") {}else{}
	if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
	if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
	console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
}

queue()
    .defer(d3.json, "/LACdata/projects")
    .await(makeGraphs);

function makeGraphs(error, LACdataProjects) {
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }


    //Create a Crossfilter instance
    var ndx = crossfilter(LACdataProjects);

    //Define Dimensions
    var cDim = ndx.dimension(function (d) {
        return d["c"];
    });
    var e1Dim = ndx.dimension(function (d) {
        return d["e1"];
    });


    //set min and max ranges
    var minRange = e1Dim.bottom(1)[0]["e1"];
    var maxRange = e1Dim.top(1)[0]["e1"];

    //link chart to DOM element
    var ad2013lineChart = dc.lineChart("#adopted-2013");

    var selectField = dc.selectMenu('#menu-select');

    //Calculate metrics
    var numAdoptions2013 = cDim.group();


    //chart properties and values

    selectField
        .dimension(cDim)
      //  .group(??????)
    ;

    ad2013lineChart
        .ordinalColors(["#C96A23"])
        .width(1200)
        .height(300)
        .margins({top: 30, right: 50, bottom: 30, left: 50})
        .dimension(cDim)
        .group(numAdoptions2013)
        .renderArea(true)
        .transitionDuration(500)
        .x("e1Dim")([minRange, maxRange])
        .elasticY(true)
        .xAxisLabel("Region")
        .yAxis().ticks(6);

    dc.renderAll();
}