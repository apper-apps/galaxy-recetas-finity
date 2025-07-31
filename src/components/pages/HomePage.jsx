import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import WelcomeHero from "@/components/organisms/WelcomeHero";
import RecipeTypeSelector from "@/components/organisms/RecipeTypeSelector";
import RecipeForm from "@/components/organisms/RecipeForm";
import RecipeDisplay from "@/components/organisms/RecipeDisplay";
import Loading from "@/components/ui/Loading";
import ErrorDisplay from "@/components/ui/Error";

const HomePage = () => {
  const [currentStep, setCurrentStep] = useState("welcome"); // welcome, selector, form, loading, recipe
  const [selectedType, setSelectedType] = useState("");
  const [generatedRecipe, setGeneratedRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetStarted = () => {
    setCurrentStep("selector");
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setTimeout(() => {
      setCurrentStep("form");
    }, 500);
  };

const generateRecipe = async (formData) => {
    setLoading(true);
    setError("");
    setCurrentStep("loading");

    try {
      // Validate environment variables
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      const webhookUrl = import.meta.env.VITE_PABBLY_WEBHOOK_URL;
      
      if (!apiKey) {
        throw new Error("Configuración de API faltante. Por favor contacta al administrador.");
      }

      // Validate form data
      if (!formData.ingredientes?.trim()) {
        throw new Error("Los ingredientes son requeridos para generar la receta.");
      }
      
      if (!formData.sabor) {
        throw new Error("La preferencia de sabor es requerida.");
      }

      // Prepare content for OpenAI
      const recipeType = formData.tipoReceta === "comida" ? 
        `${formData.tipoComida || "comida saludable"}` : 
        `bebida ${formData.tipoBebida || ""}`;
      
      const productosHerbalife = formData.tipoReceta === "bebida" ? 
        formData.productosHerbalife : "Ninguno";

      // OpenAI API call with improved error handling
      const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Actúa como un chef experto en nutrición saludable. Genera una receta en español para un usuario que desea una ${recipeType}. Ingredientes disponibles: ${formData.ingredientes}. Restricciones: ${formData.restricciones || "Ninguna"}. Sabor preferido: ${formData.sabor}. Productos Herbalife: ${productosHerbalife}. La receta debe incluir:

1. Título atractivo
2. Lista clara de ingredientes
3. Instrucciones paso a paso
4. Tip nutricional práctico
5. Frase motivadora estilo Coach 80/20, como: 'Recuerda que pequeños cambios generan grandes transformaciones.'

La receta debe ser sabrosa, sencilla y saludable. Si el usuario indicó productos Herbalife, sugiérelos adecuadamente.`
            }
          ],
          temperature: 0.8,
          max_tokens: 400
        })
      });

      // Enhanced error handling for different response statuses
      if (!openAIResponse.ok) {
        const errorData = await openAIResponse.json().catch(() => ({}));
        
        switch (openAIResponse.status) {
          case 401:
            throw new Error("Error de autenticación. Por favor contacta al administrador.");
          case 429:
            throw new Error("Servicio temporalmente ocupado. Por favor intenta en unos minutos.");
          case 500:
            throw new Error("Error del servidor. Por favor intenta nuevamente.");
          default:
            throw new Error(errorData.error?.message || "Error al conectar con el servicio de generación de recetas.");
        }
      }

      const openAIData = await openAIResponse.json();
      
      // Validate response structure
      if (!openAIData.choices?.[0]?.message?.content) {
        throw new Error("Respuesta inválida del servicio. Por favor intenta nuevamente.");
      }
      
      const recipeContent = openAIData.choices[0].message.content;
      setGeneratedRecipe(recipeContent);

      // Send data to Pabbly webhook with improved error handling
      if (webhookUrl) {
        try {
          const webhookResponse = await fetch(webhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              nombre: formData.nombre,
              contacto: formData.contacto,
              tipo_receta: recipeType,
              ingredientes: formData.ingredientes,
              restricciones: formData.restricciones || "Ninguna",
              sabor: formData.sabor,
              productos_herbalife: productosHerbalife,
              receta_generada: recipeContent,
              timestamp: new Date().toISOString()
            })
          });
          
          if (!webhookResponse.ok) {
            console.warn("Webhook failed:", webhookResponse.status);
          }
        } catch (webhookError) {
          console.warn("Error sending to webhook:", webhookError);
          // Don't block the user experience if webhook fails
        }
      }

      setCurrentStep("recipe");
      toast.success("¡Receta generada exitosamente! 🎉");

    } catch (error) {
      console.error("Error generating recipe:", error);
      const errorMessage = error.message || "Error inesperado al generar la receta";
      setError(errorMessage);
      setCurrentStep("error");
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const handleNewRecipe = () => {
    setCurrentStep("welcome");
    setSelectedType("");
    setGeneratedRecipe("");
    setError("");
  };

  const handleRetry = () => {
    setCurrentStep("form");
    setError("");
  };

  const pageVariants = {
    initial: { opacity: 0, x: -100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 100 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {currentStep === "welcome" && (
          <motion.div
            key="welcome"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <WelcomeHero onGetStarted={handleGetStarted} />
          </motion.div>
        )}

        {currentStep === "selector" && (
          <motion.div
            key="selector"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <RecipeTypeSelector 
              selectedType={selectedType}
              onTypeSelect={handleTypeSelect}
            />
          </motion.div>
        )}

        {currentStep === "form" && (
          <motion.div
            key="form"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <RecipeForm 
              recipeType={selectedType}
              onSubmit={generateRecipe}
              loading={loading}
            />
          </motion.div>
        )}

        {currentStep === "loading" && (
          <motion.div
            key="loading"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Loading />
          </motion.div>
        )}

        {currentStep === "error" && (
          <motion.div
            key="error"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
<ErrorDisplay 
              message={error}
              onRetry={handleRetry}
            />
          </motion.div>
        )}

        {currentStep === "recipe" && generatedRecipe && (
          <motion.div
            key="recipe"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <RecipeDisplay 
              recipe={generatedRecipe}
              onNewRecipe={handleNewRecipe}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;