<script>
    import sportData from '../../src/json/sportData.json';
    import { push } from 'svelte-spa-router';

    let currentPage = 1;
    const itemsPerPage = 10;
    let events = sportData.data.map((event, index) => ({
        ...event,
        id: index + 1
    }));

    function nextPage() {
        currentPage += 1;
    }

    function prevPage() {
        currentPage -= 1;
    }

    function formatTime(time) {
        return time.slice(0, 5);
    }

    function go(eventId) {
        push(`/event/${eventId}`);
    }

    $: startIndex = (currentPage - 1) * itemsPerPage;
    $: endIndex = startIndex + itemsPerPage;
    $: currentPageStats = events.slice(startIndex, endIndex);
</script>

<main>
    <div class="content-wrapper">
        <h1>EVENT CALENDAR</h1>
        <table class="statistics-table">
            <thead>
            <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Liga</th>
                <th>Teams</th>
            </tr>
            </thead>
            <tbody>
            {#each events as event}
                <tr on:click={() => go(event.id)}>
                    <td style="font-style: italic">{event.dateVenue}</td>
                    <td>{formatTime(event.timeVenueUTC)}</td>
                    <td>{event.originCompetitionName}</td>
                    <td>{event.homeTeam?.name} vs {event.awayTeam?.name}</td>
                    <td style="display: none;">{event.id}</td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
    <div class="pagination">
        {#if currentPage > 1}
            <button on:click={prevPage}>Zurück</button>
        {:else}
            <div class="spaceholder"></div>
        {/if}
        {#if events.length > endIndex}
            <button on:click={nextPage}>Weiter</button>
        {/if}
    </div>

</main>

<style>
    .content-wrapper {
        padding: 0 2em 0 2em;
        max-width: unset;
    }

    .pagination {
        display: flex;
        justify-content: center;
        gap: 10px;
    }

    .pagination button {
        margin: 1em auto;
    }

    h1 {
        padding-top: 8px;
        text-align: center;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
    }
    .spaceholder {
        margin-bottom: 2em;
    }

    th, td {
        padding: 10px 15px;
        border-bottom: 2px solid lightgray;
    }

    th {
        font-weight: bold;
    }

    tbody tr:hover {
        background-color: #f5f5f5;
        cursor: pointer;
    }

    tbody tr:last-child td {
        border-bottom: none;
    }
</style>