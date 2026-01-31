import Image from 'next/image';
import { useDispatch } from 'react-redux';
// import bannerImg from "@/assets/"

export default function Shotcut() {

  // data-prevent-body-trigger
  const dispatch = useDispatch();
    // const {authAccessToken} = useSelector((state:RootState) => state.authInfo
    const handler = ()=>{}
    handler()
  return (
    <div>

<div className="grid dark:bg-[#1c1d1e] grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)] dark:shadow-[0px_1px_4px_0px_rgba(255,255,255,0.2)]">
  <Image src="/public/images/services/service-marketing-white-icon.png" width={300} height={400} alt="" />
</div>

    </div>
  )
}

  <button
                    onClick={() => dispatch(SET_EXPAND(EXPAND === KEY ? null : KEY))}
                    className="relative w-[80px] h-[80px] focus:outline-none group"
                >
                    {/* Outer Glow Wrapper: 
          - rounded-full & overflow-hidden clips the internal spinning square into a circle 
        */}
                    <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-shadow duration-300 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]">

                        {/* The Spinning Gradient:
            - A large square rotating behind the inner mask
            - conic-gradient creates the rainbow spectrum
          */}
                        <div
                            className="absolute w-[180%] h-[180%] animate-spin-slow"
                            style={{
                                background: 'conic-gradient(from 0deg, #ff0000, #ff00ff, #0000ff, #00ffff, #00ff00, #ffff00, #ff0000)',
                                animation: 'spin-gradient 3s linear infinite'
                            }}
                        />

                        {/* The Inner Mask:
            - inset-[3px] determines the border thickness
            - z-10 ensures it stays above the gradient
          */}
                        <div className="absolute inset-[3px] bg-black rounded-full z-10 flex flex-col items-center justify-center">
                            <div className={`relative transition-transform duration-200 ${runExpandAnimation ? 'scale-125' : 'scale-100'}`}>
                                <ShoppingCart
                                    size={24}
                                    className="text-white fill-white"
                                />

                                {/* Cart Badge */}
                                {cartProducts.length > 0 && (
                                    <span className="absolute -top-3 -right-3 flex items-center justify-center text-[10px] font-bold h-5 w-5 bg-pink-600 text-white rounded-full border border-black animate-bounce-short">
                                        {cartProducts.length}
                                    </span>
                                )}
                            </div>

                            <span className="text-white font-bold text-[10px] mt-0.5 tracking-widest uppercase">
                                CART
                            </span>
                        </div>
                    </div>
                </button>


// alert("API integration in progress")

//  ===== section padding
// py-8 md:py-10 lg:py-14 xl:py-16 2xl:py-18

// const handleClose = ()=>{}

// load data
  // useEffect(() => {
  //    const loadData = async ()=>{
  //      const res = await ().unwrap()
  //    }
  //    loadData()
  //  }, [])


// slider
{/* <SliderWrapper slideCount={3}>
   <SliderContainer>
      <div className="w-full h-64 flex items-center justify-center bg-red-500 text-white text-xl font-bold">
        Slide 1
      </div>
      <div className="w-full h-64 flex items-center justify-center bg-blue-500 text-white text-xl font-bold">
        Slide 2
      </div>
      <div className="w-full h-64 flex items-center justify-center bg-green-500 text-white text-xl font-bold">
        Slide 3
      </div>
    </SliderContainer>
    </SliderWrapper> */}



    // export const  InstraIcon = ({className=''}:{className?:string})=> {
      //     <svg className={className}
    //   return (
    
    //   )
    // }

    

    /*
    <Image src="" width={} height={} alt="" />
    */

    // components


    // useEffect(()=>{},[])


    /*
     color loading spinner
     <LoadingSpinner
                    totalVisuals={3}
                    containerClass="w-6  h-8"
                    squareClasses={["bg-[#6C63FF]", "bg-[#6C63FF]", "bg-[#6C63FF]"]}
                  />
    */ 


                  // ====== socket trigger event from front-end
                  //  if (!activityInfo?._id) {
                  //       // something wrong setting activity info
                  //       toast.error("internal server error");
                  //       return;
                  //     }
                  //     console.log("clicked ", socket);
                  //     if (socket) {
                  //       socket.emit("createGroup", {
                  //         activityId: activityInfo?._id,
                  //       });
                  //     } else {
                  //       toast.error("internal server error");
                  //       // TOOD: have to create rest api to create new group
                  //     }


                  // receive event in useEffect
                  //  useEffect(() => {
                  //     if (!socket) return;
                  //     socket.on("joinRequestSent", async (activity) => {
                  //       dispatch(deleteSearchedActivities(activity.activityId));
                  //       toast.success("Request sent");
                  //     });
                  
                  //     // Clean up when component unmounts or socket changes
                  //     return () => {
                  //       socket.off("joinRequestSent", () => {});
                  //     };
                  //   }, [socket]);


                      // authenticate user
                      // try {
                      // await dbConnect();
                      //     await verifyAdmin(req);
                      // } catch (error) {
                      //     return NextResponse.json({ success: false, message: (error as Error).message }, { status: 401 });
                      // }



  // useEffect(() => {
  //   const loadData = async()=>{
  //     try {
  //       const res = await loadMedia({ type: "image" }).unwrap()
  //     console.log(res, ' res from the load data')
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   loadData()
  // }, [loadMedia])


                      /*
                      urls 
                      https://res.cloudinary.com/dirjayri8/image/upload/v1748526122/zfmkx1ssrfbtsiibeeze.png
                      https://res.cloudinary.com/dirjayri8/raw/upload/v1748532597/k0tyb0wshuc3ei0oqvae.svg
                      https://res.cloudinary.com/dirjayri8/raw/upload/v1748532597/r2rg0cgdr3xa8e8bctbw.svg
                      */ 




      // {/* SUCCESS */}
      // {type === "success" && (
      //   <CustomAlert
      //     open={open}
      //     onOpenChange={setOpen}
      //     type="success"
      //     title="Saved Successfully!"
      //     description="Your data has been saved."
      //   />
      // )}

      // {/* WARNING */}
      // {type === "warning" && (
      //   <CustomAlert
      //     open={open}
      //     onOpenChange={setOpen}
      //     type="warning"
      //     title="Feature in progress"
      //     description="This feature will be available soon."
      //   />
      // )}

      // {/* ERROR */}
      // {type === "error" && (
      //   <CustomAlert
      //     open={open}
      //     onOpenChange={setOpen}
      //     type="error"
      //     title="Something went wrong"
      //     description="Please try again later."
      //   />
      // )}

      // {/* INFO */}
      // {type === "info" && (
      //   <CustomAlert
      //     open={open}
      //     onOpenChange={setOpen}
      //     type="info"
      //     title="Heads up!"
      //     description="This action may affect your account."
      //   />
      // )}

      // {/* CONFIRM */}
      // {type === "warning" && (
      //   <CustomAlert
      //     open={open}
      //     onOpenChange={setOpen}
      //     type="warning"
      //     title="Are you sure?"
      //     description="This action cannot be undone."
      //     showCancel
      //     confirmText="Yes, continue"
      //     cancelText="Cancel"
      //     onConfirm={() => console.log("Confirmed")}
      //   />
      // )}


//       const getCategoryData = ()=>{
//     try{

//     }catch{
        
//     }
// }