import mongoDbConnect from "@/helpers/mongoDbConnect";
import postModel from "@/models/postModel";
import Authenticated from "../authenticated";
import cloudinary from "cloudinary";
mongoDbConnect();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default Authenticated(async (req, res) => {
  try {
    const { pid } = req.query;
    const post = await postModel.findById({ _id: pid });
    const imgId = post.photo;
    await cloudinary.v2.uploader.destroy(imgId);
    await postModel.findByIdAndDelete({ _id: pid });
    res.status(200).json({ message: "Sucess fully Deleted" });
  } catch (error) {
    console.log(error);
    console.log("Post Delete Error");
    process.exit(1);
  }
});
