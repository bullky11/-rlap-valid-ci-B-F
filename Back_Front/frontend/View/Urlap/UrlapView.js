import { AdatLeiro } from "../AdatLeiro.js";

export default class UrlapView {
  constructor(szuloElem) {
    this.AdatLeiro = AdatLeiro;
    this.szuloElem = szuloElem;
    this.htmlOsszerak();
    $("form").submit((event) => {
      event.preventDefault();
      this.#esemenyLetrehozo("sorFelvitel");
    });
  }
  htmlOsszerak() {
    let tipus = "number";
    let txt = "<form>";
    for (const key in AdatLeiro) {
      if (key === "felh_id") {
        continue;
      }
      if (key === "szul_ido") {
        tipus = "number";
      } else {
        tipus = "text";
      }
      if (key === "created_at" || key === "updated_at"){
        continue
      }
      else {
        txt += `
        <div class="form-group">
        <label for="${key}">${this.AdatLeiro[key]}:</label>
        <input type="${tipus}" class="form-control" id="${key}">
        </div>
        `;
      }
    }

    txt += `<button id="submit" class="btn btn-outline-success">Submit</button>`;
    txt += "</form>";

    this.szuloElem.append(txt);
    this.AdatLekeres();
  }

  AdatLekeres() {
    let inputAdat = {};
    
    for (const key in AdatLeiro) {
    if(key === "created_at" || key === "updated_at" || key === 'felh_id'){
      continue
    }else{
      inputAdat[key] = $(`input#${key}`).val();
    }}
    
    return inputAdat;
  }

  #esemenyLetrehozo(esemenyNev) {
    const esemenyem = new CustomEvent(esemenyNev, {
      detail: this.AdatLekeres(),
    });
    window.dispatchEvent(esemenyem);
  }
}
