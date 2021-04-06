class Anmelde_Formular_Anzeige{

    constructor(){
        this._navbar = new Navbar();
        this._anmelde_formular = new  Anmelde_Formular();
    }
    start(){
        this._navbar.anzeigen();
        this._anmelde_formular.anzeigen();

    }

}