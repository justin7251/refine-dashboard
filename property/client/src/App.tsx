import { Authenticated,  Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  Sider,
  ThemedLayoutV2,
  ThemedTitleV2
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import ApartmentIcon from '@mui/icons-material/Apartment';
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
import { IconButton, Typography } from "@mui/material";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  // Toggle collapsed state
  const handleCollapseChange = () => {
    setCollapsed((prevState) => !prevState);
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
                          Title={({ collapsed }) => (
                            <ThemedTitleV2
                              collapsed={collapsed}
                              icon={<ApartmentIcon />}
                              text="Property Insights"
                            />
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
