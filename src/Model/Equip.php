<?php
namespace App\Model;

class Equip{
    private $id; 
    private $name;
    private $debitMin;
    private $diamMin;
    private $coeff;
    private $diamEvac;


    public function getDiamEvac()
    {
        return $this->diamEvac;
    }
    public function getName()
    {
        return $this->name;
    }
    public function getDiamMin()
    {
        return $this->diamMin;
    }
    public function getCoeff()
    {
        return $this->coeff;
    }
}