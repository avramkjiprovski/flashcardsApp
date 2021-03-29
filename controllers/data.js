updateFile:(filePath, data) => { 

    fs.readFile(filePath, 'utf8', (err, data) => {
                
        if (err){
            console.log(err)
        } else {
            let content = JSON.parse(data); //now it an object
            let found = false

            found = find_ID(contentObjects, message)
            
            
            if(found === false){


                contentObjects.channels.push({channel_id:message.channel.id}); //add some data
                let stringifiedContentObjects = JSON.stringify(channelObjects); //convert it back to json
                fs.writeFile(filePath, stringifiedContentObjects, 'utf8', (err)=>{
                    if(err) console.log(err)
                }); // write it back 
                message.author.send(`<#${message.channel.id}> successfully added.`)
                message.delete()
                .catch(console.error)
                // koga mozes napravi ja embedded porakava i da ja prakja vo DM so channel mention <#id>
            }
        }
    });
}