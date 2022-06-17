class CreateRouteIndexSvelteTS {
    static generate() {
        return `
<script lang="ts" context="module">
    import { page } from "$app/stores";
    import Title from './components/Title.svelte';
</script>

<script lang="ts">
</script>

<Title />

<style>
</style>
`
    }
}

module.exports = CreateRouteIndexSvelteTS
