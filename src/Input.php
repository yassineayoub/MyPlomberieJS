<?php
namespace App;

use App\Model\Equip;

class Input extends Equip{

    public function createInput(string $name,string $label, array $data, ?string $toggleEvac = null): string
    {
        if($toggleEvac !== null){
            $toggleEvac ="<div class='hidden pvc'>PVC Ø " . $toggleEvac . "mm </div>";
        }
        $name = str_replace(" ","_",$name);
        $value = !empty($data[$name]) ? htmlentities($data[$name]): "" ;
        return <<<HTML
        <div class="form-group $name" id="inputGroup">
            <label class="form-label " for="$name">$label</label>
            <div class="container">
                $toggleEvac
                <input class="form-control " type="number" id="$name" name="$name" value="$value" placeholder="0">
            </div>
        </div>
        HTML;
    }

    public function createSelect($name){
        $label = ucfirst($name);
        return<<<HTML
        <form action="#" method="GET">
        <select name="tube">
            <option value="">Choisissez un matériau</option>
            <option value="$name">$label</option>
        </select>
    </form>
    HTML;
    }
    
}