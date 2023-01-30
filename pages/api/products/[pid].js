import mongoDbConnect from "@/helpers/mongoDbConnect";
import productModel from "@/models/productModel";
import cloudinary from 'cloudinary'

mongoDbConnect();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await singleProduct(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
      break;
  }
};

const singleProduct = async (req, res) => {
  const { pid } = req.query;
  const data = await productModel.findById({ _id: pid });
  res.status(200).json(data);
};
const deleteProduct = async (req, res) => {
  try{
    const { pid } = req.query;
    const product = await productModel.findById({ _id: pid });
    const imgId = product.mediaUrl
    await cloudinary.v2.uploader.destroy(imgId)
    await productModel.findByIdAndDelete({_id: pid}) 
    res.status(200).json({ message: "Sucess fully Deleted" });
  }
  catch(error){
    console.log(error)
    console.log('product delete error')
    process.exit(1)
  }
};

// const stad = async (req, res) => {
//   const productId = req.params.id;
//   console.log(productId);
//   let product;
//   try {
//     product = await Product.findById(productId);
//     await cloudinary.uploader.destroy(product.public_id);
//     res.send("cloud image deleted");
//   } catch (err) {
//     res.send({ err });
//   }
//   try {
//     await product.remove();
//     res.send("Image deleted");
//   } catch (err) {
//     res.send({ err });
//   }
// };
