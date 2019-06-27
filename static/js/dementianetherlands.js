/*
This function draws a map of the Netherlands.
*/
function dataMaps(nld, data, dataLine, dataPieChart){

  var width = 600;
  var height = 600;

  // Make usable list for color scaling
  var calc_data = [];
  d3v5.max(Object.entries(data), function(d) {
    Object.values(d[1]).forEach(function(value){
      if (value.Perioden == selected_year){
        calc_data.push(value["Tot per 100.000 inwoners lopend"]);
      }
    })
  });

  var min = d3v5.min(calc_data);
  var max = d3v5.max(calc_data);

  // Set variables for colors
  var low = Math.round((max-min) * (1 / 3));
  var middle = Math.round((max-min) * (2 / 3));
  var high = Math.round((max-min));

  // Set color scale for circles
  var colorScale = d3v5.scaleThreshold()
                        .domain([low, middle, high])
                        .range(colorbrewer.Blues[5]);

  // Projection of the map
  var projection = d3v3.geo.mercator()
                          .scale(1.02)
                          .translate([0.03,0.02]);

  // Make a projection for the coordinates
  var path = d3v3.geo.path()
                  .projection(projection);

  var datamap = d3v5.select("#map")
                      .attr("width", width)
                      .attr("height", height);

  var tooltip = d3v5.select("body").append("div")
                      .attr("class", "tooltip")
                      .style("opacity", 0);

  // Create margins and dimensions for the graph
  var margin = {top: 20, right: 20, bottom: 80, left: 80};
  var graphWidth = width - margin.left - margin.right;
  var graphHeight = height - margin.top - margin.bottom;

  // Append a group to svg and save as graph
  var graph = datamap.append('g')
                      .attr("width", graphWidth)
                      .attr("height", graphHeight)
                      .attr('transform', `translate(${margin.left}, ${margin.top})`);

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
        .attr("id", "mapspath")
        .attr("d", path) // List of coordinates
        .attr("fill", function(d) {
          if (data[d.properties.name] != undefined) {
            for (element in data[d.properties.name]){
              if (data[d.properties.name][element]["Perioden"] == selected_year){
                return colorScale(data[d.properties.name][element]["Tot per 100.000 inwoners lopend"])
          }
        }}})
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
                  if (period.Perioden == selected_year) {
                     point = period
                     return;
                  }})
                // hier kan je de variabele printen die je wilt hebben
                return "Region: " + point.Regios + "<br>Number of people with dementia: " + point["Tot per 100.000 inwoners lopend"]
                // point["Tot per 100.000 inwoners gesloten"]
              })
              .style("left", (d3v5.event.pageX) + "px")
              .style("top", (d3v5.event.pageY - 28) + "px");
            })
        .on("mouseout", function(d, i){
          tooltip.transition()
          .duration(100)
          .style("opacity", 0)
          .style("left", (d3v5.event.pageX) + "px")
          .style("top", (d3v5.event.pageY - 28) + "px");
        })
        .on("click", function(d){
          var year = selected_year
          updateLine(dataLine, d.properties.name)
          updatePie(year, dataPieChart, d.properties.name)
        });

    // Add text to the map
    graph.append("text")
          .attr("x", 10)
          .text("Map of the Netherlands showing provinces")
    addLegendMap(colorScale)
}


/*
This function will add a legend to the map
*/
function addLegendMap(color, labels){

  legendMarginTop  = 50,
                    legendMarginLeft = 30,
                    legendWidth  = 250,
                    legendHeight = 150;

  var svg = d3v5.selectAll("#map")
  var legend = svg.append('g')
      .attr('width', 250)
      .attr('height', 150)
      .attr("transform", "translate(" + 30 + "," + 50 + ")");

  var legends = legend.selectAll("#map")
      .data(color.domain())
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // draw legend colored rectangles
  legends.append("rect")
      .attr("x", 530)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", color);

  // draw legend text
  legends.append("text")
      .attr("x", 485)
      .attr("y", 5)
      .attr("dy", ".35em")
      .style("font-size", 12)
      .text(function(d, i){
        if (i == 0){
          return "Low"
        }
        if (i == 1){
          return "Middle"
        }
        if (i == 2){
          return "High"
        }
      });
};


