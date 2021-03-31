"use strict";
class Inventar{

    constructor(){

        this._html = this._html_generieren() ;

        let ajax = new XMLHttpRequest();
        let method = "GET";
        let url = "tabelle_get.php";
        let asynchronos = true ;
        ajax.open(method, url , asynchronos);
        ajax.send();
   
        ajax.onreadystatechange = function callback(){

           if(this.readyState == 4 && this.status == 200){
                let data = JSON.parse(this.responseText);
                let tabellen_html = "";
                data.forEach(element => {

                    tabellen_html += "<tr>" ;
                        tabellen_html += "<td>" + element.titel + "</td>";
                        tabellen_html += "<td>" + element.kategorie + "</td>";
                        tabellen_html += "<td>" + element.beschreibung + "</td>";
                        tabellen_html += "<td>" + element.betrag + "</td>";
                        tabellen_html += "<td>" + element.versand + "</td>";
                        tabellen_html += "<td>" + element.datum + "</td>";
                        tabellen_html += "<td>" + element.anzahl + "</td>";

                    tabellen_html += "</tr>"
                });                
                document.getElementById("tabelle_body").innerHTML = tabellen_html;
           } 
  

        }
    }

    _html_generieren(){
   
        let tabelle_body = document.createElement("tbody");
        tabelle_body.setAttribute("id","tabelle_body");

        let tabelle = document.createElement("table");
        tabelle.setAttribute("id","example");
        tabelle.setAttribute("class","table") ;
        tabelle.setAttribute("style" , "width:100%");

        let uberschrift_1 = document.createElement("thead") ;
        uberschrift_1.setAttribute("class" , "thead-dark") ;
        uberschrift_1.innerHTML = `
        <tr>
            <th scope="col"> Name </th> 
            <th scope="col"> Kategorie </th> 
            <th scope="col"> Beschreibung </th>
            <th scope="col">Betrag</th>
            <th scope="col">Versand</th>
            <th scope="col">Datum</th>
            <th scope="col">Anzahl</th> 
        </tr>`;

        tabelle.insertAdjacentElement("afterbegin",uberschrift_1);
        tabelle.insertAdjacentElement("beforeEnd",tabelle_body);


        return tabelle ;
    }
    
    anzeigen(){
        let tab =document.querySelector("body");
        if(tab != null){
            tab.insertAdjacentElement("afterend", this._html);
        }
    }


}