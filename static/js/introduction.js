window.onload = function loadData(){
//   d3.json("../../data/introduction/globalprevalence.json").then(data => {
//     lineGraph(data);
// })
// };

  // Load in data
  var requests = [d3.json("../../data/introduction/globalprevalence.json"),
  d3.json("../../data/introduction/regionprevalence.json")];

  Promise.all(requests).then(function(res) {
    lineGraph(res[0]);

    d3.select("#option").on("click", function(d){
      // console.log(res[1]);
      lineGraph2(res[1]);
    });
    // updateLineGraph(res[1]);
    // console.log(res[1]);

  }).catch(function(e){
    throw(e);
    });

  };


function lineGraph(data){

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

  /* Scale */
  var xScale = d3.scaleLinear()
    .domain(d3.extent(data[2].values, d => d.x))
    .range([0, width-margin]);

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(data[2].values, d => d.y)])
    .range([height-margin, 0]);

  var color = d3.scaleOrdinal(d3.schemeCategory10);

  /* Add SVG */
  var svg = d3.select(".lineGraph").append("svg")
    .attr("width", (width+margin)+"px")
    .attr("height", (height+margin)+"px")
    .append('g')
    .attr("id", "lineGraphTest")
    .attr("transform", `translate(${margin}, ${margin})`);


  /* Add line into SVG */
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


  /* Add Axis into SVG */
  var xAxis = d3.axisBottom(xScale).ticks(5).tickFormat(d3.format("d"));
  var yAxis = d3.axisLeft(yScale).ticks(5);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height-margin})`)
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append('text')
    .attr("y", 15)
    .attr("transform", "rotate(-90)")
    .attr("fill", "#000")
    .text("Total values");

};
// function updateLineGraph(updateData){
//   console.log(updateData);
//   var width = 500;
//   var height = 300;
//   var margin = 50;
//   var duration = 250;
//
//   var lineOpacity = "0.25";
//   var lineOpacityHover = "0.85";
//   var otherLinesOpacityHover = "0.1";
//   var lineStroke = "1.5px";
//   var lineStrokeHover = "2.5px";
//
//   var circleOpacity = '0.85';
//   var circleOpacityOnLineHover = "0.25"
//   var circleRadius = 3;
//   var circleRadiusHover = 6;
//
//   var svg = d3.selectAll(".lineGraph");
//   var lines = svg.selectAll(".line-group");
//   var linee = svg.selectAll(".lines")
//   var lines_line = lines.selectAll(".line")
//   var circless = linee.selectAll(".circle-group");
//   var cir = circless.selectAll(".circle");
//   var xax = svg.selectAll(".x.axis");
//   var yax = svg.selectAll(".y.axis");
//
//   var xScale = d3.scaleLinear()
//     .domain(d3.extent(updateData[4].values, d => d.x))
//     .range([0, width-margin]);
//
//   var yScale = d3.scaleLinear()
//     .domain([0, d3.max(updateData[4].values, d => d.y)])
//     .range([height-margin, 0]);
//
//   /* Add Axis into SVG */
//   var xAxis = d3.axisBottom(xScale)
//                   .ticks(5)
//                   .tickFormat(d3.format("d"));
//   var yAxis = d3.axisLeft(yScale).ticks(5);
//
//   xax.transition()
//       .duration(750)
//       .call(xAxis);
//
//   yax.transition()
//       .duration(750)
//       .call(yAxis);
//
//   var update = lines.data(updateData);
//
//   update.exit()
//         .remove()
//         .enter();
//
//   /* Add line into SVG */
//   var line = d3.line()
//                 .x(d => xScale(d.x))
//                 .y(d => yScale(d.y));
//
//   update.transition()
//         .duration(750)
//           .attr("d", d => line(d.values));
//
//   var update2 = lines_line.data(updateData);
//
//     update2.exit()
//             .remove()
//             .enter();
//
//     update2.transition()
//             .duration(750)
//             .attr("d", d=>line(d.values))
//
//     update3 = circless.data(updateData);
//     update3.exit()
//           .remove()
//           .enter();
//
//
//     update4 = circless.data(d => d.values);
    // console.log(update4);
    // update4.exit()
    //         .remove()
    //         .enter();
    //
    // update4.transition()
    //         .duration(750)
    //         .attr("cx", d => xScale(d.x))
    //         .attr("cy", d => yScale(d.y));
  // /* Add line into SVG */
  // var line = d3.line()
  //   .x(d => xScale(d.x))
  //   .y(d => yScale(d.y));
  //
  // // select all lines
  // var svg = d3.select("#lineGraphTest");
  //
  //
  // var lines = svg.selectAll("lines")
  //
  //     .data(data2);
  //
  //   // lines.exit().remove();
  //
  //   lines
  //     .enter()
  //     .append('path');
  //
  //
  //   lines
  //     .transition()
  //     .duration(200).attr('class', 'line')
  //     .attr('d', function(d){ console.log(d); return line(d.values); })
  //     .style('stroke', (d, i) => color(i));
  //
  //
  // /* Add Axis into SVG */
  // var xAxis = d3.axisBottom(xScale).ticks(5).tickFormat(d3.format("d"));
  // var yAxis = d3.axisLeft(yScale).ticks(5);
  //
  //
  // // set d attribute of line objects to new data
  // lines
  //     .attr('d', function(d){console.log(d); return d.values});
  //
  //
  //
  // lines.selectAll("circle")
  //     .attr("cx", function(d){
  //       console.log(d);})
  //     .attr("cy", d => yScale(console.log(d.y)));
  //
  //
  // svg.select(".x.axis")
  //     .call(xAxis);
  //
  // svg.select(".y.axis")
  //     .call(yAxis);


    // lines.selectAll('.line-group')
    //   .data(data)
    //   .append('g')
    //   .attr('class', 'line-group')
    //   .on("mouseover", function(d, i) {
    //       svg.append("text")
    //         .attr("class", "title-text")
    //         .style("fill", color(i))
    //         .text(d.name)
    //         .attr("text-anchor", "middle")
    //         .attr("x", (width-margin)/2)
    //         .attr("y", 5);
    //     })
    //   .on("mouseout", function(d) {
    //       svg.select(".title-text").remove();
    //     })
    //   .append('path')
    //   .attr('class', 'line')
    //   .attr('d', d => line(d.values))
    //   .style('stroke', (d, i) => color(i))
    //   .style('opacity', lineOpacity)
    //   .on("mouseover", function(d) {
    //       d3.selectAll('.line')
    //           .style('opacity', otherLinesOpacityHover);
    //       d3.selectAll('.circle')
    //           .style('opacity', circleOpacityOnLineHover);
    //       d3.select(this)
    //         .style('opacity', lineOpacityHover)
    //         .style("stroke-width", lineStrokeHover)
    //         .style("cursor", "pointer");
    //     })
    //   .on("mouseout", function(d) {
    //       d3.selectAll(".line")
    //           .style('opacity', lineOpacity);
    //       d3.selectAll('.circle')
    //           .style('opacity', circleOpacity);
    //       d3.select(this)
    //         .style("stroke-width", lineStroke)
    //         .style("cursor", "none");
    //     });
    //
    //
    // /* Add circles in the line */
    // lines.selectAll("circle-group")
    //   .data(data).enter()
    //   .append("g")
    //   .style("fill", (d, i) => color(i))
    //   .selectAll("circle")
    //   .data(d => d.values).enter()
    //   .append("g")
    //   .attr("class", "circle")
    //   .on("mouseover", function(d) {
    //       d3.select(this)
    //         .style("cursor", "pointer")
    //         .append("text")
    //         .attr("class", "text")
    //         .text(`${d.y}`)
    //         .attr("x", d => xScale(d.x) + 5)
    //         .attr("y", d => yScale(d.y) - 10);
    //     })
    //   .on("mouseout", function(d) {
    //       d3.select(this)
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
    //         d3.select(this)
    //           .transition()
    //           .duration(duration)
    //           .attr("r", circleRadiusHover);
    //       })
    //     .on("mouseout", function(d) {
    //         d3.select(this)
    //           .transition()
    //           .duration(duration)
    //           .attr("r", circleRadius);
    //       });
    //
    //
    // /* Add Axis into SVG */
    // var xAxis = d3.axisBottom(xScale).ticks(5).tickFormat(d3.format("d"));
    // var yAxis = d3.axisLeft(yScale).ticks(5);
    //
    // svg.append("g")
    //   .attr("class", "x axis")
    //   .attr("transform", `translate(0, ${height-margin})`)
    //   .call(xAxis);
    //
    // svg.append("g")
    //   .attr("class", "y axis")
    //   .call(yAxis)
    //   .append('text')
    //   .attr("y", 15)
    //   .attr("transform", "rotate(-90)")
    //   .attr("fill", "#000")
    //   .text("Total values");
    //

function lineGraph2(data){
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
  console.log(data[2].values);
  /* Scale */
  var xScale = d3.scaleLinear()
    .domain(d3.extent(data[4].values, d => d.x))
    .range([0, width-margin]);

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(data[4].values, d => d.y)])
    .range([height-margin, 0]);

  var color = d3.scaleOrdinal(d3.schemeCategory10);

  /* Add SVG */
  var svg = d3.select(".lineGraph").append("svg")
    .attr("width", (width+margin)+"px")
    .attr("height", (height+margin)+"px")
    .append('g')
    .attr("id", "lineGraphTest")
    .attr("transform", `translate(${margin}, ${margin})`);


  /* Add line into SVG */
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


  /* Add Axis into SVG */
  var xAxis = d3.axisBottom(xScale).ticks(5).tickFormat(d3.format("d"));
  var yAxis = d3.axisLeft(yScale).ticks(5);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height-margin})`)
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append('text')
    .attr("y", 15)
    .attr("transform", "rotate(-90)")
    .attr("fill", "#000")
    .text("Number of people living with dementia (millions)
");
};
