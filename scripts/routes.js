import Home from "../src/pages/Home.svelte";
import EventDetails from '../src/pages/EventDetails.svelte';

const routes = {
    '/': Home,
    '/event/:id': EventDetails,
};

export default routes;