class CreateRouteTitleComponentSvelteJS {
    static generate() {
        return `
<script context="module">
    import { page } from "$app/stores";
</script>

<script>
</script>

<h1 class="text-center text-2xl">Generated Route: ({$page.routeId})</h1>
<h3 class="text-center text-xl">Route URL: ({$page.url})</h3>

<style>
</style>
`
    }
}

module.exports = CreateRouteTitleComponentSvelteJS
