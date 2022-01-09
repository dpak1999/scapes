/** @format */

import { useSelector } from 'react-redux';
import RoomItem from './room/RoomItem';

const Home = () => {
  const { rooms } = useSelector((state) => state.allRooms);

  return (
    <section id="rooms" className="container mt-5">
      <h2 className="mb-3 ml-2 stays-heading">Stays in New York</h2>

      <a href="#" className="ml-2 back-to-search">
        <i className="fa fa-arrow-left"></i> Back to Search
      </a>
      {rooms && rooms.length === 0 ? (
        <div className="alert alert-danger mt-3">
          <strong>No rooms found</strong>
        </div>
      ) : (
        <div className="row">
          {rooms.map((room) => (
            <div className="col-sm-12 col-md-6 col-lg-3 my-3">
              <RoomItem room={room} key={room._id} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
