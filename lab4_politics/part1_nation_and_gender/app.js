
let soziv1 = []
let soziv2 = []
let soziv3 = []
let soziv4 = []
let soziv5 = []
let soziv6 = []
for (let number = 1; number <= 6; number ++){ 
  d3.json("convertcsv.json").then((data1)=>{
    var kaz = 0
    var rus = 0
    var kau = 0
    var kor = 0
    var ot = 0
    console.log(data1.length)
    for (var i = 0; i < data1.length; i++) {
      if (data1[i].D == number){
        if (data1[i].F == 0){
          kaz = kaz+1
        }
        if (data1[i].F == 1){
          rus = rus+1
        }
        if (data1[i].F == 2){
          kau = kau+1
        }
        if (data1[i].F == 3){
          kor = kor+1
        }
        if (data1[i].F == 4){
          ot = ot+1
        }      
      }
    }
    var width = 250
    height = 250
    margin = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin


// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg.append("text")
        .attr("x", 0)             
        .attr("y", 0 - 100 )
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("The " + number + " soziv");

// Create dummy data

  var data = {"kaz": kaz, "rus": rus, "kau":kau, "kor":kor, "other":ot}
  console.log()
  // set the color scale
  var color = d3.scaleOrdinal()
    .domain(data)
    .range(d3.schemeSet2);

  // Compute the position of each group on the pie:
  var pie = d3.pie()
    .value(function(d) {return d.value; })
  var data_ready = pie(d3.entries(data))
  // Now I know that group A goes from 0 degrees to x degrees and so on.

  // shape helper to build arcs:
  var arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(radius)

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svg
    .selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('path')
      .attr('d', arcGenerator)
      .attr('fill', function(d){ return(color(d.data.key)) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
      .transition()

  // Now add the annotation. Use the centroid method to get the best coordinates
  svg
    .selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('text')
    .text(function(d){ return d.data.key})
    .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
    .style("text-anchor", "middle")
    .style("font-size", 17)
  });
  }

  for (let number = 1; number <= 6; number ++){ 
    d3.json("convertcsv.json").then((data1)=>{

      var male = 0
      var female = 0
      for (var i = 0; i < data1.length; i++) {
        if (data1[i].D == number){
          if (data1[i].E == 0){
            male = male+1
          }
          if (data1[i].E == 1){
            female = female+1
          }
        }
      }

  const DATA = [
    {id:1, Value: male, name:"male"},
    {id:2, Value: female, name:"female"}
  ]
console.log(DATA)
// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 250 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(DATA.map(function(d) { return d.name; }))
  .padding(0.2);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 110])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

// Bars
svg.selectAll("mybar")
  .data(DATA)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.name); })
    .attr("y", function(d) { return y(d.Value); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.Value); })
    .attr("fill", "#69b3a2")

})
  };







