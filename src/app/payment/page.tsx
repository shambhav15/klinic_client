// "use client"

// import { Button } from "@/components/ui/button";
// import { Card, CardHeader } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import axios from "axios";
// import { useState } from "react";

// const Page = () => {
//     const [responseId, setResponseId] = useState("");
//     const [responseState, setResponseState] = useState([]);

//     const loadScript = (src: any) => {
//         return new Promise((resolve) => {
//             const script = document.createElement("script");

//             script.src = src;

//             script.onload = () => {
//                 resolve(true)
//             }
//             script.onerror = () => {
//                 resolve(false)
//             }

//             document.body.appendChild(script);
//         })
//     }

//     const createRazorpayOrder = (amount: any) => {
//         let data = JSON.stringify({
//             amount: amount * 100,
//             currency: "INR"
//         })

//         let config = {
//             method: "post",
//             maxBodyLength: Infinity,
//             url: "http://localhost:8000/orders",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             data: data
//         }

//         axios.request(config)
//             .then((response) => {
//                 console.log(JSON.stringify(response.data))
//                 handleRazorpayScreen(response.data.amount)
//             })
//             .catch((error) => {
//                 console.log("error at", error)
//             })
//     }

//     const handleRazorpayScreen = async (amount: any) => {
//         const res = await loadScript("https:/checkout.razorpay.com/v1/checkout.js")

//         if (!res) {
//             alert("Some error at razorpay screen loading")
//             return;
//         }

//         const options = {
//             key: 'rzp_test_s3c6wtjOepPdQ1',
//             amount: amount,
//             currency: 'INR',
//             name: "shambhav",
//             description: "payment testing",
//             handler: function (response: any) {
//                 setResponseId(response.razorpay_payment_id)
//             },

//             theme: {
//                 color: "#F4C430"
//             }
//         }
//         // @ts-ignore
//         const paymentObject = new window.Razorpay(options)
//         paymentObject.open()
//     }

//     const paymentFetch = (e: any) => {
//         e.preventDefault();

//         const paymentId = e.target.paymentId.value;

//         axios.get(`http://localhost:8000/payment/${paymentId}`)
//             .then((response) => {
//                 console.log(response.data);
//                 setResponseState(response.data)
//             })
//             .catch((error) => {
//                 console.log("error occures", error)
//             })
//     }

//     // useEffect(() => {
//     //   let data = JSON.stringify({
//     //     amount: amount * 100,
//     //   })

//     //   let config = {
//     //     method: "post",
//     //     maxBodyLength: Infinity,
//     //     url: `http://localhost:5000/capture/${responseId}`,
//     //     headers: {
//     //       'Content-Type': 'application/json'
//     //     },
//     //     data: data
//     //   }

//     //   axios.request(config)
//     //   .then((response) => {
//     //     console.log(JSON.stringify(response.data))
//     //   })
//     //   .catch((error) => {
//     //     console.log("error at", error)
//     //   })
//     // }, [responseId])

//     return (
//         <div className="flex h-screen flex-col items-center justify-center">
//             <Button onClick={() => createRazorpayOrder(10)}>Make a payment of 1 rp</Button>
//             {responseId && <p>{responseId}</p>}
//             <Card className="p-2 my-2 flex tex-2xl flex-col">
//                 <CardHeader>This is payment verification form</CardHeader>
//                 <form onSubmit={paymentFetch}>
//                     <div className="flex flex-col gap-2">
//                         <Input className="mb-2" type="text" name="paymentId" />
//                         <Button type="submit">Fetch Payment</Button>
//                         {responseState?.length !== 0 && (
//                             <ul className="">
//                                 <li>Amount: {responseState.amount / 100} Rs.</li>
//                                 <li>Currency: {responseState.currency}</li>
//                                 <li>Status: {responseState.status}</li>
//                                 <li>Method: {responseState.method}</li>
//                             </ul>
//                         )}
//                     </div>
//                 </form>
//             </Card>
//         </div>
//     );
// }

// export default Page