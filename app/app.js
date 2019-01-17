import "./app.scss";
import Vue from "nativescript-vue";
var Observable = require("data/observable").Observable;
var application = require("application");
var utils = require("utils/utils");
var jobScheduler = require("./notifications/job-scheduler");
//https://nativescript-vue.org/en/docs/getting-started/vue-devtools/
import VueDevtools from "nativescript-vue-devtools";
const env = process.env.NODE_ENV || "development";
console.log(`we are on [${env}] mode`);
const {version} = require("../package.json");
console.log(`BWDA5 mobile version [${version}]`); 
if (env == "development") {
	Vue.use(VueDevtools, {
		// host: "192.168.0.109"
		// host: "192.168.0.6"
		host: "192.168.0.22"
		// host: "192.168.254.223"
	});
}



import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
Vue.use(RadSideDrawer);
Vue.registerElement('CardView', () => require('nativescript-cardview').CardView);

// reusable components
import BwdaAppshell from "./components/bwda-app-shell.vue";
import BwdaResumoOS from "./components/bwda-resumo-os.vue";
import BwdaDetalhesAdicionaisOS from "./components/bwda-detalhes-adicionais-os.vue";
import BwdaAtividade from "./components/bwda-atividade.vue";
import BwdaChecklist from "./components/bwda-checklist.vue";
import BwdaChecklistItem from "./components/bwda-checklist-item.vue";
import BwdaChecklistItemResposta from "./components/bwda-checklist-item-resposta.vue";
import BwdaDatePicker from "./components/bwda-date-picker.vue";
import BwdaTimePicker from "./components/bwda-time-picker.vue";
import BwdaSimNaoNA from "./components/bwda-sim-nao-na.vue";
import BwdaGetPicture from "./components/bwda-get-picture.vue";

// views
import M00100Login from "./views/m00100-login.vue";
import M00200LandingDashboard from "./views/m00200-landing-dashboard.vue";
import M00300AgendaOS from "./views/m00300-agenda-de-os.vue";
import M00400Mapa from "./views/m00400-mapa.vue";
import M00500ListagemPrioritaria from "./views/m00500-listagem-prioritaria.vue";
import M00600DetalheOS from "./views/m00600-detalhe-de-os.vue";
import M00700ChecklistOS from "./views/m00700-checklist-os.vue";
import M00800ComentariosAtividade from "./views/m00800-comentarios-atividade-os.vue";
import M00900ComentariosOS from "./views/m00900-comentarios-os.vue";
import M01000MidiasOS from "./views/m01000-midias-os.vue";

import {
	store
} from './store'

// reusable components
Vue.component("bwda-app-shell", BwdaAppshell);
Vue.component("bwda-resumo-os", BwdaResumoOS);
Vue.component("bwda-detalhes-adicionais-os", BwdaDetalhesAdicionaisOS);
Vue.component("bwda-atividade", BwdaAtividade);
Vue.component("bwda-checklist", BwdaChecklist);
Vue.component("bwda-checklist-item", BwdaChecklistItem);
Vue.component("bwda-checklist-item-resposta", BwdaChecklistItemResposta);
Vue.component("bwda-date-picker", BwdaDatePicker);
Vue.component("bwda-time-picker", BwdaTimePicker);
Vue.component("bwda-sim-nao-na", BwdaSimNaoNA);
Vue.component("bwda-get-picture", BwdaGetPicture);

// views
Vue.component("M00100Login", M00100Login);
Vue.component("M00200LandingDashboard", M00200LandingDashboard);
Vue.component("M00300AgendaOS", M00300AgendaOS);
Vue.component("M00400Mapa", M00400Mapa);
Vue.component("M00500ListagemPrioritaria", M00500ListagemPrioritaria);
Vue.component("M00600DetalheOS", M00600DetalheOS);
Vue.component("M00700ChecklistOS", M00700ChecklistOS);
Vue.component("M00800ComentariosAtividade", M00800ComentariosAtividade);
Vue.component("M00900ComentariosOS", M00900ComentariosOS);
Vue.component("M01000MidiasOS", M01000MidiasOS);

Vue.config.silent = false
Vue.config.debug = true
jobScheduler.scheduleJob(utils.ad.getApplicationContext());
new Vue({
	store,
	name: "bwda",
	template: `
		<Frame transition="slideLeft">
			<M00100Login />
		</Frame>`,
}).$start();