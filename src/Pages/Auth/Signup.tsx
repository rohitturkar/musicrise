import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import toast from "react-hot-toast";

const Signup = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      password: "",
      email: "",
    },

    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is Required"),
      password: Yup.string().required("password is Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is Required"),
    }),

    onSubmit: async (values) => {
      const { fullName,email, password } = values;
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password);

    
        if (auth?.currentUser) {
          await updateProfile(auth.currentUser, {
            displayName: fullName,
          });
        }

        toast.success(`User signup successfully!`)
        navigate('/signin')
      
      } catch (error:any) {
        let customErrorMessage = '';
    if (error.code === 'auth/weak-password') {
      customErrorMessage = 'Your password is too weak. Please choose a stronger password with at least 6 characters.';

      toast.error(customErrorMessage)
    } else if (error.code === 'auth/email-already-in-use') {
      customErrorMessage = 'This email is already registered. Please use a different email.';
      toast.error(customErrorMessage)
    } else {
      customErrorMessage = 'An error occurred during registration. Please try again.';
      toast.error(customErrorMessage)
    }
       
      }
    },
    
  });

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className=" border rounded-md bg-white shadow-2xl pt-5 pb-6 px-7 max-w-[450px] w-full ">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
          <h1 className="text-center text-[#222] font-semibold text-2xl  pb-5 ">
           Musicrise 
          </h1>
         
          <div className="flex gap-2 flex-col items-start">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              className="p-2 border border-gray-200 rounded-md text-black w-full"
              id="fullName"
              name="fullName"
              onChange={formik.handleChange}
              value={formik.values.fullName}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="text-xs text-red-600">{formik.errors.fullName}</div>
            )}
          </div>

        
          <div className="flex gap-2 flex-col  items-start">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="p-2 border border-gray-200 rounded-md text-black w-full"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />

            {formik.touched.email && formik.errors.email && (
              <div className="text-xs text-red-600">{formik.errors.email}</div>
            )}
          </div>
          <div className="flex gap-2 flex-col  items-start">
            <label>Password</label>
            <input
              type="password"
              className="p-2 border border-gray-200 rounded-md text-black w-full"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-xs text-red-600">
                {formik.errors.password}
              </div>
            )}
          </div>
       
            <button type='submit' className="bg-[#222] text-white px-4 py-2 rounded-md cursor-pointer">Sign up</button>
        
          <div className="pt-2 text-right text-xs">
            If you have already an account ?, please{" "}
            <span
              className="text-md text-blue-700 cursor-pointer"
              onClick={() => navigate("/signin")}
            >
              sign in
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
