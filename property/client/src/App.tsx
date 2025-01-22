import { Authenticated,  Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";

import {
  Home,
  ForgotPassword,
  Login,
  Register,
  Agent
} from "./pages";

import { PropertyList, PropertyCreate, PropertyEdit, PropertyDetail } from "./pages/properties";

import { resources } from "./config/resources";
import { Typography } from "@mui/material";
import Logo from './assets/logo.svg';

function App() {
  const [collapsed, setCollapsed] = useState(false); // Use state to manage collapse

  const toggleSidebar = () => {
    setCollapsed(!collapsed); // Toggle the collapse state
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider("http://localhost:8080/api/v1")}
                notificationProvider={notificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Header={() => <Header sticky={true} />}
                          Title={() => (
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '16px',
                                cursor: 'pointer',
                                width: collapsed ? '80px' : '200px',
                                transition: 'width 0.3s ease',
                              }}
                              onClick={toggleSidebar}
                            >
                              <img 
                                src={Logo} 
                                alt="Logo" 
                                style={{ 
                                  width: 40, 
                                  height: 40,
                                  margin: 'auto'
                                }} 
                              />
                              {!collapsed && (
                                <span style={{ 
                                  marginLeft: '10px', 
                                  whiteSpace: 'nowrap', 
                                  overflow: 'hidden',
                                  opacity: collapsed ? 0 : 1,
                                  transition: 'opacity 0.3s ease'
                                }}>
                                  Property Insights
                                </span>
                              )}
                            </div>
                          )}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route index element={<Home />} />
                    <Route
                      index
                      element={<NavigateToResource resource="properties" />}
                    />
                    <Route path="properties">
                        <Route index element={<PropertyList />} />
                        <Route
                            path="create"
                            element={<PropertyCreate />}
                        />
                        <Route
                            path="edit/:id"
                            element={<PropertyEdit />}
                        />
                        <Route
                            path="show/:id"
                            element={<PropertyDetail />}
                        />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
