import Form from '../Form/Form.js'
import logo from '../../images/GratefulTogetherLogo.png'
import styled from 'styled-components';
import EntriesContainer from "../EntriesContainer/EntriesContainer"
import Nav from "../NavBar/NavBar.js";
import { useState, useEffect } from 'react';
import CalendarModal from '../CalendarModal/CalendarModal.js';
import './Homepage.css'

const HomepageContainer = styled.div `
  display: flex;
  flex-direction: column;
`

const Logo = styled.img `
  height: auto;
  width: 450px;
  align-self: center;
`

const Homepage = ({wins, setWins, date, setDate, setError}) => {

  useEffect(() => {
    fetch('https://gratefultogether-api-49ea7cf50543.herokuapp.com/api/v1/wins')
      .then(res => res.json())
      .then(data => {
        setError(false)
        setWins(data.data)
      })
      .catch(err => {
        setError(true)
        console.log(err)
      })
    }, [setWins, setError])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderModal = () => {
		return (
			<CalendarModal closeModal={closeModal} date={date} setDate={setDate}/>
		)
	}

  return (
    <>
    <Nav />
    <HomepageContainer>
      <Logo src={logo} alt='Grateful Together Logo' className='logo'></Logo>
      <Form />
      <div className='today-info'>
        <h2>Today's Entries:</h2>
          <button onClick={handleClick}>View Past Entry</button>
          {isModalOpen && renderModal()}
      </div>
      <EntriesContainer wins={wins}/>
    </HomepageContainer>
    </>
  )
} 

export default Homepage