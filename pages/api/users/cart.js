import cartModel from "@/models/cartModel";
import Authinteced from "../aunticated";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await fethProduct(req, res);
      break;
      case "PUT":
      await addToCart(req, res);
      break;
      case "DELETE":
      await reoveProduct(req, res);
      break;
  }
};


const fethProduct = Authinteced (async (req, res) => {
  const cart = await cartModel.findOne({user : req.userId}).populate("products.product")
    res.status(200).json(cart.products);
});

const addToCart = Authinteced (async (req, res) => {
    const {quantity, productId} = req.body
    const cart = await cartModel.findOne({user : req.userId})
    
    const pExist = cart.products.some(podc => productId === podc.product.toString())
    if(pExist){
        await cartModel.findOneAndUpdate({_id : cart._id, "products.product" : productId}, {
            $inc : {
                "products.$.quantity" : quantity
            }
        })  
        res.status(200).json({message : 'product add!'})     
    }else{
        const neProducts = {quantity, product : productId}
        await cartModel.findByIdAndUpdate({_id : cart._id}, {
            $push : {
                products : neProducts
            }
        })
        res.status(200).json({message : 'product add!'})
        
    }
})

const reoveProduct = Authinteced (async (req, res) => {
    const {productId} = req.body
   const cart = await cartModel.findOneAndUpdate({user : req.userId}, {
    $pull : {products : { product : productId }}}, {
    new : true
   }).populate("products.product")
    
    res.status(200).json(cart.products)
})
