
<template>
  <Page :actionBarHidden="true">
    <FlexboxLayout class="login-page">
      <StackLayout class="login-form">
        <ActivityIndicator :busy="busy"/>
        <Image src="~/assets/BWDA5.png" class="login-img-resize"/>
        <StackLayout v-if="!auth">
          <TextField v-model="login.email" keyboardType="email" hint="Email"></TextField>
          <TextField v-model="login.senha" secure hint="Senha"></TextField>
          <Button text="Log In" class="btn btn-primary" @tap="fazlogin()"></Button>
        </StackLayout>
        <Button v-if="auth" @tap="$navigateTo('M00200LandingDashboard')">
          <FormattedString>
            <!-- <i class="fas fa-sign-in-alt"></i> -->
            <Span class="fas" text.decode="&#xf2f6;"/>
            <Span text=" Continuar como "/>
            <Span class="b" :text="auth.pessoa.pessoa_email"/>
          </FormattedString>
        </Button>
      </StackLayout>
      <Label :text="version"/>
    </FlexboxLayout>
  </Page>
</template>

<script>
import { auth_service } from "../api";
import { mapState } from "vuex";
import { collect, required, email } from "../rules";
import { version } from "../../package.json";
export default {
  name: "m00100-login",
  data() {
    return {
      version,
      login: {
        email: "",
        senha: ""
      },
      busy: false
    };
  },
  computed: mapState(["auth"]),
  methods: {
    fazlogin() {
      const errors = [];
      collect(
        errors,
        required("Senha")(this.login.senha),
        email("Login")(this.login.email)
      );
      if (errors.length) return alert(errors.join(", "));
      this.busy = true;
      auth_service
        .fazlogin(this.login)
        .then(ret => {
          if (!ret.status) throw { message: "Sem conexão com o servidor", ret };
          if (ret.data.pessoa.pessoa_bloqueado)
            return alert("Usuário bloqueado.");
          this.$store.commit("setAuth", ret.data);
          this.$navigateTo("M00200LandingDashboard");
        })
        .catch(err => {
          if (err.message) alert(err.message);
          else alert("Não foi possível realizar login");
          console.log(err);
        })
        .finally(_ => {
          this.busy = false;
        });
    }
  }
};
</script>
