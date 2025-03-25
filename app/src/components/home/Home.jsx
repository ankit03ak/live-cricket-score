import Card from "../card/Card.jsx";
import "./home.css";
import { useEffect, useState } from "react";
import axios from "axios";


function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); 
        const matchdata = await axios.get(
          `https://api.cricapi.com/v1/cricScore?apikey=d02df674-7f65-406a-bb56-f74ae74d7571`
        );
        setItems(matchdata.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);


  const liveMatches = items.filter((item) => item.ms === "live");
  

  if (loading) {
    return (
        <div className="loading">
        <div className="spinner"></div>
      </div>
      
    );
  }

  return (
    <>
      <div>
      </div>
      <div className="card">
        <div className="liveMatches">
          {liveMatches.length > 0 && (
            <>
              <div>
                <h3 className="matchHeading">
                  <span> 🔴 Live Cricket Matches</span>
                </h3>
              </div>
              <div className="mapComponent">
                {liveMatches.map((item) => (
                  <Card key={item.id} item={item} />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="all-Matches">
          <h3 className="matchHeading">
            <span> All Matches</span>
          </h3>
          <div className="mapComponent">
            {items.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

