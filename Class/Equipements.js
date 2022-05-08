class Equipements {

    jsonEquips = JSON.stringify([{
        "coeff": 2.5,
        "debitMin": 0.2,
        "diamEvac": 40,
        "diamMin": 12,
        "id": 1,
        "name": "Evier"
    },
    {
        "coeff": 1.5,
        "debitMin": 0.2,
        "diamEvac": 32,
        "diamMin": 10,
        "id": 2,
        "name": "Lavabo"
    },
    {
        "coeff": 1,
        "debitMin": 0.2,
        "diamEvac": 32,
        "diamMin": 10,
        "id": 3,
        "name": "Bidet"
    },
    {
        "coeff": 3,
        "debitMin": 0.33,
        "diamEvac": 40,
        "diamMin": 13,
        "id": 4,
        "name": "Baignoire ≤ 150 L"
    },
    {
        "coeff": 3.5,
        "debitMin": 0.33,
        "diamEvac": 50,
        "diamMin": 13,
        "id": 5,
        "name": "Baignoire 170 L"
    },
    {
        "coeff": 2,
        "debitMin": 0.2,
        "diamEvac": 40,
        "diamMin": 12,
        "id": 6,
        "name": "Douche"
    },
    {
        "coeff": 2,
        "debitMin": 0.33,
        "diamEvac": 40,
        "diamMin": 12,
        "id": 7,
        "name": "Poste d'eau avec robinet 1/2"
    },
    {
        "coeff": 0.5,
        "debitMin": 0.12,
        "diamEvac": 100,
        "diamMin": 10,
        "id": 8,
        "name": "WC"
    },
    {
        "coeff": 0.5,
        "debitMin": 0.15,
        "diamEvac": 40,
        "diamMin": 10,
        "id": 9,
        "name": "Urinoir"
    },
    {
        "coeff": 0.5,
        "debitMin": 0.1,
        "diamEvac": 32,
        "diamMin": 10,
        "id": 10,
        "name": "Lave-mains"
    },
    {
        "coeff": 2,
        "debitMin": 0.33,
        "diamEvac": 40,
        "diamMin": 13,
        "id": 11,
        "name": "Bac à laver"
    },
    {
        "coeff": 1,
        "debitMin": 0.2,
        "diamEvac": 40,
        "diamMin": 10,
        "id": 12,
        "name": "Lave-linge"
    },
    {
        "coeff": 1,
        "debitMin": 0.1,
        "diamEvac": 40,
        "diamMin": 10,
        "id": 13,
        "name": "Lave-vaisselle"
    }
]);
    equipements = JSON.parse(this.jsonEquips);
    
    // equipements à afficher de base dans la page
    equipementsToShow = ['Evier', 'Lavabo', 'Douche', 'WC', 'Lave-linge', 'Lave-vaisselle'];

        /**
     * Retourne le coefficant correspondant a l'équipement
     * @param {string} equipName Nom de l'équipement
     */
    getCoeffEquip = function (equipName) {
        for (const equip of this.equipements) {
            if (equip.name === equipName) {
                return equip.coeff;
            }
        }
    }
        /**
     * Retourne le diametre interieur minimal en fonction du nom de l'équipement
     * @param {string} equipName Nom de l'équipement
     */
    getDiamMinEquip = function (equipName) {
        for (const equip of this.equipements) {
            if (equip.name === equipName) {
                // console.log(equip.diamMin);
                return equip.diamMin;
            }
        }
    }
}