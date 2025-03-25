import React from 'react'
import "./card.css"
import { useNavigate } from 'react-router-dom'

const Card =({item}) => {

    const navigate = useNavigate();

    // console.log(item);

    const handleCardClick = () => {
        // navigate(`/single`, { state: { item } });
        navigate(`/single/${item.id}`, { state: { item } });

    };



  return (
    <>


        <div className="card-body" onClick={handleCardClick}>
        <h3 className="card-title">{item.series}</h3>
            <div className="data1">
                <h4 className="matchType">{item.matchType?.toUpperCase()}</h4>
                <h4 className="date">
                        {item.dateTimeGMT.split('T')[0]} <br />
                        {/* {item.dateTimeGMT.split('T')[1]} */}
                </h4>
                <h4 className="mstatus">
                        {item.ms === 'live' ? (
                            <span>🔴 Live</span>
                        ) : item.ms === 'result' ? (
                            <span>✅ Result</span>
                        ) : (
                         '🔵'+ item.ms?.toUpperCase()
                        )}
                </h4>

            </div>
            <div className="data3">
                <div className="t1">
                    <div className="flag-t1">
                        <img className='flagImg' src={item.t1img} alt="" /> <b>{item.t1}</b>
                    </div>
                    <div className="t1score"> {item.t1s} </div>
                </div>
                <div className="t2">
                    <div className="flag-t2">
                    <img className='flagImg' src={item.t2img} alt="" /> <b> {item.t2} </b>

                    </div>
                    <div className="t2score"> {item.t2s} </div>
                </div>
            </div>
            <div className="data4">
                <div className="status"> <span className='statusSpan'> <u>Status</u> </span> : <b><i>{item.status}</i> </b></div>
            </div>
        </div>
    </>
  )
}

export default Card;
