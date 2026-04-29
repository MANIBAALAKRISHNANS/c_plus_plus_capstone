import { createContext, useState } from "react";

export const AppData = createContext();

function AppDataProvider({ children }) {
  const [printers, setPrinters] = useState([
    {
      name: "HP A4 Printer",
      ip: "192.168.0.21",
      category: "A4",
      status: "Live",
    },
    {
      name: "Zebra Barcode",
      ip: "192.168.0.25",
      category: "Barcode",
      status: "Live",
    },
  ]);

  const [locations, setLocations] = useState([
    "Dental Clinic",
    "Reception",
    "Laboratory",
  ]);

  const [categories, setCategories] = useState([
    "A4",
    "Barcode",
  ]);

  return (
    <AppData.Provider
      value={{
        printers,
        setPrinters,
        locations,
        setLocations,
        categories,
        setCategories,
      }}
    >
      {children}
    </AppData.Provider>
  );
}

export default AppDataProvider;