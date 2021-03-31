
"use strict";

class Einnahme_Formular{

    constructor(){

        this._html = this._html_generieren();

     }
     
    _formular_daten_holen(e){
        return{

            titel: e.target.elements.titel.value ,
            kategorie: e.target.elements.kategorie.value,
            betrag: e.target.elements.betrag.value,
            datum: e.target.elements.datum.value,
            anzahl: e.target.elements.anzahl.value
        }

    }

    _absenden_event(eingabeformular){

        eingabeformular.querySelector('#eingabeformular').addEventListener("submit", e => {
            e.preventDefault() ;
            let formulardaten = this._formular_daten_holen(e);
            
      $.ajax({
    
        type: "POST",
        url: "einfugen.php",
        data: {
            titel: formulardaten.titel,
            betrag: formulardaten.betrag,
            datum: formulardaten.datum,
            kategorie: formulardaten.kategorie,
            anzahl: formulardaten.anzahl,
            type: 'einnahme'
        },
 
      }).done(function(data){
      });
    
        });

    }

    _html_generieren() {

        let eingabeformular = document.createElement("section");
        eingabeformular.setAttribute("id" ," eingabeformular-container" );
        eingabeformular.innerHTML =`<form id="eingabeformular" action="einfugen.php" method="post">
        <div class="eingabeformular-zeile">
            <h1>Neue Einnahme</h1>
        </div>
        <div class="eingabeformular-zeile">
            <div class="titel-typ-eingabe-gruppe">
                <label for="titel">Titel</label>
                <input type="text" id="titel" form="eingabeformular" name="titel" placeholder="z.B. Einkaufen" size="10" title="Titel des Eintrags">
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
                <label for="betrag">Betrag</label>
                <input type="number" id="betrag" name="betrag" form="eingabeformular" placeholder="z.B. 10,42" size="10" step="0.01" min="0.01" title="Betrag des Eintrags (max. zwei Nachkommastellen, kein €-Zeichen)">
                <label for="anzahl">Anzahl</label>
                <input type="number" id="anzahl" name="anzahl" form="eingabeformular" placeholder="z.B. 10,42" size="10" step="0.01" min="0.01" title="Betrag des Eintrags (max. zwei Nachkommastellen, kein €-Zeichen)">
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