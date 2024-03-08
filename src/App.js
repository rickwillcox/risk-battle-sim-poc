import React, { useState } from "react";
import { Slider } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { Chart } from "./chart";
import { data } from "./data";
function App() {
  const [attackers, setAttackers] = useState(1);
  const [defenders, setDefenders] = useState(1);

  const handleAttackersChange = (event, newValue) => {
    setAttackers(newValue);
  };

  const handleDefendersChange = (event, newValue) => {
    setDefenders(newValue);
  };

  return (
    <div>
      <Box sx={{ width: "50%", mx: "auto" }}>
        {" "}
        {/* Controls the max width and centers the content */}
        <Typography gutterBottom align="center">
          Attackers
        </Typography>
        <Typography gutterBottom align="center">
          {attackers}
        </Typography>
        <Slider
          defaultValue={1}
          aria-label="Attackers"
          valueLabelDisplay="auto" // Always displays the value label
          step={1}
          marks
          min={1}
          max={50}
          onChange={handleAttackersChange}
        />
        <Typography gutterBottom align="center" mt={4}>
          {" "}
          {/* Adds margin top for spacing */}
          Defenders
        </Typography>
        <Typography gutterBottom align="center">
          {defenders}
        </Typography>
        <Slider
          defaultValue={1}
          aria-label="Defenders"
          valueLabelDisplay="auto" // Always displays the value label
          step={1}
          marks
          min={1}
          max={40}
          onChange={handleDefendersChange}
        />
      </Box>
      <Chart attackers={attackers} defenders={defenders} data={data} />
    </div>
  );
}

export default App;
