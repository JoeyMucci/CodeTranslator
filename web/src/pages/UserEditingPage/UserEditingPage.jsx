import React from 'react';
import { useForm } from '@redwoodjs/forms';
import { MetaTags, useMutation } from '@redwoodjs/web';
import { toast, Toaster } from '@redwoodjs/web/toast';
import UserEditForm from 'web/src/components/UserEditForm/UserEditForm.jsx';

const UPDATE_USER = gql`
 mutation UpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
      // Add other fields as needed
    }
 }
`;

const UserEditingPage = () => {
 const formMethods = useForm();

 const [updateUser, { loading, error }] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      toast.success('Your profile has been updated!');
      formMethods.reset();
    },
 });

 const onSubmit = (data) => {
    
    updateUser({ variables: { id: data.id, input: data } });
 };

 return (
    <>
      <MetaTags title="Edit Profile" description="Edit your profile" />
      <Toaster />
      <UserEditForm
        onSubmit={onSubmit}
        error={error}
        loading={loading}
        formMethods={formMethods}
      />
    </>
 );
};

export default UserEditingPage;
