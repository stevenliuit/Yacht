<template>
  <ValidationObserver ref="obs1" v-slot="{ invalid }">
    <v-card color="foreground" class="elevation-12 pb-8">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>修改密码</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        您也可以在此处仅更改您的电子邮件（或同时更改您的电子邮件和密码）
        <v-form @keyup.native.enter="onSubmit()">
          <ValidationProvider
            name="username"
            rules="required|email"
            immediate
            v-slot="{ errors, valid }"
          >
            <v-text-field
              label="Email"
              v-model="username"
              :error-messages="errors"
              :success="valid"
              required
            />
          </ValidationProvider>

          <ValidationProvider
            name="password"
            rules="required"
            v-slot="{ errors, valid }"
          >
            <v-text-field
              label="Password"
              v-model="password"
              :error-messages="errors"
              :success="valid"
              :type="show1 ? 'text' : 'password'"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              required
              @click:append="show1 = !show1"
            />
          </ValidationProvider>
          <ValidationProvider
            name="confirm"
            rules="confirmed:password"
            v-slot="{ errors, valid }"
          >
            <v-text-field
              label="Confirm Password"
              v-model="confirm"
              :error-messages="errors"
              :success="valid"
              :type="show2 ? 'text' : 'password'"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show2 = !show2"
            />
          </ValidationProvider>
          <v-btn
            class="float-right"
            @click="onSubmit()"
            color="primary"
            :disabled="invalid"
            >修改用户信息</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapActions } from "vuex";
export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: ["currentUsername"],
  data() {
    return {
      username: this.currentUsername || "",
      password: "",
      confirm: "",
      show1: false,
      show2: false
    };
  },
  methods: {
    ...mapActions({
      login: "auth/AUTH_CHANGE_PASS"
    }),
    onSubmit() {
      this.login({
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>

<style lang="css" scope></style>
