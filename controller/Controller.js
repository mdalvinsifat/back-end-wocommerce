const Category = require("../model/model")
const getDataUri = require("../utlits/Feature")
const cloudinary = require("cloudinary")

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
  // if(!name || !category || !price || !oldPrice || !description || !sku ){
  //   res.status(200).send({
  //     success:false, 
  //     message:"please Required the all fileds"
  //   })
  // }
  if (!req.file) {
    return res.status(500).send({
      success: false,
      message: "please provide product images",
    });
  }
  const file = getDataUri(req.file)

  const cdb = await cloudinary.v2.uploader.upload(file.content)
  const images = {
    public_id:cdb.public_id,
    url:cdb.secure_url
  }

  const data = await Category.create({
    name ,description, sku, category, price, oldPrice,  image: [images],
  })

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
    const data = await Category.findById(req.params.id)
    if(!data){
      res.status(401).send({
        success:false, 
        message:"product not found"
      })
    }    
    const {name , description , category , sku , price, oldPrice}= req.body 
    if(name)data.name = name;
    if(description)data.description = description;
    if(category)data.category = category;
    if(sku)data.sku = sku;
    if(price)data.price = price;
    if(oldPrice)data.oldPrice = oldPrice;

    if (!req.file) {
      return res.status(404).send({
        success: false,
        message: "Product image not found",
      });
    }
    const file = getDataUri(req.file);
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    const images = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };
    // save
    data.image.push(images);
    await data.save()
    res.status(200).send({
      success: true,
      message: "product details updated",
      data
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
for(let i=0;i<data.image.length;i++){
  await cloudinary.v2.uploader.destroy(data.image[i].public_id)
}
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
              {price : {$regex : keyword , $options:"i"}}
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