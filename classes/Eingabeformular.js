"use strict";
class Eingabeformular{

    constructor() {
        this._html = this._html_generieren();
    }   
    _formular_daten_holen(e){
        return{

            titel: e.target.elements.titel.value ,
            einhame: e.target.elements.einnahme.checked ,
            kategorie: e.target.elements.kategorie.value,
            beschreibung: e.target.elements.beschreibung.value,
            betrag: e.target.elements.betrag.value,
            versand: e.target.elements.versand.value,
            datum: e.target.elements.datum.value,
            anzahl: e.target.elements.anzahl.value


        }

    }

    _absenden_event(eingabeformular){
        console.log(eingabeformular);
        eingabeformular.querySelector('#eingabeformular').addEventListener("submit", e => {
            e.preventDefault() ;
            let formulardaten = this._formular_daten_holen(e);

           
      $.ajax({
    
        type: "POST",
        url: "einfugen.php",
        data: {
            name: formulardaten.titel,
            beschreibung: formulardaten.beschreibung,
            betrag: formulardaten.betrag,
            datum: formulardaten.datum,
            einnahme: formulardaten.einahme,
            versand: formulardaten.versand,
            kategorie: formulardaten.kategorie,
            anzahl: formulardaten.anzahl,
            type: 'stock'
        },
 
      }).done(function(data){
          console.log(data);
      });
    
            console.log(e.target.elements.titel.value);
        });


    }

    _html_generieren() {

        let eingabeformular = document.createElement("section");
        eingabeformular.setAttribute("id" ," eingabeformular-container" );
        eingabeformular.innerHTML =`<form id="eingabeformular" action="einfugen.php" method="post">
        <div class="eingabeformular-zeile">
            <h1>Neue Einnahme / Ausgabe hinzufügen</h1>
        </div>
        <div class="eingabeformular-zeile">
            <div class="titel-typ-eingabe-gruppe">
                <label for="titel">Titel</label>
                <input type="text" id="titel" form="eingabeformular" name="titel" placeholder="z.B. Einkaufen" size="10" title="Titel des Eintrags">
                <input type="radio" id="einnahme" name="typ" value="einnahme" form="eingabeformular" title="Typ des Eintrags">
                <label for="einnahme" title="Typ des Eintrags">Einnahme</label>
                <input type="radio" id="ausgabe" name="typ" value="ausgabe" form="eingabeformular" title="Typ des Eintrags" checked>
                <label for="ausgabe" title="Typ des Eintrags">Ausgabe</label>
            </div>
        </div>
        <div class="eingabeformular-zeile">
            <div class="betrag-datum-eingabe-gruppe">
            <label for="kategorie">Kategorie</label>
            <input type="text" id="kategorie" form="eingabeformular" name="kategorie" placeholder="z.B. Einkaufen" size="10" title="Titel des Eintrags">
            </div>
        </div>

        <div class="eingabeformular-zeile">
            <div class="betrag-datum-eingabe-gruppe">
                <label for="beschreibung">Beschreibung</label>
                <input type="text" id="beschreibung" form="eingabeformular" name="beschreibung" placeholder="z.B. Einkaufen" size="10" title="Beschreibung des Eintrags">
            </div>
        </div>
        
        <div class="eingabeformular-zeile">
            <div class="betrag-datum-eingabe-gruppe">
                <label for="betrag">Betrag</label>
                <input type="number" id="betrag" name="betrag" form="eingabeformular" placeholder="z.B. 10,42" size="10" step="0.01" min="0.01" title="Betrag des Eintrags (max. zwei Nachkommastellen, kein €-Zeichen)">
                <label for="anzahl">Anzahl</label>
                <input type="number" id="anzahl" name="anzahl" form="eingabeformular" size="10" title="Anzahl des Eintrags">
            </div>
        </div>

        <div class="eingabeformular-zeile">
            <div class="betrag-datum-eingabe-gruppe">
                <label for="versand">versand</label>
                <input type="number" id="versand" name="versand form="eingabeformular" title="versand des Eintrags">
            </div>
        </div>
        <div class="eingabeformular-zeile">
            <div class="betrag-datum-eingabe-gruppe">
                <label for="datum">Datum</label>
                <input type="date" id="datum" name="datum" form="eingabeformular" size="10" title="Datum des Eintrags">
            </div>
        </div>
        <div class="eingabeformular-zeile">
            <button class="standard" type="submit" form="eingabeformular">Hinzufügen</button>
        </div>
        </form>`;
        
        this._absenden_event(eingabeformular);
        return eingabeformular;

    }

    anzeigen() {
        let body = document.querySelector("nav");
        if (body !== null) {
            body.insertAdjacentElement("afterend", this._html);
        }
    }

}