function initScatter(data){

  //Width and height
  var w = 500;
  var h = 500;

  // Create svg
  var svg_scatterplot = d3v5.select(".scatter")
                          .append("svg")
                          .attr("class", "scatterplot")
                          .attr("width", w)
                          .attr("height", h);

  // Create margins and dimensions for the graph
  var margin = {top: 40, right: 40, bottom: 120, left: 90};
  var graphWidth = w - margin.left - margin.right;
  var graphHeight = h - margin.top - margin.bottom

  // Append a group to svg and save as graph
  var graph = svg_scatterplot.append('g')
                .attr("class", "svg_scatter")
                .attr("width", graphWidth)
                .attr("height", graphHeight)
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // Create groups for x and y
  var xAxis = graph.append('g')
                    .attr("class", "xax")
                    .attr('transform', `translate(0, ${graphHeight})`);

  var yAxis = graph.append('g')
                    .attr("class", "yax");

  // Set scales x and y and padding if necessary
  var yScale = d3v5.scaleLinear()
                .domain([d3v5.min(data, d => d["65+ totaal"]), d3v5.max(data, d => d["65+ totaal"])])
                .range([graphHeight, 0])
                .nice();

  var xScale = d3v5.scaleLinear()
                .domain([d3v5.min(data, d => d["Totaal aantal lopend"]), d3v5.max(data, d => d["Totaal aantal lopend"])])
                .range([0, graphWidth])
                .nice();

  // Create circles
  var dot = graph.selectAll("circle")
                  .data(data);

  dot.enter()
      .append("circle")
      .attr("class", "dot")
      .attr("r", "5")
      .attr("cx", d => xScale(d["Totaal aantal lopend"]))
      .attr("cy", d => yScale(d["65+ totaal"]));


    // Create and call the axes
    var x = d3v5.axisBottom(xScale);
    var y = d3v5.axisLeft(yScale);

    xAxis.call(x);
    yAxis.call(y);

};

function updateScatter(val, data = globaldata[0]){

  var graph = d3v5.selectAll(".svg_scatter");
  // console.log(graph);
  var svg_scatterplot = d3v5.selectAll(".scatterplot");
  var xAxis = d3v5.selectAll("xax");
  var yAxis = d3v5.selectAll("yax");
  //
  //Width and height
  var w = 500;
  var h = 500;

  // Create margins and dimensions for the graph
  var margin = {top: 40, right: 40, bottom: 120, left: 90};
  var graphWidth = w - margin.left - margin.right;
  var graphHeight = h - margin.top - margin.bottom;

  // Set scales x and y and padding if necessary
  var yScale = d3v5.scaleLinear()
                .domain([d3v5.min(data[val], d => d["65+ totaal"]), d3v5.max(data[val], d => d["65+ totaal"])])
                .range([graphHeight, 0])
                .nice();

  var xScale = d3v5.scaleLinear()
                .domain([d3v5.min(data[val], d => d["Totaal aantal lopend"]), d3v5.max(data[val], d => d["Totaal aantal lopend"])])
                .range([0, graphWidth])
                .nice();

  // // Create circles
  // var dot = graph.selectAll("circle")
  //                 .data(data);

  // Join new data
  var dot = graph.selectAll("circle")
                    .data(data[val]);

  // console.log(data[val]);
  // dot.enter()
  //     .append("circle")
  //     .attr("r", "5")
  //     .attr("cx", function(d) {console.log(xScale(d["Totaal aantal lopend"]));return xScale(d["Totaal aantal lopend"])})
  //     .attr("cy", d => yScale(d["65+ totaal"]));

  dot.transition()
    .attr("cx", function(d) {
      return xScale(d["Totaal aantal lopend"])})
    .attr("cy", d => yScale(d["65+ totaal"]));

    // Create and call the axes
    var x = d3v5.axisBottom(xScale);
    var y = d3v5.axisLeft(yScale);

    xAxis.call(x);
    yAxis.call(y);

};


var updateData;

Object.values(data).forEach(function(value){
  if(value.name == gemeente){
    updateData = [value]
  }
});

var svg_line = d3v5.selectAll(".linesvg");
var graph_line = d3v5.selectAll(".svg_line");
var xAxis = d3v5.selectAll(".xax_line");
var yAxis = d3v5.selectAll(".yax_line");

var w = 500;
var h = 400;

var duration = 250;

var lineOpacity = "0.25";
var lineOpacityHover = "0.85";
var otherLinesOpacityHover = "0.1";
var lineStroke = "1.5px";
var lineStrokeHover = "2.5px";

var circleOpacity = '0.85';
var circleOpacityOnLineHover = "0.25"
var circleRadius = 3;
var circleRadiusHover = 6;

// Create margins and dimensions for the graph
var margin = {top: 40, right: 40, bottom: 120, left: 90};
var graphWidth = w - margin.left - margin.right;
var graphHeight = h - margin.top - margin.bottom;

/* Scale */
var xScale = d3v5.scaleLinear()
  .domain(d3v5.extent(updateData[0].values, d => d.x))
  .range([0, graphWidth]);

var yScale = d3v5.scaleLinear()
  .domain([0, d3v5.max(updateData[0].values, d => d.y)])
  .range([graphHeight, 0]);

var lines = graph_line.selectAll(".lines")
                      .data(updateData);

