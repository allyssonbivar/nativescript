// app/rules.js
// required
export const required = field => e => !!e || `${field} é obrigatório`;
// email
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const email = field => e => re.test(e) || `${field} não é um email válido`;
// minlength
export const minlength = (field, len = 6) => e => e.length >= len || `${field} deve ter no mínimo ${len} caracteres`;
// maxlength
export const maxlength = (field, len = 6) => e => e.length <= len || `${field} deve ter no máximo ${len} caracteres`;

export const collect = (errors = [], ...messages) => {
  messages.map(m => {
    if (typeof m == "string") errors.push(m)
  })
}