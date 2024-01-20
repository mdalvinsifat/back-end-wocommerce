const Category = require("../model/model")
const cloudinary = require("../utlits/Feature")
//get product
const GetProduct = async(req, res) =>{
  try {
    const data = await Category.find({})
    res.status(200).send({
      success:true,
      message:"user get successfully",
      data
    })
  } catch (error) {
    res.status(401).send({
      success:false,
      message:"please check controller",
    error
    })
    console.log(error)
  }
}


//create product
const CreateProduct = async(req, res) =>{
try {
  const {name, category, price , oldPrice, description , sku} = req.body 
  if (!req.file) {
    return res.status(500).send({
      success: false,
      message: "please provide product images",
    });
  }
  const result = await cloudinary.uploader.upload(req.file.path);
  const data = await Category({
    name,
    description,
     sku, 
     category,
    price,
     oldPrice,
     avatar: result.secure_url,
     cloudinary_id: result.public_id,
  })

  await data.save()
res.status(200).send({
  success:true, 
  message:"user create Successfully",
  data
})

} catch (error) {
  res.status(401).send({
    success:false,
    message:"please check controller",
  error
  })
  console.log(error)
}

}


//get by id prodcut controller 
const ReadId = async(req, res) =>{
  try {
    const id = req.params.id 
    const data = await Category.findById(id)
    res.status(200).send({
      success:true,
      message:"Read id Successfully",
      data
    })
  } catch (error) {
    res.status(401).send({
      success:false,
      message:"please check controller",
    error
    })
  }
}



const Update = async(req, res) =>{
  try {
    let user = await Category.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await cloudinary.uploader.destroy(user.cloudinary_id);
    let result ;
    if (req.file) {
       await cloudinary.uploader.upload(req.file.path);
    }


    const data = {
      name: req.body.name || user.name,
      description: req.body.descriptio || user.description,
      category : req.body.category || user.category,
      price : req.body.price || user.price, 
      oldPrice : req.body.oldPrice || user.oldPrice, 
      sku : req.body.sku || user.sku, 
      avatar: result?.secure_url || user.avatar,
      cloudinary_id: result?.public_id || user.cloudinary_id,
    };

    const data1 = await Category.findByIdAndUpdate(req.params.id, data, { new: true });

    res.status(200).send({
      success: true,
      message: "product details updated",
      data1
    });
    } catch (error) {
    res.status(401).send({
      success:false,
      message:"please check controller",
    error
    })
    console.log(error)
  }
}


const Delete = async(req,res) =>{
  try {
const data = await Category.findById(req.params.id)
if(!data){
  return res.status(200).send({
    success:false, 
    message:"Product is not found"
  })
}
await cloudinary.uploader.destroy(data.cloudinary_id);
await data.deleteOne()

res.status(200).send({
  success: true,
  message: "PRoduct Deleted Successfully",
  data
});


  } catch (error) {
    res.status(200).send({
      success:false,
      message:"please check controller",
    error
    });
  }
}


const SearchKeyword = async(req, res) =>{
  try {
      const {keyword} = req.params
      const result = await Category.find({
          $or:[
              {name : {$regex : keyword , $options:"i"}},
              {description : {$regex : keyword , $options:"i"}},
          ]
      })
      res.status(200).send({
          success:true, 
          message:"Search keyword",
          result
      })
  } catch (error) {
      console.log(error)
  }
}



module.exports = {CreateProduct, GetProduct, ReadId, Update, Delete, SearchKeyword}