document.addEventListener("click", e => {
    // console.log(e.target.nodeValue)
    if(e.target.nodeName == 'INPUT'){

        enableEdit(e.target)

        
        // Da najdam nacin da isprakjam POST ili GET requests do serverot so cel da mi isprati serverot druga html
        // sodrzina vo vid na forma so cel da mozam da ja izmenam sodrzinata na paragrafot vo karticata.
        // stom ja izmenam taa sodrzina i stisnam "save", togas se sozdava novo baranje i serverot povtorno isprakja sodrzina 
        // no ovoj pat izmenetata i vo vid na paragraf.
        
    }
})

// Function definitions
let enableEdit = (element) => {
    if(element.value != 'Edit') return console.log("Ne")
    
    document.getElementById('saveContent').classList.toggle('invisible')

    // contentContainer.innerHTML = tuka bi mi godelo fetch baranje dokolku go dobivam vo ovoj fajl tuka.
    // dokolku ne go dobivam vo ovoj fajl tuka, mozebi podobro e da sozdadam nov element so DOM metodite na JS
    // i taka del po del da napravam forma.
    // povekje mi se dopagja prvata opcija.
    // znaci kje napravam pauza i kje napravam preku fetch() api da se isprakja formata sto vekje ja imam na server.


    // Da se zacuva tekstot od id content x
    // Da se izbrishe elementot 
    // Da se sozdade drug element narecen form so soodvetni atributi za post request
    // Koga kje se klikne submit se isprakja baranjeto
    // serverot go prima toa baranje i ja isprakja novata verzija na dokumentot zaedno so novata sodrzina
}