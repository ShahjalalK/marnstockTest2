import mongoDbConnect from "@/helpers/mongoDbConnect";
import productModel from "@/models/productModel";

mongoDbConnect()

export default async function handler(req, res) {

  switch (req.method) {
    case "POST":
       await addProduct(req, res)
      break;
      case "GET":
       await fetchProduct(req, res)
      break;
  
   
  }
}


const addProduct = async (req, res) => {
  try{
    const {title, price, mediaUrl, description} = req.body

  if(!title || !price || !mediaUrl  || !description){
    res.status(201).json({error : "Please fill all feild!"})
  }else{
    const newProduct = new productModel({
      title,
      price,
      mediaUrl,
      description
  })
  await newProduct.save()
  res.status(200).json({success : "Success Fully Product Add!"})
  }
  
  }catch(error){
    console.log(error)
    console.log("Post add error")
    process.exit(1)
  }
}

const fetchProduct = async (req, res) => {
 const data = await productModel.find() 
 res.status(200).json(data)
}