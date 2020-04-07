<template>
  <div>
    <div class="graphArea">
      <v-container>
        <!-- place all the svg stuff inside js, then append to class -->
        <div class="canvas"></div>
      </v-container>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import firebase from "firebase/app";
import "firebase/firestore";
const yourData = firebase.firestore();

// data must be array
export default {
  mounted() {
    const svg = d3
      .select(this.$el)
      .select(".canvas")
      .append("svg")
      .attr("width", 900)
      .attr("height", 600);

    // create margins & dimensions
    const margin = { top: 20, right: 20, bottom: 50, left: 40 };
    const graphWidth = 700 - margin.left - margin.right;
    const graphHeight = 600 - margin.top - margin.bottom;

    const graph = svg
      // append group
      .append("g")
      .attr("width", graphWidth)
      .attr("height", graphHeight)
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xAxisGroup = graph
      .append("g")
      .attr("transform", `translate(0, ${graphHeight})`);
    const yAxisGroup = graph.append("g");

    // scales settings, no need bind with data update
    const y = d3.scaleLinear().range([graphHeight, 0]);
    const x = d3
      .scaleBand()
      .range([0, graphWidth])
      .paddingInner(0.2)
      .paddingOuter(0.2);

    // create the axes
    const xAxis = d3.axisBottom(x);
    const yAxis = d3
      .axisLeft(y)
      .ticks(3)
      .tickFormat(d => d + " %");

    // update function that graph is depends on data.
    const update = data => {
      // update scale domains
      y.domain([0, d3.max(data, d => d.yourData)]);
      x.domain(data.map(d => d.yourData));

      // join data to rects, rects now are in the graph
      const rects = graph.selectAll("rect").data(data);

      // remove exit selection -- remove unwanted elements from DOM
      rects.exit().remove();

      // update current shapes in DOM
      rects
        .attr("width", x.bandwidth)
        .attr("height", data => graphHeight - y(data.yourData))
        .attr("fill", "orange")
        .attr("x", data => x(data.yourData))
        .attr("y", data => y(data.yourData));

      // append the enter selection to the DOM
      rects
        .enter()
        .append("rect")
        .attr("width", x.bandwidth)
        .attr("height", data => graphHeight - y(data.yourData))
        .attr("fill", "orange")
        .attr("x", data => x(data.yourData))
        .attr("y", data => y(data.yourData));

      // add events
      graph
        .selectAll("rect")
        .on("mouseover", this.handleMouseOver)
        .on("mouseout", this.handleMouseOut);

      // call the axes
      xAxisGroup
        .call(xAxis)
        .selectAll("text")
        .call(wrap, x.bandwidth())
        .attr("font-style", "italic");
      yAxisGroup.call(yAxis);
    };

    // get d3Data from firestore
    yourData
      .collection("your_collection")
      .get()
      .then(res => {
        let data = [];
        res.docs.forEach(doc => {
          data.push(doc.data());
        });
        update(data);

        // increase the first bar by 5 every second

        // d3.interval(() => {
        //   data[0].cnt += 5;
        //   // update(data);
        // }, 1000);
      });

    // in xAxis call warp function bellow
    function wrap(text, width) {
      text.each(function() {
        var text = d3.select(this),
          words = text
            .text()
            .split(/\s+/)
            .reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1,
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text
            .text(null)
            .append("tspan")
            .attr("x", 0)
            .attr("y", y)
            .attr("dy", dy + "em");
        while ((word = words.pop())) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text
              .append("tspan")
              .attr("x", 0)
              .attr("y", y)
              .attr("dy", `${++lineNumber * lineHeight + dy}em`)
              .text(word);
          }
        }
      });
    }
  },
  methods: {
    // event handler
    handleMouseOver(d, i, n) {
      d3.select(n[i])
        .transition("changeSliceFill")
        .duration(300)
        .attr("fill", "white");
    },
    handleMouseOut(d, i, n) {
      d3.select(n[i])
        .transition("changeSliceFill")
        .duration(300)
        .attr("fill", "orange");
    }
  }
};
</script>

<style>
svg {
  border: 1px;
  border-color: gray;
  border-style: solid;
}
</style>