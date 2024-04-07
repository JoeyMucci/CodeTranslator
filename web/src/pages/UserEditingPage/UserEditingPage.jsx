// web/src/pages/UserEditingPage/UserEditingPage.jsx
import React from 'react';
import { useForm } from '@redwoodjs/forms';
import { MetaTags, useMutation } from '@redwoodjs/web';
import { toast, Toaster } from '@redwoodjs/web/toast';
import { useAuth } from 'src/auth'; // Assuming you have an auth hook similar to HomePage.jsx
import UserEditingForm from 'web/src/components/UserEditingForm/UserEditingForm.jsx';

const UPDATE_USER = gql`
 mutation UpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
      preferences
    }
 }
`;

const UserEditingPage = () => {
 const { currentUser } = useAuth(); // Use the auth hook to get the current user
 const formMethods = useForm();

 const [updateUser, { loading, error }] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      toast.success('Your profile has been updated!');
      formMethods.reset();
    },
 });

 const onSubmit = (data) => {
    if (!currentUser) {
      toast.error('You must be logged in to edit your profile.');
      return;
    }
    updateUser({ variables: { id: currentUser.id, input: data } });
 };

 // Redirect if not logged in
 if (!currentUser) {
    return <p>You must be logged in to edit your profile.</p>;
 }

 return (
    <>
      <MetaTags title="Edit Profile" description="Edit your profile" />
      <Toaster />
      <UserEditingForm
        onSubmit={onSubmit}
        error={error}
        loading={loading}
        formMethods={formMethods}
      />
    </>
 );
};

export default UserEditingPage;
