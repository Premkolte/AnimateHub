import Card from "../Card";
import { toggleSwitchSnippets } from "./Snippets/ToggleSwitch";

function ToggleSwitchSnippets(){
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {toggleSwitchSnippets.map((snippet, index) => (
          <Card key={index} snippet={snippet} />
        ))}
      </div>
  )
}
export default ToggleSwitchSnippets;