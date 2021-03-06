window.onload = function loadData(){

  // Load in data
  var requests = [d3.json("../../data/introduction/globalprevalence.json"),
  d3.json("../../data/introduction/regionprevalence.json")];

  Promise.all(requests).then(function(res) {

    lineGraph(res[0]);

    d3.select("#income").on("click", function(d){
      lineGraph(res[0]);
    })

    d3.select("#update").on("click", function(d){
      lineGraph2(res[1]);
    });

  }).catch(function(e){
    throw(e);
    });

  };


/*
This function draw a line graph according to income
*/
function lineGraph(data){

  d3.selectAll("svg")
    .remove();

  // Set variables
  var width = 500;
  var height = 300;
  var margin = 50;
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

  // Scale the graph
  var xScale = d3.scaleLinear()
    .domain(d3.extent(data[2].values, d => d.x))
    .range([0, width-margin]);

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(data[2].values, d => d.y)])
    .range([height-margin, 0]);

  var color = d3.scaleOrdinal(d3.schemeCategory10);

  // Add svg
  var svg = d3.select(".lineGraph").append("svg")
              .attr("width", (width+margin)+"px")
              .attr("height", (height+margin)+"px")
              .append('g')
              .attr("id", "lineGraphTest")
              .attr("transform", `translate(${margin}, ${margin})`);


  // Add a line to the graph
  var line = d3.line()
                .x(d => xScale(d.x))
                .y(d => yScale(d.y));

  var lines = svg.append('g')
                  .attr('class', 'lines');

  lines.selectAll('.line-group')
        .data(data).enter()
        .append('g')
        .attr('class', 'line-group')
        .on("mouseover", function(d, i) {
            svg.append("text")
              .attr("class", "title-text")
              .style("fill", color(i))
              .text(d.name)
              .attr("text-anchor", "middle")
              .attr("x", (width-margin)/2)
              .attr("y", 5);
          })
        .on("mouseout", function(d) {
            svg.select(".title-text").remove();
          })
        .append('path')
        .attr('class', 'line')
        .attr('d', d => line(d.values))
        .style('stroke', (d, i) => color(i))
        .style('opacity', lineOpacity)
        .on("mouseover", function(d) {
            d3.selectAll('.line')
      					.style('opacity', otherLinesOpacityHover);
            d3.selectAll('.circle')
      					.style('opacity', circleOpacityOnLineHover);
            d3.select(this)
              .style('opacity', lineOpacityHover)
              .style("stroke-width", lineStrokeHover)
              .style("cursor", "pointer");
          })
        .on("mouseout", function(d) {
            d3.selectAll(".line")
      					.style('opacity', lineOpacity);
            d3.selectAll('.circle')
      					.style('opacity', circleOpacity);
            d3.select(this)
              .style("stroke-width", lineStroke)
              .style("cursor", "none");
          });


  /* Add circles in the line */
  lines.selectAll("circle-group")
        .data(data).enter()
        .append("g")
        .style("fill", (d, i) => color(i))
        .selectAll("circle")
        .data(d => d.values).enter()
        .append("g")
        .attr("class", "circle")
        .on("mouseover", function(d) {
            d3.select(this)
              .style("cursor", "pointer")
              .append("text")
              .attr("class", "text")
              .text(`${d.y}`)
              .attr("x", d => xScale(d.x) + 5)
              .attr("y", d => yScale(d.y) - 10);
          })
        .on("mouseout", function(d) {
            d3.select(this)
              .style("cursor", "none")
              .transition()
              .duration(duration)
              .selectAll(".text").remove();
          })
        .append("circle")
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
        .attr("r", circleRadius)
        .style('opacity', circleOpacity)
        .on("mouseover", function(d) {
              d3.select(this)
                .transition()
                .duration(duration)
                .attr("r", circleRadiusHover);
            })
          .on("mouseout", function(d) {
              d3.select(this)
                .transition()
                .duration(duration)
                .attr("r", circleRadius);
            });


  // Add the axis
  var xAxis = d3.axisBottom(xScale)
                .ticks(5)
                .tickFormat(d3.format("d"));
  var yAxis = d3.axisLeft(yScale)
                .ticks(5);

  // Add text
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height-margin})`)
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append('text')
      .attr("y", -25)
      .attr("transform", "rotate(-90)")
      .attr("fill", "#000")
      .text("Number of people living with dementia (in millions)");
};


/*
This function draw a line graph according to region
*/
function lineGraph2(data){

  d3.selectAll("svg")
    .remove();

  var width = 500;
  var height = 300;
  var margin = 50;
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

  // Set scales to graph
  var xScale = d3.scaleLinear()
                  .domain(d3.extent(data[4].values, d => d.x))
                  .range([0, width-margin]);

  var yScale = d3.scaleLinear()
                  .domain([0, d3.max(data[4].values, d => d.y)])
                  .range([height-margin, 0]);

  var color = d3.scaleOrdinal(d3.schemeCategory10);

  // Add SVG
  var svg = d3.select(".lineGraph").append("svg")
              .attr("width", (width+margin)+"px")
              .attr("height", (height+margin)+"px")
              .append('g')
              .attr("id", "lineGraphTest")
              .attr("transform", `translate(${margin}, ${margin})`);


  // Add line
  var line = d3.line()
                .x(d => xScale(d.x))
                .y(d => yScale(d.y));

  var lines = svg.append('g')
    .attr('class', 'lines');

  lines.selectAll('.line-group')
        .data(data).enter()
        .append('g')
        .attr('class', 'line-group')
        .on("mouseover", function(d, i) {
            svg.append("text")
              .attr("class", "title-text")
              .style("fill", color(i))
              .text(d.name)
              .attr("text-anchor", "middle")
              .attr("x", (width-margin)/2)
              .attr("y", 5);
          })
        .on("mouseout", function(d) {
            svg.select(".title-text").remove();
          })
        .append('path')
        .attr('class', 'line')
        .attr('d', d => line(d.values))
        .style('stroke', (d, i) => color(i))
        .style('opacity', lineOpacity)
        .on("mouseover", function(d) {
            d3.selectAll('.line')
                .style('opacity', otherLinesOpacityHover);
            d3.selectAll('.circle')
                .style('opacity', circleOpacityOnLineHover);
            d3.select(this)
              .style('opacity', lineOpacityHover)
              .style("stroke-width", lineStrokeHover)
              .style("cursor", "pointer");
          })
        .on("mouseout", function(d) {
            d3.selectAll(".line")
                .style('opacity', lineOpacity);
            d3.selectAll('.circle')
                .style('opacity', circleOpacity);
            d3.select(this)
              .style("stroke-width", lineStroke)
              .style("cursor", "none");
          });


  // Add circles
  lines.selectAll("circle-group")
        .data(data).enter()
        .append("g")
        .style("fill", (d, i) => color(i))
        .selectAll("circle")
        .data(d => d.values).enter()
        .append("g")
        .attr("class", "circle")
        .on("mouseover", function(d) {
            d3.select(this)
              .style("cursor", "pointer")
              .append("text")
              .attr("class", "text")
              .text(`${d.y}`)
              .attr("x", d => xScale(d.x) + 5)
              .attr("y", d => yScale(d.y) - 10);
          })
        .on("mouseout", function(d) {
            d3.select(this)
              .style("cursor", "none")
              .transition()
              .duration(duration)
              .selectAll(".text").remove();
          })
        .append("circle")
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
        .attr("r", circleRadius)
        .style('opacity', circleOpacity)
        .on("mouseover", function(d) {
              d3.select(this)
                .transition()
                .duration(duration)
                .attr("r", circleRadiusHover);
            })
          .on("mouseout", function(d) {
              d3.select(this)
                .transition()
                .duration(duration)
                .attr("r", circleRadius);
            });


  // Add the axis
  var xAxis = d3.axisBottom(xScale)
                .ticks(5)
                .tickFormat(d3.format("d"));
  var yAxis = d3.axisLeft(yScale)
                .ticks(5);

  // Add text to the graph
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height-margin})`)
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append('text')
    .attr("y", -25)
    .attr("transform", "rotate(-90)")
    .attr("fill", "#000")
    .text("Number of people living with dementia (in millions)");
};
