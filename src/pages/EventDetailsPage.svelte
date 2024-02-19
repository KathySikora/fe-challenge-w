<script>
    import { onMount } from 'svelte';
    import sportData from '../../src/json/sportData.json';
    import { events } from "../../scripts/store.js"; // Assuming this is your store

    let eventId;
    let event;
    let subscribedEvents = [];
    events.subscribe($events => {
        subscribedEvents = $events;
    });

    function getEventIdFromUrl() {
        const hashPath = window.location.hash.substring(1);
        const pathSegments = hashPath.split('/');
        const eventIdIndex = pathSegments.findIndex(segment => segment === 'event') + 1;
        return pathSegments[eventIdIndex];
    }

    onMount(() => {
        eventId = getEventIdFromUrl();
        findEventById(eventId);
    });

    function findEventById(eventId) {
        const numericEventId = Number(eventId);
        let foundEvent = sportData.data.find(event => event.id === numericEventId);
        if (!foundEvent) {
            foundEvent = subscribedEvents.find(event => event.id === numericEventId);
        }
        event = foundEvent;
    }
</script>

<div class="widget">
    <div class="content-wrapper">
        {#if event}
            <h1>EVENT DETAILS</h1>
            <table>
                <tr>
                    <td>Teams:</td>
                    <td>{event.homeTeam?.name || '/'} vs {event.awayTeam?.name || '/'}</td>
                </tr>
                <tr>
                    <td>Date:</td>
                    <td>{event.dateVenue || '/'}</td>
                </tr>
                <tr>
                    <td>Time:</td>
                    <td>{event.timeVenueUTC || '/'}</td>
                </tr>
                <tr>
                    <td>Saison:</td>
                    <td>{event.season || '/'}</td>
                </tr>
                <tr>
                    <td>Runde:</td>
                    <td>{event.stage?.name || '/'}</td>
                </tr>
                <tr>
                    <td>Liga:</td>
                    <td>{event.originCompetitionName || '/'}</td>
                </tr>
            </table>
        {:else}
            <p>Event not found.</p>
        {/if}
    </div>
</div>

<style>
    .content-wrapper {
        padding-bottom: 2em;
    }

    h1 {
        text-align: center;
    }

    table tr td:first-child {
        font-weight: bold;
    }

</style>