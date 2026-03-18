// 19-03-2026
// import validator from "validator";
// import bcrypt from "bcrypt";
// import userModel from "../models/userModel.js";
// import jwt from "jsonwebtoken";
// import { v2 as cloudinary } from "cloudinary";
// import doctorModel from "../models/doctorModel.js";
// import appointmentModel from "../models/appointmentModel.js";

// import razorpay from 'razorpay';


// // Gateway Initialize
// const razorpayInstance = new razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET,
// })

// // API to register user
// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.json({ success: false, message: "Missing Details" });
//     }

//     // validating email format
//     if (!validator.isEmail(email)) {
//       return res.json({ success: false, message: "enter a valid email" });
//     }

//     // validating strong password
//     if (password.length < 8) {
//       return res.json({ success: false, message: "enter a strong password" });
//     }

//     // hashing user password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const userData = {
//       name,
//       email,
//       password: hashedPassword,
//     };

//     const newUser = new userModel(userData);
//     const user = await newUser.save();

//     // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({ success: true, token });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // API for user login
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await userModel.findOne({ email });

//     if (!user) {
//       return res.json({ success: false, message: "User does not exist" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (isMatch) {
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//       res.json({ success: true, token });
//     } else {
//       res.json({ success: false, message: "Invalid credentials" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // API to get user profile data
// const getProfile = async (req, res) => {
//   try {
//     //const { userId } = req.body;
//     const userId = req.userId;

//     const useData = await userModel.findById(userId).select("-password");

//     res.json({ success: true, user: useData });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // API to update user profile
// const updateProfile = async (req, res) => {
//   try {
//     const { userId, name, phone, address, dob, gender } = req.body;
//     const imageFile = req.file;

//     if (!name || !phone || !dob || !gender) {
//       return res.json({ success: false, message: "Data Missing" });
//     }

//     await userModel.findByIdAndUpdate(userId, {
//       name,
//       phone,
//       address: JSON.parse(address),
//       dob,
//       gender,
//     });

//     if (imageFile) {
//       // upload image to cloudinary
//       const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
//         resource_type: "image",
//       });
//       const imageURL = imageUpload.secure_url;

//       await userModel.findByIdAndUpdate(userId, { image: imageURL });
//     }

//     res.json({ success: true, message: "Profile Updated" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// const bookAppointment = async (req, res) => {
//   try {
//     const userId = req.userId; // 🔥 FROM JWT
//     const { docId, slotDate, slotTime } = req.body;

//     if (!userId) {
//       return res.json({ success: false, message: "User not authenticated" });
//     }

//     const docData = await doctorModel.findById(docId).select("-password");

//     if (!docData || !docData.available) {
//       return res.json({ success: false, message: "Doctor not available" });
//     }

//     let slots_booked = docData.slots_booked;

//     // slot availability
//     if (slots_booked[slotDate]?.includes(slotTime)) {
//       return res.json({ success: false, message: "Slot not available" });
//     }

//     if (!slots_booked[slotDate]) slots_booked[slotDate] = [];
//     slots_booked[slotDate].push(slotTime);

//     const userData = await userModel
//       .findById(userId)
//       .select("-password");

//     if (!userData) {
//       return res.json({ success: false, message: "User not found" });
//     }

//     delete docData.slots_booked;

//     const appointmentData = {
//       userId,
//       docId,
//       userData,
//       docData,
//       amount: docData.fees,
//       slotTime,
//       slotDate,
//       date: Date.now(),
//     };

//     const newAppointment = new appointmentModel(appointmentData);
//     await newAppointment.save();

//     await doctorModel.findByIdAndUpdate(docId, { slots_booked });

//     res.json({ success: true, message: "Appointment Booked" });

//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };


// const listAppointment = async (req, res) => {
//   try {
//     //const { userId } = req.body;
//     const userId = req.userId;

//     const appointments = await appointmentModel.find({ userId });

//     res.json({ success: true, appointments });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // API to cancel appointment
// const cancelAppointment = async (req, res) => {
//   try {
//     const { userId, appointmentId } = req.body;

