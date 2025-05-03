const mongoose = require("mongoose");

const connectDB = async () => {
  try {

    await mongoose.connect("mongodb+srv://nehasaini23nov:codemax@cluster1.tjyhhdq.mongodb.net/codeIDE?retryWrites=true&w=majority&appName=Cluster1",{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
    
  } catch (error) {
    console.log(error)
  }
};

module.exports = connectDB;