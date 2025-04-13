import { type RouteConfig } from "@react-router/dev/routes";
import {index, layout,route } from "@react-router/dev/routes";

/**
 * This is the main route configuration for the application.
 * It defines the layout and the routes for the application.
 * The layout is the sidebar that contains the navigation for the application.
 * The routes are the pages that are displayed in the main content area of the application.
 * 
 * Anytime a route is added, updated or removed, the application needs to be restarted.
 */
export default [
    layout("layout/sidebar.tsx", [
        index("routes/home.tsx"),
        route("/contacts/:contactId", "routes/contact.tsx"),
        route("/contacts/:contactId/edit", "routes/edit-contact.tsx"),
        route("/contacts/:contactId/destroy", "routes/destroy-contact.tsx")
    ]),
    route("/about", "routes/about.tsx")
] satisfies RouteConfig;