//Create and call the axes
var xAxis = d3v5.axisBottom(xScale).ticks(10).tickFormat(d3v5.format("d"));
var yAxis = d3v5.axisLeft(yScale).ticks(5);


---

// // Create svg
// var svg_line = d3v5.select(".prognose")
//               .append("svg")
//               .attr("class", "linesvg")
//               .attr("width", w)
//               .attr("height", h);
//
// // Create margins and dimensions for the graph
// var margin = {top: 40, right: 40, bottom: 120, left: 90};
// var graphWidth = w - margin.left - margin.right;
// var graphHeight = h - margin.top - margin.bottom
//
// var graph_line = svg_line.append('g')
//                           .attr("class", "svg_line")
//                           .attr("width", graphWidth)
//                           .attr("height", graphHeight)
//                           .attr("transform", `translate(${margin.left}, ${margin.top})`);
//
// // Create groups for x and y
// var xAxis = graph_line.append('g')
//                   .attr("class", "xax_line")
//                   .attr('transform', `translate(0, ${graphHeight})`);
//
// var yAxis = graph_line.append('g')
//                   .attr("class", "yax_line");
//
// /* Scale */
// var xScale = d3v5.scaleLinear()
//   .domain(d3v5.extent(initData[0].values, d => d.x))
//   .range([0, graphWidth]);
//
// var yScale = d3v5.scaleLinear()
//   .domain([0, d3v5.max(initData[0].values, d => d.y)])
//   .range([graphHeight, 0]);
//
// var color = d3v5.scaleOrdinal(d3v5.schemeCategory10);
//
// /* Add line into SVG */
// var line = d3v5.line()
//   .x(d => xScale(d.x))
//   .y(d => yScale(d.y));
//
// var lines = graph_line.append('g')
//                 .attr('class', 'lines');
//
// lines.selectAll('.line-group')
//   .data(initData).enter()
//   .append('g')
//   .attr('class', 'line-group')
//   .on("mouseover", function(d, i) {
//       graph_line.append("text")
//         .attr("class", "title-text")
//         .style("fill", color(i))
//         .text(d.name)
//         .attr("text-anchor", "middle")
//         .attr("x", graphWidth/2)
//         .attr("y", 5);
//     })
//   .on("mouseout", function(d) {
//       graph_line.select(".title-text").remove();
//     })
//   .append('path')
//   .attr('class', 'linepath')
//   .attr('d', d => line(d.values))
//   .style('stroke', (d, i) => color(i))
//   .style('opacity', lineOpacity)
//   .on("mouseover", function(d) {
//       d3v5.selectAll('.linepath')
//           .style('opacity', otherLinesOpacityHover);
//       d3v5.selectAll('.circle')
//           .style('opacity', circleOpacityOnLineHover);
//       d3v5.select(this)
//         .style('opacity', lineOpacityHover)
//         .style("stroke-width", lineStrokeHover)
//         .style("cursor", "pointer");
//     })
//   .on("mouseout", function(d) {
//       d3v5.selectAll(".linepath")
//           .style('opacity', lineOpacity);
//       d3v5.selectAll('.circle')
//           .style('opacity', circleOpacity);
//       d3v5.select(this)
//         .style("stroke-width", lineStroke)
//         .style("cursor", "none");
//     });
//
// /* Add circles in the line */
// lines.selectAll("circle-group")
//   .data(initData).enter()
//   .append("g")
//   .style("fill", (d, i) => color(i))
//   .selectAll("circle")
//   .data(d => d.values).enter()
//   .append("g")
//   .attr("class", "circle")
//   .on("mouseover", function(d) {
//       d3v5.select(this)
//         .style("cursor", "pointer")
//         .append("text")
//         .attr("class", "text")
//         .text(`${d.y}`)
//         .attr("x", d => xScale(d.x) + 5)
//         .attr("y", d => yScale(d.y) - 10);
//     })
//   .on("mouseout", function(d) {
//       d3v5.select(this)
//         .style("cursor", "none")
//         .transition()
//         .duration(duration)
//         .selectAll(".text").remove();
//     })
//   .append("circle")
//   .attr("cx", d => xScale(d.x))
//   .attr("cy", d => yScale(d.y))
//   .attr("r", circleRadius)
//   .style('opacity', circleOpacity)
//   .on("mouseover", function(d) {
//         d3v5.select(this)
//           .transition()
//           .duration(duration)
//           .attr("r", circleRadiusHover);
//       })
//     .on("mouseout", function(d) {
//         d3v5.select(this)
//           .transition()
//           .duration(duration)
//           .attr("r", circleRadius);
//       });
//
//
// /* Add Axis into SVG */
// var xAxis = d3v5.axisBottom(xScale).ticks(10).tickFormat(d3v5.format("d"));
// var yAxis = d3v5.axisLeft(yScale).ticks(5);
//
// graph_line.append("g")
//   .attr("class", "x axis")
//   .attr("transform", `translate(0, ${graphHeight})`)
//   .call(xAxis)
//   .append("text")
//   .attr("x", 300)
//   .attr("y", 50)
//   .attr("fill", "#000")
//   .text("Years");
//
// graph_line.append("g")
//   .attr("class", "y axis")
//   .call(yAxis)
//   .append('text')
//   .attr("y", 15)
//   .attr("transform", "rotate(-90)")
//   .attr("fill", "#000")
//   .text("Number of people with dementia");
