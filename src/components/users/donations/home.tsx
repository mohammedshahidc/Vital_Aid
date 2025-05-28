"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDonation } from "@/lib/Query/hooks/useDonation";
import toast from "react-hot-toast";

interface CollectedFunds {
  equipment: number;
  general: number;
  goal: number;
}

const DonationHome: React.FC = () => {
  const router = useRouter();
  
const { data: Collection, } = useDonation();

console.log(Collection, "Fetched donation data");


  const [collectedFunds, setCollectedFunds] = useState<CollectedFunds>({
    equipment: 0,
    general: 0,
    goal: 50000, 
  });

  useEffect(() => {
    if (Collection && Collection.totalDonations) {
      setCollectedFunds((prev) => ({
        ...prev,
        equipment: Collection.totalDonations.equipment || 0,
        general: Collection.totalDonations.general || 0,
      }));
    }
  }, [Collection]);

  const [equipmentDonationAmount, setEquipmentDonationAmount] = useState<number | string>("");
  const [generalDonationAmount, setGeneralDonationAmount] = useState<number | string>("");

  const handleDonate = (type: string, amount: string | number) => {
    if (amount && Number(amount) > 0) {
      router.push(`/user/donation?type=${type}&amount=${amount}`);
    } else {
      toast.error("Please enter a valid donation amount.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Support Our Cause</h1>

      

      <div className="bg-white border border-gray-300 rounded-lg flex flex-col md:flex-row w-11/12 max-w-5xl mb-8 p-6">
        <div className="md:w-1/2">
          <Image
            src="/general-donation.jpg"
            alt="General Donation"
            width={500}
            height={300}
            className="object-cover rounded-lg"
          />
        </div>

        <div className="md:w-1/2 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Support Our Organization</h2>
          <p className="text-gray-600 mb-3">
            Your generous donations enable us to run various programs, support
            communities in need, and sustain our efforts. Every rupee
            contributes to a better future.
          </p>

          <p className="text-lg font-semibold text-green-600 mb-3">
            Collected Funds: ₹{collectedFunds.general} / ₹{collectedFunds.goal}
          </p>

          <div className="flex items-center">
            <span className="text-md font-semibold text-gray-500 mr-2 mb-4">₹</span>
            <input
              type="text"
              placeholder="amount"
              value={generalDonationAmount || ""}
              onChange={(e) => setGeneralDonationAmount(e.target.value)}
              className="border border-gray-300 px-4 py-2 w-1/5 mb-4"
            />
            <button
              className="bg-orange-500 border border-gray-100 text-white px-4 py-2 mb-4 hover:bg-orange-600 transition"
              onClick={() => handleDonate("general", generalDonationAmount)}
            >
              Donate
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded-lg flex flex-col md:flex-row w-11/12 max-w-5xl mb-8 p-6">
        <div className="md:w-1/2">
          <Image
            src="/donations.equipment.jpg"
            alt="Equipment Donation"
            width={350}
            height={150}
            className="object-cover rounded-lg"
          />
        </div>

        <div className="md:w-1/2 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Donate for Equipment</h2>
          <p className="text-gray-600 mb-3">
            Your donation helps us purchase essential medical and emergency
            equipment, ensuring we can provide critical aid to those in need.
            Every contribution makes a difference!
          </p>

          <p className="text-lg font-semibold text-green-600 mb-3">
            Collected Funds: ₹{collectedFunds.equipment} / ₹{collectedFunds.goal}
          </p>

          <div className="flex items-center mb-3">
            <span className="text-md font-semibold text-gray-500 mr-2 mb-4">₹</span>
            <input
              type="text"
              placeholder="amount"
              value={equipmentDonationAmount || ""}
              onChange={(e) => setEquipmentDonationAmount(e.target.value)}
              className="border border-gray-300 px-4 py-2 w-1/5 mb-4"
            />
            <button
              className="bg-orange-500 text-white border border-gray-100 px-4 py-2 mb-4 hover:bg-orange-600 transition"
              onClick={() => handleDonate("equipment", equipmentDonationAmount)}
            >
              Donate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationHome;
