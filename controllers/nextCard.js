module.exports = (dataJSON, current_card) => {
    if(dataJSON.cards[current_card+1]){
        return true
    } 
    return false
}