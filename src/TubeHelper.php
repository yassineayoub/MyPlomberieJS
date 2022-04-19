<?php
namespace App;

use App\Model\Equip;

class TubeHelper extends Equip{

    public $sumCoeff;
    public $diamMin;
 
    /**
     * coeffSum : Addition des différents coefficients  
     *
     * @param  mixed $post : $_GET ou $_POST
     * @param  mixed $datas : L'array (fetchall) contenant les coéfficients des équipements
     * @return int
     */
    public function coeffSum(array $post, array $datas): int|float
    {
        $sumCoeff = 0;
        foreach($datas as $data){
            if (isset($post) && $post !== ""){
                foreach($post as $k => $values) {
                        $k = (str_replace('_',' ',$k));         
                    if( $values !== "" && $data->getName() == $k ) {
                        $sumCoeff += ($values * $data->getCoeff()) ;
                    }
                }
            }
        }
        return $this->sumCoeff = $sumCoeff <= 2 ? 2 : $sumCoeff;
        
    }
    
       
    /**
     * getMinDiam : On recherche le diamètre minimal associé à la somme des coeffs(coeffsum())
     *
     * @param  mixed $coeff => array de coefficiant / diamètre int.tube
     * @return int
     */
    public function getMinDiam(array $coeff)
    {
        $diamMin = null;
        $sumCoeff = $this->sumCoeff; 
        for ($i=0; $i < count($coeff); $i++) { 
            if(strval($sumCoeff) === strval($coeff[$i][0])){
                 $diamMin = $coeff[$i][1];
                 return $this->diamMin = $diamMin;
            }
        }
        if($diamMin === null){
            $sumCoeff = $this->roundDemiSup($sumCoeff);
            for ($i=0; $i < count($coeff); $i++) { 
                if(strval($sumCoeff) === strval($coeff[$i][0])){
                    $diamMin = $coeff[$i][1];
                    return $this->diamMin = $diamMin;
                }
            }
        }
    }
    public function setDiamMin($diamMin)
    {
        return $this->diamMin = $diamMin;
    }
    
    /**
     * getUniqueTube : Renvoi une array avec le nom des tubes (sans doublons)
     *
     * @param  mixed $tubes
     * @return array
     */
    public function getUniqueTube(array $tubes): array
    {
        $tubesName = [];
        for ($i=1; $i < count($tubes) ; $i++) { 
            $tubesName[] = $tubes[$i]['type'];
        }
       return array_unique($tubesName);
        
    }
    
    /**
     * getSize : retourne une chaine formaté DiamExterieur x Epaisseur
     *
     * @param  array $tubes : array contenant les tubes;
     * @param  array $post
     *
     */
    public function getSize(array $tubes, array $post)
    {
        //On recherche la dimension du materiaux associé au diamMin recommandé :
        if(!empty($post['tube']) && !empty($post)){   
        $diamExt = [];
        $ep = [];
            foreach($tubes as $tube){
                if ($tube['type'] === $post['tube']){
                    //recherche de la valeur la plus proche
                    $closest = 0;
                    if($this->diamMin - $tube['diamInt'] <= $closest){
                        $diamExt[] = $tube['diamExt'];
                        $ep[] = $tube['ep'];
                        
                    }
                }
            }
            return $diamExt[0] ." x " .$ep[0];
        }
    }    
    /**
     * countInputsSet : l'array POST affiche $_POST['name']= ""; du coup on recherche toutes les valeurs où 'empty' et on retourne le nombre de fois où $count !==0;
     *
     * @param  mixed $equipements
     *
     */
    public function countInputsSet(array $equipements): null|int
    {
    $count = 0;
    for ($i=0; $i < count($_POST)-1 ; $i++) { 
        $str = str_replace(' ','_',$equipements[$i]->getName());
        $count += !empty($_POST[$str]); 
    }
    return $count;

    }
    /**
     * roundDemiSup :Arrondi la valeur au demi supérieur;  
     *
     * @param  mixed $val
     * @return int|float
     */
    public function roundDemiSup($val){
        $arrondi = round($val,0,PHP_ROUND_HALF_UP);
        return $arrondi < $val ? $arrondi + 0.5 : $arrondi;
    }

}