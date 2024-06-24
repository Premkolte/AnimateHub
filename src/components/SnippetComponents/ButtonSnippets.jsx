import { buttonSnippets } from "./Snippets/Buttons";
import Card from "../Card";

function ButtonSnippets() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {buttonSnippets.map((snippet, index) => (
        <Card key={index} snippet={snippet} />
      ))}
    </div>
  );
}

export default ButtonSnippets;
