window.onload = function(){
  datamaps()
}

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
