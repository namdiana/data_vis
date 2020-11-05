// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 1000 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;
y_step = height / 110
var step = width/6
var first_point = step * 0.75 + 5
var point1 = first_point
var point2 = point1 + step
var colors = ["#F08080", "#FFB6C1","LightYellow", "#E6E6FA", "#E0FFFF", "#FFDAB9"]

var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

let y_dot = 0
for (let i = 0; i < 6; i++){
  svg.append("circle").attr("cx",width - 80).attr("cy",y_dot).attr("r", 6).style("fill", colors[i])
  svg.append("text").attr("x", width  - 70).attr("y", y_dot).text("Soziv #" + (i + 1)).style("font-size", "15px").attr("alignment-baseline","middle")
  y_dot = y_dot + 30
}

const DATA1 = [
        {id:1, name:"male_1"},
        {id:2, name:"female_1"},
        {id:3, name:"male_2"},
        {id:4, name:"female_2"},
        {id:5, name:"male_3"},
        {id:6, name:"female_3"},
        {id:7, name:"male_4"},
        {id:8, name:"female_4"},
        {id:9, name:"male_5"},
        {id:10, name:"female_5"},
        {id:11, name:"male_6"},
        {id:12, name:"female_6"}
      ]
var X_px = 0;
var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(DATA1.map(function(d) { return d.name; }))
        .padding(0.2);
svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");


// Parse the Data
for (let number = 1; number <= 6; number ++){ 
// X axis
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
        {id:1, Value: male, name:"male_" + number, proc: male * 100 / (male + female)},
        {id:2, Value: female, name:"female_" + number, proc: female * 100 / (male + female)}
      ]
      console.log('DATA '+DATA[0].proc)

      svg.selectAll("mybar")
      .data(DATA)
      .enter()
      .append("rect")
        .attr("x", function(d) { return x(d.name); })
        .attr("y", function(d) { return y(d.Value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.Value); })
        .attr("fill", colors[number - 1])

      svg.selectAll("mybar")
        .data(DATA) 
        .enter()
        .append("text")
        .attr("class","info")
        .attr("x", function(d) { return x(d.name); })
        .attr("y", function(d) { return y(d.Value) - 5; }) 
        .append("tspan")
        .text((d)=>d.proc.toFixed(3) + "%")

  })

      X_px = X_px + 50
    // Add Y axis
      var y = d3.scaleLinear()
        .domain([0, 110])
        .range([ height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y));
}


for (let number = 1; number <= 6; number ++){
  d3.json("convertcsv.json").then((data1)=>{
    if (number < 6) {
      var male = 0
      var female = 0
      var malenew = 0
      var femalenew = 0
        for (var i = 0; i < data1.length; i++) {
          if (data1[i].D == number){
            if (data1[i].E == 0){
              male = male+1
            }
            if (data1[i].E == 1){
              female = female+1
            }
          }
          if (data1[i].D == number + 1){
            if (data1[i].E == 0){
              malenew = malenew+1
            }
            if (data1[i].E == 1){
              femalenew = femalenew+1
            }
          }
        }

      var numbernew = number + 1
      const DATA = [
        {id:1, Value: male, name:"male_" + number, proc: male * 100 / (male + female)},
        {id:2, Value: female, name:"female_" + number, proc: female * 100 / (male + female)}
      ]     
      const DATA_next = [
          {id:1, Value: malenew, name:"male_" + numbernew},
          {id:2, Value: femalenew, name:"female_" + numbernew}
        ]

      y1_female = DATA[1].Value
      y2_female = DATA_next[1].Value
      console.log('y1_female ' + y1_female)
      let color = "green"
      if (y1_female > y2_female){
        color = "red"
      }
      svg
        .append("line")
        .attr("x1", point1)
        .attr("y1",height - y_step * y1_female)
        .attr("x2",point2)
        .attr("y2",height - y_step *  y2_female)
        .style("stroke", color) 
        .style("stroke-width", "3px") 

      point1 = point2
      point2 = point2 + step - margin.top * 0.105
      console.log(point2)  
    }
  })
}

