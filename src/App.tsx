/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'*/
import React from 'react';
import Header from './duckprofiles/components/Header';
import Avatar from './duckprofiles/components/Avatar';
import UserProfileCard from './duckprofiles/components/UserProfileCard';
import Layout from './duckprofiles/components/Layout';
import { useDuckProfile } from './duckprofiles/UseDuckProfile';

const App: React.FC = () => {
    const { user, equippedItems, randomizeDuck } = useDuckProfile();

    return (
        <Layout>
            <Header />

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Avatar items={equippedItems} />
            </div>

            <UserProfileCard
                user={user}
                onRandomize={randomizeDuck}
            />

        </Layout>
    );
};

export default App;