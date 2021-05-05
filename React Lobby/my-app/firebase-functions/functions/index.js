const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
const storage = admin.storage();
const bucket = storage.bucket("game-lobby-training.appspot.com");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.getColor = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  console.log(req.query.uid);
  await db.collection("users").doc(req.query.uid).get()
      .then((doc) => {
        console.log(doc.data().color);
        res.json({color: doc.data().color});
      });
});

exports.makeNewDb = functions.https.onCall(async (data, context) => {
  db.collection("users").doc(data.id).set({
    color: data.color,
  });
});

exports.getUserPic = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.json({url: bucket.file(`images/${req.query.uid}`).publicUrl()});
});
