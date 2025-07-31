import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const RecipeTypeCard = ({ 
  title, 
  description, 
  icon, 
  selected, 
  onClick,
  className 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={cn(
          "p-6 cursor-pointer transition-all duration-300",
          selected 
            ? "ring-4 ring-primary-500/30 border-primary-500 bg-gradient-to-br from-primary-50 to-accent-50" 
            : "hover:border-primary-300 hover:shadow-lg",
          className
        )}
        onClick={onClick}
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300",
            selected 
              ? "bg-gradient-to-br from-primary-500 to-accent-500 text-white" 
              : "bg-gray-100 text-gray-600"
          )}>
            <ApperIcon name={icon} size={32} />
          </div>
          
          <div>
            <h3 className={cn(
              "font-display font-semibold text-lg mb-2 transition-colors duration-300",
              selected ? "gradient-text" : "text-gray-800"
            )}>
              {title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default RecipeTypeCard;