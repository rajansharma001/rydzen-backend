import { Request, Response } from "express";
import { carDetailsTypes } from "../../types/carDetails";
import { CarDetails } from "../../model/carDetails";

export const updateCarDetailsController = async (
  req: Request,
  res: Response
) => {
  console.log("check -=====-  1");
  try {
    const _id = req.params.id;
    if (!_id) {
      return res.status(404).json({ error: "Car Id not found." });
    }
    console.log("check -=====-  2");

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
    console.log("check -=====-  3");

    const file = req.file;

    const carImg = file?.path || "";
    console.log("check -=====-  4");

    const checkCarById = (await CarDetails.findById(_id)) as carDetailsTypes;
    if (!checkCarById) {
      return res
        .status(400)
        .json({ error: "Car details not found by given ID." });
    }
    console.log("check -=====-  5");

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
    console.log("check -=====-  6");

    if (!updateCarDetails) {
      return res
        .status(401)
        .json({ error: "You are not authorized to mofidy this data." });
    }

    console.log("check -=====-  7");

    const updatedCar = await CarDetails.findById(_id);
    console.log("check -=====-  8");

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
