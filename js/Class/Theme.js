class Theme {

    init = function () {
        theme.localStorageTheme();
        theme.handleThemeBtn();
       

        //On met les form group en color black
        const formGrps = document.querySelectorAll('.form-group')
        formGrps.forEach(formGrp => {
            formGrp.style.color = "black";
        })
        
    }

    localStorageTheme = function () {
       const theme = localStorage.getItem('darkTheme');
       const moonSun = document.querySelector('.theme-btn i')
       if (theme === "on") {
           document.body.classList.add('darkTheme');
           moonSun.className = "bi bi-emoji-sunglasses";
    }
}

    handleThemeBtn = function (e) {
        const moonSun = document.querySelector('.theme-btn i')
        moonSun.addEventListener('click', () => {
            theme.hoverColor(document.body.classList.contains('darkTheme'))
            document.body.classList.toggle('darkTheme')
            if (document.body.classList.contains('darkTheme')) {
                
                localStorage.setItem('darkTheme','on')
                moonSun.className = "bi bi-emoji-sunglasses";
            } else {
                localStorage.removeItem('darkTheme')
                moonSun.className = "bi bi-moon-fill";
            }
        })
    }
    hoverColor = function (condition) {
        const hoverItems = document.querySelectorAll('.rs');
        for (const hoverItem of hoverItems) {
            if (!condition) {
                hoverItem.classList.add('darkTheme');
            } else {
                hoverItem.classList.remove('darkTheme');
            }
        }
    }
        

}