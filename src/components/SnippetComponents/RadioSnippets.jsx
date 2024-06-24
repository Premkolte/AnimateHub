import Card from "../Card";
import { radioSnippets } from "./Snippets/Radios";

const RadioButtonSnippets = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {radioSnippets.map((snippet, index) => (
        <Card key={index} snippet={snippet} />
      ))}
    </div>
  );
};

export default RadioButtonSnippets;
