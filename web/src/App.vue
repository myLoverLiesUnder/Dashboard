<template>
    <div id="app">
        <Header></Header>
        <div class="page-container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

    import Header from "./components/Header";

    export default {
        name: 'app',
        components: {
            Header
        },
    }
</script>

<style>
    .page-container {
        height: 100%;
        width: 1155px;
        margin: 0 auto;
        padding-top: 30px;
    }

</style>
