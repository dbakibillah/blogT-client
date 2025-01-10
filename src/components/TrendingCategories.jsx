import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const TrendingCategories = () => {
    const [trendingCategories, setTrendingCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("https://blog-t-server.vercel.app/trending-categories")
            .then((response) => {
                setTrendingCategories(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching trending categories:", error);
                setLoading(false);
            });
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        hover: { scale: 1.05, transition: { duration: 0.3 } },
    };

    return (
        <section className="bg-gray-100 dark:bg-gray-900 py-8">
            <div className="container mx-auto lg:px-24 p-2">
                <motion.h2
                    className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-6 dark:text-gray-100"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Trending Categories
                </motion.h2>

                {loading ? (
                    <p className="text-gray-600 dark:text-gray-300">Loading categories...</p>
                ) : trendingCategories.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {trendingCategories.map((category, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-6 rounded-lg shadow dark:bg-gray-800 dark:text-gray-100 text-center"
                                variants={cardVariants}
                                whileHover="hover"
                            >
                                <div className="">
                                    <h3 className="text-lg font-semibold">{category.category}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {category.blogCount} blog{category.blogCount > 1 ? 's' : ''}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <p className="text-gray-600 dark:text-gray-300">
                        No trending categories available.
                    </p>
                )}
            </div>
        </section>
    );
};

export default TrendingCategories;
