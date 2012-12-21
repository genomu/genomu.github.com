$(document).ready(function(){
  var h = 200;
  var w = 200;
  var data;
  var nodes = [{name: "node 1", color: 0, index: 0},
               {name: "node 2", color: 1, index: 1},
               {name: "node 3", color: 2, index: 2},
               {name: "node 4", color: 3, index: 3},
               {name: "node 1", color: 0, index: 4},
               {name: "node 2", color: 1, index: 5},
               {name: "node 3", color: 2, index: 6},
               {name: "node 4", color: 3, index: 7},
               {name: "node 1", color: 0, index: 8},
               {name: "node 2", color: 1, index: 9},
               {name: "node 3", color: 2, index: 10},
               {name: "node 4", color: 3, index: 11},
  ];

  var colors = d3.scale.category10();

  var pie = d3.layout.pie().value(function() { return 1; })
              .sort(function(i, j) { return j.index - i.index;});

  var svg = d3.select("#ring-canvas").append("svg").
               attr("width", w).attr("height", h)
               .data([nodes]);

  var ring = d3.svg.arc().innerRadius(75).outerRadius(50);

  var arcs = svg.selectAll("g.ring-element")
    .data(pie)
    .enter()
        .append("svg:g").attr("class", "slice")


  arcs.attr("transform", "translate(" + w / 2 + ", " + h / 2 +")")

   arcs.append("svg:path")
            .attr("fill", function(d, i) { return colors(d.data.color); } )
            .attr("stroke", function(d, i) { return colors(d.data.color); } )
            .attr("ring-seg", function(d, i) { return d.data.color; } )
            .attr("fill-opacity", "0.55")
            .attr("stroke-opacity","0")
            .attr("d", ring)
        .on("mouseover", function() {
            els = 'path[ring-seg="'+$(this).attr('ring-seg')+'"]';
            d3.selectAll(els)
              .transition()
              .duration(500)
              .attr("fill-opacity","1")
        })
        .on("mouseout", function() {
            els = 'path[ring-seg="'+$(this).attr('ring-seg')+'"]';
            d3.selectAll(els)
              .transition()
              .attr("fill-opacity","0.55")
        })

});