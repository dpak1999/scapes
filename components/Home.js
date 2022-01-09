/** @format */

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors } from '../redux/actions/roomsAction';
import RoomItem from './room/RoomItem';

const Home = () => {
  const { rooms, error } = useSelector((state) => state.allRooms);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, []);

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
