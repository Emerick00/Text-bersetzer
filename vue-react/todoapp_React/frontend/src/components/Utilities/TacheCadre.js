import axios from 'axios';
import React, { useState } from 'react';

const TacheCadre = ({
  setDescription,
  setTitle,
  todo,
  userInfo,
  deleteTodoHandler,
  setIsEdict,
  setTodoId,
  setDate,
}) => {
  const { image, date, title, createdAt, description, user } = todo;

  const edictHandler = (todo) => {
    setTodoId(todo._id);
    setDescription(todo.description);
    setTitle(todo.title);
    setDate(todo.date);
    setIsEdict(true);
  };

  function convertDateFormat(inputDate) {
    const date = new Date(inputDate);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString().slice(2);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  return (
    <div className='grid rounded-md sdw-tache bg-slate-50 ' key={todo._id}>
      {/* <div className='relative w-full h-full '>
        <img
          src={image}
          alt='image'
          className='object-cover w-full h-full rounded-t-md'
        />
      </div> */}
      <div className='flex flex-col justify-between p-4 '>
        <div className='flex flex-col '>
          <p className=' text-[1.2rem] text-[#1e2f41] font-medium capitalize'>
            {user.username}
          </p>
          <span className='text-[#b15a38]'>{convertDateFormat(date)}</span>
        </div>
        <div>
          <h1 className=' text-[1.8rem] font-semibold'>{title}</h1>
        </div>
        <p className=' text-[1.1rem]'>{description}</p>
        <div className='flex items-center justify-between '>
          <span className='text-[#0061b2]'>{convertDateFormat(createdAt)}</span>
          {user._id == userInfo._id && (
            <div className='flex items-center space-x-2 '>
              <button
                className='text-red-600 '
                onClick={() => deleteTodoHandler(todo._id)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                  />
                </svg>
              </button>
              <button
                className=' text-[#00ba28]'
                onClick={() => edictHandler(todo)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                  />
                </svg>
              </button>{' '}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TacheCadre;
