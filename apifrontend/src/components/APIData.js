import { useState, useEffect } from 'react'
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa'

function APIData({ props }) {
  const [characters, setCharacters] = useState([])
  const [selected, setSelected] = useState(null)

  const toggle = (index) => {
    if (selected == index) {
      return setSelected(null)
    }

    setSelected(index)
  }

  useEffect(() => {
    fetch('https://json-api-production-2999.up.railway.app/characters')
       .then((response) => response.json())
       .then((data) => {
          console.log(data);
          setCharacters(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
 }, []);

  return (
    <div className="wrapper">
      <div className="accordion">
        {
          characters.map((character, index) => {
            return (
            <div className="item">
              <div className="title" onClick={() => toggle(index)}>
                  <h2>{character.displayName}</h2>
                  <span>{ selected == index ? '-' : '+' }</span>
              </div>
                <div className={selected == index ? 'content show' : 'content'}>
                  <img src={character.fullPortrait} />
                  {character.description}</div>
              </div>
            )
          })
        }
      </div>
  </div>
  )
}

export default APIData