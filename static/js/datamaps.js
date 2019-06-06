window.onload = function(){
  datamaps()
}

function datamaps(){
  var width = 960;
  var height = 550;

  var colour = d3v3.scale.category20();

  var projection = d3v3.geo.mercator()
      .scale(1)
      .translate([0, 0]);

  var path = d3v3.geo.path()
      .projection(projection);

  var svg = d3v5.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);

  d3v3.json("../../data/netherlands/nld.json", function(error, nld) {

    console.log(20);

      var l = topojson.feature(nld, nld.objects.subunits).features[3],
          b = path.bounds(l),
          s = .2 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
          t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

      projection
          .scale(s)
          .translate(t);

      svg.selectAll("path")
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
