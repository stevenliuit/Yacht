<template>
  <v-bottom-navigation app color="secondary">
    <span class="mt-2" v-for="(link, i) in links" :key="i">
      <v-btn active-class="primary--text" v-if="!link.subLinks" :to="link.to">
        <span>{{ link.text }}</span>
        <v-icon> {{ link.icon }}</v-icon>
      </v-btn>
      <v-menu top offset-y v-else>
        <template v-slot:activator="{ on, attrs }">
          <v-btn active-class="primary--text" v-bind="attrs" v-on="on">
            <span>{{ link.text }}</span>
            <v-icon>{{ link.icon }}</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="sublink in link.subLinks"
            :key="sublink.text"
            :to="sublink.to"
            exact
          >
            <v-list-item-icon>
              <v-icon>{{ sublink.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ sublink.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </span>
  </v-bottom-navigation>
</template>

<script>
export default {
  data: () => ({
    links: [
      {
        to: "/",
        icon: "mdi-view-dashboard",
        text: "图表",
        divider: true
      },
      {
        icon: "mdi-folder",
        text: "容器",
        subLinks: [
          {
            text: "应用",
            to: "/apps",
            icon: "mdi-application"
          },
          {
            text: "项目",
            to: "/projects",
            icon: "mdi-book-open"
          }
        ]
      },
      {
        icon: "mdi-cube-outline",
        text: "Resources",
        subLinks: [
          {
            text: "模板",
            to: "/templates",
            icon: "mdi-folder"
          },
          {
            text: "镜像",
            to: "/resources/images",
            icon: "mdi-disc"
          },
          {
            text: "存储卷",
            to: "/resources/volumes",
            icon: "mdi-database"
          },
          {
            text: "网络",
            to: "/resources/networks",
            icon: "mdi-network"
          }
        ]
      },
      {
        to: "/settings/info",
        icon: "mdi-cog",
        text: "设置"
      }
    ]
  })
};
</script>
