// import Card from "./components/card/Card";
// import Navbar from "./components/navbar/Navbar";
// import "./app.css";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import dummyData from "./dummyData.js";

// function App() {
//   const [items, setItems] = useState([]);




//   /////// MAINTAIN SINGLE PAGE FIRST

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const matchdata = await axios.get("https://api.cricapi.com/v1/cricScore?apikey=d02df674-7f65-406a-bb56-f74ae74d7571");
//         setItems(matchdata.data.data); // assuming matchdata.data contains the data you need
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError('Failed to fetch match data. Please try again later.');
//       }
//     };

//     fetchData();
//   }, []);

//   // useEffect(() => {
//   //   setItems(dummyData.data);
//   // }, []);

//   // console.log(items);

//   const liveMatches = items.filter((item) => item.ms === "live");


//   return (
//     <>
//       <div>
//         {" "}
//         <Navbar />
//       </div>
//       <div className="card">
//         <div className="liveMatches">
//           {liveMatches.length > 0 && (
//             <>
//             <div>
//               <h3 className="matchHeading">
//                 <span> 🔴 Live Cricket Matches</span>
//               </h3>
//             </div>
//             <div className="mapComponent"> 

//               {liveMatches.map((item) => (
//                 <Card key={item.id} item={item} />
//               ))}
//             </div>
//             </>
//           )}
//         </div>

//         <div className="all-Matches">
//           <div>

//           <h3 className="matchHeading">
//             <span> All Matches</span>
//           </h3>
//           </div>
//           <div className="mapComponent">

//           {items.map((item) => (
//               <Card key={item.id} item={item} />
            
//           ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;


import Card from "./components/card/Card";
import Navbar from "./components/navbar/Navbar";
import "./app.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
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
        <Navbar />
        <h2>Fetching the latest matches... Please wait 🏏</h2>
      </div>
    );
  }

  return (
    <>
      <div>
        <Navbar />
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

export default App;

