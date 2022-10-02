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
    <v-card-title class="subheading warning font-weight-bold"
      >修剪</v-card-title
    >
    <v-card-text class="mt-2"
      >删除未使用的映像、卷、网络和容器。</v-card-text
    >
    <v-btn
      class="mx-5 mb-5"
      color="warning"
      @click="prune((resource = 'images'))"
    >
      修剪 Images
    </v-btn>
    <v-btn
      class="mx-5 mb-5"
      color="warning"
      @click="prune((resource = 'networks'))"
    >
      修剪 Networks
    </v-btn>
    <v-btn
      class="mx-5 mb-5"
      color="warning"
      @click="prune((resource = 'volumes'))"
    >
      修剪 Volumes
    </v-btn>
    <v-dialog max-width="290" v-model="containerDialog">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mx-5 mb-5" color="warning" v-bind="attrs" v-on="on">
          修剪 Containers
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          修剪 Containers
        </v-card-title>
        <v-card-text>
          这将删除所有停止的容器。 在继续之前，请确保这是您想要做的。
        </v-card-text>
        <v-card-actions color="background">
          <v-spacer></v-spacer>
          <v-btn @click="containerDialog = false">Cancel</v-btn>
          <v-btn
            color="red"
            @click="
              containerDialog = false;
              prune((resource = 'containers'));
            "
            >继续</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      containerDialog: false,
      isLoading: false
    };
  },
  methods: {
    ...mapMutations({
      setMessage: "snackbar/setMessage",
      setErr: "snackbar/setErr"
    }),
    formatBytes(bytes) {
      if (bytes === 0) return "0 Bytes";
      const decimals = 2;
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },
    prune(resource) {
      this.isLoading = true;
      axios({
        url: "/api/settings/prune/" + resource,
        method: "GET",
        responseType: "text/json"
      })
        .then(response => {
          let action = Object.keys(response.data)[0];
          if (response.data[action] != null) {
            var deletedNumber = response.data[action].length;
          } else {
            deletedNumber = "0";
          }
          this.setMessage(
            deletedNumber +
              " " +
              action +
              ". Space Reclaimed: " +
              this.formatBytes(response.data.SpaceReclaimed)
          );
          this.isLoading = false;
        })
        .catch(err => {
          this.setErr(err);
          this.isLoading = false;
        });
    }
  }
};
</script>
