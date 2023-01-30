import mongoose from "mongoose";

const mongoDbConnect = async () => {
  try {
    await mongoose.connect(process.env.MongoConnect, {
        strictQuery : false,
    });
    console.log('MongoDb is Connect')
  } catch (error) {
    console.log(error)
    console.log('MongoDb is not Connect')
    process.exit(1)
  }
};

export default mongoDbConnect
