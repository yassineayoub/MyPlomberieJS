  <?php        $equipHidden =["Bidet","Baignoire 170 L","Urinoir","Bac à laver"];?>
  
  <!-- Selecteur d'équipements  -->
    <div class="addEq">
            <select class="selectEq">
                <?php for($i=0 ; $i < count($equipHidden); $i++) : ?>
                    <option class="<?= str_replace(" ","_",$equipHidden[$i])?>" value="<?= $equipHidden[$i] ?>"><?= ucfirst(str_replace(" ","_",$equipHidden[$i]))?></option>
                <?php endfor ?>
            </select>
            <button href="#" class="btnEq" type="button">Ajouter un équipement</button>
        </div>

