import Home from "../src/pages/Home.svelte";
import EventDetails from '../src/pages/EventDetailsPage.svelte';
import AddEventPage from "../src/pages/AddEventPage.svelte";

const routes = {
    '/': Home,
    '/event/:id': EventDetails,
    '/add': AddEventPage,
};

export default routes;