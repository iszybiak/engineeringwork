const bodyParser = require('body-parser');
const { application } = require('express');
const accountSid = "AC234646dda78d95b98b53ebf76f09c518"
const authToken = "50c36409ee832d34072d6fd2042a30e4"
const client = require('twilio')(accountSid, authToken); 

function resolveAfter2Seconds() {
    return new Promise(resolve => { resolve(client.messages
        .list({
            from: '+48533654751',
            limit: 1
        }))
    });

  }
  
  async function asyncCall() {
    const result = await resolveAfter2Seconds();
    response = result[0].body;
    console.log(response)
    if(response == 'Yes'){
        console.log("Chętny")
    }

  }
  asyncCall();
