
"use-strict";
class Yoga_Formular_Anzeige{

    constructor(){
        this._navbar = new Navbar();
        this._yoga_formular = new Yoga_Formular();
    }
    start(){
        this._navbar.anzeigen();
        this._yoga_formular.anzeigen();

    }

}