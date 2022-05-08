class Helper {

   
    /**
     * Function pour mettre des tirets dans les string si elle presente des espaces de nom, exemple poste d'eau = poste_d_eau
     *
     * @memberof Helper
     */
    stringReplace = function (name) {
    return name.replace(/((?<![\\])[\s\/'"])/g, "_");
    }
    /**
     *Met en majuscule la 1er lettre du mot
     *@param {string} string
     * @memberof Helper
     */
    ucFirst = function (string) {
        let str = string
        return (str.charAt(0).toUpperCase() + str.substring(1));
    }
    
    /**
     * Met en minuscule la 1er lettre du mot
     * @param {string} string 
     * @returns 
     */
    lcFirst = function (string) {
        // Mettre en minuscle la premiere lettre :
        let str = string
        return (str.charAt(0).toLocaleLowerCase() + str.substring(1));
    }
    


}