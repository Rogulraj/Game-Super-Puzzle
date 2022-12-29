import "./index.css";

const GameResult = (props) => {
  const { num, solvedList } = props;

  const range = [...Array(num - 1 - 0 + 1).keys()];

  return (
    <div>
      <table className="user-input-table">
        <tbody>
          {range.map((row) => (
            <tr key={`row-${row}`}>
              {range.map((cell) => (
                <td key={`cell ${cell}`} className="user-table-cell">
                  {solvedList[row][cell]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameResult;
