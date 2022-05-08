class HTML extends Tubes {

   


    /**
     * Function qui permet de lister les matériaux dans le select
     * 
     */
    createTubeListOptions = function () {
        const tubeSelector = document.querySelector('#tubeSelector');
        tubeSelector.classList.add('select')
        for (const tube of this.getTubeMat()) {
            const tubeOption = document.createElement('option');
            tubeOption.textContent = helper.ucFirst(tube);
            tubeOption.value = tube;
            tubeSelector.append(tubeOption);
        }
    }
    /**
     *
     *Function qui permet d'ajouter une option à un select
     * @param {string} optionName Nom de l'option à ajouter
     * @param {HTMLElement} appendTo Element sur lequel append
     */
    createOption = function (optionName, appendTo) {
        let option = document.createElement('option');
        option.value = optionName;
        option.textContent = optionName;
        appendTo.append(option);
    }
    /**
     * 
     * @param {HTMLElement} selectName Element select
     * @param {array} arrayToInsert Array contenant les equipements
     * @param {array} equipementsToShow Array contenant les équipements a afficher au démma
     */
    insertOptionToSelect = function (selectName, arrayToInsert, equipementsToShow) {
        for (let i = 0; i < arrayToInsert.length; i++) {
            //si l'equipement n'est pas présent dans la liste déja affiché de base alors :
            if (html.isOptionToShowInSelect(arrayToInsert[i].name, equipementsToShow)) {
                let equipement = arrayToInsert[i];
                //création d'une option du select
                let option = this.createOption(equipement.name,selectName)

            }
        }
    }
    /**
     * 
     * @param {string} equipement 
     * @param {array} equipementToDontShow Liste des equipements a ne pas afficher de base dans le select car deja affichés de base
     * @returns boolean
     */
    isOptionToShowInSelect = function (equipement, equipementToDontShow) {
        if (equipementToDontShow.includes(equipement)) {
            return false
        } else {
            return true;
        }
    }

    /**
     * Créer les inputs à afficher de base (modifier equipementsToShow pour modifer)
     */
    createBaseInputs = function (){
        equips.equipements.forEach(equipement => {
            if (!html.isOptionToShowInSelect(equipement.name, equips.equipementsToShow)) {
                // Pour chaque equipements présent dans l'array , on créer un input 
                html.createInput(equipement.name, equipement.coeff)
            }
        });
    }


     /**
      * 
      * @param {string} labelName Le nom du label
      * @param {HTMLElement} appendTo L'element sur lequel append le label
      */
     createFormLabel = function (labelName,appendTo) {
        const formLabel = document.createElement('label');
        const forName = helper.stringReplace(helper.lcFirst(labelName))
        formLabel.classList.add('form-label');
        formLabel.setAttribute('for', forName);
        formLabel.innerHTML = labelName;
        appendTo.appendChild(formLabel);
    }
    /**
     * Créer un input
     * @param {string} inputName 
     * @param {HTMLElement} appendTo 
     */
    createFormInput = function (inputName, appendTo){
        const formInput = document.createElement('input');
        const coefficiant = this.getCoeffEquip(inputName);
        inputName = helper.stringReplace(helper.lcFirst(inputName))
        formInput.classList.add('form-control')
        formInput.setAttribute('name', inputName)
        formInput.setAttribute('data-coeff', coefficiant);
        formInput.setAttribute("id", inputName);
        formInput.setAttribute("placeholder", "qt")
        appendTo.appendChild(formInput);
    }
    createInput = function (equipName) {
        // on met en minuscule la 1ere lettre
        let optionClass = helper.stringReplace(helper.lcFirst(equipName));
        //creation de la div GENERAL pour chaque equipement
        const formGroupDiv = document.createElement('div');
        //Ajout des différentes class :
        formGroupDiv.classList.add(optionClass);
        formGroupDiv.classList.add('form-group');
        document.querySelector('div.equip').appendChild(formGroupDiv)
        //creation de la div qui contiendra l'input et ajout au form-group
        let divContainer = document.createElement('div')
       //creation du form Label
        html.createFormLabel(equipName,formGroupDiv);
        //creation du form Input
        html.createFormInput(equipName, divContainer)
     
        //ajout du divContainer au form group
        divContainer.classList.add('container')
        formGroupDiv.appendChild(divContainer)
    
        //Ajout d'un bouton de suppression
        html.createFormDeleteBtn(formGroupDiv)
    
    }
    /**
     * Creation d'un bouton de supression pour les inputs affichés
     * @param {HTMLElement} appendTo l'element html dans lequel append le bouton
     */
    createFormDeleteBtn = function (appendTo) {
        let deleteBtn = document.createElement('div');
        deleteBtn.innerHTML = '<i class="bi bi-x-square" style="display:flex ; height: 100%; font-size: 45px ; width: 100%"></i>'
        deleteBtn.classList.add('btn--delete');
        appendTo.appendChild(deleteBtn);
    }

     /**
     * Créer un HTMLElement p
     * @param {string} className la classe de l'element p
     * @param {*} innerHTML le texte à inserer
     */
    createPDescription = function (className,innerHTML,appendTo) {
        const p = document.createElement('p');
        p.classList.add(className);
        if (innerHTML !== null ){
            p.innerHTML = innerHTML;
        }
        appendTo.append(p);
    }

    /**
     *Créer la déscription pour chaques equipements //
    * Renvoi le tube a installer et le diametre minimal
    */
    createDivDescription = function () {
    const formGroupDiv = document.querySelectorAll('.form-group')
    for (let i = 0; i < formGroupDiv.length; i++) {
        let equipName = formGroupDiv[i].firstChild.textContent
        let diamMin = equips.getDiamMinEquip(equipName)

         //On créer la div qui va contenir les 3 p d'informations
        const div = html.createDiv(null,['divDescrib','hidden'])

        //Creation des pDescription
        const textFirstP = `Tube à installer par <strong> ${equipName} </strong> :`;
        const textSecondP = `Diamètre <strong>intérieur minimal</strong> : <strong> ${diamMin} mm </strong>`;
        html.createPDescription('pDescrib',textFirstP,div)
        html.createPDescription('pDescrib',textSecondP,div)
        html.createPDescription('pDescrib',null,div)

        formGroupDiv[i].after(div);

    }
}

    /**
     * Si la valeur de l'input est supérieur à 0 , on affiche la déscription de l'input
     */
    showDescription = function() {
        const formInput = document.querySelectorAll('.form-control')
        for (const input of formInput) {
            if (parseInt(input.value) > 0) {
                let describ = input.parentNode.nextSibling.parentNode.nextSibling;
                describ.classList.remove('hidden');
            }
        }
    }
    /**
     * Créer une div avec une ou plusieurs class
     * @param  {...any} className Class à donner a la div
     */
    createDiv = function (appendTo,className){
        const div = document.createElement('div');
        for (let i = 0 ; i < className.length; i++){
            div.classList.add(className[i]);
        }
        if (appendTo !== null ){
            appendTo.appendChild(div);
        }
        return div
    }

        /**
     * Fonction qui permet de calculer la somme de tout les inputs * coefficant (data-coeff)
     * @param {HTMLCollection} inputs 
     * @returns number
     */
    calcInputsValue = function (inputs) {
    let globalCoefficiant = 0;
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i] !== 0) {
            globalCoefficiant += Number(inputs[i].value * inputs[i].dataset.coeff);
        }
    }
    return globalCoefficiant < 2 && globalCoefficiant > 0 ? 2 : globalCoefficiant
    }

    /**
    * Recupère le matériaux choisi par l'utilisateur
     * @returns 
     */
    getSelectorMat = function () {
        return tubeSelector.value;
    }
        /**
     * Affiche le matériaux et le diametre necessaire dans la span du haut
     * @param {element} matSelected Matériau selectionné par l'utilisateur
     * @param {array} diamMinMat Diametres à afficher 
     * @returns 
     */
    displayGlobalDiamMinWithMat = function (matSelected, diamMinMat) {

        if (matSelected !== "" && diamMinMat !== "") {
            const resultWithMat = document.querySelector('#result2');
            resultWithMat.className = "result success";
            return resultWithMat.innerHTML = `<strong>Tuyau d'alimentation général recommandé : <br />${helper.ucFirst(matSelected)} : Ø ${diamMinMat[0]} x ${diamMinMat[1]} mm </strong>(Ø ext / epaisseur)`;
        }
    }
        /**
     * Function qui va afficher le diamètre minimum GENERAL dans le span 'spanGlobalResult'
     * @param {param} diamMinGlobal // Le diamètre a afficher
     * @param {*} elementClassorId // représente la classe ou l'id de l'element dans lequel on veut display le diametre
     */
    displayGlobalDiamMin = function (diamMinGlobal, elementClassorId) {
        const text = "Diamètre intérieur minimal du tuyau d'alimentation générale : ";
        const appendTo = document.querySelector(elementClassorId);
        // console.log(appendTo);
        return appendTo.textContent = text + diamMinGlobal + " mm";
    }
    /**
     * supprime le form-group div le plus proche du bouton "btn--delete" et l'ajoute dans l'option du select
     */
    deleteButtonClick = function (){
        const deleteBtn = document.querySelectorAll(".btn--delete");
        for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', handlerdeleteAddEquipement);
        }

    }
    /**
     * Affiche ou non un message d'erreur dans le titre
     * @param {number} value représente le diamètre int global minimal
     * @param {number} inputsValue Valeur de l'input
     * @returns 
     */
    checkValue = function (value, inputsValue) {
        const spanGlobalResult = document.querySelector('#result');
    
        if (inputsValue === 0 && value === false) {
            spanGlobalResult.className = "result error"
            spanGlobalResult.innerHTML = "Erreur ! Veuillez saisir au moins un champ !";
            return false;
        } else if (!value || value > 20.1) {
            spanGlobalResult.className = "result error"
            spanGlobalResult.innerHTML = "Erreur ! Vous disposez de trop d'équipements pour utiliser cette méthode de calcul. <br/> <strong>La méthode 'Collective'</strong> serait plus appropriée."
            return false;
        } else {
            html.displayGlobalDiamMin(value, "#result");
            spanGlobalResult.className = "result success"
            return true;
        }
    }
    



   
}   