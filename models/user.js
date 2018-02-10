const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const userSchema = new Schema({
  coinName: { type: String, required: true },
  coinPrice: { type: Number, required: true }, 
  uid: {type: String, required: true}
});

const User = mongoose.model("User", userSchema);

module.exports = User;


// var userSchema = new mongoose.Schema({
//   username: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   firstname: { type: String, required: true },
//   lastname: { type: String, required: true },
//   uid: { type: String, required: true },
//   email: {
//     required: true,
//     type: String,
//     match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
//   },
//   coins: [
//     {
//       coinName: String,
//       coinPrice: Number
//     }
//   ]
// });

// var User = mongoose.model("User", userSchema);

// module.exports = User;
