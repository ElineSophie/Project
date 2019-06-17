window.onload = function loadData(){
  d3.json("../../data/types/types.json").then(data => {
    piechart(data);
    // barChart(data);
  });
};

function piechart(data){
  keys = Object.keys(data);

  values = Object.values(data);

  // Make list for prevalence rates
  prevalence = [];
  values.forEach(function(d){
    pre = d.Prevalence;
    prevalence.push(pre)
  })


  var width = 450;
  var height = 450;
  var margin = 40;

  var dict = {};
  for (i=0; i < keys.length; i++){
    dict[String(keys[i])] = prevalence[i];
  };

  var radius = Math.min(width, height) / 2 - margin

  // console.log(data.Type);

  var svg = d3.select(".piechart")
              .append("svg")
              .attr("width", width)
              .attr("height", height)
              .append("g")
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // Set the color scale
    var color = d3.scaleOrdinal()
                .domain(values.length)
                .range(d3.schemePaired);

    // Compute the position of each group on the pie
    var pie = d3.pie()
                .value(d => d.value);

    // var data_ready = pie(d3.entries(data.Type))
    // var data_ready1 = pie(d3.entries(keys))

    var data_ready = pie(d3.entries(dict))

    // Shape helper to build arcs
    var arcGenerator = d3.arc()
                        .innerRadius(radius * 0.4)
                        .outerRadius(radius * 0.8);

    // Initiate tooltip
    var tooltip = d3.tip()
                  .attr("class", "d3-tip")
                  .html(function(d) {
                    key = d.data.key
                    value = d.data.value
                    return key + ": " + value;
                  });

    svg.call(tooltip);

    // Create the pie chart
    svg.selectAll("path")
        .data(data_ready)
        .enter()
        .append("path")
          .attr("d", d3.arc()
                      .innerRadius(0)
                      .outerRadius(radius)
            )
          .attr("fill", function(d) { return(color(d.data.value)) })
          .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0,7)
        .on("mouseover", tooltip.show)
        .on("mouseout", tooltip.hide);
};
// function barChart(data){
//   // Remove any previous graphs
//     d3.selectAll("rect")
//         .remove();
//
//     var w = 400;
//     var h = 350;
//
//     // Getting DOM element
//     var svg = d3.select("body")
//                    .attr("width", w)
//                    .attr("height", h);
//
//
//     // Create margins and dimensions for the graph
//     var margin = {top: 20, right: 20, bottom: 80, left: 80};
//     var graphWidth = w - margin.left - margin.right;
//     var graphHeight = h - margin.top - margin.bottom;
//
//     // Append a group to svg and save as graph
//     var graph = svg.append('g')
//                   .attr("width", graphWidth)
//                   .attr("height", graphHeight)
//                   .attr('transform', `translate(${margin.left}, ${margin.top})`);
//
//     // Create groups for x and y
//     var xAxis = graph.append('g')
//       .attr('transform', `translate(0, ${graphHeight})`);
//
//     var yAxis = graph.append('g');
//
//     // Set scales for axis
//     var yScale = d3.scaleLinear()
//                     .domain([0, 100])
//                     .range([graphHeight, 0]);
//
//     var list = ["Female", "Male"];
//
//     var xScale = d3.scaleBand()
//                         .domain(list)
//                         .range([0, graphWidth])
//                         .paddingInner(0.3)
//                         .paddingOuter(0.3);
//
//     // Join the data to the rectangles
//     var rect = graph.selectAll("rect")
//                     .data([female, male]);
//
//     // Add attributes to the rectangles
//     rect.enter()
//         .append("rect")
//         .attr("width", xScale.bandwidth)
//         .attr("height", d => graphHeight - yScale(d))
//         .attr("fill", "blue")
//         .attr("x", (d, i) => xScale(list[i]))
//         .attr("y", d => yScale(d));
//
//
//     // Create and call the axes
//     var x = d3.axisBottom(xScale);
//     var y = d3.axisLeft(yScale)
//               .ticks(5);
//
//     xAxis.call(x);
//     yAxis.call(y);
//
//     // Append text to the graph
//     svg.append("text")
//         .attr("x", (-h / 2.2))
//         .attr("y", 50)
//         .attr("transform", "rotate(-90)")
//         .attr("text-anchor", "middle")
//         .style("font-size", "12px")
//         .style("font-family", "sans-serif")
//         .text("Average Life Expectancy");
//
//     svg.append("text")
//         .attr("x", w / 1.8)
//         .attr('y', 320)
//         .attr('text-anchor', 'middle')
//         .style("font-size", "12px")
//         .style("font-family", "sans-serif")
//         .text("Country vs. Global rate");
//
// };
