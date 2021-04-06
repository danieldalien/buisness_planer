<?php
require 'settings.php';

$sql = "SELECT*FROM clients" ;
$stm = $conn->prepare($sql);
$stm -> execute();
$clients = $stm->fetchall();
// echo '<pre>';
// print_r($result);

$sql = "SELECT*FROM yoga_posi" ;
$stm = $conn->prepare($sql);
$stm -> execute();
$yoga_posis = $stm->fetchall();

echo json_encode(array('yoga_posis' => $yoga_posis, 'clients' => $clients));

//echo json_encode(($result));

// $sql = "SELECT*FROM stock ";
// $result -> $mysqli -> query($sql);

// print_r($result);

// // Numeric array
// $row = $result -> fetch_array(MYSQLI_NUM);
// printf ("%s (%s)\n", $row[0], $row[1]);

// // Associative array
// $row = $result -> fetch_array(MYSQLI_ASSOC);

//  echo '<pre>';
//  print_r($result);

?>