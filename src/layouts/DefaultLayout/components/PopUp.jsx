import './PopUp.scss'

const PopUp = ({ message, setMessage }) => {
    return (
        <section className='popup-container'>
          <p>{message}</p>
          <button className='button-orange' onClick={() => setMessage(false)}>OK</button>
        </section>
    );
};

export default PopUp
