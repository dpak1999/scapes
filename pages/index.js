/** @format */

import Home from '../components/Home';
import Layout from '../components/Layout/Layout';
import { getRooms } from '../redux/actions/roomsAction';
import { wrapper } from '../redux/store';

export default function Index() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (req) => {
    await store.dispatch(getRooms(req));
  }
);
