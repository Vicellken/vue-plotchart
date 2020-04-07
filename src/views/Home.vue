<template>
  <v-container>
    <v-card height="400" width="256" class="mx-auto">
      <v-navigation-drawer permanent>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">Vue Plot Placeholder</v-list-item-title>
            <v-list-item-subtitle>click to path</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            @click="item"
            route
            :to="item.route"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "D3 bar", icon: "mdi-view-dashboard", route: "/d3bar" },
        { title: "D3 pie", icon: "mdi-image", route: "/d3pie" },
        {
          title: "Echarts LineBar",
          icon: "mdi-help-box",
          route: "/linechart"
        }
      ]
    };
  }
};
</script>
