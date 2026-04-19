import { IconData } from "@lineiconshq/free-icons";
import Lineicons from "@lineiconshq/react-lineicons";

export const Icon = ({
  color,
  icon,
  size,
}: {
  color: string;
  icon: IconData;
  size: number;
}) => {
  return <Lineicons color={color} icon={icon} size={size} />;
};
