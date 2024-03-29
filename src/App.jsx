import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import DefaultLayout from './layouts/DefaultLayout';
import AuthLayout from './layouts/AuthLayout';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { themeSelector } from './redux/selectors';

function App() {
    const theme = useSelector(themeSelector);
    return (
        <Router>
            <div className={theme.darkMode?'dark':''}>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <AuthLayout>
                                        <Layout {...route.props}>
                                            <Page />
                                        </Layout>
                                    </AuthLayout>
                                }
                            />
                        );
                    })}
                </Routes>
                <ToastContainer hideProgressBar />
            </div>
        </Router>
    );
}

export default App;
