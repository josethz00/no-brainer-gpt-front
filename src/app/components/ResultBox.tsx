interface ResultBoxProps {
    results: string[];
}

function ResultBox({ results }: ResultBoxProps): JSX.Element {
    return (
        <div className="max-w-xl w-full m-auto mt-10">
            {results.map((result, index) => (
                <div key={index} className="mb-3 border border-white/10 rounded-md bg-white/5 p-4 h-96 text-gray-500">
                    {result}
                </div>
            ))}
        </div>
    );
  }
  
export default ResultBox;
  