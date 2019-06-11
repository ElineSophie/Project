window.onload = function loadData(){
  d3.json("../../data/types/types.json").then(data => {
    piechart(data);
  });
};

function piechart(data){
  var width = 450;
  var height = 450;
  var margin = 40;

  console.log(data);
  var radius = Math.min(width, height) / 2 - margin

  console.log(data.Type);

  var svg = d3.select("#piechart")
              .append("svg")
              .attr("width", width)
              .attr("height", height)
              .append("g")
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // Set the color scale
    var color = d3.scaleOrdinal()
                .domain(data.Type)
                .range(d3.schemeSet2);

    // Compute the position of each group on the pie
    var pie = d3.pie()
                .value(function(d) { return d.Prevalence; })
    var data_ready = pie(d3.entries(data.Type))
    var data_ready1 = pie(d3.entries(keys))

    // Shape helper to build arcs
    var arcGenerator = d3.arc()
                        .innerRadius(0)
                        .outerRadius(radius);

    // Create the pie chart
    svg.selectAll("mySlices")
        .data(data_ready)
        .enter()
        .append("path")
          .attr("d", d3.arc()
                      .innerRadius(100)
                      .outerRadius(radius)
            )
          .attr("fill", function(d) { return(color(d.data.key)) })
          .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0,7);




 // var color = d3.scaleOrdinal(["red","orange","black",
 //       "green","yellow","pink", "blue", "lightblue"]);

  // var pie = d3.pie()
  //             .value(d => d.Prevalence);
  //
  // var data_ready = pie(d3.entries(data));

  // svg
  //   .selectAll('svg')
  //   .data(data_ready)
  //   .enter()
  //   .append('path')
  //   .attr('d', d3.arc()
  //     .innerRadius(0)
  //     .outerRadius(radius)
  //   )
  //   .attr('fill', function(d){ return(color(d.data.key)) })
  //   .attr("stroke", "black")
  //   .style("stroke-width", "2px")
  //   .style("opacity", 0.7);

  // var arc = d3.arc()
  //             .innerRadius(0)
  //             .outerRadius(radius);

}
