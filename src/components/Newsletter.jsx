import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const Newsletter = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!email || !/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            toast.error("Please enter a valid email address.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        toast.success("Thank you for subscribing to our newsletter!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

        setEmail("");
    };

    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1 } },
    };

    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } },
    };

    const buttonHover = {
        scale: 1.05,
        transition: { duration: 0.3 },
    };

    return (
        <motion.section
            className="bg-gray-100 dark:bg-gray-900 p-2 lg:px-12 py-12"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="container mx-auto lg:w-3/4 bg-gray-200 py-8 px-4 dark:bg-gray-800 rounded-lg md:py-12 md:px-24">
                <div className="max-w-lg mx-auto">
                    <motion.figure
                        className="flex justify-center mb-4 w-1/2 mx-auto"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <img
                            src="https://i.ibb.co.com/H7VFSVB/vecteezy-3d-open-mail-icon-12627941.png"
                            alt="Newsletter Icon"
                        />
                    </motion.figure>

                    <motion.h2
                        className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        Subscribe to our Newsletter
                    </motion.h2>

                    <motion.form
                        onSubmit={handleSubmit}
                        className="flex flex-col md:flex-row gap-2"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input w-full input-bordered px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <motion.button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700"
                            whileHover={buttonHover}
                        >
                            Subscribe
                        </motion.button>
                    </motion.form>
                </div>
                <ToastContainer />
            </div>
        </motion.section>
    );
};

export default Newsletter;
