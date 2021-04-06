"use-strict";
class Navbar{

    constructor(){
      
        this._html = this._html_generieren();

    }

    _html_generieren(){
        let nav = document.createElement("nav");
        nav.setAttribute("id","navbar");

        nav.setAttribute("class","navbar navbar-dark bg-dark");
        nav.innerHTML=      `<a class="navbar-brand" href="#">Lari's Triupfas </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapsING" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a id = "anmeldeformular" class="nav-link" href="#"> Register New Client </a>
            </li>
            <li class="nav-item active">
              <a id = "yogasession" class="nav-link" href="#">Register Yoga Session</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
        </div>  `;
        this._event(nav);
        return nav ;
    }

    anzeigen(){
        let body = document.querySelector("body");
        if(body !== null){
            body.insertAdjacentElement("afterbegin",this._html);
        }
    }

    _event(e){

      e.querySelector('#anmeldeformular').addEventListener("click", function() {
        document.body.innerHTML = '';
        let yoga_anzeige = new Anmelde_Formular_Anzeige();
        yoga_anzeige.start();   
      });

      e.querySelector('#yogasession').addEventListener("click", function() {
        document.body.innerHTML = '';
        let yoga_anzeige = new Yoga_Formular_Anzeige();
        yoga_anzeige.start();

      });


    }
    
   
}