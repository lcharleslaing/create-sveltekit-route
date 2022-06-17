class CreateRouteTitleComponentSvelteS {
    static generate() {
        return `
<script lang="ts" context="module">
    import { page } from "$app/stores";
</script>

<script lang="ts">
</script>

<h1 class="text-center text-2xl">Generated Route: ({$page.routeId})</h1>
<h3 class="text-center text-xl">Route URL: ({$page.url})</h3>

<style>
</style>
`
    }
}

module.exports = CreateRouteTitleComponentSvelteS
