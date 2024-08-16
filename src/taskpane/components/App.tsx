import * as React from "react";
import "./App.scss";
import Dashboard from "./Dashboard";
import { useUser } from "../../contexts/UserContext";
import AuthenticaitonForm from "./AuthenticationForm/AuthenticaitonForm";

interface Props {
  title: string;
}

const App: React.FC<Props> = (props: Props) => {
  const { user } = useUser();
  if (user === undefined) return <AuthenticaitonForm />;
  return <Dashboard title={props.title} user={user} />;
};

export default App;
