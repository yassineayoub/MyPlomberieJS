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
    createFormDeleteBtn = function (appendTo) {
        let deleteBtn = document.createElement('div');
        deleteBtn.innerHTML = '<i class="bi bi-x-square" style="display:flex ; height: 100%; font-size: 45px ; width: 100%"></i>'
        deleteBtn.classList.add('btn--delete');
        appendTo.appendChild(deleteBtn);
    }
}