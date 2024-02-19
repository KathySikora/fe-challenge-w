<script>
    import sportData from '../../src/json/sportData.json';
    import {push} from 'svelte-spa-router';
    import {events} from "../../scripts/store.js";
    import { onMount } from 'svelte';



    let currentPage = 1;
    const itemsPerPage = 10;
    let jsonEvents = sportData.data.map((event, index) => ({
        ...event,
        id: index + 1
    }));
    let subscribedEvents = [];
    events.subscribe($events => {
        subscribedEvents = $events;
    });

    onMount(() => {
        events.update(current => {
            if (current.length === 0) {
                return jsonEvents;
            }
            return current;
        });
    });

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
    $: currentPageStats = subscribedEvents.slice(startIndex, endIndex);
</script>

<button on:click={() => push('/add')}>+ Event</button>
<div class="widget">
    <div class="content-wrapper">
        <h1>EVENT CALENDAR</h1>
        <table class="statistics-table">
            <thead>
            <tr>
                <th>Date</th>
                <th class="responsiveness">Time</th>
                <th class="responsiveness">Liga</th>
                <th>Teams</th>
            </tr>
            </thead>
            <tbody>
            {#each jsonEvents && subscribedEvents as event}
                <tr on:click={() => go(event.id)}>
                    <td style="font-style: italic">{event.dateVenue}</td>
                    <td class="responsiveness">{formatTime(event.timeVenueUTC)}</td>
                    <td class="responsiveness">{event.originCompetitionName}</td>
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
        {#if jsonEvents.length > endIndex}
            <button on:click={nextPage}>Weiter</button>
        {/if}
    </div>
</div>

<style>

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

    .spaceholder {
        margin-bottom: 2em;
    }

    .statistics-table {
        width: 100%;
        max-width: 100%;
        table-layout: fixed;
        box-sizing: border-box;
    }

    @media (max-width: 410px) {
        .responsiveness {
            display: none;
        }
    }
</style>