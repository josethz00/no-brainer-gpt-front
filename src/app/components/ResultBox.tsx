interface ResultBoxProps {
    results: string[];
}

function ResultBox({ results }: ResultBoxProps): JSX.Element {
    return (
      <div className="bg-white rounded-lg p-4">
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              {result}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default ResultBox;
  