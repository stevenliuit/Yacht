<template>
  <div>
    <v-tabs background-color="tabs" mobile-breakpoint="sm">
      <v-tab class="text-left" :to="{ path: 'info' }">
        <v-icon left class="mr-1">mdi-information-outline</v-icon>信息
      </v-tab>
      <v-tab class="text-left" :to="{ path: 'changePassword' }">
        <v-icon left class="mr-1">mdi-lock-outline</v-icon>修改密码
      </v-tab>
    </v-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
.floating-menu {
  z-index: 1;
}
</style>
