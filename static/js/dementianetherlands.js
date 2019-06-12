window.onload = function loadData(){
  datamaps();

  d3v5.json("../../data/netherlands/datanetherlands.json").then(data => {
    console.log(data);

    // Remove netherlands in dataset
    for (d in data){
        data[d].shift();
      };

    scatterplot(data["2012"]);
    document.getElementById("year").onchange = function(){
      var year = this.value
    scatterplot(data[year])
  }
  });
};

function datamaps(){
  var w = 550;
  var h = 550;

  var colour = d3v3.scale.category20();

  var projection = d3v3.geo.mercator()
      .scale(1)
      .translate([0, 0]);

  var path = d3v3.geo.path()
      .projection(projection);

  var datamap = d3v5.select("#map")
      .attr("width", w)
      .attr("height", h);

// Create margins and dimensions for the graph
  var margin = {top: 20, right: 20, bottom: 80, left: 80};
  var graphWidth = w - margin.left - margin.right;
  var graphHeight = h - margin.top - margin.bottom;

  // Append a group to svg and save as graph
  var graph = datamap.append('g')
                .attr("width", graphWidth)
                .attr("height", graphHeight)
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

  d3v3.json("../../data/netherlands/nld.json", function(error, nld) {

      var l = topojson.feature(nld, nld.objects.subunits).features[3],
          b = path.bounds(l),
          s = .2 / Math.max((b[1][0] - b[0][0]) / graphWidth, (b[1][1] - b[0][1]) / graphHeight),
          t = [(graphWidth - s * (b[1][0] + b[0][0])) / 2, (graphHeight - s * (b[1][1] + b[0][1])) / 2];

      projection
          .scale(s)
          .translate(t);

      graph.selectAll("path")
          .data(topojson.feature(nld, nld.objects.subunits).features).enter()
          .append("path")
          .attr("d", path)
          .attr("fill", function(d, i) {
            console.log(20);
              return colour(i);
          })
          .attr("class", function(d, i) {
              return d.properties.name;
          });
  });
}

function scatterplot(data){

  // Remove any previous graphs
  d3v5.selectAll("#scatterplot")
    .remove();

  //Width and height
  var w = 500;
  var h = 500;

  // Create svg
  var svg_scatterplot = d3v5.select("body")
                          .append("svg")
                          .attr("width", w)
                          .attr("height", h);

  // Create margins and dimensions for the graph
  var margin = {top: 40, right: 40, bottom: 120, left: 90};
  var graphWidth = w - margin.left - margin.right;
  var graphHeight = h - margin.top - margin.bottom

  // Append a group to svg and save as graph
  var graph = svg_scatterplot.append('g')
                .attr("width", graphWidth)
                .attr("height", graphHeight)
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // Create groups for x and y
  var xAxis = graph.append('g')
                    .attr('transform', `translate(0, ${graphHeight})`);

  var yAxis = graph.append('g');

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
      .attr("r", "5")
      .attr("cx", d => xScale(d["Totaal aantal lopend"]))
      .attr("cy", d => yScale(d["65+ totaal"]));

    // Create and call the axes
    var x = d3v5.axisBottom(xScale);
    var y = d3v5.axisLeft(yScale);

    xAxis.call(x);
    yAxis.call(y);
  };
