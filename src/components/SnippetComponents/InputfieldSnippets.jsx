import Card from "../Card";
import { inputFieldSnippets } from "./Snippets/InputFields";

const InputFieldSnippets = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {inputFieldSnippets.map((snippet, index) => (
        <Card key={index} snippet={snippet} />
      ))}
    </div>
  );
};

export default InputFieldSnippets;
