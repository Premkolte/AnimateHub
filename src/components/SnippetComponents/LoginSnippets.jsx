import Card from "../Card";
import { loginSnippets } from "./Snippets/Login";

const LoginSnippets = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {loginSnippets.map((snippet, index) => (
        <Card key={index} snippet={snippet} />
      ))}
    </div>
  );
};

export default LoginSnippets;
