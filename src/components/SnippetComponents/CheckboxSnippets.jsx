import Card from "../Card";
import { checkBoxSnippets } from "./Snippets/CheckBoxes";

const CheckboxSnippets = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {checkBoxSnippets.map((snippet, index) => (
        <Card key={index} snippet={snippet} />
      ))}
    </div>
  );
};

export default CheckboxSnippets;
