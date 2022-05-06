<?php
require 'vendor/autoload.php';
use App\Connexion;
use App\HTML;
use App\Input;
use App\Model\Equip;
use App\TubeHelper;

$input = new Input;
$html = new HTML;

//Coefficient / diamInt Minimal
$coeff = [
[2,11],[2.5,11.5],[3,12],[3.5,13],[4,13.7],[4.5,14],[5,14.4],[5.5,15],[6,15.8],[6.5,16],[7,16.2],
[7.5,16.4],[8,17],[8.5,17.2],[9,17.5],[9.5,17.8],[10,18],[10.5,18.2],[11,18.6],[11.5,19],[12,19.2],[12.5,19.5],[13,19.7],[13.5,19.8],
[14,20],[14.5,20],[15,20.1],];


$sql = Connexion::getPDO();
$query = $sql->query("SELECT * FROM equipements");
$equip = $query->fetchAll(PDO::FETCH_CLASS,Equip::class);

$tubeHelper = new TubeHelper;

$tubes = $sql->query("SELECT * FROM tube")
            ->fetchAll(PDO::FETCH_ASSOC);
$uniqueTubes = $tubeHelper->getUniqueTube($tubes);           
$sumCoeff = $tubeHelper->coeffSum($_POST,$equip);
$diamMin = $tubeHelper->getMinDiam($coeff);
$tuyau = $tubeHelper->getSize($tubes,$_POST);
$count = $tubeHelper->countInputsSet($equip);

$tubePerEquip = new TubeHelper;

$error = false;
if($diamMin === null ){
    $error = "Erreur ! Vous disposez de trop d'équipements pour utiliser cette méthode de calcul.\n<strong>La méthode 'Collective'</strong> serait plus appropriée.";
}

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/switch.css">
    <script src="js/js.js" defer></script>
    <title>Document</title>
</head>
<body>
    <div class="headerContainer">
        
        <!-- Affichage du diametre min  -->
        <!-- Si une valeur est selectionné : -->
        <?= $html->instructions($_POST) ?>
        <!-- switch CSS -->
        <div class="containerToggle">
            <label for="togglePvcDiam">Afficher le diamètre des évacuations </label>
            <div class="back togglePvc">
                <div class="behindCircle">
                    <input id="togglePvcDiam" type="checkbox" class=" circleCenter">
                </div>
            </div>
        </div>
    <!-- fin Switch CSS -->
    </div>
    <?php if($count && !empty($_POST)) : ?>
    <div class="result">
        <p><?= $error ? $error : "Diamètre intérieur minimal du tuyau d'alimentation générale : " . str_replace('.',',',$diamMin) . " mm" ?></p>
    </div>
    <?php endif; ?>
        <!-- Si aucune valeur selectionné -->
    <?php if(!$count && !empty($_POST)) : ?>
        <div class="result resultFalse">
            <p>Veuillez entrer une quantitée</p>
        </div>
    <?php endif; ?>
    <!-- Affichage du type de tube et dimension si tube entré  -->
    <?php if(isset($_POST['tube']) && $_POST['tube'] !== "" && $count && !$error): ?>
    <div class="result result2">
        <p><?= !empty($_POST['tube']) ? "Tuyauterie à installer :  (Ø ext / ep )<br> <strong>" . ucfirst(htmlentities($_POST['tube'])). " : Ø " . $tuyau . " mm </strong>" : "" ?></p>
    </div>
    <?php endif; ?>
    <form class="form" action="" method="POST">
    
        <!-- Row représentant les equipements -->
        <?php for($i = 0; $i < count($equip); $i ++) :?>
            <?= $input->createInput($equip[$i]->getName(),$equip[$i]->getName(),$_POST,$equip[$i]->getDiamEvac())?>
        <?php if (!empty($_POST) &&  $_POST[str_replace(" ","_",$equip[$i]->getName())] >= 1 ) : ?>
            <div class="sizePerEquip">
                <!-- Diametre miniaml du tube par equipement selectionné  -->
                <?php $diamMinTube = $tubePerEquip->setDiamMin($equip[$i]->getDiamMin()); ?>
                <?php $tubeSizeChoice = $tubePerEquip->getSize($tubes,$_POST); ?>
                <!-- Diametre x Epaisseur minimal en fonction du matériau séléctionné par l'utilisateur  -->
                <div class="divDescrib">
                    <p class = "pDescrib">Tube à installer par <strong><?= str_replace("_"," ",$equip[$i]->getName())?></strong> : </p>
                    <p class = "pDescrib">Diamètre <strong>intérieur minimal</strong> : <strong> <?= $diamMinTube?> mm </strong></p>
                    <p class = "pDescrib">Tube recommandé :<strong> <?=!empty($_POST['tube']) ? htmlspecialchars(ucfirst($_POST['tube'])) . " " . $tubeSizeChoice : "choisissez un matériau"?> </strong></p>
                </div>
            </div>
        <?php endif ?>
        <?php endfor ?>
     <!-- SELECT -->
     <select id="select" name="tube" class="select">
            <option value="">Choisissez un matériau</option>
            <?php foreach($uniqueTubes as $tube) : ?>
            <option id ="sOption"<?php if(!empty($_POST)) : ?>
                    <?= $selected = $_POST['tube'] === $tube ? 'selected' : "" ?>
                    <?php endif ?>
                    value="<?= $tube ?>"><?= ucfirst($tube) ?></option>
            <?php endforeach ?>
        </select>
        <button class="btn" type="submit">Dimensionner</button>
        <div class="reset"> 
            <a class="resetLink"  href="/">Réinitialiser</a>
        </div>
    </form>
</body>
</html>