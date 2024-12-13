import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Dropdown} from "react-bootstrap";

const Ndeshjet = () => {
  const [matches, setMatches] = useState([]);
  const [ceiling, setCeiling] = useState(15);
  const [competition, setCompetition] = useState("");
  
  const [place, setPlace] = useState("");
  useEffect(() => {
    axios
    .get("http://localhost:5000/getAllMatches")
    .then((response) => {
      setMatches(response.data);
    })
    .catch((error) => {
      console.log(`Something went wrong: ${error}`);
    });
}, []);

const handleAll = () =>{
  setCompetition("");
  setPlace("");
};
const filteredMatches = matches.filter((match) => {
  if(place === 'Shtepi'){
    let isHome = match.hometeam === "Partizani"
  if (competition === "Abissnet Superiore")
    return match.competition === "Abissnet Superiore" && isHome;
  if (competition === "Kupa e Shqiperise")
    return match.type === "Kupa e Shqiperise" && isHome;
  if (competition === "Miqesore") 
    return match.type === "Miqesore" && isHome;
    
  return isHome}

  if(place === "Transferte"){
    let isAway = match.awayteam === "Partizani"
  if (competition === "Abissnet Superiore")
    return match.competition === "Abissnet Superiore" && isAway;
  if (competition === "Kupa e Shqiperise")
    return match.type === "Kupa e Shqiperise" && isAway;
  if (competition === "Miqesore") 
    return match.type === "Miqesore" && isAway;
    
  return isAway}


  if (competition === "Abissnet Superiore")
    return match.competition === "Abissnet Superiore";
  if (competition === "Kupa e Shqiperise")
    return match.type === "Kupa e Shqiperise";
  if (competition === "Miqesore") 
    return match.type === "Miqesore";

  return true;


});

  return (
    <Container className="my-4">

<div className="section-header">
  Ndeshjet
</div>
{matches.length === 0 ? (
  <p>Po ngarkohen ndeshjet...</p>
) : (
  <Container>
     <div style={{ marginBottom: "20px" }}>
       
      </div>
    {filteredMatches.slice(0,ceiling).map((match, index) => {
      const getResultColor = () => {
        if ((match.hometeam==="Partizani" && match.homegoals > match.awaygoals)
        || (match.awayteam==="Partizani" && match.homegoals < match.awaygoals)) return "#8bd645";
        if (match.homegoals === match.awaygoals) return "#ebe66c";
        return "#db594d";
      };

      const resultColor = getResultColor();

      return (
        <div className="match-box"  key={index}>
          <span className="color-span" style={{backgroundColor:resultColor}}></span>
            
            
            
            <span style={{ textAlign:'center', fontSize: '0.8rem', marginBottom:'4px', zIndex:1 }}>{match.competition}</span>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize:'1.1rem', alignItems: 'center', zIndex:1 }}>
            <div style={{ flex: 1, textAlign: 'right', paddingRight: '10px' }}>
              <span>{match.hometeam}</span>
            </div>
            <div style={{ flex: 0.3, textAlign: 'center', zIndex:1}}>
              <span>{match.homegoals} - {match.awaygoals}</span>
            </div>
            <div style={{ flex: 1, textAlign: 'left', paddingLeft: '10px', zIndex:1}}>
              <span>{match.awayteam}</span>
            </div>
          </div>
          <div style={{ marginTop: '5px', fontSize: '0.7rem' , zIndex:1}}>
            <span>{new Date(match.date).toLocaleDateString()}</span>
          </div>
        </div>
      );

      
    })}
    <div style={{display:'flex', justifyContent:'space-around', height: (filteredMatches.length===0) ? '200px' : 'auto'}}>
    <Dropdown>
          <Dropdown.Toggle variant="danger" style={{marginTop:'4px'}} id="dropdown-basic">
            Filtro sipas: {(competition || place) ? 
    `${competition ? competition.charAt(0).toUpperCase() + competition.slice(1) : ''}${competition && place ? ' - ' : ''}${place ? place.charAt(0).toUpperCase() + place.slice(1) : ''}` 
    : 'Te gjitha'}
          </Dropdown.Toggle>


          <Dropdown.Menu style={{backgroundColor:'#dddddd'}}>
            
            <Dropdown.Item style={{color:'#333333', textAlign:'left'}} onClick={handleAll}>
              Te gjitha
            </Dropdown.Item>
          <Dropdown>
          <Dropdown.Toggle as='div' style={{ textAlign: 'center', padding: '8px', cursor: 'pointer', backgroundColor: '#dddddd', color: '#333333' }} className="nested-dropdown-toggle">
            Kompeticionit
          </Dropdown.Toggle>
          <Dropdown.Menu style={{backgroundColor:'#bbbbbb'}}>
            <Dropdown.Item style={{color:'#222222', textAlign:'left'}} onClick={() => setCompetition("")}>Te gjitha</Dropdown.Item>
            <Dropdown.Item style={{color:'#222222', textAlign:'left'}} onClick={() => setCompetition("Abissnet Superiore")}>Abissnet Superiore</Dropdown.Item>
            <Dropdown.Item style={{color:'#222222', textAlign:'left'}} onClick={() => setCompetition("Kupa e Shqiperise")}>Kupa e Shqiperise</Dropdown.Item>
            <Dropdown.Item style={{color:'#222222', textAlign:'left'}} onClick={() => setCompetition("Miqesore")}>Miqesore</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
            
            
            <Dropdown>
          <Dropdown.Toggle as="div" style={{ textAlign: 'center', padding: '8px', cursor: 'pointer', backgroundColor: '#dddddd', color: '#333333' }} className="nested-dropdown-toggle">
            Vendndodhjes
          </Dropdown.Toggle>
          <Dropdown.Menu style={{backgroundColor:'#bbbbbb'}}>
            <Dropdown.Item style={{color:'#222222', textAlign:'left'}} onClick={() => setPlace("")}>Te gjitha</Dropdown.Item>
            <Dropdown.Item style={{color:'#222222', textAlign:'left'}} onClick={() => setPlace("Shtepi")}>Shtepi</Dropdown.Item>
            <Dropdown.Item style={{color:'#222222', textAlign:'left'}} onClick={() => setPlace("Transferte")}>Transferte</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
            
          </Dropdown.Menu>
        </Dropdown>
    {(ceiling < filteredMatches.length) && <Button variant='danger' style={{marginTop:'4px'}} onClick={() => {setCeiling(ceiling+15)}}>Ngarko me shume</Button>}
    </div>
  </Container>



)}


    </Container>
  );
};

export default Ndeshjet;