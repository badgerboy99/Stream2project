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

// thanks to Matt Rudge for this function
//     makes SVGs responsive
var windowWidth = ($(window).width());

window.onresize = function() {
	if (windowWidth !== ($(window).width())) {
    	location.reload();
    }
}

var regionChartWidth = $("#chart-bar").width();
// var dateChartHeight = dateChartWidth / 2;





    var ndx = crossfilter(AdoptdataProjects);

    //---dimensions -------------------------------------------

    var areaDim = ndx.dimension(function(d) {
        return d.area;
    });
    var regionDim = ndx.dimension(function(d) {
        return d.region;
    });
    var barRegionDim = ndx.dimension(function(d) {
        return d.region;
    });
    var yearDim = ndx.dimension(function(d) {
        return d.year;
    });

    var numberDim = ndx.dimension(function(d) {
        return d.number;
    });

    var all = ndx.groupAll();



    //---groups  -------------------------------------------

    var nbyArea = areaDim.group().reduceSum(dc.pluck("number"));
    var areaOnly = areaDim.group()
    var nbyRegion = regionDim.group().reduceSum(dc.pluck("number"));
    var barnbyRegion = barRegionDim.group().reduceSum(dc.pluck("number"));
    //var nbyYear = yearDim.group();
    var nbyNumber = numberDim.group().reduceSum(dc.pluck("number"));
    var nbyYear = yearDim.group().reduceSum(dc.pluck("number"));


    //---menu-select filters  -------------------------------------------

    // let NorthEast = regionDim.filter(region => region === "North East")
    // console.log(NorthEast);
    //
    // let NorthWest = regionDim.filter(region => region === "North West")
    // console.log(NorthWest);

    //---linking to the DOM  -------------------------------------------

    var selectField = dc.selectMenu('.menu-select');
    var areaSelectField = dc.selectMenu('.area-select');
    var barchart = dc.barChart("#chart-bar");
    var rowchart2 = dc.rowChart("#chart-row2");
    var totalAdoptionsND = dc.numberDisplay("#total-adoptions-nd");
    var totalAdoptions = ndx.groupAll().reduceSum(function(d){
        return d["number"];
    })


    //---graphs  -------------------------------------------
    var regions = ["North East", "North West", "Yorkshire and The Humber", "East Midlands", "West Midlands", "East of England", "Inner London", "Outer London", "South East", "South West"]; //with help from robin z

    barchart
        .width((regionChartWidth))
        .height(300)
        .ordinalColors(["#2599BF"])
        .margins({top: 10, right: 50, bottom: 55, left: 60})
        .brushOn(false)
        .dimension(barRegionDim)
        .group(barnbyRegion)
        .x(d3.scale.ordinal().domain(regions))
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        // .xAxisLabel("Region")
        .yAxisLabel("Number of adopted children")
        ;
        // shortens x axis labels
        barchart.xAxis().tickFormat(function (d) {

            if (d == "Yorkshire and The Humber") {
                d = "Yorks/Humber"
                return d
                }

                else if (d == "East Midlands") {
                    d = "E. Midlands"
                    return d
                }

                else if (d == "West Midlands") {
                    d = "W. Midlands"
                    return d
                }

                else if (d == "East of England") {
                    d = "E. England"
                    return d
                }

                else if (d == "Inner London") {
                    d = "Inner Lon."
                    return d
                }

                else if (d == "Outer London") {
                    d = "Outer Lon."
                    return d
                }

                else {return d
            };

        });


    rowchart2
        .ordinalColors(["#2599BF"])
        .width(regionChartWidth)
        .height(200)
        .dimension(yearDim)
        .group(nbyYear)
        .elasticX(true)
        .renderTitle(true)
        .xAxis().ticks(6)
        ;


    totalAdoptionsND
        .valueAccessor(function (d) { return d })   // yearDim.group().reduceSum(function(d) {return d.number;});
        .group(totalAdoptions)
        .formatNumber(d3.format(","))
        ;


    selectField
        .dimension(regionDim)
        .group(nbyRegion)
        .title(function(d) {
            return d.key;
        })
        ;

    areaSelectField
        .dimension(areaDim)
        .group(areaOnly)
        .title(function(d) {
            return d.key;
        })
        ;


dc.renderAll();
}   // end makeGraphs func


 /*
    SHORT SAMPLE FROM ADOPTDATA
    area	    region	    year	number
    Darlington	North East	2013	210
    Darlington	North East	2014	190
    Darlington	North East	2015	200
    Darlington	North East	2016	205
    Darlington	North East	2017	220
    Durham  	North East	2013	630
    Durham  	North East	2014	605
    Durham  	North East	2015	615
    Durham  	North East	2016	675
    Durham  	North East	2017	815
    Gateshead	North East	2013	390
    Gateshead	North East	2014	355
    Gateshead	North East	2015	335
    Gateshead	North East	2016	345
    Gateshead	North East	2017	380
    ** there are many other regions in England in the data (NW, Midlands, SE, SW etc)
     */