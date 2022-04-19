<?php
// insertion CSV en BDD !
$sql = new PDO('sqlite:bddplomberie.db',null,null);
// code pour lire dans un fichier CSV :
$file = fopen("NDCtest2/multicouche.csv",'r');
if ($file !== false){
    while(($fget = fgetcsv($file,1000,"\n")) !== false){
        $fget = str_replace(',','.',$fget);
        $count = count($fget);
        for ($i=0; $i < $count; $i++){
            $csv[] = explode(";",$fget[$i]);
        }
    }
    fclose($file);
}

// suppression de quelques array au besoin :
// unset($csv[0],$csv[1]);
// for ($i=0; $i < count($csv); $i++) { 
//     unset($csv[$i][0]);
// }
// A EXECUTER POUR INSERER EN BDD : 
foreach($csv as $row){
    $line = "(null,'multicouche'," .implode(",",$row).")";
    // var_dump($line);
    // $query = $sql->exec("INSERT INTO tube (id,type,diamExt,ep,diamInt,contenance) VALUES $line"); 
}
