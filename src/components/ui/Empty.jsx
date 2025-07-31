import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "¡Comencemos a cocinar!",
  message = "Aún no has creado ninguna receta. ¡Es hora de empezar tu transformación saludable!",
  actionText = "Crear mi primera receta",
  onAction
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
          {/* Empty State Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="w-20 h-20 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center mb-6 mx-auto"
          >
            <ApperIcon name="BookOpen" size={40} className="text-primary-500" />
          </motion.div>

          {/* Empty State Title */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display text-2xl font-semibold text-gray-800 mb-4"
          >
            {title}
          </motion.h3>

          {/* Empty State Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-gray-600 mb-8 leading-relaxed"
          >
            {message}
          </motion.p>

          {/* Action Button */}
          {onAction && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Button
                onClick={onAction}
                size="lg"
                className="px-8"
              >
                <ApperIcon name="Plus" size={20} className="mr-2" />
                {actionText}
              </Button>
            </motion.div>
          )}

          {/* Motivational Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-8 flex justify-center space-x-4 text-2xl"
          >
            <span>🥗</span>
            <span>💚</span>
            <span>✨</span>
          </motion.div>

          {/* Philosophy Reminder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg"
          >
            <p className="text-sm text-gray-700 italic">
              "Recuerda la filosofía 80/20: pequeños cambios generan grandes transformaciones"
            </p>
          </motion.div>
        </Card>
      </div>
    </motion.div>
  );
};

export default Empty;