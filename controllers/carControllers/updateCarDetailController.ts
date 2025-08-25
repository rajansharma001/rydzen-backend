import { Request, Response } from "express";
import { carDetailsTypes } from "../../types/carDetails";
import { CarDetails } from "../../model/carDetails";

export const updateCarDetailsController = async (
  req: Request,
  res: Response
) => {
  try {
    const _id = req.params.id;
    const {
      name,
      brand,
      model,
      category,
      year,
      transmission,
      fuelType,
      seatingCapacity,
      mileage,
      pricePerDay,
      availability,
    } = req.body as carDetailsTypes;

    const file = req.file;
    if (!file) {
      return res.status(404).json({ error: "Please provide car an image." });
    }
    const carImg = file?.path || "";

    const checkCarById = (await CarDetails.findById(_id)) as carDetailsTypes;
    if (!checkCarById) {
      return res
        .status(400)
        .json({ error: "Car details not found by given ID." });
    }

    const updateCarDetails = await CarDetails.updateOne(
      { _id },
      {
        $set: {
          name: name || checkCarById.name,
          brand: brand || checkCarById.brand,
          model: model || checkCarById.model,
          category: category || checkCarById.category,
          year: year || checkCarById.year,
          image: carImg || checkCarById.image,
          transmission: transmission || checkCarById.transmission,
          fuelType: fuelType || checkCarById.fuelType,
          seatingCapacity: seatingCapacity || checkCarById.seatingCapacity,
          mileage: mileage || checkCarById.mileage,
          pricePerDay: pricePerDay || checkCarById.pricePerDay,
          availability: availability ?? checkCarById.availability,
        },
      }
    );

    if (!updateCarDetails) {
      return res
        .status(401)
        .json({ error: "You are not authorized to mofidy this data." });
    }

    const updatedCar = await CarDetails.findById(_id);

    return res
      .status(200)
      .json({ success: "Car details updated Successfully.", updatedCar });
  } catch (error) {
    console.log("Bad request for updating an car details. ", error);
    return res
      .status(500)
      .json({ error: "Bad request for updating an car details." });
  }
};
