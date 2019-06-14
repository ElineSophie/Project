window.onload = function loadData(){
  d3.json("../../data/types/types.json").then(data => {
    piechart(data);
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
        .one("mouseout", tooltip.hide);




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
