const FilteredTable = (props) => {
  const { filteredColors } = props;
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Hex</th>
          <th>RGB</th>
          <th>HSL</th>
        </tr>
      </thead>
      <tbody>
        {filteredColors.map((color, idx) => {
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
  );
};

export default FilteredTable;
