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
            tubeOption.textContent = ucFirst(tube);
            tubeOption.value = tube;
            tubeSelector.append(tubeOption);
        }
    }

     /**
      * 
      * @param {string} labelName Le nom du label
      * @param {HTMLElement} appendTo L'element sur lequel append le label
      */
     createFormLabel = function (labelName,appendTo) {
        const formLabel = document.createElement('label');
        const forName = stringGroup(lcFirst(labelName))
        formLabel.classList.add('form-label');
        formLabel.setAttribute('for', forName);
        formLabel.innerHTML = labelName;
        appendTo.appendChild(formLabel);
    }
    /**
     * 
     * @param {string} inputName 
     * @param {HTMLElement} appendTo 
     */
    createFormInput = function (inputName, appendTo){
        const formInput = document.createElement('input');
        const coefficiant = this.getCoeffEquip(inputName);
        inputName = stringGroup(lcFirst(inputName))
        formInput.classList.add('form-control')
        formInput.setAttribute('name', inputName)
        formInput.setAttribute('data-coeff', coefficiant);
        formInput.setAttribute("id", inputName);
        formInput.setAttribute("placeholder", "qt")
        appendTo.appendChild(formInput);
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
    for (i = 0; i < inputs.length; i++) {
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
            return resultWithMat.innerHTML = `<strong>Tuyau d'alimentation général recommandé : <br />${ucFirst(matSelected)} : Ø ${diamMinMat[0]} x ${diamMinMat[1]} mm </strong>(Ø ext / epaisseur)`;
        }
    }
   
}   