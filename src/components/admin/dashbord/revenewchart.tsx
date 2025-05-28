import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box } from "@mui/material";
import { useDonation } from "@/lib/Query/hooks/useDonation";

const MUIDonationChart = () => {
  const [generalAmount, setGeneralAmount] = React.useState(0);
  const [equipmentAmount, setEquipmentAmount] = React.useState(0);

  const { data: donation } = useDonation();
  
  React.useEffect(() => {
    if (donation?.totalDonations) {
      setGeneralAmount(donation.totalDonations.general || 0);
      setEquipmentAmount(donation.totalDonations.equipment || 0);
    }
  }, [donation]);

  const data = [
    {
      id: 0,
      value: generalAmount,
      label: "General Donations",
      color: "#ffccb3",
    },
    {
      id: 1,
      value: equipmentAmount,
      label: "Equipment Donations",
      color: "#ffcce0",
    },
  ];

  const formatCurrency = (value: number): string => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <Box className="h-full w-full mt-10">
      <PieChart
        series={[
          {
            data,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            valueFormatter: ({ value }) => formatCurrency(value),
          },
        ]}
        height={300}
        margin={{ top: 10, bottom: 30, left: 0, right: 0 }}
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "bottom", horizontal: "middle" },
            padding: 0,
            itemMarkWidth: 10,
            itemMarkHeight: 10,
            markGap: 5,
            itemGap: 10,
          },
        }}
      />
    </Box>
  );
};

export default MUIDonationChart;
