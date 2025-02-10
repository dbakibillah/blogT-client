import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../providers/AuthProviders";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Registration = () => {
    const navigate = useNavigate();
    const { createUser, setUser, updateUserProfile, googleSignIn } = useContext(AuthContext);

    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(async (result) => {
                const user = result.user;
                setUser(user);

                const newUser = {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                };

                try {
                    const response = await axios.get(`https://blog-t-server.vercel.app/user?email=${user.email}`);
                    if (response.data.exists) {
                        Swal.fire({
                            title: "Welcome back!",
                            text: "You are already registered.",
                            icon: "info",
                        });
                    } else {
                        await axios.post("https://blog-t-server.vercel.app/users", newUser);
                        Swal.fire({
                            title: "Good job!",
                            text: "Registration successfully with Google!",
                            icon: "success",
                        });
                    }
                    navigate(location.state?.from?.pathname || "/", { replace: true });
                } catch (error) {
                    console.error("Error handling Google sign-in:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Something went wrong!",
                        text: error.message,
                    });
                }
            })
            .catch((err) => {
                Swal.fire({
                    title: "Something went wrong!",
                    text: err.message,
                    icon: "error",
                });
            });
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        const name = event.target.name.value;
        const email = event.target.email.value;
        const photo = event.target.photo.value;
        const password = event.target.password.value;

        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long.");
            return;
        }
        if (!/[0-9]/.test(password)) {
            setPasswordError("Password must include at least one number.");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setPasswordError("Password must include at least one uppercase letter.");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setPasswordError("Password must include at least one lowercase letter.");
            return;
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setPasswordError("Password must include at least one special character.");
        }
        setPasswordError("");

        try {
            const response = await axios.get(`https://blog-t-server.vercel.app/user?email=${email}`);
            if (response.data.exists) {
                Swal.fire({
                    title: "Already registered!",
                    text: "Please log in instead.",
                    icon: "info",
                });
                navigate("/login");
                return;
            }

            const result = await createUser(email, password);
            setUser(result.user);

            const newUser = { name, email, photo };
            await axios.post("https://blog-t-server.vercel.app/users", newUser);
            Swal.fire({
                title: "Good job!",
                text: "Registration successful!",
                icon: "success",
            });

            await updateUserProfile({ displayName: name, photoURL: photo });
            navigate("/");
        } catch (error) {
            console.error("Error during registration:", error);
            Swal.fire({
                icon: "error",
                title: "Failed to register",
                text: error.message,
            });
        }
    };


    return (
        <section className="bg-base-100 p-2 py-10 lg:py-16 dark:bg-gray-900">
            <div className="dark:bg-gray-800 card w-full max-w-sm shadow-2xl mx-auto animate__animated animate__bounceInDown animate__slow dark:text-white">
                <h2 className="text-3xl font-bold text-center text-c3 mt-4 dark:text-white">Registration</h2>
                <form onSubmit={handleRegister} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white">Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="input input-bordered dark:bg-gray-700 dark:text-gray-100"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="email"
                            className="input input-bordered dark:bg-gray-700 dark:text-gray-100"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white">Photo URL</span>
                        </label>
                        <input
                            type="text"
                            name="photo"
                            placeholder="Photo URL"
                            className="input input-bordered dark:bg-gray-700 dark:text-gray-100"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white">Password</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100"
                                required
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 cursor-pointer text-gray-500 text-2xl"
                            >
                                {showPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}
                            </span>
                        </div>
                        {passwordError && (
                            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                        )}
                    </div>

                    <div className="form-control mt-6">
                        <button type="submit" className="btn bg-blue-600 text-white border-none">
                            Registration
                        </button>
                    </div>

                    <div className="mt-4">
                        <button
                            onClick={handleGoogleSignIn}
                            type="button"
                            className="btn w-full flex items-center gap-3 bg-white border text-black hover:bg-gray-200"
                        >
                            <img
                                src="https://i.ibb.co/WnqDNrk/google.png"
                                alt="Google Icon"
                                className="w-5 h-5"
                            />
                            Continue with Google
                        </button>
                    </div>

                    <div className="mt-2">
                        <p className="text-center text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="link link-hover text-c2 font-bold">
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Registration;
