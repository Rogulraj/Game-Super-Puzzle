import "./index.css";

const UserInputTable = (props) => {
  const { num, userPuzzleList } = props;

  const range = [...Array(num - 1 - 0 + 1).keys()];

  return (
    <div>
      <hr />
      <h1>Table</h1>
      <table className="user-input-table">
        <tbody>
          {range.map((row) => (
            <tr key={`row-${row}`}>
              {range.map((cell) => (
                <td key={`cell ${cell}`} className="user-table-cell">
                  {userPuzzleList[row][cell]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserInputTable;
