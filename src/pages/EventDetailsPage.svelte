<script>
    import sportData from '../../src/json/sportData.json';

    let eventId = getEventIdFromUrl();

    let event = findEventById(eventId);

    function getEventIdFromUrl() {
        const hashPath = window.location.hash.substring(1);
        const pathSegments = hashPath.split('/');
        const eventIdIndex = pathSegments.findIndex(segment => segment === 'event') + 1;
        return pathSegments[eventIdIndex];
    }
    console.log(eventId);

    function findEventById(eventId) {
        const numericEventId = Number(eventId);

        return sportData.data.find(event => event.id === numericEventId);
    }
</script>

<main>
    {#if event}
        <h1>Event Details: {event.homeTeam?.name || '/'} vs {event.awayTeam?.name || '/'}</h1>
        <p>Date: {event.dateVenue || '/'}</p>
        <p>Time: {event.timeVenueUTC || '/'}</p>
        <p>Saison: {event.season || '/'}</p>
        <p>Runde: {event.stage.name || '/'}</p>
        <p>Liga: {event.originCompetitionName || '/'}</p>
    {:else}
        <p>Event not found.</p>
    {/if}
</main>
