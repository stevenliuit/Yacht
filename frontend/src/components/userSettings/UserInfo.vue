<template>
  <v-card color="foreground" class="elevation-12 pb-8">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>用户设置</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-progress-linear indeterminate v-if="isLoading" />
    <v-card-text>
      您可以在此处更改与您的用户帐户相关的设置。
    </v-card-text>
    <h2 class="font-weight-bold ml-5">
      API Keys
      <v-dialog id="keyModal" v-model="keyDialog" max-width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="primary">
            生成 API Key
          </v-card-title>
          <v-card-text>
           API 密钥应被视为密码，并且仅应提供给您信任的应用程序。 关闭此框后，您将无法检索此密钥，因此请务必先复制它并测试您的应用程序。
            <br />
            <v-form>
              <v-text-field
                v-if="!newKey"
                v-model="keyForm.key_name"
                label="Name"
              >
              </v-text-field>
            </v-form>
            <v-btn v-if="!newKey" class="primary" @click="generate_api_key()">
              生成 Key</v-btn
            >
            <br v-if="newKey" />
            <span v-if="newKey" class="font-weight-bold">
              生成 API Key:</span
            >
            <v-btn
              @click="
                copykey();
                saved = true;
              "
              icon
              v-if="newKey"
              ><v-icon>mdi-clipboard-text-outline</v-icon></v-btn
            >
            <v-textarea
              @click="
                copykey();
                saved = true;
              "
              shaped
              outlined
              dense
              readonly
              no-resize
              v-if="newKey"
              v-model="newKey"
              id="newapikey"
            ></v-textarea>
            <v-snackbar v-model="saved" bottom color="secondary">
              已复制到剪贴板
              <template v-slot:action="{ attrs }">
                <v-btn
                  color="primary"
                  text
                  v-bind="attrs"
                  @click="saved = false"
                >
                  关闭
                </v-btn>
              </template>
            </v-snackbar>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              @click="
                keyDialog = false;
                newKey = '';
                keyForm.key_name = '';
              "
            >
              关闭
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </h2>
    <v-data-table dense :headers="headers" :items="apiKeys" :items-per-page="5">
      <template v-slot:item.key_name="{ item }">
        <v-btn @click="revoke_api_key(item)" icon
          ><v-icon>mdi-trash-can-outline</v-icon></v-btn
        >
        <span class="ml-2"> {{ item.key_name }} </span>
      </template>
      <template v-slot:item.created_at="{ item }">
        <span class="CreatedAt"> {{ item.created_at | formatDate }} </span>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      importFile: null,
      isLoading: false,
      keyDialog: false,
      newKey: null,
      keyForm: {
        key_name: ""
      },
      saved: false,
      apiKeys: [],
      headers: [
        {
          text: "Name",
          value: "key_name",
          sortable: true,
          align: "start"
        },
        {
          text: "Created Time",
          value: "created_at",
          sortable: true
        }
      ]
    };
  },
  methods: {
    async get_api_keys() {
      let url = "/api/auth/api/keys";
      await axios
        .get(url)
        .then(resp => {
          for (let key in resp.data) {
            if (!(resp.data[key] in this.apiKeys)) {
              this.apiKeys.push(resp.data[key]);
            }
          }
        })
        .catch(() => {
          //pass
        });
    },
    copykey() {
      var copytext = document.getElementById("newapikey");
      copytext.select();
      copytext.focus();
      copytext.select();
      document.execCommand("Copy");
    },
    generate_api_key() {
      const payload = { ...this.keyForm };
      let url = "/api/auth/api/keys/new";
      axios.post(url, payload).then(resp => {
        this.newKey = resp.data.token;
        this.apiKeys.push(resp.data);
      });
    },
    revoke_api_key(key) {
      this.isLoading = true;
      axios
        .get(`/api/auth/api/keys/${key.id}`)
        .then(() => {
          let idx = this.apiKeys.findIndex(x => x.id === key.id);
          this.apiKeys.splice(idx, 1);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },
  async created() {
    await this.get_api_keys();
  }
};
</script>
