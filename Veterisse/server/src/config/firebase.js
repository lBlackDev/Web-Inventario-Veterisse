const admin = require('firebase-admin');
const serviceAccount = require('./claveprivada.json');

// Carga la configuración
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { db };
