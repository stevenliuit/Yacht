<template>
  <v-card color="foreground" class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>服务器设置</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      您可以在此处更改与服务器相关的设置。
    </v-card-text>
    <h2 class="font-weight-bold ml-5">Import</h2>
    <ValidationObserver ref="obs1" v-slot="{ invalid }">
      <validationProvider
        name="importFile"
        rules="required"
        v-slot="{ errors, valid }"
      >
        <v-file-input
          v-model="importFile"
          ref="importFile"
          label="Import export.json"
          :error-messages="errors"
          :success="valid"
          required
          show-size
          accept=".json"
          class="mx-5"
        />
      </validationProvider>
      <v-btn
        class="mx-5"
        color="primary"
        :disabled="invalid"
        @click="import_settings(importFile)"
        >导入
      </v-btn>
    </ValidationObserver>
    <h2 class="font-weight-bold mt-5 ml-5">Export</h2>
    <v-btn class="mx-5 mb-5" color="primary" @click="export_settings()"
      >导出
    </v-btn>
  </v-card>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      importFile: null
    };
  },
  methods: {
    ...mapMutations({
      setSuccess: "snackbar/setSuccess",
      setErr: "snackbar/setErr"
    }),
    export_settings() {
      axios({
        url: "/api/settings/export",
        method: "GET",
        responseType: "blob"
      }).then(response => {
        var FileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = FileURL;
        fileLink.setAttribute("download", "export.json");
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    },
    import_settings(importFile) {
      let formData = new FormData();
      formData.append("upload", importFile);
      let axiosHeader = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      axios
        .post("/api/settings/export", formData, axiosHeader)
        .then(response => {
          this.setSuccess(response);
        })
        .catch(err => {
          this.setErr(err);
        });
    }
  }
};
</script>
