import Card from "../Card";
import { signupSnippets } from "./Snippets/SignUp";

const SignupSnippets = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {signupSnippets.map((snippet, index) => (
        <Card key={index} snippet={snippet} />
      ))}
    </div>
  );
};

export default SignupSnippets;
