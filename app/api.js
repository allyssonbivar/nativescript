import axios from "axios";
import * as http from "http";

const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    // baseURL: "http://192.168.0.17:3000",
    // baseURL: `http://192.168.0.104:3000`,
    baseURL: `http://192.168.0.22:3000`,
    // baseURL: `http://192.168.254.223:3000`,
    // baseURL: "http://192.168.0.109:3000",
    // baseURL: 'https://bwdaservice.com',
  },
  staging: {
    baseURL: "https://bwdaservice.herokuapp.com",
  },
  production: {
    baseURL: "https://bwdaservice.com",
  },
};
const api = axios.create({
  baseURL: config[env].baseURL,
  headers: {
    "x-api-key": "ABC",
  },
});

const basecli = entityName => ({
  name: entityName,
  find: id => api.get(`/${entityName}/${id}`),
  list: params =>
    api.get(`/${entityName}/list`, {
      params,
    }),
  count: params =>
    api.get(`/${entityName}/count`, {
      params,
    }),
  save: data => api[data[`${entityName}_id`] ? "put" : "post"](`/${entityName}/save`, data),
  del: id => api.delete(`/${entityName}/${id}`),
});
const pessoa_service = basecli("pessoa");
pessoa_service.trocapapeis = data => api.post("/pessoa/trocapapeis", data);
const auth_service = {
  fazlogin: data => api.post("/auth/login", data),
  fazlogout: pessoa_id => api.post(`/auth/logout`, {
    pessoa_id
  }),
  atualizachave: auth => {
    api.defaults.headers["x-api-key"] = auth ? auth.seguranca.seguranca_api_key : "ABC";
    console.log(`atualizando chave de api: [${api.defaults.headers["x-api-key"]}]`);
  },
};
const os_service = basecli("ordem_servico");
os_service.atualiza_atividades = (ordem_servico_id, atividades) => api.post("/ordem_servico/atualiza_atividades", {
  ordem_servico_id,
  atividades
});
os_service.sincroniza = params => api.get("/ordem_servico/sincroniza", {
  params
})
const notificacao_pessoa_service = basecli("notificacao_pessoa");
const tipo_os_service = basecli("tipo_ordem_servico");
const status_os_service = basecli("status_ordem_servico");
const projeto_service = basecli("projeto");
const torre_service = basecli("torre");
const criticidade_os_service = basecli("criticidade_ordem_servico");
const ordem_servico_membro_equipe_service = basecli("ordem_servico_membro_equipe");
const atividade_service = basecli("atividade");
const checklist_service = basecli("checklist");
const relatorio_service = basecli("relatorio");
relatorio_service.gerar = data => api.post("/relatorio/gerar", data);
const status_projeto_service = basecli("status_projeto");
const estado_service = basecli("estado");
const cidade_service = basecli("cidade");
const sitio_service = basecli("sitio");
const papel_service = basecli("papel");
const tipo_torre_service = basecli("tipo_torre");
const status_torre_service = basecli("status_torre");
const comentario_service = basecli("comentario");
const checklist_item_service = basecli("checklist_item");
const checklist_item_resposta_service = basecli("checklist_item_resposta");
const tipo_checklist_item_resposta_service = basecli("tipo_checklist_item_resposta");
const media_service = basecli("media");
// media_service.upload = file => api.post("/media/upload", file.readSync(), {
//   headers: {
//     "Content-Type": file.type,
//     "x-file-name": file.name
//   }
// })
media_service.upload = file => http.request({
  url: `${config[env].baseURL}/media/upload`,
  content: file.readSync(),
  method: "POST",
  headers: {
    "x-file-name": file.name,
    "Content-Type": file.type,
  },
})
const media_checklist_item_resposta_service = basecli("media_checklist_item_resposta");
const service_url = _ => config[env].baseURL;
const evento_auditoria_service = basecli("evento_auditoria");
const status_atividade_service = basecli("status_atividade");
// publicando
export {
  env,
  service_url,
  pessoa_service,
  auth_service,
  os_service,
  notificacao_pessoa_service,
  tipo_os_service,
  status_os_service,
  projeto_service,
  torre_service,
  criticidade_os_service,
  ordem_servico_membro_equipe_service,
  atividade_service,
  checklist_service,
  relatorio_service,
  status_projeto_service,
  estado_service,
  cidade_service,
  sitio_service,
  papel_service,
  tipo_torre_service,
  status_torre_service,
  comentario_service,
  checklist_item_service,
  checklist_item_resposta_service,
  tipo_checklist_item_resposta_service,
  media_service,
  media_checklist_item_resposta_service,
  evento_auditoria_service,
  status_atividade_service
};