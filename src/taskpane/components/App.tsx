import * as React from "react";
import "./App.scss";
import Sandbox from "./Tabs/Sandbox";
import { Tab, TabList } from "./common/TabList";
import { APP_NS } from ".";
import Assumptions from "./Tabs/Assumptions/Assumptions";

interface Props {
  title: string;
}

const App: React.FC<Props> = (props: Props) => {
  const [currentTab, setCurrentTab] = React.useState(0);
  const app = APP_NS.app;
  const tabs = [
    {
      name: "Assumptions",
      component: <Assumptions />,
    },
    {
      name: "Sandbox",
      component: <Sandbox title={props.title} />,
    },
  ];
  return (
    <main className={app.$}>
      {tabs[currentTab].component}
      <section className={APP_NS.tabsContainer.$}>
        <TabList
          defaultSelectedValue={tabs[currentTab].name}
          onTabSelect={(_, data) => setCurrentTab(tabs.findIndex((tab) => tab.name === data.value))}
        >
          {tabs.map((tab) => (
            <Tab key={tab.name} value={tab.name}>
              {tab.name}
            </Tab>
          ))}
        </TabList>
      </section>
    </main>
  );
};

export default App;
