import React from 'react'

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
        style={{ margin: 'auto'}}
      >
        <div className=" " style={{ margin: 'auto', marginTop: '20px' }}>
          <label htmlFor="oldpassword" style={{ marginRight: '10px' }}>
            {' '}
            Old Password:
          </label>
          <br />
          <input
            className="rounded"
            data-testid="oldpassword"
            name="oldpassword"
            type="password"
            {...register('oldpassword', { required: true })}
            style={{color: 'black'}}
          />
          {errors.oldpassword && (
            <p style={{ color: 'red' }}>Old Password is required</p>
          )}
        </div>
        <br></br>
        <div className=" " style={{ margin: 'auto', marginBottom: '30px' }}>
          <label htmlFor="newpassword" style={{ marginRight: '10px' }}>
            New Password:{' '}
          </label>
          <br />
          <input
            className="rounded"
            data-testid="newpassword"
            name="newpassword"
            type="password"
            {...register('newpassword', {
              required: true,
            })}
            style={{color: 'black'}}
          />
          {errors.newpassword && (
            <p style={{ color: 'red' }}>New Password is required</p>
          )}
          <br />
        </div>
        <div className=" " style={{ margin: 'auto', marginBottom: '30px' }}>
          <label htmlFor="confirmpassword" style={{ marginRight: '10px' }}>
            Confirm Password:{' '}
          </label>
          <br />
          <input
            className="rounded"
            data-testid="confirmpassword"
            name="confirmpassword"
            type="password"
            {...register('confirmpassword', {
              required: true,
            })}
            style={{color: 'black'}}
          />
          {errors.confirmpassword && (
            <p style={{ color: 'red' }}>Confirm Password is required</p>
          )}
          <br />
        </div>
      </div>
      {error && <p>{error.message}</p>}
      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-1/4 justify-center  rounded bg-button"
        style={{ margin: 'auto', display: 'block' }}
      >
        {loading ? 'Loading...' : 'Change'}
      </button>
    </form>
  )
}

export default UserEditingForm
