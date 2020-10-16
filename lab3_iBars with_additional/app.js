var margin = 200;
var svg = d3.select("svg");
var width = svg.attr("width") - margin;
var height = svg.attr("height") - margin;

svg.append("text")
.attr("transform","translate(100,0)")
.attr("x",50)
.attr("y",50)
.attr("class","title")
.text("Suicide Reasons Japan");

var xScale = d3.scaleBand().range([0, width]).padding(0.4);
var yScale = d3.scaleLinear().range([height,0]);

var g = svg.append("g");
g.attr("transform","translate(100,180)");

var data = [
  {id: 0, year:2010, work: 16, kharakiri: 15, anime: 7},
  {id: 1, year:2011, work: 10, kharakiri: 11, anime: 4},
  {id: 2, year:2012, work: 12, kharakiri: 0, anime: 3},
  {id: 3, year:2013, work: 13, kharakiri: 5, anime: 7},
  {id: 4, year:2014, work: 11, kharakiri: 1, anime: 2},
  {id: 5, year:2016, work: 35, kharakiri: 2, anime: 1},
  {id: 6, year:2017, work: 17, kharakiri: 3, anime: 1},
  {id: 7, year:2019, work: 15, kharakiri: 2, anime: 1},
];

xScale.domain(data.map(function(d) { return d.year;}));
yScale.domain([0,d3.max(data, function(d) {
  d.val = d.work +  d.kharakiri + d.anime;
  return d.val;})
]);



g.append("g")
.attr("transform","translate(0,"+height+")")
.call(d3.axisBottom(xScale));


g.append("g")
.call(d3.axisLeft(yScale));

function onMouseOver(d,i) {
  d3.select(this)
    .attr('class','highlight');

  d3.select(this)
  .transition()
  .duration(500)
  .attr('width', xScale.bandwidth()+5)
  .attr("y", (d)=>yScale(d.val)-10)
  .attr("height", (d)=>height-yScale(d.val)+10)

  g.selectAll("#info"+i.id)
  .attr("visibility", "visible") //make text with selected id visible

}


function onMouseOut(d,i) {
  d3.select(this)
  .attr('class','bar');

  d3.select(this)
  .transition()
  .duration(500)
  .attr('width', xScale.bandwidth())
  .attr("y", (d)=>yScale(d.val))
  .attr("height", (d)=>height-yScale(d.val));

  g.selectAll('.info')
  .attr("visibility", "hidden") //make all info blocks hidden
  }





g.selectAll(".bar")
.data(data)
.enter()
.append("rect")
.attr("class","bar")
.on("mouseover", onMouseOver)
.on("mouseout", onMouseOut)
.attr("x", (d)=>xScale(d.year))
.attr("y", (d)=>yScale(d.val))
.attr("width", xScale.bandwidth())
.transition()
.ease(d3.easeLinear)
.duration(500)
.delay((d,i)=>i*50)
.attr("height", (d)=>height-yScale(d.val));




//block with additional text information
g.selectAll(".info")
  .data(data) 
  .enter()
  .append("text")
  .attr("class","info")
  .attr("x", (d)=>(xScale(d.year)+5))
  .attr("y", (d)=>yScale(d.val + 2))
  .attr("transform", (d)=>"rotate(-90, "+(xScale(d.year)+15)+","+yScale(d.val + 2)+")") //rotate it to make vertical
  .attr("visibility", "hidden") //not show before mouse over
  .attr("id", (d)=>"info"+d.id) //generate id to show only text with specific id in function 
  .append("tspan")
  .text((d)=>"work:" + d.work + " harakiri" +d.kharakiri+ "anime:" + d.anime)

