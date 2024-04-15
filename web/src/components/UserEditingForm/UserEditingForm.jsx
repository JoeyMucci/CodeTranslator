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
      <div
        className="mt-5 flex w-1/4 flex-col justify-center space-y-2  rounded bg-text_box "
        style={{ margin: 'auto' }}
      >
        <div className=" " style={{ margin: 'auto', marginTop: '20px' }}>
          <label htmlFor="name" style={{ marginRight: '10px' }}>
            {' '}
            Name:
          </label>
          <br />
          <input
            className="rounded"
            placeholder=" jeremiah"
            data-testid="name"
            name="name"
            type="text"
            {...register('name', { required: false })}
          />
          {errors.name && <p style={{ color: 'red' }}>Name is required</p>}
        </div>
        <br></br>
        <div className=" " style={{ margin: 'auto', marginBottom: '30px' }}>
          <label htmlFor="email" style={{ marginRight: '10px' }}>
            Email:{' '}
          </label>
          <br />
          <input
            className="rounded"
            placeholder=" jermy123@gmail.com"
            data-testid="email"
            name="email"
            type="email"
            {...register('email', {
              required: false,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            })}
          />
          {errors.email && (
            <p style={{ color: 'red' }}>Enter a valid email address</p>
          )}
          <br />
        </div>
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
      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-1/4 justify-center  rounded bg-sky-700 text-white hover:bg-sky-800"
        style={{ margin: 'auto', display: 'block' }}
      >
        {loading ? 'Loading...' : 'Save'}
      </button>
    </form>
  )
}

export default UserEditingForm
