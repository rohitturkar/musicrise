import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {SET_USERDATA} from "../../Store/authSlice"

const Signin = () => {
  const auth = getAuth();
  const dispatch=useDispatch()

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },

    validationSchema: Yup.object({
      password: Yup.string().required("password is Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is Required"),
    }),

    onSubmit: async (values) => {
      const { email, password } = values;
      try {
        const response = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(response?.user?.
          uid
          
        )
        dispatch(SET_USERDATA({
          userId:response?.user?.uid,
          // authToken:response?.user?.accessToken
          
          
        }))
        toast.success(`Signin Successfully`);
        navigate('/home')
      } catch (error: any) {
       
        toast.error(error?.message);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className=" border rounded-md bg-white shadow-2xl pt-5 pb-6 px-7 max-w-[450px] w-full ">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
          <h1 className="text-center text-[#222] font-semibold text-2xl pb-5 ">
            Musicrise
          </h1>

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

          <button
            type="submit"
            className="bg-[#222] text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Sign In
          </button>

          <div className="pt-2 text-right text-xs">
            Not an account?, please{" "}
            <span
              className="text-md text-blue-700 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              sign up
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
