<template>
  <v-navigation-drawer
    app
    clipped
    permanent
    mini-variant
    expand-on-hover
    color="secondary"
    style="transform: translateX(0) !important;"
  >
    <!-- -->

    <v-list nav dense>
      <div v-for="(link, i) in links" :key="i">
        <v-list-item v-if="!link.subLinks" :to="link.to" exact class="mt-1">
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-title v-text="link.text" />
        </v-list-item>

        <v-list-group
          v-else
          :key="link.text"
          :prepend-icon="link.icon"
          :value="false"
        >
          <template v-slot:activator>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </template>

          <v-list-item
            v-for="sublink in link.subLinks"
            :to="sublink.to"
            :key="sublink.text"
            exact
            class="mb-1"
          >
            <v-list-item-icon>
              <v-icon>{{ sublink.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ sublink.text }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-divider />
      </div>
    </v-list>
    <template v-slot:append>
      <a :href="'https://' + 'yacht.sh'">
        <v-icon size="200%" class="pa-2">mdi-file-document</v-icon>
      </a>
      <br />
      <a :href="'https://' + 'github.com/SelfhostedPro/Yacht'">
        <v-icon size="200%" class="pa-2">mdi-github</v-icon>
      </a>
    </template>
  </v-navigation-drawer>
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
        text: "应用",
        to: "/apps",
        icon: "mdi-application"
      },
      {
        text: "模板",
        to: "/templates",
        icon: "mdi-folder"
      },
      {
        text: "项目",
        to: "/projects",
        icon: "mdi-book-open"
      },
      {
        icon: "mdi-cube-outline",
        text: "资源",
        subLinks: [
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

<style scoped>
.v-application--is-ltr
  .v-list--dense.v-list--nav
  .v-list-group--no-action
  > .v-list-group__items
  > .v-list-item {
  padding: 0 8px;
}
</style>
