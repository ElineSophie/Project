function dataMaps(nld, data, dataLine, dataPieChart){

  var w = 450;
  var h = 450;

  var colour = d3v3.scale.category20();

  // var max = -Infinity;
  // var min = Infinity;
  //
  // Object.values(data).forEach(function(key){
  //   console.log(key[0]);
  //   if (key[0]["Tot per 100.000 inwoners lopend"] > max){
  //     max = key[0]["Tot per 100.000 inwoners lopend"]}
  //   if (key[0]["Tot per 100.000 inwoners lopend"] < min){
  //     min = key[0]["Tot per 100.000 inwoners lopend"]}
  // })
  //
  // console.log(max);
  // console.log(min);
  //
  // var colour = d3v5.scaleThreshold()
  //                     .domain([(1/3 * max),
  //                              (2/3 * max),
  //                              (max)])
  //                     .range(['red', 'yellow', 'green']);

  // Projection of the map
  var projection = d3v3.geo.mercator()
      .scale(1)
      .translate([0.03,0.02]);

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
            // d3v5.select(this).attr("fill", "yellow");
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
              return "Total per 100.000 inhabitants: " + point["Tot per 100.000 inwoners lopend"]
              // point["Tot per 100.000 inwoners gesloten"]
            })
            .style("left", (d3v5.event.pageX) + "px")
            .style("top", (d3v5.event.pageY - 28) + "px");
          })
      .on("mouseout", function(d){
         // d3v5.select("path").attr("fill",function(d, i) {
         //     return colour(i);});
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

function addLegend(color){

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
      .attr("x", 250 - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  // draw legend text
  legends.append("text")
      .attr("x", 250 - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d});
};

function updateMap(val, d){
  selected_year = val
};

function initScatter(data){
  /*
  This function will draw a scatterplot with default data, namely
  on the x-axis the total ongoing DCT dementia patients and on the y-axis the
  65+ aging rate for men and women in total.
  */

  //Width and height
  var w = 500;
  var h = 500;

  // Create svg
  var svg_scatterplot = d3v5.select(".scatter")
                          .append("svg")
                          .attr("class", "scatterplot")
                          .attr("width", w)
                          .attr("height", h);

  svg_scatterplot.append("text")
                  .attr("x", w / 2)
                  .attr("y", 0 + 20)
                  .attr("class", "title")
                  .text("Scatterplot for year " + selected_year)

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

  var tip = d3v5.select('.svg_scatter')
    .append('text')
    .attr('class', 'tip')
    .html(function(d){
      return "";
    });

  // Create circles
  var dot = graph.selectAll("circle")
                  .data(data);

  dot.enter()
      .append("circle")
      .attr("class", "dot")
      .attr("r", "5")
      .attr("cx", d => xScale(d["Totaal aantal lopend"]))
      .attr("cy", d => yScale(d["65+ totaal"]))
      // .append("g")
      // .class("")
      .on('mouseover', function(d, i) {

        // console.log(d["65+ totaal"]);
        // tip.transition().duration(750);
        // tip.style('top', yScale(d["65+ totaal"]) - 20 + 'px');
        // tip.style('left', xScale(d["Totaal aantal lopend"]) + 'px');
        tip.style('display', 'block')
        tip.attr("x", xScale(d["Totaal aantal lopend"]))
        tip.attr("y", yScale(d["65+ totaal"]))
        tip.html("<tspan x='0' dy='1.2em'> Province: " + d.Regios + "</tspan>" + "<tspan x='0' dy='1.2em'> Total dementia patient: " + d["Totaal aantal lopend"] +
        "</tspan> Aging rate: " + d["65+ totaal"])
      })
      .on('mouseout', function(d, i) {
        tip.transition()
        .delay(500)
        .style('display', 'none');
      });


    // Create and call the axes
    var x = d3v5.axisBottom(xScale);
    var y = d3v5.axisLeft(yScale);

    xAxis.call(x);
    yAxis.call(y);

};

function updateScatter(val, gender, age, data = globaldata[0]){

  var svg_scatterplot = d3v5.selectAll(".scatterplot");
  var graph = d3v5.selectAll(".svg_scatter");
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
                .domain([d3v5.min(data[val], d => d[age]), d3v5.max(data[val], d => d[age])])
                .range([graphHeight, 0])
                .nice();

  var xScale = d3v5.scaleLinear()
                .domain([d3v5.min(data[val], d => d[gender]), d3v5.max(data[val], d => d[gender])])
                .range([0, graphWidth])
                .nice();

 update_title = svg_scatterplot.selectAll("title")
                    .text("Scatterplot for year " + val);

  // Join new data
  var dot = graph.selectAll("circle")
                    .data(data[val]);

  var tip = graph.selectAll("tip");

    dot.exit()
      .remove()
      .enter()

  dot.transition()
    .attr("cx", function(d){
      return xScale(d[gender]);})
    .attr("cy", function(d){
      console.log(d[age]);
      return yScale(d[age]);});

    // Create and call the axes
    var x = d3v5.axisBottom(xScale);
    var y = d3v5.axisLeft(yScale);

    xAxis.call(x);
    yAxis.call(y);

};

function initLine(data){

  var initData;

  Object.values(data).forEach(function(value){
    if(value.name == "Nederland"){
      initData = [value]
    }
  })

  var width = 500;
  var height = 400;
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
          .attr("x", (width-margin)/2)
          .attr("y", 5);
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

  /* Add circles in the line */
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


  /* Add Axis into SVG */
  var xAxis = d3v5.axisBottom(xScale)
                  .ticks(5)
                  .tickFormat(d3v5.format("d"));
  var yAxis = d3v5.axisLeft(yScale).ticks(5);

  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height-margin})`)
    .call(xAxis);

  svg.append("g")
    .attr("class", "y-axis")
    .call(yAxis)
    .append('text')
    .attr("y", 15)
    .attr("transform", "rotate(-90)")
    .attr("fill", "#000");
};

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
};

function initPiechart(data){

  var initData;
  var initName;

  Object.values(data).forEach(function(value){
    if(value.Regios == "Nederland"){
      initData = [value]
      initName = value.Regios
    }
  })

  console.log(initName);
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

   // append the svg object to the div called 'my_dataviz'
   var svg = d3v5.select(".pie")
     .append("svg")
     .attr("class", "svg_pie")
       .attr("width", width)
       .attr("height", height)
     .append("g")
       .attr("transform", "translate(" + width / 1.8 + "," + height / 1.7 + ")");

   // set the color scale
   var color = d3v5.scaleOrdinal()
     .domain(data_use[0])
     .range(["green", "blue", "yellow", "orange", "lightblue"])

   // Compute the position of each group on the pie:
   var pie = d3v5.pie()
     .value(function(d) {return d.value; })
   var data_ready = pie(d3v5.entries(data_use[0]))

   // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
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
     .attr('fill', function(d){ return(color(d.data.key)) })
     .attr("stroke", "black")
     .style("stroke-width", "2px")
     .style("opacity", 0.7)
     .on("mouseover", function(d){
       return d
     });

     svg.append("text")
        .attr("class", "titlePie")
         .attr("x", -40)
         .attr("y", 0 - 200)
         .text("Pie chart: " + initName)
}

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
    var color = d3v5.scaleOrdinal()
      .domain(data_use[0])
      .range(["green", "blue", "yellow", "orange", "lightblue"]);

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
              .attr('fill', function(d){ return(color(d.data.key)) })

  updateText = svg.selectAll(".titlePie");

  updateText.text("Pie chart: " + initName)
}

function showSelect() {
    var select = document.getElementById('Gender1');
    select.className = 'show';
    var onselect = document.getElementById('Gender2');
    onselect.className = 'hide';
};

function showSelect2(){
  var onselect = document.getElementById('Gender1');
  onselect.className = 'hide';
  var select2 = document.getElementById('Gender2');
  select2.className = 'show';
};
