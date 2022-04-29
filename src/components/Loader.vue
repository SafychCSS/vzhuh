<template>
    <div class="loader">
        <img src="../assets/loader.svg" alt="loader">
    </div>
</template>

<script>
export default {
    name: 'Loader'
};
</script>

<style lang="scss" scoped>
.loader {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;

    width: 100%;
    height: 100%;
    display: grid;
    place-content: center;

    background-color: rgba(0, 0, 0, .8);

    img {
        width: 100px;
        height: 100px;
    }
}
</style>