import React from 'react'

const NewsletterBox = () => {

  const onSubmitHandler = (event) => {
    event.preventDefault();
  }

  return (
    <div className='text-center mt-12 px-4'>
      <h2 className='text-4xl md:text-5xl font-black mb-4 text-gray-950 tracking-tighter'>
        Subscribe now & get 20% off
      </h2>

      <p className='text-gray-600 mt-3 font-medium text-lg'>
        Subscribe to our newsletter to receive exclusive offers, early access to new arrivals, and the latest style inspiration directly in your inbox.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className='w-full sm:w-1/2 flex flex-col sm:flex-row items-center gap-4 mx-auto my-10'
      >
        <input
          className='w-full sm:flex-1 outline-none py-3 border-b-2 border-gray-300 bg-transparent text-gray-900 placeholder:text-gray-500 focus:border-[#96c138] transition-colors text-lg'
          type='email'
          placeholder='Enter your email address...'
          required
        />
        <button
          type='submit'
          className='w-full sm:w-auto bg-[#96c138] text-white font-bold px-10 py-4 hover:bg-[#86af32] transition-colors mt-4 sm:mt-0 rounded-sm'
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  )
}

export default NewsletterBox