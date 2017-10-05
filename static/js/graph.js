queue()
    .defer(d3.json, "/LACdata/projects")
    .await(makeGraphs);

function makeGraphs(error, LACdataProjects) {
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    //Clean donorsUSProjects data
//    donorsUSProjects.forEach(function (d) {
  //      d["date_posted"] = dateFormat.parse(d["date_posted"]);
   //     d["date_posted"].setDate(1);
   //     d["total_donations"] = +d["total_donations"];
   // }


    //Create a Crossfilter instance
    var ndx = crossfilter(LACdataProjects);

    //Define Dimensions
    var cDim = ndx.dimension(function (d) {
        return d["c"];
    });



    //Calculate metrics
    var numProjectsByDate = dateDim.group();
    var numProjectsByResourceType = resourceTypeDim.group();
    var numProjectsByPovertyLevel = povertyLevelDim.group();
    var numProjectsByFundingStatus = fundingStatus.group();
    var totalDonationsByState = stateDim.group().reduceSum(function (d) {
        return d["total_donations"];
    });
    var stateGroup = stateDim.group();


 //   var all = ndx.groupAll();
 //   var totalDonations = ndx.groupAll().reduceSum(function (d) {
 //       return d["total_donations"];
 //   });

    //Define values (to be used in charts)
//    var minDate = dateDim.bottom(1)[0]["date_posted"];
 //   var maxDate = dateDim.top(1)[0]["date_posted"];

    //Charts
    var firstChart = dc.lineChart("#first-chart");
//    var resourceTypeChart = dc.rowChart("#resource-type-row-chart");
 //   var povertyLevelChart = dc.rowChart("#poverty-level-row-chart");
 //   var numberProjectsND = dc.numberDisplay("#number-projects-nd");
 //   var totalDonationsND = dc.numberDisplay("#total-donations-nd");
 //   var fundingStatusChart = dc.pieChart("#funding-chart");
 //   var selectField = dc.selectMenu('#menu-select');


    selectField
        .dimension(stateDim)
        .group(stateGroup);

    numberProjectsND
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(all);

    totalDonationsND
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(totalDonations)
        .formatNumber(d3.format(".3s"));

  //  -------------------------------------------------------------------

    firstChart
        .ordinalColors(["#C96A23"])
        .width(1200)
        .height(300)
        .margins({top: 30, right: 50, bottom: 30, left: 50})
        .dimension(dateDim)
        .group(numProjectsByDate)
        .renderArea(true)
        .transitionDuration(500)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .elasticY(true)
        .xAxisLabel("Year")
        .yAxis().ticks(6);




    dc.renderAll();
}