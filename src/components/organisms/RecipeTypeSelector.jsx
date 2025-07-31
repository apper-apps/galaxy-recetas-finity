import { motion } from "framer-motion";
import RecipeTypeCard from "@/components/molecules/RecipeTypeCard";

const RecipeTypeSelector = ({ selectedType, onTypeSelect }) => {
  const recipeTypes = [
    {
      id: "comida",
      title: "Comida Saludable",
      description: "Recetas nutritivas con ingredientes naturales, perfectas para cualquier momento del día",
      icon: "Salad"
    },
    {
      id: "bebida",
      title: "Bebida con Herbalife",
      description: "Deliciosas bebidas con productos Herbalife para complementar tu nutrición diaria",
      icon: "Coffee"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-12 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            ¿Qué tipo de receta deseas?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Elige la opción que mejor se adapte a tus necesidades y preferencias nutricionales
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {recipeTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <RecipeTypeCard
                title={type.title}
                description={type.description}
                icon={type.icon}
                selected={selectedType === type.id}
                onClick={() => onTypeSelect(type.id)}
              />
            </motion.div>
          ))}
        </div>

        {selectedType && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-center mt-8"
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent-500 to-primary-500 text-white rounded-full font-medium shadow-lg">
              <span>Excelente elección</span>
              <span className="ml-2">✨</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default RecipeTypeSelector;