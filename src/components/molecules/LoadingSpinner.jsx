import ApperIcon from "@/components/ApperIcon";

const LoadingSpinner = ({ size = 24, className = "" }) => {
  return (
    <div className="flex items-center justify-center">
      <ApperIcon 
        name="Loader2" 
        size={size} 
        className={`animate-spin text-primary-500 ${className}`}
      />
    </div>
  );
};

export default LoadingSpinner;