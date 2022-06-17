class CreateRouteIndexSvelteJS {
    static generate() {
        return `
<script context="module">
    import { page } from "$app/stores";
    import Title from './components/Title.svelte';
</script>

<script>
</script>

<Title />

<style>
</style>
`
    }
}

module.exports = CreateRouteIndexSvelteJS
