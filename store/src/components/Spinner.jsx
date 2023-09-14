import Spinner from 'react-bootstrap/Spinner';

const CircularProgress = () => {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>
  )
}

export default CircularProgress