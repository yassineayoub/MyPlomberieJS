class Coefficiants {

    coefficiantDiametre = {
        2: 11,
        2.5: 11.5,
        3: 12,
        3.5: 13,
        4: 13.7,
        4.5: 14,
        5: 14.4,
        5: 14.4,
        5.5: 15,
        6: 15.8,
        6.5: 16,
        7: 16.2,
        7.5: 16.4,
        8: 17,
        8.5: 17.2,
        9: 17.5,
        9.5: 17.8,
        10: 18,
        10.5: 18.2,
        11: 18.6,
        11.5: 19,
        12: 19.2,
        12.5: 19.5,
        13: 19.7,
        13.5: 19.8,
        14: 20,
        14.5: 20,
        15: 20.1,
    }


    /**
     * Function qui calcul le diamètre minimal de l'alimentation générale
     * @param {param} globalCoefficiant = inputs.value * coeff
     * @returns number | false
     */
    getDiamMinGlobal = function (globalCoefficiant) {
        let diamMinGlobal;
        for (const key in this.coefficiantDiametre) {
            if (globalCoefficiant === Number(key)) {
                // console.log(coefficiantDiametre[key]);
                diamMinGlobal = this.coefficiantDiametre[key];
            }
        }
        if (diamMinGlobal === undefined) {
            return false;
        }
        return diamMinGlobal;
    }
}