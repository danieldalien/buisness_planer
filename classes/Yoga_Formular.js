
"use strict";

class Yoga_Formular{

    constructor(){

        this._html = this._html_generieren();
        this._yoga_posis = this._test_ajax();
        
    }
     
    _formular_daten_holen(e){

        console.log(e.target.elements);
        const length = e.target.elements[0].length;
        console.log(length);
        let name = '';
        let id_schuler ;
        for(let i=0;i<length;i++){
            if(e.target.elements[0][i].selected === true){
                 name = e.target.elements[0][i].textContent ;
                 id_schuler = e.target.elements[0][i].value ;
            }
        }
        let yoga_eintrag = {
            name_schuler : name,
            obsv_lehrer : e.target.elements[1].value,
            preis : e.target.elements[2].value,
            datum : e.target.elements[3].value,
            obsv_schuler : e.target.elements[4].value,
            id_schuler : id_schuler,
            positionen : []

        }
        console.log(yoga_eintrag);

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

        return yoga_eintrag ;
    }

    _test_ajax(){

        $.ajax({                                      
            url: 'get_yoga.php',                  //the script to call to get data          
            data: "",                        //you can insert url argumnets here to pass to api.php
            dataType: 'json',                //data format      
            success: function(data)          //on recieve of reply
            {
                doWork(data);

            }           
        });

        function doWork(data){
          
            let yogatable = document.createElement("table");
            yogatable.setAttribute("id","yogatable");
            yogatable.setAttribute("style","display:none");

            let table_titel = document.createElement("tr");

            table_titel.innerHTML = ` <th>Nome</th> <th>Info</th> <th>Imag</th>`;
            yogatable.insertAdjacentElement("afterbegin" , table_titel);

            let table_body = document.createElement("tbody");
            table_body.setAttribute("id" , "tablebody");

            yogatable.insertAdjacentElement("beforeend" , table_body);


            data.yoga_posis.forEach(element=>{

                let div = document.createElement('div');
                div.setAttribute("class","radio");

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

                document.getElementById("radio").appendChild(div);

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
            let select_container = document.createElement("div");
            select_container.setAttribute("class","col-md-4 inputGroupContainer");
            let select_conteiner_2 = document.createElement("div");
            select_conteiner_2.setAttribute("class","input-group");

            let select = document.createElement("select");
            select.setAttribute("id" , "select_client");
            select.setAttribute("class" , "form-select");
            let option = document.createElement("option");
            option.innerHTML=`Open this select menu`;
            select.appendChild(option);
            let span = document.createElement("span");
            span.setAttribute("class","input-group-addon");
            span.setAttribute("style","width: 50px");

            span.innerHTML=`<i class="glyphicon glyphicon-user"></i>`;
            select_conteiner_2.insertAdjacentElement("afterbegin",span);

            select_conteiner_2.insertAdjacentElement("beforeend",select);
            select_container.insertAdjacentElement("afterbegin",select_conteiner_2);

            document.getElementById("client").appendChild(select_container);



            data.clients.forEach(element=>{
                let option = document.createElement("option");
                option.setAttribute("value", element[0]);
                option.innerHTML=element[1];
                select.appendChild(option);

            });
            
            let button_show = document.createElement('button') ;
            button_show.setAttribute("id" , "show_button") ;
            button_show.innerHTML= 'Show ME';

            button_show.onclick =  function show_positions(){
                let table = document.getElementById('yogatable');
                table.style.display = table.style.display == "none" ? "block" : "none";
            }

            let body = document.getElementById('infobox');
            body.insertAdjacentElement("afterbegin" , button_show) ;

            body.insertAdjacentElement("beforeend",yogatable);


        }
    }

    _absenden_event(eingabeformular){

        eingabeformular.querySelector('#eingabeformular').addEventListener("submit", e => {
            e.preventDefault() ;
            let formulardaten = this._formular_daten_holen(e);
            document.getElementById("eingabeformular").reset();

            $.ajax({
        
                type: "POST",
                url: "einfugen.php",
                data: {
                    name_schuler: formulardaten.name_schuler,
                    id_schuler: formulardaten.id_schuler,
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
        eingabeformular.setAttribute("id" ,"eingabeformular-container" );
        eingabeformular.setAttribute("class" ,"yoga_container" );
        eingabeformular.innerHTML =`
        <form class="well form-horizontal" id="eingabeformular" action="einfugen.php" method="post">
        <fieldset>

        <legend><center><h2><b>Yoga-Client</b></h2></center></legend><br>

        <div class="form-group" id="client" >
                <label class="col-md-4 control-label" for="titel">Alumno</label>
        </div>

        <div class="form-group">
            <label class = "col-md-4 control-label" for="Observaçõe: ">Observações</label>
            <div class="col-md-4 inputGroupContainer">
                <div class="input-group">
                    <span  style="width: 50px;" class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                    <textarea class="form-control" rows="5" cols="33" type="text" id="Observaçõe" form="eingabeformular" name="Observaçõe" placeholder="" size="10" title="Observações Alumno"></textarea>
                </div>
            </div>
        </div>

        <div class="form-group">
            <label class = "col-md-4 control-label" for="betrag ">Preco</label>
            <div class="col-md-4 inputGroupContainer">
                <div class="input-group">
                    <span style="width: 50px;" class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                    <input style="height: 30px;" class="form-control" type="number" id="preco" name="preco" form="eingabeformular" placeholder="ex. 10,42 Real" size="10" step="0.01" min="0.01" title="Valor da Aula">
                </div>
            </div>
        </div>

        <div class="form-group">
            <label class = "col-md-4 control-label" for="datum ">Datum</label>
            <div class="col-md-4 inputGroupContainer">
                <div class="input-group">
                    <span style="width: 50px;" class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                    <input style="height: 30px;" class="form-control" type="date" id="datum" name="datum" form="eingabeformular" size="10" title="Datum des Eintrags">
                </div>
            </div>
        </div>

        <div class="form-group">
            <label class = "col-md-4 control-label" for="nota ">Nota do Alumno</label>
            <div class="col-md-4 inputGroupContainer">
                <div class="input-group">
                    <span style="width: 50px;" class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                    <textarea class="form-control" rows="5" cols="33" type="text" id="nota" form="eingabeformular" name="nota" placeholder="" size="10" title="Nota do Alumno"></textarea>
                </div>
            </div>
        </div>

        <div class="form-group">
            <label class = "col-md-4 control-label" for="nota ">Positiones feitos</label>
            <div class="col-md-4 inputGroupContainer">
                <div  id="radio" class="form-check">
                    
                    
                </div>
            </div>
        </div>

    
        <div class="form-group">
        <label class="col-md-4 control-label"></label>
        <div class="col-md-4"><br>
          &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<button type="submit" class="btn btn-warning" >&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspSUBMIT <span class="glyphicon glyphicon-send"></span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</button>
        </div>
      </div>
      
      </fieldset>
        </form>`;

        let info_box = document.createElement("div");
        info_box.setAttribute("id","infobox");
        info_box.setAttribute("class","infobox");
        
        let body = document.createElement('div');
        body.setAttribute("id","body");
        body.setAttribute("class","container");

        body.insertAdjacentElement("beforeend",eingabeformular);
        body.insertAdjacentElement("afterbegin",info_box);
         eingabeformular = body;
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