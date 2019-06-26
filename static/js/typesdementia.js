window.onload = function loadData(){
  d3.json("../../data/types/types.json").then(data => {
    piechart(data);
  });
};


/*
This function will draw a piechart for the types of dementia.
*/
function piechart(data){

  keys = Object.keys(data);
  values = Object.values(data);

  // Make list for prevalence rates
  prevalence = [];
  values.forEach(function(d){
    pre = d.Prevalence;
    prevalence.push(pre)
  })

  var width = 500;
  var height = 500;
  var margin = 80;

  // Make a dictionary
  var dict = {};
  for (i=0; i < keys.length; i++){
    dict[String(keys[i])] = prevalence[i];
  };

  var radius = Math.min(width, height) / 2 - margin

  var svg = d3.select(".piechart")
              .append("svg")
              .attr("width", width)
              .attr("height", height)
              .append("g")
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // Set the color scale
  var colorScale = d3.scaleOrdinal()
                .domain(values.length)
                .range(d3.schemePaired);

  // Compute the position of each group on the pie
  var pie = d3.pie()
              .value(d => d.value);

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
        .attr("fill", function(d) { return(colorScale(d.data.value)) })
        .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0,7)
      .on("mouseover", tooltip.show)
      .on("mouseout", tooltip.hide);


  svg.append("text")
      .attr("x", -80)
      .attr("y", -200)
      .text("Different types of dementia");
};
