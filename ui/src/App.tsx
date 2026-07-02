import { Admin, Resource } from 'react-admin';
import { dataProvider } from './dataProvider';
import { DeliveryList } from './DeliveryList';
import { DeliveryShow } from './DeliveryShow';
import { DeliveryCreate } from './DeliveryCreate';

export const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="deliveries"
      list={DeliveryList}
      show={DeliveryShow}
      create={DeliveryCreate}
    />
  </Admin>
);

export default App;
