// web/src/components/UserEditingForm/UserEditingForm.jsx
import React from 'react'

// import { useForm } from '@redwoodjs/forms'

const UserEditingForm = ({ onSubmit, error, loading, formMethods }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          data-testid="name"
          name="name"
          type="text"
          {...register('name', { required: true })}
        />
        {errors.name && <p>Name is required</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          data-testid="email"
          name="email"
          type="email"
          {...register('email', {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          })}
        />
        {errors.email && <p>Please enter a valid email address</p>}
      </div>
      {/* <div>
        <label htmlFor="preferences">Preferences</label>
        <textarea
          id="preferences"
          name="preferences"
          {...register('preferences')}
        />
      </div>
      {error && <p>{error.message}</p>} */}
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Save'}
      </button>
    </form>
  )
}

export default UserEditingForm
