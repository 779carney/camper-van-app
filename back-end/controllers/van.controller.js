const mongoose = require("mongoose");
const Van = require("../models/Van");

const getVans = async (req, res) => {
  try {
    const allVans = await Van.find({});
    res.status(200).json({ allVans });
  } catch (err) {
    console.log(err);
  }
};

const getVanById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ msg: "bad request" });
  }

  const vanById = await Van.findById(id);

  if (!vanById) {
    return res.status(404).json({ error: "request not found" });
  }
  res.status(200).json(vanById);
};

const postVanByOwner = async  (req, res)=>{
  const {owner}=req.params;
  const { vanName, description, make, model, year, location, pricePerNight, amenities, availabilityDates, images, sleeps }= req.body
  const newVan= new Van ({
      vanName:vanName,
      owner:owner,
      description:description,
      make:make,
      model:model,
      year:year,
      location:location,
      pricePerNight:pricePerNight,
      amenities:amenities,
      availabilityDates:availabilityDates,
      images:images,
      sleeps:sleeps 
  })
  try {
      await newVan.save();
      res.status(201).json({
          newVan: newVan
         
      });
    } catch (error) {
    
        return res.status(400).send({msg:'invalid request'})
      }
  

}

const postVan = async (req, res)=>{
  const { vanName, owner, description, make, model, year, location, pricePerNight, amenities, availabilityDates, images, sleeps }= req.body
  const newVan= new Van ({
      vanName:vanName,
      owner:owner,
      description:description,
      make:make,
      model:model,
      year:year,
      location:location,
      pricePerNight:pricePerNight,
      amenities:amenities,
      availabilityDates:availabilityDates,
      images:images,
      sleeps:sleeps 
  })
  try {
      await newVan.save();
      res.status(201).json({
          newVan: newVan
         
      });
    } catch (error) {
    
        return res.status(400).send({msg:'invalid request'})
      }
    
}

const patchVan = async (req, res)=>{
  try {
      const { id } = req.params;
      const updatedData = req.body;

      if (!mongoose.isValidObjectId(id)) {
          return res.status(400).json({ msg: "bad request" });
      }
      if (Object.keys(updatedData).length === 0) {
          return res.status(400).send({ msg: 'missing required fields' })
      }

      const van = await Van.findById(id);
  
      if (!van) {
          return res.status(404).json({ msg: 'request not found' });
      }

      Object.assign(van, updatedData);

      const validationError = van.validateSync();
      if (validationError) {
          return res.status(400).json({ msg: 'invalid request' });
      }

      const updatedVan = await van.save();
      res.json({ updatedVan: updatedVan });


  } catch (error) {
      console.log(error);
  }
}

const deleteVanByOwner = async (req,res)=>{

}

module.exports = { getVans, getVanById,postVanByOwner,postVan,patchVan,deleteVanByOwner};
