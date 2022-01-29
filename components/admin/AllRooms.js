/** @format */

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, getAdminRooms } from '../../redux/actions/roomsAction';
import Link from 'next/link';
import { MDBDataTable } from 'mdbreact';

const AllRooms = () => {
  const dispatch = useDispatch();

  const { loading, error, rooms } = useSelector((state) => state.allRooms);

  const setRooms = () => {
    const data = {
      columns: [
        {
          label: 'Room ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Price per night',
          field: 'pricePerNight',
          sort: 'asc',
        },
        {
          label: 'Category',
          field: 'category',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc',
        },
      ],
      rows: [],
    };

    rooms &&
      rooms.forEach((room) => {
        data.rows.push({
          id: room._id,
          name: room.name,
          pricePerNight: `$${room.pricePerNight}`,
          category: room.category,
          actions: (
            <>
              <Link href={`/admin/rooms/${room._id}`}>
                <a className="btn btn-primary">
                  <i className="fa fa-pencil"></i>
                </a>
              </Link>

              <button className="btn btn-danger mx-2">
                <i className="fa fa-trash"></i>
              </button>
            </>
          ),
        });
      });

    return data;
  };

  useEffect(() => {
    dispatch(getAdminRooms());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <h1 className="d-flex justify-content-center align-item-center">
          loading
        </h1>
      ) : (
        <div className="container container-fluid">
          <h1 className="my-5">
            {`${rooms && rooms.length} Rooms`}
            <Link href={'/admin/rooms/new'}>
              <a className="mt-0 btn text-white float-right new-room-btn">
                + Create Room
              </a>
            </Link>
          </h1>
          <MDBDataTable
            data={setRooms()}
            className="px-3"
            bordered
            striped
            hover
          />
        </div>
      )}
    </>
  );
};

export default AllRooms;
