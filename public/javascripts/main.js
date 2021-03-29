document.addEventListener("click", e => {
    console.log(e.target.nodeValue)
    if(e.target.nodeName == 'INPUT'){
        console.log("tralala")
        // Da najdam nacin da isprakjam POST ili GET requests do serverot so cel da mi isprati serverot druga html
        // sodrzina vo vid na forma so cel da mozam da ja izmenam sodrzinata na paragrafot vo karticata.
        // stom ja izmenam taa sodrzina i stisnam "save", togas se sozdava novo baranje i serverot povtorno isprakja sodrzina 
        // no ovoj pat izmenetata i vo vid na paragraf.
    }
})