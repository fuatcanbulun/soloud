import React, { useEffect, useState } from "react";
import PageLayout from "../../components/templates/pageLayout";

import MediaBox from "../../components/organisms/mediaBox";
import Tabs from "../../components/organisms/tabs";
import Grid from "../../components/atoms/grid";
import { useStore } from "../../contexts/StoreContext";

const tabsData = [
  {
    id: "pop",
    label: "Pop",
  },
  {
    id: "hiphop",
    label: "HipHop",
  },
  {
    id: "rock",
    label: "Rock",
  },
  {
    id: "latin",
    label: "Latin",
  },
  {
    id: "dance",
    label: "Dance",
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(tabsData[0].id);
  const [mediaData, setMediaData] = useState([]);
  const store = useStore();

  useEffect(() => {
    getAllMedia();
  }, []);

  function getAllMedia() {
    fetch(`../../mediaData.json`)
      .then((response) => response.json())
      .then((data) => {
        setMediaData(data);
      });
  }

  return (
    <PageLayout>
      {/* <Button size="xs" icon="AiOutlinePieChart" />
      <Button label="Click" size="sm" />
      <Button label="Click" size="md" icon="AiOutlinePieChart" />
      <Button label="Click" size="lg" icon="AiOutlinePieChart" />
     */}
      <Grid display="block" padding="10px 20px 0 20px">
        <Tabs
          data={tabsData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </Grid>
      <Grid direction="row" padding="20px" wrap spaceBetween>
        {mediaData
          .filter((item) => item.type === activeTab)
          .map((item) => (
            <MediaBox
              data={item}
              id={item.id}
              favorite={store.favorites.includes(item.id)}
              song={item.song}
              artist={item.artist}
            />
          ))}
      </Grid>
    </PageLayout>
  );
};

export default Dashboard;