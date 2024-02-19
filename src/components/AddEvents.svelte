<script>
    import {push} from "svelte-spa-router";
    import { events } from "../../scripts/store.js";

    let event = {
        id: '',
        homeTeamName: '',
        awayTeamName: '',
        dateVenue: '',
        timeVenueUTC: '',
        season: '',
        stageName: '',
        originCompetitionName: '',
        homeGoals: '',
        awayGoals: ''
    };

    function handleSubmit() {
        events.update(currentEvents => {
            const nextId = currentEvents.length + 6;
            const newEvent = {
                id: nextId,
                season: parseInt(event.season, 10),
                timeVenueUTC: event.timeVenueUTC,
                dateVenue: event.dateVenue,
                homeTeam: {
                    name: event.homeTeamName
                },
                awayTeam: {
                    name: event.awayTeamName
                },
                result: {
                    homeGoals: parseInt(event.homeGoals, 10),
                    awayGoals: parseInt(event.awayGoals, 10),
                },
                stage: {
                    name: event.stageName,
                },
                originCompetitionName: event.originCompetitionName
            };
            return [...currentEvents, newEvent];
        });
        push('/');
    }

</script>

<div class="widget">
    <div class="content-wrapper">
        <h1>ADD EVENT DETAILS</h1>
        <form on:submit|preventDefault={handleSubmit}>
            <table>
                <tr>
                    <td>Teams:</td>
                    <td>
                        <input type="text" bind:value={event.homeTeamName} placeholder="Home Team"/>
                        vs
                        <input type="text" bind:value={event.awayTeamName} placeholder="Away Team"/>
                    </td>
                </tr>
                <tr>
                    <td>Date:</td>
                    <td><input type="date" bind:value={event.dateVenue}/></td>
                </tr>
                <tr>
                    <td>Time:</td>
                    <td><input type="time" bind:value={event.timeVenueUTC}/></td>
                </tr>
                <tr>
                    <td>Season:</td>
                    <td><input type="number" bind:value={event.season} placeholder="2023"/></td>
                </tr>
                <tr>
                    <td>Round:</td>
                    <td><input type="text" bind:value={event.stageName} placeholder="Round of 16"/></td>
                </tr>
                <tr>
                    <td>League:</td>
                    <td><input type="text" bind:value={event.originCompetitionName} placeholder="AFC Champions League"/>
                    </td>
                </tr>
                <tr>
                    <td>Home Goals:</td>
                    <td><input type="number" bind:value={event.homeGoals} placeholder="0"/></td>
                </tr>
                <tr>
                    <td>Away Goals:</td>
                    <td><input type="number" bind:value={event.awayGoals} placeholder="0"/></td>
                </tr>
            </table>
            <div class="buttons">
                <button type="submit">Add Event</button>
                <button type="button" on:click={() => push('/')}>cancel</button>
            </div>
        </form>
    </div>
</div>

<style>
    h1 {
        text-align: center;
    }

    form {
        padding-bottom: 2em;
    }



    button {
        margin: 4px;
    }

    .buttons {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    button {
        display: block;

        margin: 2em auto 0 auto;
    }

    @media (max-width: 608px) {
        input {
            width: 40%;
        }
    }
</style>