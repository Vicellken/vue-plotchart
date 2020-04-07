<template>
  <div>
    <div class="graphArea">
      <v-container>
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
export default {
  mounted() {
    const dimensions = { height: 300, width: 300, radius: 150 };
    const center = {
      x: dimensions.width / 2 + 5,
      y: dimensions.height / 2 + 5
    };
    const svg = d3
      .select(this.$el)
      .select(".canvas")
      .append("svg")
      .attr("width", dimensions.width + 150)
      .attr("height", dimensions.height + 150);
    const graph = svg
      .append("g")
      .attr("transform", `translate(${center.x},${center.y})`);
    const pie = d3
      .pie()
      .sort(null)
      .value(d => d.yourData);
    const arcPath = d3
      .arc()
      .outerRadius(dimensions.radius)
      .innerRadius(dimensions.radius / 2);
    const colour = d3.scaleOrdinal(d3["schemeSet3"]);
    // update function
    const update = data => {
      // update colour scale domain
      colour.domain(data.filter(d => d.yourData));
      // join enhanched (pie) data to path elements
      const paths = graph.selectAll("path").data(pie(data));
      paths
        .enter()
        .append("path")
        .attr("class", "arc")
        .attr("d", arcPath)
        .attr("stroke", "#fff")
        .attr("stroke-width", 3)
        .attr("fill", d => colour(d.data.yourData));
      graph
        .selectAll("path")
        .on("mouseover", this.handleMouseOver)
        .on("mouseout", this.handleMouseOut)
        .on("click", this.handleClick);
    };
    // data array & firestore
    yourData
      .collection("your_collection")
      .get()
      .then(res => {
        let data = [];
        res.docs.forEach(doc => {
          data.push(doc.data());
        });
        update(data);
      });
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
        .attr("fill", d => d.data.yourData);
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