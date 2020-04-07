<template>
  <div>
    <v-container>
      <v-btn color="primary" on-click="toHome">Primary</v-btn>
      <ve-line
        :data="chartData"
        :data-zoom="dataZoom"
        :extend="chartExtend"
        :settings="chartSettings"
      ></ve-line>
    </v-container>
  </div>
</template>

<script>
import "echarts/lib/component/toolbox";

export default {
  data() {
    this.chartExtend = {
      series: {
        smooth: false,
        label: {
          normal: {
            show: true
          }
        }
      }
    };
    this.chartSettings = {
      metrics: ["cost", "profit", "growthRate", "people"],
      dimension: ["date"]
    };
    return {
      chartData: {
        columns: ["date", "cost", "profit", "growthRate", "people"],
        rows: [
          {
            cost: 1523,
            date: "01/01",
            profit: 1523,
            growthRate: 0.12,
            people: 32
          },
          {
            cost: 1223,
            date: "01/02",
            profit: 1523,
            growthRate: 0.345,
            people: 65
          },
          {
            cost: 2123,
            date: "01/03",
            profit: 1523,
            growthRate: 0.7,
            people: 74
          },
          {
            cost: 4123,
            date: "01/04",
            profit: 1523,
            growthRate: 0.31,
            people: 43
          },
          {
            cost: 3123,
            date: "01/05",
            profit: 1523,
            growthRate: 0.12,
            people: 98
          },
          {
            cost: 7123,
            date: "01/06",
            profit: 1523,
            growthRate: 0.65,
            people: 22
          }
        ]
      }
    };
  },
  created() {
    this.dataZoom = [
      {
        type: "slider",
        start: 20,
        end: 60
      }
    ];
  }
};
</script>