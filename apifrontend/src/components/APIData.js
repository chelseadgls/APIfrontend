import { useState, useEffect } from 'react'
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa'

function APIData({ props }) {
  const [characters, setCharacters] = useState([])
  const [current, setCurrent] = useState(0)
  const length = characters.length

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

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const previousSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  if (!Array.isArray(characters) || characters.length <= 0) {
    return null
  }

  return (
    <section className="slider">
      <FaArrowAltCircleLeft className="left-arrow" onClick={previousSlide}  />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      {characters.map((character, index) => {
        return (
          <div className={index === current ? 'slide active' : 'slide'} key={index}>
            {index === current && (
              <>
              <img src={character.fullPortrait} />
                <p className="name">{character.displayName}</p>
                <p className="description">{character.description}</p>
              </>)}
          </div>
      )
    })}
    </section>
  )
}

export default APIData