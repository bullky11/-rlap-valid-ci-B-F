import { AdatLeiro } from "../AdatLeiro.js";
export default class SorView {
  #obj = {};
  constructor(index, obj, szuloElem) {
    this.AdatLeiro = AdatLeiro;
    this.index = index;
    this.#obj = obj;
    this.szuloElem = szuloElem;
    this.id = this.#obj["felh_id"];
    this.htmlOsszerak();
    this.modositGomb = $("button.btn-primary:last");
    $("button.btn-danger:last").on("click", (event) => {
      this.#esemenyLetrehozo("sorTorles");
    });
    this.modositGomb.on("click", () => {
      // Pop-up ablak létrehozása <link>jQuery</link>-vel
      let popupContent = this.inputOsszerak();
      $(".modositUrlap").css("display", "block");
      $(".modositUrlap").html(popupContent);
      $(".modositGomb").on("click", (event) => {
        this.#esemenyLetrehozo("sorModositas");
        $(".modositUrlap").css("display", "none");
      });
    });
  }

  inputOsszerak() {
    let tipus = "number";
    let txt = "<div class = 'modositTartalom'>";
    txt += "<form>";
    
    for (const key in AdatLeiro) {
      if (key === "felh_id") {
        continue;
      }
      if (key === "szul_ido") {
        tipus = "number";
      } else {
        tipus = "text";
      }
      if (key === "created_at" || key === "updated_at") {
        continue;
      } else {
        console.log();
        txt += `
        <div class="form-group">
        <label for="${key}">${this.AdatLeiro[key]}:</label>
        <input type="${tipus}" class="form-control" id="m${key}" value=${
          this.#obj[key]
        }>
        </div>
        `;
      }
    }

    txt += `<input type="button" class="btn btn-outline-success modositGomb" value="Módosít">`;
    

    txt += "</form>";
    txt += "</div>";
    return txt;
  }

  htmlOsszerak() {
    let txt = "<tr>";

    for (const key in this.#obj) {
      txt += `<td>${this.#obj[key]}</td>`;
    }

    txt += `<td><button class='btn btn-danger'>Törlés</button></td>`;
    txt += `<td><button class='btn btn-primary'>Módosítás</button></td>`;

    txt += "</tr>";
    this.szuloElem.append(txt);
  }

  AdatLekeres() {
    let inputAdat = {};

    for (const key in AdatLeiro) {
      if (key === "created_at" || key === "updated_at" || key === "felh_id") {
        continue;
      } else {
        inputAdat[key] = $(`input#m${key}`).val();
      }
    }
    console.log(inputAdat);
    return inputAdat;
  }

  #esemenyLetrehozo(esemenyNev) {
    const esemenyem = new CustomEvent(esemenyNev, {
      detail: { adat: this.AdatLekeres(), id: this.id },
    });
    window.dispatchEvent(esemenyem);
  }
}
