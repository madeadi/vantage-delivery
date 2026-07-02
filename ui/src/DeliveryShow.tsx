import { Show, SimpleShowLayout, TextField, DateField, BooleanField } from 'react-admin';

export const DeliveryShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="type" />
      <TextField source="status" />
      <TextField source="phase" />
      <BooleanField source="isPhaseDone" />
      <TextField source="name" />
      <TextField source="failureReason" />
      <DateField source="createdAt" showTime />
      <DateField source="updatedAt" showTime />
      <DateField source="startAt" showTime />
      <DateField source="endAt" showTime />
    </SimpleShowLayout>
  </Show>
);