/*
This function will update the datamap for the years.
*/
function updateMap(val, nld, data, gender, age){
  selected_year = val

  // Make usable list for color scaling
  var calc_data = [];
  d3v5.max(Object.entries(data), function(d) {
    Object.values(d[1]).forEach(function(value){
      if (value.Perioden == selected_year){
        calc_data.push(value[gender]);
      }
    })
  });

  var min = d3v5.min(calc_data);
  var max = d3v5.max(calc_data);

  // Set variables for colors
  var low = Math.round((max-min) * (1 / 3));
  var middle = Math.round((max-min) * (2 / 3));
  var high = Math.round((max-min));

  // Set color scale for circles
  var colorScale = d3v5.scaleThreshold()
                        .domain([low, middle, high])
                        .range(colorbrewer.Blues[5]);

  var graph = d3v5.selectAll("#mapspath")
    .data(topojson.feature(nld, nld.objects.subunits).features);

  var graph_design = graph.selectAll("mapspath")
  .data(topojson.feature(nld, nld.objects.subunits).features);

  graph.exit()
        .remove()
        .enter();

  graph.attr("fill", function(d) {
                    if (data[d.properties.name] != undefined) {
                      for (element in data[d.properties.name]){
                        if (data[d.properties.name][element]["Perioden"] == val){
                          return colorScale(data[d.properties.name][element][gender])
                    }}}});
};


/*
This function will draw a scatterplot with default data, namely
on the x-axis the total ongoing DCT dementia patients and on the y-axis the
65+ aging rate for men and women in total.
*/
function initScatter(data, dataLine, dataPieChart){

  //Width and height
  var width = 600;
  var height = 600;

  // Create svg
  var svg_scatterplot = d3v5.select(".scatter")
                          .append("svg")
                          .attr("class", "scatterplot")
                          .attr("width", width)
                          .attr("height", height);

  // Create margins and dimensions for the graph
  var margin = {top: 40, right: 40, bottom: 120, left: 90};
  var graphWidth = width - margin.left - margin.right;
  var graphHeight = height - margin.top - margin.bottom

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
                .domain([d3v5.min(data, d => d["Tot per 100.000 inwoners lopend"]), d3v5.max(data, d => d["Tot per 100.000 inwoners lopend"])])
                .range([0, graphWidth])
                .nice();

  var min = d3v5.min(data, d => d["Tot per 100.000 inwoners lopend"]);
  var max = d3v5.max(data, d => d["Tot per 100.000 inwoners lopend"]);

  // Set variables for colors
  var low = Math.round((max-min) * (1 / 3));
  var middle = Math.round((max-min) * (2 / 3));
  var high = Math.round((max-min));

  // Set color scale for circles
  var colorScale = d3v5.scaleThreshold()
                      .domain([low, middle, high])
                      .range(colorbrewer.Blues[5]);

  var tooltip = d3v5.select('.scatter')
    .append('div')
    .attr('class', 'tooltip');

  // Create circles
  var dot = graph.selectAll("circle")
                  .data(data);

  dot.enter()
      .append("circle")
      .attr("class", "dot")
      .attr("r", "10")
      .attr("cx", d => xScale(d["Tot per 100.000 inwoners lopend"]))
      .attr("cy", d => yScale(d["65+ totaal"]))
      .attr("fill", d => colorScale(d["Tot per 100.000 inwoners lopend"]))
      .on('mouseover', function(d, i) {
        tooltip.transition()
        .duration(0)
        .style("opacity", .9);
        tooltip.style("left", (d3v5.event.pageX) + "px")
        tooltip.style("top", (d3v5.event.pageY) + "px")
        tooltip.html(function(){
           return "Province: " + d.Regios + "<br>Total dementia patient: " + d["Tot per 100.000 inwoners lopend"] +
           "<br>Aging rate: " + d["65+ totaal"];
        });
        })
      .on('mouseout', function(d, i) {
        tooltip.transition()
        .duration(0)
        .style("opacity", 0)
        .style("left", (d3v5.event.pageX) + "px")
        .style("top", (d3v5.event.pageY + 10) + "px");
      })
      .on("click", function(d){
        var year = d.Perioden
        updateLine(dataLine, d.Regios)
        updatePie(year, dataPieChart, d.properties.name)
      });


    // Create and call the axes
    var x = d3v5.axisBottom(xScale);
    var y = d3v5.axisLeft(yScale);

    xAxis.call(x);
    yAxis.call(y);

    // Add text to the graph
    svg_scatterplot.append("text")
                    .attr("x", width / 2.5)
                    .attr("y", 0 + 20)
                    .attr("class", "title")
                    .text("Scatterplot for year " + selected_year)

    svg_scatterplot.append("text")
                  .attr("x", -300)
                  .attr("y", 15)
                  .attr("transform", "rotate(-90)")
                  .text("Aging rate");

  svg_scatterplot.append("text")
  .attr("x", width / 2)
  .attr("y", 530)
  .text("Number of people with dementia");

  addLegendScatter(colorScale);

};


