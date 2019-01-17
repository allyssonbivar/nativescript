import Vue from "nativescript-vue";
import Vuex from "vuex";
Vue.use(Vuex);

import {
  auth_service
} from "./api";

import arquivos from "./arquivos";

const state = {
  title: "BWDA5",
  auth: arquivos.loadJSON("auth.json") || null,
  listaos: arquivos.loadJSON("listaos.json") || [],
  listaosconcluida: arquivos.loadJSON("listaosconcluida.json") || [],
  osaberta: arquivos.loadJSON("osaberta.json") || null,
  listaStatusAtividades: arquivos.loadJSON("listaStatusAtividades.json") || [],
  id_checklist_aberto: arquivos.loadJSON("id_checklist_aberto.json") || null,
  eventosauditoria: arquivos.loadJSON("eventosauditoria.json") || []
}

if (state.auth)
  auth_service.atualizachave(state.auth);

const store = new Vuex.Store({
  state,
  mutations: {
    setTitle: (state, title) => state.title = title,
    setAuth: (state, auth) => {
      state.auth = auth;
      auth_service.atualizachave(state.auth);
      arquivos.saveJSON("auth.json", auth);
    },
    setListaOS: (state, listaos) => {
      state.listaos = listaos;
      arquivos.saveJSON("listaos.json", listaos);
    },
    setListaOSConcluida: (state, listaosconcluida) => {
      state.listaosconcluida = listaosconcluida
      arquivos.saveJSON("listaosconcluida.json", listaosconcluida);
    },
    setOSAberta: (state, osaberta) => {
      state.osaberta = osaberta;
      arquivos.saveJSON("osaberta.json", osaberta);
    },
    setListaStatusAtividades: (state, lista) => {
      state.listaStatusAtividades = lista;
      arquivos.saveJSON("listaStatusAtividades.json", lista)
    },
    setIdChecklistAberto: (state, id) => {
      state.id_checklist_aberto = id;
      arquivos.saveJSON("id_checklist_aberto.json", id)
    },
    setEventoAuditoria: (state, eventosauditoria) => {
      state.eventosauditoria = eventosauditoria;
      arquivos.saveJSON("eventosauditoria.json", eventosauditoria);
    },
  },
  actions: {
    limpaStore: context => {
      return new Promise(resolve => {
        context.commit("setAuth", null);
        context.commit("setOSAberta", null);
        context.commit("setListaOS", []);
        context.commit("setListaOSConcluida", []);
        context.commit("setIdChecklistAberto", null);
        context.commit("setEventoAuditoria", []);
        resolve()
      })
    },
    criaEvento: (context, evento) => {
      state.eventosauditoria.push(evento);
      context.commit("setEventoAuditoria", state.eventosauditoria);
    },
  }
})

export {
  store
};