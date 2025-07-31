import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import FormField from "@/components/molecules/FormField";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const RecipeForm = ({ recipeType, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    tipoComida: "",
    tipoBebida: "",
    ingredientes: "",
    restricciones: "",
    sabor: "",
    productosHerbalife: "",
    nombre: "",
    contacto: ""
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

const validateForm = () => {
    const newErrors = {};

    // Recipe type validation
    if (recipeType === "comida" && !formData.tipoComida) {
      newErrors.tipoComida = "Por favor selecciona el tipo de comida";
    }
    if (recipeType === "bebida" && !formData.tipoBebida) {
      newErrors.tipoBebida = "Por favor selecciona el tipo de bebida";
    }
    
    // Ingredients validation with enhanced checking
    if (!formData.ingredientes?.trim()) {
      newErrors.ingredientes = "Por favor indica los ingredientes disponibles";
    } else if (formData.ingredientes.trim().length < 5) {
      newErrors.ingredientes = "Por favor describe los ingredientes con más detalle";
    }
    
    // Flavor validation
    if (!formData.sabor) {
      newErrors.sabor = "Por favor selecciona tu preferencia de sabor";
    }
    
    // Herbalife products validation for drinks
    if (recipeType === "bebida" && !formData.productosHerbalife) {
      newErrors.productosHerbalife = "Por favor selecciona el producto Herbalife";
    }
    
    // Name validation with enhanced checking
    if (!formData.nombre?.trim()) {
      newErrors.nombre = "Por favor ingresa tu nombre";
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres";
    }
    
    // Contact validation with format checking
    if (!formData.contacto?.trim()) {
      newErrors.contacto = "Por favor ingresa tu teléfono o correo";
    } else {
      const contactValue = formData.contacto.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      
      if (contactValue.length < 5) {
        newErrors.contacto = "El contacto debe tener al menos 5 caracteres";
      } else if (!emailRegex.test(contactValue) && !phoneRegex.test(contactValue)) {
        newErrors.contacto = "Por favor ingresa un email válido o un número de teléfono";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = (e) => {
    e?.preventDefault();
    
    // Additional safety check before validation
    if (!formData || typeof formData !== 'object') {
      console.error('Form data is invalid:', formData);
      return;
    }
    
    if (validateForm()) {
      // Ensure all required fields are properly formatted
      const sanitizedData = {
        ...formData,
        tipoReceta: recipeType,
        ingredientes: formData.ingredientes?.trim() || '',
        restricciones: formData.restricciones?.trim() || '',
        nombre: formData.nombre?.trim() || '',
        contacto: formData.contacto?.trim() || '',
        sabor: formData.sabor || '',
        tipoComida: formData.tipoComida || '',
        tipoBebida: formData.tipoBebida || '',
        productosHerbalife: formData.productosHerbalife || ''
      };
      
      onSubmit(sanitizedData);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="py-12 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <motion.h2 
            variants={itemVariants}
            className="font-display text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            Personaliza tu receta
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600"
          >
            Cuéntanos tus preferencias para crear la receta perfecta para ti
          </motion.p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Recipe Type Specific Fields */}
            {recipeType === "comida" && (
              <motion.div variants={itemVariants}>
                <FormField
                  label="¿Qué tipo de comida deseas?"
                  required
                  error={errors.tipoComida}
                >
                  <Select
                    value={formData.tipoComida}
                    onChange={(e) => handleInputChange("tipoComida", e.target.value)}
                    error={errors.tipoComida}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="desayuno">Desayuno</option>
                    <option value="comida">Comida</option>
                    <option value="cena">Cena</option>
                    <option value="snack">Snack</option>
                    <option value="postre">Postre</option>
                  </Select>
                </FormField>
              </motion.div>
            )}

            {recipeType === "bebida" && (
              <>
                <motion.div variants={itemVariants}>
                  <FormField
                    label="¿Qué tipo de bebida deseas?"
                    required
                    error={errors.tipoBebida}
                  >
                    <Select
                      value={formData.tipoBebida}
                      onChange={(e) => handleInputChange("tipoBebida", e.target.value)}
                      error={errors.tipoBebida}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="fria">Fría</option>
                      <option value="caliente">Caliente</option>
                    </Select>
                  </FormField>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    label="¿Qué producto Herbalife deseas incluir?"
                    required
                    error={errors.productosHerbalife}
                  >
                    <Select
                      value={formData.productosHerbalife}
                      onChange={(e) => handleInputChange("productosHerbalife", e.target.value)}
                      error={errors.productosHerbalife}
                    >
                      <option value="">Selecciona un producto</option>
                      <option value="formula1">Fórmula 1</option>
                      <option value="proteina-gold">Proteína Gold</option>
                      <option value="aloe">Aloe</option>
                      <option value="te">Té</option>
                      <option value="colageno">Colágeno</option>
                    </Select>
                  </FormField>
                </motion.div>
              </>
            )}

            {/* Common Fields */}
            <motion.div variants={itemVariants}>
              <FormField
                label={recipeType === "bebida" ? "¿Qué ingredientes naturales tienes disponibles?" : "¿Qué ingredientes tienes disponibles?"}
                required
                error={errors.ingredientes}
              >
                <Textarea
                  placeholder="Ej: plátano, espinacas, leche de almendras, avena, miel..."
                  value={formData.ingredientes}
                  onChange={(e) => handleInputChange("ingredientes", e.target.value)}
                  error={errors.ingredientes}
                  rows={4}
                />
              </FormField>
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormField
                label="¿Qué sabor prefieres?"
                required
                error={errors.sabor}
              >
                <Select
                  value={formData.sabor}
                  onChange={(e) => handleInputChange("sabor", e.target.value)}
                  error={errors.sabor}
                >
                  <option value="">Selecciona una opción</option>
                  {recipeType === "bebida" ? (
                    <>
                      <option value="chocolate">Chocolate</option>
                      <option value="vainilla">Vainilla</option>
                      <option value="mango">Mango</option>
                      <option value="fresa">Fresa</option>
                      <option value="otro">Otro</option>
                    </>
                  ) : (
                    <>
                      <option value="salado">Salado</option>
                      <option value="dulce">Dulce</option>
                      <option value="ligero">Ligero</option>
                      <option value="especiado">Especiado</option>
                    </>
                  )}
                </Select>
              </FormField>
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormField
                label="¿Tienes alguna restricción alimentaria o preferencia?"
                error={errors.restricciones}
              >
                <Textarea
                  placeholder="Ej: sin gluten, vegano, bajo en azúcar, sin lácteos..."
                  value={formData.restricciones}
                  onChange={(e) => handleInputChange("restricciones", e.target.value)}
                  error={errors.restricciones}
                  rows={3}
                />
              </FormField>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <div className="border-t border-gray-200 pt-6 mt-8">
                <h3 className="font-display text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <ApperIcon name="User" size={20} className="mr-2 text-primary-500" />
                  Información de contacto
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="Nombre"
                    required
                    error={errors.nombre}
                  >
                    <Input
                      placeholder="Tu nombre completo"
                      value={formData.nombre}
                      onChange={(e) => handleInputChange("nombre", e.target.value)}
                      error={errors.nombre}
                    />
                  </FormField>

                  <FormField
                    label="Teléfono o correo"
                    required
                    error={errors.contacto}
                  >
                    <Input
                      placeholder="Tu teléfono o email"
                      value={formData.contacto}
                      onChange={(e) => handleInputChange("contacto", e.target.value)}
                      error={errors.contacto}
                    />
                  </FormField>
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div 
              variants={itemVariants}
              className="pt-6"
            >
              <Button
                type="submit"
                size="lg"
                loading={loading}
                className="w-full md:w-auto md:px-12 font-semibold"
              >
                {loading ? "Generando tu receta..." : "Generar mi receta personalizada"}
                {!loading && <ApperIcon name="Sparkles" size={20} className="ml-2" />}
              </Button>
            </motion.div>
          </form>
        </Card>
      </div>
    </motion.div>
  );
};

export default RecipeForm;