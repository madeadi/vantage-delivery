import { Create, SimpleForm, SelectInput } from 'react-admin';

export const DeliveryCreate = () => (
  <Create>
    <SimpleForm>
      <SelectInput
        source="type"
        choices={[
          { id: 'from_kitchen', name: 'From Kitchen' },
          { id: 'to_kitchen', name: 'To Kitchen' },
        ]}
        required
      />
    </SimpleForm>
  </Create>
);
