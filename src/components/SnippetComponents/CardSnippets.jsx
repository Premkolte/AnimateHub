import Card from "../Card";
import { cardSnippets } from "./Snippets/Cards";

function CardSnippets() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cardSnippets.map((snippet, index) => (
        <Card key={index} snippet={snippet} />
      ))}
    </div>
  );
}

export default CardSnippets;