function addLegendScatter(color){

  var legendMarginTop  = 50;
  var legendMarginLeft = 30;
  var legendWidth  = 250;
  var legendHeight = 150;

  var svg = d3v5.selectAll(".scatterplot")

  var legend = svg.append('g')
      .attr('width', 250)
      .attr('height', 150)
      .attr("transform", "translate(" + 30 + "," + 50 + ")");

  var legends = legend.selectAll(".scatterplot")
      .data(color.domain())
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // draw legend colored rectangles
  legends.append("rect")
      .attr("x", 530)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", color);

  // draw legend text
  legends.append("text")
      .attr("x", 480)
      .attr("y", 5)
      .attr("dy", ".35em")
      .style("font-size", 12)
      .text(function(d, i){
        if (i == 0){
          return "Low"
        }
        if (i == 1){
          return "Middle"
        }
        if (i == 2){
          return "High"
        }
        });
}

/*
This function will update the scatterplot with new data, according to the menu's
that the use can click on.
*/
function updateScatter(val, gender, age, data = globaldata[0]){

  var svg_scatterplot = d3v5.selectAll(".scatterplot");
  var graph = d3v5.selectAll(".svg_scatter");
  var xAxis = d3v5.selectAll("xax");
  var yAxis = d3v5.selectAll("yax");
  //
  //Width and height
  var width = 600;
  var height = 600;

  // Create margins and dimensions for the graph
  var margin = {top: 40, right: 40, bottom: 120, left: 90};
  var graphWidth = width - margin.left - margin.right;
  var graphHeight = height - margin.top - margin.bottom;

  // Set scales x and y and padding if necessary
  var yScale = d3v5.scaleLinear()
                .domain([d3v5.min(data[val], d => d[age]), d3v5.max(data[val], d => d[age])])
                .range([graphHeight, 0])
                .nice();

  var xScale = d3v5.scaleLinear()
                .domain([d3v5.min(data[val], d => d[gender]), d3v5.max(data[val], d => d[gender])])
                .range([0, graphWidth])
                .nice();

  // Set variables for colors
  var low = Math.round(d3v5.max(data, d => d["Tot per 100.000 inwoners lopend"]) * (1/3));
  var middle = Math.round(d3v5.max(data, d => d["Tot per 100.000 inwoners lopend"]) * (2/3));
  var high = Math.round(d3v5.max(data, d => d["Tot per 100.000 inwoners lopend"]));

  // Set color scale for circles
  var colorScale = d3v5.scaleThreshold()
                      .domain([low, middle, high])
                      .range(colorbrewer.Blues[5]);

 update_title = svg_scatterplot.selectAll(".title")
                    .text("Scatterplot for year " + val);

  // Join new data
  var dot = graph.selectAll(".dot")
                    .data(data[val]);

  var tip = graph.selectAll("tip");

  dot.exit()
      .remove()
      .enter()

  dot.transition()
      .attr("cx", function(d){
        return xScale(d[gender]);})
      .attr("cy", function(d){
        return yScale(d[age]);})

  var tooltip = dot.selectAll(".tooltip");

  tooltip.html(function(){
     return "Province: " + d.Regios + "<br>Total dementia patient: " + d[gender] +
     "<br>Aging rate: " + d[age]
  });

  // Create and call the axes
  var x = d3v5.axisBottom(xScale);
  var y = d3v5.axisLeft(yScale);

  xAxis.call(x);
  yAxis.call(y);

};


