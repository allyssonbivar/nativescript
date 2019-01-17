<template>
  <bwda-app-shell>
    <ScrollView>
      <StackLayout class="home-panel">
        <CardView class="landing-dashboard-first-card" margin="10" elevation="10" radius="1">
          <StackLayout class="landing-dashboard-card-layout">
            <Label class="landing-dashboard-card-titulo" :text="`OS Pendente`"/>
            <Label
              class="landing-dashboard-card-numero"
              textWrap="true"
              :text="`${listaos.length}`"
            />
          </StackLayout>
        </CardView>
        <CardView margin="10" elevation="10" radius="1">
          <StackLayout class="landing-dashboard-card-layout">
            <Label class="landing-dashboard-card-titulo" :text="`OS Concluída`"/>
            <label
              class="landing-dashboard-card-numero"
              textWrap="true"
              :text="` ${listaosconcluida.length}`"
            />
          </StackLayout>
        </CardView>
        <CardView margin="10" elevation="10" radius="1">
          <StackLayout class="landing-dashboard-card-layout">
            <Label class="landing-dashboard-card-titulo" :text="`OS Aberta`"/>
            <label
              class="landing-dashboard-card-numero"
              v-if="osaberta"
              :text="`#${osaberta.ordem_servico_id}`"
              @tap="$navigateTo('M00600DetalheOS')"
            />
            <label
              class="landing-dashboard-card-subtitulo"
              v-if="!osaberta"
              :text="`Não há OS aberta`"
            />
          </StackLayout>
        </CardView>
      </StackLayout>
    </ScrollView>
  </bwda-app-shell>
</template>

<script>
import { mapState } from "vuex";
import { os_service, auth_service } from "../api";
export default {
  name: "m00200-landing-dashboard",
  data: _ => ({}),
  computed: mapState(["auth", "listaos", "listaosconcluida", "osaberta"]),
  mounted() {
    this.$store.commit("setTitle", `Olá, ${this.auth.pessoa.pessoa_nome}`);
  }
};
</script>
