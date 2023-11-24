import React, { useState } from 'react';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Button, Card, CardActions, CardContent, CardMedia, Typography, Dialog } from '@material-ui/core';
import bannerImage from '../assets/banner.jpeg'; // adjust the path as needed

function Signin() {
    const [showSignin, setShowSignin] = useState(false);
    const { signOut } = useAuthenticator();

    return (
        <div style={{ backgroundColor: '#333333', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card style={{ maxWidth: 800, marginTop: '10%' }}>
                <CardMedia
                    component="img"
                    image={bannerImage}
                    title="My Event Planner"
                />
                <Typography variant="h5" component="div">
                    My Event Planner
                </Typography>
                <CardContent>
                    <Typography variant="subtitle1" color="textSecondary">
                        Find, book, and create campus events
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        There are so many great events happening on campus, it can be hard to keep
                        track! Now there is a way to find upcoming events, book tickets, and even create your
                        own events, all from a single app.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button color="primary" onClick={() => setShowSignin(true)}>Sign in</Button>
                    <Button color="secondary" onClick={signOut}>Sign out</Button>
                </CardActions>
            </Card>
            <Dialog open={showSignin} onClose={() => setShowSignin(false)}>
                <Card>
                    <Authenticator />
                </Card>
            </Dialog>
        </div>
    );
}

export default Signin;