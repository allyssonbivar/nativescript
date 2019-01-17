<template>
  <bwda-app-shell>
    <GridLayout v-if="osaberta" rows="auto,*">
      <FlexboxLayout justifyContent="flex-end" row="0">
        <Button class="btn btn-primary detalhe-de-os-button" @tap="finaliza">Finalizar OS</Button>
      </FlexboxLayout>
      <Scrollview :scrollBarIndicatorVisible="true" row="1">
        <StackLayout class="detalhe-de-os-padding">
          <CardView margin="10" elevation="10" radius="1">
            <bwda-resumo-os class="listagem-prioritaria-os-card" :os="osaberta"/>
          </CardView>
          <CardView margin="10" elevation="10" radius="1">
            <bwda-detalhes-adicionais-os class="listagem-prioritaria-os-card" :os="osaberta"/>
          </CardView>
          <CardView v-if="osaberta.atividade.length" margin="10" elevation="10" radius="1">
            <StackLayout class="detalhe-os-card-layout">
              <Label class="detalhe-de-os-titulo"  text="Atividades"/>
              <bwda-atividade
                v-for="ativ in osaberta.atividade"
                :key="ativ.atividade_id"
                :os="osaberta"
                :atividade="ativ"
              />
            </StackLayout>  
          </CardView>
          <CardView v-if="osaberta.checklist.length" margin="10" elevation="10" radius="1">
            <StackLayout class="detalhe-os-card-layout">
              <Label class="detalhe-de-os-titulo"  text="Checklist"/>
              <bwda-checklist
                v-for="ck in osaberta.checklist"
                :key="ck.checklist_id"
                :os="osaberta"
                :checklist="ck"
              />
            </StackLayout>  
          </CardView>
        </StackLayout>
      </Scrollview>
    </GridLayout>
  </bwda-app-shell>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "m00600-detalhe-de-os",
  computed: mapState(["osaberta", "listaosconcluida"]),
  mounted() {
    this.$store.commit("setTitle", "Detalhe OS");
  },
  methods: {
    finaliza() {
      // atividades respondidas?
      console.log("conferindo atividades")
      let ativrespondida = true;
      this.osaberta.atividade &&
        this.osaberta.atividade.map(e => {
          if (e.status_atividade_id == 1) ativrespondida = false;
        });
      if (!ativrespondida) return alert("Existem atividades não realizadas");

      // checklists resolvidos?
      console.log("conferindo checklists")
      let ckrespondida = true;
      this.osaberta.checklist &&
        this.osaberta.checklist.map(e => {
          if (!e.respondido) ckrespondida = false;
        });
      if (!ckrespondida) return alert("Existem Checklists não respondidos");

      // mover para fila de envio
      console.log("movendo pra fila de concluídos")
      this.listaosconcluida.push(this.osaberta);
      alert(
        `Ordem de serviço #${
          this.osaberta.ordem_servico_id
        } concluída com sucesso!`
      );
      this.$store.commit("setOSAberta", null);
      this.$store.commit("setListaOSConcluida", this.listaosconcluida);
      this.$navigateTo("M00200LandingDashboard");
    }
  }
};
</script>


<style scoped>

.detalhe-de-os-button {
  margin: 15;
  padding: 20;
}

.detalhe-de-os-padding {
  padding:20;
}

.detalhe-de-os-titulo {
  font-size: 24;
  font-weight: 300;
  font-family: 'FontAwesome';
  color: black;
  padding-bottom: 10; 
}

.detalhe-os-card-layout {
  background-color: white;
  margin-bottom: 20;
  margin-left: 20;
  margin-right: 20;
  padding: 15;
  height: 100%;
}

</style>
