class Buttons {


    /**
     * Création des boutons plus et moins
     */
    createPlusMinusBtn = function () {
        const containers = document.querySelectorAll('div .container');
        
        for (const container of containers) {
            const containerBtn = document.createElement('div');
            containerBtn.classList.add('btn__containerPM')
            const plusBtn = '<i class="bi bi-plus-square btn__PM plus"></i>'
            const minusBtn = '<i class="bi bi-dash-square btn__PM minus"></i>'
            containerBtn.innerHTML = plusBtn + minusBtn
            container.appendChild(containerBtn)
        }
    
    }
    /**
     * Incrémente l'input en fonction du clic sur + ou -
     * @param {} e 
     * @returns 
     */
    handleQuantity = function (e) {
        let inputValue = 0
        if (e.target.parentNode.parentNode.firstChild.value !== ""){
            inputValue = parseInt(e.target.parentNode.parentNode.firstChild.value,10)
        }
        if (e.target.classList.contains('plus')){
            inputValue += 1
        } else if (e.target.parentNode.parentNode.firstChild.value <= 0) {
            e.target.parentNode.parentNode.firstChild.value = 0
        } else {
            inputValue -= 1;
        }
        return e.target.parentNode.parentNode.firstChild.value = inputValue;
    }
}