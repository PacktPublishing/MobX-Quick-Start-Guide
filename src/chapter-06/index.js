import './form-validation';
import './page-routing';
import { PageRoutingExample } from './page-routing';
import React, { Fragment } from 'react';
import { Link, Route } from 'react-router-dom';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from '@material-ui/core/es/index';
import { FormValidationExample } from './form-validation';

export function Chapter06({ match }) {
    return (
        <Fragment>
            <Route exact path={`${match.url}/`} render={Dashboard} />
            <Route
                path={`${match.url}/form`}
                component={FormValidationExample}
            />
            <Route
                path={`${match.url}/routing`}
                component={PageRoutingExample}
            />
        </Fragment>
    );
}

function Dashboard({ match }) {
    return (
        <Fragment>
            <LinkCard
                path={`${match.url}/form`}
                title={'Form Validation'}
                description={
                    'Validation as a side-effect of changing' + ' form fields'
                }
            />

            <LinkCard
                path={`${match.url}/routing`}
                title={'Page Routing'}
                description={'Use state-based routing for a checkout workflow'}
            />
        </Fragment>
    );
}

function LinkCard({ path, title, description }) {
    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                    {title}
                </Typography>
                <Typography component="p">{description}</Typography>
            </CardContent>
            <CardActions>
                <Link to={path}>
                    <Button size="large" color="primary" variant={'raised'}>
                        View
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}
