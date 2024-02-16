import Home from "../src/pages/Home.svelte";
import EventDetails from '../src/pages/EventDetailsPage.svelte';

const routes = {
    '/': Home,
    '/event/:id': EventDetails,
};

export default routes;