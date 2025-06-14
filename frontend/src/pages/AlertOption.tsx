import { useNavigate } from "react-router-dom";
import {
  SpeakerWaveIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

const AlertOptions = () => {
  const navigate = useNavigate();

  const alertOptions = [
    {
      title: "Alert Screen",
      description: "Live view of emergency alerts.",
      icon: <SpeakerWaveIcon className="h-10 w-10 text-red-600" />,
      onClick: () => navigate("/alertScreen"),
    },
    {
      title: "Alert Operator",
      description: "Manage and add alerts.",
      icon: <WrenchScrewdriverIcon className="h-10 w-10 text-orange-600" />,
      onClick: () => navigate("/alertOperator"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">Emergency Alert Interface</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {alertOptions.map((item, idx) => (
          <div
            key={idx}
            onClick={item.onClick}
            className="cursor-pointer bg-white rounded-lg shadow-md p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex flex-col items-center text-center"
          >
            {item.icon}
            <h2 className="text-xl font-semibold mt-3 mb-2">{item.title}</h2>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertOptions;
