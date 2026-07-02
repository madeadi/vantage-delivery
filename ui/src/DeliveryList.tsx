import { List, Datagrid, TextField, DateField } from 'react-admin';

export const DeliveryList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="type" />
      <TextField source="status" />
      <TextField source="phase" />
      <TextField source="name" />
      <DateField source="createdAt" showTime />
      <DateField source="updatedAt" showTime />
    </Datagrid>
  </List>
);
