import React from 'react';

import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <section className="flex justify-center items-center h-[60vh]">
      <div className="text-center">
        <h2 className="text-[#1D4ED8] text-[102px] mb-0">OOPS!</h2>
        <h2 className="mb-8">Page Not Found</h2>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-[#1D4ED8] text-white rounded-md hover:bg-[#FAB900] transition"
        >
          Go Back Home
        </Link>
      </div>
    </section>
  );
};
