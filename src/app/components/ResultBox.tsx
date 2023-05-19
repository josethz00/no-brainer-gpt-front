interface ResultBoxProps {
    results: string[];
}

function ResultBox({ results }: ResultBoxProps): JSX.Element {
    return (
        <div className="mt-5 w-full">
            <ul className="space-y-4">
                {results.map((result, index) => (
                    <li key={index} className="p-4 border border-gray-200 rounded-md shadow-sm">
                        {result}
                    </li>
                ))}
            </ul>
        </div>
    );
  }
  
  export default ResultBox;
  