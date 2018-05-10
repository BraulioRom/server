const { person } = require('./models/person')
const admin = require('firebase-admin');

var serviceAccount = require('./config/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();


var docRef = db.collection('users').doc('alovelace');

docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815
}).then(result => console.log('uno', result)).catch(reason => console.log(reason))



var aTuringRef = db.collection('users').doc('aturing');

aTuringRef.set({
    'first': 'Alan',
    'middle': 'Mathison',
    'last': 'Turing',
    'born': 1912
}).then(result => console.log('dos', result)).catch(reason => console.log(reason))