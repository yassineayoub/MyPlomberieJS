<?php
namespace App;

use PDO;

class Connexion{

    public static function getPDO(): PDO
    {
        return new PDO('sqlite:bddplomberie.db',null,null);
    }
        
}