import { observer } from 'mobx-react-lite';
import React from 'react';
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom';
import { Button, Container, Divider, Header, Image, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import Loginform from '../users/Loginform';
import RegisterForm from '../users/RegisterForm';

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();

    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                   SocioPath
               </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome to reactivities' />
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Go to Activities
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<Loginform />)} size='huge' inverted>
                            Login!
                        </Button>

                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted>
                            Register
                        </Button>
                        <Divider horizontal inverted>Or </Divider>
                        <Button
                            loading={userStore.fbLoading}
                            size='huge'
                            inverted
                            color='facebook'
                            content='Login with Facebook'
                            onClick={userStore.facebookLogin}
                        />
                        <GoogleLogin
                            clientId='434396752487-5m112tpbbsuiuhri37ne8ctpo9vpek2q.apps.googleusercontent.com'
                            buttonText='Google login'
                            onSuccess={userStore.googleResponse}
                            onFailure={userStore.googleResponse}
                        />
                    </>

                )}

            </Container>
        </Segment>
    )
})