import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const WelcomeHero = ({ onGetStarted }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-12 px-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Hero Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full mb-8 shadow-lg"
        >
          <ApperIcon name="ChefHat" size={40} className="text-white" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          Bienvenido a{" "}
          <span className="gradient-text">
            Recetas 80/20
          </span>
        </motion.h1>

        {/* Emoji and Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8"
        >
          <div className="text-4xl mb-4">🍽️✨</div>
          <h2 className="font-display text-xl md:text-2xl text-gray-700 mb-6">
            Elige tu tipo de receta y transforma tu día con pequeños cambios
          </h2>
        </motion.div>

        {/* Philosophy Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Siguiendo la filosofía <strong className="text-primary-600">80/20</strong>, 
          te ayudamos a crear recetas saludables y personalizadas que se adaptan a tu estilo de vida. 
          Pequeños cambios que generan grandes transformaciones.
        </motion.p>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto"
        >
          <div className="flex items-center space-x-3 text-gray-700">
            <ApperIcon name="CheckCircle" size={20} className="text-accent-500 flex-shrink-0" />
            <span>Recetas personalizadas</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-700">
            <ApperIcon name="CheckCircle" size={20} className="text-accent-500 flex-shrink-0" />
            <span>Ingredientes disponibles</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-700">
            <ApperIcon name="CheckCircle" size={20} className="text-accent-500 flex-shrink-0" />
            <span>Filosofía 80/20</span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Button
            size="lg"
            onClick={onGetStarted}
            className="px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl"
          >
            Comenzar mi transformación
            <ApperIcon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 flex justify-center space-x-8 text-4xl"
        >
          <span>🥗</span>
          <span>🥤</span>
          <span>🌿</span>
          <span>💪</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeHero;