<?php
require 'settings.php';
var_dump($_POST);

if($_POST['type'] === 'stock'){

    $name = $_POST['titel'];
    $beschreibung = $_POST['beschreibung'];
    $betrag = $_POST['betrag']*100;
    $datum = $_POST['datum'];
    $einnahme = $_POST['einnahme'];
    $versand = $_POST['versand']*100;
    $kategorie = $_POST['kategorie'];
    $anzahl = $_POST['anzahl'];

    $sql = "INSERT INTO stock (
        titel, 
        kategorie,
        beschreibung,
        betrag,
        versand,
        datum,
        anzahl)
    VALUES (
        '$name', 
        '$kategorie',
        '$beschreibung',
        '$betrag',
        '$versand',
        '$datum',
        '$anzahl')";

    $conn->exec($sql);

}elseif($_POST['type'] === 'einnahme'){


    $name = $_POST['titel'];
    $betrag = $_POST['betrag']*100;
    $datum = $_POST['datum'];
    $kategorie = $_POST['kategorie'];
    $anzahl = $_POST['anzahl'];

    $sql = "INSERT INTO einnahmen (
        titel, 
        kategorie,
        betrag,
        datum,
        anzahl)
    VALUES (
        '$name', 
        '$kategorie',
        '$betrag',
        '$datum',
        '$anzahl')";

    $conn->exec($sql);
}elseif($_POST['type'] === 'yoga_archiv'){


    $name_schuler = $_POST['name_schuler'];
    $id_schuler = $_POST['id_schuler'];
    $obsv_lehrer = $_POST['obsv_lehrer'];
    $obsv_schuler = $_POST['obsv_schuler'];
    $datum = $_POST['datum'];
    $positionen = $_POST['posis'];
    $preis = $_POST['preis']*100;

    $sql = "INSERT INTO yoga_archiv (
        name_schuler, 
        id_schuler,
        obsv_lehrer,
        obsv_schuler,
        positionen,
        preis,
        datum)
    VALUES (
        '$name_schuler', 
        '$id_schuler',
        '$obsv_lehrer',
        '$obsv_schuler',
        '$positionen',
        '$preis',
        '$datum')";

    $conn->exec($sql);
}elseif($_POST['type'] === 'anmelden'){
    $date1 = strtr($_REQUEST['date'], '/', '-');


    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $date = strtr($_POST['birthday'],'/','-') ;
    $birthday = date("Y-m-d", strtotime(strtr($_POST['birthday'],'/','-')));
    $phone = $_POST['phone']; 
    $mail = $_POST['mail'];

    $sql = "INSERT INTO clients (
        first_name, 
        last_name,
        birthday,
        phone,
        mail)
    VALUES (
        '$first_name', 
        '$last_name',
        '$birthday',
        '$phone',
        '$mail')";

    $conn->exec($sql);
}



?>