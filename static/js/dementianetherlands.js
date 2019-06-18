var globaldata = []

window.onload = function loadData(){

      // Load in data
    var requests = [d3v5.json("../../data/netherlands/nld.json"), d3v5.json("../../data/netherlands/map.json"), d3v5.json("../../data/netherlands/datanetherlands.json"), d3v5.json("../../data/netherlands/prognose.json")];
    Promise.all(requests).then(function(res) {
        dataMaps(res[0], res[1])

        globaldata.push(res[2]);
        globaldata.push(res[1]);
        updateMap();

        // Remove netherlands in dataset
        for (d in res[2]){
            res[2][d].shift();
          };

        initScatter(res[2]["2009"]);

        d3v5.select("#year")
            .on("change", function(d){
              // console.log();
              updateScatter(this.value);
              updateMap(this.value);
            });
              // updateMap();
            // });

        prognoseLine(res[3]);


    }).catch(function(e){
        throw(e);
        });

};

// function totalDropdown(data){
//
//   keys = Object.keys(data)
//   man = []
//   keys.forEach(function(key){
//     data[key].forEach(function(value){
//         man[value["Perioden"]].push({
//         "Totaal gesloten mannen": value["Totaal aantal mannen gesloten"]
//       })
//     })
// });
// console.log(man);
// };

function dataMaps(nld, data){

  var w = 450;
  var h = 450;

  var colour = d3v3.scale.category20();

  // Projection of the map
  var projection = d3v3.geo.mercator()
      .scale(1)
      .translate([0, 0]);

  // Make a projection for the coordinates
  var path = d3v3.geo.path()
      .projection(projection);

  var datamap = d3v5.select("#map")
      .attr("width", w)
      .attr("height", h);

var tooltip = d3v5.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

// Create margins and dimensions for the graph
  var margin = {top: 20, right: 20, bottom: 80, left: 80};
  var graphWidth = w - margin.left - margin.right;
  var graphHeight = h - margin.top - margin.bottom;

  // Append a group to svg and save as graph
  var graph = datamap.append('g')
                .attr("width", graphWidth)
                .attr("height", graphHeight)
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // d3v3.json("../../data/netherlands/nld.json", function(error, nld) {
  //   console.log(nld);
      // Get features from the dataset
  var l = topojson.feature(nld, nld.objects.subunits).features[3],
      b = path.bounds(l),
      s = .2 / Math.max((b[1][0] - b[0][0]) / graphWidth, (b[1][1] - b[0][1]) / graphHeight),
      t = [(graphWidth - s * (b[1][0] + b[0][0])) / 2, (graphHeight - s * (b[1][1] + b[0][1])) / 2];

  projection
      .scale(s)
      .translate(t);

  // Make a path for every province
  graph.selectAll(".path")
      .data(topojson.feature(nld, nld.objects.subunits).features).enter()
      .append("path")
      .attr("d", path) // List of coordinates
      .attr("fill", function(d, i) {
          return colour(i);})
      .attr("stroke", "black")
      .attr("class", function(d, i) {
          return d.properties.name;
      })
      .on("mouseover", function(d) {
            tooltip.transition()
            .duration(200)
            .style("opacity", .9);
            tooltip.html(function(){
              point = undefined
              data[d.properties.name].forEach(period=>{
                if (period.Perioden == 2009) {
                   point = period
                   return;
                }})
              // hier kan je de variabele printen die je wilt hebben
              return point["80+ totaal"]
            })
            .style("left", (d3v5.event.pageX) + "px")
            .style("top", (d3v5.event.pageY - 28) + "px");

          });
          // .on("mouseover", function(d) {
          //   d3v5.select(this).attr("fill", "yellow")
          // })
          // // .on("mouseout", function(d){
          // //   d3v5.select(this).attr("fill", false)
          // //   });

      // graph.selectAll(".city-circle")
      //     .data(data)
      //     .enter()
      //     .append("circle")
      //     .attr("r", 2)
      //     .attr("cx", function(d){
      //       var coords = projection(d.long, d.lat)
      //       return coords[0];
      //     })
      //     .attr("cy",function(d){
      //       var coords = projection(d.log, d.lat)
      //       return coords[1];
      //     })
      //     .text("this is text");
}

function updateMap(d){

//   keys = Object.keys(globaldata[1]);
//   console.log(keys);
//   keys.forEach(function(key){
//     Object.values(globaldata[1]).forEach(function(d){
//         var val = d[key]["Perioden"];
//         console.log(val);
//   })
// })
  data1 = globaldata[1]
  Object.keys(data1).forEach(function(key){
    data1[key].forEach(function(value){
      console.log(value);
    })});


};

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

  // // Create circles
  // var dot = graph.selectAll("circle")
  //                 .data(data);

  // Join new data
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

function prognoseLine(data){
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
  var xScale = d3v5.scaleLinear()
    .domain(d3v5.extent(data[2].values, d => d.x))
    .range([0, width-margin]);

  var yScale = d3v5.scaleLinear()
    .domain([0, d3v5.max(data[8].values, d => d.y)])
    .range([height-margin, 0]);

  var color = d3v5.scaleOrdinal(d3v5.schemeCategory10);

  /* Add SVG */
  var svg = d3v5.select(".prognose").append("svg")
    .attr("width", (width+margin)+"px")
    .attr("height", (height+margin)+"px")
    .append('g')
    .attr("transform", `translate(${margin}, ${margin})`);


  /* Add line into SVG */
  var line = d3v5.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));

  var lines = svg.append('g')
    .attr('class', 'lines');

  lines.selectAll('.lines')
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
        d3v5.selectAll('.line')
            .style('opacity', otherLinesOpacityHover);
        d3v5.selectAll('.circle')
            .style('opacity', circleOpacityOnLineHover);
        d3v5.select(this)
          .style('opacity', lineOpacityHover)
          .style("stroke-width", lineStrokeHover)
          .style("cursor", "pointer");
      })
    .on("mouseout", function(d) {
        d3v5.selectAll(".line")
            .style('opacity', lineOpacity);
        d3v5.selectAll('.circle')
            .style('opacity', circleOpacity);
        d3v5.select(this)
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
        d3v5.select(this)
          .style("cursor", "pointer")
          .append("text")
          .attr("class", "text")
          .text(`${d.y}`)
          .attr("x", d => xScale(d.x) + 5)
          .attr("y", d => yScale(d.y) - 10);
      })
    .on("mouseout", function(d) {
        d3v5.select(this)
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
          d3v5.select(this)
            .transition()
            .duration(duration)
            .attr("r", circleRadiusHover);
        })
      .on("mouseout", function(d) {
          d3v5.select(this)
            .transition()
            .duration(duration)
            .attr("r", circleRadius);
        });


  /* Add Axis into SVG */
  var xAxis = d3v5.axisBottom(xScale).ticks(5);
  var yAxis = d3v5.axisLeft(yScale).ticks(5);

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
