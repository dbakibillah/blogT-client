import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const PopularAuthors = () => {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        axios
            .get("https://blog-t-server.vercel.app/popular-authors")
            .then((response) => {
                setAuthors(response.data);
            })
            .catch((error) => console.error("Error fetching popular authors:", error));
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        hover: { scale: 1.05, transition: { duration: 0.3 } },
    };

    const headingVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <section className="py-12 bg-gray-100 dark:bg-gray-800">
            <div className="container mx-auto p-2 lg:px-24">
                <motion.h2
                    className="text-2xl md:text-4xl font-bold mb-8 text-center dark:text-gray-100"
                    initial="hidden"
                    animate="visible"
                    variants={headingVariants}
                >
                    Popular Authors
                </motion.h2>

                <motion.div
                    className="grid md:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {authors.map((author) => (
                        <motion.div
                            key={author._id}
                            className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 text-center"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <figure className="mb-4">
                                <img
                                    src={author.photo}
                                    alt={author.name}
                                    className="w-24 h-24 rounded-full mx-auto"
                                />
                            </figure>
                            <h3 className="text-lg md:text-2xl font-bold text-gray-800 dark:text-gray-100">
                                {author.name}
                            </h3>
                            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
                                {author.email}
                            </p>
                            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mt-4">
                                {author.blogPostCount} Blog Posts
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default PopularAuthors;
