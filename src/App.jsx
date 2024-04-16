import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { batchOperation } from "./util/batchOps";
import { hexToRgb, rgbToHsl } from "./util/hexConverters";

const url =
  "https://raw.githubusercontent.com/NishantChandla/color-test-resources/main/xkcd-colors.json";

function App() {
  const [colors, setColors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="root-container">
      <h1>Colour Searcher</h1>
      <div className="input-container">
        <span>Colour</span>
        <input type="text" placeholder="Enter Colour" />
      </div>
      {!isLoading && (
        <div className="table-container">
          <span>All colours</span>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Hex</th>
                <th>RGB</th>
                <th>HSL</th>
              </tr>
            </thead>
            <tbody>
              {colors.map((color, idx) => {
                return (
                  <tr key={idx}>
                    <td style={{ width: "5%", background: color.hex }}></td>
                    <td style={{ width: "25%" }}>{color.color}</td>
                    <td style={{ width: "15%" }}>{color.hex}</td>
                    <td style={{ width: "15%" }}>
                      {Object.values(color.rgb).join(",")}
                    </td>
                    <td style={{ width: "15%" }}>
                      {Object.values(color.hsl).join(",")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {isLoading && <div>Loading...</div>}
    </div>
  );
}

export default App;
