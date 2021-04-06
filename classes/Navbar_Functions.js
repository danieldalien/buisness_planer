"use-strict";
class Navbar_Functions{

    constructor(){

    }
    _events(event){
      
        document.getElementById("anmeldeformular").addEventListener("click", function() {
            
          document.body.innerHTML = '';
          let yoga_anzeige = new Anmelde_Formular_Anzeige();
          yoga_anzeige.start();   
  
        });
        document.getElementById("yogasession").addEventListener("click", function() {
  
            document.body.innerHTML = '';
            let yoga_anzeige = new Yoga_Formular_Anzeige();
            yoga_anzeige.start();
  
        });
  
      }
  

}