//     const appointmentData = await appointmentModel.findById(appointmentId);

//     // verify appointment user
//     if (appointmentData.userId !== userId) {
//       return res.json({ success: false, message: "Unauthorized action" });
//     }

//     await appointmentModel.findByIdAndUpdate(appointmentId, {
//       cancelled: true,
//     });

//     // releasing doctor slot

//     const { docId, slotDate, slotTime } = appointmentData;

//     const doctorData = await doctorModel.findById(docId);

//     let slots_booked = doctorData.slots_booked;

//     slots_booked[slotDate] = slots_booked[slotDate].filter(
//       (e) => e !== slotTime
//     );

//     await doctorModel.findByIdAndUpdate(docId, { slots_booked });

//     res.json({ success: true, message: "Appointment Cancelled" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };



// // API to make payment of appointment using razorpay
// const paymentRazorpay = async (req, res) => {
//   try {

//     const { appointmentId } = req.body
//     const appointmentData = await appointmentModel.findById(appointmentId)

//     if (!appointmentData || appointmentData.cancelled) {
//       return res.json({ success: false, message: 'Appointment Cancelled or not found' })
//     }

//     // creating options for razorpay payment
//     const options = {
//       amount: appointmentData.amount * 100,
//       currency: process.env.CURRENCY,
//       receipt: appointmentId,
//     }

//     // creation of an order
//     const order = await razorpayInstance.orders.create(options)

//     res.json({ success: true, order })

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // API to verify payment of razorpay
// const verifyRazorpay = async (req, res) => {
//   try {
//     const { razorpay_order_id } = req.body
//     const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

//     if (orderInfo.status === 'paid') {
//       await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
//       res.json({ success: true, message: "Payment Successful" })
//     }
//     else {
//       res.json({ success: false, message: 'Payment Failed' })
//     }
//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// export {
//   registerUser,
//   loginUser,
//   getProfile,
//   updateProfile,
//   bookAppointment,
//   listAppointment,
//   cancelAppointment,
//   paymentRazorpay,
//   verifyRazorpay,
// };

import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import Razorpay from "razorpay";
import streamifier from "streamifier";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// helper for cloudinary buffer upload
const streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Weak Password" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ success: true, token });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET PROFILE
const getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await userModel.findById(userId);

    res.json({ success: true, user: userData });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.status(400).json({ success: false, message: "Missing Data" });
    }

    const updateData = {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    };

    if (imageFile) {
      const result = await streamUpload(imageFile.buffer);
      updateData.image = result.secure_url;
    }

    await userModel.findByIdAndUpdate(userId, updateData);

    res.json({ success: true, message: "Profile Updated" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// BOOK APPOINTMENT (race condition fixed)
const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { docId, slotDate, slotTime } = req.body;

    const doctor = await doctorModel.findOneAndUpdate(
      {
        _id: docId,
        [`slots_booked.${slotDate}`]: { $ne: slotTime },
      },
      {
        $push: { [`slots_booked.${slotDate}`]: slotTime },
      },
      { new: true }
    );

    if (!doctor) {
      return res.status(400).json({ success: false, message: "Slot not available" });
    }

    const appointment = await appointmentModel.create({
      userId,
      docId,
      slotDate,
      slotTime,
      amount: doctor.fees,
      date: Date.now(),
    });

    res.json({ success: true, appointment });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// LIST APPOINTMENTS
const listAppointment = async (req, res) => {
  try {
    const userId = req.userId;

    const appointments = await appointmentModel.find({ userId });

    res.json({ success: true, appointments });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CANCEL APPOINTMENT (fixed auth)
const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment || appointment.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    res.json({ success: true, message: "Cancelled" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PAYMENT
const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment || appointment.cancelled) {
      return res.json({ success: false, message: "Invalid Appointment" });
    }

    const order = await razorpayInstance.orders.create({
      amount: appointment.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    });

    res.json({ success: true, order });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
};