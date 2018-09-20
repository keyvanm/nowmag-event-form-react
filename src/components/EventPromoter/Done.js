import React from 'react'
import { Container, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

export default () => (
    <Container text>
        <Header>
            Thank you for submitting this event
        </Header>
        <p>Your event is submitted. You will receive a confirmation email shortly</p>
        <Link to="/events/add/">Add another event</Link>
    </Container>
)