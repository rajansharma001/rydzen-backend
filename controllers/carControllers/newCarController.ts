import { Request, Response } from "express";
import { carDetailsTypes } from "../../types/carDetails";
import { CarDetails } from "../../model/carDetails";

export const newCarController = async (req: Request, res: Response) => {
  try {
    const {
      name,
      brand,
      model,
      year,
      image,
      transmission,
      fuelType,
      seatingCapacity,
      mileage,
      pricePerDay,
      availability,
    } = req.body as carDetailsTypes;

    console.log(req.body);

    if (
      !name ||
      !brand ||
      !model ||
      !year ||
      !image ||
      !transmission ||
      !fuelType ||
      !seatingCapacity ||
      !mileage ||
      !pricePerDay ||
      availability === undefined
    ) {
      return res
        .status(40)
        .json({ error: "Please fill all required form fields." });
    }

    const createNewCar = await CarDetails.create({
      name,
      brand,
      model,
      year,
      image,
      transmission,
      fuelType,
      seatingCapacity,
      mileage,
      pricePerDay,
      availability,
    });

    if (!createNewCar) {
      return res
        .status(401)
        .json({ error: "Car creation failed. Please try again." });
    }
    return res
      .status(201)
      .json({ success: "New Car Details created successfully." });
  } catch (error) {
    console.log("Bad request for creating new car. : ", error);
    return res.status(500).json({ error: "Bad request for creating new car." });
  }
};