/*
This function will create a line chart with default Netherlands. When hovering
over the lines, the values and name of the regios will show up.
*/
function initLine(data){

  var initData;

  // Set default
  Object.values(data).forEach(function(value){
    if(value.name == "Nederland"){
      initData = [value]
    }
  })

  var width = 500;
  var height = 400;
  var margin = 80;

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
    .domain(d3v5.extent(initData[0].values, d => d.x))
    .range([0, width-margin]);

  var yScale = d3v5.scaleLinear()
    .domain([0, d3v5.max(initData[0].values, d => d.y)])
    .range([height-margin, 0]);

  /* Add SVG */
  var svg = d3v5.select(".prognose").append("svg")
    .attr("class", "svg_prognose")
    .attr("width", (width+margin)+"px")
    .attr("height", (height+margin)+"px")
    .append('g')
    .attr("transform", `translate(${margin}, ${margin})`);

  // Add a line to the svg
  var line = d3v5.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));

  let lines = svg.append('g')
    .attr('class', 'lines');

  lines.selectAll('.line-group')
    .data(initData).enter()
    .append('g')
    .attr('class', 'line-group')
    .on("mouseover", function(d) {
        svg.append("text")
          .attr("class", "title-text")
          .style("fill", "steelblue")
          .text(d.name)
          .attr("text-anchor", "middle")
          .attr("x", (width-margin) / 1.5)
          .attr("y", 100);
      })
    .on("mouseout", function(d) {
        svg.select(".title-text").remove();
      })
    .append('path')
    .attr('class', 'line')
    .attr('d', d => line(d.values))
    .style('stroke', "steelblue")
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

  let circles = svg.append('g')
    .attr('class', 'circles');

  // Add circles to the line
  circles.selectAll("circle")
    .data(initData[0].values).enter()
    .append("g")
    .attr("class", "circletext")
    .on("mouseover", function(d) {
        d3v5.select(this)
          .style("cursor", "pointer")
          .append("text")
          .attr("class", "text")
          .text(`${d.y}`)
          .attr("x", d => xScale(d.x) + 5)
          .attr("y", d => yScale(d.y) - 10)
      })
    .on("mouseout", function(d) {
        d3v5.select(this)
          .style("cursor", "none")
          .transition()
          .duration(duration)
          .selectAll(".text").remove();
      })
    .append("circle")
    .attr("class", "circles")
    .attr("cx", d => xScale(d.x))
    .attr("cy", d => yScale(d.y))
    .attr("r", circleRadius)
    .style("fill", "steelblue")
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

  // Add axis
  var xAxis = d3v5.axisBottom(xScale)
                  .ticks(5)
                  .tickFormat(d3v5.format("d"));
  var yAxis = d3v5.axisLeft(yScale).ticks(5);

  // Add text
  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height-margin})`)
    .call(xAxis);

  svg.append("g")
    .attr("class", "y-axis")
    .call(yAxis)

  svg.append("text")
      .attr("x", width / 3)
      .attr("h", 10)
      .attr("class", "titleScatter")
      .text("Prognose for " + initData[0].name)

  svg.append('text')
    .attr("x", -260)
    .attr("y", -60)
    .attr("transform", "rotate(-90)")
    .text("Number of people with dementia")

  svg.append("text")
      .attr("x", 350)
      .attr("y", 360)
      .text("Years");
};


/*
This function will update the line chart for each province.
*/
function updateLine(data, province){

  var updateData;

  // Get the name of the province
  Object.values(data).forEach(function(value){
    if(value.name == province){
      updateData = [value]
    }
  });

  var width = 500;
  var height = 400;
  var margin = 80;

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

  // Select the classes for changes
  var svg = d3v5.selectAll(".svg_prognose");
  var lines = svg.selectAll(".line-group");
  var linedraw = lines.selectAll("path");
  var circle_text = svg.selectAll(".circletext")
  var circles = svg.selectAll("circle");
  var xax = svg.selectAll(".x-axis");
  var yax = svg.selectAll(".y-axis");

  // Scale
  var xScale = d3v5.scaleLinear()
    .domain(d3v5.extent(updateData[0].values, d => d.x))
    .range([0, width-margin]);

  var yScale = d3v5.scaleLinear()
    .domain([0, d3v5.max(updateData[0].values, d => d.y)])
    .range([height-margin, 0]);

  // Add axis
  var xAxis = d3v5.axisBottom(xScale)
                  .ticks(5)
                  .tickFormat(d3v5.format("d"));
  var yAxis = d3v5.axisLeft(yScale).ticks(5);

  // Add lines
  var line = d3v5.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));

  xax.transition()
      .duration(750)
      .call(xAxis)

  yax.transition()
      .duration(750)
      .call(yAxis);

  var updateLineText = lines.data(updateData);

  updateLineText.exit()
        .remove()
        .enter();

  updateLineText.transition()
        .duration(750);

  var lineUpdate = linedraw.data(updateData);

  lineUpdate.exit()
          .remove()
          .enter();

  lineUpdate.transition()
          .duration(750)
          .attr("d", d=>line(d.values));

  var updateCircleText = circle_text.data(updateData[0].values);

  updateCircleText.exit()
        .remove()
        .enter();

  updateCircleText.transition()
        .duration(750);

  circles.data(updateData[0].values);
  circles.exit()
         .remove()
         .enter();

  circles.transition()
          .duration(750)
          .attr("cx", d => xScale(d.x))
          .attr("cy", d => yScale(d.y));

  updateTitle = svg.select(".titleScatter")
                    .text("Prognose for " + updateData[0].name)
};


/*
This function will create a pie chart with default Netherland, for the different age categories. When
hovering over the different parts, the prevalence for each group will be seen.
*/
function initPiechart(data){

  var initData;
  var initName;

  Object.values(data).forEach(function(value){
    if(value.Regios == "Nederland"){
      initData = [value]
      initName = value.Regios
    }
  })

  // Create array of objects of search results to be used by D3
   var data_use = [];
   for(var key in initData) {
     var val = initData[key];
     data_use.push({
       "0-20": val["0-20"],
       "20-40": val["20-40"],
       "40-60": val["40-60"],
       "60-80": val["60-80"],
       "80-ouder": val["80-ouder"]
     });
   }
   // Set the dimensions and margins of the graph
   var width = 550
       height = 400
       margin = 40

   // The radius of the pieplot
   var radius = Math.min(width, height) / 2 - margin

   // append the svg object
   var svg = d3v5.select(".pie")
     .append("svg")
     .attr("class", "svg_pie")
       .attr("width", width)
       .attr("height", height)
     .append("g")
       .attr("transform", "translate(" + width / 1.8 + "," + height / 1.7 + ")");

   // set the color scale
   var colorScale = d3v5.scaleOrdinal()
                         .domain(data_use[0])
                         .range(colorbrewer.Blues[5]);

   var tooltip = d3v5.select('.pie')
                     .append('div')
                     .attr('class', 'tooltip');

   // Compute the position of each group on the pie
   var pie = d3v5.pie()
                  .value(function(d) {return d.value; })
   var data_ready = pie(d3v5.entries(data_use[0]))

   // Build the pie chart
   svg
     .selectAll('path')
     .data(data_ready)
     .enter()
     .append('path')
     .attr("id", "pathPie")
     .attr('d', d3v5.arc()
       .innerRadius(0)
       .outerRadius(radius)
     )
     .attr('fill', function(d){ return(colorScale(d.data.key)) })
     .attr("stroke", "black")
     .style("stroke-width", "2px")
     .style("opacity", 0.7)
     .on('mouseover', function(d, i) {
       tooltip.transition()
       .duration(200)
       .style("opacity", .9);
       tooltip.style("left", (d3v5.event.pageX) + "px")
       tooltip.style("top", (d3v5.event.pageY) + "px")
       tooltip.html(function(){
          return "Leeftijd: " + d.data.key + "<br> Aantal: " + d.data.value + "</br>";
       });
     })
     .on('mouseout', function(d, i) {
       tooltip.transition()
       .duration(100)
       .style("opacity", 0)
       .style("left", (d3v5.event.pageX) + "px")
       .style("top", (d3v5.event.pageY - 28) + "px");
     });

   svg.append("text")
        .attr("id", "titlePie")
         .attr("x", -60)
         .attr("y", 0 - 200)
         .text("Pie chart: " + initName)

   // again rebind for legend
   var legend = svg.selectAll(".legend")
                   .data(pie(data_ready))
                   .enter().append("g")
                   .attr("transform", function(d,i){
                     return "translate(" + 220 + "," + (i * 15 - 180) + ")";
                   })
                   .attr("class", "legend");

    //Make color rect
   legend.append("rect")
           .attr("width", 10)
           .attr("height", 10)
           .attr("fill", function(d, i) {
             return colorScale(i);
           });

      //Add text to the legend
       legend.append("text")
             .attr("y", 10)
             .attr("x", -50)
             .style("font-size", 12)
             .text(function(d, i){
               if (i == 0){
                 return "0-20"
               }
               if (i == 1){
                 return "20-40"
               }
               if (i == 2){
                 return "40-60"
               }
               if (i == 3){
                 return "60-80"
               }
               if (i == 4){
                 return "80-older"
               }
             });
}


/*
This function will update the pie chart for each province when clicked on
the province in the map.
*/
function updatePie(year, data, provinces = "Nederland"){

  var initData;
  var initName;

  Object.values(data[year]).forEach(function(value){
    if(value.Regios == provinces){
      initData = [value]
      initName = value.Regios
    }
  });

  // Create array of objects of search results to be used by D3
   var data_use = [];
   for(var key in initData) {
     var val = initData[key];
     data_use.push({
       "0-20": val["0-20"],
       "20-40": val["20-40"],
       "40-60": val["40-60"],
       "60-80": val["60-80"],
       "80-ouder": val["80-ouder"]
     });
   }

   // set the dimensions and margins of the graph
   var width = 400
       height = 400
       margin = 40

   // The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
   var radius = Math.min(width, height) / 2 - margin

   var svg = d3v5.select("svg_pie")
                  .data(initData);

  // set the color scale
  var colorScale = d3v5.scaleOrdinal()
                        .domain(data_use[0])
                        .range(colorbrewer.Blues[5]);

  // Compute the position of each group on the pie:
  var pie = d3v5.pie()
                .value(function(d) {return d.value; })

  var dataUpdate = pie(d3v5.entries(data_use[0]))

  var updatePie = d3v5.selectAll("#pathPie").data(dataUpdate);

  updatePie.exit()
          .remove()
          .enter();

  updatePie.transition()
            .duration(750)
            .attr('d', d3v5.arc()
              .innerRadius(0)
              .outerRadius(radius)
            )
            .attr('fill', function(d){ return(colorScale(d.data.key)) })

  var svgpie = d3v5.selectAll(".svg_pie")
  updateText = svgpie.selectAll("#titlePie")
                  .text("Pie chart: " + initName);

}


/*
These functions will act on the radio buttons/dropdown menus.
*/
function showSelect() {
    var select = document.getElementById('Gender1');
    select.className = 'show';
    var onselect = document.getElementById('Gender2');
    onselect.className = 'hide';
}

function showSelect2(){
  var onselect = document.getElementById('Gender1');
  onselect.className = 'hide';
  var select2 = document.getElementById('Gender2');
  select2.className = 'show';
}

function showSelectYear(){
  var select = document.getElementById('year');
  select.className = 'show';
}


/*
This function will reload the page.
*/
function reload(){
  location.reload();
}
