import React from "react";
import { motion } from "framer-motion";
import developerImg from '../assets/developer.jpg'

const Testimonial = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="bg-white shadow-2xl rounded-lg p-6 sm:p-8 max-w-sm sm:max-w-lg md:max-w-xl mx-auto"
            >
                <div className="flex flex-col sm:flex-row items-center mb-6">
                    <img
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-blue-500 shadow-lg mb-4 sm:mb-0"
                        src={developerImg} // Replace with actual image
                        alt="Client Profile"
                    />
                    <div className="text-center sm:text-left sm:ml-6">
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Usman Ali</h3>
                        <p className="text-sm text-gray-600">Full stack Developer</p>
                    </div>
                </div>
                <blockquote className="text-gray-700 text-sm sm:text-lg italic leading-relaxed mb-6">
                    "Being a passionate and dedicated full-stack developer, I've consistently delivered high-quality solutions that exceed expectations. My focus is on building scalable, efficient, and user-friendly applications. Through continuous learning and adaptation to new technologies, I ensure that my work not only meets the current standards but sets a strong foundation for future growth. The commitment to my craft is evident in every line of code I write, as I strive to create products that truly make an impact"
                </blockquote>
                <div className="text-right">
                    <span className="text-indigo-500 font-semibold text-lg">- Usman Ali</span>
                </div>
            </motion.div>
        </div>
    );
};

export default Testimonial;
