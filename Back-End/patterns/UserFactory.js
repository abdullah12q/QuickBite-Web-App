import userModel from "../models/user.model.js";

class UserFactory {
  static async createUser(role, userData) {
    const ALLOWED_ROLES = ["customer", "delivery"];
    const finalRole = ALLOWED_ROLES.includes(role) ? role : "customer";

    const data = {
      ...userData,
      role: finalRole,
    };

    switch (finalRole) {
      case "delivery":
        data.isAvailable = true;

        if (!userData.vehicleType) {
          throw new Error("Vehicle type is required for delivery partners.");
        }

        const validVehicles = ["bicycle", "scooter", "car", "motorcycle"];
        if (!validVehicles.includes(userData.vehicleType.toLowerCase())) {
          throw new Error("Invalid vehicle type selected.");
        }
        data.vehicleType = userData.vehicleType;

        if (userData.vehicleType !== "bicycle") {
          if (!userData.licenseNumber || userData.licenseNumber.length < 5) {
            throw new Error(
              "A valid driver's license number is required for this vehicle."
            );
          }
          data.licenseNumber = userData.licenseNumber;
        }
        break;

      case "customer":
        // Customer specific logic (if any)
        break;
    }

    const newUser = new userModel(data);
    return await newUser.save();
  }
}

export default UserFactory;
