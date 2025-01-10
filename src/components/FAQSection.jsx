import { useState } from 'react';
import { motion } from 'framer-motion';

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "What is this website about?",
            answer:
                "This website provides a platform for trending topics and blog posts in various categories like Technology, Gaming, Coding, and more.",
        },
        {
            question: "How can I contribute to this blog?",
            answer:
                "To contribute, you can submit your blog posts through our 'Submit a Post' section or contact us via email for further details.",
        },
        {
            question: "Can I subscribe to updates?",
            answer:
                "Yes, you can subscribe to our newsletter by entering your email in the 'Subscribe' section located at the bottom of the page.",
        },
        {
            question: "Is there a mobile app for this website?",
            answer:
                "Currently, we only have a web platform, but we are working on a mobile app that will be available soon on both iOS and Android.",
        },
        {
            question: "How do I contact support?",
            answer:
                "You can contact our support team via the 'Contact Us' page. We usually respond within 24 hours.",
        },
    ];

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
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
                    Frequently Asked Questions
                </motion.h2>

                <motion.div
                    className="space-y-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-lg shadow dark:bg-gray-900 dark:text-gray-100 collapse collapse-arrow hover:bg-gray-200 focus-within:bg-gray-300 focus:ring-2 focus:ring-indigo-500 transition-all dark:border dark:border-gray-800"
                            variants={itemVariants}
                        >
                            <div
                                className="px-6 py-4 cursor-pointer flex justify-between items-center"
                                onClick={() => toggleAnswer(index)}
                            >
                                <h3 className="text-xl font-semibold">{faq.question}</h3>
                                <span className="text-3xl font-bold text-blue-500">
                                    {activeIndex === index ? '-' : '+'}
                                </span>
                            </div>
                            {activeIndex === index && (
                                <motion.div
                                    className="px-6 py-4 text-gray-600 dark:text-gray-400"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {faq.answer}
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FAQSection;
