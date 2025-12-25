// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// import { useNavigate } from 'react-router-dom' //Extra


// const MyAppointments = () => {
//   const { backendUrl, token, getDoctorsData } = useContext(AppContext);

//   const navigate = useNavigate()  //Extra

//   const [appointments, setAppointments] = useState([]);

//   const [payment, setPayment] = useState('') //Extra

//   const months = [
//     "",
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   const slotDateFormat = (slotDate) => {
//     const dateArray = slotDate.split("_");
//     return (
//       dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
//     );
//   };

//   const getUserAppointments = async () => {
//     try {
//       const { data } = await axios.get(backendUrl + "/api/user/appointments", {
//         headers: { token },
//       });

//       if (data.success) {
//         setAppointments(data.appointments.reverse());
//         console.log(data.appointments);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const cancelAppointment = async (appointmentId) => {
//     try {
//       const { data } = await axios.post(
//         backendUrl + "/api/user/cancel-appointment",
//         { appointmentId },
//         { headers: { token } }
//       );
//       if (data.success) {
//         toast.success(data.message);
//         getUserAppointments();
//         getDoctorsData();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };


//   const initPay = (order) => {
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: order.currency,
//       name: 'Appointment Payment',
//       description: "Appointment Payment",
//       order_id: order.id,
//       receipt: order.receipt,
//       handler: async (response) => {

//         console.log(response)

//         try {
//           const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
//           if (data.success) {
//             navigate('/my-appointments')
//             getUserAppointments()
//           }
//         } catch (error) {
//           console.log(error)
//           toast.error(error.message)
//         }
//       }
//     };
//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   // Function to make payment using razorpay
//   const appointmentRazorpay = async (appointmentId) => {
//     try {
//       const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
//       if (data.success) {
//         initPay(data.order)
//       } else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }
//   }

//   useEffect(() => {
//     if (token) {
//       getUserAppointments();
//     }
//   }, [token]);

//   return (
//     <div>
//       <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
//         My appointments
//       </p>
//       <div>
//         {appointments.map((item, index) => (
//           <div
//             className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
//             key={index}
//           >
//             <div>
//               <img
//                 className="w-32 bg-indigo-50"
//                 src={item.docData.image}
//                 alt=""
//               />
//             </div>
//             <div className="flex-1 text-sm text-zinc-600">
//               <p className="text-neutral-800 font-semibold">
//                 {item.docData.name}
//               </p>
//               <p>{item.docData.speciality}</p>
//               <p className="text-zinc-700 font-medium mt-1">Address:</p>
//               <p className="text-xs">{item.docData.address.line1}</p>
//               <p className="text-xs">{item.docData.address.line2}</p>
//               <p className="text-xs mt-1">
//                 <span className="text-sm text-neutral-700 font-medium">
//                   Date & Time:
//                 </span>{" "}
//                 {slotDateFormat(item.slotDate)} | {item.slotTime}
//               </p>
//             </div>

//             <div className='flex flex-col gap-2 justify-end text-sm text-center'>
//               {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && <button onClick={() => setPayment(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
//               {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && <button onClick={() => appointmentRazorpay(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center'><img className='max-w-20 max-h-5' src={assets.razorpay_logo} alt="" /></button>}
//               {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-[#696969]  bg-[#EAEFFF]'>Paid</button>}

//               {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}

//               {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button>}
//               {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyAppointments;










// <div className="flex flex-col gap-2 justify-end">
//   {!item.cancelled && !item.isCompleted && (
//     <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
//       Pay Online
//     </button>
//   )}
//   {!item.cancelled && !item.isCompleted && (
//     <button
//       onClick={() => cancelAppointment(item._id)}
//       className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
//     >
//       Cancel appointment
//     </button>
//   )}
//   {item.cancelled && !item.isCompleted && (
//     <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
//       Appointment cancelled
//     </button>
//   )}
//   {item.isCompleted && (
//     <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
//       Completed
//     </button>
//   )}
// </div>





import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

/* ---------------- Razorpay Script Loader ---------------- */
const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
/* -------------------------------------------------------- */

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [payment, setPayment] = useState("");

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  /* ---------------- Fetch Appointments ---------------- */
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/appointments",
        { headers: { token } }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* ---------------- Cancel Appointment ---------------- */
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        setPayment("");
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* ---------------- Razorpay Init ---------------- */
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Doctor Appointment Fee",
      order_id: order.id,
      receipt: order.receipt,

      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorpay",
            response,
            { headers: { token } }
          );

          if (data.success) {
            toast.success("Payment successful");
            setPayment("");
            navigate("/my-appointments");
            getUserAppointments();
          } else {
            toast.error("Payment verification failed");
          }
        } catch (error) {
          toast.error(error.message);
        }
      },

      modal: {
        ondismiss: () => {
          toast.info("Payment cancelled");
          setPayment("");
        },
      },

      theme: {
        color: "#4f46e5",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  /* ---------------- Create Razorpay Order ---------------- */
  const appointmentRazorpay = async (appointmentId) => {
    const sdkLoaded = await loadRazorpay();
    if (!sdkLoaded) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* ---------------- Lifecycle ---------------- */
  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  /* ---------------- UI ---------------- */
  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointments
      </p>

      {appointments.map((item) => (
        <div
          key={item._id}
          className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
        >
          <img
            className="w-32 bg-indigo-50"
            src={item.docData.image}
            alt=""
          />

          <div className="flex-1 text-sm text-zinc-600">
            <p className="text-neutral-800 font-semibold">
              {item.docData.name}
            </p>
            <p>{item.docData.speciality}</p>

            <p className="text-zinc-700 font-medium mt-1">Address:</p>
            <p className="text-xs">{item.docData.address.line1}</p>
            <p className="text-xs">{item.docData.address.line2}</p>

            <p className="text-xs mt-1">
              <span className="font-medium">Date & Time:</span>{" "}
              {slotDateFormat(item.slotDate)} | {item.slotTime}
            </p>
          </div>

          <div className="flex flex-col gap-2 justify-end text-sm text-center">
            {!item.cancelled &&
              !item.payment &&
              !item.isCompleted &&
              payment !== item._id && (
                <button
                  onClick={() => setPayment(item._id)}
                  className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition"
                >
                  Pay Online
                </button>
              )}

            {!item.cancelled &&
              !item.payment &&
              !item.isCompleted &&
              payment === item._id && (
                <button
                  onClick={() => appointmentRazorpay(item._id)}
                  className="sm:min-w-48 py-2 border rounded hover:bg-gray-100 flex justify-center"
                >
                  <img
                    src={assets.razorpay_logo}
                    alt="Razorpay"
                    className="max-w-20 max-h-5"
                  />
                </button>
              )}

            {!item.cancelled && item.payment && !item.isCompleted && (
              <button className="sm:min-w-48 py-2 border rounded bg-[#EAEFFF] text-[#696969]">
                Paid
              </button>
            )}

            {item.isCompleted && (
              <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                Completed
              </button>
            )}

            {!item.cancelled && !item.isCompleted && (
              <button
                onClick={() => cancelAppointment(item._id)}
                className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition"
              >
                Cancel appointment
              </button>
            )}

            {item.cancelled && !item.isCompleted && (
              <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                Appointment cancelled
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAppointments;
