<template>
  <v-card color="foreground">
    <v-fade-transition>
      <v-progress-linear
        indeterminate
        v-if="isLoading"
        color="primary"
        bottom
      />
    </v-fade-transition>
    <v-card-title class="subheading primary font-weight-bold"
      >更新</v-card-title
    >
    <v-card-text class="mt-2"
      > 将Yacht更新到最新版本。<br />
      注意：这将启动一个运行一次的watchtower实例并更新 Yacht。
      在此过程中，Yacht将重新启动，您将被注销。</v-card-text
    >
    <v-btn
      class="mx-5 mb-5"
      color="primary"
      @click="update()"
      :disabled="!updatable"
    >
      更新 Yacht
    </v-btn>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      containerDialog: false,
      isLoading: false,
      updatable: false
    };
  },
  mounted() {
    this.checkUpdate();
  },
  methods: {
    ...mapMutations({
      setMessage: "snackbar/setMessage",
      setErr: "snackbar/setErr"
    }),
    ...mapState({
      authDisabled: "auth/authDisabled"
    }),
    ...mapActions({
      logout: "auth/AUTH_LOGOUT"
    }),
    checkUpdate() {
      this.isLoading = true;
      axios({
        url: "/api/settings/check/update",
        method: "GET",
        responseType: "text/json"
      })
        .then(response => {
          this.isLoading = false;
          this.updatable = response.data;
        })
        .catch(err => {
          this.isLoading = false;
          this.setErr(err);
        });
    },
    update() {
      this.isLoading = true;
      axios({
        url: "/api/settings/update",
        method: "GET",
        responseType: "text/json"
      })
        .then(response => {
          this.isLoading = false;
          console.log(response.data);
          this.setMessage(
            "Yacht is updating now. You will be logged out to complete the update."
          );
        })
        .finally(() => {
          this.isLoading = true;
          const sleep = delay =>
            new Promise(resolve => setTimeout(resolve, delay));
          sleep(5000);
          if (this.authDisabled == true) {
            this.$forceUpdate();
          } else {
            this.logout();
            this.$forceUpdate();
          }
        })
        .catch(err => {
          this.isLoading = false;
          this.setErr(err);
        });
    }
  }
};
</script>
