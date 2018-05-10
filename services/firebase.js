const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(SERVICE_ACCOUNT_KEY)
});

let db = admin.firestore().collection('users');

class Firebase {
    async create(user) {
        let registro = await db.doc().set(user)
            .catch(err => {
                throw new Error('Create:', err)
            });
        return 'User created';
    }

    async _canCreate(email) {
        let docs, access;
        await db.where('email', '==', email).get()
            .then(res => {
                docs = res;
                res.forEach(doc => {
                    access = doc.get('access');
                });
            })
            .catch(e => {
                throw new Error('_canCreate', e);
            });

        return ({ 'exist': docs.empty, 'access': access });

    }
}

module.exports = Firebase;