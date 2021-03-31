
"use strict";

class Yoga_Formular{

    constructor(){

        this._html = this._html_generieren();
        

     }
     
    _formular_daten_holen(e){

        let yoga_eintrag = {
            name_schuler : e.target.elements[0].value,
            obsv_lehrer : e.target.elements[1].value,
            preis : e.target.elements[2].value,
            datum : e.target.elements[3].value,
            obsv_schuler : e.target.elements[4].value,
            positionen : []

        }
        let positionen = '' ;

        for(let i = 5 ; i < e.target.elements.length - 1 ; i++ ){
            if(e.target.elements[i].checked){
                yoga_eintrag.positionen.push({
                    'id' : i - 4,
                'position': e.target.elements[i].value
                });
                positionen += '-'+(i-4).toString();
            }
        }
        yoga_eintrag['speichern'] = positionen;
        console.log(positionen);
        return yoga_eintrag ;

    }

    _test_ajax(){

          //-----------------------------------------------------------------------
          // 2) Send a http request with AJAX http://api.jquery.com/jQuery.ajax/
          //-----------------------------------------------------------------------
          $.ajax({                                      
            url: 'get_yoga.php',                  //the script to call to get data          
            data: "",                        //you can insert url argumnets here to pass to api.php
                                             //for example "id=5&parent=6"
            dataType: 'json',                //data format      
            success: function(data)          //on recieve of reply
            {
                doWork(data);

            } 
            
          });

          function doWork(data)
            {
                console.log(data);
               let yogatable = document.createElement("table");
               yogatable.setAttribute("id","yogatable");
               yogatable.setAttribute("style","display:none");

               let table_titel = document.createElement("tr");

               table_titel.innerHTML = ` <th>Nome</th> <th>Info</th> <th>Imag</th>`;
               yogatable.insertAdjacentElement("afterbegin" , table_titel);

               let table_body = document.createElement("tbody");
               table_body.setAttribute("id" , "tablebody");

               yogatable.insertAdjacentElement("beforeend" , table_body);
               console.log(yogatable);

               data.forEach(element=>{

                    let div = document.createElement('div');

                    let radio_yoga = document.createElement("input");
                    radio_yoga.setAttribute("type" , "checkbox") ;
                    radio_yoga.setAttribute("id", element['id']);
                    radio_yoga.setAttribute("name", "yoga_position");
                    radio_yoga.setAttribute("value", element['titel']);

                    let radio_yoga_label = document.createElement("label");
                    radio_yoga_label.setAttribute("for",element['titel']);
                    radio_yoga_label.innerHTML = element['titel'];

                    div.insertAdjacentElement('afterbegin',radio_yoga);
                    div.insertAdjacentElement('beforeend',radio_yoga_label);

                    document.getElementById("nota").appendChild(div);

                   let zeile = document.createElement("tr") ;
   
                   let eintrag = document.createElement("td") ;
                   eintrag.innerHTML = element['titel'] ;
                   table_body.insertAdjacentElement("beforeend" , eintrag);

                    eintrag = document.createElement("td") ;
                   eintrag.innerHTML = element['beschreibung'] ;
                   table_body.insertAdjacentElement("beforeend" , eintrag);

                    eintrag = document.createElement("td") ;
                    let bild = document.createElement("img") ;
                    bild.setAttribute("witdh" , "80");
                    bild.setAttribute("height" , "80");
                    bild.setAttribute("text-align" , "center");

                    bild.setAttribute("src" ,'img/'+element['img'] ) ;
                    eintrag.insertAdjacentElement("beforeend",bild) ;
                   table_body.insertAdjacentElement("beforeend" , eintrag);

                    table_body.insertAdjacentElement("beforeend" , zeile);   


               });
               
               let button_show = document.createElement('button') ;
               button_show.setAttribute("id" , "show_button") ;
               button_show.innerHTML= 'Show ME';

               button_show.onclick =  function show_positions(){
                    let table = document.getElementById('yogatable');
                    table.style.display = table.style.display == "none" ? "block" : "none";
                }

               let body = document.querySelector("body");
               body.insertAdjacentElement("beforeend" , button_show) ;

               body.insertAdjacentElement("beforeend",yogatable);


            }
 

            let formular = this._html_generieren();
            console.log(formular);

    }

    _absenden_event(eingabeformular){

        eingabeformular.querySelector('#eingabeformular').addEventListener("submit", e => {
            e.preventDefault() ;


            let formulardaten = this._formular_daten_holen(e);
            console.log(formulardaten);

            
      $.ajax({
    
        type: "POST",
        url: "einfugen.php",
        data: {
            name_schuler: formulardaten.name_schuler,
            obsv_lehrer: formulardaten.obsv_lehrer,
            obsv_schuler: formulardaten.obsv_schuler,
            datum: formulardaten.datum,
            preis: formulardaten.preis,
            posis: formulardaten.speichern,
            type: 'yoga_archiv'
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
            <h1>Neuer Yoga-Eintrag</h1>
        </div>
        <div class="eingabeformular-zeile">
            <div class="titel-typ-eingabe-gruppe">
                <label for="titel">Alumno</label>
                <input type="text" id="alumno" form="eingabeformular" name="alumno" placeholder="ex. Sandra Peter" size="10" title="Nome do Alumno">
            </div>
        </div>
        <div class="eingabeformular-zeile">
            <div class="betrag-datum-eingabe-gruppe">
            <label for="Observaçõe: ">Observações</label>
            <br>
            <textarea rows="5" cols="33" type="text" id="Observaçõe" form="eingabeformular" name="Observaçõe" placeholder="" size="10" title="Observações Alumno"></textarea>
            </div>
        </div>
        
        <div class="eingabeformular-zeile">
            <div class="betrag-datum-eingabe-gruppe">
                <label for="betrag">Preco</label>
                <input type="number" id="preco" name="preco" form="eingabeformular" placeholder="ex. 10,42 Real" size="10" step="0.01" min="0.01" title="Valor da Aula">
            </div>
        </div>

        <div class="eingabeformular-zeile">
            <div class="betrag-datum-eingabe-gruppe">
                <label for="datum">Datum</label>
                <input type="date" id="datum" name="datum" form="eingabeformular" size="10" title="Datum des Eintrags">
            </div>
        </div>
        <div id= "nota" class="eingabeformular-zeile">
            <div class="betrag-datum-eingabe-gruppe">
            <label for="nota">Nota do Alumno</label>
            <br>
            <textarea rows="5" cols="33" type="text" id="nota" form="eingabeformular" name="nota" placeholder="" size="10" title="Nota do Alumno"></textarea>
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