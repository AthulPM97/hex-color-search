import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import { batchOperation } from "./util/batchOps";
import { hexToRgb, rgbToHsl } from "./util/hexConverters";
import sortByColorSimilarity from "./util/colorSearch";
import UnfilteredTable from "./components/UnfilteredTable";
import FilteredTable from "./components/FilteredTable";

const url =
  "https://raw.githubusercontent.com/NishantChandla/color-test-resources/main/xkcd-colors.json";

function App() {
  const [colors, setColors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [filteredColors, setFilteredColors] = useState([]);

  const searchRef = useRef(null);

  useEffect(() => {
    // Fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        if (response && response.data.colors) {
          return response.data.colors;
        } else {
          console.error("No response");
          return [];
        }
      } catch (err) {
        console.log(err);
        return [];
      }
    };

    fetchData().then((fetchedColors) => {
      // Process fetched data
      batchOperation(fetchedColors, 100, (batch) => {
        batch.forEach((color) => {
          const rgb = hexToRgb(color.hex);
          const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
          color.rgb = rgb;
          color.hsl = hsl;
        });
      });

      // Update state with processed data
      setColors(fetchedColors);
      setIsLoading(false);
    });
  }, []);

  // search submit handler
  const submitHandler = (e) => {
    if (e.key == "Enter") {
      const input = searchRef.current.value.trim();
      // if empty input reset list to show all colors
      if (input == "") {
        setSelectedColor(null);
        return;
      }

      // Regular expressions for hex and rgb formats
      const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
      const rgbRegex = /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/;

      // Check if input matches hex format
      const hexMatch = input.match(hexRegex);
      if (hexMatch) {
        const rgb = hexToRgb(input); // Convert hex to RGB
        const sortedColorsArray = sortByColorSimilarity(rgb, [...colors]);
        setFilteredColors(sortedColorsArray);
        setSelectedColor(input);
        return;
      }

      // Check if input matches rgb format
      const rgbMatch = input.match(rgbRegex);
      if (rgbMatch) {
        const rgb = {
          r: parseInt(rgbMatch[1]),
          g: parseInt(rgbMatch[2]),
          b: parseInt(rgbMatch[3]),
        };
        const sortedColorsArray = sortByColorSimilarity(rgb, [...colors]);
        setFilteredColors(sortedColorsArray);
        setSelectedColor(input);
        return;
      }

      // If input does not match any valid format
      alert("Invalid input format");
    }
  };

  return (
    <div className="root-container">
      <h1>Colour Searcher</h1>
      <div className="input-container">
        <span>Colour</span>
        <input
          type="text"
          placeholder="Enter Colour"
          ref={searchRef}
          onKeyDown={submitHandler}
          disabled={isLoading}
        />
      </div>
      {!isLoading && (
        <div className="table-container">
          {!selectedColor && <span>All colours</span>}
          {!selectedColor && <UnfilteredTable colors={colors} />}
          {selectedColor && <span>Results for {searchRef.current.value}</span>}
          {selectedColor && <FilteredTable filteredColors={filteredColors} />}
        </div>
      )}
      {isLoading && <div>Loading...</div>}
    </div>
  );
}

export default App;
