// const btn = document.querySelector('.btnEq');
// const sb = document.querySelector('.selectEq');

// btn.addEventListener('click',function(e) {
//     e.preventDefault();
//     const selectedValues = [].filter
//     .call(sb.options, option => option.selected)
//     .map(option => option.text);
//     console.log('.'+selectedValues[0])
// let find = document.querySelectorAll('.'+selectedValues[0]);

// for(let i=0 ; i < find.length; i++){
//     find[i].classList.toggle('hidden');
//     console.log('.'+selectedValues[0])
//     // find[i].toggleAttribute('hidden');
// }
// })

//SHOW / HIDE PVC DIAM
let togglePvc = document.querySelector('.togglePvc');
togglePvc.addEventListener('click',function () {
    let pvc = document.querySelectorAll('.pvc');
    for (let i = 0; i < pvc.length; i++) {
        pvc[i].classList.toggle('hidden');
    }
});

let toggleBtn = document.querySelector('.togglePvc');
toggleBtn.addEventListener('click',function () {
    let circle = document.querySelector('input.circleCenter');
    circle.classList.toggle('checked');
})

