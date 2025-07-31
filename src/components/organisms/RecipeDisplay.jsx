import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const RecipeDisplay = ({ recipe, onNewRecipe }) => {
  const parseRecipeContent = (content) => {
    const lines = content.split("\n").filter(line => line.trim());
    
    let titulo = "";
    let ingredientes = [];
    let instrucciones = [];
    let tipNutricional = "";
    let fraseMotivacional = "";
    
    let currentSection = "";
    
    for (let line of lines) {
      const cleanLine = line.trim();
      
      if (cleanLine.includes("**") && (cleanLine.toLowerCase().includes("título") || 
          cleanLine.toLowerCase().includes("titulo") || 
          (ingredientes.length === 0 && instrucciones.length === 0 && !titulo))) {
        titulo = cleanLine.replace(/\*\*/g, "").replace(/título|titulo/gi, "").replace(/:/g, "").trim();
      } else if (cleanLine.toLowerCase().includes("ingredientes") || 
                 cleanLine.toLowerCase().includes("necesitas")) {
        currentSection = "ingredientes";
      } else if (cleanLine.toLowerCase().includes("instrucciones") || 
                 cleanLine.toLowerCase().includes("preparación") ||
                 cleanLine.toLowerCase().includes("pasos")) {
        currentSection = "instrucciones";
      } else if (cleanLine.toLowerCase().includes("tip") || 
                 cleanLine.toLowerCase().includes("consejo")) {
        currentSection = "tip";
      } else if (cleanLine.toLowerCase().includes("motivadora") || 
                 cleanLine.toLowerCase().includes("recuerda") ||
                 cleanLine.toLowerCase().includes("pequeños cambios")) {
        currentSection = "frase";
      } else if (cleanLine && !cleanLine.includes("**")) {
        if (currentSection === "ingredientes") {
          ingredientes.push(cleanLine.replace(/^[-•*]\s*/, ""));
        } else if (currentSection === "instrucciones") {
          instrucciones.push(cleanLine.replace(/^[-•*]\s*/, "").replace(/^\d+\.\s*/, ""));
        } else if (currentSection === "tip") {
          tipNutricional += cleanLine + " ";
        } else if (currentSection === "frase") {
          fraseMotivacional += cleanLine + " ";
        } else if (!titulo && currentSection === "") {
          titulo = cleanLine;
        }
      }
    }
    
    return {
      titulo: titulo || "Receta Personalizada",
      ingredientes: ingredientes.length > 0 ? ingredientes : ["Ingredientes según tu selección"],
      instrucciones: instrucciones.length > 0 ? instrucciones : ["Sigue las instrucciones proporcionadas"],
      tipNutricional: tipNutricional.trim() || "¡Disfruta de esta receta saludable!",
      fraseMotivacional: fraseMotivacional.trim() || "Recuerda que pequeños cambios generan grandes transformaciones. ✨"
    };
  };

  const parsedRecipe = parseRecipeContent(recipe);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="py-12 px-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full mb-6 shadow-lg">
            <ApperIcon name="ChefHat" size={32} className="text-white" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            ¡Tu receta está lista!
          </h2>
          <p className="text-lg text-gray-600">
            Una receta personalizada creada especialmente para ti
          </p>
        </motion.div>

        {/* Recipe Card */}
        <motion.div variants={itemVariants}>
          <Card className="recipe-card p-8 md:p-10">
            {/* Recipe Title */}
            <div className="text-center mb-8">
              <h1 className="font-display text-2xl md:text-3xl font-bold gradient-text mb-4">
                {parsedRecipe.titulo}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Ingredients Section */}
              <motion.div 
                variants={itemVariants}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <ApperIcon name="ShoppingList" size={24} className="text-primary-500" />
                  <h3 className="font-display text-xl font-semibold text-gray-800">
                    Ingredientes
                  </h3>
                </div>
                <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg p-6">
                  <ul className="ingredient-list space-y-3">
                    {parsedRecipe.ingredientes.map((ingredient, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 leading-relaxed">{ingredient}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Instructions Section */}
              <motion.div 
                variants={itemVariants}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <ApperIcon name="List" size={24} className="text-primary-500" />
                  <h3 className="font-display text-xl font-semibold text-gray-800">
                    Instrucciones
                  </h3>
                </div>
                <div className="space-y-4">
                  {parsedRecipe.instrucciones.map((instruction, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-gray-100 shadow-sm"
                    >
                      <div className="instruction-number">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        {instruction}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Nutritional Tip */}
            {parsedRecipe.tipNutricional && (
              <motion.div 
                variants={itemVariants}
                className="mt-8 p-6 bg-gradient-to-r from-secondary-50 to-primary-50 rounded-lg border-l-4 border-secondary-500"
              >
                <div className="flex items-start space-x-3">
                  <ApperIcon name="Lightbulb" size={24} className="text-secondary-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-display font-semibold text-gray-800 mb-2">
                      Tip Nutricional
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {parsedRecipe.tipNutricional}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Motivational Quote */}
            {parsedRecipe.fraseMotivacional && (
              <motion.div 
                variants={itemVariants}
                className="mt-8 text-center p-6 bg-gradient-to-r from-accent-500 to-primary-500 rounded-lg text-white"
              >
                <ApperIcon name="Sparkles" size={32} className="mx-auto mb-4 opacity-80" />
                <p className="text-lg font-medium leading-relaxed italic">
                  "{parsedRecipe.fraseMotivacional}"
                </p>
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          variants={itemVariants}
          className="text-center mt-10 space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center"
        >
          <Button
            onClick={onNewRecipe}
            variant="outline"
            size="lg"
            className="w-full md:w-auto"
          >
            <ApperIcon name="RefreshCw" size={20} className="mr-2" />
            Crear nueva receta
          </Button>
          
          <Button
            onClick={() => window.print()}
            variant="secondary"
            size="lg"
            className="w-full md:w-auto"
          >
            <ApperIcon name="Printer" size={20} className="mr-2" />
            Imprimir receta
          </Button>
        </motion.div>

        {/* Thank You Message */}
        <motion.div 
          variants={itemVariants}
          className="text-center mt-12 p-6 bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg"
        >
          <h3 className="font-display text-xl font-semibold text-gray-800 mb-2">
            ¡Gracias por usar Recetas 80/20!
          </h3>
          <p className="text-gray-600">
            Esperamos que disfrutes esta receta y que sea parte de tu transformación saludable
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RecipeDisplay;