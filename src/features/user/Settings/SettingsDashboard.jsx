import React from 'react';
import { Grid } from 'semantic-ui-react';
import SettingsNav from './SettingsNav';
import { Switch } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import AboutPage from './AboutPage';
import PhotosPage from './PhotosPage';
import AccountPage from './AccountPage';
import BasicsPage from './BasicsPage';

const SettingsDashboard = () => {
    return (
        <Grid>
            <Grid.Column
                width={12}>
                <Switch>
                    <Route path='/settings/basics' component={BasicsPage} />
                    <Route path='/settings/about' component={AboutPage} />
                    <Route path='/settings/photos' component={PhotosPage} />
                    <Route path='/settings/account' component={AccountPage} />
                    <Redirect exact from="/settings" to='/settings/basics' />
                </Switch>
            </Grid.Column>
            <Grid.Column
                width={4}>
                <SettingsNav />
            </Grid.Column>
        </Grid>
    );
}

export default SettingsDashboard;