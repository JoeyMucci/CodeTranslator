// web/src/components/UserEditingForm/UserEditingForm.jsx
import React, { useState, useEffect} from 'react';

const UserEditingForm = ({ onSubmit, error, loading, formMethods }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods



  return (

    <form onSubmit={handleSubmit(onSubmit)} >
      <div className="flex flex-col space-y-2 mt-5 w-1/4 justify-center  rounded bg-text_box " style={{margin: 'auto'}}>

      <div className=" " style={{ margin: 'auto', marginTop: '20px' }}>
        <label htmlFor="name" style={{ marginRight: '10px' }}> Name:</label>
        <br />
        <input
          className="rounded text-black"
          placeholder=" jeremiah"
          data-testid="name"
          name="name"
          type="text"
          {...register('name', { required: false })}
        />
        {errors.name && <p style={{ color: 'red' }}>Name is required</p>}
      </div>
      <br></br>
      <div className=" " style={{ margin: 'auto', marginBottom: '30px'}}>
        <label htmlFor="email" style={{ marginRight: '10px' }}>Email: </label>
        <br />
        <input
          className="rounded text-black"
          placeholder=" jermy123@gmail.com"
          data-testid="email"
          name="email"
          type="email"
          {...register('email', {
            required: false,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          })}
        />
        {errors.email && <p style={{ color: 'red' }}>Enter a valid email address</p>}
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
      <br></br>
      <button type="submit" disabled={loading} className="mt-5 w-1/4 justify-center  rounded bg-button text-white " style={{ margin: 'auto', display: 'block' }}>
        {loading ? 'Loading...' : 'Save'}
      </button>


    </form>


  )
}

export default UserEditingForm
