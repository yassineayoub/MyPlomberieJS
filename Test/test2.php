<?php

use App\Connexion;

require 'vendor/autoload.php';


$sql = Connexion::getPDO();
$query = $sql->query('SELECT * FROM tube',PDO::FETCH_OBJ);
$tubes = $query->fetchAll();
// dump($tubes);
// $json = json_encode($tubes);
// dump($json);
// dump(json_decode($json));

$file = file_get_contents('NDCtest2/NDC_ECS EFS.csv');
$json = json_encode($file);
dump($json);


