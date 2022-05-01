// Parse the date / time
let parseDate = d3.timeParse("%Y-%m-%d");
let size = 20

const drawGraphOne = () => {
  // set the dimensions and margins of the graph
  let margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 1260 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select("#graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //Read the data
  d3.csv("https://raw.githubusercontent.com/kxnxchukwu/DataVizwithD3js/main/Data/FAANG.csv", function (data) {
    // group the data: I want to draw one line per group
    var sumstat = d3
      .nest() // nest function allows to group the calculation per level of a factor
      .key(function (d) {
        return d.Name;
      })
      .entries(data);

    // Add X axis --> it is a date format
    var x = d3
      .scaleTime()
      .domain(
        d3.extent(data, function (d) {
          return parseDate(d.Date);
        })
      )
      .range([0, width - 25]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(15));

    // Add Y axis
    var y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          return +d.Open;
        }),
      ])
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Add the text label for the X axis
    svg
      .append("text")
      .attr(
        "transform",
        "translate(" + width / 2 + " ," + (height + margin.bottom) + ")"
      )
      .style("text-anchor", "middle")
      .text("Year");

    // Add the white background to the y axis label for legibility
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("x", margin.top - height / 2)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .attr("class", "shadow")
      .text("Open Price ($)");

    // Add the text label for the Y axis
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("x", margin.top - height / 2)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Open Price ($)");

    // Add the title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 10 - margin.top / 30)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text("FAANG Company Open Stock Price 1980 - 2020");

    // color palette
    var res = sumstat.map(function (d) {
      return d.key;
    }); // list of group names
    var color = d3
      .scaleOrdinal()
      .domain(res)
      .range(["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"]);

    // Draw the line
    svg
      .selectAll(".line")
      .data(sumstat)
      .enter()
      .append("path")
      .attr("fill", "none")
      .attr("stroke", function (d) {
        return color(d.key);
      })
      .text(function (d) {
        return d.key;
      })
      .attr("stroke-width", 2.5)
      .attr("d", function (d) {
        return d3
          .line()
          .x(function (d) {
            return x(parseDate(d.Date));
          })
          .y(function (d) {
            return y(+d.Open);
          })(d.values);
      });

    svg
      .selectAll("myLabels")
      .data(sumstat)
      .enter()
      .append("g")
      .append("text")
      .datum(function (d) {
        return { name: d.key, value: d.values[d.values.length - 1] };
      }) // keep only the last value of each time series
      .attr("transform", function (d) {
        return "translate(" + (width - 38) + "," + y(d.value.Open) + ")";
      }) // Put the text at the position of the last point
      .attr("x", 12) // shift the text a bit more right
      .text(function (d) {
        return d.name;
      })
      .style("fill", function (d) {
        return color(d.name);
      })
      .style("font-size", 15);
  });
};

const drawGraphTwo = () => {

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 1260 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#graph2")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    // Add the text label for the X axis
    svg
      .append("text")
      .attr(
        "transform",
        "translate(" + width / 2 + " ," + (height + margin.bottom) + ")"
      )
      .style("text-anchor", "middle")
      .text("Year");

    // Add the white background to the y axis label for legibility
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("x", margin.top - height / 2)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .attr("class", "shadow")
      .text("Close Price ($)");

    // Add the text label for the Y axis
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("x", margin.top - height / 2)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Close Price ($)");

    // Add the title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 4.75)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text("FAANG Company Close Stock Price 1980 - 2020");

//Read the data
d3.csv("https://raw.githubusercontent.com/kxnxchukwu/DataVizwithD3js/main/Data/FAANG2.csv", function(data) {

  // group the data: one array for each value of the X axis.
  var sumstat = d3.nest()
    .key(function(d) { return d.date;})
    .entries(data);


  // Stack the data: each group will be represented on top of each other
  var mygroups = ["AMZN", "GOOGL", "AAPL", "FB", "NFLX"] // list of group names
  var mygroup = [1,2,3,4,5] // list of group names
  var stackedData = d3.stack()
    .keys(mygroup)
    .value(function(d, key){
      return d.values[key].price
    })
    (sumstat)

  // Add X axis --> it is a date format
  var x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d.date; }))
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(15));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.price; })*2.0])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // color palette
  var color = d3.scaleOrdinal()
    .domain(mygroups)
    .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00'])

  // Show the areas
  svg
    .selectAll("mylayers")
    .data(stackedData)
    .enter()
    .append("path")
    .style("fill", function(d) { name = mygroups[d.key-1];  return color(name); })
    .attr("d", d3.area()
        .x(function(d) { return x(d.data.key); })
        .y0(function(d) { return y(d[0]); })
        .y1(function(d) { return y(d[1]); })
    )

    svg.selectAll("myrect")
    .data(stackedData)
    .enter()
    .append("rect")
      .attr("x", 400)
      .attr("y", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("width", size)
      .attr("height", size)
      .style("fill", function(d){ return color(d)})

    svg.selectAll("mylabels")
      .data(stackedData)
      .enter()
      .append("text")
        .attr("x", 400 + size*1.2)
        .attr("y", function(d,i){ return 10 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d){ name = mygroups[d.key-1]; return color(name)})
        .text(function(d){ name = mygroups[d.key-1]; return name})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
})
}

drawGraphOne();

drawGraphTwo();