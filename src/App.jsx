import { useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
import "./App.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { ConfigProvider, Select } from "antd";

function calculateValue(Z2, U, T) {
  if (Z2 <= 0) {
    return "";
  } else if (Z2 <= U[0]) {
    return T[0];
  } else if (Z2 <= U[1]) {
    return T[1];
  } else if (Z2 <= U[2]) {
    return T[2];
  } else if (Z2 <= U[3]) {
    return T[3];
  } else {
    return "CHECK BAR";
  }
}
function calculateValueForZ9(Z2, U, T) {
  if (Z2 <= 0) {
    return "";
  } else if (Z2 <= U[0]) {
    return T[0];
  } else if (Z2 <= U[1]) {
    return T[1];
  } else {
    return "CHECK BAR";
  }
}
function calculateValueForAA9(Z2, U, T) {
  if (Z2 <= 0) {
    return "";
  } else if (Z2 <= U[0]) {
    return T[0];
  } else if (Z2 <= U[1]) {
    return T[1];
  } else {
    return "CHECK SV";
  }
}
function calculateValueForAA3(aa2, U, T) {
  if (aa2 <= 0) {
    return "";
  } else if (aa2 <= U[0]) {
    return T[0];
  } else if (aa2 <= U[1]) {
    return T[1];
  } else if (aa2 <= U[2]) {
    return T[2];
  } else if (aa2 <= U[3]) {
    return T[3];
  } else {
    return "CHECK SV";
  }
}

function App() {
  const [accordOne, setAccordOne] = useState(true);
  const [accordTwo, setAccordTwo] = useState(false);
  const [accordThree, setAccordThree] = useState(false);
  const [accordFour, setAccordFour] = useState(false);
  const [accordResult, setAccordResult] = useState(false);

  const [fbg, setFbg] = useState(false);
  const [gbg, setgb] = useState(false);
  const [bg, setBg] = useState(true);
  const [bgt, setBgt] = useState(false);
  const [tbg, settbg] = useState(false);
  const [hbg, sethbg] = useState(false);
  const [ibg, setibg] = useState(false);

  const handleAccordOne = () => {
    setAccordOne(true);
    setAccordTwo(false);
    setAccordResult(false);
    setAccordThree(false);
    setAccordFour(false);
    setBgt(false);
    setBg(true);
    settbg(false);
    setgb(false);
    setFbg(false);
    sethbg(false);
    setibg(false);
  };

  const handleAccordTwo = () => {
    setAccordOne(false);
    setAccordTwo(true);
    setAccordResult(false);
    setAccordThree(false);
    setAccordFour(false);
    setBg(true);
    setBgt(false);
    settbg(true);
    setgb(false);
    setFbg(false);
    sethbg(false);
    setibg(false);
  };

  const handleAccordThree = () => {
    setAccordOne(false);
    setAccordTwo(false);
    setAccordResult(false);
    setAccordThree(true);
    setAccordFour(false);
    setBg(true);
    setBgt(true);
    settbg(true);
    setgb(true);
    setFbg(false);
    sethbg(false);
    setibg(false);
  };

  const handleAccordFour = () => {
    setAccordOne(false);
    setAccordTwo(false);
    setAccordResult(false);
    setAccordThree(false);
    setAccordFour(true);
    setFbg(true);
    sethbg(false);
    setibg(true);
  };

  const handleAccordResult = () => {
    setAccordOne(false);
    setAccordTwo(false);
    setAccordThree(false);
    setAccordFour(false);
    setAccordResult(true);
    sethbg(true);
  };
  // Retrieve the item from local storage
  const itemparsed = JSON.parse(localStorage.getItem("xpodata")) || {};
  // Initialize state with the retrieved value
  const [formData, setFormData] = useState(itemparsed);
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    // Store the updated value in local storage
    localStorage.setItem("xpodata", JSON.stringify(formData));
  }, [formData]);

  const systemTypeValue =
    formData?.systemType === "Heating - New"
      ? 2.63
      : formData?.systemType === "Heating - Old (>10ys)"
      ? 3.29
      : formData?.systemType === "Underfloor Heating"
      ? 4.83
      : formData?.systemType === "Chilled - New"
      ? 3.29
      : formData?.systemType === "Chilled - Old (>10yrs)"
      ? 4.39
      : formData?.systemType === "Condenser"
      ? 3.29
      : 0; // Default value

  //SVOL
  const SystemVolumeAutomaticConversion =
    systemTypeValue * formData.TotalBoilerOutputKW;
  const calcsAA14 = SystemVolumeAutomaticConversion / 86400;
  const sideStreamFlowRate = calcsAA14 > 1.1218432 ? calcsAA14 : 1.1218432;

  // Calculation of z3 & z4
  const U = [150, 150, 232, 435];

  const T = [
    "VEXO X-POT Compact",
    "VEXO X-POT 6",
    "VEXO X-POT XP",
    "VEXO X-POT XXP",
  ];

  const Z2 = formData.WorkingPressureBar;
  const z3 = calculateValue(Z2, U, T);
  const z4 =
    z3 == "VEXO X-POT Compact"
      ? 1
      : z3 == "VEXO X-POT 6"
      ? 2
      : z3 == "VEXO X-POT XP"
      ? 3
      : z3 == "VEXO X-POT XXP"
      ? 4
      : 0;

  // Calculation of AA3 & AA4
  const UForAA3 = [9130, 22824, 79885, 684734];
  const TForAA3 = [
    "VEXO X-POT Compact",
    "VEXO X-POT 6",
    "VEXO X-POT XP",
    "VEXO X-POT HFHP 10Bar",
  ];
  const aa2 = SystemVolumeAutomaticConversion;
  const aa3 = calculateValueForAA3(aa2, UForAA3, TForAA3);
  const aa4 =
    aa3 == "VEXO X-POT Compact"
      ? 1
      : aa3 == "VEXO X-POT 6"
      ? 2
      : aa3 == "VEXO X-POT XP"
      ? 3
      : aa3 == "VEXO X-POT HFHP 10Bar"
      ? 5
      : 0;
  // Calculation of AA9 & AA10
  const UForAA9 = [150, 232];
  const TForAA9 = ["VEXO X-POT 6+", "VEXO X-POT XP+"];
  const aa9 = calculateValueForAA9(aa2, UForAA9, TForAA9);
  const aa10 = aa9 == "VEXO X-POT 6+" ? 11 : aa9 == "VEXO X-POT XP+" ? 12 : 0;

  // Calculation of z9 & z10
  const UForZ9 = [22824, 79885];

  const TForZ9 = ["VEXO X-POT 6+", "VEXO X-POT XP+"];

  const z9 = calculateValueForZ9(Z2, UForZ9, TForZ9);
  const z10 = z9 == "VEXO X-POT 6+" ? 11 : z9 == "VEXO X-POT XP+" ? 12 : 0;

  const calcsZ6 = z4 > aa4 ? z3 : aa3;
  const calcsZ12 = z10 > aa10 ? z9 : aa9;

  // Using a ternary operator
  const result = formData.BMS === "NO" ? calcsZ6 : calcsZ12;

  return (
    <div className="flex rounded h-fit bg-white px-5 lg:px-9 py-6 m-1 lg:m-4  main-shadow">
      <div className="space-y-6 w-full border-l  border-solid">
        {/* System Type starts */}
        <div className="relative pb-6">
          <div
            className={`${
              bg ? "bg-emerald-900" : "bg-gray-400"
            } absolute -top-2  z-10 -ml-[20px] w-10 h-10 rounded-full bg-emerald-900  border-8  border-white flex items-center justify-center`}
          >
            <span className="text-white text-sm font-bold">
              {accordOne ? "1" : <BsCheck className="text-xl" />}
            </span>
          </div>
          {/* ======================== */}
          {/* System Type starts  */}
          <div className="ml-6">
            <h4 className="tracking-wide ">System Type</h4>
            <div
              className={`overflow-hidden h-auto max-h-0 items-center transition-all duration-500 ${
                accordOne ? "max-h-screen" : ""
              }`}
            >
              <div className="select-wrapper bg-[#EEEEEE] py-8 px-3 rounded-md my-5 ">
                <ConfigProvider
                  theme={{
                    token: {
                      // Seed Token
                      colorPrimary: "#4a887748",
                      borderRadius: 5,
                      colorBorder: "#EEEEEE",
                      colorText: "#374151",
                      // Alias Token
                      colorBgContainer: "#EEEEEE",
                    },
                  }}
                >
                  <Select
                    className="bg-transparent w-full  border border-[#EEEEEE] border-b-emerald-900 "
                    defaultValue={formData.systemType || ""}
                    options={[
                      { value: "Heating - New", label: "Heating - New" },
                      {
                        value: "Heating - Old (>10ys)",
                        label: "Heating - Old (>10ys)",
                      },
                      {
                        value: "Underfloor Heating",
                        label: "Underfloor Heating",
                      },
                      { value: "Chilled - New", label: "Chilled - New" },
                      {
                        value: "Chilled - Old (>10yrs)",
                        label: "Chilled - Old (>10yrs)",
                      },
                      { value: "Condenser", label: "Condenser" },
                    ]}
                    onChange={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        ["systemType"]: e,
                      }))
                    }
                  />
                </ConfigProvider>

                <div className="focus-line"></div>
              </div>
              {/* continue button  */}

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#0B453C",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#0f5c50",
                  },
                }}
                onClick={handleAccordTwo}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>

        {/* Working Pressure (Bar) starts*/}
        <div className="relative pb-6">
          <div
            className={`${
              tbg ? "bg-emerald-900" : "bg-gray-400"
            } absolute -top-2 z-10 -ml-[20px] w-10 h-10 rounded-full bg-emerald-900  border-8 border-white flex items-center justify-center`}
          >
            <span className="text-white text-sm">
              {bgt ? <BsCheck className="text-xl" /> : "2"}
            </span>
          </div>
          <div className={`ml-6 ${tbg ? "animate-slide-down" : ""} `}>
            <p
              className={`tracking-wide ${
                accordOne ? "text-[#00000061]" : "text-black"
              }`}
            >
              Working Pressure (PSI)
            </p>

            <div
              className={`overflow-hidden h-auto items-center transition-all duration-500 ${
                accordTwo ? "max-h-screen" : "max-h-0"
              }`}
            >
              <div className="bg-[#EEEEEE] py-8 px-3 rounded-md my-5">
                <div
                  id=""
                  className=" relative flex items-center border-b border-[#00000061] hover:border-black focus:border-3 focus:focus-line focus:border-b-2"
                >
                  <input
                    className="bg-transparent outline-none w-full p-1 pl-2 text-gray-700"
                    name="WorkingPressureBar"
                    type="number"
                    value={formData.WorkingPressureBar || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="mt-12">
                <Stack spacing={2} direction="row">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#0B453C",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#0f5c50",
                      },
                    }}
                    onClick={handleAccordThree}
                  >
                    Continue
                  </Button>
                  <Button
                    onClick={handleAccordOne}
                    variant="text"
                    style={{ color: "black" }}
                  >
                    BACK
                  </Button>
                </Stack>
              </div>
            </div>
          </div>
        </div>
        {/* Total Boiler Output (BTU) starts */}
        <div className="relative pb-6">
          <div
            className={`${
              gbg ? "bg-emerald-900" : "bg-gray-400"
            } absolute -top-2 z-10 -ml-[20px] w-10 h-10 rounded-full bg-emerald-900  border-8  border-white flex items-center justify-center`}
          >
            <span className="text-white text-sm">
              {fbg ? <BsCheck className="text-xl" /> : "3"}
            </span>
          </div>
          <div className="ml-6">
            <p
              className={`tracking-wide ${
                bgt ? "text-black" : "text-[#00000061]"
              }`}
            >
              Total Boiler Output (BTU)
            </p>
            <div
              className={`overflow-hidden h-auto items-center transition-all duration-500 ${
                accordThree ? "max-h-screen" : "max-h-0"
              }`}
            >
              <div className="bg-[#EEEEEE] py-8 px-3 rounded-md my-5 text-gray-700">
                <div
                  id=""
                  className=" relative flex items-center border-b border-[#00000061] hover:border-black focus:border-3 focus:focus-line focus:border-b-2"
                >
                  <input
                    className="bg-transparent outline-none w-full p-1 pl-2"
                    name="TotalBoilerOutputKW"
                    type="number"
                    value={formData.TotalBoilerOutputKW || ""}
                    onChange={handleInputChange}
                  />

                  <span>BTU</span>
                </div>
              </div>

              <div className="mt-12">
                <Stack spacing={2} direction="row">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#0B453C",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#0f5c50",
                      },
                    }}
                    onClick={handleAccordFour}
                  >
                    Continue
                  </Button>
                  <Button
                    onClick={handleAccordTwo}
                    variant="text"
                    style={{ color: "black" }}
                  >
                    BACK
                  </Button>
                </Stack>
              </div>
            </div>
          </div>
        </div>
        {/* BMS & Pump Required (+ unit) starts */}
        <div className="relative pb-6">
          <div
            className={`${
              ibg ? "bg-emerald-900" : "bg-gray-400"
            } absolute -top-2 z-10 -ml-[20px] w-10 h-10 rounded-full bg-emerald-900  border-8  border-white flex items-center justify-center`}
          >
            <span className="text-white text-sm">
              {hbg ? <BsCheck className="text-xl" /> : "4"}
            </span>
          </div>
          <div className="ml-6">
            <p
              className={`tracking-wide ${
                fbg ? "text-black" : "text-[#00000061]"
              }`}
            >
              BMS & Pump Required (+ unit)
            </p>
            <div
              className={`overflow-hidden h-auto items-center transition-all duration-500 ${
                accordFour ? "max-h-screen" : "max-h-0"
              }`}
            >
              <div className="select-wrapper bg-[#EEEEEE] py-8 px-3 rounded-md my-5 text-gray-700">
                <ConfigProvider
                  theme={{
                    token: {
                      // Seed Token
                      colorPrimary: "#4a887748",
                      borderRadius: 5,
                      colorBorder: "#EEEEEE",
                      colorText: "#374151",
                      // Alias Token
                      colorBgContainer: "#EEEEEE",
                    },
                  }}
                >
                  <Select
                    className="bg-transparent w-full  border border-[#EEEEEE] border-b-emerald-900 "
                    defaultValue={formData.BMS || ""}
                    options={[
                      { value: "YES", label: "YES" },

                      { value: "NO", label: "NO" },
                    ]}
                    onChange={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        ["BMS"]: e,
                      }))
                    }
                  />
                </ConfigProvider>

                <div className="focus-line"></div>
              </div>

              <div className="mt-12">
                <Stack spacing={2} direction="row">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#0B453C",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#0f5c50",
                      },
                    }}
                    onClick={handleAccordResult}
                  >
                    CONTINUE
                  </Button>
                  <Button
                    onClick={handleAccordThree}
                    variant="text"
                    style={{ color: "black" }}
                  >
                    BACK
                  </Button>
                </Stack>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="relative ">
          <div
            className={`${
              accordResult ? "bg-emerald-900" : "bg-gray-400"
            } absolute -top-2 z-10 -ml-[20px] w-10 h-10 rounded-full bg-emerald-900  border-8  border-white flex items-center justify-center`}
          >
            <span className="text-white text-sm">5</span>
          </div>
          <div className="ml-6">
            <p
              className={`tracking-wide ${
                hbg ? "text-black" : "text-[#00000061]"
              }`}
            >
              Results
            </p>
            <div
              className={`overflow-hidden h-fit items-center transition-all duration-500 ${
                accordResult ? "min-h-screen" : "max-h-0"
              }`}
            >
              {/* table   */}
              <div className="bg-[#EEEEEE] rounded p-1 my-5">
                <p className="text-[20px] p-4 text-gray-700">
                  System requirements
                </p>
                <div className="bg-white text-sm text-gray-700  rounded-md">
                  <div className="flex items-center border-b p-3 hover:bg-[#EEEEEE]">
                    <div className="w-1/2">Type</div>
                    <div>{formData?.systemType}</div>
                  </div>
                  <div className="flex items-center border-b p-3 hover:bg-[#EEEEEE]">
                    <div className="w-1/2">Working Pressure (PSI)</div>
                    <div>{formData?.WorkingPressureBar}</div>
                  </div>
                  <div className="flex items-center border-b p-3 hover:bg-[#EEEEEE]">
                    <div className="w-1/2">Total Boiler Output (BTU)</div>
                    <div>{formData?.TotalBoilerOutputKW}</div>
                  </div>
                  <div className="flex items-center border-b p-3 hover:bg-[#EEEEEE]">
                    <div className="w-1/2">
                    System Volume (GAL) (Automatic Conversion)
                    </div>
                    <div>{SystemVolumeAutomaticConversion}</div>
                  </div>
                  <div className="flex items-center border-b p-3 hover:bg-[#EEEEEE]">
                    <div className="w-1/2">Side Stream Flow Rate (*Min flow rate is 1.1218432 gal/m)</div>
                    <div>{sideStreamFlowRate.toFixed(3)} gal/m</div>
                  </div>
                  <div className="flex items-center border-b p-3 hover:bg-[#EEEEEE]">
                    <div className="w-1/2">BMS & Pump Required (+ unit)</div>
                    <div>{formData.BMS}</div>
                  </div>
                  <div className="flex items-center border-b p-3 hover:bg-[#EEEEEE]">
                    <div className="w-1/2">Suggested Product</div>
                    <div>{result}</div>
                  </div>
                </div>
              </div>

              {/* table  */}

              <Stack spacing={2} direction="row">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#0B453C",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#0f5c50",
                    },
                  }}
                  onClick={handleAccordOne}
                >
                  start again
                </Button>
                <Button
                  onClick={handleAccordFour}
                  variant="text"
                  style={{ color: "black" }}
                >
                  BACK
                </Button>
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
