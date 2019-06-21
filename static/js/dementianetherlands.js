var globaldata = []
var glob = []

var selected_year = 2009

window.onload = function loadData(){

      // Load in data
    var requests = [d3v5.json("../../data/netherlands/nld.json"),
    d3v5.json("../../data/netherlands/map.json"),
    d3v5.json("../../data/netherlands/datanetherlands.json"),
    d3v5.json("../../data/netherlands/prognose.json"),
    d3v5.json("../../data/netherlands/jaarverdeling.json")];
    Promise.all(requests).then(function(res) {

        dataMaps(res[0], res[1], res[3])
    //
    keys = Object.keys(res[2])
    values = Object.values(res[2])

          // console.log(glob);

        globaldata.push(res[2]);
        globaldata.push(res[1]);
        // updateMap();

        console.log(globaldata);

        // Remove netherlands in dataset
        for (d in res[2]){
            res[2][d].shift();
          };

        initScatter(res[2]["2009"]);
        console.log(res[2]);

        var year = d3v5.select("#year");


        d3v5.select("#year")
            .on("change", function(d){
              updateScatter(this.value);
              updateMap(this.value);
              updatePie(this.value)
            });




        // d3v5.select("#Gender1")
        //     .on("change", function(d){
        //       console.log(this.value);
        //       updateScatter(this.value);
        //     });

        initLine(res[3]);

        initPiechart(res[4]["2009"]);

    }).catch(function(e){
        throw(e);
        });

};

function dataMaps(nld, data, dataLine){
  console.log(data);
  var w = 450;
  var h = 450;

  console.log(dataLine);
  var colour = d3v3.scale.category20();

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
            d3v5.select(this).attr("fill", "yellow");
            tooltip.transition()
            .duration(200)
            .style("opacity", .9);
            tooltip.html(function(){
              point = undefined
              data[d.properties.name].forEach(period=>{
                console.log(selected_year);
                if (period.Perioden == selected_year) {
                   point = period
                   return;
                }})
              // hier kan je de variabele printen die je wilt hebben
              return point["Tot per 100.000 inwoners lopend"]
            })
            .style("left", (d3v5.event.pageX) + "px")
            .style("top", (d3v5.event.pageY - 28) + "px");
          })
      .on("mouseout", function(d){
         d3v5.select("path").attr("fill",function(d, i) {
             return colour(i);});
        tooltip.transition()
        .duration(100)
        .style("opacity", 0)
        .style("left", (d3v5.event.pageX) + "px")
        .style("top", (d3v5.event.pageY - 28) + "px");
      })
      .on("click", function(d){
        updateLine(dataLine, d.properties.name)
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

function updateMap(val, d){
  selected_year = val
};

function initScatter(data){

  // var initData;
  //
  // Object.values(data).forEach(function(value){
  //   console.log(value);
  //   if(value.Regios != "Nederland"){
  //     initData = [value]
  //   }
  //   console.log(value.Regios)
  // })

  // console.log(initData);

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
                .domain([d3v5.min(data[val], d => d["65+ totaal"]), d3v5.max(data[val], d => d["65+ totaal"])])
                .range([graphHeight, 0])
                .nice();

  var xScale = d3v5.scaleLinear()
                .domain([d3v5.min(data[val], d => d["Totaal aantal lopend"]), d3v5.max(data[val], d => d["Totaal aantal lopend"])])
                .range([0, graphWidth])
                .nice();

  // Join new data
  var dot = graph.selectAll("circle")
                    .data(data[val]);

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
    .attr("width", (width+margin)+"px")
    .attr("height", (height+margin)+"px")
    .append('g')
    .attr("transform", `translate(${margin}, ${margin})`);


  /* Add line into SVG */
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
          .style("fill", "green")
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
    .style('stroke', "green")
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
    .data(initData).enter()
    .append("g")
    .style("fill", "green")
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
    .attr("fill", "#000")
    .text("Total values");
};

function updateLine(data, gemeente){

  var updateData;

  Object.values(data).forEach(function(value){
    if(value.name == gemeente){
      updateData = [value]
    }
  });

  console.log(updateData);
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



  var svg = d3v5.selectAll(".prognose");
  var lines = svg.selectAll(".line-group");
  var lines_line = lines.selectAll(".line")
  var circless = svg.selectAll(".circle-group");
  var cir = circless.selectAll(".circle");
  var xax = svg.selectAll(".x-axis");
  var yax = svg.selectAll(".y-axis");


  /* Scale */
  var xScale = d3v5.scaleLinear()
    .domain(d3v5.extent(updateData[0].values, d => d.x))
    .range([0, width-margin]);

  var yScale = d3v5.scaleLinear()
    .domain([0, d3v5.max(updateData[0].values, d => d.y)])
    .range([height-margin, 0]);

    /* Add Axis into SVG */
    var xAxis = d3v5.axisBottom(xScale)
                    .ticks(5)
                    .tickFormat(d3v5.format("d"));
    var yAxis = d3v5.axisLeft(yScale).ticks(5);

    xax.transition()
        .duration(750)
        .call(xAxis)

    yax.transition()
        .duration(750)
        .call(yAxis);

    var update = lines.data(updateData);

    update.exit()
          .remove()
          .enter();

  /* Add line into SVG */
  var line = d3v5.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));

    update.transition()
          .duration(750);
          // .attr("d", d => line(d.values));

  var update2 = lines_line.data(updateData);

  update2.exit()
          .remove()
          .enter();

  update2.transition()
          .duration(750)
          .attr("d", d=>line(d.values))

  update3 = circless.data(updateData);

  update3.exit()
        .remove()
        .enter();

  update4 = cir.data(d => d.values);

  update4.exit()
          .remove()
          .enter();

  update4.transition()
          .duration(750)
          .attr("cx", d => xScale(d.x))
          .attr("cy", d => yScale(d.y))
  //
  // var color = d3v5.scaleOrdinal(d3v5.schemeCategory10);
  //
  // /* Add line into SVG */
  // var line = d3v5.line()
  //   .x(d => xScale(d.x))
  //   .y(d => yScale(d.y));
  //
  //
  // lines.transition()
  //     .duration(750)
  //     .attr("d", line(d => d.value))
  //
  // svg.select(".x-axis")
  //     .duration(750)
  //     .call(xAxis)
  //
  // svg.select(".y-axis")
  //     .duration(750)
  //     .call(yAxis);
};

