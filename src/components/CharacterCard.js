import React, { useState, useEffect } from 'react'; /* Hooks used to manage state and handle effects*/
import { useNavigate } from 'react-router-dom'; /*Navigation Hook*/
import axios from 'axios'; /*Used for making my HTTP request*/
import styles from './CharacterCard.module.css'; /* Used to make my styling independent*/

const CharacterCard = ({ character }) => {
  const [allegianceNames, setAllegianceNames] = useState([]);
  const navigate = useNavigate(); 

  /*Functional Component w/ prop. 
  Used hook to create state variable 
  and function to update it in empty array.
  Hook for my navi function to my routes. */
  
  
  useEffect(() => {
    const fetchAllegianceNames = async () => {
      try {
        const allegianceResponses = await Promise.all(
          character.allegiances.map((allegianceUrl) => axios.get(allegianceUrl))
        );
        const names = allegianceResponses.map((response) => response.data.name);
        setAllegianceNames(names);
      } catch (error) {
        console.error('Error fetching allegiance data', error);
      }
    };

    if (character.allegiances && character.allegiances.length > 0) {
      fetchAllegianceNames();
    }
  }, [character.allegiances]);

  /* Hook for component effects, 
  fetches allegiance names when the character.allegiances prop changes. 
  asynchronous function "fetchAllegianceNames" 
  uses Axios for requests for allegiance data using character.allegiances array.
  Names are stored in the allegianceNames state using setAllegianceNames.
  If data in the "character" prop, run "fetchAllegianceNames" function. */

  const navigateToCharacterDetail = () => {
    navigate(`/characters/${character.url.replace(/[^0-9]/g, "")}`);
  };

  /* Function that uses navigate function to go to character page based on the 
  character.url prop and removes non-numeric characters from the URL. */
  
  
  return (
    <div className={styles.CharacterCard} onClick={navigateToCharacterDetail}>
      <h2>{character.name || character.aliases[0]}</h2>
      <img
        src={
          process.env.PUBLIC_URL +
          (character.gender === 'Male' ? '/maleImg.png' : '/femaleImg.png')
        }
        alt="Gender Img"
      />
      <p>Aliases: {character.aliases.join(', ') || 'Unknown'}</p>
      <p>Gender: {character.gender || 'Unknown'}</p>
      <p>Culture: {character.culture || 'Unknown'}</p>
      <p>Titles: {character.titles.join(', ') || 'Unknown'}</p>
      <p>Spouse: {character.spouse || 'Unknown'}</p>
      <p>Allegiances: {allegianceNames.join(', ') || 'Unknown'}</p>
    </div>
  );
};

/*Defines the structure and content of my CharacterCard component.
Uses the CSS class styles.CharacterCard for styling and runs the 
navigateToCharacterDetail function when clicked.
Info from the character prop is displayed, and conditional rendering 
is used for the gender img based on character's gender. */

export default CharacterCard;