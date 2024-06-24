import Card from "../Card";
import { dropDownSnippets } from "./Snippets/DropDowns";

const DropdownSnippets = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {dropDownSnippets.map((snippet, index) => (
        <Card key={index} snippet={snippet} />
      ))}
    </div>
  );
};

export default DropdownSnippets;
