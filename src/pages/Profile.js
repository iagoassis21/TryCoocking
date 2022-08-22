import React from 'react';
import Header from '../components/Header';

export default function Profile() {
  return (
    <div>
      <Header title="Profile" icons={ { profile: true, search: false } } />
    </div>
  );
}
