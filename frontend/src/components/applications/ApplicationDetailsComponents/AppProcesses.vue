<template>
  <v-card color="foreground" class="mx-4 mt-2" raised>
    <v-card-title class="primary font-weight-bold">
      进程
    </v-card-title>
    <v-card-text
      v-if="app.State.Status != 'running'"
      class="text-center px-5 py-5"
    >
     启动应用程序以查看进程
    </v-card-text>
    <v-simple-table class="foreground" v-else-if="processes">
      <template v-slot:default>
        <thead>
          <tr>
            <th
              class="foreground"
              v-for="(title, index) in processes.Titles"
              :key="index"
            >
              {{ title }}
            </th>
          </tr>
        </thead>
        <tbody class="foreground">
          <tr v-for="(item, index) in processes.Processes" :key="index">
            <td v-for="(field, index) in item" :key="index">{{ field }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-card-text v-else>
      东西坏了 >:(
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["app", "processes"],
  search: ""
};
</script>