function initPiechart(data){

  var initData;

  Object.values(data).forEach(function(value){
    if(value.Regios == "Nederland"){
      initData = [value]
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

   console.log(data_use);
   // set the dimensions and margins of the graph
   var width = 450
       height = 450
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
       .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

   // set the color scale
   var color = d3v5.scaleOrdinal()
     .domain(data_use[0])
     .range(["green", "blue", "yellow", "orange", "red"])

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
     .attr('d', d3v5.arc()
       .innerRadius(0)
       .outerRadius(radius)
     )
     .attr('fill', function(d){ return(color(d.data.key)) })
     .attr("stroke", "black")
     .style("stroke-width", "2px")
     .style("opacity", 0.7)
}

function updatePie(val, data){
  var initData;
  console.log(val);

  Object.values(data).forEach(function(value){
    if(value.Regios == "Nederland"){
      initData = [value]
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

   // set the dimensions and margins of the graph
   var width = 450
       height = 450
       margin = 40

   // The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
   var radius = Math.min(width, height) / 2 - margin

   var svg = d3v5.select("svg_pie")
                  .data(data[val])

}


function showSelect() {
    var select = document.getElementById('Gender1');
    select.className = 'show';
    var onselect = document.getElementById('Gender2');
    onselect.className = 'hide';
};

function showSelect2(){
  var select2 = document.getElementById('Gender2');
  select2.className = 'show';
  var onselect = document.getElementById('Gender1');
  onselect.className = 'hide';
};
//
// function selectAgeTotal(){
//   var select = document.getElementById('AgeTot1');
//   select.className = 'show';
//   var onselect = document.getElementById('AgeTot2');
//   onselect.className = 'hide';
//   var on2select = document.getElementById('AgeTot2');
//   on2select.className = 'hide';
// }
