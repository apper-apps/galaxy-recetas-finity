import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Algo salió mal al generar tu receta", 
  onRetry,
  showRetry = true 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-16 px-6"
    >
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 text-center">
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto"
          >
            <ApperIcon name="AlertCircle" size={40} className="text-red-500" />
          </motion.div>

          {/* Error Message */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display text-2xl font-semibold text-gray-800 mb-4"
          >
            ¡Ups! Algo no salió como esperábamos
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-gray-600 mb-8 leading-relaxed"
          >
            {message}. No te preocupes, estas cosas pasan. Inténtalo de nuevo y podremos crear esa deliciosa receta para ti.
          </motion.p>

          {/* Retry Button */}
          {showRetry && onRetry && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Button
                onClick={onRetry}
                size="lg"
                className="px-8"
              >
                <ApperIcon name="RefreshCw" size={20} className="mr-2" />
                Intentar nuevamente
              </Button>
            </motion.div>
          )}

          {/* Helpful Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 p-4 bg-gray-50 rounded-lg"
          >
            <h4 className="font-medium text-gray-800 mb-2">Consejos para una mejor experiencia:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Verifica tu conexión a internet</li>
              <li>• Asegúrate de completar todos los campos requeridos</li>
              <li>• Intenta con ingredientes más específicos</li>
            </ul>
          </motion.div>
        </Card>
      </div>
    </motion.div>
  );
};

export default Error;