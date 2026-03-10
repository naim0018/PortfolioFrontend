import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CiSquarePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "@/store/Api/Auth.api";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/features/AuthSlice/authSlice";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  image: z
    .any()
    .refine((file) => file, "Image is required")
    .optional(),
});

type SignupFormInputs = z.infer<typeof signupSchema>;

const Signup = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signup, { isLoading }] = useSignupMutation();

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        shortDescription: "A passionate professional",
        longDescription:
          "I am a dedicated professional looking to showcase my skills and experiences.",
      };

      const result = await signup(payload).unwrap();
      if (result.success) {
        dispatch(
          setUser({
            accessToken: result.data.accessToken,
          }),
        );
        toast.success(result.message || "Account created successfully!");
        navigate("/");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to create account. Please try again.",
      );
      console.error("Signup Failed:", error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("image", file, { shouldValidate: true });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#e5e7eb] py-10">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-[#f9fafb] text-[#1f2937] shadow-lg">
        <h1 className="text-2xl font-bold text-center">Sign up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1 text-sm">
            <label htmlFor="name" className="block text-[#4b5563]">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              {...register("name")}
              className="w-full px-4 py-3 border rounded-md border-[#d1d5db] bg-[#f9fafb] text-[#1f2937] focus:border-violet-600 focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="block text-[#4b5563]">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              {...register("email")}
              className="w-full px-4 py-3 border rounded-md border-[#d1d5db] bg-[#f9fafb] text-[#1f2937] focus:border-violet-600 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block text-[#4b5563]">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                {...register("password")}
                className="w-full px-4 py-3 border rounded-md border-[#d1d5db] bg-[#f9fafb] text-[#1f2937] focus:border-violet-600 focus:outline-none"
              />
              <div className="absolute right-3 place-self-center top-1/2 -translate-y-1/2">
                {showPassword ? (
                  <Eye
                    className="cursor-pointer text-[#6b7280] size-5"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeOff
                    className="cursor-pointer text-[#6b7280] size-5"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>
          
          <div className="space-y-1 text-sm">
            <label className="block text-[#4b5563]">
              Profile Picture
            </label>
            <div
              className="relative w-full h-36 border-2 border-dashed border-[#d1d5db] rounded-lg flex items-center justify-center cursor-pointer bg-[#f9fafb] hover:border-violet-500 transition-colors"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center text-[#6b7280]">
                  <CiSquarePlus className="h-10 w-10 text-[#9ca3af] mb-1" />
                  <p className="text-xs">Click to upload</p>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              className="hidden"
              onChange={handleImageChange}
            />
            {errors.image?.message &&
              typeof errors.image.message === "string" && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.image.message}
                </p>
              )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="block w-full p-3 text-center rounded-sm text-[#f9fafb] bg-violet-600 hover:bg-violet-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
        </form>
        
        <p className="text-xs text-center sm:px-6 text-[#4b5563] pt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="underline text-[#1f2937] hover:text-violet-600"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
