import React, { Component } from 'react'
import Card from './playerCard'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

const Players = () => {

    return (
        <Container>
            <Grid container spacing={10}>
                <Grid item md={6}>
                    <Card id ={1}/>
                </Grid>
                <Grid item md={6}>
                    <Card id ={2}/>
                </Grid>
                <Grid item md={6}>
                    <Card id ={3}/>
                </Grid>
                <Grid item md={6}>
                    <Card id ={4}/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Players