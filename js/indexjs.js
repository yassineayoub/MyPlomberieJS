// --- Class ---
const equips = new Equipements;
const tubeClass = new Tubes;
const html = new HTML;
const coefficiants = new Coefficiants;
const helper = new Helper;

//Création de la list d'options
html.createTubeListOptions();
// import des équipements dans le select
const selectEquipement = document.querySelector('#equipSelect');
selectEquipement.classList.add('select')
// on boucle sur la fonction pour inserer chaque equipement(options) dans le select
const selectOptions = html.insertOptionToSelect(selectEquipement, equips.equipements, equips.equipementsToShow);
//bouton d'ajouts des equipements
const addEquipButton = document.querySelector("#equipSelectBtn");
addEquipButton.classList.add('selectBtn')
// bouton de calcul 
const calcButton = document.querySelector('#submit-form');
//Form selector
const form = document.querySelector('form');
//Reset button
const resetBtn = document.querySelector('a.reset');
//Création des inputs de base
html.createBaseInputs();
// supprime le form-group div le plus proche du bouton "btn--delete" et l'ajoute dans l'option du select
html.deleteButtonClick()
//Creation des div de description des equipements
html.createDivDescription()

// ----- Handlers -----
function handlerdeleteAddEquipement() {
    let optionToAdd = this.closest(".form-group").firstChild.textContent;
    html.createOption(optionToAdd, selectEquipement)
    this.closest(".form-group").remove()
}
/**
 * Permet d'ajouter la nature du tube, de diametre exterieur x l'épaisseur de l'équipement sélectionné
 * @param {} e 
 */
let handleInsertEquipTube = function (e) {
    e.preventDefault()
    // on recupere tout les form-labels 
    let formLabels = document.querySelectorAll('.form-label')
    // Pour chaque label, on récupere le LabelName
    for (const labels of formLabels) {
        //Nom de chaque input affiché // Evier , Lavabo ...
        const labelName = labels.textContent
        //Diametre min en fonction de l'équipement ex : Evier = 12
        const sizeMin = equips.getDiamMinEquip(labelName);
        //Tube à installer [cuivre,diamExt,epaisseur] 
        const tubeToInstall = tubeClass.getDiamPerEquip(sizeMin);
        //On créer le text à afficher dans le paragraphe en question
        let text = "";
        if (tubeToInstall.length !== 0) {
            text = `Tube recommandé :<strong>  ${tubeToInstall[0]} Ø ${tubeToInstall[1]} x ${tubeToInstall[2]} mm </strong>`
        } else {
            text = "Tube recommandé : <strong>Veuillez choisir un matériau</strong>";
        }
        //On va chercher le pDescrib dans lequel modifier le text 
        let pDescrib = labels.parentNode.nextSibling.lastChild;
        //On modifie le textContent :
        pDescrib.innerHTML = text;
    }

}
/**
 *Handler qui renvoi affiche les données sur l'alimentation générale à installer
 */
let handleInsertGereralTube = function (e) {
    e.preventDefault();
    const inputs = document.querySelectorAll('.form-control')
    //Calcul du coefficiant global
    const globalCoefficiant = html.calcInputsValue(inputs);

    // Calcul du diametre général minimal 
    const globalDiamMin = coefficiants.getDiamMinGlobal(globalCoefficiant);

    //Verification des champs et affichage dans la span en haut du form
    const verif = html.checkValue(globalDiamMin, globalCoefficiant);

    //Recupération du matériau séléctionné
    const mat = html.getSelectorMat();
    //Retour une array qui contient tout les diametres supérieur a globalDiamMin
    let callbackTube = function (element) {
        if (element.type == mat && globalDiamMin <= element.diamInt) {
            return [element.diamExt, element.ep]
        }
    }
    let tubeSelection = tubeClass.tubes.map(callbackTube);

    //On selectionne l'array la plus petite du tableau mais plus grande que globalDiamMin
    const diamGeneralToInstall = tubeClass.getMinDiam(tubeSelection);
    //On display le resultat avec le materiau et le diametre à installer
    if (verif) {
        html.displayGlobalDiamMinWithMat(mat, diamGeneralToInstall);
    }

    html.showDescription()
  
}
/**
 *On veut que l'element du select s'ajoute a la liste des matériaux 
 */
let handleAddEquipement = function () {
    let equipName = selectEquipement.value;
    //au clic sur le btn, on ajoute un input
    html.createInput(equipName);
    let divContainer = document.querySelector(`.${helper.stringReplace(helper.lcFirst(equipName))}.form-group`)
    //On créer la div qui va contenir les 3 p d'informations
    const div = html.createDiv(null,['divDescrib','hidden'])

    //Creation des pDescription
    const textFirstP = `Tube à installer par <strong> ${equipName} </strong> :`;
    const textSecondP = `Diamètre <strong>intérieur minimal</strong> : <strong> ${equips.getDiamMinEquip(equipName)} mm </strong>`;
    html.createPDescription('pDescrib',textFirstP,div)
    html.createPDescription('pDescrib',textSecondP,div)
    html.createPDescription('pDescrib',null,div)

    divContainer.after(div);

    //Rend les boutons ajoutés supprimable
    const deleteBtn = document.querySelectorAll(".btn--delete");
    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', handlerdeleteAddEquipement);
    }

}
//Enleve une option du select a l'ajout dans la liste
let handlerRemoveOption = function (e) {
    e.preventDefault();
    let optionToRemove = document.querySelector(`option[value="${selectEquipement.value}"`)
    optionToRemove.remove();
}

//---- Event Listener ---

addEquipButton.addEventListener('click', handleAddEquipement)
addEquipButton.addEventListener('click', handlerRemoveOption)
calcButton.addEventListener('click', handleInsertEquipTube)
calcButton.addEventListener('click', handleInsertGereralTube)